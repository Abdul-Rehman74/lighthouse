import type { Metadata } from "next";
import { AboutHero } from "@/components/organisms/about/AboutHero";
import { StoryBlock } from "@/components/organisms/about/StoryBlock";
import { StaffSection } from "@/components/organisms/about/StaffSection";
import { DailyRoutine } from "@/components/organisms/about/DailyRoutine";
// Kept for now — the client may want the "Four things, every day." strip back.
// import { ValuesStrip } from "@/components/organisms/about/ValuesStrip";
import { FAQSection } from "@/components/organisms/about/FAQSection";
import { CTABanner } from "@/components/organisms/CTABanner";
import { getPageContent, getFaqs } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Lighthouse team — passionate educators caring for Rawalpindi's little ones since 2019.",
};

export default async function AboutPage() {
  const [faqs, content] = await Promise.all([getFaqs("about"), getPageContent()]);
  return (
    <>
      <AboutHero />
      <StoryBlock />
      <StaffSection />
      <DailyRoutine />
      {/* Removed at the client's request — uncomment to bring it back. */}
      {/* <ValuesStrip /> */}
      <FAQSection faqs={faqs} content={content} />
      <CTABanner eyebrow="come visit ✿" title="Let Lighthouse be your child's guiding light!" />
    </>
  );
}
