import PortfolioEducationContact from "@/components/portfolio/PortfolioEducationContact";
import PortfolioExperienceScroll from "@/components/portfolio/PortfolioExperienceScroll";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
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

export default function PortfolioPage() {
  return (
    <div className="portfolio-theme min-h-svh bg-[#0a0e14] text-zinc-100">
      <nav className="fixed top-4 right-4 z-50">
        <a
          href="/"
          className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400 backdrop-blur-sm transition-colors hover:border-sky-500/50 hover:text-sky-300"
        >
          ← TMTC demo
        </a>
      </nav>
      <PortfolioScrollProgress />
      <PortfolioHero />
      <PortfolioSkillsFan />
      <PortfolioExperienceScroll />
      <PortfolioStatsParallax />
      <PortfolioTechMarquee />
      <PortfolioEducationContact />
    </div>
  );
}
