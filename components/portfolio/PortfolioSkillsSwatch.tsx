"use client";

import { SkillLogo } from "@/components/portfolio/skill-logos";
import { FRONTEND_SKILLS } from "@/lib/portfolioData";
import { swatchColor, swatchLogoIsInk } from "@/lib/swatchColor";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

function logoToneClass(hex: string) {
  return swatchLogoIsInk(hex) ? "text-ink" : "text-white";
}

const RATING_MAX = 5;

function SkillRatingBar({
  rating,
  size = "chip",
  decorative = false,
}: {
  rating: number;
  size?: "chip" | "header";
  decorative?: boolean;
}) {
  const filled = Math.min(RATING_MAX, Math.max(0, rating));
  const isHeader = size === "header";

  return (
    <div
      className={`flex ${isHeader ? "w-32 gap-1" : "mt-2 w-full gap-0.5"}`}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "meter"}
      aria-label={decorative ? undefined : "Proficiency"}
      aria-valuemin={decorative ? undefined : 1}
      aria-valuemax={decorative ? undefined : RATING_MAX}
      aria-valuenow={decorative ? undefined : filled}
      aria-valuetext={decorative ? undefined : `${filled} out of ${RATING_MAX}`}
    >
      {Array.from({ length: RATING_MAX }, (_, index) => (
        <span
          key={index}
          className={`flex-1 ${isHeader ? "h-1.5" : "h-1"} ${
            index < filled ? "bg-route" : "bg-grid"
          }`}
        />
      ))}
    </div>
  );
}

export default function PortfolioSkillsSwatch() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState(FRONTEND_SKILLS[0].id);
  const active =
    FRONTEND_SKILLS.find((skill) => skill.id === activeId) ?? FRONTEND_SKILLS[0];
  const activeFill = swatchColor(active.color);

  return (
    <section id="skills" className="portfolio-gutter scroll-mt-16 py-24" aria-label="Core technologies">
      <div className="portfolio-column">
        <p className="atlas-label">Skills</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Core technologies
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Frontend stack
        </p>

        <div className="atlas-ticket mt-8 overflow-hidden">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-grid px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-grid"
                style={{ backgroundColor: activeFill }}
                aria-hidden
              >
                <SkillLogo
                  skillId={active.id}
                  className={`h-5 w-5 ${logoToneClass(active.color)}`}
                />
              </span>
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-ink uppercase">
                  {active.label}
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  {active.category}
                </p>
              </div>
            </div>
            <div className="flex min-w-[8rem] flex-col justify-end gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Proficiency
                </span>
                <span className="font-mono text-[10px] tabular-nums tracking-[0.12em] text-ink">
                  {active.rating} / {RATING_MAX}
                </span>
              </div>
              <SkillRatingBar rating={active.rating} size="header" />
            </div>
          </div>

          <ul className="grid grid-cols-3 bg-[#f2f5f8] sm:grid-cols-4 lg:grid-cols-6">
            {FRONTEND_SKILLS.map((skill) => {
              const fill = swatchColor(skill.color);
              const selected = skill.id === active.id;

              return (
                <li key={skill.id} className="border-r border-b border-grid bg-paper">
                  <motion.button
                    type="button"
                    aria-label={`${skill.label}, proficiency ${skill.rating} of ${RATING_MAX}`}
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
                      className="flex h-24 w-full items-center justify-center sm:h-28"
                      style={{ backgroundColor: fill }}
                      aria-hidden
                    >
                      <SkillLogo
                        skillId={skill.id}
                        className={`h-11 w-11 drop-shadow-[0_1px_0_rgba(20,32,44,0.18)] sm:h-12 sm:w-12 ${logoToneClass(skill.color)}`}
                      />
                    </span>
                    <span className="flex flex-1 flex-col justify-center bg-[#f2f5f8] px-3 py-3">
                      <span className="font-display text-sm font-bold tracking-tight text-ink uppercase">
                        {skill.label}
                      </span>
                      <SkillRatingBar rating={skill.rating} decorative />
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
            <li aria-hidden className="hidden border-r border-b border-grid bg-paper sm:block" />
            <li aria-hidden className="hidden border-r border-b border-grid bg-paper lg:block" />
            <li aria-hidden className="hidden border-r border-b border-grid bg-paper lg:block" />
          </ul>
        </div>
      </div>
    </section>
  );
}
