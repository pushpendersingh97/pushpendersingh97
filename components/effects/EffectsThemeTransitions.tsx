"use client";

import { THEME_PHASES } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export default function EffectsThemeTransitions() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const accent = accentRef.current;
    if (!section || !bg || !label || !accent) return;

    cleanup = bindScrollProgress(section, (progress) => {
      const count = THEME_PHASES.length;
      const scaled = progress * (count - 1);
      const index = Math.min(count - 2, Math.floor(scaled));
      const local = scaled - index;
      const from = THEME_PHASES[index];
      const to = THEME_PHASES[index + 1];
      const activeIndex = local < 0.5 ? index : index + 1;

      bg.style.backgroundColor = lerpColor(from.bg, to.bg, local);
      accent.style.backgroundColor = lerpColor(from.accent, to.accent, local);
      accent.style.opacity = String(mapRange(local, [0, 0.5, 1], [0.15, 0.35, 0.15]));
      label.textContent = local < 0.5 ? from.label : to.label;
      label.style.color = lerpColor(from.accent, to.accent, local);

      const chips = chipsRef.current?.querySelectorAll<HTMLElement>("[data-theme-chip]");
      chips?.forEach((chip, i) => {
        chip.style.opacity = String(i === activeIndex ? 1 : 0.35);
      });
    });

    return () => cleanup?.();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Theme transitions">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {THEME_PHASES.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-zinc-800 p-6"
              style={{ backgroundColor: p.bg }}
            >
              <p style={{ color: p.accent }}>{p.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] w-full"
      aria-label="Scroll-driven theme transitions"
    >
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 -z-10 will-change-[background-color]"
        style={{ backgroundColor: THEME_PHASES[0].bg }}
        aria-hidden
      />
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div
          ref={accentRef}
          className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl will-change-[opacity,background-color]"
          style={{ backgroundColor: THEME_PHASES[0].accent, opacity: 0.15 }}
          aria-hidden
        />
        <p
          ref={labelRef}
          className="text-sm font-medium tracking-[0.4em] uppercase will-change-[color]"
          style={{ color: THEME_PHASES[0].accent }}
        >
          {THEME_PHASES[0].label}
        </p>
        <h2 className="mt-6 max-w-lg text-center text-3xl font-bold text-white sm:text-4xl">
          Background palette crossfades as you scroll through narrative phases
        </h2>
        <div ref={chipsRef} className="mt-12 flex flex-wrap justify-center gap-3">
          {THEME_PHASES.map((p, i) => (
            <span
              key={p.id}
              data-theme-chip
              className="rounded-full border px-4 py-1.5 text-xs transition-opacity"
              style={{
                borderColor: `${p.accent}44`,
                color: p.accent,
                opacity: i === 0 ? 1 : 0.35,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
