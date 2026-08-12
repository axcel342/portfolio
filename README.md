# Portfolio — Momin Imran Qureshi

A portfolio for production LLM, RAG and agent work. One skimmable home page over
four per-project case studies.

The design has one idea: **the page cites its own sources.** Every substantive
claim carries an inline marker that resolves to a footnote naming the specific
system or number behind it. A portfolio built by someone who builds citation
engines should be able to show its own evidence — and the format makes a claim
that cannot be sourced impossible to write.

The full design rationale, palette and content rules are in
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
| `src/content/profile.ts` | Name, links, availability |
| `src/content/work.ts` | Ordered case-study index — drives routing, the work list and the pager |
| `src/content/home.tsx` | Home page prose and its sources |
| `src/content/case-studies/*.tsx` | One module per case study |
| `src/diagrams/*.tsx` | Hand-authored inline SVG, one per project |
| `src/lib/citations.ts` | Citation numbering — the only real logic here, and unit tested |

### Adding a case study

1. Add the slug to `CASE_STUDY_SLUGS` in `src/types.ts`.
2. Add an entry to `workIndex` in `src/content/work.ts` — position controls order.
3. Write `src/content/case-studies/<slug>.tsx` and register it in that
   directory's `index.ts`. The `Record<CaseStudySlug, CaseStudy>` type will not
   compile until you do.
4. Draw `src/diagrams/<slug>.tsx`. Colour comes from the CSS classes in
   `globals.css` (`.box`, `.edge`, `.t-faint`…), never from hard-coded hex, so
   the drawing reads in both themes. Give it an `aria-label` describing the
   mechanism in a sentence.

### Editing prose

Declare sources in the page's `citeSet([...])` array in the order they are first
cited, then reference them with `<Cite id="…" />`. Numbering is derived from that
array, so it can never drift from the footnotes. An unknown id is a type error.

## Content rules

These are enforced by review, not by the compiler, and they matter more than the
code:

- First person, and only his own work. Ember is a team codebase; that page names
  what he personally did and never implies he built the platform.
- Every number traces to the CV. Nothing is rounded upward.
- No invented outcomes. Where a real metric does not exist, the section says
  what was measured or what he would do differently.

## Deployment

Vercel, for the per-branch preview URLs and built-in analytics. Set
`NEXT_PUBLIC_SITE_URL` to the canonical origin so metadata, `sitemap.xml` and
`robots.txt` point at the right host.
