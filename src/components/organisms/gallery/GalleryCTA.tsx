import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

import { getPageContent } from "@/lib/site-settings";

export async function GalleryCTA() {
  const content = await getPageContent();
  return (
    <section className="py-14">
      <Container>
        <div className="bg-ink-900 text-cream-50 rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-sun-300/20"
          />
          <div className="relative flex-1 min-w-0">
            <Eyebrow color="text-sun-300">photos are nice...</Eyebrow>
            <h2 className="text-3xl md:text-[40px] mt-2">{content.galleryCtaHeading}</h2>
            <p className="text-base md:text-[17px] text-cream-50/80 mt-3.5 max-w-[620px]">
              {content.galleryCtaDescription}
            </p>
          </div>
          <Button asChild variant="sun" className="self-start md:self-auto shrink-0 relative">
            <Link href="/contact">Book a free trial →</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
