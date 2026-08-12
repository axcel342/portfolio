import { metrics } from "@/content/metrics";

/**
 * The track holds the list twice and translates by exactly -50%, so the loop is
 * seamless. The duplicate is hidden from assistive tech and the whole strip is
 * static under reduced motion.
 */
export function MetricMarquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="marquee-group">
          {metrics.map((metric) => (
            <span key={metric.label} className="marquee-item">
              <b>{metric.value}</b>
              {metric.label}
            </span>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {metrics.map((metric) => (
            <span key={`dup-${metric.label}`} className="marquee-item">
              <b>{metric.value}</b>
              {metric.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
