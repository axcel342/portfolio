import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { CopyEmail } from "@/components/copy-email";
import { certifications, education } from "@/content/background";
import { experience } from "@/content/experience";
import {
  alsoBuilt,
  contactLine,
  headline,
  HomeRail,
  lede,
  workSummaries,
} from "@/content/home";
import { profile } from "@/content/profile";
import { workIndex } from "@/content/work";

export default function HomePage() {
  return (
    <main className="shell page">
      <div className="enter enter-1">
        <Masthead home />
      </div>

      <section className="hero">
        <h1 className="hero-headline enter enter-2">{headline}</h1>
        <p className="hero-lede enter enter-3">{lede}</p>
      </section>

      <div className="section-head">
        <h2>Selected work</h2>
        <span>{workIndex.length} case studies</span>
      </div>
      <div className="work-list">
        {workIndex.map((entry) => (
          <Link key={entry.slug} className="work-entry" href={`/work/${entry.slug}`}>
            <h3>{entry.title}</h3>
            <span className="work-entry-year">{entry.year}</span>
            <p>{workSummaries[entry.slug]}</p>
            <span className="work-entry-more">Read the case study &rarr;</span>
          </Link>
        ))}
      </div>
      <HomeRail />

      <div className="section-head">
        <h2>Also built</h2>
        <span>Not written up</span>
      </div>
      <div className="compact">
        {alsoBuilt.map((item) => (
          <article key={item.title} className="compact-row">
            <h3>{item.title}</h3>
            <span className="when">{item.when}</span>
            <p>{item.detail}</p>
            {item.stack ? <span className="stack-line">{item.stack}</span> : null}
          </article>
        ))}
      </div>

      <div className="section-head">
        <h2>Experience</h2>
        <span>Since 2024</span>
      </div>
      <div className="compact">
        {experience.map((role) => (
          <article key={role.company} className="compact-row">
            <h3>{role.company}</h3>
            <span className="when">{role.when}</span>
            <span className="role">{role.role}</span>
            <p>{role.detail}</p>
            <span className="stack-line">{role.stack}</span>
          </article>
        ))}
      </div>

      <div className="section-head">
        <h2>Background</h2>
        <span>Education &amp; certifications</span>
      </div>
      <div className="compact">
        {[...education, ...certifications].map((item) => (
          <article key={item.title} className="compact-row">
            <h3>{item.title}</h3>
            <span className="when">{item.when}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <footer className="contact">
        <p className="contact-line">{contactLine}</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyEmail email={profile.email} />
          <a href={profile.links.linkedin} rel="noreferrer noopener" target="_blank">
            LinkedIn
          </a>
          <a href={profile.links.github} rel="noreferrer noopener" target="_blank">
            GitHub
          </a>
          <a href={profile.links.resume}>Résumé (PDF)</a>
        </div>
      </footer>
    </main>
  );
}
