"use client";

import { TECH_MARQUEE } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

export default function EffectsScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    cleanup = bindScrollProgress(section, (progress) => {
      const offset = mapRange(progress, [0, 1], [0, -50]);
      const scale = mapRange(progress, [0, 0.5, 1], [1, 1.08, 0.95]);
      track.style.transform = `translate3d(${offset}%, 0, 0) scale(${scale})`;
      track.style.animationPlayState = progress > 0.05 && progress < 0.95 ? "paused" : "running";
    });

    return () => cleanup?.();
  }, [reducedMotion]);

  const chips = TECH_MARQUEE.slice(0, 12);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Technology marquee">
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] w-full"
      aria-label="Scroll-linked marquee"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8 px-6">
        <p className="text-center text-sm text-zinc-500">
          Scroll through this section — marquee position locks to progress mid-scroll
        </p>
        <div className="portfolio-marquee-viewport w-full max-w-4xl">
          <div
            ref={trackRef}
            className="portfolio-marquee-track will-change-transform"
          >
            <div className="portfolio-marquee-group">
              {chips.map((tech) => (
                <span
                  key={tech}
                  className="shrink-0 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="portfolio-marquee-group" aria-hidden="true">
              {chips.map((tech) => (
                <span
                  key={`dup-${tech}`}
                  className="shrink-0 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
