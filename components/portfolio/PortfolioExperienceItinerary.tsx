"use client";

import { EXPERIENCE } from "@/lib/portfolioData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export default function PortfolioExperienceItinerary() {
  const reducedMotion = useReducedMotion() ?? false;
  const [openId, setOpenId] = useState(EXPERIENCE[0].id);

  return (
    <section id="work" className="portfolio-gutter scroll-mt-16 py-24" aria-label="Experience">
      <div className="portfolio-column">
        <p className="atlas-label">Career</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Experience
        </h2>
        <p className="mt-2 text-sm text-muted">
          Work history
        </p>

        <ul className="mt-10 space-y-4">
          {EXPERIENCE.map((job, index) => {
            const open = job.id === openId;
            const isNow = index === 0;

            return (
              <li key={job.id}>
                <article
                  className="atlas-ticket overflow-hidden"
                  style={{ borderLeftColor: job.accent, borderLeftWidth: 0 }}
                >
                  <div className="flex">
                    <div
                      className="atlas-stub relative flex w-[4.75rem] shrink-0 flex-col items-center justify-center py-5 text-white sm:w-24"
                      style={{ backgroundColor: job.accent }}
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
                          setOpenId((current) => (current === job.id ? "" : job.id))
                        }
                        className="flex w-full cursor-pointer flex-col items-start px-5 py-5 text-left sm:px-6 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-route"
                      >
                        <div className="flex w-full flex-wrap items-center gap-2">
                          <p className="font-mono text-xs text-route">{job.period}</p>
                          {isNow ? (
                            <span className="rounded-sm bg-stamp px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-white uppercase">
                              Now
                            </span>
                          ) : null}
                        </div>
                        <h3 className="font-display mt-2 text-xl font-bold tracking-tight text-ink uppercase sm:text-2xl">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {job.company} · {job.location}
                        </p>
                      </button>

                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            key={`${job.id}-body`}
                            initial={{ height: reducedMotion ? "auto" : 0, opacity: reducedMotion ? 1 : 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: reducedMotion ? "auto" : 0, opacity: reducedMotion ? 1 : 0 }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.28,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-dashed border-grid px-5 pb-6 sm:px-6">
                              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
                                {job.highlights.slice(0, 4).map((highlight) => (
                                  <li key={highlight} className="flex gap-2">
                                    <span style={{ color: job.accent }}>→</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {job.tech.slice(0, 6).map((tech) => (
                                  <span
                                    key={tech}
                                    className="border border-grid px-2.5 py-0.5 font-mono text-[10px] text-muted"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
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
