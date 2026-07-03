import EffectsFlipStory from "@/components/effects/EffectsFlipStory";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flip Story — Scroll Effect",
};

export default function FlipStoryEffectPage() {
  return (
    <EffectsPageLayout
      title="Flip card story"
      description="Case-study beats flip from photo fronts to outcome copy on scroll."
      tag="Flip"
    >
      <EffectsFlipStory />
    </EffectsPageLayout>
  );
}
