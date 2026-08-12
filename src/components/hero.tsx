import Image from "next/image";
import { headline, lede } from "@/content/home";
import { profile } from "@/content/profile";

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
        </div>
      </div>

      {profile.portrait ? (
        <div className="hero-portrait enter enter-3">
          <div className="hero-portrait-frame">
            <Image
              src={profile.portrait}
              alt={`${profile.name}, ${profile.role}`}
              width={900}
              height={1125}
              priority
              sizes="(max-width: 62rem) 15rem, 21rem"
            />
          </div>
          <span className="hero-badge">{profile.badge}</span>
        </div>
      ) : null}
    </section>
  );
}
