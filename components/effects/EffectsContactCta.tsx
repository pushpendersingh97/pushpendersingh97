"use client";

import { PROFILE } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type CtaElements = {
  button: HTMLElement;
  glow: HTMLElement;
  ring: HTMLElement;
  copy: HTMLElement;
};

function queryElements(stage: HTMLElement): CtaElements | null {
  const button = stage.querySelector<HTMLElement>('[data-cta-part="button"]');
  const glow = stage.querySelector<HTMLElement>('[data-cta-part="glow"]');
  const ring = stage.querySelector<HTMLElement>('[data-cta-part="ring"]');
  const copy = stage.querySelector<HTMLElement>('[data-cta-part="copy"]');

  if (!button || !glow || !ring || !copy) return null;
  return { button, glow, ring, copy };
}

function applyCtaStyles(elements: CtaElements, progress: number) {
  const scale = mapRange(progress, [0, 0.35, 0.7, 1], [0.75, 1.08, 1.05, 1.12]);
  const glowOpacity = mapRange(progress, [0.2, 0.55, 0.85], [0, 0.6, 0.35]);
  const ringScale = mapRange(progress, [0.25, 0.65], [0.6, 1.4]);
  const ringOpacity = mapRange(progress, [0.25, 0.5, 0.8], [0, 0.5, 0]);
  const copyY = mapRange(progress, [0, 0.3], [32, 0]);
  const copyOpacity = mapRange(progress, [0, 0.25, 0.9, 1], [0, 1, 1, 0.7]);

  elements.button.style.transform = `scale(${scale})`;
  elements.glow.style.opacity = String(glowOpacity);
  elements.glow.style.transform = `scale(${scale * 1.2})`;
  elements.ring.style.transform = `scale(${ringScale})`;
  elements.ring.style.opacity = String(ringOpacity);
  elements.copy.style.transform = `translateY(${copyY}px)`;
  elements.copy.style.opacity = String(copyOpacity);
}

export default function EffectsContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let retryFrame = 0;

    const setup = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const elements = queryElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        applyCtaStyles(elements, progress);
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24 text-center" aria-label="Contact call to action">
        <h2 className="text-2xl font-bold text-white">Let&apos;s build together</h2>
        <a
          href={`mailto:${PROFILE.email}`}
          className="portfolio-btn mt-6 inline-block"
        >
          Get in touch
        </a>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] w-full"
      aria-label="Scroll-driven contact CTA"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="relative flex flex-col items-center">
          <p
            data-cta-part="copy"
            className="mb-8 max-w-md text-center text-lg text-zinc-400 will-change-[opacity,transform]"
            style={{ opacity: 0 }}
          >
            Ready to ship your next product? Scroll to amplify the call to action.
          </p>

          <div className="relative flex items-center justify-center">
            <div
              data-cta-part="ring"
              className="pointer-events-none absolute h-48 w-48 rounded-full border border-sky-400/40 will-change-[opacity,transform]"
              style={{ opacity: 0, transform: "scale(0.6)" }}
              aria-hidden
            />
            <div
              data-cta-part="glow"
              className="pointer-events-none absolute h-40 w-40 rounded-full bg-sky-400/30 blur-3xl will-change-[opacity,transform]"
              style={{ opacity: 0 }}
              aria-hidden
            />
            <a
              href={`mailto:${PROFILE.email}`}
              data-cta-part="button"
              className="portfolio-btn relative z-10 will-change-transform"
              style={{ transform: "scale(0.75)" }}
            >
              <span className="relative z-10">Get in touch</span>
              <span className="portfolio-btn-shine" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
