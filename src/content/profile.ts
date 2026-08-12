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
  /** Overridden per deployment; the fallback keeps local builds and tests honest. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline:
    "AI engineer building production LLM and agent systems — retrieval, orchestration, tool use, and the evaluation that proves they work.",
} as const;
