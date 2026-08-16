import SiteNav from "@/components/SiteNav";
import PortfolioEducationContact from "@/components/portfolio/PortfolioEducationContact";
import PortfolioExperienceScroll from "@/components/portfolio/PortfolioExperienceScroll";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioProjectsScroll from "@/components/portfolio/PortfolioProjectsScroll";
import PortfolioScrollProgress from "@/components/portfolio/PortfolioScrollProgress";
import PortfolioSkillsFan from "@/components/portfolio/PortfolioSkillsFan";
import PortfolioStatsParallax from "@/components/portfolio/PortfolioStatsParallax";
import PortfolioTechMarquee from "@/components/portfolio/PortfolioTechMarquee";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pushpender Singh — Full Stack Engineer",
  description:
    "Full Stack Engineer and Founding Engineer — 7+ years shipping React, Next.js, TypeScript, and AI-first products.",
};

export default function Home() {
  return (
    <div className="portfolio-theme min-h-svh">
      <SiteNav className="sticky top-0 z-40" />
      <PortfolioScrollProgress />
      <PortfolioHero />
      <PortfolioSkillsFan />
      <PortfolioExperienceScroll />
      <PortfolioProjectsScroll />
      <PortfolioStatsParallax />
      <PortfolioTechMarquee />
      <PortfolioEducationContact />
    </div>
  );
}
