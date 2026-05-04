import { HeroHome } from "@/components/organisms/home/HeroHome";
import { ChipBelt } from "@/components/organisms/home/ChipBelt";
import { PromisePanel } from "@/components/organisms/home/PromisePanel";
import { PillarsHome } from "@/components/organisms/home/PillarsHome";
import { ScrapbookGrid } from "@/components/organisms/home/ScrapbookGrid";
import { TrialCTA } from "@/components/organisms/home/TrialCTA";
import { PackagesPeek } from "@/components/organisms/home/PackagesPeek";

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ChipBelt />
      <PromisePanel />
      <PillarsHome />
      <ScrapbookGrid />
      <TrialCTA />
      <PackagesPeek />
    </>
  );
}
