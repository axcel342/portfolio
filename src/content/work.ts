import type { WorkIndexEntry } from "@/types";

/**
 * The ordered case-study index. Routing, the home page cards, and the
 * previous/next pager all read this, so order is defined once.
 *
 * Ember leads because enterprise scope is the strongest first signal; Halil
 * closes because it is the most narrowly architectural.
 */
export const workIndex: readonly WorkIndexEntry[] = [
  {
    slug: "ember",
    title: "Ember — Enterprise AI Agent Platform",
    year: "2026",
    domain: "Enterprise · Governed agents",
    summary:
      "Persistent, governed agents over meetings, tasks, relationships and projects. I work on the evaluation and regression tooling that grades what agents actually did, and drive vulnerability remediation for SOC 2 and HIPAA readiness.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "OpenSearch", "Celery", "Docker"],
  },
  {
    slug: "kimport",
    title: "Kimport AI Sales Assistant",
    year: "2025",
    domain: "Sales automation · Hybrid retrieval",
    summary:
      "Hybrid retrieval — BM25 alongside dense vectors in Qdrant — over four live Gmail inboxes, drafting contextual replies and surfacing clients who had gone quiet. Shipped with an eval pipeline measuring whether the drafts actually got sent.",
    stats: [
      { value: "4", label: "inboxes" },
      { value: "5", label: "users" },
      { value: "2", label: "retrievers fused" },
    ],
    stack: ["Python", "FastAPI", "Qdrant", "Gemini", "Claude", "Google Sheets API", "GCP"],
  },
  {
    slug: "anti-fragility",
    title: "Anti-Fragility Coach",
    year: "2025",
    domain: "Multi-modal RAG · Production",
    summary:
      "A multi-modal RAG coaching system on EC2 over 600+ embedded documents, using named vectors on a single Qdrant point per document. Stress-tested to 150 concurrent users and tuned on feedback from 75+ live beta users.",
    stats: [
      { value: "600+", label: "documents" },
      { value: "150", label: "concurrent" },
      { value: "75+", label: "beta users" },
    ],
    stack: ["Python", "FastAPI", "Qdrant", "Gemini 2.5 Flash", "Claude Sonnet 4.5", "Amazon EC2"],
  },
  {
    slug: "halil",
    title: "Halil RAG Microservice",
    year: "2025",
    domain: "RAG architecture · Streaming",
    summary:
      "A four-node LangGraph workflow that decides whether a question needs retrieval at all, with LaBSE embeddings across 100+ languages and layout-aware ingestion for PDF, TXT and PPTX including speaker notes.",
    stats: [
      { value: "4", label: "graph nodes" },
      { value: "100+", label: "languages" },
      { value: "3", label: "file formats" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Qdrant", "Docling", "LaBSE", "OpenRouter"],
  },
];
