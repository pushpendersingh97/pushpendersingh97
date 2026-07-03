import EffectsVelocityParticles from "@/components/effects/EffectsVelocityParticles";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Velocity Particles — Scroll Effect" };

export default function VelocityParticlesPage() {
  return (
    <EffectsPageLayout
      title="Velocity-reactive particles"
      description="Ambient dots drift faster when scroll velocity spikes."
      tag="Particles"
    >
      <EffectsVelocityParticles />
    </EffectsPageLayout>
  );
}
