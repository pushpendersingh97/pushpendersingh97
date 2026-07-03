"use client";

import { ARCHITECTURE_LAYERS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type ArchElements = {
  layers: HTMLElement[];
  connectors: HTMLElement[];
  caption: HTMLElement;
};

function queryElements(stage: HTMLElement): ArchElements | null {
  const layers = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-arch-part="layer"]'),
  );
  const connectors = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-arch-part="connector"]'),
  );
  const caption = stage.querySelector<HTMLElement>('[data-arch-part="caption"]');

  if (layers.length === 0 || !caption) return null;

  return { layers, connectors, caption };
}

function applyArchStyles(elements: ArchElements, progress: number) {
  const count = elements.layers.length;
  const segmentSize = 1 / count;

  elements.layers.forEach((layer, index) => {
    const segmentStart = index * segmentSize;
    const local = mapRange(
      progress,
      [segmentStart, segmentStart + segmentSize * 0.85],
      [0, 1],
    );

    const y = mapRange(local, [0, 1], [40, 0]);
    const opacity = mapRange(local, [0, 0.2, 1], [0.2, 1, 1]);
    const scale = mapRange(local, [0, 0.5, 1], [0.92, 1, 1.02]);

    layer.style.opacity = String(opacity);
    layer.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
  });

  elements.connectors.forEach((connector, index) => {
    const segmentStart = (index + 1) * segmentSize;
    const visible = progress >= segmentStart - segmentSize * 0.2;
    connector.style.opacity = String(visible ? mapRange(progress, [segmentStart - segmentSize * 0.3, segmentStart], [0, 1]) : 0);
    connector.style.transform = `scaleY(${visible ? 1 : 0.3})`;
  });

  const activeIndex = Math.min(
    count - 1,
    Math.floor(progress * count + 0.001),
  );
  const active = ARCHITECTURE_LAYERS[activeIndex];
  elements.caption.textContent = active?.detail ?? "";
  elements.caption.style.opacity = String(mapRange(progress % segmentSize, [0.1, 0.3], [0.4, 1]));
}

export default function EffectsArchitectureDiagram() {
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
        applyArchStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Architecture diagram">
        <div className="mx-auto max-w-md space-y-4">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              style={{ borderLeftColor: layer.color, borderLeftWidth: 3 }}
            >
              <h2 className="font-semibold text-white">{layer.label}</h2>
              <p className="mt-1 text-sm text-zinc-500">{layer.detail}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[360vh] w-full"
      aria-label="Scroll-driven architecture diagram"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-lg">
          <p
            data-arch-part="caption"
            className="mb-8 min-h-[3rem] text-center text-sm text-zinc-400 will-change-[opacity]"
          >
            {ARCHITECTURE_LAYERS[0].detail}
          </p>
          <div className="flex flex-col items-center gap-0">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <div key={layer.id} className="flex flex-col items-center">
                <div
                  data-arch-part="layer"
                  className="w-full rounded-xl border border-zinc-700/60 bg-zinc-900/80 px-6 py-4 text-center shadow-lg will-change-transform"
                  style={{
                    borderTopColor: layer.color,
                    borderTopWidth: 3,
                    opacity: 0.2,
                    transform: "translate3d(0, 40px, 0) scale(0.92)",
                  }}
                >
                  <h2 className="text-lg font-bold text-white">{layer.label}</h2>
                </div>
                {index < ARCHITECTURE_LAYERS.length - 1 ? (
                  <div
                    data-arch-part="connector"
                    className="my-1 h-8 w-0.5 origin-top bg-zinc-600 will-change-transform"
                    style={{ opacity: 0 }}
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
