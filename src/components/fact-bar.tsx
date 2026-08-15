import { facts } from "@/content/facts";

/**
 * Static by design. This sits where a reader spends about four seconds, and
 * motion fights that — the scrolling strip it replaces had to be chased.
 */
export function FactBar() {
  return (
    <div className="factbar">
      <dl className="factbar-grid">
        {facts.map((fact) => (
          <div key={fact.label} className={fact.live ? "fact fact-live" : "fact"}>
            <dt>{fact.label}</dt>
            <dd>
              {fact.href ? (
                <a href={fact.href} rel="noreferrer noopener" target="_blank">
                  {fact.value} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                fact.value
              )}
              {fact.detail ? <small>{fact.detail}</small> : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
