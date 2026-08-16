import type { Role } from "@/types";

/** Straight from the CV, condensed for reading but not embellished. */
export const experience: readonly Role[] = [
  {
    company: "BrainBoxAutomations",
    role: "AI Engineer",
    when: "Sep 2025 — Present",
    where: "Remote",
    summary:
      "Three AI products end to end: sales automation over live inboxes, a production RAG microservice, and a multi-modal coaching system.",
    bullets: [
      "Built Kimport AI Sales Assistant — an AI sales automation system monitoring 4 Gmail inboxes, generating contextual reply drafts with hybrid retrieval (BM25 + dense vectors via Qdrant) and LLMs, with stalled-client detection and executive analytics.",
      "Developed the Halil RAG Chatbot Microservice — a production-grade RAG API on FastAPI with LangGraph query routing, LaBSE multi-language embeddings, and layout-aware ingestion of PDF, TXT and PPTX via Docling.",
      "Built Anti-Fragility Coach — a multi-modal RAG system on Gemini 2.5 Flash, Claude Sonnet 4.5 and Qdrant on Amazon EC2, embedding 600+ documents with gemini-embedding-001; iterated prompt and retrieval quality on feedback from 75+ beta users.",
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
