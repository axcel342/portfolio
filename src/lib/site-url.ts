/**
 * Resolving the canonical origin.
 *
 * `metadataBase` needs an absolute URL, and a bad value there fails the build
 * during page-data collection with nothing but `Invalid URL` — the offending
 * value is redacted in Vercel's logs because it came from the environment. So
 * this never throws: an unusable value is ignored in favour of the next source.
 *
 * Vercel exposes the deployment host itself, so the common case needs no
 * configuration at all.
 */

/**
 * The index signature is load-bearing: without it TypeScript's weak-type check
 * rejects `process.env` (a `ProcessEnv`) against an all-optional type.
 */
export interface SiteUrlEnv {
  /** Explicit override. Wins over everything. */
  readonly NEXT_PUBLIC_SITE_URL?: string | undefined;
  /** Vercel: the stable production host, e.g. "portfolio.vercel.app". */
  readonly VERCEL_PROJECT_PRODUCTION_URL?: string | undefined;
  /** Vercel: this specific deployment's host, including previews. */
  readonly VERCEL_URL?: string | undefined;
  readonly [key: string]: string | undefined;
}

export const LOCAL_ORIGIN = "http://localhost:3000";

/**
 * Coerces a configured value to an origin, or returns undefined if it cannot be
 * one. A bare host is assumed to be https, since that is how Vercel reports it.
 */
export function toOrigin(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;

  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed);
  const candidate = hasScheme ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    // Reject things that parse but cannot serve a page, e.g. "mailto:x".
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    if (!url.hostname) return undefined;
    // Credentials never belong in a public origin, and their presence usually
    // means the value was something else entirely — "mailto:someone@host"
    // prefixed with a scheme parses as user:password@host.
    if (url.username || url.password) return undefined;
    // A bare word with no dot ("anything", "changeme") parses as a host but is a
    // placeholder. An explicitly-schemed value is trusted as written, so an
    // internal hostname still works.
    if (!hasScheme && !url.hostname.includes(".") && url.hostname !== "localhost") {
      return undefined;
    }
    return url.origin;
  } catch {
    return undefined;
  }
}

/** First usable origin, falling back to localhost so a dev build always works. */
export function resolveSiteUrl(env: SiteUrlEnv): string {
  return (
    toOrigin(env.NEXT_PUBLIC_SITE_URL) ??
    toOrigin(env.VERCEL_PROJECT_PRODUCTION_URL) ??
    toOrigin(env.VERCEL_URL) ??
    LOCAL_ORIGIN
  );
}
