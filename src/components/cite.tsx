import type { ReactElement } from "react";
import { citationNumbers, railAnchorId, railEntries, type Citation } from "@/lib/citations";

/**
 * Binds a page's sources to a `<Cite>` marker and its footnote rail.
 *
 * The `const` type parameter narrows the declared ids to a literal union, so
 * citing a source that was never declared is a compile error rather than a
 * superscript pointing at nothing.
 */
export function citeSet<const T extends readonly Citation[]>(scope: string, citations: T) {
  const numbers = citationNumbers(citations);
  const entries = railEntries(citations);

  type Id = T[number]["id"];

  function Cite({ id }: { readonly id: Id }): ReactElement {
    const number = numbers.get(id);
    if (number === undefined) {
      // Unreachable through the typed API; guards against a cast at a call site.
      throw new Error(`No source declared for citation "${id}" on page "${scope}".`);
    }
    return (
      <a
        className="cite-marker"
        href={`#${railAnchorId(scope, id)}`}
        data-cite-marker={id}
        aria-label={`Source ${number}`}
      >
        {number}
      </a>
    );
  }

  function Rail(): ReactElement | null {
    if (entries.length === 0) return null;
    return (
      <div className="rail">
        <p className="rail-label">Sources</p>
        {entries.map((entry) => (
          <p
            key={entry.id}
            className="rail-entry"
            id={railAnchorId(scope, entry.id)}
            data-cite-source={entry.id}
          >
            <span aria-hidden="true">{entry.number}</span>
            <span>{entry.source}</span>
          </p>
        ))}
      </div>
    );
  }

  return { citations, Cite, Rail, scope } as const;
}

export type CiteSet = ReturnType<typeof citeSet>;
