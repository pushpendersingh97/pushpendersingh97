"use client";

import { CHAPTER_PROGRESS_SECTIONS } from "@/lib/effectsData";
import { bindScrollProgress, prefersReducedMotion } from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

function ChapterBlock({
  title,
  body,
  index,
  reducedMotion,
}: {
  title: string;
  body: string;
  index: number;
  reducedMotion: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const ring = ringRef.current;
    const bar = barRef.current;
    if (!section || !ring || !bar) return;

    const circumference = 2 * Math.PI * 18;
    ring.style.strokeDasharray = String(circumference);

    return bindScrollProgress(section, (progress) => {
      ring.style.strokeDashoffset = String(circumference * (1 - progress));
      bar.style.transform = `scaleX(${progress})`;
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] w-full"
      aria-label={`Chapter ${index + 1}: ${title}`}
    >
      <div className="sticky top-0 flex min-h-svh items-center px-6 py-20">
        <div className="mx-auto flex w-full max-w-2xl items-start gap-6">
          <div className="relative shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#27272a" strokeWidth="3" />
              <circle
                ref={ringRef}
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                style={{ strokeDashoffset: 113 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-sky-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-3 text-zinc-400">{body}</p>
            <div className="mt-6 h-0.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                ref={barRef}
                className="h-full origin-left bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EffectsChapterProgress() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  if (reducedMotion) {
    return (
      <div className="space-y-8 px-6 py-24" aria-label="Chapter reading progress">
        {CHAPTER_PROGRESS_SECTIONS.map((ch, i) => (
          <article key={ch.id} className="rounded-xl border border-zinc-800 p-6">
            <p className="text-xs text-sky-400">Chapter {i + 1}</p>
            <h2 className="mt-2 text-xl font-bold text-white">{ch.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{ch.body}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div aria-label="Per-chapter reading progress">
      {CHAPTER_PROGRESS_SECTIONS.map((ch, index) => (
        <ChapterBlock
          key={ch.id}
          title={ch.title}
          body={ch.body}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
