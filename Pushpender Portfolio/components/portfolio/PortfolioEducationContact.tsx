"use client";

import { EDUCATION, PROFILE } from "@/lib/portfolioData";
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
          <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
            Animation · whileInView reveal
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">About</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {PROFILE.summary}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Education",
              content: (
                <>
                  <p className="text-lg font-semibold text-white">{EDUCATION.degree}</p>
                  <p className="mt-1 text-zinc-400">{EDUCATION.school}</p>
                  <p className="mt-2 text-sm text-sky-400/80">{EDUCATION.period}</p>
                </>
              ),
            },
            {
              title: "Contact",
              content: (
                <ul className="space-y-3 text-sm">
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

        <motion.footer
          className="mt-16 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} {PROFILE.name} · Built with Next.js & Framer Motion
        </motion.footer>
      </div>
    </section>
  );
}
