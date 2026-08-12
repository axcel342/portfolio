import Link from "next/link";
import { Masthead } from "@/components/masthead";

export default function NotFound() {
  return (
    <main className="shell page">
      <Masthead />
      <section className="hero">
        <h1 className="hero-headline">That page isn&rsquo;t here.</h1>
        <p className="hero-lede">
          The link may be old, or the address slightly off. The selected work is one click away.
        </p>
        <p style={{ marginTop: "1.75rem" }}>
          <Link className="crumb" href="/">
            &larr; Selected work
          </Link>
        </p>
      </section>
    </main>
  );
}
