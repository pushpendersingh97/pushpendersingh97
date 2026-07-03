"use client";

import { HIGHLIGHT_SEGMENTS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

export default function EffectsHighlightSweep() {
  const sectionRef = useRef<HTMLElement>(null);
  const marksRef = useRef<(HTMLElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    const section = sectionRef.current;
    if (!section) return;

    const marks = marksRef.current.filter(Boolean) as HTMLElement[];
    if (marks.length === 0) return;

    cleanup = bindScrollProgress(section, (progress) => {
      marks.forEach((mark, index) => {
        const start = index * 0.22 + 0.08;
        const end = start + 0.18;
        const width = mapRange(progress, [start, end], [0, 100]);
        mark.style.backgroundSize = `${width}% 100%`;
      });
    });

    return () => cleanup?.();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24 text-center" aria-label="Text highlight sweep">
        <h2 className="max-w-2xl text-3xl font-bold leading-snug text-white">
          Ship{" "}
          <mark className="bg-sky-400/35 text-white">production-ready</mark> web apps
          with{" "}
          <mark className="bg-sky-400/35 text-white">scroll-native</mark> motion and{" "}
          <mark className="bg-sky-400/35 text-white">accessible</mark> fallbacks.
        </h2>
      </section>
    );
  }

  let markIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] w-full"
      aria-label="Scroll-driven text highlight sweep"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <h2 className="max-w-2xl text-center text-3xl font-bold leading-snug text-white sm:text-4xl">
          {HIGHLIGHT_SEGMENTS.map((segment, i) => {
            if (!segment.highlight) {
              return <span key={i}>{segment.text}</span>;
            }
            const idx = markIndex++;
            return (
              <span key={i}>
                {segment.text}
                <mark
                  ref={(el) => {
                    marksRef.current[idx] = el;
                  }}
                  className="rounded-sm text-white"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(56,189,248,0.45), rgba(197,255,59,0.35))",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "0% 100%",
                    backgroundPosition: "0 88%",
                  }}
                >
                  {segment.highlight}
                </mark>
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
