"use client";

import { useEffect } from "react";

/**
 * Highlights the footnote a marker points at while the reader hovers or focuses
 * it. Renders nothing — it exists so the content modules can stay server
 * components and know nothing about interaction.
 */
export function CitationLinkage() {
  useEffect(() => {
    const markers = document.querySelectorAll<HTMLElement>("[data-cite-marker]");
    if (markers.length === 0) return;

    const sourceFor = (marker: HTMLElement): HTMLElement | null => {
      const id = marker.dataset.citeMarker;
      if (!id) return null;
      return document.querySelector<HTMLElement>(`[data-cite-source="${CSS.escape(id)}"]`);
    };

    const setActive = (marker: HTMLElement, active: boolean) => () => {
      sourceFor(marker)?.classList.toggle("is-active", active);
    };

    const teardown: (() => void)[] = [];
    for (const marker of markers) {
      const on = setActive(marker, true);
      const off = setActive(marker, false);
      marker.addEventListener("pointerenter", on);
      marker.addEventListener("pointerleave", off);
      marker.addEventListener("focus", on);
      marker.addEventListener("blur", off);
      teardown.push(() => {
        marker.removeEventListener("pointerenter", on);
        marker.removeEventListener("pointerleave", off);
        marker.removeEventListener("focus", on);
        marker.removeEventListener("blur", off);
        off();
      });
    }

    return () => {
      for (const undo of teardown) undo();
    };
  }, []);

  return null;
}
