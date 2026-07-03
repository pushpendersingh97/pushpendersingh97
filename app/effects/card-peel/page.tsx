import EffectsCardPeel from "@/components/effects/EffectsCardPeel";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Peel — Scroll Effect",
};

export default function CardPeelEffectPage() {
  return (
    <EffectsPageLayout
      title="Stacked card peel-off"
      description="Photo project cards stack in the center, then peel away one by one."
      tag="Cards"
    >
      <EffectsCardPeel />
    </EffectsPageLayout>
  );
}
