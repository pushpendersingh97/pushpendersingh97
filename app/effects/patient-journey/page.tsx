import EffectsPatientJourney from "@/components/effects/EffectsPatientJourney";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Patient Journey — Scroll Effect" };

export default function PatientJourneyPage() {
  return (
    <EffectsPageLayout
      title="Patient journey map"
      description="Care path nodes activate along a route: intake → records → travel → care plan."
      tag="TMTC"
    >
      <EffectsPatientJourney />
    </EffectsPageLayout>
  );
}
