import { existsSync } from "node:fs";
import { join } from "node:path";
import { resolveSiteUrl } from "@/lib/site-url";
import type { NavSection } from "@/types";

/**
 * Drop a file at public/portrait.jpg and the hero shows it. Remove the file and
 * the hero lays out cleanly without a gap where a photo should be — so the
 * portrait is optional rather than load-bearing.
 */
function findPortrait(): string | null {
  try {
    return existsSync(join(process.cwd(), "public", "portrait.jpg")) ? "/portrait.jpg" : null;
  } catch {
    return null;
  }
}

export const profile = {
  name: "Momin Imran Qureshi",
  firstName: "Momin",
  role: "AI Engineer",
  location: "Lahore, Pakistan",
  /** For tight rows — the hero card's meta line wraps at the full spelling. */
  locationShort: "Lahore, PK",
  availability: "Open to new roles & client work",
  email: "mominimran000@gmail.com",
  phone: "+92 321-8336629",
  portrait: findPortrait(),
  /**
   * A real credential from the CV, not a manufactured accolade. The Microsoft
   * mark rendered beside it names the issuer.
   */
  badge: "Azure AI Engineer · AI-102",
  badgeHref:
    "https://learn.microsoft.com/api/credentials/share/en-us/MominImranQureshi-0804/9415DFC214F7DEBC",
  links: {
    github: "https://github.com/axcel342",
    linkedin: "https://www.linkedin.com/in/momin-imran-qureshi",
    /* Named rather than "resume.pdf" so the file a recruiter downloads is
       identifiable in a folder of other people's CVs. Every résumé link on the
       site reads this one value. */
    resume: "/Momin_Imran_Qureshi_CV.pdf",
  },
  /**
   * Derived from the deployment unless NEXT_PUBLIC_SITE_URL overrides it, so a
   * Vercel deploy needs no configuration and a bad value can never fail the
   * build. See src/lib/site-url.ts.
   */
  siteUrl: resolveSiteUrl(process.env),
  tagline:
    "AI engineer building production LLM and agent systems — retrieval, orchestration, tool use, and the evaluation that proves they work.",
} as const;

/** Kept in page order, so the nav reads top to bottom the way the page does. */
export const navSections: readonly NavSection[] = [
  { id: "work", label: "Work" },
  { id: "background", label: "Background" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  // No "Contact" entry — the nav's primary button already goes there.
];
