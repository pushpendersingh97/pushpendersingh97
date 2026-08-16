import PortfolioEducationContact from "@/components/portfolio/PortfolioEducationContact";
import PortfolioExperienceItinerary from "@/components/portfolio/PortfolioExperienceItinerary";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioProjectsFolder from "@/components/portfolio/PortfolioProjectsFolder";
import PortfolioScrollProgress from "@/components/portfolio/PortfolioScrollProgress";
import PortfolioSkillsSwatch from "@/components/portfolio/PortfolioSkillsSwatch";
import PortfolioStatsStamps from "@/components/portfolio/PortfolioStatsStamps";
import PortfolioTechMarquee from "@/components/portfolio/PortfolioTechMarquee";
import { TwinChatProvider, TwinChatWidget } from "@/components/twin/TwinChatWidget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pushpender Singh — Full Stack Engineer",
  description:
    "Full Stack Engineer and Founding Engineer — 7+ years shipping React, Next.js, TypeScript, and AI-first products.",
};

export default function Home() {
  return (
    <TwinChatProvider>
      <div className="portfolio-theme min-h-svh">
        <PortfolioScrollProgress />
        <PortfolioHero />
        <PortfolioSkillsSwatch />
        <PortfolioExperienceItinerary />
        <PortfolioProjectsFolder />
        <PortfolioStatsStamps />
        <PortfolioTechMarquee />
        <PortfolioEducationContact />
        <TwinChatWidget />
      </div>
    </TwinChatProvider>
  );
}
