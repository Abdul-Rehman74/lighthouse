import type { Metadata } from "next";
import { AboutHero } from "@/components/organisms/about/AboutHero";
import { StoryBlock } from "@/components/organisms/about/StoryBlock";
import { StaffSection } from "@/components/organisms/about/StaffSection";
import { DailyRoutine } from "@/components/organisms/about/DailyRoutine";
import { ValuesStrip } from "@/components/organisms/about/ValuesStrip";
import { FAQSection } from "@/components/organisms/about/FAQSection";
import { CTABanner } from "@/components/organisms/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Seven years of caring for the Twin Cities' little ones — meet the Lighthouse team, daily routine, and our values.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StoryBlock />
      <StaffSection />
      <DailyRoutine />
      <ValuesStrip />
      <FAQSection />
      <CTABanner eyebrow="come visit ✿" title="Words are nice. Visiting is better." />
    </>
  );
}
