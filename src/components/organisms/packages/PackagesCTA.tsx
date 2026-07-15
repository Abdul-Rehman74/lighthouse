import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { getSiteSettings } from "@/lib/site-settings";

export async function PackagesCTA() {
  const settings = await getSiteSettings();
  return (
    <section className="py-14">
      <Container>
        <div
          className="rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FFD23F 0%, #FF9E7B 100%)" }}
        >
          <Eyebrow color="text-ink-900">still deciding?</Eyebrow>
          <h2 className="text-3xl md:text-[44px] mt-2 text-ink-900">Try a half-day, on us.</h2>
          <p className="text-base md:text-[17px] text-ink-900 mt-3.5 max-w-[480px] mx-auto">
            Bring your little one for a free trial — no commitment, no contract.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center mt-7">
            <Button asChild variant="primary">
              <Link href="/contact">Book a free trial →</Link>
            </Button>
            <WhatsAppButton href={settings.phoneHref}>💬 WhatsApp us</WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
