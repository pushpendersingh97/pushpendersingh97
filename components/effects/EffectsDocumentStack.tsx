"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const SHEET_COUNT = 6;
const LIME = "#c5ff3b";

export default function EffectsDocumentStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const sheetRefs = useRef<(HTMLElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);
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
      const badge = badgeRef.current;
      const sheets = sheetRefs.current.filter(Boolean) as HTMLElement[];
      if (!section || !badge || sheets.length === 0) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        const fanT = mapRange(progress, [0.1, 0.55], [0, 1]);
        const stackT = mapRange(progress, [0.58, 0.92], [0, 1]);

        sheets.forEach((sheet, index) => {
          const fanAngle = mapRange(fanT, [0, 1], [0, -28 + index * 11]);
          const fanX = mapRange(fanT, [0, 1], [0, -90 + index * 36]);
          const fanY = mapRange(fanT, [0, 1], [index * -4, index * -18 - 20]);
          const stackAngle = mapRange(stackT, [0, 1], [fanAngle, index * 0.4]);
          const stackX = mapRange(stackT, [0, 1], [fanX, index * 1.5]);
          const stackY = mapRange(stackT, [0, 1], [fanY, index * -2]);
          const opacity = mapRange(stackT, [0.85, 1], [1, index === 0 ? 1 : 0.35]);

          sheet.style.transform = `translate3d(${stackX}px, ${stackY}px, 0) rotate(${stackAngle}deg)`;
          sheet.style.opacity = String(index === 0 ? 1 : opacity);
          sheet.style.zIndex = String(SHEET_COUNT - index);
        });

        badge.style.opacity = String(mapRange(stackT, [0.75, 0.95], [0, 1]));
        badge.style.transform = `translateY(${mapRange(stackT, [0.75, 0.95], [12, 0])}px) scale(${mapRange(stackT, [0.8, 1], [0.9, 1])})`;
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
      <section className="px-6 py-24 text-center" aria-label="Document stack shuffle">
        <div className="mx-auto inline-block rounded-xl border border-zinc-700 bg-white px-8 py-6 text-zinc-800 shadow-lg">
          <p className="font-semibold">File submitted</p>
          <p className="mt-1 text-sm text-zinc-500">6 documents merged</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] w-full bg-zinc-50 text-zinc-900"
      aria-label="Scroll-driven document stack shuffle"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <p className="mb-8 text-xs tracking-[0.25em] text-zinc-500 uppercase">
          TMTC · Document processing
        </p>
        <div className="relative h-72 w-64">
          {Array.from({ length: SHEET_COUNT }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                sheetRefs.current[index] = el;
              }}
              className="absolute inset-x-4 top-8 h-56 rounded-lg border border-zinc-200 bg-white shadow-md will-change-transform"
              style={{
                transform: `translate3d(0, ${index * -4}px, 0) rotate(${index * 0.5}deg)`,
                zIndex: SHEET_COUNT - index,
              }}
            >
              <div className="border-b border-zinc-100 px-4 py-3">
                <div className="h-2 w-16 rounded bg-zinc-200" />
              </div>
              <div className="space-y-2 p-4">
                <div className="h-2 w-full rounded bg-zinc-100" />
                <div className="h-2 w-4/5 rounded bg-zinc-100" />
                <div className="h-2 w-3/5 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
        <div
          ref={badgeRef}
          className="mt-8 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold will-change-[opacity,transform]"
          style={{
            backgroundColor: `${LIME}33`,
            color: "#3f6212",
            opacity: 0,
          }}
        >
          <span aria-hidden>✓</span> File submitted
        </div>
      </div>
    </section>
  );
}
