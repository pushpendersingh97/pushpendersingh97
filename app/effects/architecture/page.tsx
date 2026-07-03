import EffectsArchitectureDiagram from "@/components/effects/EffectsArchitectureDiagram";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture Diagram — Scroll Effect",
};

export default function ArchitectureEffectPage() {
  return (
    <EffectsPageLayout
      title="Architecture diagram"
      description="Stack layers illuminate and connect as you scroll through the build flow."
      tag="Diagram"
    >
      <EffectsArchitectureDiagram />
    </EffectsPageLayout>
  );
}
