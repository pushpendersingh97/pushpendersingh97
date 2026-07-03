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
  {
    slug: "card-peel",
    title: "Stacked card peel-off",
    description: "Photo cards stack and peel away one by one as you scroll.",
    tag: "Cards",
  },
  {
    slug: "ui-scrub",
    title: "UI frame scrub",
    description: "Scroll through a sequence of screen frames like a product walkthrough.",
    tag: "Scrub",
  },
  {
    slug: "code-reveal",
    title: "Code reveal",
    description: "Source lines type in while a product screenshot fades into view.",
    tag: "Code",
  },
  {
    slug: "flip-story",
    title: "Flip card story",
    description: "Case-study card flips between photo fronts and outcome copy.",
    tag: "Flip",
  },
  {
    slug: "section-nav",
    title: "Section nav dots",
    description: "Multi-chapter page with a fixed rail that tracks scroll position.",
    tag: "Navigation",
  },
  {
    slug: "perspective-tilt",
    title: "3D perspective tilt",
    description: "Sticky photo stage with subtle rotateX/Y tied to scroll progress.",
    tag: "3D",
  },
  {
    slug: "highlight-sweep",
    title: "Text highlight sweep",
    description: "Highlighter mark grows across key words as you scroll.",
    tag: "Typography",
  },
  {
    slug: "morph-svg",
    title: "Morphing SVG icons",
    description: "Circle, folder, and checkmark crossfade through ship/deploy/success.",
    tag: "SVG",
  },
  {
    slug: "snap-chapters",
    title: "Scroll snap chapters",
    description: "Full-viewport snap beats with a minimal heading pulse on each chapter.",
    tag: "Snap",
  },
  {
    slug: "velocity-particles",
    title: "Velocity particles",
    description: "Ambient grid dots drift faster when scroll velocity spikes.",
    tag: "Particles",
  },
  {
    slug: "chapter-progress",
    title: "Chapter reading progress",
    description: "Per-section progress rings fill independently as you scroll each chapter.",
    tag: "Progress",
  },
  {
    slug: "footer-cta",
    title: "Footer CTA reveal",
    description: "Bottom bar slides up after ~70% page depth.",
    tag: "CTA",
  },
  {
    slug: "patient-journey",
    title: "Patient journey map",
    description: "Care path nodes activate along a route: intake → records → travel → plan.",
    tag: "TMTC",
  },
  {
    slug: "document-stack",
    title: "Document stack shuffle",
    description: "Paper sheets fan out, then collapse into one submitted file.",
    tag: "TMTC",
  },
  {
    slug: "geo-pins",
    title: "Geo pin sequence",
    description: "Locale pins drop onto a stylized map as scroll progresses.",
    tag: "TMTC",
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

/** Random-ish picsum photos (stable seeds per effect) */
export const PEEL_CARDS = [
  {
    id: "crm",
    title: "Patient CRM",
    subtitle: "Intake & coordination",
    image: "https://picsum.photos/seed/tmtc-crm/640/420",
    accent: "#c5ff3b",
  },
  {
    id: "portal",
    title: "Affiliate Portal",
    subtitle: "Partner dashboards",
    image: "https://picsum.photos/seed/affiliate-portal/640/420",
    accent: "#38bdf8",
  },
  {
    id: "agent",
    title: "Agent Workspace",
    subtitle: "Insurance workflows",
    image: "https://picsum.photos/seed/agent-desk/640/420",
    accent: "#a78bfa",
  },
  {
    id: "cms",
    title: "Headless CMS",
    subtitle: "Multi-region content",
    image: "https://picsum.photos/seed/strapi-cms/640/420",
    accent: "#fb923c",
  },
] as const;

export const UI_SCRUB_FRAMES = [
  { id: 1, label: "Landing hero", image: "https://picsum.photos/seed/ui-frame-1/960/600" },
  { id: 2, label: "Feature grid", image: "https://picsum.photos/seed/ui-frame-2/960/600" },
  { id: 3, label: "Dashboard", image: "https://picsum.photos/seed/ui-frame-3/960/600" },
  { id: 4, label: "Detail view", image: "https://picsum.photos/seed/ui-frame-4/960/600" },
  { id: 5, label: "Settings", image: "https://picsum.photos/seed/ui-frame-5/960/600" },
  { id: 6, label: "Analytics", image: "https://picsum.photos/seed/ui-frame-6/960/600" },
  { id: 7, label: "Mobile layout", image: "https://picsum.photos/seed/ui-frame-7/960/600" },
  { id: 8, label: "Success state", image: "https://picsum.photos/seed/ui-frame-8/960/600" },
] as const;

export const CODE_REVEAL_LINES = [
  "export async function getPatient(id: string) {",
  "  const res = await fetch(`${API}/patients/${id}`);",
  "  if (!res.ok) throw new Error('Not found');",
  "  return res.json() as Promise<Patient>;",
  "}",
  "",
  "export const revalidate = 3600; // ISR · 1 hour",
] as const;

export const CODE_REVEAL_IMAGE =
  "https://picsum.photos/seed/code-reveal-screen/720/480";

export type FlipStoryBeat = {
  id: string;
  phase: string;
  title: string;
  body: string;
  image: string;
  accent: string;
};

export const FLIP_STORY_BEATS: FlipStoryBeat[] = [
  {
    id: "problem",
    phase: "Problem",
    title: "Fragmented patient intake",
    body: "Teams juggled spreadsheets, email threads, and legacy forms across regions.",
    image: "https://picsum.photos/seed/flip-problem/640/400",
    accent: "#f87171",
  },
  {
    id: "approach",
    phase: "Approach",
    title: "Unified headless platform",
    body: "Next.js frontends, Strapi CMS, and geo-routing middleware in one pipeline.",
    image: "https://picsum.photos/seed/flip-approach/640/400",
    accent: "#38bdf8",
  },
  {
    id: "outcome",
    phase: "Outcome",
    title: "Faster coordinated care",
    body: "Automated SEO, ISR, and AI document flows cut coordination time dramatically.",
    image: "https://picsum.photos/seed/flip-outcome/640/400",
    accent: "#c5ff3b",
  },
];

export type SectionNavChapter = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
};

export const SECTION_NAV_CHAPTERS: SectionNavChapter[] = [
  {
    id: "discover",
    label: "Discover",
    title: "Research & discovery",
    body: "Stakeholder interviews, journey maps, and technical audits shape the roadmap.",
    image: "https://picsum.photos/seed/chapter-discover/800/520",
  },
  {
    id: "design",
    label: "Design",
    title: "Design systems",
    body: "Tokens, components, and motion specs keep multi-team delivery consistent.",
    image: "https://picsum.photos/seed/chapter-design/800/520",
  },
  {
    id: "build",
    label: "Build",
    title: "Full-stack build",
    body: "App Router UI, APIs, CMS schemas, and CI pipelines ship in parallel.",
    image: "https://picsum.photos/seed/chapter-build/800/520",
  },
  {
    id: "launch",
    label: "Launch",
    title: "Launch & measure",
    body: "ISR, SEO automation, and analytics validate performance in production.",
    image: "https://picsum.photos/seed/chapter-launch/800/520",
  },
  {
    id: "scale",
    label: "Scale",
    title: "Scale & iterate",
    body: "Geo-routing, i18n, and webhook-driven cache keep growth manageable.",
    image: "https://picsum.photos/seed/chapter-scale/800/520",
  },
];

export const PERSPECTIVE_IMAGE =
  "https://picsum.photos/seed/perspective-tilt/800/560";

export const HIGHLIGHT_SEGMENTS: Array<{ text: string; highlight?: string }> = [
  { text: "Ship ", highlight: "production-ready" },
  { text: " web apps with ", highlight: "scroll-native" },
  { text: " motion and ", highlight: "accessible" },
  { text: " fallbacks." },
];

export const SNAP_CHAPTER_BEATS = [
  {
    id: "plan",
    icon: "◆",
    title: "Plan the journey",
    body: "Map stakeholders, routes, and content models before a line of UI ships.",
    image: "https://picsum.photos/seed/snap-plan/900/560",
  },
  {
    id: "build",
    icon: "⚙",
    title: "Build in parallel",
    body: "CRM, portals, and CMS schemas evolve together with shared tokens.",
    image: "https://picsum.photos/seed/snap-build/900/560",
  },
  {
    id: "test",
    icon: "✓",
    title: "Test with real flows",
    body: "Patient intake, affiliate onboarding, and geo-routing in staging.",
    image: "https://picsum.photos/seed/snap-test/900/560",
  },
  {
    id: "launch",
    icon: "↑",
    title: "Launch & learn",
    body: "ISR, SEO automation, and analytics close the feedback loop.",
    image: "https://picsum.photos/seed/snap-launch/900/560",
  },
] as const;

export const CHAPTER_PROGRESS_SECTIONS = [
  { id: "ch1", title: "Discovery", body: "Research and audits establish the baseline." },
  { id: "ch2", title: "Architecture", body: "Headless CMS, APIs, and routing take shape." },
  { id: "ch3", title: "Delivery", body: "Sprints ship CRM surfaces and affiliate tools." },
  { id: "ch4", title: "Optimization", body: "Performance, SEO, and i18n harden the platform." },
] as const;

export const PATIENT_JOURNEY_STEPS = [
  {
    id: "intake",
    label: "Intake",
    detail: "Online consultation & triage forms",
    x: 12,
    y: 72,
  },
  {
    id: "records",
    label: "Records",
    detail: "Medical history & document upload",
    x: 38,
    y: 48,
  },
  {
    id: "travel",
    label: "Travel",
    detail: "Visa, flights & accommodation coordination",
    x: 62,
    y: 58,
  },
  {
    id: "care",
    label: "Care plan",
    detail: "Treatment schedule & follow-up",
    x: 88,
    y: 28,
  },
] as const;

export const GEO_PINS = [
  { id: "uk", label: "London", locale: "en-GB", x: 46, y: 32 },
  { id: "uae", label: "Dubai", locale: "ar-AE", x: 58, y: 52 },
  { id: "in", label: "Mumbai", locale: "en-IN", x: 68, y: 58 },
  { id: "sg", label: "Singapore", locale: "en-SG", x: 78, y: 62 },
  { id: "us", label: "New York", locale: "en-US", x: 28, y: 38 },
] as const;

export const GEO_MAP_IMAGE = "https://picsum.photos/seed/geo-map/960/540";
