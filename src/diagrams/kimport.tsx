import type { ReactElement } from "react";
import { Arrowheads } from "./arrowhead";

const S = "kimport";

/**
 * Two things the drawing has to show: retrieval fuses two rankings rather than
 * trusting one, and every draft's fate feeds back into the system.
 */
export function KimportDiagram(): ReactElement {
  return (
    <svg
      className="dg"
      viewBox="-2 -2 568 270"
      role="img"
      aria-label="Four Gmail inboxes feed thread state. Retrieval runs BM25 and dense vectors over Qdrant in parallel and fuses the two rankings before a draft is generated on Gemini or Claude. What happens to each draft — sent, edited or discarded — feeds an eval loop measuring adoption and conversion, which loops back into retrieval. Thread state also drives stalled-client detection."
    >
      <Arrowheads scope={S} />

      <text className="t-faint" x="0" y="12">
        RETRIEVAL AND DRAFTING
      </text>

      <rect className="box" x="0" y="54" width="82" height="34" />
      <text x="41" y="69" textAnchor="middle">
        4 INBOXES
      </text>
      <text className="t-faint" x="41" y="81" textAnchor="middle">
        GMAIL
      </text>

      <rect className="box" x="120" y="54" width="90" height="34" />
      <text x="165" y="69" textAnchor="middle">
        THREAD
      </text>
      <text x="165" y="81" textAnchor="middle">
        STATE
      </text>

      <rect className="box" x="248" y="22" width="78" height="26" />
      <text x="287" y="39" textAnchor="middle">
        BM25
      </text>

      <rect className="box" x="248" y="94" width="78" height="26" />
      <text x="287" y="111" textAnchor="middle">
        DENSE
      </text>
      <text className="t-faint" x="287" y="133" textAnchor="middle">
        QDRANT
      </text>

      <rect className="box-accent" x="360" y="54" width="60" height="34" />
      <text className="t-accent" x="390" y="75" textAnchor="middle">
        FUSE
      </text>

      <rect className="box" x="456" y="54" width="104" height="34" />
      <text x="508" y="69" textAnchor="middle">
        DRAFT
      </text>
      <text className="t-faint" x="508" y="81" textAnchor="middle">
        GEMINI / CLAUDE
      </text>

      <path className="edge" d="M 82 71 L 116 71" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 210 64 L 228 64 L 228 35 L 244 35" markerEnd={`url(#${S}-head)`} />
      <path
        className="edge"
        d="M 210 78 L 228 78 L 228 107 L 244 107"
        markerEnd={`url(#${S}-head)`}
      />
      <path
        className="edge-accent"
        d="M 326 35 L 344 35 L 344 64 L 356 64"
        markerEnd={`url(#${S}-head-accent)`}
      />
      <path
        className="edge-accent"
        d="M 326 107 L 344 107 L 344 78 L 356 78"
        markerEnd={`url(#${S}-head-accent)`}
      />
      <path className="edge" d="M 420 71 L 452 71" markerEnd={`url(#${S}-head)`} />

      {/* ---- the loop that made draft quality a number ---- */}
      <text className="t-faint" x="0" y="166">
        MEASUREMENT
      </text>

      <rect className="box" x="120" y="176" width="90" height="40" />
      <text x="165" y="191" textAnchor="middle">
        STALL
      </text>
      <text x="165" y="203" textAnchor="middle">
        DETECT
      </text>

      <rect className="box-accent" x="248" y="176" width="172" height="40" />
      <text className="t-accent" x="334" y="191" textAnchor="middle">
        EVAL LOOP
      </text>
      <text className="t-accent" x="334" y="204" textAnchor="middle">
        ADOPTION · CONVERSION
      </text>

      <rect className="box" x="456" y="164" width="104" height="64" />
      <text x="508" y="182" textAnchor="middle">
        SENT
      </text>
      <text x="508" y="200" textAnchor="middle">
        EDITED
      </text>
      <text x="508" y="218" textAnchor="middle">
        DISCARDED
      </text>

      <path className="edge" d="M 508 88 L 508 160" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 452 196 L 424 196" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 165 88 L 165 172" markerEnd={`url(#${S}-head)`} />
      <path
        className="edge-soft"
        d="M 334 176 L 334 150 L 390 150 L 390 92"
        markerEnd={`url(#${S}-head)`}
      />
      <text className="t-faint" x="0" y="252">
        MEASURED OUTCOMES TUNE RETRIEVAL AND PROMPTS
      </text>
    </svg>
  );
}
