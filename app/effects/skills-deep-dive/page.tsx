import EffectsSkillsDeepDive from "@/components/effects/EffectsSkillsDeepDive";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills Deep Dive — Scroll Effect",
};

export default function SkillsDeepDiveEffectPage() {
  return (
    <EffectsPageLayout
      title="Skills deep dive"
      description="Pinned sidebar nav with a detail panel that swaps per scroll segment."
      tag="Pinned nav"
    >
      <EffectsSkillsDeepDive />
    </EffectsPageLayout>
  );
}
