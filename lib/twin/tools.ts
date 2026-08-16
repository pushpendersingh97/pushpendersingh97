import { tool } from "ai";
import { z } from "zod";
import {
  getBackground,
  getPublicContact,
  getPublicProfile,
  searchExperience,
  searchProjects,
  searchSkills,
} from "@/lib/twin/knowledge";

export const twinTools = {
  get_profile: tool({
    description:
      "Get Pushpender's public profile: name, title, summary, location, and headline stats.",
    inputSchema: z.object({}),
    execute: async () => getPublicProfile(),
  }),
  search_experience: tool({
    description:
      "Look up work history. Use a company, role, tech, or keyword. Returns matching roles with highlights.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("Company, role, year, or tech to search for, e.g. Tata AIG or Next.js"),
    }),
    execute: async ({ query }) => searchExperience(query),
  }),
  search_projects: tool({
    description:
      "Look up shipped products and side projects. Use a product name, company, or tech keyword.",
    inputSchema: z.object({
      query: z.string().describe("Project name, company, or tech, e.g. Healthcare CRM or CKYC"),
    }),
    execute: async ({ query }) => searchProjects(query),
  }),
  search_skills: tool({
    description:
      "Look up skills and the production stack, grouped as Frontend, Backend, and AI tools.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("Skill, group, or layer, e.g. React, Backend, or CMS"),
    }),
    execute: async ({ query }) => searchSkills(query),
  }),
  get_background: tool({
    description: "Get education, certifications, honors, and public recommendations.",
    inputSchema: z.object({}),
    execute: async () => getBackground(),
  }),
  get_public_contact: tool({
    description:
      "Get public contact links only: email, GitHub, LinkedIn, and city. Never returns a phone number.",
    inputSchema: z.object({}),
    execute: async () => getPublicContact(),
  }),
};
