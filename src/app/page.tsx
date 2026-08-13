import Link from "next/link";
import { Hero } from "@/components/hero";
import { LogoTile } from "@/components/logo-tile";
import { MetricMarquee } from "@/components/marquee";
import { SiteNav } from "@/components/site-nav";
import { alsoBuilt, certifications, contact, education } from "@/content/home";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { stackGroups } from "@/content/stack";
import { workIndex } from "@/content/work";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <MetricMarquee />

        {/* ---------------- work ---------------- */}
        <section id="work" className="shell section">
          <p className="section-label">Selected work</p>
          <h2 className="section-title">Systems in production, not prototypes</h2>
          <p className="section-note">
            Four projects written up the way an engineer reads them — the problem, the architectural
            decision I&rsquo;d defend, and what happened once real people used it.
          </p>

          <div className="card-grid">
            {workIndex.map((entry) => (
              <Link key={entry.slug} className="card" href={`/work/${entry.slug}`}>
                <div className="card-eyebrow">
                  <span>{entry.domain}</span>
                  <span>{entry.year}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>

                {entry.stats ? (
                  <div className="stat-row">
                    {entry.stats.map((stat) => (
                      <span key={stat.label} className="stat">
                        <b>{stat.value}</b>
                        <span>{stat.label}</span>
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="pills">
                  {entry.stack.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>

                <span className="card-more">Read the case study →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- background ----------------
            Sits directly under the work cards so a reader meets the credentials
            straight after the proof, rather than near the footer. */}
        <section id="background" className="shell section">
          <p className="section-label">Background</p>
          <h2 className="section-title">Education &amp; certifications</h2>

          <div className="edu-grid">
            {[...education, ...certifications].map((item) => (
              <div key={item.title} className="edu-item">
                {item.logo ? <LogoTile logo={item.logo} /> : null}
                <span className="where">{item.when}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- experience ---------------- */}
        <section id="experience" className="shell section">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&rsquo;ve shipped</h2>
          <p className="section-note">
            Three companies since 2024, all of it AI engineering on live products.
          </p>

          <div className="timeline">
            {experience.map((role) => (
              <article key={role.company} className="timeline-item">
                <div className="timeline-head">
                  <span className="when">{role.when}</span>
                  <span>{role.where}</span>
                </div>
                <h3>
                  {role.role} <span className="at">· {role.company}</span>
                </h3>
                <p className="timeline-summary">{role.summary}</p>

                <div className="pills" style={{ marginTop: "1rem" }}>
                  {role.stack.map((item) => (
                    <span key={item} className="pill pill-accent">
                      {item}
                    </span>
                  ))}
                </div>

                {/* No marker element here: li::before is the bullet, and an extra
                    child would take the text's grid column. */}
                <ul className="bullets">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- stack ---------------- */}
        <section id="stack" className="shell section">
          <p className="section-label">The stack</p>
          <h2 className="section-title">What I actually work in</h2>
          <p className="section-note">
            Everything listed here appears in shipped work, not on a reading list.
          </p>

          <div className="stack-grid">
            {stackGroups.map((group) => (
              <div key={group.title} className="stack-group">
                <h3>{group.title}</h3>
                <div className="pills">
                  {group.items.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- also built ---------------- */}
        <section className="shell section">
          <p className="section-label">Also built</p>
          <h2 className="section-title">Not written up, still real</h2>

          <div className="card-grid">
            {alsoBuilt.map((item) => (
              <article key={item.title} className="card">
                <div className="card-eyebrow">
                  <span>Project</span>
                  <span>{item.when}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.stack ? (
                  <div className="pills">
                    {item.stack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- contact ---------------- */}
        <section id="contact" className="shell section">
          <p className="section-label">Contact</p>
          <div className="contact-panel">
            <h2>{contact.title}</h2>
            <p>{contact.body}</p>
            <div className="contact-actions">
              <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={profile.links.linkedin}
                rel="noreferrer noopener"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={profile.links.github}
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub
              </a>
              <a className="btn btn-ghost btn-lg" href={profile.links.resume}>
                Résumé (PDF)
              </a>
            </div>
          </div>
        </section>

        <div className="shell">
          <footer className="site-footer">
            <span>
              {profile.name} · {profile.location}
            </span>
            <span>{profile.availability}</span>
          </footer>
        </div>
      </main>
    </>
  );
}
