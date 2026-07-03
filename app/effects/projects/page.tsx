import EffectsProjectsScroll from "@/components/effects/EffectsProjectsScroll";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Projects — Scroll Effect",
};

export default function ProjectsEffectPage() {
  return (
    <EffectsPageLayout
      title="Featured projects"
      description="Case-study cards step through as you scroll, with mockup parallax and progress chrome."
      tag="Scrollytelling"
    >
      <EffectsProjectsScroll />
    </EffectsPageLayout>
  );
}
