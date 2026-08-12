import { describe, expect, it } from "vitest";
import {
  citationNumber,
  citationNumbers,
  railAnchorId,
  railEntries,
  UnknownCitationError,
  type Citation,
} from "./citations";

const sources: Citation[] = [
  { id: "eval-pipeline", source: "Draft-adoption and conversion eval pipeline, Kimport (2025)." },
  { id: "beta-users", source: "75+ active beta users, Anti-Fragility Coach." },
  { id: "corpus", source: "600+ documents embedded in Qdrant." },
];

describe("citationNumbers", () => {
  it("numbers sources by declaration order, starting at one", () => {
    const numbers = citationNumbers(sources);
    expect(numbers.get("eval-pipeline")).toBe(1);
    expect(numbers.get("beta-users")).toBe(2);
    expect(numbers.get("corpus")).toBe(3);
  });

  it("gives a repeated id the number of its first appearance", () => {
    const withDuplicate: Citation[] = [
      sources[0]!,
      sources[1]!,
      { id: "eval-pipeline", source: "restated" },
    ];
    const numbers = citationNumbers(withDuplicate);
    expect(numbers.get("eval-pipeline")).toBe(1);
    expect(numbers.get("beta-users")).toBe(2);
    expect(numbers.size).toBe(2);
  });

  it("returns an empty map for a page with no sources", () => {
    expect(citationNumbers([]).size).toBe(0);
  });
});

describe("citationNumber", () => {
  it("resolves a declared id", () => {
    expect(citationNumber("beta-users", sources)).toBe(2);
  });

  it("resolves the same id to the same number wherever it is cited", () => {
    expect(citationNumber("corpus", sources)).toBe(citationNumber("corpus", sources));
  });

  it("throws for an id that was never declared, naming what is available", () => {
    expect(() => citationNumber("invented", sources)).toThrow(UnknownCitationError);
    expect(() => citationNumber("invented", sources)).toThrow(/eval-pipeline/);
  });
});

describe("railEntries", () => {
  it("renders one entry per source, numbered to match the markers", () => {
    expect(railEntries(sources).map((entry) => [entry.number, entry.id])).toEqual([
      [1, "eval-pipeline"],
      [2, "beta-users"],
      [3, "corpus"],
    ]);
  });

  it("collapses a duplicate id onto a single entry", () => {
    const entries = railEntries([sources[0]!, { id: "eval-pipeline", source: "restated" }]);
    expect(entries).toHaveLength(1);
    expect(entries[0]!.source).toBe(sources[0]!.source);
  });
});

describe("railAnchorId", () => {
  it("scopes anchors per page so two pages on one route never collide", () => {
    expect(railAnchorId("kimport", "corpus")).toBe("source-kimport-corpus");
    expect(railAnchorId("halil", "corpus")).not.toBe(railAnchorId("kimport", "corpus"));
  });
});
