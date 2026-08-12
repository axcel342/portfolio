import { describe, expect, it } from "vitest";
import { LOCAL_ORIGIN, resolveSiteUrl, toOrigin } from "./site-url";

describe("toOrigin", () => {
  it("keeps an absolute https URL", () => {
    expect(toOrigin("https://mominqureshi.com")).toBe("https://mominqureshi.com");
  });

  it("assumes https for a bare host, which is how Vercel reports one", () => {
    expect(toOrigin("portfolio-momin.vercel.app")).toBe("https://portfolio-momin.vercel.app");
  });

  it("reduces a full URL to its origin", () => {
    expect(toOrigin("https://example.com/work/kimport?x=1#y")).toBe("https://example.com");
  });

  it("keeps an explicit port", () => {
    expect(toOrigin("http://localhost:3100")).toBe("http://localhost:3100");
  });

  it("tolerates surrounding whitespace", () => {
    expect(toOrigin("  https://example.com  ")).toBe("https://example.com");
  });

  it.each([undefined, "", "   "])("ignores an absent value (%p)", (value) => {
    expect(toOrigin(value)).toBeUndefined();
  });

  it.each(["mailto:momin@example.com", "ftp://example.com", "https://"])(
    "ignores a value that cannot serve a page (%s)",
    (value) => {
      expect(toOrigin(value)).toBeUndefined();
    },
  );

  it.each(["anything", "changeme", "TODO"])(
    "ignores a bare placeholder word rather than treating it as a host (%s)",
    (value) => {
      expect(toOrigin(value)).toBeUndefined();
    },
  );

  it("trusts an explicitly-schemed internal host even without a dot", () => {
    expect(toOrigin("http://intranet:8080")).toBe("http://intranet:8080");
  });

  it("never throws, whatever it is handed", () => {
    expect(() => toOrigin("http://[bad")).not.toThrow();
    expect(toOrigin("http://[bad")).toBeUndefined();
  });
});

describe("resolveSiteUrl", () => {
  it("prefers the explicit override", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://mominqureshi.com",
        VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
        VERCEL_URL: "portfolio-abc123.vercel.app",
      }),
    ).toBe("https://mominqureshi.com");
  });

  it("falls back to the stable production host on Vercel", () => {
    expect(
      resolveSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
        VERCEL_URL: "portfolio-abc123.vercel.app",
      }),
    ).toBe("https://portfolio.vercel.app");
  });

  it("uses the per-deployment host for a preview build", () => {
    expect(resolveSiteUrl({ VERCEL_URL: "portfolio-abc123.vercel.app" })).toBe(
      "https://portfolio-abc123.vercel.app",
    );
  });

  it("falls back to localhost when nothing is configured", () => {
    expect(resolveSiteUrl({})).toBe(LOCAL_ORIGIN);
  });

  // The bug that broke the first deploy: a placeholder must not fail the build.
  it("skips an unusable override instead of throwing", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "anything",
        VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
      }),
    ).toBe("https://portfolio.vercel.app");
  });

  it("still yields a usable origin when every value is junk", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "://", VERCEL_URL: "  " })).toBe(LOCAL_ORIGIN);
  });
});
