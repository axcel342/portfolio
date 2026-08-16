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

/**
 * Contact marks, used in the hero action row and the contact panel.
 *
 * Drawn in `currentColor` rather than brand colours: three saturated logos in a
 * row would out-shout the gradient "Hire me" button standing next to them, and
 * that button is the one that should win. The link around each mark carries the
 * accessible name, so the mark itself stays decorative like the issuer marks.
 */
export function GitHubMark({ size = 19 }: { readonly size?: number }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedInMark({ size = 18 }: { readonly size?: number }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function GmailMark({ size = 18 }: { readonly size?: number }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.909 1.528-1.146C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

export const marks = {
  microsoft: MicrosoftMark,
  huggingface: HuggingFaceMark,
} as const;

export type MarkName = keyof typeof marks;
