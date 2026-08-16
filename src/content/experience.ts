import type { Role } from "@/types";

/** Straight from the CV, condensed for reading but not embellished. */
export const experience: readonly Role[] = [
  {
    company: "BrainBoxAutomations",
    role: "AI Engineer",
    when: "Jan 2025 — Present",
    where: "Remote",
    summary:
      "Three AI products end to end: sales automation over live inboxes, a production RAG microservice, and a multi-modal coaching system.",
    /**
     * Kimport, Halil and Anti-Fragility are written up as case studies above, so
     * describing them again here made a reader feel they had already read the
     * page. What is left is the part the cards do not cover: how the work ran.
     */
    bullets: [
      "Kimport, Halil and Anti-Fragility are all written up above — the case studies carry the architecture and the numbers.",
      "Owned each one from first commit to production: retrieval design, prompt and eval iteration, deployment, and the tuning that followed real usage.",
    ],
    stack: [
      "Python",
      "TypeScript",
      "FastAPI",
      "Qdrant",
      "Gemini",
      "Claude",
      "LangGraph",
      "Docling",
      "LaBSE",
      "Make.com",
      "GCP",
      "Amazon EC2",
    ],
  },
  {
    company: "Luminogics",
    role: "AI Engineer",
    when: "Jan 2025 — Oct 2025",
    where: "Remote",
    summary:
      "Fine-tuning, LLM-driven financial analysis, and agentic summarisation for very large documents.",
    bullets: [
      "Fine-tuned LLaMA 3 8B on 10K Alpaca samples using supervised PEFT training (Hugging Face Transformers) across dual T4 GPUs, aligning the model to behave like an instruct-style assistant.",
      "Developed an LLM-powered financial analysis module processing MCA scores, average monthly profits and statement summaries into insight on revenue trends, cash flow, debt obligations and risk indicators, with FastAPI as the backend.",
      "Worked on an agentic summarisation system for large-scale medical documents, extracting insight from PDFs exceeding 1,000 pages.",
    ],
    stack: [
      "Python",
      "TypeScript",
      "Next.js",
      "FastAPI",
      "OpenAI",
      "Claude",
      "DeepSeek",
      "Vercel",
    ],
  },
  {
    company: "Octopus Digital Ltd.",
    role: "Trainee Software Engineer",
    when: "Jul 2024 — Dec 2024",
    where: "Lahore",
    summary: "GenAI analytics and document QA on the Azure stack.",
    bullets: [
      "Developed a GenAI app for ad-hoc data analysis covering user management, time-series forecasting with AutoTS, and Azure OpenAI integration for richer insight.",
      "Worked on a Document QA solution using Azure OpenAI Assistants, surfacing relevant references with page numbers and user-friendly document views.",
    ],
    stack: [
      "Python",
      "Flask",
      "Azure Function App",
      "Azure Web App",
      "Docker",
      "Time Series Analysis",
    ],
  },
];
