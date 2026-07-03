"use client";

import { SECTION_NAV_CHAPTERS } from "@/lib/effectsData";
import { prefersReducedMotion } from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EffectsSectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const index = sections.indexOf(visible[0].target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reducedMotion]);

  const scrollToChapter = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (reducedMotion) {
    return (
      <div aria-label="Section navigation chapters">
        {SECTION_NAV_CHAPTERS.map((chapter, index) => (
          <section
            key={chapter.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="flex min-h-svh items-center px-6 py-24"
          >
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:items-center">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-800">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
                  {chapter.label}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">{chapter.title}</h2>
                <p className="mt-4 text-zinc-400">{chapter.body}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" aria-label="Section navigation with scroll tracking">
      <nav
        className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        aria-label="Chapter navigation"
      >
        {SECTION_NAV_CHAPTERS.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollToChapter(index)}
            className="group flex items-center gap-3 text-left"
            aria-current={activeIndex === index ? "true" : undefined}
            aria-label={`Go to ${chapter.label}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? 12 : 8,
                height: activeIndex === index ? 12 : 8,
                backgroundColor: activeIndex === index ? "#38bdf8" : "#52525b",
                boxShadow:
                  activeIndex === index ? "0 0 16px rgba(56, 189, 248, 0.55)" : "none",
              }}
            />
            <span
              className="text-[10px] font-medium tracking-wide uppercase transition-opacity"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                color: activeIndex === index ? "#38bdf8" : "#71717a",
              }}
            >
              {chapter.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="fixed top-20 left-4 z-40 font-mono text-xs text-sky-400 md:hidden">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(SECTION_NAV_CHAPTERS.length).padStart(2, "0")}
      </div>

      {SECTION_NAV_CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="flex min-h-svh items-center px-6 py-24 md:pl-28"
        >
          <div className="mx-auto grid w-full max-w-4xl gap-8 md:grid-cols-2 md:items-center">
            <div
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl transition-[opacity,transform] duration-700"
              style={{
                opacity: activeIndex === index ? 1 : 0.55,
                transform: activeIndex === index ? "scale(1)" : "scale(0.96)",
              }}
            >
              <Image
                src={chapter.image}
                alt={chapter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={index < 2}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
                Chapter {String(index + 1).padStart(2, "0")} · {chapter.label}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">{chapter.body}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
