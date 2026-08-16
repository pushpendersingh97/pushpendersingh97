"use client";

import { PROJECTS } from "@/lib/portfolioData";
import { swatchColor, swatchLogoIsInk } from "@/lib/swatchColor";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

function projectLinkLabel(url: string) {
  if (url.includes("github.com")) return "View on GitHub →";
  try {
    return `${new URL(url).hostname.replace(/^www\./, "")} →`;
  } catch {
    return "Visit site →";
  }
}

export default function PortfolioProjectsFolder() {
  const reducedMotion = useReducedMotion() ?? false;
  const [openId, setOpenId] = useState(PROJECTS[0].id);

  return (
    <section id="built" className="portfolio-gutter scroll-mt-16 py-24" aria-label="Projects">
      <div className="portfolio-column">
        <p className="atlas-label">Work</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Projects
        </h2>
        <p className="mt-2 text-sm text-muted">
          Selected products
        </p>

        <ul className="mt-10 space-y-4">
          {PROJECTS.map((project, index) => {
            const open = project.id === openId;
            const fill = swatchColor(project.accent ?? "#1f6f8b");
            const isNow = project.period.includes("Present");

            return (
              <li key={project.id}>
                <article className="atlas-ticket overflow-hidden">
                  <div className="flex">
                    <div
                      className={`atlas-stub relative flex w-[4.75rem] shrink-0 flex-col items-center justify-center py-5 sm:w-24 ${
                        swatchLogoIsInk(fill) ? "text-ink" : "text-white"
                      }`}
                      style={{ backgroundColor: fill }}
                    >
                      <span className="font-mono text-[10px] tracking-[0.18em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() =>
                          setOpenId((current) => (current === project.id ? "" : project.id))
                        }
                        className="flex w-full cursor-pointer flex-col items-start px-5 py-5 text-left sm:px-6 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-route"
                      >
                        <div className="flex w-full flex-wrap items-center gap-2">
                          <p className="font-mono text-xs text-route">{project.period}</p>
                          {isNow ? (
                            <span className="rounded-sm bg-stamp px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-white uppercase">
                              Now
                            </span>
                          ) : null}
                        </div>
                        <h3 className="font-display mt-2 text-xl font-bold tracking-tight text-ink uppercase sm:text-2xl">
                          {project.name}
                        </h3>
                        {project.company ? (
                          <p className="mt-1 text-sm text-muted">{project.company}</p>
                        ) : null}
                      </button>

                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            key={`${project.id}-body`}
                            initial={{
                              height: reducedMotion ? "auto" : 0,
                              opacity: reducedMotion ? 1 : 0,
                            }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{
                              height: reducedMotion ? "auto" : 0,
                              opacity: reducedMotion ? 1 : 0,
                            }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.28,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-dashed border-grid px-5 pb-6 sm:px-6">
                              {project.description ? (
                                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                                  {project.description}
                                </p>
                              ) : null}
                              {project.highlights && project.highlights.length > 0 ? (
                                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
                                  {project.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                      <span style={{ color: fill }}>→</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              {project.tech && project.tech.length > 0 ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {project.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="border border-grid px-2.5 py-0.5 font-mono text-[10px] text-muted"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                              {project.url ? (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-4 inline-block font-mono text-sm text-route hover:underline"
                                >
                                  {projectLinkLabel(project.url)}
                                </a>
                              ) : null}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
