import type { ReactNode } from "react";
import { citeSet } from "@/components/cite";
import type { CaseStudySlug, CompactItem } from "@/types";

/**
 * Sources are declared in the order they are first cited on the page: the hero
 * first, then the work list.
 */
const { Cite, Rail } = citeSet("home", [
  {
    id: "eval-loop",
    source:
      "Draft-adoption, response-time and conversion eval pipeline, Kimport (2025); response relevance and tone iterated from 75+ beta users on Anti-Fragility Coach.",
  },
  {
    id: "ember-governance",
    source:
      "Ember — contributing to a platform of persistent, governed AI agents over meetings, tasks, relationships and projects, including agent evaluation and regression tooling.",
  },
  {
    id: "ember-compliance",
    source:
      "Driving vulnerability remediation across the Ember monorepo to support SOC 2 and HIPAA compliance readiness via Vanta.",
  },
  {
    id: "anti-scale",
    source:
      "600+ documents embedded in Qdrant; stress-tested for 150 concurrent users; deployed with 75+ active beta users on Amazon EC2.",
  },
  {
    id: "halil-arch",
    source:
      "Four-node LangGraph workflow with LaBSE embeddings across 100+ languages and layout-aware ingestion of PDF, TXT and PPTX via Docling.",
  },
] as const);

export const HomeRail = Rail;

export const headline = (
  <>
    I build retrieval and agent systems that <em>survive real users.</em>
  </>
);

export const lede = (
  <>
    Two years of production LLM work across Python and TypeScript: hybrid retrieval, LangGraph
    orchestration, tool use, and the eval harnesses that tell you whether any of it actually worked.
    <Cite id="eval-loop" /> Right now I&rsquo;m on an enterprise agent platform, where the hard part
    is governance rather than generation.
    <Cite id="ember-governance" />
  </>
);

/** One sourced summary per case study, keyed so the work list cannot fall out of sync. */
export const workSummaries: Record<CaseStudySlug, ReactNode> = {
  ember: (
    <>
      I contribute to a platform of persistent, governed agents — meetings, tasks, relationships,
      projects — and work on the evaluation and regression tooling that grades what those agents
      actually did rather than what the code returned.
      <Cite id="ember-governance" /> I also drive vulnerability remediation across the monorepo for
      SOC 2 and HIPAA readiness.
      <Cite id="ember-compliance" />
    </>
  ),
  kimport: (
    <>
      Hybrid retrieval — BM25 alongside dense vectors in Qdrant — over four Gmail inboxes, drafting
      contextual replies and surfacing clients who had gone quiet. Shipped with an eval pipeline
      measuring whether the drafts actually got sent.
      <Cite id="eval-loop" />
    </>
  ),
  "anti-fragility": (
    <>
      A multi-modal RAG coaching system on EC2 over 600+ embedded documents, stress-tested to 150
      concurrent users and tuned on feedback from 75+ live beta users.
      <Cite id="anti-scale" />
    </>
  ),
  halil: (
    <>
      A four-node LangGraph workflow that decides whether a question needs retrieval at all, with
      LaBSE embeddings across 100+ languages and layout-aware ingestion for PDF, TXT and PPTX.
      <Cite id="halil-arch" />
    </>
  ),
};

export const alsoBuilt: readonly CompactItem[] = [
  {
    title: "Medical Chat Bot",
    when: "2025",
    detail:
      "Med LLaMA 3 8B fine-tuned on 10K instruction-following samples with PEFT on dual T4 GPUs, then deployed on Hugging Face Spaces with llama-cpp-python for optimised inference.",
    stack: "PyTorch · Transformers · PEFT · LLaMA 3",
  },
  {
    title: "MedLegal Document Summarisation",
    when: "2024",
    detail:
      "Azure OpenAI and a custom document classifier condensing 1,000+ page medical files into 40-page summaries, with automated segmentation for medico-legal document structures.",
    stack: "Python · Azure OpenAI · Azure Document Classifier",
  },
];

export const contactLine = "Looking for AI engineering work on systems that reach real users.";
