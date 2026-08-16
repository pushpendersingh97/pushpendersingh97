"use client";

import { FRONTEND_SKILLS } from "@/lib/portfolioData";
import { swatchCode, swatchColor } from "@/lib/swatchColor";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export default function PortfolioSkillsSwatch() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState(FRONTEND_SKILLS[0].id);
  const active =
    FRONTEND_SKILLS.find((skill) => skill.id === activeId) ?? FRONTEND_SKILLS[0];
  const activeFill = swatchColor(active.color);

  return (
    <section id="skills" className="scroll-mt-16 px-6 py-24 lg:pl-20" aria-label="Core technologies">
      <div className="mx-auto max-w-5xl">
        <p className="atlas-label">Colorway</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Sample chips
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          The stack as a paper swatch book — pick a chip to read its code.
        </p>

        <div className="atlas-ticket mt-8 overflow-hidden">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-grid px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 shrink-0 border border-grid"
                style={{ backgroundColor: activeFill }}
                aria-hidden
              />
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-ink uppercase">
                  {active.label}
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  {active.category}
                </p>
              </div>
            </div>
            <p className="font-mono text-sm tracking-[0.18em] text-route">
              #{swatchCode(active.color)}
            </p>
          </div>

          <ul className="grid grid-cols-3 bg-[#f2f5f8] sm:grid-cols-4 lg:grid-cols-6">
            {FRONTEND_SKILLS.map((skill) => {
              const fill = swatchColor(skill.color);
              const selected = skill.id === active.id;

              return (
                <li key={skill.id} className="border-r border-b border-grid bg-paper">
                  <motion.button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(skill.id)}
                    onFocus={() => setActiveId(skill.id)}
                    onMouseEnter={() => setActiveId(skill.id)}
                    className="group flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-route"
                    whileHover={reducedMotion ? undefined : { y: -4 }}
                    whileTap={reducedMotion ? undefined : { y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span
                      className="block h-24 w-full sm:h-28"
                      style={{ backgroundColor: fill }}
                      aria-hidden
                    />
                    <span className="flex flex-1 flex-col justify-between gap-2 bg-[#f2f5f8] px-3 py-3">
                      <span className="font-display text-sm font-bold tracking-tight text-ink uppercase">
                        {skill.label}
                      </span>
                      <span
                        className={`font-mono text-[10px] tracking-[0.14em] ${
                          selected ? "text-route" : "text-muted"
                        }`}
                      >
                        #{swatchCode(skill.color)}
                      </span>
                    </span>
                    <span
                      className="block h-0.5 w-full"
                      style={{
                        backgroundColor: selected ? fill : "transparent",
                      }}
                      aria-hidden
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
