import { TECH_MARQUEE } from "@/lib/portfolioData";

function MarqueeRow({
  items,
  reverse,
  variant,
}: {
  items: readonly string[];
  reverse?: boolean;
  variant: "primary" | "muted";
}) {
  const chipClass =
    variant === "primary"
      ? "border border-grid bg-paper px-5 py-2.5 font-mono text-sm font-medium text-ink"
      : "border border-grid/70 bg-transparent px-5 py-2.5 font-mono text-sm text-muted";

  return (
    <div className="portfolio-marquee-viewport">
      <div
        className={`portfolio-marquee-track${reverse ? " portfolio-marquee-track--reverse" : ""}`}
      >
        <div className="portfolio-marquee-group">
          {items.map((tech) => (
            <span key={tech} className={`shrink-0 ${chipClass}`}>
              {tech}
            </span>
          ))}
        </div>
        <div className="portfolio-marquee-group" aria-hidden="true">
          {items.map((tech) => (
            <span key={`dup-${tech}`} className={`shrink-0 ${chipClass}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioTechMarquee() {
  const rowB = [...TECH_MARQUEE].reverse();

  return (
    <section
      id="marquee"
      className="overflow-hidden border-y border-grid py-16"
      aria-label="Technology stack marquee"
    >
      <MarqueeRow items={TECH_MARQUEE} variant="primary" />
      <div className="mt-4">
        <MarqueeRow items={rowB} reverse variant="muted" />
      </div>
    </section>
  );
}
