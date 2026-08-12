/**
 * The citation model.
 *
 * A page declares its sources as one ordered array. Display numbers are derived
 * from that array's position, so numbering has exactly one source of truth and
 * editing prose can never desynchronise a marker from its footnote.
 */

export type Citation = {
  /** Stable key referenced from prose. Never rendered. */
  readonly id: string;
  /** The sentence a reader sees in the footnote rail. */
  readonly source: string;
};

export class UnknownCitationError extends Error {
  constructor(id: string, known: readonly string[]) {
    super(
      `No source declared for citation "${id}". Declared sources: ${
        known.length > 0 ? known.join(", ") : "(none)"
      }.`,
    );
    this.name = "UnknownCitationError";
  }
}

/**
 * Maps each citation id to its 1-based display number.
 *
 * A repeated id keeps the number of its first appearance — citing the same
 * source twice must not mint a second footnote.
 */
export function citationNumbers(citations: readonly Citation[]): ReadonlyMap<string, number> {
  const numbers = new Map<string, number>();
  for (const citation of citations) {
    if (!numbers.has(citation.id)) {
      numbers.set(citation.id, numbers.size + 1);
    }
  }
  return numbers;
}

/** Display number for one id, or a descriptive throw if it was never declared. */
export function citationNumber(id: string, citations: readonly Citation[]): number {
  const numbers = citationNumbers(citations);
  const number = numbers.get(id);
  if (number === undefined) {
    throw new UnknownCitationError(id, [...numbers.keys()]);
  }
  return number;
}

/**
 * The sources actually rendered in the footnote rail: declaration order, with
 * duplicate ids collapsed onto their first entry.
 */
export function railEntries(
  citations: readonly Citation[],
): readonly (Citation & { readonly number: number })[] {
  const seen = new Set<string>();
  const entries: (Citation & { number: number })[] = [];
  for (const citation of citations) {
    if (seen.has(citation.id)) continue;
    seen.add(citation.id);
    entries.push({ ...citation, number: entries.length + 1 });
  }
  return entries;
}

/** DOM id for a rail entry, so a marker can link straight to its source. */
export function railAnchorId(scope: string, id: string): string {
  return `source-${scope}-${id}`;
}
