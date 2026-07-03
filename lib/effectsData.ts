export type EffectRoute = {
  slug: string;
  title: string;
  description: string;
  tag: string;
};

export const EFFECT_ROUTES: EffectRoute[] = [
  {
    slug: "projects",
    title: "Featured projects",
    description: "Sticky scrollytelling with case-study cards, mockups, and tech chips.",
    tag: "Scrollytelling",
  },
  {
    slug: "timeline",
    title: "Career timeline",
    description: "Vertical line fills as company nodes activate in sequence.",
    tag: "Timeline",
  },
  {
    slug: "architecture",
    title: "Architecture diagram",
    description: "Stack layers connect and illuminate as you scroll through the build flow.",
    tag: "Diagram",
  },
  {
    slug: "headline-reveal",
    title: "Split headline reveal",
    description: "Words stagger in on scroll with opacity and vertical motion.",
    tag: "Typography",
  },
  {
    slug: "before-after",
    title: "Before / after scrub",
    description: "Scroll-scrub comparison slider for UI or performance improvements.",
    tag: "Scrub",
  },
  {
    slug: "skills-deep-dive",
    title: "Skills deep dive",
    description: "Pinned sidebar list with a detail panel that swaps per scroll segment.",
    tag: "Pinned nav",
  },
  {
    slug: "marquee",
    title: "Scroll-linked marquee",
    description: "Marquee speed and position tied to section scroll progress.",
    tag: "Marquee",
  },
  {
    slug: "theme-transitions",
    title: "Theme transitions",
    description: "Background palette crossfades across narrative phases.",
    tag: "Theme",
  },
  {
    slug: "contact-cta",
    title: "Magnetic contact CTA",
    description: "Final beat scales and glows as scroll progress completes.",
    tag: "CTA",
  },
  {
    slug: "svg-draw",
    title: "SVG path draw",
    description: "Connector path draws on scroll via stroke-dashoffset.",
    tag: "SVG",
  },
  {
    slug: "horizontal-gallery",
    title: "Horizontal gallery",
    description: "Pinned stage with a sideways-scrolling image strip.",
    tag: "Gallery",
  },
];

export type FeaturedProject = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
  accent: string;
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "tmtc-crm",
    title: "TMTC Patient Platform",
    subtitle: "The Medical Travel Company",
    period: "2025 – Present",
    summary:
      "Concurrent CRM, affiliate portal, and patient coordination with headless CMS and geo-routing.",
    highlights: [
      "Next.js 16 + Strapi v5 multi-region CMS",
      "AI workflows for documents and travel coordination",
      "ISR, webhooks, and technical SEO automation",
    ],
    tech: ["Next.js", "Strapi", "GraphQL", "Vercel", "i18n"],
    accent: "#c5ff3b",
  },
  {
    id: "tata-portal",
    title: "Tata AIG Agent Portal",
    subtitle: "Tata AIG",
    period: "2023 – 2025",
    summary:
      "Payment and user-management modules for insurance agents across India.",
    highlights: [
      "Led team of 2–3 engineers through delivery",
      "Complex payment workflows with backend coordination",
      "Reusable MUI component patterns at scale",
    ],
    tech: ["React", "MUI", "Redux", "Next.js"],
    accent: "#38bdf8",
  },
  {
    id: "enterprise-insurance",
    title: "Enterprise Insurance Suite",
    subtitle: "Gemini Solution",
    period: "2021 – 2023",
    summary:
      "Frontend architecture for a large insurance platform serving Tata AIG.",
    highlights: [
      "React + Angular hybrid delivery",
      "Coding standards and review culture",
      "Agile stakeholder collaboration",
    ],
    tech: ["React", "Angular", "TypeScript", "SASS"],
    accent: "#a78bfa",
  },
  {
    id: "hr-platform",
    title: "HR Workforce Suite",
    subtitle: "CatalystOne Solutions",
    period: "2019 – 2021",
    summary:
      "Core HR modules with legacy refactors and a shared UI component library.",
    highlights: [
      "Legacy codebase modernization",
      "Reusable design-system components",
      "Scrum Master for cross-team delivery",
    ],
    tech: ["Angular", "Java", "Bootstrap", "SCSS"],
    accent: "#fb923c",
  },
];

export type ArchitectureLayer = {
  id: string;
  label: string;
  detail: string;
  color: string;
};

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "ui",
    label: "App Router UI",
    detail: "React 19 · Next.js 16 · Tailwind v4 · Framer Motion",
    color: "#38bdf8",
  },
  {
    id: "api",
    label: "API & Data",
    detail: "REST · GraphQL · Server Actions · Webhooks",
    color: "#c5ff3b",
  },
  {
    id: "cms",
    label: "Headless CMS",
    detail: "Strapi v5 · i18n · Media · Draft preview",
    color: "#a78bfa",
  },
  {
    id: "deploy",
    label: "Deploy & Edge",
    detail: "Vercel · ISR · Geo routing · Technical SEO",
    color: "#fb923c",
  },
];

export type SkillDeepDive = {
  id: string;
  label: string;
  color: string;
  headline: string;
  body: string;
  bullets: string[];
};

export const SKILLS_DEEP_DIVE: SkillDeepDive[] = [
  {
    id: "react",
    label: "React",
    color: "#61dafb",
    headline: "Component architecture at scale",
    body: "Hooks, server/client boundaries, and performance-conscious rendering patterns.",
    bullets: ["Server Components by default", "Colocated UI logic", "Memoization when measured"],
  },
  {
    id: "next",
    label: "Next.js",
    color: "#ffffff",
    headline: "Full-stack App Router delivery",
    body: "Routing, data fetching, ISR, and middleware for localized experiences.",
    bullets: ["App Router conventions", "ISR + webhook revalidation", "Geo-based routing"],
  },
  {
    id: "typescript",
    label: "TypeScript",
    color: "#3178c6",
    headline: "Type-safe product velocity",
    body: "Shared types across API boundaries and CMS schemas.",
    bullets: ["Strict mode", "API contract typing", "Codegen from GraphQL"],
  },
  {
    id: "motion",
    label: "Motion",
    color: "#bb4b96",
    headline: "Scroll-native storytelling",
    body: "Sticky tracks, direct DOM transforms, and reduced-motion fallbacks.",
    bullets: ["bindScrollProgress pattern", "prefers-reduced-motion", "Transform + opacity only"],
  },
];

export const GALLERY_ITEMS = [
  { id: "1", label: "Patient CRM", color: "#c5ff3b" },
  { id: "2", label: "Affiliate Portal", color: "#38bdf8" },
  { id: "3", label: "Agent Dashboard", color: "#a78bfa" },
  { id: "4", label: "CMS Admin", color: "#fb923c" },
  { id: "5", label: "Geo Routing", color: "#34d399" },
  { id: "6", label: "SEO Pipeline", color: "#f472b6" },
] as const;

export const THEME_PHASES = [
  { id: "midnight", label: "Midnight", bg: "#0a0e14", accent: "#38bdf8" },
  { id: "ocean", label: "Ocean", bg: "#0c1929", accent: "#22d3ee" },
  { id: "forest", label: "Forest", bg: "#0f1a12", accent: "#c5ff3b" },
  { id: "ember", label: "Ember", bg: "#1a100c", accent: "#fb923c" },
] as const;
