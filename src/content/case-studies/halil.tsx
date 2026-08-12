import { citeSet } from "@/components/cite";
import { HalilDiagram } from "@/diagrams/halil";
import type { CaseStudy } from "@/types";

const { Cite, Rail } = citeSet("halil", [
  {
    id: "graph",
    source:
      "LangGraph-based four-node workflow — classification, route, retrieval, generation — with streaming responses.",
  },
  {
    id: "labse",
    source:
      "LaBSE multi-language embeddings covering 100+ languages, with Qdrant vector search for context-aware answers.",
  },
  {
    id: "ingest",
    source:
      "Layout-aware PDF extraction via Docling with automatic table detection, charset-aware TXT processing, and per-slide PPTX extraction including speaker notes.",
  },
] as const);

export const halil: CaseStudy = {
  slug: "halil",
  title: "Halil RAG Microservice",
  year: "2025",
  dek: "Documents in three formats, questions in a hundred languages, and a router that knows when not to retrieve.",
  description:
    "A production RAG microservice whose LangGraph workflow decides whether a question needs the index at all.",
  meta: [
    { label: "Role", value: "Sole engineer" },
    { label: "Year", value: "2025" },
    { label: "Languages", value: "100+" },
    { label: "Formats", value: "PDF, TXT, PPTX" },
    { label: "Stack", value: "FastAPI · LangGraph · Qdrant · Docling · LaBSE" },
  ],
  Diagram: HalilDiagram,
  diagramCaption: "Fig. 1 — Classification decides whether a question reaches the index at all.",
  problem: (
    <>
      <p>
        A chatbot that retrieves for every message pays for it twice: latency on questions that never
        needed a document, and invented citations on messages that were not questions at all.
      </p>
      <p>
        Meanwhile the documents arrive in the least convenient shapes available — PDFs whose meaning
        lives in tables, plain text in unpredictable encodings, and slide decks whose real content is
        in the speaker notes.
        <Cite id="ingest" />
      </p>
    </>
  ),
  decision: (
    <>
      <p>Retrieval is conditional, and the condition is a node in the graph.</p>
      <p>
        The workflow is four LangGraph nodes — classification, routing, retrieval, generation — where
        routing can send a message straight to generation and skip the index entirely.
        <Cite id="graph" /> Writing that as an explicit graph rather than an if-statement buried in a
        handler makes the decision inspectable: you can see which path a request took, which is the
        first thing you want to know when an answer is wrong.
      </p>
      <p>
        Embeddings are LaBSE rather than an English-first model, because queries genuinely arrive in
        many languages and a monolingual encoder degrades quietly rather than obviously — it returns
        confident nonsense instead of nothing.
        <Cite id="labse" />
      </p>
    </>
  ),
  outcome: (
    <>
      <p>
        Ingestion is layout-aware rather than text-dumping. Docling extracts PDFs with automatic
        table detection, TXT is decoded charset-aware instead of assuming UTF-8, and PPTX is
        extracted per slide including speaker notes.
        <Cite id="ingest" />
      </p>
      <p>
        Responses stream, so a routed-to-generation reply feels immediate and a retrieval-heavy one
        shows progress instead of a spinner.
      </p>
    </>
  ),
  Rail,
};
