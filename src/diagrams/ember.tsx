import type { ReactElement } from "react";
import { Arrowheads } from "./arrowhead";

const S = "ember";

/**
 * The boundary is the subject. An agent may propose anything; nothing crosses
 * into execution without passing approval, and the eval lane grades what
 * actually landed in the database rather than what the model said.
 */
export function EmberDiagram(): ReactElement {
  return (
    <svg
      className="dg"
      viewBox="-2 -2 568 288"
      role="img"
      aria-label="Events from meetings, email and tasks drive an agent run with search, task and draft tools. The run produces a proposed action, which cannot execute until it crosses the operator approval boundary — approved actions execute, the rest are held for review. Separately, an evaluation lane seeds fixtures with known ground truth, fires real agent runs, and grades the resulting database outcomes deterministically."
    >
      <Arrowheads scope={S} />

      <text className="t-faint" x="0" y="12">
        AGENT RUN
      </text>

      <rect className="box" x="0" y="40" width="96" height="58" />
      <text x="48" y="58" textAnchor="middle">
        MEETINGS
      </text>
      <text x="48" y="73" textAnchor="middle">
        EMAIL
      </text>
      <text x="48" y="88" textAnchor="middle">
        TASKS
      </text>

      <rect className="box" x="140" y="40" width="104" height="58" />
      <text x="192" y="65" textAnchor="middle">
        AGENT
      </text>
      <text x="192" y="80" textAnchor="middle">
        RUN
      </text>

      <rect className="box-store" x="112" y="118" width="160" height="30" />
      <text className="t-faint" x="192" y="137" textAnchor="middle">
        SEARCH · TASK · DRAFT
      </text>

      <rect className="box" x="300" y="48" width="98" height="42" />
      <text x="349" y="65" textAnchor="middle">
        PROPOSED
      </text>
      <text x="349" y="80" textAnchor="middle">
        ACTION
      </text>

      {/* The boundary. Approved work crosses it; everything else stays behind. */}
      <text className="t-accent" x="418" y="14" textAnchor="middle">
        APPROVAL BOUNDARY
      </text>
      <path className="edge-accent" strokeDasharray="4 4" d="M 418 20 L 418 170" />

      <rect className="box-accent" x="446" y="52" width="112" height="34" />
      <text className="t-accent" x="502" y="73" textAnchor="middle">
        EXECUTED
      </text>

      <rect className="box" x="300" y="118" width="98" height="40" />
      <text x="349" y="134" textAnchor="middle">
        HELD FOR
      </text>
      <text x="349" y="147" textAnchor="middle">
        REVIEW
      </text>

      <path className="edge" d="M 96 69 L 136 69" markerEnd={`url(#${S}-head)`} />
      <path className="edge-soft" d="M 192 118 L 192 102" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 244 69 L 296 69" markerEnd={`url(#${S}-head)`} />
      <path className="edge-accent" d="M 398 69 L 442 69" markerEnd={`url(#${S}-head-accent)`} />
      <path className="edge" d="M 349 90 L 349 114" markerEnd={`url(#${S}-head)`} />
      <text className="t-faint" x="300" y="186">
        NOTHING CROSSES WITHOUT APPROVAL
      </text>

      {/* ---- the eval lane ---- */}
      <text className="t-faint" x="0" y="204">
        EVALUATION
      </text>

      <rect className="box" x="0" y="214" width="118" height="40" />
      <text x="59" y="232" textAnchor="middle">
        SEEDED SOURCE
      </text>
      <text className="t-faint" x="59" y="245" textAnchor="middle">
        KNOWN GROUND TRUTH
      </text>

      <rect className="box" x="158" y="214" width="112" height="40" />
      <text x="214" y="232" textAnchor="middle">
        REAL RUN
      </text>
      <text className="t-faint" x="214" y="245" textAnchor="middle">
        NOT A MOCK
      </text>

      <rect className="box-accent" x="310" y="214" width="150" height="40" />
      <text className="t-accent" x="385" y="232" textAnchor="middle">
        GRADE DB OUTCOMES
      </text>
      <text className="t-accent" x="385" y="245" textAnchor="middle">
        CREATED OR SUPPRESSED
      </text>

      <path className="edge" d="M 118 234 L 154 234" markerEnd={`url(#${S}-head)`} />
      <path className="edge" d="M 270 234 L 306 234" markerEnd={`url(#${S}-head)`} />
      <text className="t-faint" x="470" y="230">
        NO MODEL
      </text>
      <text className="t-faint" x="470" y="242">
        JUDGES ANOTHER
      </text>
    </svg>
  );
}
