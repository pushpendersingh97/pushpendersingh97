import EffectsPerspectiveTilt from "@/components/effects/EffectsPerspectiveTilt";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Perspective Tilt — Scroll Effect" };

export default function PerspectiveTiltPage() {
  return (
    <EffectsPageLayout
      title="3D perspective tilt"
      description="Sticky photo card with subtle rotateX/Y depth tied to scroll."
      tag="3D"
    >
      <EffectsPerspectiveTilt />
    </EffectsPageLayout>
  );
}
