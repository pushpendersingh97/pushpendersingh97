"use client";

import { STATS } from "@/lib/portfolioData";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROTATIONS = [-3.5, 2.2, -1.6, 3.1];
const STAMP_COLORS = ["#1f6f8b", "#d4572a", "#3d6b4f", "#6b5878"];

function StampValue({
  value,
  suffix,
  active,
  reducedMotion,
}: {
  value: number;
  suffix: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reducedMotion || !active) return;

    const start = performance.now();
    const duration = 900;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, value]);

  return (
    <>
      {reducedMotion ? value : shown}
      {suffix}
    </>
  );
}

export default function PortfolioStatsStamps() {
  const reducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="ops"
      className="scroll-mt-16 px-6 py-24 lg:pl-20"
      aria-label="Career statistics"
    >
      <div className="mx-auto max-w-4xl">
        <p className="atlas-label">Stamped</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          By the numbers
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {STATS.map((stat, index) => {
            const color = STAMP_COLORS[index] ?? "#1f6f8b";

            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center"
                initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                style={{ rotate: ROTATIONS[index] }}
              >
                <div
                  className="stamp-mark flex h-28 w-28 flex-col items-center justify-center sm:h-32 sm:w-32"
                  style={{ color, borderColor: color }}
                >
                  <p className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
                    <StampValue
                      value={stat.value}
                      suffix={stat.suffix}
                      active={inView}
                      reducedMotion={reducedMotion}
                    />
                  </p>
                </div>
                <p className="mt-3 max-w-[8rem] font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
