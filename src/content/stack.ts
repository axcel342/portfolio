/**
 * The stack inventory, grouped so a reader scanning for one keyword finds it
 * fast. Every entry appears on the CV — nothing aspirational.
 */
export type StackGroup = {
  readonly title: string;
  readonly items: readonly string[];
};

export const stackGroups: readonly StackGroup[] = [
  {
    title: "AI & agents",
    items: [
      "LLMs",
      "RAG",
      "Agent orchestration",
      "LangGraph",
      "Tool use",
      "Multi-agent systems",
      "Evaluation & regression",
      "Fine-tuning (PEFT)",
      "NLP",
      "Information retrieval",
    ],
  },
  {
    title: "Retrieval & data",
    items: [
      "Qdrant",
      "BM25",
      "Hybrid retrieval",
      "LaBSE",
      "gemini-embedding-001",
      "OpenSearch",
      "Docling",
      "PostgreSQL",
      "Redis",
      "Time-series (AutoTS)",
    ],
  },
  {
    title: "Models & platforms",
    items: [
      "Claude",
      "Gemini",
      "OpenAI",
      "DeepSeek",
      "LLaMA 3",
      "Hugging Face Transformers",
      "PyTorch",
      "Azure OpenAI",
      "OpenRouter",
      "llama-cpp-python",
    ],
  },
  {
    title: "Backend & infra",
    items: [
      "Python",
      "TypeScript",
      "FastAPI",
      "Next.js",
      "Flask",
      "Celery",
      "Docker",
      "Amazon EC2",
      "GCP",
      "Azure Functions",
      "Vercel",
      "Make.com",
    ],
  },
];
