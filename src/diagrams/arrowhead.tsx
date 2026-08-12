import type { ReactElement } from "react";

/**
 * Arrowhead markers. Ids are scoped per diagram so two drawings on one document
 * cannot claim the same marker.
 */
export function Arrowheads({ scope }: { readonly scope: string }): ReactElement {
  return (
    <defs>
      <marker
        id={`${scope}-head`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path className="head" d="M 0 1.5 L 8.5 5 L 0 8.5 z" />
      </marker>
      <marker
        id={`${scope}-head-accent`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path className="head-accent" d="M 0 1.5 L 8.5 5 L 0 8.5 z" />
      </marker>
    </defs>
  );
}
