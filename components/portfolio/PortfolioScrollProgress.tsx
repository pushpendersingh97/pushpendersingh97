"use client";

import { prefersReducedMotion } from "@/lib/scrollProgress";
import { useEffect, useRef } from "react";

const WAYPOINTS = [
  { id: "hero", label: "Start" },
  { id: "skills", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "built", label: "Built" },
  { id: "ops", label: "Ops" },
  { id: "contact", label: "Contact" },
] as const;

export default function PortfolioScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const fillMobileRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const fill = fillRef.current;
    const fillMobile = fillMobileRef.current;
    if (!fill || !fillMobile) return;

    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 0 : Math.min(scrollTop / docHeight, 1);

      fill.style.transform = `scaleY(${progress})`;
      fillMobile.style.transform = `scaleX(${progress})`;

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const threshold = i / (WAYPOINTS.length - 1);
        const active = progress >= threshold - 0.02;
        dot.dataset.active = active ? "true" : "false";
      });
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
  }, []);

  return (
    <>
      {/* Mobile: top route bar */}
      <div
        className="fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-grid lg:hidden"
        aria-hidden
      >
        <div
          ref={fillMobileRef}
          className="h-full origin-left bg-route will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Desktop: left route rail */}
      <div
        className="pointer-events-none fixed top-1/2 left-4 z-50 hidden h-[min(60vh,420px)] w-10 -translate-y-1/2 lg:block"
        aria-hidden
      >
        <div className="relative mx-auto h-full w-px bg-grid">
          <div
            ref={fillRef}
            className="absolute inset-x-0 top-0 origin-top bg-route will-change-transform"
            style={{ height: "100%", transform: "scaleY(0)" }}
          />
        </div>
        <ul className="absolute inset-0 flex flex-col items-center justify-between">
          {WAYPOINTS.map((wp, i) => (
            <li key={wp.id} className="relative flex items-center">
              <span
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                data-active="false"
                title={wp.label}
                className="block h-2.5 w-2.5 rounded-full border-2 border-route bg-paper transition-colors data-[active=true]:bg-stamp data-[active=true]:border-stamp"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
