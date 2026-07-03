import EffectsUiScrub from "@/components/effects/EffectsUiScrub";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Scrub — Scroll Effect",
};

export default function UiScrubEffectPage() {
  return (
    <EffectsPageLayout
      title="UI frame scrub"
      description="Scroll through eight product frames — like scrubbing a walkthrough video."
      tag="Scrub"
    >
      <EffectsUiScrub />
    </EffectsPageLayout>
  );
}
