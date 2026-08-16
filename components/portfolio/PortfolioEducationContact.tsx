"use client";

import {
  CERTIFICATIONS,
  EDUCATION,
  HONORS,
  PROFILE,
  RECOMMENDATIONS,
} from "@/lib/portfolioData";
import { useTwinChat } from "@/components/twin/TwinChatWidget";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PortfolioEducationContact() {
  const reducedMotion = useReducedMotion();
  const { open } = useTwinChat();

  return (
    <section
      id="contact"
      className="portfolio-gutter scroll-mt-16 py-24"
      aria-label="Summary, education, and contact"
    >
      <div className="portfolio-column">
        <p className="atlas-label">About</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
          Summary
        </h2>
        <motion.div
          className="atlas-ticket mt-8 p-8 sm:p-10"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-base leading-relaxed text-ink/75">
            {PROFILE.summary}
          </p>
          <p className="mt-3 font-mono text-sm text-muted">{PROFILE.location}</p>
        </motion.div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Education",
              content: (
                <ul className="space-y-5">
                  {EDUCATION.map((entry) => (
                    <li key={entry.id}>
                      <p className="font-display text-lg font-semibold tracking-tight text-ink uppercase">
                        {entry.degree}
                      </p>
                      <p className="mt-1 text-muted">{entry.school}</p>
                      <p className="mt-2 font-mono text-sm text-route">{entry.period}</p>
                      {entry.location ? (
                        <p className="mt-1 font-mono text-xs text-muted">{entry.location}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "Contact",
              content: (
                <ul className="space-y-3 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={open}
                      className="group flex items-center gap-2 text-ink/75 transition-colors hover:text-route"
                    >
                      <span className="inline-block text-stamp transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      Ask my public AI twin
                    </button>
                  </li>
                  <li>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="group flex items-center gap-2 text-ink/75 transition-colors hover:text-route"
                    >
                      <span className="inline-block text-stamp transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      {PROFILE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-ink/75 transition-colors hover:text-route"
                    >
                      <span className="inline-block text-stamp transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-ink/75 transition-colors hover:text-route"
                    >
                      <span className="inline-block text-stamp transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      LinkedIn
                    </a>
                  </li>
                </ul>
              ),
            },
          ].map((block, i) => (
            <motion.div
              key={block.title}
              className="atlas-ticket p-6"
              custom={i}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="atlas-label">{block.title}</h3>
              <div className="mt-4">{block.content}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="atlas-ticket mt-6 p-6"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="atlas-label">Certifications</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.id} className="text-sm">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink transition-colors hover:text-route"
                  >
                    {cert.name}
                  </a>
                ) : (
                  <span className="font-medium text-ink">{cert.name}</span>
                )}
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {cert.issuer} · {cert.issued}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {HONORS.length > 0 ? (
          <motion.div
            className="atlas-ticket mt-6 p-6"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="atlas-label">Honors & Awards</h3>
            <ul className="mt-4 space-y-3">
              {HONORS.map((honor) => (
                <li key={honor.id}>
                  <p className="font-medium text-ink">{honor.title}</p>
                  <p className="mt-1 font-mono text-sm text-muted">
                    {honor.issuer} · {honor.issued}
                  </p>
                  {honor.description ? (
                    <p className="mt-1 text-sm text-ink/65">{honor.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        <motion.div
          className="atlas-ticket mt-6 p-6"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="atlas-label">Recommendations</h3>
          <ul className="mt-4 space-y-6">
            {RECOMMENDATIONS.map((rec) => (
              <li key={rec.id}>
                <p className="text-sm leading-relaxed text-ink/70 italic">
                  &ldquo;{rec.quote}&rdquo;
                </p>
                <p className="mt-2 font-mono text-sm font-medium text-route">
                  {rec.linkedin ? (
                    <a
                      href={rec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-stamp"
                    >
                      — {rec.name}
                    </a>
                  ) : (
                    <>— {rec.name}</>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.footer
          className="mt-16 border-t border-grid pt-8 text-center font-mono text-sm text-muted"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} {PROFILE.name}
        </motion.footer>
      </div>
    </section>
  );
}
