import { resolveSiteUrl } from "@/lib/site-url";

export const profile = {
  name: "Momin Imran Qureshi",
  role: "AI Engineer",
  location: "Lahore, Pakistan",
  availability: "Open to work",
  email: "mominimran000@gmail.com",
  links: {
    github: "https://github.com/axcel342",
    linkedin: "https://www.linkedin.com/in/momin-imran-qureshi",
    resume: "/resume.pdf",
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
