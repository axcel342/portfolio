import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const CASE_STUDIES = ["ember", "kimport", "anti-fragility", "halil"] as const;
const PAGES = ["/", ...CASE_STUDIES.map((slug) => `/work/${slug}`)];

/**
 * The invariant the whole design rests on: a marker always resolves to a
 * source, and a declared source is always actually cited.
 */
async function expectCitationIntegrity(page: Page) {
  const markerIds = await page.$$eval("[data-cite-marker]", (nodes) =>
    nodes.map((node) => (node as HTMLElement).dataset.citeMarker ?? ""),
  );
  const sourceIds = await page.$$eval("[data-cite-source]", (nodes) =>
    nodes.map((node) => (node as HTMLElement).dataset.citeSource ?? ""),
  );

  expect(markerIds.length, "page cites at least one source").toBeGreaterThan(0);
  expect(sourceIds.length, "page renders a footnote rail").toBeGreaterThan(0);

  const orphanMarkers = markerIds.filter((id) => !sourceIds.includes(id));
  expect(orphanMarkers, "every marker resolves to a declared source").toEqual([]);

  const uncitedSources = sourceIds.filter((id) => !markerIds.includes(id));
  expect(uncitedSources, "every declared source is actually cited").toEqual([]);

  // Markers must be real links into the rail, not decorative superscripts.
  for (const id of new Set(markerIds)) {
    const marker = page.locator(`[data-cite-marker="${id}"]`).first();
    const href = await marker.getAttribute("href");
    expect(href, `marker ${id} links to its source`).toBeTruthy();
    await expect(page.locator(href!)).toHaveCount(1);
  }
}

test.describe("home page", () => {
  test("leads with the thesis and the four case studies", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("survive real users");
    await expect(page.locator(".work-entry")).toHaveCount(CASE_STUDIES.length);

    for (const slug of CASE_STUDIES) {
      await expect(page.locator(`a.work-entry[href="/work/${slug}"]`)).toHaveCount(1);
    }

    // Contact is reachable without scrolling into a form.
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(page.locator('a[href="/resume.pdf"]').first()).toBeVisible();
  });

  test("shows no diagrams — those are the reward for clicking through", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("svg.dg")).toHaveCount(0);
  });

  test("cites its own sources", async ({ page }) => {
    await page.goto("/");
    await expectCitationIntegrity(page);
  });
});

test.describe("case studies", () => {
  for (const slug of CASE_STUDIES) {
    test(`${slug} renders every required section`, async ({ page }) => {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.status()).toBe(200);

      await expect(page.locator("h1.case-title")).toBeVisible();
      await expect(page.locator("p.case-dek")).toBeVisible();
      await expect(page.locator("dl.case-meta > div")).not.toHaveCount(0);

      // The three prose sections are the page's contract.
      await expect(page.locator(".prose h2")).toHaveText([
        "The problem",
        "The decision I’d defend",
        "What happened",
      ]);

      // A diagram, described for readers who cannot see it.
      const diagram = page.locator("figure.figure svg.dg");
      await expect(diagram).toHaveCount(1);
      await expect(diagram).toHaveAttribute("role", "img");
      const label = await diagram.getAttribute("aria-label");
      expect(label?.trim().length ?? 0, "diagram describes its mechanism").toBeGreaterThan(40);

      await expect(page.locator("figure.figure figcaption")).toBeVisible();
      await expect(page.locator(".pager")).toBeVisible();

      await expectCitationIntegrity(page);
    });
  }

  test("an unknown slug is a 404, not a blank page", async ({ page }) => {
    const response = await page.goto("/work/not-a-real-project");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("isn’t here");
  });
});

test.describe("both themes paint their own ground", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`body has an opaque background in ${colorScheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");

      const background = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      );
      expect(background).not.toBe("rgba(0, 0, 0, 0)");
      expect(background).not.toBe("transparent");

      // And text must not be the same colour as the ground it sits on.
      const ink = await page.evaluate(
        () => getComputedStyle(document.querySelector("h1")!).color,
      );
      expect(ink).not.toBe(background);
    });
  }
});

test.describe("narrow viewports", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const path of ["/", "/work/kimport"]) {
    test(`${path} does not scroll sideways at 375px`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, "body must never scroll horizontally").toBeLessThanOrEqual(1);
    });
  }
});

test.describe("accessibility", () => {
  // Measure the resting page: the load-in animation is a transient state, and
  // sampling mid-fade reports blended colours instead of the real palette.
  test.use({ reducedMotion: "reduce" });

  for (const path of PAGES.slice(0, 2)) {
    test(`${path} has no serious axe violations`, async ({ page }) => {
      await page.goto(path);
      // Belt and braces alongside reducedMotion: never sample a fading element,
      // whose blended colour is not the palette's colour.
      await page.waitForFunction(() =>
        document.getAnimations().every((animation) => animation.playState === "finished"),
      );
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      // Name the offending nodes, so a failure is actionable without a rerun.
      expect(
        serious.flatMap((violation) =>
          violation.nodes.map(
            (node) =>
              `${violation.id} @ ${node.target.join(" ")} — ${(node.failureSummary ?? "").replace(/\s+/g, " ")}`,
          ),
        ),
        "no serious or critical accessibility violations",
      ).toEqual([]);
    });
  }
});
