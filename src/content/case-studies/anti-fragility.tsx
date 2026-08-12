import { citeSet } from "@/components/cite";
import { AntiFragilityDiagram } from "@/diagrams/anti-fragility";
import type { CaseStudy } from "@/types";

const { Cite, Rail } = citeSet("anti-fragility", [
  {
    id: "corpus",
    source:
      "Multi-modal RAG coaching system on FastAPI with Gemini 2.5 Flash / 3 Pro and Claude Sonnet 4.5 / Opus 4.5, hosted on Amazon EC2.",
  },
  {
    id: "vectors",
    source:
      "600+ documents embedded in Qdrant using a named-vector approach with the gemini-embedding-001 model.",
  },
  {
    id: "scale",
    source:
      "Scaled and stress-tested for 150 concurrent users, then deployed to production with 75+ active beta users.",
  },
] as const);

export const antiFragility: CaseStudy = {
  slug: "anti-fragility",
  title: "Anti-Fragility Coach",
  year: "2025",
  dek: "A coaching system that had to stay grounded in 600 documents and stay standing for 150 people at once.",
  description:
    "Multi-modal RAG on EC2 over 600+ embedded documents, using named vectors on a single Qdrant point per document.",
  meta: [
    { label: "Role", value: "Sole engineer" },
    { label: "Year", value: "2025" },
    { label: "Corpus", value: "600+ documents" },
    { label: "Load", value: "150 concurrent" },
    { label: "Users", value: "75+ beta" },
    { label: "Stack", value: "FastAPI · Qdrant · Gemini · Claude · EC2" },
  ],
  Diagram: AntiFragilityDiagram,
  diagramCaption: "Fig. 1 — One point per document, several named vectors, one retrieval path.",
  problem: (
    <>
      <p>
        Coaching advice is only worth reading if it comes from a specific body of material rather
        than a model&rsquo;s general impression of self-help. The corpus was multi-modal, and the
        system had to answer in a voice people would keep listening to.
        <Cite id="corpus" />
      </p>
      <p>
        That makes it a retrieval problem before it is a prompting problem. Ungrounded advice sounds
        exactly as confident as grounded advice, so the only defence is making sure the right passage
        is in front of the model.
      </p>
    </>
  ),
  decision: (
    <>
      <p>
        I embedded the corpus as named vectors on a single Qdrant point per document, rather than as
        one collection per model or modality.
        <Cite id="vectors" />
      </p>
      <p>
        The alternative — parallel collections — is easier to reason about and considerably worse to
        operate. Every retrieval has to fan out and merge, and re-embedding one representation means
        rebuilding a whole collection while the old one is still serving traffic. Named vectors keep
        a document&rsquo;s representations together, so a query addresses the vector it needs and a
        re-embedding touches one field instead of one collection.
      </p>
      <p>
        Generation runs on Gemini 2.5 Flash and Claude Sonnet 4.5, with the larger models kept for
        the requests that actually need them.
      </p>
    </>
  ),
  outcome: (
    <>
      <p>
        Stress-tested to 150 concurrent users before launch, then run in production for 75+ active
        beta users on EC2.
        <Cite id="scale" />
      </p>
      <p>
        What the beta actually changed was tone. Relevance was tunable through retrieval; the
        feedback that mattered was about how the advice <em>sounded</em>, and none of it surfaced
        until real people were using it. Both response relevance and tone were iterated from that
        feedback rather than from my own reading of the output — which is the part I could not have
        got right alone.
      </p>
    </>
  ),
  Rail,
};
