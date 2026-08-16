"use client";

import { PROJECTS } from "@/lib/portfolioData";
import { swatchColor } from "@/lib/swatchColor";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export default function PortfolioProjectsFolder() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const active = PROJECTS.find((project) => project.id === activeId) ?? PROJECTS[0];
  const fill = swatchColor(active.accent ?? "#1f6f8b");

  return (
    <section id="built" className="portfolio-gutter scroll-mt-16 py-24" aria-label="Projects">
      <div className="portfolio-column">
        <p className="atlas-label">Work</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Projects
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Selected products
        </p>

        <div className="mt-10">
          <div
            className="flex gap-1 overflow-x-auto pb-0"
            role="tablist"
            aria-label="Projects"
          >
            {PROJECTS.map((project) => {
              const chip = swatchColor(project.accent ?? "#1f6f8b");
              const selected = project.id === active.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  id={`project-tab-${project.id}`}
                  aria-selected={selected}
                  aria-controls="project-sheet"
                  onClick={() => setActiveId(project.id)}
                  className={`relative min-w-[4.5rem] shrink-0 border border-b-0 px-3 pb-3 pt-2 text-left transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-route ${
                    selected
                      ? "z-10 border-grid bg-[#f2f5f8]"
                      : "border-transparent bg-transparent hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    className="mb-2 block h-2 w-full"
                    style={{ backgroundColor: chip }}
                    aria-hidden
                  />
                  <span className="mt-1 block max-w-[7rem] truncate font-display text-xs font-bold text-ink uppercase">
                    {project.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-x-3 top-3 bottom-[-10px] border border-grid bg-[#e8edf2]"
              aria-hidden
            />
            <div
              id="project-sheet"
              role="tabpanel"
              aria-labelledby={`project-tab-${active.id}`}
              className="atlas-ticket relative border-t-0 p-6 sm:p-8"
              style={{ boxShadow: `inset 0 3px 0 ${fill}` }}
            >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  <p className="font-mono text-xs" style={{ color: fill }}>
                    {active.period}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl">
                    {active.name}
                  </h3>
                  {active.company ? (
                    <p className="mt-1 text-sm text-muted">{active.company}</p>
                  ) : null}
                </div>

                {active.description ? (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/70">
                    {active.description}
                  </p>
                ) : null}

                {active.highlights && active.highlights.length > 0 ? (
                  <ul className="mt-5 space-y-2 text-sm text-ink/65">
                    {active.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span style={{ color: fill }}>→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {active.tech && active.tech.length > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-grid px-2.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                {active.url ? (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block font-mono text-sm text-route hover:underline"
                  >
                    View on GitHub →
                  </a>
                ) : null}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
