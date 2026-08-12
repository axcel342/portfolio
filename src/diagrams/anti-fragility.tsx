import type { ReactElement } from "react";
import { Arrowheads } from "./arrowhead";

const S = "antifragility";

/**
 * The decision worth drawing: several named vectors on one Qdrant point, rather
 * than one collection per representation.
 */
export function AntiFragilityDiagram(): ReactElement {
  return (
    <svg
      className="dg"
      viewBox="-2 -2 568 254"
      role="img"
      aria-label="Over 600 documents are chunked and embedded with gemini-embedding-001 into a single Qdrant point per document carrying several named vectors. A question retrieves against the named vector it needs, and generation runs on Gemini 2.5 Flash or Claude Sonnet. The service runs on EC2 and was stress-tested to 150 concurrent users."
    >
      <Arrowheads scope={S} />

      <text className="t-faint" x="0" y="12">
        INDEXING
      </text>

      <rect className="box" x="0" y="42" width="84" height="34" />
      <text x="42" y="63" textAnchor="middle">
        600+ DOCS
      </text>

      <rect className="box" x="122" y="42" width="70" height="34" />
      <text x="157" y="63" textAnchor="middle">
        CHUNK
      </text>

      <rect className="box" x="230" y="36" width="118" height="46" />
      <text x="289" y="55" textAnchor="middle">
        EMBED
      </text>
      <text className="t-faint" x="289" y="70" textAnchor="middle">
        GEMINI-EMBEDDING-001
      </text>

      {/* one point, several named vectors — the whole reason this drawing exists */}
      <rect className="box-store" x="398" y="20" width="150" height="88" />
      <text className="t-faint" x="473" y="36" textAnchor="middle">
        ONE QDRANT POINT
      </text>
      <rect className="box-accent" x="410" y="44" width="126" height="17" />
      <text className="t-accent" x="473" y="56" textAnchor="middle">
        NAMED VECTOR 1
      </text>
      <rect className="box-accent" x="410" y="64" width="126" height="17" />
      <text className="t-accent" x="473" y="76" textAnchor="middle">
        NAMED VECTOR 2
      </text>
      <rect className="box-accent" x="410" y="84" width="126" height="17" />
      <text className="t-accent" x="473" y="96" textAnchor="middle">
        NAMED VECTOR n
      </text>

      <path className="edge" d="M 84 59 L 118 59" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 192 59 L 226 59" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 348 59 L 394 59" markerEnd={`url(#${S}-head)`} />

      <text className="t-faint" x="0" y="140">
        SERVING
      </text>

      <rect className="box" x="0" y="152" width="84" height="34" />
      <text x="42" y="173" textAnchor="middle">
        QUESTION
      </text>

      <rect className="box" x="122" y="152" width="112" height="34" />
      <text x="178" y="173" textAnchor="middle">
        RETRIEVE
      </text>

      <rect className="box" x="272" y="146" width="150" height="46" />
      <text x="347" y="165" textAnchor="middle">
        GEMINI 2.5 FLASH
      </text>
      <text className="t-faint" x="347" y="180" textAnchor="middle">
        CLAUDE SONNET 4.5
      </text>

      <path className="edge" d="M 84 169 L 118 169" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 234 169 L 268 169" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 422 169 L 500 169" markerEnd={`url(#${S}-head)`} />
      <text className="t-faint" x="508" y="172">
        ANSWER
      </text>

      {/* the point feeds retrieval, picking the vector it needs */}
      <path
        className="edge-soft"
        d="M 473 108 L 473 126 L 178 126 L 178 148"
        markerEnd={`url(#${S}-head)`}
      />

      <text className="t-faint" x="0" y="236">
        AMAZON EC2 · STRESS-TESTED TO 150 CONCURRENT USERS · 75+ BETA USERS
      </text>
    </svg>
  );
}
