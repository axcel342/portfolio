import Link from "next/link";
import { profile } from "@/content/profile";

export function Masthead({ home = false }: { readonly home?: boolean }) {
  return (
    <header className="masthead">
      {home ? (
        <span className="masthead-name">{profile.name}</span>
      ) : (
        <Link className="masthead-name" href="/">
          {profile.name}
        </Link>
      )}
      <nav className="masthead-links" aria-label="Elsewhere">
        <span className="availability">{profile.availability}</span>
        <a href={profile.links.github} rel="noreferrer noopener" target="_blank">
          GitHub
        </a>
        <a href={profile.links.linkedin} rel="noreferrer noopener" target="_blank">
          LinkedIn
        </a>
        <a href={profile.links.resume}>Résumé</a>
      </nav>
    </header>
  );
}
