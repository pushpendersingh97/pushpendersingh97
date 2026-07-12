export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  tech: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  period: string;
  location?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  url?: string;
};

export type Honor = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  description?: string;
};

export type Recommendation = {
  id: string;
  name: string;
  linkedin?: string;
  quote: string;
};

export type Project = {
  id: string;
  name: string;
  period: string;
  description?: string;
  url?: string;
};

export const PROFILE = {
  name: "Pushpender Singh",
  title: "Full Stack Engineer",
  tagline:
    "Founding Engineer at The Medical Travel Company — building AI products from 0→1 with AI-first workflows",
  email: "pushpendersingh311@gmail.com",
  phone: "+91 9456509722",
  location: "Gurugram, Haryana, India",
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
  {
    id: "typescript",
    label: "TypeScript",
    color: "#3178c6",
    category: "Language",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    color: "#38bdf8",
    category: "Styling",
  },
  {
    id: "framer",
    label: "Framer Motion",
    color: "#bb4b96",
    category: "Animation",
  },
  { id: "redux", label: "Redux", color: "#764abc", category: "State" },
  { id: "mui", label: "Material-UI", color: "#007fff", category: "Components" },
  { id: "angular", label: "Angular", color: "#dd0031", category: "Framework" },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#339933",
    category: "Runtime",
  },
  {
    id: "sass",
    label: "SASS / SCSS",
    color: "#cd6799",
    category: "Preprocessor",
  },
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
    location: "Delhi / Remote",
    period: "Aug 2025 – Present",
    highlights: [
      "Built and maintained a Next.js 16 headless CMS platform using Strapi v5, with ISR and on-demand webhook cache invalidation",
      "Architected geo-based routing middleware with IP country detection for multi-region localized content",
      "Migrated GraphQL data layer from Apollo Client to native fetch, reducing bundle size and improving performance",
      "Developed reusable React + Tailwind CSS v4 component library (blog, profile, layout) with responsive patterns",
      "Led healthcare CRM and Affiliate Portal for lead management, partner workflows, and business scalability",
      "Deployed AI-driven workflows for patient management, document processing, and travel coordination",
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
    location: "Gurugram, Haryana",
    period: "Nov 2023 – Jul 2025",
    highlights: [
      "Independently developed and led Payment and Generic modules for the Agent Portal",
      "Owned User Management frontend — API integrations, workflows, and UX discussions",
      "Led a team of 2–3 developers through the full project lifecycle under SCRUM",
      "Handled CKYC microservice integration across multiple applications",
      "Mentored juniors through code reviews, technical guidance, and best practices",
      "Optimized Lambda functions from ~40,000 to ~1,700 across Dev and UAT environments",
    ],
    tech: ["React", "Material-UI", "Redux", "Next.js", "SASS", "Scrum"],
  },
  {
    id: "gemini",
    company: "Gemini Solutions",
    role: "Senior Software Engineer (L1 → L2)",
    location: "Gurugram, Haryana",
    period: "Nov 2021 – Nov 2023",
    highlights: [
      "Progressed from Senior Software Engineer L1 to L2 while owning frontend delivery",
      "Built highly functional web applications using React, Angular, TypeScript, HTML, and SCSS",
      "Integrated UI features to prescribed code standards and technical design guidelines",
      "Applied Agile methodology to shorten cycle time and hit delivery targets",
      "Cross-trained teammates to maximize team agility and performance",
    ],
    tech: ["JavaScript", "React", "Angular", "TypeScript", "SASS", "Scrum"],
  },
  {
    id: "catalyst",
    company: "CatalystOne Solutions",
    role: "Software Engineer / Scrum Master",
    location: "Mohali, Punjab",
    period: "Jan 2019 – Sep 2021",
    highlights: [
      "Grew from Software Development Intern → Associate → Software Engineer; also served as Scrum Master",
      "Engineered core functionalities for an enterprise HR and workforce optimization suite",
      "Revised and modularized legacy codebases to modern standards, reducing operating costs",
      "Collaborated with product owners on realistic milestones for pre-release software",
      "Participated in field testing and led Agile ceremonies for cross-team coordination",
    ],
    tech: ["Angular", "Java", "jQuery", "Bootstrap", "HTML", "SCSS"],
  },
];

export const EDUCATION: Education[] = [
  {
    id: "tulas",
    school: "Tula's Institute",
    degree: "Bachelor of Technology (B.Tech.), Computer Science",
    period: "Aug 2015 – May 2019",
    location: "Dehradun, Uttarakhand",
  },
  {
    id: "airtribe",
    school: "Airtribe",
    degree: "Product Management",
    period: "Sep 2023 – Nov 2023",
    location: "Bengaluru",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "airtribe-pml",
    name: "Product Management Launchpad",
    issuer: "Airtribe",
    issued: "Nov 2023",
    url: "https://airtribe.live/product-management/certificate/VNTUORK4ARCO",
  },
  {
    id: "namaste-react",
    name: "Namaste React",
    issuer: "NamasteDev.com",
    issued: "Oct 2023",
    url: "https://courses.namastedev.com/learn/certificate/8795919-142240",
  },
  {
    id: "psm-i",
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    issued: "Jul 2023",
    url: "https://scrum.org/certificates/987777",
  },
  {
    id: "advanced-css",
    name: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    issuer: "Udemy",
    issued: "Aug 2022",
    url: "https://udemy.com/certificate/UC-03ca4205-9201-4116-8cad-d67370b481db/",
  },
  {
    id: "angular-crash",
    name: "Angular Crash Course for Busy Developers",
    issuer: "Udemy",
    issued: "Oct 2021",
    url: "https://udemy.com/certificate/UC-dbcce899-d1a1-4a9f-accc-3ebf2e08a261/",
  },
  {
    id: "html-js-bootstrap",
    name: "HTML, JavaScript, & Bootstrap - Certification Course",
    issuer: "Udemy",
    issued: "Oct 2021",
    url: "https://udemy.com/certificate/UC-3052b0cc-8905-4c99-b7a3-1484e956004c/",
  },
  {
    id: "typescript",
    name: "Understanding TypeScript",
    issuer: "Udemy",
    issued: "Aug 2020",
  },
  {
    id: "scrum-udemy",
    name: "SCRUM Certification",
    issuer: "Udemy",
    issued: "Apr 2020",
    url: "https://ude.my/UC-7086ffa0-2234-4d83-b090-b7a66fb31a96",
  },
  {
    id: "javascript",
    name: "Javascript Course",
    issuer: "Udemy",
    issued: "Dec 2019",
  },
];

export const HONORS: Honor[] = [
  {
    id: "role-model",
    title: "Role Model",
    issuer: "Gemini Solutions",
    issued: "Oct 2022",
    description: "Role Model for Team",
  },
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "sanjay",
    name: "Sanjay Singh Bisht",
    linkedin: "https://www.linkedin.com/in/sanjay-singh-bisht-414a6a3b",
    quote:
      "Pushpender is one of the brightest members from my team. He is always ready to learn and take challenging tasks. He is a very dedicated and reliable resource who always gives more than 100%. He possesses a combination of technical expertise, problem-solving skills, and a strong commitment to achieving results. Beyond technical skills, he is an excellent team player and collaborator. I highly recommend Pushpender and believe that he will excel in any technical role he undertakes.",
  },
  {
    id: "rachit",
    name: "Rachit Kanaujia",
    linkedin: "https://www.linkedin.com/in/rachit-kanaujia",
    quote:
      "I've had the pleasure of working with Pushpender for 2 years at Gemini Solutions. He is a highly accomplished frontend engineer. He is not only a subject matter expert but also a great team player, always willing to lend expertise and collaborate effectively. His leadership and mentorship have been instrumental in project success.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "crm",
    name: "Healthcare CRM",
    period: "Aug 2025 – Present",
    description:
      "Patient coordination and lead management platform for medical travel operations.",
  },
  {
    id: "tmtc-site",
    name: "The Medical Travel Company",
    period: "Aug 2025 – Present",
    description:
      "Multi-region marketing and content platform with headless CMS and geo routing.",
  },
  {
    id: "affiliate",
    name: "Affiliate Portal",
    period: "Jan 2026 – Present",
    description:
      "Partner workflows and scalable affiliate operations for cross-border medical travel.",
  },
  {
    id: "ckyc",
    name: "CKYC Microservice",
    period: "Feb 2025 – Jul 2025",
    description:
      "CKYC integration enabling interoperability across insurance applications.",
  },
  {
    id: "user-mgmt",
    name: "User Management Portal",
    period: "May 2024 – Jul 2025",
  },
  {
    id: "agent-portal",
    name: "TATA AIG Agent Portal",
    period: "Nov 2021 – Jul 2025",
    description:
      "Agent-facing portal covering payments, user management, and insurance workflows.",
  },
  {
    id: "expense-tracker",
    name: "React Expense Tracker",
    period: "Jul 2022",
    description: "Expense tracker built with React.",
    url: "https://github.com/pushpender98/React-Expense-Tracker",
  },
  {
    id: "kanban",
    name: "Kanban Board",
    period: "Oct 2020 – Dec 2020",
    description: "Drag-and-drop kanban board for arranging tickets.",
    url: "https://github.com/pushpender98/kanban-board",
  },
  {
    id: "hangman",
    name: "Hangman",
    period: "Jun 2020 – Jul 2020",
    description: "Hangman game built with TypeScript.",
    url: "https://github.com/pushpender98/Hangman-Ts",
  },
];

export const TECH_MARQUEE = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Redux Toolkit",
  "Material-UI",
  "Angular",
  "Node.js",
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
