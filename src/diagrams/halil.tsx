import type { ReactElement } from "react";
import { Arrowheads } from "./arrowhead";

const S = "halil";

/**
 * The point of the drawing: routing can skip retrieval entirely, so the index
 * is not on the path of every message.
 */
export function HalilDiagram(): ReactElement {
  return (
    <svg
      className="dg"
      viewBox="-2 -2 568 274"
      role="img"
      aria-label="Ingestion path: PDF, TXT and PPTX documents pass through layout-aware Docling extraction, are embedded with LaBSE, and land in Qdrant. Query path: a question is classified, then routed — chit-chat goes straight to generation, while a real question retrieves from Qdrant first. Responses stream."
    >
      <Arrowheads scope={S} />

      {/* ---- ingestion lane ---- */}
      <text className="t-faint" x="0" y="12">
        INGESTION
      </text>

      <rect className="box" x="0" y="22" width="46" height="24" />
      <text x="23" y="38" textAnchor="middle">
        PDF
      </text>
      <rect className="box" x="0" y="52" width="46" height="24" />
      <text x="23" y="68" textAnchor="middle">
        TXT
      </text>
      <rect className="box" x="0" y="82" width="46" height="24" />
      <text x="23" y="98" textAnchor="middle">
        PPTX
      </text>

      <rect className="box" x="104" y="46" width="88" height="36" />
      <text x="148" y="61" textAnchor="middle">
        DOCLING
      </text>
      <text className="t-faint" x="148" y="73" textAnchor="middle">
        LAYOUT-AWARE
      </text>

      <rect className="box" x="240" y="46" width="88" height="36" />
      <text x="284" y="61" textAnchor="middle">
        LaBSE
      </text>
      <text className="t-faint" x="284" y="73" textAnchor="middle">
        100+ LANGUAGES
      </text>

      <rect className="box-store" x="392" y="46" width="88" height="36" />
      <text x="436" y="68" textAnchor="middle">
        QDRANT
      </text>

      <path className="edge" d="M 46 34 L 78 34 L 78 64 L 100 64" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 46 64 L 100 64" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 46 94 L 78 94 L 78 64 L 100 64" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 192 64 L 236 64" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 328 64 L 388 64" markerEnd={`url(#${S}-head)`} />

      {/* ---- query lane ---- */}
      <text className="t-faint" x="0" y="150">
        QUERY PATH
      </text>

      <rect className="box" x="0" y="160" width="66" height="30" />
      <text x="33" y="179" textAnchor="middle">
        QUESTION
      </text>

      <rect className="box" x="104" y="160" width="88" height="30" />
      <text x="148" y="179" textAnchor="middle">
        CLASSIFY
      </text>

      <rect className="box-accent" x="240" y="160" width="88" height="30" />
      <text className="t-accent" x="284" y="179" textAnchor="middle">
        ROUTE
      </text>

      <rect className="box" x="392" y="118" width="88" height="30" />
      <text x="436" y="137" textAnchor="middle">
        RETRIEVE
      </text>

      <rect className="box" x="392" y="202" width="88" height="30" />
      <text x="436" y="221" textAnchor="middle">
        GENERATE
      </text>

      <path className="edge" d="M 66 175 L 100 175" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 192 175 L 236 175" markerEnd={`url(#${S}-head)`} />

      {/* route -> retrieve (a real question) */}
      <path
        className="edge-accent"
        d="M 328 170 L 360 170 L 360 133 L 388 133"
        markerEnd={`url(#${S}-head-accent)`}
      />
      {/* route -> generate, skipping the index entirely */}
      <path
        className="edge-accent"
        d="M 328 180 L 360 180 L 360 217 L 388 217"
        markerEnd={`url(#${S}-head-accent)`}
      />
      <text className="t-accent" x="336" y="256">
        ROUTE MAY SKIP RETRIEVAL ENTIRELY
      </text>

      {/* qdrant feeds retrieval; retrieval feeds generation */}
      <path className="edge-soft" d="M 436 82 L 436 114" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 436 148 L 436 198" markerEnd={`url(#${S}-head)`} />

      <path className="edge" d="M 480 217 L 502 217" markerEnd={`url(#${S}-head)`} />
      <text className="t-faint" x="510" y="220">
        STREAM
      </text>
    </svg>
  );
}
