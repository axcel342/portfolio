import { citeSet } from "@/components/cite";
import { EmberDiagram } from "@/diagrams/ember";
import type { CaseStudy } from "@/types";

const { Cite, Rail } = citeSet("ember", [
  {
    id: "scope",
    source:
      "Contributing to an enterprise intelligence platform of persistent, governed AI agents — meetings, tasks, relationships, projects — with evidence-backed chat and retrieval.",
  },
  {
    id: "evals",
    source:
      "Agent evaluation and regression tooling, on a stack of FastAPI, Next.js, PostgreSQL, Redis and OpenSearch.",
  },
  {
    id: "compliance",
    source:
      "Vulnerability remediation across the monorepo supporting SOC 2 and HIPAA compliance readiness via Vanta: dependency auditing and security hardening for sensitive-data workloads.",
  },
] as const);

export const ember: CaseStudy = {
  slug: "ember",
  title: "Ember — Enterprise AI Agent Platform",
  year: "2026",
  dek: "An agent that only answers questions is safe and nearly useless. One that acts needs a boundary.",
  description:
    "Contributing to a platform of persistent, governed AI agents — and to the evaluation tooling that grades what those agents actually did.",
  meta: [
    { label: "Role", value: "Contributor, team codebase" },
    { label: "Year", value: "2026" },
    { label: "Domain", value: "Enterprise intelligence" },
    { label: "Stack", value: "FastAPI · Next.js · PostgreSQL · OpenSearch · Celery" },
  ],
  Diagram: EmberDiagram,
  diagramCaption:
    "Fig. 1 — An event becomes a proposed action. Nothing executes without crossing the approval boundary.",
  problem: (
    <>
      <p>
        Ember is a platform of persistent agents that watch a company&rsquo;s real activity —
        meetings, tasks, relationships, projects — and act on it.
        <Cite id="scope" /> It is a team codebase, so what follows is my own work rather than the
        platform&rsquo;s full story.
      </p>
      <p>
        The moment an agent stops answering questions and starts creating tasks, drafting replies and
        proposing rules, correctness stops being a chat-quality problem. A wrong answer is a bad
        answer. A wrong action is a bad <em>outcome</em>, and it has already happened by the time
        anyone reads about it.
      </p>
    </>
  ),
  decision: (
    <>
      <p>
        The tooling I work on grades what an agent <em>did</em>, not what the code returned.
        <Cite id="evals" />
      </p>
      <p>
        Unit and integration tests pass happily while an agent is silently useless — the plumbing
        returns success, the run completes, and nothing worth having was created. So the evaluation
        harness seeds synthetic sources with unambiguous ground truth, fires real agent runs, and
        grades database outcomes deterministically: was the task created, was it correctly
        suppressed, was the draft staged, was the rule proposed. No model judges another
        model&rsquo;s output.
      </p>
      <p>
        The cost is real, and I would defend paying it. Deterministic grading means every scenario
        needs ground truth authored by hand, and a behaviour change needs a matching scenario before
        it merges. What that buys is that a regression which makes agents quietly do nothing shows up
        as a failing number rather than a shrug.
      </p>
    </>
  ),
  outcome: (
    <>
      <p>
        Conservatism scenarios — the ones proving what an agent should <em>not</em> create — are
        treated as first-class, because the expensive failure in this product is a confident wrong
        action rather than a missed one.
      </p>
      <p>
        Alongside that, I drive vulnerability remediation across the monorepo toward SOC 2 and HIPAA
        readiness: dependency auditing and security hardening for workloads holding sensitive
        customer data.
        <Cite id="compliance" />
      </p>
    </>
  ),
  Rail,
};
