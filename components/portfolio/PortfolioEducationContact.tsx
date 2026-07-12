"use client";

import {
  CERTIFICATIONS,
  EDUCATION,
  HONORS,
  PROFILE,
  RECOMMENDATIONS,
} from "@/lib/portfolioData";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PortfolioEducationContact() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6 py-24" aria-label="Summary, education, and contact">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-10"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">About</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {PROFILE.summary}
          </p>
          <p className="mt-3 text-sm text-zinc-500">{PROFILE.location}</p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Education",
              content: (
                <ul className="space-y-5">
                  {EDUCATION.map((entry) => (
                    <li key={entry.id}>
                      <p className="text-lg font-semibold text-white">{entry.degree}</p>
                      <p className="mt-1 text-zinc-400">{entry.school}</p>
                      <p className="mt-2 text-sm text-sky-400/80">{entry.period}</p>
                      {entry.location ? (
                        <p className="mt-1 text-xs text-zinc-600">{entry.location}</p>
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
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-sky-300"
                    >
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      {PROFILE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                      className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-sky-300"
                    >
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      {PROFILE.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-sky-300"
                    >
                      <span className="inline-block transition-transform group-hover:translate-x-1">
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
                      className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-sky-300"
                    >
                      <span className="inline-block transition-transform group-hover:translate-x-1">
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
              className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-600"
              custom={i}
              variants={reducedMotion ? undefined : fadeUp}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                {block.title}
              </h3>
              <div className="mt-4">{block.content}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
            Certifications
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.id} className="text-sm">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-200 transition-colors hover:text-sky-300"
                  >
                    {cert.name}
                  </a>
                ) : (
                  <span className="font-medium text-zinc-200">{cert.name}</span>
                )}
                <p className="mt-0.5 text-zinc-500">
                  {cert.issuer} · {cert.issued}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {HONORS.length > 0 ? (
          <motion.div
            className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Honors & Awards
            </h3>
            <ul className="mt-4 space-y-3">
              {HONORS.map((honor) => (
                <li key={honor.id}>
                  <p className="font-medium text-white">{honor.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {honor.issuer} · {honor.issued}
                  </p>
                  {honor.description ? (
                    <p className="mt-1 text-sm text-zinc-500">{honor.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        <motion.div
          className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
            Recommendations
          </h3>
          <ul className="mt-4 space-y-6">
            {RECOMMENDATIONS.map((rec) => (
              <li key={rec.id}>
                <p className="text-sm leading-relaxed text-zinc-400 italic">
                  &ldquo;{rec.quote}&rdquo;
                </p>
                <p className="mt-2 text-sm font-medium text-sky-400/90">
                  {rec.linkedin ? (
                    <a
                      href={rec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-sky-300"
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
          className="mt-16 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} {PROFILE.name}
        </motion.footer>
      </div>
    </section>
  );
}
