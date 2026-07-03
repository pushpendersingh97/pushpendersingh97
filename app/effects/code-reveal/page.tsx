import EffectsCodeReveal from "@/components/effects/EffectsCodeReveal";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Reveal — Scroll Effect",
};

export default function CodeRevealEffectPage() {
  return (
    <EffectsPageLayout
      title="Code reveal"
      description="Source lines appear as you scroll while a dashboard photo fades into view."
      tag="Code"
    >
      <EffectsCodeReveal />
    </EffectsPageLayout>
  );
}
