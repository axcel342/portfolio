import Link from "next/link";
import { navSections, profile } from "@/content/profile";

/**
 * Sticky nav. On a case-study page the section anchors would point at nothing,
 * so `sections` is dropped there and the brand becomes the way home.
 */
export function SiteNav({ sections = true }: { readonly sections?: boolean }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="nav-brand" href="/">
          {profile.name}
        </Link>

        <nav className="nav-links" aria-label="Sections">
          {sections
            ? navSections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.label}
                </a>
              ))
            : null}
          <a href={profile.links.github} rel="noreferrer noopener" target="_blank">
            GitHub
          </a>
          <a href={profile.links.resume}>Résumé</a>
        </nav>

        <a className="btn btn-primary" href={`mailto:${profile.email}`}>
          Contact
        </a>
      </div>
    </header>
  );
}
