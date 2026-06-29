import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { ContactHero } from "@/components/organisms/contact/ContactHero";
import { BookTrialForm } from "@/components/organisms/forms/BookTrialForm";
import { ContactInfoCard } from "@/components/organisms/contact/ContactInfoCard";
import { BranchesSection } from "@/components/organisms/contact/BranchesSection";
import { MapSection } from "@/components/organisms/contact/MapSection";
import { SocialSection } from "@/components/organisms/contact/SocialSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "WhatsApp us, fill the form to book a free trial, or visit one of our two branches in Rawalpindi.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="pt-10 pb-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <BookTrialForm />
            <ContactInfoCard />
          </div>
        </Container>
      </section>
      <BranchesSection />
      <MapSection />
      <SocialSection />
    </>
  );
}
