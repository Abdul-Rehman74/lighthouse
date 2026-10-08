import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Star } from "@/components/atoms/Star";

import { getPageContent } from "@/lib/site-settings";

export async function HeroHome() {
  const content = await getPageContent();
  const highlight = content.homeHeroHighlight.trim();
  const highlightIndex = highlight
    ? content.homeHeroHeading.toLowerCase().indexOf(highlight.toLowerCase())
    : -1;
  return (
    <section className="relative overflow-hidden pt-12 md:pt-16 pb-20 md:pb-24">
      <div
        aria-hidden
        className="absolute top-20 -right-32 w-[360px] h-[360px] rounded-full bg-sun-200/50 blur-[2px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full bg-sky-100/70"
      />

      <Container className="relative">
        <Star className="top-[40px] left-[8%]" color="#FF9E7B" />
        <Star className="top-[470px] left-[16%]" color="#FFD23F" scale={0.9} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="animate-fade-up">
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

          {/* Animated lighthouse with floating study props */}
          <div className="relative flex items-center justify-center min-h-[340px] lg:min-h-[520px]">
            {/* ruler */}
            <svg className="study" style={{ left: "16%", top: "6%", width: "54px", "--d": "5.4s", "--dl": "0s", "--r": "-8deg", "--rs": "6deg" } as React.CSSProperties} viewBox="0 0 56 26" fill="none" aria-hidden>
              <rect x="2" y="4" width="52" height="18" rx="3" fill="#FFD7B0" stroke="#1F2A37" strokeWidth="2.2" />
              <path d="M9 4v6M17 4v10M25 4v6M33 4v10M41 4v6M49 4v10" stroke="#1F2A37" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {/* apple */}
            <svg className="study" style={{ right: "14%", top: "0%", width: "44px", "--d": "6.4s", "--dl": ".7s", "--r": "5deg", "--rs": "-8deg" } as React.CSSProperties} viewBox="0 0 44 46" fill="none" aria-hidden>
              <path d="M22 17c-8-6-19-1-19 10 0 10 8 18 14 18 3 0 4-1.4 5-1.4s2 1.4 5 1.4c6 0 14-8 14-18 0-11-11-16-19-10Z" fill="#F0514F" stroke="#1F2A37" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M22 17c0-4 1-8 3-10" stroke="#8B5E3C" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M24 9c4-4 9-2 9 2-4 2-8-1-9-2Z" fill="#8FD4AC" stroke="#1F2A37" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            {/* stacking blocks */}
            <svg className="study" style={{ left: "27%", top: "24%", width: "42px", "--d": "4.9s", "--dl": "1.3s", "--r": "-3deg", "--rs": "8deg" } as React.CSSProperties} viewBox="0 0 44 40" fill="none" aria-hidden>
              <rect x="4" y="20" width="36" height="16" rx="4" fill="#5FB3F0" stroke="#1F2A37" strokeWidth="2" />
              <rect x="9" y="10" width="26" height="14" rx="4" fill="#FFD23F" stroke="#1F2A37" strokeWidth="2" />
              <rect x="14" y="2" width="16" height="12" rx="4" fill="#F47A4F" stroke="#1F2A37" strokeWidth="2" />
            </svg>
            {/* alphabet block */}
            <svg className="study" style={{ left: "24%", top: "49%", width: "42px", "--d": "5.7s", "--dl": "1.15s", "--r": "7deg", "--rs": "-8deg" } as React.CSSProperties} viewBox="0 0 44 44" aria-hidden>
              <rect x="5" y="5" width="34" height="34" rx="6" fill="#8FD4AC" stroke="#1F2A37" strokeWidth="2.4" />
              <text x="22" y="29" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="20" fill="#1F2A37">A</text>
            </svg>
            {/* paint palette */}
            <svg className="study" style={{ right: "23%", top: "26%", width: "46px", "--d": "5.9s", "--dl": ".4s", "--r": "6deg", "--rs": "-7deg" } as React.CSSProperties} viewBox="0 0 48 40" fill="none" aria-hidden>
              <path d="M24 4C11 4 3 12 3 21c0 7 5 10 10 10 2 0 3-1 3-3 0-1-1-2-1-4 0-2 2-3 4-3h8c6 0 11-4 11-10C38 8 32 4 24 4Z" fill="#FFF6F4" stroke="#1F2A37" strokeWidth="2.2" strokeLinejoin="round" />
              <circle cx="12" cy="14" r="2.6" fill="#F47A4F" />
              <circle cx="20" cy="9" r="2.6" fill="#FFD23F" />
              <circle cx="29" cy="10" r="2.6" fill="#8FD4AC" />
              <circle cx="33" cy="17" r="2.6" fill="#5FB3F0" />
            </svg>
            {/* magnifying glass */}
            <svg className="study" style={{ right: "3%", top: "20%", width: "38px", "--d": "5.2s", "--dl": ".9s", "--r": "-10deg", "--rs": "10deg" } as React.CSSProperties} viewBox="0 0 40 40" fill="none" aria-hidden>
              <circle cx="17" cy="17" r="12" fill="#CDE8FB" stroke="#1F2A37" strokeWidth="2.4" />
              <line x1="26" y1="26" x2="36" y2="36" stroke="#1F2A37" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* book */}
            <svg className="study" style={{ left: "6%", top: "30%", width: "48px", "--d": "6.2s", "--dl": ".2s", "--r": "-8deg", "--rs": "7deg" } as React.CSSProperties} viewBox="0 0 48 40" fill="none" aria-hidden>
              <path d="M24 9C18 4 9 4 4 6v28c5-2 14-2 20 3 6-5 15-5 20-3V6c-5-2-14-2-20 3Z" fill="#FFF6F4" stroke="#1F2A37" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M24 9v25" stroke="#1F2A37" strokeWidth="2.2" />
              <path d="M9 13c3-1 7-1 10 1M9 19c3-1 7-1 10 1" stroke="#F47A4F" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M29 14c3-2 7-2 10-1M29 20c3-2 7-2 10-1" stroke="#5FB3F0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {/* pencil */}
            <svg className="study" style={{ right: "5%", top: "44%", width: "46px", "--d": "5.5s", "--dl": ".6s", "--r": "32deg", "--rs": "-9deg" } as React.CSSProperties} viewBox="0 0 48 48" aria-hidden>
              <rect x="20" y="5" width="8" height="28" rx="2" fill="#FFD23F" />
              <rect x="20" y="5" width="8" height="6" fill="#F47A4F" />
              <path d="M20 33h8l-4 8Z" fill="#F2C28B" />
              <path d="M22 38h4l-2 3Z" fill="#1F2A37" />
            </svg>
            {/* abacus */}
            <svg className="study" style={{ left: "13%", bottom: "12%", width: "46px", "--d": "5.9s", "--dl": "1s", "--r": "8deg", "--rs": "-7deg" } as React.CSSProperties} viewBox="0 0 48 44" fill="none" aria-hidden>
              <rect x="3" y="4" width="42" height="36" rx="5" fill="#FFF6F4" stroke="#1F2A37" strokeWidth="2.4" />
              <path d="M3 16h42M3 28h42" stroke="#1F2A37" strokeWidth="1.8" />
              <circle cx="14" cy="10" r="3.4" fill="#F47A4F" />
              <circle cx="24" cy="10" r="3.4" fill="#FFD23F" />
              <circle cx="18" cy="22" r="3.4" fill="#8FD4AC" />
              <circle cx="30" cy="22" r="3.4" fill="#5FB3F0" />
              <circle cx="15" cy="34" r="3.4" fill="#FFD23F" />
              <circle cx="27" cy="34" r="3.4" fill="#F47A4F" />
            </svg>
            {/* paper plane */}
            <svg className="study" style={{ left: "2%", bottom: "34%", width: "40px", "--d": "6.1s", "--dl": "1.6s", "--r": "-14deg", "--rs": "12deg" } as React.CSSProperties} viewBox="0 0 44 36" fill="none" aria-hidden>
              <path d="M2 16 42 2 30 34l-9-11Z" fill="#CDE8FB" stroke="#1F2A37" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M42 2 21 23" stroke="#1F2A37" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
            {/* crayon */}
            <svg className="study" style={{ right: "11%", bottom: "18%", width: "40px", "--d": "6.6s", "--dl": ".35s", "--r": "-18deg", "--rs": "11deg" } as React.CSSProperties} viewBox="0 0 44 44" fill="none" aria-hidden>
              <g transform="rotate(35 22 22)">
                <rect x="16" y="10" width="12" height="24" rx="3" fill="#F47A4F" />
                <rect x="16" y="14" width="12" height="3.5" fill="#fff" opacity=".55" />
                <path d="M16 10c0-5 12-5 12 0Z" fill="#F2C28B" />
                <circle cx="22" cy="8" r="2" fill="#1F2A37" />
              </g>
            </svg>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/lighthouse-mark.svg"
              alt="Lighthouse Daycare & Montessori"
              className="relative block"
              style={{ height: "min(54vh,500px)", width: "auto", filter: "drop-shadow(0 26px 38px rgba(31,42,55,.18))" }}
            />
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: "7%", width: "58%", maxWidth: "340px", height: "24px", background: "radial-gradient(ellipse at center, rgba(31,42,55,.16), rgba(31,42,55,0) 70%)" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
