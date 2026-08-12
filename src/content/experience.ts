import type { Role } from "@/types";

export const experience: readonly Role[] = [
  {
    company: "BrainBoxAutomations",
    role: "AI Engineer",
    when: "Jan 2025 — present",
    detail:
      "Three AI products end to end: sales automation over live inboxes, a production RAG microservice, and a multi-modal coaching system.",
    stack: "Python · TypeScript · FastAPI · Qdrant · LangGraph · Gemini · Claude · GCP · EC2",
  },
  {
    company: "Luminogics",
    role: "AI Engineer",
    when: "Jan 2025 — Oct 2025",
    detail:
      "Supervised fine-tuning on dual T4 GPUs, an LLM financial-analysis module reading statements into risk indicators, and agentic summarisation for documents past 1,000 pages.",
    stack: "Python · TypeScript · Next.js · FastAPI · OpenAI · Claude · DeepSeek · Vercel",
  },
  {
    company: "Octopus Digital Ltd.",
    role: "Trainee Software Engineer",
    when: "Jul 2024 — Dec 2024",
    detail:
      "A GenAI app for ad-hoc analysis with AutoTS time-series forecasting, and document QA on Azure OpenAI Assistants with page-level references.",
    stack: "Python · Flask · Azure Functions · Azure Web Apps · Docker · Time series",
  },
];
