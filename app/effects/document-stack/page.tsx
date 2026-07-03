import EffectsDocumentStack from "@/components/effects/EffectsDocumentStack";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Document Stack — Scroll Effect" };

export default function DocumentStackPage() {
  return (
    <EffectsPageLayout
      title="Document stack shuffle"
      description="Paper sheets fan out, then collapse into one submitted file."
      tag="TMTC"
    >
      <EffectsDocumentStack />
    </EffectsPageLayout>
  );
}
