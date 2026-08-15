import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const CASE_STUDIES = ["ember", "kimport", "anti-fragility", "halil"] as const;

/**
 * The invariant the case studies rest on: a marker always resolves to a source,
 * and a declared source is always actually cited.
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

  for (const id of new Set(markerIds)) {
    const marker = page.locator(`[data-cite-marker="${id}"]`).first();
    const href = await marker.getAttribute("href");
    expect(href, `marker ${id} links to its source`).toBeTruthy();
    await expect(page.locator(href!)).toHaveCount(1);
  }
}

test.describe("home page", () => {
  test("leads with the thesis, the portrait and both calls to action", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("survive real users");
    await expect(page.locator(".pill-status")).toBeVisible();
    await expect(page.locator(".hero-portrait img")).toBeVisible();
    await expect(page.locator('.hero-actions a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator('.hero-actions a[href="/resume.pdf"]')).toBeVisible();
  });

  test("carries every section the nav promises", async ({ page }) => {
    await page.goto("/");

    // Each nav anchor must resolve to a real section on the page.
    const hrefs = await page.$$eval(".nav-links a[href^='#']", (nodes) =>
      nodes.map((node) => node.getAttribute("href") ?? ""),
    );
    expect(hrefs.length, "nav exposes section links").toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(href), `${href} exists`).toHaveCount(1);
    }
  });

  test("shows four work cards, three roles and the full stack", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#work a.card")).toHaveCount(CASE_STUDIES.length);
    for (const slug of CASE_STUDIES) {
      await expect(page.locator(`a.card[href="/work/${slug}"]`)).toHaveCount(1);
    }

    await expect(page.locator(".timeline-item")).toHaveCount(3);
    // Every role states its dates, its stack and at least one bullet.
    for (const item of await page.locator(".timeline-item").all()) {
      await expect(item.locator(".when")).not.toBeEmpty();
      expect(await item.locator(".pill").count()).toBeGreaterThan(0);
      expect(await item.locator(".bullets li").count()).toBeGreaterThan(0);
    }

    await expect(page.locator("#stack .stack-group")).toHaveCount(4);
    await expect(page.locator("#background .edu-item")).toHaveCount(3);
  });

  test("background sits directly under the work cards", async ({ page }) => {
    await page.goto("/");

    const order = await page.$$eval("main section[id]", (nodes) =>
      nodes.map((node) => node.id),
    );
    expect(order.slice(0, 4)).toEqual(["work", "background", "services", "experience"]);

    // The nav must read in the same order the page does. Asserted as a
    // subsequence, so the nav can omit a section without breaking.
    const navOrder = await page.$$eval(".nav-links a[href^='#']", (nodes) =>
      nodes.map((node) => (node.getAttribute("href") ?? "").slice(1)),
    );
    expect(navOrder.length).toBeGreaterThan(0);
    expect(navOrder.every((id) => order.includes(id)), "every nav link targets a section").toBe(
      true,
    );
    const positions = navOrder.map((id) => order.indexOf(id));
    expect(
      positions.every((pos, i) => i === 0 || pos > positions[i - 1]!),
      "nav links follow page order",
    ).toBe(true);
  });

  test("credentials link to the issuer, not to a redirect wrapper", async ({ page }) => {
    await page.goto("/");

    const links = await page.$$eval("#background .credential-link", (nodes) =>
      nodes.map((node) => ({
        href: node.getAttribute("href") ?? "",
        rel: node.getAttribute("rel") ?? "",
        target: node.getAttribute("target") ?? "",
      })),
    );
    expect(links).toHaveLength(2);

    const hosts = links.map((link) => new URL(link.href).host);
    expect(hosts).toEqual(["learn.microsoft.com", "huggingface.co"]);

    for (const link of links) {
      expect(link.href.startsWith("https://")).toBe(true);
      // A LinkedIn wrapper would rot when its tracking params expire.
      expect(link.href).not.toContain("linkedin.com");
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
    }

    // The portrait badge claims the same credential, so it verifies too.
    const badge = page.locator("a.hero-badge");
    await expect(badge).toHaveCount(1);
    expect(await badge.getAttribute("href")).toContain("learn.microsoft.com");
  });

  test("every credential carries its issuer's logo, marked decorative", async ({ page }) => {
    await page.goto("/");

    // One tile per card, and the ids identify which mark is which.
    const ids = await page.$$eval("#background .logo-tile", (nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset.logo ?? ""),
    );
    expect(ids).toEqual(["fast-nu", "microsoft", "huggingface"]);

    // The Microsoft mark also appears on the portrait badge.
    await expect(page.locator(".hero-badge svg")).toHaveCount(1);

    // Logos are decorative: adjacent text already names the organisation, so an
    // announced logo would only be noise. Images use alt="", marks aria-hidden.
    const imageAlts = await page.$$eval("#background .logo-tile img", (nodes) =>
      nodes.map((node) => node.getAttribute("alt")),
    );
    expect(imageAlts.every((alt) => alt === "")).toBe(true);

    const svgHidden = await page.$$eval(
      "#background .logo-tile svg, .hero-badge svg",
      (nodes) => nodes.map((node) => node.getAttribute("aria-hidden")),
    );
    expect(svgHidden.every((hidden) => hidden === "true")).toBe(true);
  });

  test("the hiring strip answers availability first, and never scrolls", async ({ page }) => {
    await page.goto("/");

    const labels = await page.$$eval(".factbar .fact dt", (nodes) =>
      nodes.map((node) => node.textContent?.trim() ?? ""),
    );
    expect(labels).toEqual([
      "Available",
      "Based",
      "Experience",
      "Builds",
      "Clouds",
      "Certified",
    ]);

    // Six cells laid out without orphaning one onto a row of its own.
    const rowTops = await page.$$eval(".factbar .fact", (nodes) =>
      nodes.map((node) => Math.round(node.getBoundingClientRect().top)),
    );
    const perRow = new Map<number, number>();
    for (const top of rowTops) perRow.set(top, (perRow.get(top) ?? 0) + 1);
    expect(
      [...perRow.values()].every((count) => count > 1),
      "no fact sits alone on its own row",
    ).toBe(true);

    // Static by design — the strip it replaced had to be chased to be read.
    const animated = await page.evaluate(() =>
      document.getAnimations().some((animation) => {
        const target = animation.effect && "target" in animation.effect ? animation.effect.target : null;
        return target instanceof Element && target.closest(".factbar") !== null;
      }),
    );
    expect(animated, "the hiring strip must not animate").toBe(false);
  });

  test("the services section states three problems, each closed by evidence", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#services .card")).toHaveCount(3);
    await expect(page.locator("#services .card-proof")).toHaveCount(3);
    for (const proof of await page.locator("#services .card-proof").all()) {
      await expect(proof).not.toBeEmpty();
    }
  });

  test("shows no diagrams — those are the reward for clicking through", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("svg.dg")).toHaveCount(0);
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

test.describe("the page paints its own ground", () => {
  // The design commits to dark, so it must look deliberate under either system
  // preference rather than inheriting the host's colours.
  for (const colorScheme of ["light", "dark"] as const) {
    test(`body is opaque and legible under prefers-color-scheme: ${colorScheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");

      const background = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      );
      expect(background).not.toBe("rgba(0, 0, 0, 0)");
      expect(background).not.toBe("transparent");

      const ink = await page.evaluate(() => getComputedStyle(document.body).color);
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

  for (const path of ["/", "/work/ember"]) {
    test(`${path} has no serious axe violations`, async ({ page }) => {
      await page.goto(path);
      // Wait out the load-in stagger so contrast is sampled on settled colours.
      // Infinite animations are excluded by definition: they never reach
      // "finished", and they are not a transient state.
      await page.waitForFunction(
        () =>
          document
            .getAnimations()
            .filter((animation) => {
              const effect = animation.effect;
              if (!effect || !("getTiming" in effect)) return true;
              return effect.getTiming().iterations !== Infinity;
            })
            .every((animation) => animation.playState === "finished"),
        null,
        { timeout: 10_000 },
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
