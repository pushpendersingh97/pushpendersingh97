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
      ? "rounded-full border border-zinc-700/80 bg-zinc-900/80 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm"
      : "rounded-full border border-zinc-800 bg-zinc-950/80 px-5 py-2.5 text-sm text-zinc-500";

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
      className="overflow-hidden py-16"
      aria-label="Technology stack marquee"
    >
      <MarqueeRow items={TECH_MARQUEE} variant="primary" />
      <div className="mt-4">
        <MarqueeRow items={rowB} reverse variant="muted" />
      </div>
    </section>
  );
}
