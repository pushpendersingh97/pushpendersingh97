import EffectsSvgDraw from "@/components/effects/EffectsSvgDraw";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG Path Draw — Scroll Effect",
};

export default function SvgDrawEffectPage() {
  return (
    <EffectsPageLayout
      title="SVG path draw"
      description="Connector path draws on scroll via stroke-dashoffset with milestone labels."
      tag="SVG"
    >
      <EffectsSvgDraw />
    </EffectsPageLayout>
  );
}
