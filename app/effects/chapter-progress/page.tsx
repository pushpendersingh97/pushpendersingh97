import EffectsChapterProgress from "@/components/effects/EffectsChapterProgress";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chapter Progress — Scroll Effect" };

export default function ChapterProgressPage() {
  return (
    <EffectsPageLayout
      title="Chapter reading progress"
      description="Each chapter has its own progress ring and bar that fill as you scroll through it."
      tag="Progress"
    >
      <EffectsChapterProgress />
    </EffectsPageLayout>
  );
}
