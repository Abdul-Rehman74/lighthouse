import type { Metadata } from "next";
import { PackagesHero } from "@/components/organisms/packages/PackagesHero";
import { PackagesCards } from "@/components/organisms/packages/PackagesCards";
import { ComparisonTable } from "@/components/organisms/packages/ComparisonTable";
import { IncludedSection } from "@/components/organisms/packages/IncludedSection";
import { PackagesFAQ } from "@/components/organisms/packages/PackagesFAQ";
import { PackagesCTA } from "@/components/organisms/packages/PackagesCTA";

export const metadata: Metadata = {
  title: "Packages",
  description: "Three flexible plans for working parents — Rs. 22,000 to Rs. 28,000 / month.",
};

export default function PackagesPage() {
  return (
    <>
      <PackagesHero />
      <PackagesCards />
      <ComparisonTable />
      <IncludedSection />
      <PackagesFAQ />
      <PackagesCTA />
    </>
  );
}
