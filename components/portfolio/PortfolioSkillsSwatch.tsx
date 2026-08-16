"use client";

import { SkillLogo } from "@/components/portfolio/skill-logos";
import {
  FRONTEND_SKILLS,
  SKILL_GROUPS,
  STACK_LAYERS,
  type SkillGroup,
} from "@/lib/portfolioData";
import { swatchColor, swatchLogoIsInk } from "@/lib/swatchColor";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

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

function skillsForGroup(group: SkillGroup) {
  return FRONTEND_SKILLS.filter((skill) => skill.group === group);
}

export default function PortfolioSkillsSwatch() {
  const reducedMotion = useReducedMotion() ?? false;
  const [group, setGroup] = useState<SkillGroup>("Frontend");
  const visible = useMemo(() => skillsForGroup(group), [group]);
  const [activeId, setActiveId] = useState(visible[0].id);
  const active =
    visible.find((skill) => skill.id === activeId) ?? visible[0];
  const activeFill = swatchColor(active.color);
  const activeMeta = [active.group, active.version].filter(Boolean).join(" · ");
  const fillers =
    visible.length >= 6 ? (6 - (visible.length % 6)) % 6 : 0;

  return (
    <section id="skills" className="portfolio-gutter scroll-mt-16 py-24" aria-label="Skills">
      <div className="portfolio-column">
        <p className="atlas-label">Skills</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Core technologies
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Frontend, backend, and AI tools used in production
        </p>

        <div
          className="mt-8 flex gap-1 overflow-x-auto"
          role="tablist"
          aria-label="Skill groups"
        >
          {SKILL_GROUPS.map((item) => {
            const selected = item === group;
            const count = skillsForGroup(item).length;

            return (
              <button
                key={item}
                type="button"
                role="tab"
                id={`skill-group-${item}`}
                aria-selected={selected}
                aria-controls="skill-sheet"
                onClick={() => {
                  setGroup(item);
                  setActiveId(skillsForGroup(item)[0].id);
                }}
                className={`relative min-w-[6.5rem] shrink-0 border border-b-0 px-4 pb-3 pt-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-route ${
                  selected
                    ? "z-10 border-grid bg-[#f2f5f8]"
                    : "border-transparent bg-transparent hover:-translate-y-0.5"
                }`}
              >
                <span className="font-display text-xs font-bold text-ink uppercase">
                  {item}
                </span>
                <span className="mt-1 block font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  {count} {count === 1 ? "tool" : "tools"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="atlas-ticket overflow-hidden border-t-0">
          <div
            id="skill-sheet"
            role="tabpanel"
            aria-labelledby={`skill-group-${group}`}
            className="flex flex-wrap items-end justify-between gap-4 border-b border-grid px-5 py-4 sm:px-6"
          >
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
                  {activeMeta}
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
            {visible.map((skill) => {
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
            {Array.from({ length: fillers }, (_, index) => (
              <li
                key={`filler-${index}`}
                aria-hidden
                className="hidden border-r border-b border-grid bg-paper lg:block"
              />
            ))}
          </ul>
        </div>

        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {STACK_LAYERS.map((layer) => (
            <div key={layer.layer} className="border-t border-grid pt-4">
              <dt className="atlas-label">{layer.layer}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{layer.tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
