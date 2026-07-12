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
    "Animated portfolio showcasing 7+ years of full stack experience with React, Next.js, TypeScript, and modern web architecture.",
};

export default function Home() {
  return (
    <div className="portfolio-theme min-h-svh bg-[#0a0e14] text-zinc-100">
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
