import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  FRONTEND_SKILLS,
  HONORS,
  PROFILE,
  PROJECTS,
  RECOMMENDATIONS,
  STACK_LAYERS,
  STATS,
  TECH_MARQUEE,
} from "@/lib/portfolioData";

function matchesQuery(haystack: string, query: string): boolean {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 1);

  if (terms.length === 0) {
    return true;
  }

  const hay = haystack.toLowerCase();
  return terms.some((term) => hay.includes(term));
}

export function getPublicProfile() {
  return {
    name: PROFILE.name,
    title: PROFILE.title,
    tagline: PROFILE.tagline,
    summary: PROFILE.summary,
    location: PROFILE.location,
    stats: STATS.map((stat) => ({
      label: stat.label,
      value: `${stat.value}${stat.suffix}`,
    })),
  };
}

export function getPublicContact() {
  return {
    email: PROFILE.email,
    github: PROFILE.github,
    linkedin: PROFILE.linkedin,
    location: PROFILE.location,
  };
}

export function searchExperience(query: string) {
  const matches = EXPERIENCE.filter((role) =>
    matchesQuery(
      [role.company, role.role, role.location, role.period, ...role.highlights, ...role.tech].join(
        " ",
      ),
      query,
    ),
  );

  return {
    matches: matches.length > 0 ? matches : EXPERIENCE,
    usedFallback: matches.length === 0,
  };
}

export function searchProjects(query: string) {
  const matches = PROJECTS.filter((project) =>
    matchesQuery(
      [
        project.name,
        project.company,
        project.period,
        project.description,
        ...(project.highlights ?? []),
        ...(project.tech ?? []),
      ]
        .filter(Boolean)
        .join(" "),
      query,
    ),
  );

  return {
    matches: matches.length > 0 ? matches : PROJECTS,
    usedFallback: matches.length === 0,
  };
}

export function searchSkills(query: string) {
  const skills = FRONTEND_SKILLS.filter((skill) =>
    matchesQuery(
      `${skill.label} ${skill.category} ${skill.group} ${skill.version ?? ""}`,
      query,
    ),
  );
  const stack = TECH_MARQUEE.filter((item) => matchesQuery(item, query));
  const layers = STACK_LAYERS.filter((layer) =>
    matchesQuery(`${layer.layer} ${layer.tools}`, query),
  );

  return {
    skills: skills.length > 0 ? skills : FRONTEND_SKILLS,
    stack: stack.length > 0 ? stack : TECH_MARQUEE,
    layers: layers.length > 0 ? layers : STACK_LAYERS,
    usedFallback: skills.length === 0 && stack.length === 0 && layers.length === 0,
  };
}

export function getBackground() {
  return {
    education: EDUCATION,
    certifications: CERTIFICATIONS,
    honors: HONORS,
    recommendations: RECOMMENDATIONS,
  };
}
