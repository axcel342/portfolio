import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <>
      <SiteNav sections={false} />
      <main className="shell section">
        <p className="section-label">404</p>
        <h1 className="hero-title" style={{ marginTop: "0.5rem" }}>
          That page isn&rsquo;t here.
        </h1>
        <p className="hero-lede">
          The link may be old, or the address slightly off. The work is one click away.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary btn-lg" href="/#work">
            Selected work →
          </Link>
          <Link className="btn btn-ghost btn-lg" href="/">
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
