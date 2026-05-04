import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Button } from "@/components/atoms/Button";
import { siteConfig } from "@/lib/site-config";
import { MiniTrialForm } from "@/components/organisms/forms/MiniTrialForm";

export function TrialCTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className="rounded-[28px] md:rounded-[40px] p-7 md:p-16 relative overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14"
          style={{ background: "linear-gradient(135deg, #FFD23F 0%, #FF9E7B 100%)" }}
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-white/25"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -left-10 w-[140px] h-[140px] rounded-full bg-white/20"
          />

          <div className="relative">
            <Eyebrow color="text-ink-900">come say hi! ✿</Eyebrow>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] mt-2 text-ink-900 leading-none">
              Free trial<br />this week.
            </h2>
            <p className="text-base md:text-[17px] mt-5 text-ink-900 max-w-[440px]">
              Bring your little one for a half-day. Walk through, meet the teachers, see the rooms.
              We&apos;ll WhatsApp confirm within an hour.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="whatsapp">
                <a href={siteConfig.whatsapp.href} target="_blank" rel="noreferrer">
                  💬 WhatsApp us
                </a>
              </Button>
              <Link href="/contact" className="text-sm font-bold text-ink-900 underline underline-offset-4 decoration-2">
                or fill the form →
              </Link>
            </div>
          </div>

          <MiniTrialForm />
        </div>
      </Container>
    </section>
  );
}
