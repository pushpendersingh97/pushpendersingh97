"use client";

import { PROFILE } from "@/lib/portfolioData";
import { mapRange, prefersReducedMotion } from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

export default function EffectsFooterCta() {
  const barRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight <= 0 ? 0 : scrollTop / docHeight;
      const visible = mapRange(depth, [0.68, 0.78], [0, 1]);
      bar.style.transform = `translateY(${(1 - visible) * 100}%)`;
      bar.style.opacity = String(visible);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="space-y-0 px-6 py-8" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-8"
          >
            <div className="h-4 w-1/3 rounded bg-zinc-800" />
            <div className="mt-4 h-3 w-full rounded bg-zinc-800/70" />
            <div className="mt-2 h-3 w-5/6 rounded bg-zinc-800/50" />
          </div>
        ))}
      </div>

      <p className="pb-32 text-center text-sm text-zinc-600">
        Scroll past ~70% depth to reveal the footer CTA bar
      </p>

      <div
        ref={barRef}
        className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-950/95 px-6 py-4 backdrop-blur-md will-change-[transform,opacity]"
        style={{ transform: "translateY(100%)", opacity: 0 }}
        role="region"
        aria-label="Footer call to action"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-white">Ready to collaborate?</p>
            <p className="text-xs text-zinc-500">{PROFILE.title} · {PROFILE.tagline.slice(0, 48)}…</p>
          </div>
          <a href={`mailto:${PROFILE.email}`} className="portfolio-btn shrink-0">
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
