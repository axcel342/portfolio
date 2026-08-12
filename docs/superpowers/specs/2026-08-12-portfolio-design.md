# Portfolio Design Spec — Momin Imran Qureshi

> **Superseded on 2026-08-12, same day, by owner decision.** This document
> records the "Grounded" journal direction — warm archival paper, Newsreader
> serif, citation blue — which was built, deployed and then replaced. The owner
> supplied a reference portfolio and chose to match it closely: dark ground,
> Sora display type, a violet-to-cyan gradient accent, cards and tech pills.
>
> The concern raised at the time, and overruled deliberately, was that dark plus
> a violet/cyan gradient is the most common generated-portfolio look in
> circulation, and that adopting it meant giving up the citation device as the
> site's signature.
>
> What survived the change, and why: **the citation apparatus still runs on the
> case studies**, because it does argumentative rather than decorative work;
> **the content honesty rules below are unchanged and still binding**; and the
> diagrams still take their colour from tokens, which is why retuning the
> palette retuned every drawing without touching an SVG.
>
> The sections below describe the superseded visual direction. Treat the
> architecture, content rules, citation model and test scope as current; treat
> the palette and typography as history.

**Date:** 2026-08-12
**Status:** Superseded — see the note above
**Repository:** `/home/ubuntu/momin-portfolio` (standalone — deliberately not inside the Ember/Onyx fork)

## Issues to Address

Momin's work — production LLM, RAG, and agent systems — currently exists only as a CV. A CV
cannot show the two things that actually get him hired: that he reasons about system boundaries,
and that his claims are verifiable. The site must serve two readers at once without compromising
for either:

- A recruiter who gives the page 60 seconds and needs to leave knowing what he builds and how to
  reach him.
- A senior engineer or tech lead who will only be convinced by architecture, tradeoffs, and
  evidence.

The design answers this with a skimmable home page over a per-project depth layer, and with one
signature device that turns unverifiable résumé prose into checkable claims.

## Design Direction

**Treatment A — "Grounded"** for the home page, with **Treatment C's diagrams** inside the case
studies. Both were chosen from three rendered options; the rejected treatments were "Ledger"
(a dated record — safe, forgettable, undersells the systems work) and "Trace" as a whole-site
direction (diagrams as the hero — high ceiling, but too much of the page's weight resting on
diagram quality).

### The signature device: the page cites its own sources

Momin builds citation engines — systems whose entire value is that a claim resolves to a source.
The portfolio does the same thing to itself. Every substantive claim carries an inline marker that
resolves to a footnote rail entry naming the specific system, number, or artifact behind it.

This is not decoration. It does two jobs no other device does:

1. It solves the real credibility problem. "Improved response quality" is worthless to a stranger;
   "75+ beta users, response relevance iterated from their feedback" is not.
2. It argues for his competence by *being* the thing he is competent at.

It also imposes a useful constraint: a claim that cannot be sourced cannot be written. No filler
survives the format.

### Visual identity

Shared across every page. Warm archival paper, an ink black with warmth in it, a warm grey biased
toward the paper rather than a neutral mid-grey, and citation blue as the only accent.

| Token | Light | Dark |
| --- | --- | --- |
| `paper` | `#F3F1EA` | `#131208` |
| `paper-2` (raised) | `#EDEAE0` | `#1A190E` |
| `ink` | `#17160F` | `#EFECE1` |
| `ink-soft` | `#5F5B4E` | `#9C9583` |
| `ink-faint` | `#726D5D` | `#837C69` |
| `rule` | `#D9D3C4` | `#2E2B1F` |
| `cite` (accent) | `#26418F` | `#A2B6EE` |
| `cite-wash` | `#E1E6F3` | `#1B2138` |

Both greys clear 4.5:1 against their ground in both themes — 6.0:1 and 4.6:1 on
paper. The first draft used a lighter `ink-faint` at 2.8:1, which the axe pass
caught across every mono label on the site. Tonal hierarchy comes from size,
case and weight instead; a quiet tone is not a licence to fall out of spec.

Explicitly rejected: terracotta on cream, which is the default accent every generated
serif-on-paper page reaches for. Citation blue is fountain-pen ink — it belongs to the journal
world the design is drawn from, and it is the accent for the *citation* device specifically.

**Typography.** Self-hosted, no CDN.

- **Display and prose:** Newsreader (OFL) — a text serif with enough character to carry a 52px
  headline and enough restraint to set 66 characters of body copy.
- **Metadata, labels, citation markers, diagram text:** IBM Plex Mono, uppercase with tracking for
  labels.
- **No grotesk anywhere.** No Inter, no Space Grotesk.

Both loaded through `next/font/google`, which downloads and self-hosts at build time, so nothing
resolves to a CDN at runtime and there is no silent fallback.

**Layout.** Single column at a 66-character measure for prose, widened only for the work list and
the case-study metadata grid. Hairline rules separate sections; a heavier ink rule marks the two
structural breaks (below the masthead, above the metadata grid). Section labels are mono,
uppercase, tracked, and paired with a right-aligned count. No cards, no rounded corners, no
shadows except the one that lifts a diagram figure off the paper.

**No numbered markers on the work list.** The projects are not a sequence and numbering them would
be decoration pretending to be structure. Citation numbers *are* a real sequence — document order —
and are the only numbers on the page that count.

## Structure

```
/                       Home — the 60-second skim
/work/kimport           Case study
/work/anti-fragility    Case study
/work/halil             Case study
/work/ember             Case study
/resume.pdf             Static asset
```

Four case studies, chosen for what each one proves:

| Slug | Proves |
| --- | --- |
| `ember` | Enterprise scope: governed agents, evidence-backed retrieval, agent evals, SOC 2 / HIPAA remediation |
| `kimport` | End-to-end ownership, and closing the loop from LLM output to measured real-world usage |
| `anti-fragility` | Production at scale: 600+ documents embedded, 150 concurrent users, 75+ beta users |
| `halil` | Architecture: a four-node LangGraph workflow, 100+ language embeddings, layout-aware ingestion |

Medical Chat Bot and MedLegal Document Summarization appear as a compact "also built" list on the
home page with no dedicated page. They are real work but they do not earn a route.

No blog, no `/about`, no `/writing`. Thin pages hurt more than missing ones.

### Home page sections, in order

1. **Masthead** — name in mono, availability status, contact links.
2. **Hero** — the thesis headline, a lede carrying two citation markers, and the footnote rail.
3. **Selected work** — four entries: title, year, a sourced two-sentence summary, and a link into
   the case study.
4. **Also built** — two compact one-line entries.
5. **Experience** — three roles, condensed. Company, role, dates, one line each. The case studies
   carry the detail, so this section stays deliberately thin.
6. **Background** — degree, Dean's List, and the two certifications, on one line each.
7. **Contact** — email, LinkedIn, GitHub, resume download.

### Case-study page shape

Identical for all four, because a reader who visits a second one should not have to relearn the
page:

1. Back link to selected work.
2. Title and an italic dek stating the problem as a human would.
3. Metadata grid — role, year, users, and the two or three technical facts that matter for this
   project. Tabular numerals.
4. **The diagram** — a hand-authored inline SVG of this system's request path, from Treatment C.
   This is the first thing an engineer looks at.
5. **The problem** — what was actually broken, in the client's terms.
6. **The decision I'd defend** — one architectural choice, the alternative rejected, and the cost
   paid. This is the section that survives an interview.
7. **What happened** — measured outcome, or honestly, what he would build first next time.
8. Citation rail collecting every source cited on the page, in document order.
9. Previous / next case study.

## Content Rules

These are load-bearing, not style preferences.

- **First person, and only his own work.** Ember is a team codebase. The Ember page names what he
  personally did — contributing to the agent platform, agent evaluation and regression tooling,
  vulnerability remediation for compliance readiness — and never implies he built the platform.
- **Every number traces to the CV.** 600+ documents, 150 concurrent users, 75+ beta users, 10K
  Alpaca samples, 1,000+ page documents, four inboxes, five users. No number appears that cannot be
  sourced, and no number is rounded upward.
- **No invented outcomes.** Where a real percentage improvement does not exist, the "what happened"
  section says what was measured or what he would do differently. It does not manufacture a metric.
- **Client names as they appear in the CV.** Kimport and Halil are already named there.
- **Copy is written from the reader's side.** "Read the case study", not "Learn more". The
  availability status says what it means.

## Architecture

**Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4 with a CSS-first `@theme`
token layer matching the palette above. Deployed to Vercel.

Tailwind's `@theme` block declares the light palette as the canonical custom properties; the dark
overrides below redefine those same properties rather than introducing a parallel set, so utilities
generated from the tokens stay correct in both themes without `dark:` variants scattered through
the markup.

### Content as typed modules, not MDX

Case studies are `.tsx` content modules, not markdown. The reason is the citation device: markers
sit inline mid-sentence, and expressing that in markdown means either HTML in strings or an MDX
toolchain. A typed module makes the prose JSX and the structure a typed object, so a case study
missing its `decision` section fails to compile.

```
src/content/
  profile.ts              Name, links, availability, tagline
  work.ts                 Ordered project index — slug, title, year (pure routing data)
  home.tsx                Headline, lede, per-project summaries, and the home page's sources
  experience.ts           Three roles
  background.ts           Education and certifications
  case-studies/
    ember.tsx
    kimport.tsx
    anti-fragility.tsx
    halil.tsx
```

Each case-study module exports one object satisfying a `CaseStudy` type: `slug`, `title`, `dek`,
`meta` entries, a `diagram` component reference, the three prose sections as JSX (`problem`,
`decision`, `outcome`), and an ordered `citations` array.

### The citation model

A page declares its citations as an ordered array. `<Cite>` takes the citation's `id` and resolves
its display number from that array's index, so numbering is derived from a single explicit ordering
rather than maintained by hand across the prose. No React context is needed — the citation list and
the prose that references it live in the same module.

- A marker whose `id` is not in the page's array is a type error, not a broken superscript.
- The footnote rail renders the array directly, so a declared-but-uncited source is visible in
  review rather than silently dropped.
- Markers are anchors: they link to the rail entry, and focusing or hovering one highlights its
  entry. Keyboard-reachable, visible focus ring.

`src/components/Cite.tsx` and `src/components/CitationRail.tsx` own this. Nothing else knows how
numbering works.

### Diagrams

One component per project in `src/diagrams/`, hand-authored inline SVG — not a charting library and
not generated path data.

- Colors come from the theme tokens via `currentColor` and CSS custom properties, so a diagram is
  legible in both themes without a second copy.
- Each carries `role="img"` and an `aria-label` describing the *mechanism* in a sentence, not a
  list of box names, because that label is what a screen-reader user gets instead of the picture.
- `viewBox` plus `width: 100%`, so they scale rather than overflow. Their container gets
  `overflow-x: auto`.
- The home page shows no diagrams. They are the reward for clicking into a case study.

### Theming

Three-state theme handling, token-level:

- Bare `:root` defines the complete light palette.
- `@media (prefers-color-scheme: dark)` redefines only tokens, guarded so an explicit light choice
  wins over a dark OS.
- `[data-theme="dark"]` redefines them again so an explicit toggle wins either direction.

`body` sets an explicit background from a token. No component declares a color that only exists
inside a media query. There is no theme toggle UI — the site follows the reader's system
preference, because a toggle is a control nobody on a portfolio wants.

### Motion

Deliberately almost none. Two moments:

1. A single page-load stagger — masthead, headline, lede — over roughly 400ms.
2. Citation marker hover and focus highlighting its rail entry.

Both disabled under `prefers-reduced-motion`. Scroll-triggered reveals are explicitly rejected;
they are the strongest tell of a generated page and they punish the recruiter who is scrolling fast.

## Hosting

**Vercel.** The deciding factors are not the build:

- **Preview URLs per branch** — the site will be iterated on for months, and being able to send a
  draft before publishing it is worth more than the zero-dollar difference.
- **Built-in analytics** — knowing which case study a recruiter actually opened is direct signal on
  which project to lead with.
- First-class Next.js support, and a serverless route available later if it is ever needed.

GitHub Pages would work but requires static export, offers no previews, and no analytics. The repo
lives on GitHub either way, so the choice stays reversible.

## Tests

This is a static content site with one non-obvious invariant. Testing is scoped to that invariant
and to a smoke check, and nothing more.

**Unit (Vitest) — the citation resolver.** A pure function mapping citation id plus ordered list to
display number. Covers: correct index-to-number mapping, an unknown id, duplicate ids, and reuse of
the same id twice in one page resolving to the same number. This is the one piece of real logic and
the one thing that breaks silently when prose is edited.

**Playwright smoke — one spec, run against a production build.**

- Home renders the headline, four work entries, and the contact links.
- All four `/work/<slug>` routes return 200 and render title, diagram, metadata grid, all three
  prose sections, and a citation rail.
- **Citation integrity:** on every page, each marker's target rail entry exists, and every rail
  entry is referenced by at least one marker. This is the invariant the design depends on.
- Every diagram has a non-empty `aria-label`.
- No horizontal body overflow at 375px on the home page and on one case study.
- The page renders with a non-transparent body background under both `prefers-color-scheme` values.

**Accessibility:** an axe scan on the home page and one case study, in the same Playwright spec.

No component-level unit tests for presentational sections — they would test that JSX is JSX.

## Verification Before Done

`pnpm build`, `tsc --noEmit`, `eslint`, the Vitest suite, and the Playwright spec all pass, with
output shown. Then a real deploy preview opened and read on both a narrow and a wide viewport.

## Assumptions

Flagged because they were decided without being asked, and each is cheap to change:

1. **Domain.** No domain is assumed to be owned yet. The site ships on its `*.vercel.app`
   subdomain, and a custom domain is a settings change plus two DNS records whenever one is bought.
2. **Contact is a mailto link plus a copy-email button, not a form.** A form on a public portfolio
   collects spam, and a recruiter is already in their mail client. Email, LinkedIn, GitHub, resume
   download.
3. **Resume.** `Momin_Imran_Qureshi_CV.pdf` is copied into `public/` and linked as
   `/resume.pdf`.
4. **GitHub repo** is `axcel342/portfolio`, public.
5. **No analytics beyond Vercel Analytics.** No Google Analytics, no cookie banner needed.
6. **Availability status is hardcoded copy**, not a CMS field. Editing one string and pushing is
   less work than any system that avoids editing one string.
