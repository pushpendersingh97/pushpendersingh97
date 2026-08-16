<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## This site is a resume

This project is **Pushpender Singh's resume** on the web — not an experimental portfolio playground.

### Copy and section names

- Prefer standard CV section names and wording: Skills, Experience, Projects, Education, Contact, and similar.
- Do **not** invent metaphors or cute labels for visitor-facing copy. Avoid names that would not appear on a resume (e.g. Colorway, Sample chips, Itinerary, Filed work, Dossier, Pull a chip).
- Keep the paper visual system (atlas tickets, color chips, skill logos). Visual motif is not copy: headings, nav, buttons, `aria-label`s, and metadata should read like a CV — professional and accurate.
- Existing component filenames may still use older names. Do not rename files unless asked. Visitor-facing copy is what must match a resume.

### Facts

- Source of truth: `lib/portfolioData.ts`. Do not invent job titles, dates, metrics, companies, skills, education, or other facts.
- **Ask before changing factual resume content** (roles, dates, highlights, skills, education, contact, stats). Presentation and visuals may change; biography may not without confirmation.

## 1. Understand before you act

For any request:

1. **Restate the goal** in one sentence.
2. **Scan the codebase** — existing patterns, components, routes, and conventions.
3. **Write a short plan** (3–6 bullets): what will change, what stays untouched, risks.
4. **Ask clarifying questions** when anything is ambiguous, missing, or could go multiple ways.

### Always ask before building if unclear

- Scope (which pages, sections, or components?)
- Design (Figma link, reference site, or match existing styles?)
- Content (copy vs. facts in `lib/portfolioData.ts`; images; CMS vs static?)
- Behavior (animation on scroll vs on load? mobile behavior?)
- Data (API, env vars, auth?)
- Acceptance criteria (what does “done” look like?)
- Factual resume content (titles, dates, metrics, skills) — never invent or silently rewrite biography

Do **not** guess on product, design, or business decisions. Prefer one focused question over a wrong assumption.

## 2. Verify docs before writing code

Training data may be outdated. **Always check current documentation** before implementing.

### Priority order

1. **Local Next.js docs** — read guides under `node_modules/next/dist/docs/`. Heed deprecation notices. Do not assume Next.js 13/14 patterns.
2. **Official docs** (when local docs are insufficient):
   - Next.js: https://nextjs.org/docs
   - React: https://react.dev
   - Tailwind CSS v4: https://tailwindcss.com/docs
   - Framer Motion: https://motion.dev/docs
3. **Project stack** — confirm versions in `package.json`:
   - Next.js 16.x
   - React 19.x
   - Tailwind CSS 4.x (`@import "tailwindcss"`, `@theme inline`)
   - Framer Motion 12.x (client components only: `"use client"`)
   - TypeScript 5.x

If docs conflict with training data, **docs win**.

## 3. Development workflow

1. **Plan** → confirm scope (ask questions if needed).
2. **Research** → read relevant docs and existing code.
3. **Implement** → smallest correct change; match project style.
4. **Verify** → lint/build; manual check for UI and animation work.
5. **Summarize** → what changed, why, and how to test.

## 4. Architecture and conventions

### Next.js App Router

- Use `app/` directory conventions.
- Default to **Server Components**; add `"use client"` only for hooks, browser APIs, Framer Motion, or interactivity.
- Use `next/image` for images; respect `next.config.ts` settings.
- Colocate UI in `components/` with clear names (e.g. `PortfolioSkillsFan.tsx`, not `Section1.tsx`).

### Styling

- **Tailwind CSS v4** — utilities in JSX; shared tokens in `app/globals.css` via `@theme`.
- Reuse existing colors and fonts; avoid one-off magic values when a token fits.
- Mobile-first responsive layouts.

### Animation

- **Framer Motion** for scroll reveals, fan stacks, sticky scroll sections.
- Animate `transform` and `opacity` when possible.
- Respect `prefers-reduced-motion`.

### Code quality

- Minimal scope — no drive-by refactors.
- Match existing naming, imports, and file structure.
- No unnecessary abstractions or comments on obvious code.
- Do not commit unless the user asks.

## 5. Request types

| Request type       | Action                                                            |
| ------------------ | ----------------------------------------------------------------- |
| New feature        | Plan → questions → docs → implement                               |
| Bug fix            | Reproduce → root cause → minimal fix                              |
| “How does X work?” | Read code + docs → explain with file references                   |
| Animation / UI     | Confirm reference → Framer Motion + Tailwind → test scroll/mobile |
| Resume copy        | CV section names; professional wording; no invented metaphors     |
| Resume facts       | Read `lib/portfolioData.ts`; ask before changing biography        |
| Dependency add     | Check compatibility with Next 16 / React 19 → document why        |

## 6. Output expectations

- Be concise and accurate.
- Cite existing code with `startLine:endLine:filepath` when referencing the codebase.
- If blocked by missing info, **stop and ask** — do not invent requirements.
- If docs were consulted, briefly note which API or pattern you followed and why.
