"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const SHAPES = [
  { id: "circle", label: "Design", color: "#38bdf8" },
  { id: "folder", label: "Deploy", color: "#c5ff3b" },
  { id: "check", label: "Success", color: "#34d399" },
] as const;

export default function EffectsMorphSvg() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<(SVGSVGElement | null)[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    const section = sectionRef.current;
    const label = labelRef.current;
    if (!section || !label) return;

    const shapes = shapesRef.current.filter(Boolean) as SVGSVGElement[];

    cleanup = bindScrollProgress(section, (progress) => {
      shapes.forEach((shape, index) => {
        const center = (index + 0.5) / SHAPES.length;
        const distance = Math.abs(progress - center);
        const opacity = mapRange(distance, [0, 0.22], [1, 0]);
        const scale = mapRange(distance, [0, 0.18], [1.08, 0.85]);
        shape.style.opacity = String(opacity);
        shape.style.transform = `scale(${scale})`;
      });

      const activeIndex = Math.min(
        SHAPES.length - 1,
        Math.floor(progress * SHAPES.length + 0.001),
      );
      label.textContent = SHAPES[activeIndex].label;
      label.style.color = SHAPES[activeIndex].color;
    });

    return () => cleanup?.();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="flex flex-col items-center px-6 py-24" aria-label="Morphing SVG">
        <div className="flex gap-8">
          <svg viewBox="0 0 80 80" className="h-16 w-16 text-sky-400" aria-hidden>
            <circle cx="40" cy="40" r="28" fill="currentColor" opacity="0.3" />
          </svg>
          <svg viewBox="0 0 80 80" className="h-16 w-16 text-lime-300" aria-hidden>
            <path d="M12 24h24l8 10h24v34H12z" fill="currentColor" opacity="0.3" />
          </svg>
          <svg viewBox="0 0 80 80" className="h-16 w-16 text-emerald-400" aria-hidden>
            <path d="M22 42l12 12 26-28" fill="none" stroke="currentColor" strokeWidth="6" />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] w-full"
      aria-label="Scroll-driven morphing SVG icons"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <p
          ref={labelRef}
          className="mb-8 text-sm font-medium tracking-[0.35em] uppercase"
          style={{ color: SHAPES[0].color }}
        >
          {SHAPES[0].label}
        </p>
        <div className="relative h-40 w-40">
          <svg
            ref={(el) => {
              shapesRef.current[0] = el;
            }}
            viewBox="0 0 80 80"
            className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
            style={{ opacity: 1 }}
            aria-hidden
          >
            <circle cx="40" cy="40" r="28" fill="#38bdf8" opacity="0.85" />
          </svg>
          <svg
            ref={(el) => {
              shapesRef.current[1] = el;
            }}
            viewBox="0 0 80 80"
            className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
            style={{ opacity: 0 }}
            aria-hidden
          >
            <path
              d="M10 22c0-3 2-6 6-6h18l8 10h28c3 0 6 3 6 6v32c0 3-3 6-6 6H16c-3 0-6-3-6-6V22z"
              fill="#c5ff3b"
              opacity="0.9"
            />
          </svg>
          <svg
            ref={(el) => {
              shapesRef.current[2] = el;
            }}
            viewBox="0 0 80 80"
            className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
            style={{ opacity: 0 }}
            aria-hidden
          >
            <circle cx="40" cy="40" r="30" fill="none" stroke="#34d399" strokeWidth="4" />
            <path
              d="M24 42 L36 54 L58 28"
              fill="none"
              stroke="#34d399"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-10 max-w-sm text-center text-sm text-zinc-500">
          Circle → folder → checkmark crossfade through ship / deploy / success
        </p>
      </div>
    </section>
  );
}
