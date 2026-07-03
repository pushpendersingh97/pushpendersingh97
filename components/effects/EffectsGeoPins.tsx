"use client";

import { GEO_MAP_IMAGE, GEO_PINS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LIME = "#c5ff3b";

export default function EffectsGeoPins() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
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
      const label = labelRef.current;
      if (!section || !label) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        const activeCount = Math.min(
          GEO_PINS.length,
          Math.floor(mapRange(progress, [0.08, 0.95], [0, GEO_PINS.length + 0.001])),
        );

        pinRefs.current.forEach((pin, index) => {
          if (!pin) return;
          const dropStart = index / GEO_PINS.length;
          const local = mapRange(progress, [dropStart, dropStart + 0.15], [0, 1]);
          const visible = index < activeCount || local > 0;
          const y = mapRange(local, [0, 1], [-40, 0]);
          const scale = mapRange(local, [0, 0.6, 1], [0.5, 1.15, 1]);

          pin.style.opacity = String(visible ? mapRange(local, [0, 0.3], [0, 1]) : 0);
          pin.style.transform = `translate(-50%, calc(-100% + ${y}px)) scale(${scale})`;
        });

        const activePin = GEO_PINS[Math.max(0, activeCount - 1)];
        if (activePin && activeCount > 0) {
          label.textContent = `${activePin.label} · ${activePin.locale} · geo-routed experience`;
        }
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
      <section className="px-6 py-24" aria-label="Geo pin sequence">
        <ul className="mx-auto max-w-sm space-y-3">
          {GEO_PINS.map((pin) => (
            <li key={pin.id} className="rounded-lg border border-zinc-800 px-4 py-3 text-sm">
              <span className="font-medium text-white">{pin.label}</span>
              <span className="text-zinc-500"> · {pin.locale}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[360vh] w-full"
      aria-label="Scroll-driven geo pin sequence"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <p
            ref={labelRef}
            className="mb-4 text-center text-sm text-zinc-400"
          >
            Scroll to drop locale pins on the map
          </p>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-700/60 shadow-2xl">
            <Image
              src={GEO_MAP_IMAGE}
              alt="Stylized world map"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-zinc-950/40" aria-hidden />

            {GEO_PINS.map((pin, index) => (
              <div
                key={pin.id}
                className="absolute"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <div
                  ref={(el) => {
                    pinRefs.current[index] = el;
                  }}
                  className="relative will-change-[opacity,transform]"
                  style={{ opacity: 0, transform: "translate(-50%, calc(-100% + -40px)) scale(0.5)" }}
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: LIME }}
                    aria-hidden
                  >
                    <span className="text-xs text-zinc-900">📍</span>
                  </div>
                  <p className="mt-1 whitespace-nowrap text-center text-[10px] font-medium text-white">
                    {pin.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
