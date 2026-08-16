import Image from "next/image";
import { GitHubMark, GmailMark, LinkedInMark, MicrosoftMark } from "@/components/logos";
import { headline, lede } from "@/content/home";
import { profile } from "@/content/profile";

/**
 * The icon row beside the two calls to action. Each link carries its own
 * accessible name, because the mark inside it is decorative and a link with no
 * text would otherwise announce as its href.
 */
const socials = [
  { label: "GitHub", href: profile.links.github, Mark: GitHubMark, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, Mark: LinkedInMark, external: true },
  /* mailto rather than Gmail's web compose: the same address the "Hire me"
     button uses, and it opens whatever mail client the reader actually has. */
  { label: "Email", href: `mailto:${profile.email}`, Mark: GmailMark, external: false },
] as const;

export function Hero() {
  return (
    <section className="shell hero">
      <div>
        <span className="pill-status enter enter-1">{profile.availability}</span>

        <h1 className="hero-title enter enter-2">
          {headline.greeting}
          <br />
          {headline.lineOne}
          <br />
          <span className="gradient-text">{headline.lineTwo}</span>
        </h1>

        <p className="hero-lede enter enter-3">{lede}</p>

        <div className="hero-actions enter enter-4">
          <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
            Hire me →
          </a>
          <a className="btn btn-ghost btn-lg" href={profile.links.resume}>
            View résumé
          </a>

          {socials.map(({ label, href, Mark, external }) => (
            <a
              key={label}
              aria-label={label}
              className="btn btn-icon"
              href={href}
              {...(external ? { rel: "noreferrer noopener", target: "_blank" } : {})}
            >
              <Mark />
            </a>
          ))}
        </div>
      </div>

      {profile.portrait ? (
        <div className="hero-portrait enter enter-3">
          {/* The portrait is a card rather than a bare image: it names who the
              photo is of, which is the one thing a photo cannot say itself. */}
          <div className="hero-card">
            <div className="hero-portrait-frame">
              <Image
                src={profile.portrait}
                alt={`${profile.name}, ${profile.role}`}
                width={900}
                height={1125}
                priority
                sizes="(max-width: 62rem) 17rem, 21rem"
              />
            </div>
            <div className="hero-card-body">
              <p className="hero-card-name">{profile.name}</p>
              <p className="hero-card-meta">
                {profile.role} · {profile.locationShort} · UTC+5
              </p>
            </div>
          </div>

          {/* The badge claims a credential, so it links to where it verifies. */}
          <a
            className="hero-badge"
            href={profile.badgeHref}
            rel="noreferrer noopener"
            target="_blank"
          >
            <MicrosoftMark size={14} />
            {profile.badge}
          </a>
        </div>
      ) : null}
    </section>
  );
}
