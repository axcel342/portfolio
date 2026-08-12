# Portfolio — Momin Imran Qureshi

A portfolio for production LLM, RAG and agent work: one scannable home page over
four per-project case studies.

**Visual direction** — dark, gradient-accented and type-led, following a
reference portfolio the owner chose. Sora for display, Manrope for body,
IBM Plex Mono for dates, pills and labels. The design commits to a single dark
world rather than shipping two themes, so every colour is painted explicitly
from a token and the page never borrows its host's ground.

**The case studies keep a citation apparatus.** Claims there carry an inline
marker resolving to a footnote naming the specific system or number behind it.
It survived the redesign because it does argumentative work: a stranger has no
reason to believe "improved response quality", and the format makes a claim that
cannot be sourced impossible to write.

The earlier journal-and-serif direction and the reasoning behind the current one
are recorded in
[`docs/superpowers/specs/2026-08-12-portfolio-design.md`](docs/superpowers/specs/2026-08-12-portfolio-design.md).

## Running it

The toolchain is pinned in `.tool-versions` (Node 26, pnpm 11). If `pnpm` is not
on your path, prefix commands with `mise exec --`.

```bash
pnpm install
pnpm dev             # http://localhost:3000
```

## Verifying it

```bash
pnpm verify          # types, lint, unit tests, production build
pnpm test:e2e        # Playwright, against a production build on port 3100
```

`pnpm test:e2e` needs a browser once: `pnpm exec playwright install chromium`.

## How the content is organised

Content is typed TypeScript, not markdown — the citation markers sit inline
mid-sentence, and a typed module means a case study missing a section fails to
compile.

| Path | What lives there |
| --- | --- |
| `src/content/profile.ts` | Name, links, availability, badge, nav sections, portrait detection |
| `src/content/home.tsx` | Hero copy, also-built projects, education, certifications, contact copy |
| `src/content/metrics.ts` | The marquee figures |
| `src/content/stack.ts` | The grouped stack inventory |
| `src/content/experience.ts` | Three roles with bullets and per-role tech |
| `src/content/work.ts` | Ordered case-study index — routing, home cards and the pager |
| `src/content/case-studies/*.tsx` | One module per case study |
| `src/diagrams/*.tsx` | Hand-authored inline SVG, one per project |
| `src/lib/citations.ts` | Citation numbering — real logic, unit tested |
| `src/lib/site-url.ts` | Canonical-origin resolution — real logic, unit tested |

### The portrait

Drop a file at `public/portrait.jpg` and the hero shows it; remove the file and
the hero lays out cleanly without a gap. `profile.ts` detects it at build time,
so there is no flag to flip. A 4:5 crop around 900×1125 suits the frame.

### Adding a case study

1. Add the slug to `CASE_STUDY_SLUGS` in `src/types.ts`.
2. Add an entry to `workIndex` in `src/content/work.ts` — position controls
   order. `stats` is optional: omit it when the project has no honest numbers,
   because a stat row of words reads as padding.
3. Write `src/content/case-studies/<slug>.tsx` and register it in that
   directory's `index.ts`. The `Record<CaseStudySlug, CaseStudy>` type will not
   compile until you do.
4. Draw `src/diagrams/<slug>.tsx`. Colour comes from the CSS classes in
   `globals.css` (`.box`, `.edge`, `.t-faint`…), never from hard-coded hex, so
   retuning the palette retunes every drawing. Give it an `aria-label`
   describing the mechanism in a sentence.

### Editing prose

Declare sources in the page's `citeSet([...])` array in the order they are first
cited, then reference them with `<Cite id="…" />`. Numbering is derived from that
array, so it can never drift from the footnotes. An unknown id is a type error.

## Content rules

Enforced by review, not by the compiler, and they matter more than the code:

- First person, and only his own work. Ember is a team codebase; that page names
  what he personally did and never implies he built the platform.
- Every number traces to the CV. Nothing is rounded upward.
- No invented outcomes. The CV contains **scale** figures (600+ documents, 150
  concurrent users, 100+ languages) and no before/after **performance** figures,
  so none are quoted.

## Two pieces of CSS worth not breaking

- Grid minimums are written `minmax(min(24rem, 100%), 1fr)`. A bare `minmax`
  minimum cannot shrink, so `minmax(24rem, 1fr)` overflows any viewport narrower
  than 384px.
- `.bullets li` is a two-column grid whose first column is the `::before`
  marker. Adding a marker element in JSX pushes the text into the 0.9rem column
  and it renders one word per line.

## Deployment

Vercel. Set `NEXT_PUBLIC_SITE_URL` only if you want to override the origin —
otherwise it derives from `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL`, so
production and every preview get the right canonical host automatically.
