import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { getCaseStudy } from "@/content/case-studies";
import { profile } from "@/content/profile";
import { workIndex } from "@/content/work";
import { CASE_STUDY_SLUGS } from "@/types";

type Params = { readonly slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
    openGraph: { title: study.title, description: study.description },
  };
}

/** The entry either side of this one, so a reader can keep going. */
function neighbours(slug: string) {
  const index = workIndex.findIndex((entry) => entry.slug === slug);
  return {
    previous: index > 0 ? workIndex[index - 1] : undefined,
    next: index >= 0 && index < workIndex.length - 1 ? workIndex[index + 1] : undefined,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  readonly params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { Diagram, Rail } = study;
  const { previous, next } = neighbours(slug);
  const entry = workIndex.find((item) => item.slug === slug);

  return (
    <>
      <SiteNav sections={false} />
      <main className="shell" style={{ paddingBottom: "4rem" }}>
        <article>
          <div className="case-head enter enter-1">
            <Link className="crumb" href="/#work">
              ← Selected work
            </Link>
            <h1 className="case-title">{study.title}</h1>
            <p className="case-dek">{study.dek}</p>
            {entry ? (
              <div className="pills" style={{ marginTop: "1.5rem" }}>
                {entry.stack.map((item) => (
                  <span key={item} className="pill pill-accent">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <dl className="case-meta enter enter-2">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <figure className="figure">
            <div className="figure-frame">
              <Diagram />
            </div>
            <figcaption>{study.diagramCaption}</figcaption>
          </figure>

          <div className="prose">
            <h2>The problem</h2>
            {study.problem}
            <h2>The decision I&rsquo;d defend</h2>
            {study.decision}
            <h2>What happened</h2>
            {study.outcome}
            <Rail />
          </div>
        </article>

        <nav className="pager" aria-label="Other case studies">
          {previous ? (
            <Link href={`/work/${previous.slug}`}>← {previous.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`}>{next.title} →</Link>
          ) : (
            <Link href="/#work">Back to selected work →</Link>
          )}
        </nav>

        <footer className="site-footer">
          <span>
            {profile.name} · {profile.location}
          </span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </footer>
      </main>
    </>
  );
}
