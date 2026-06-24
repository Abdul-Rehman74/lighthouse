import { HomeIntro } from "@/components/effects/HomeIntro";
import { Reveal } from "@/components/effects/Reveal";
import { HeroHome } from "@/components/organisms/home/HeroHome";
import { ChipBelt } from "@/components/organisms/home/ChipBelt";
import { PillarsHome } from "@/components/organisms/home/PillarsHome";
import { PromisePanel } from "@/components/organisms/home/PromisePanel";
import { ScrapbookGrid } from "@/components/organisms/home/ScrapbookGrid";
import { LearningLoungePeek } from "@/components/organisms/home/LearningLoungePeek";
import { PackagesPeek } from "@/components/organisms/home/PackagesPeek";
import { TrialCTA } from "@/components/organisms/home/TrialCTA";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HeroHome />
      <ChipBelt />
      <Reveal>
        <PillarsHome />
      </Reveal>
      <Reveal>
        <PromisePanel />
      </Reveal>
      <Reveal>
        <ScrapbookGrid />
      </Reveal>
      <Reveal>
        <LearningLoungePeek />
      </Reveal>
      <Reveal>
        <PackagesPeek />
      </Reveal>
      <Reveal>
        <TrialCTA />
      </Reveal>
    </>
  );
}
