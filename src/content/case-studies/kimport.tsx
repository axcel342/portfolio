import { citeSet } from "@/components/cite";
import { KimportDiagram } from "@/diagrams/kimport";
import type { CaseStudy } from "@/types";

const { Cite, Rail } = citeSet("kimport", [
  {
    id: "team",
    source:
      "AI-powered sales automation for 4 sales employees and 1 executive, monitoring Gmail inboxes to generate contextual reply drafts.",
  },
  {
    id: "retrieval",
    source:
      "Hybrid retrieval — BM25 plus dense vectors via Qdrant — with generation on Gemini and Claude.",
  },
  {
    id: "evals",
    source:
      "Evaluation and analytics pipeline measuring AI draft adoption, response times, activity classification and conversion outcomes per employee; plus a stalled-client detection engine.",
  },
  {
    id: "exec",
    source:
      "Lightweight executive chat UI over a Google Sheets integration and FastAPI on a self-hosted GCP VM.",
  },
] as const);

export const kimport: CaseStudy = {
  slug: "kimport",
  title: "Kimport AI Sales Assistant",
  year: "2025",
  dek: "Four inboxes, five people, and a question nobody could answer: are the AI drafts any good?",
  description:
    "Hybrid retrieval over four Gmail inboxes, and the eval pipeline that turned draft quality from an opinion into a number.",
  meta: [
    { label: "Role", value: "Sole engineer" },
    { label: "Year", value: "2025" },
    { label: "Users", value: "4 sales + 1 exec" },
    { label: "Retrieval", value: "BM25 + dense" },
    { label: "Stack", value: "FastAPI · Qdrant · Gemini · Claude · GCP" },
  ],
  Diagram: KimportDiagram,
  diagramCaption:
    "Fig. 1 — Retrieval fuses two rankings, and every draft's fate feeds back into the system.",
  problem: (
    <>
      <p>
        A four-person sales team was losing deals to silence. Threads went cold and nobody noticed;
        replies took long enough that the context had to be rebuilt from scratch each time. The
        executive had no view of any of it beyond asking people how it was going.
        <Cite id="team" />
      </p>
    </>
  ),
  decision: (
    <>
      <p>
        Dense retrieval alone kept missing the tokens that matter most in a sales thread — product
        codes, order numbers, a client&rsquo;s exact company name. Embeddings are good at meaning and
        indifferent to strings, and a draft that invents the one identifier a client will check is
        worse than no draft at all.
      </p>
      <p>
        So retrieval runs BM25 and dense vectors over Qdrant and fuses the two rankings.
        <Cite id="retrieval" /> It costs a second index to maintain and a slower path to the first
        token. What it buys is that exact-match terms cannot be paraphrased away — which is the
        failure a reader notices immediately, and the one that loses trust in the whole system.
      </p>
    </>
  ),
  outcome: (
    <>
      <p>
        The part I would build first if I started again is the measurement, not the model.
      </p>
      <p>
        An eval pipeline records what happened to every draft — sent, edited, or discarded — per
        employee, alongside response times, activity classification and conversion outcomes.
        <Cite id="evals" /> That turned draft quality from an opinion into a number. A stalled-client
        detector then fell out of the same thread state almost for free: when a conversation goes
        quiet past its own rhythm, it surfaces before anyone has to remember it.
      </p>
      <p>
        The executive got a small chat interface over the same data, so &ldquo;which clients went
        quiet this week&rdquo; became a question rather than a report request.
        <Cite id="exec" />
      </p>
    </>
  ),
  Rail,
};
