"use client";

import { SNAP_CHAPTER_BEATS } from "@/lib/effectsData";
import { prefersReducedMotion } from "@/lib/scrollProgress";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function EffectsSnapChapters() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const beatRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const beats = beatRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const idx = beats.indexOf(top.target as HTMLElement);
        if (idx >= 0) setActiveIndex(idx);
      },
      { threshold: [0.45, 0.65, 0.85] },
    );

    beats.forEach((beat) => observer.observe(beat));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="space-y-8 px-6 pb-24" aria-label="Scroll snap chapters">
        {SNAP_CHAPTER_BEATS.map((beat) => (
          <article key={beat.id} className="overflow-hidden rounded-2xl border border-zinc-800">
            <div className="relative aspect-video">
              <Image src={beat.image} alt={beat.title} fill className="object-cover" sizes="640px" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white">{beat.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{beat.body}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className="effects-snap-track h-[calc(100svh-12rem)] snap-y snap-mandatory overflow-y-auto rounded-2xl border border-zinc-800/80 mx-6 mb-24"
      aria-label="Scroll snap chapter beats"
    >
      {SNAP_CHAPTER_BEATS.map((beat, index) => (
        <section
          key={beat.id}
          ref={(el) => {
            beatRefs.current[index] = el;
          }}
          className="effects-snap-beat relative flex min-h-full snap-start snap-always flex-col justify-center px-6 py-10 sm:flex-row sm:items-center sm:gap-10"
        >
          <div
            className="relative mx-auto aspect-video w-full max-w-md overflow-hidden rounded-xl border border-zinc-700/60 sm:mx-0 sm:max-w-sm"
            style={{
              transform: activeIndex === index ? "scale(1)" : "scale(0.97)",
              transition: "transform 0.4s ease",
            }}
          >
            <Image src={beat.image} alt={beat.title} fill className="object-cover" sizes="400px" />
          </div>
          <div className="mt-8 text-center sm:mt-0 sm:max-w-sm sm:text-left">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-lg"
              style={{
                transform: activeIndex === index ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.35s ease",
                color: activeIndex === index ? "#38bdf8" : "#71717a",
              }}
            >
              {beat.icon}
            </span>
            <h2
              className="mt-4 text-2xl font-bold text-white sm:text-3xl"
              style={{
                transform: activeIndex === index ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.35s ease",
              }}
            >
              {beat.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{beat.body}</p>
          </div>
        </section>
      ))}
      <div className="flex snap-start items-center justify-center py-8 text-sm text-zinc-600">
        <Link href="/effects" className="text-sky-400 hover:text-sky-300">
          ← Back to all effects
        </Link>
      </div>
    </div>
  );
}
