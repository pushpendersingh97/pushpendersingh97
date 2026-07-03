export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  tech: string[];
};

export const PROFILE = {
  name: "Pushpender Singh",
  title: "Full Stack Engineer",
  tagline: "Building & scaling web products with React, Next.js, TypeScript & AI-assisted development",
  phone: "+919456509722",
  email: "pushpendersingh311@gmail.com",
  github: "https://github.com/pushpendersingh97",
  linkedin: "https://www.linkedin.com/in/pushpendersingh97",
  summary:
    "Full Stack Engineer with 7+ years of experience building and scaling web products using React, Next.js, TypeScript, and AI-assisted development tools. Experienced in owning product architecture, backend APIs, technical SEO, and end-to-end delivery in both startup and enterprise environments.",
};

export const STATS = [
  { label: "Years Experience", value: 7, suffix: "+" },
  { label: "Companies", value: 4, suffix: "" },
  { label: "Products Shipped", value: 12, suffix: "+" },
  { label: "Teams Led", value: 3, suffix: "" },
] as const;

export type FrontendSkill = {
  id: string;
  label: string;
  color: string;
  category: string;
};

export const FRONTEND_SKILLS: FrontendSkill[] = [
  { id: "react", label: "React", color: "#61dafb", category: "UI Library" },
  { id: "next", label: "Next.js", color: "#ffffff", category: "Framework" },
  { id: "typescript", label: "TypeScript", color: "#3178c6", category: "Language" },
  { id: "tailwind", label: "Tailwind CSS", color: "#38bdf8", category: "Styling" },
  { id: "framer", label: "Framer Motion", color: "#bb4b96", category: "Animation" },
  { id: "redux", label: "Redux", color: "#764abc", category: "State" },
  { id: "mui", label: "Material-UI", color: "#007fff", category: "Components" },
  { id: "angular", label: "Angular", color: "#dd0031", category: "Framework" },
  { id: "sass", label: "SASS / SCSS", color: "#cd6799", category: "Preprocessor" },
  { id: "html", label: "HTML5", color: "#e34f26", category: "Markup" },
  { id: "css", label: "CSS3", color: "#1572b6", category: "Styling" },
  { id: "graphql", label: "GraphQL", color: "#e535ab", category: "Data Layer" },
];

/** @deprecated Use FRONTEND_SKILLS */
export const CORE_SKILLS = FRONTEND_SKILLS.slice(0, 6);

export const EXPERIENCE: Experience[] = [
  {
    id: "tmtc",
    company: "The Medical Travel Company",
    role: "Founding Engineer",
    location: "Remote",
    period: "Aug 2025 – Present",
    highlights: [
      "Spearheading concurrent development of CRM, Affiliate Portal, and patient coordination platforms",
      "Architected headless CMS with Next.js 16 and Strapi v5 for multi-region content management",
      "Deployed AI-driven workflows for patient management, document processing, and travel coordination",
      "Executed technical SEO with automated metadata, schema, and internationalization",
      "Built geo-based routing via IP middleware for localized user experiences",
      "Boosted performance through ISR, advanced data-fetching, and webhook cache management",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Strapi CMS",
      "GraphQL",
      "ISR",
      "Vercel",
    ],
  },
  {
    id: "tata-aig",
    company: "Tata AIG",
    role: "Senior Software Engineer",
    location: "Gurugram (Hybrid)",
    period: "Nov 2023 – Jul 2025",
    highlights: [
      "Led Payment and User Management modules for Agent Portal serving insurance agents across India",
      "Managed a team of 2–3 engineers through sprint planning, code reviews, and delivery",
      "Delivered complex business workflows coordinating with multiple backend and business teams",
      "Improved portal usability and performance through frontend optimization and reusable components",
    ],
    tech: ["React", "Material-UI", "Redux", "Next.js", "SASS", "Scrum"],
  },
  {
    id: "gemini",
    company: "Gemini Solution",
    role: "Senior Software Engineer",
    location: "Gurugram (Remote)",
    period: "Nov 2021 – Nov 2023",
    highlights: [
      "Led frontend development for enterprise-scale insurance platform (TATA AIG)",
      "Architected scalable, high-performance web applications using React, Angular, and TypeScript",
      "Established coding standards and conducted code reviews for long-term maintainability",
      "Collaborated with client stakeholders to deliver end-to-end features in Agile environments",
    ],
    tech: ["JavaScript", "React", "Angular", "TypeScript", "SASS", "Scrum"],
  },
  {
    id: "catalyst",
    company: "CatalystOne Solutions",
    role: "Software Engineer",
    location: "Mohali",
    period: "Jan 2019 – Sept 2021",
    highlights: [
      "Engineered core functionalities for enterprise HR and workforce optimization suite",
      "Refactored legacy codebases to mitigate technical debt and improve maintainability",
      "Designed reusable UI component library for design consistency across teams",
      "Directed Agile ceremonies as Scrum Master for sprint planning and cross-team coordination",
    ],
    tech: ["Angular", "Java", "jQuery", "Bootstrap", "HTML", "SCSS"],
  },
];

export const EDUCATION = {
  school: "Tula's Institute",
  degree: "Bachelor of Technology",
  period: "Aug 2015 – May 2019",
};

export const TECH_MARQUEE = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Redux Toolkit",
  "Material-UI",
  "Angular",
  "SASS / SCSS",
  "HTML5 & CSS3",
  "Strapi v5",
  "GraphQL",
  "REST APIs",
  "ISR / SSG",
  "Vercel",
  "Technical SEO",
  "i18n",
  "App Router",
  "Webhooks",
  "Geo Routing",
  "AI Workflows",
  "Scrum",
];
