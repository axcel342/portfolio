import type { ReactElement } from "react";

/**
 * Issuer marks, drawn inline so they need no network request and stay crisp at
 * any size.
 *
 * All marks are decorative: the text beside every one of them already names the
 * organisation, so announcing the logo too would only add noise for a screen
 * reader. That is why each carries `aria-hidden` rather than a label.
 */

export function MicrosoftMark({ size = 22 }: { readonly size?: number }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
      <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

export function HuggingFaceMark({ size = 28 }: { readonly size?: number }): ReactElement {
  return (
    /* viewBox cropped to the artwork so the face fills its tile rather than
       floating inside empty padding. */
    <svg viewBox="2 4 28 22" width={size} height={size} aria-hidden="true" focusable="false">
      <circle cx="16" cy="15" r="10" fill="#ffd21e" />
      {/* the two hands */}
      <path d="M6.5 17.5c-1.6-.6-3 .6-2.4 2.1.5 1.2 1.7 2 2.9 2.4" fill="#ff9d0b" />
      <path d="M25.5 17.5c1.6-.6 3 .6 2.4 2.1-.5 1.2-1.7 2-2.9 2.4" fill="#ff9d0b" />
      <circle cx="12.3" cy="13.4" r="1.5" fill="#3a3a3a" />
      <circle cx="19.7" cy="13.4" r="1.5" fill="#3a3a3a" />
      <path d="M11.4 18.2c1.2 1.9 3 2.9 4.6 2.9s3.4-1 4.6-2.9z" fill="#3a3a3a" />
    </svg>
  );
}

export const marks = {
  microsoft: MicrosoftMark,
  huggingface: HuggingFaceMark,
} as const;

export type MarkName = keyof typeof marks;
