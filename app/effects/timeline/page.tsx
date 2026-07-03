import EffectsCareerTimeline from "@/components/effects/EffectsCareerTimeline";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Timeline — Scroll Effect",
};

export default function TimelineEffectPage() {
  return (
    <EffectsPageLayout
      title="Career timeline"
      description="A vertical line fills while company nodes activate and detail copy updates."
      tag="Timeline"
    >
      <EffectsCareerTimeline />
    </EffectsPageLayout>
  );
}
