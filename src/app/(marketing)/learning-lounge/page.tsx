import type { Metadata } from "next";
import { LearningLoungeHero } from "@/components/organisms/learning-lounge/LearningLoungeHero";
import { SupportSection } from "@/components/organisms/learning-lounge/SupportSection";
import { OfferSection } from "@/components/organisms/learning-lounge/OfferSection";
import { BeliefBanner } from "@/components/organisms/learning-lounge/BeliefBanner";
import { LearningLoungeContact } from "@/components/organisms/learning-lounge/LearningLoungeContact";

export const metadata: Metadata = {
  title: "Learning Lounge",
  description:
    "Specialized, inclusive support for children with learning, speech, developmental or behavioral challenges — woven right into Lighthouse Daycare & Montessori.",
};

export default function LearningLoungePage() {
  return (
    <>
      <LearningLoungeHero />
      <SupportSection />
      <OfferSection />
      <BeliefBanner />
      <LearningLoungeContact />
    </>
  );
}
