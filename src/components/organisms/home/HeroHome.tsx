import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { HeroHarbour } from "./HeroHarbour";

import { getPageContent } from "@/lib/site-settings";

export async function HeroHome() {
  const content = await getPageContent();
  const highlight = content.homeHeroHighlight.trim();
  const highlightIndex = highlight
    ? content.homeHeroHeading.toLowerCase().indexOf(highlight.toLowerCase())
    : -1;
  return (
    <section className="relative isolate overflow-hidden pt-12 md:pt-16 pb-[390px] sm:pb-[460px] lg:pb-44 lg:min-h-[800px]">
      <HeroHarbour />

      <Container className="relative z-10 pointer-events-none">

        <div className="max-w-[580px] lg:max-w-[52%]">
          <div className="animate-fade-up pointer-events-auto">
            {content.homeHeroTagVisible && <div
              className="inline-block bg-coral-300 text-ink-900 px-3.5 py-1.5 rounded-full text-[13px] font-extrabold tracking-[0.04em]"
              style={{ transform: "rotate(-2deg)" }}
            >
              {content.homeHeroIntro}
            </div>}
            <h1 className={`text-5xl sm:text-6xl lg:text-[64px] leading-[1.08] font-black ${content.homeHeroTagVisible ? "mt-5" : ""}`}>
              {highlightIndex < 0 ? content.homeHeroHeading : <>
                {content.homeHeroHeading.slice(0, highlightIndex)}
                <span className="relative inline-block text-coral-400">
                  {content.homeHeroHeading.slice(highlightIndex, highlightIndex + highlight.length)}
                  <svg className="absolute -bottom-2 left-0 w-full" height="18" viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden>
                    <path d="M5 13 Q 80 -2, 160 9 T 315 9" stroke="#FFD23F" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                {content.homeHeroHeading.slice(highlightIndex + highlight.length)}
              </>}
            </h1>
            <p className="text-xl sm:text-2xl mt-7 font-bold text-ink-900 max-w-[480px] leading-snug">
              {content.homeHeroSubheading}
            </p>
            <p className="text-lg mt-4 text-ink-700 max-w-[460px] leading-relaxed">
              {content.homeHeroDescription}
            </p>
            <div className="flex flex-wrap gap-4 mt-9 items-center">
              <Button asChild variant="sun">
                <Link href="/contact">✯ Book a free visit</Link>
              </Button>
              <Link
                href="/gallery"
                className="text-[15px] font-bold underline underline-offset-4 decoration-2 text-ink-900"
              >
                Or take a video tour →
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
