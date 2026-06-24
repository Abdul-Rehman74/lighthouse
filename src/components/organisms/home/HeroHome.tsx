import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Star } from "@/components/atoms/Star";

export function HeroHome() {
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
            <div
              className="inline-block bg-coral-300 text-ink-900 px-3.5 py-1.5 rounded-full text-[13px] font-extrabold tracking-[0.04em]"
              style={{ transform: "rotate(-2deg)" }}
            >
              HELLO, LITTLE FRIEND ✯
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] mt-5 leading-[0.95] font-black">
              <span className="block">The brightest</span>
              <span className="block text-coral-400">part of</span>
              <span className="block relative">
                every day.
                <svg
                  className="absolute -bottom-2 left-0"
                  width="320"
                  height="18"
                  viewBox="0 0 320 18"
                  aria-hidden
                >
                  <path
                    d="M5 13 Q 80 -2, 160 9 T 315 9"
                    stroke="#FFD23F"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg mt-7 text-ink-700 max-w-[460px] leading-relaxed">
              For seven years we&apos;ve been the Twin Cities&apos; favorite daycare —
              built around joyful play, real safety, and 22 teachers who genuinely love what they do.
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

          {/* Animated lighthouse with floating balloons + study objects */}
          <div className="relative flex items-center justify-center min-h-[340px] lg:min-h-[520px]">
            <div className="balloon" style={{ left: "18%", top: "5%", "--bc": "#F47A4F", "--bw": "46px", "--r": "-5deg", "--d": "5.4s", "--dl": "0s" } as React.CSSProperties} />
            <div className="balloon" style={{ right: "16%", top: "1%", "--bc": "#FFD23F", "--bw": "54px", "--r": "5deg", "--d": "6.4s", "--dl": ".7s" } as React.CSSProperties} />
            <div className="balloon" style={{ left: "28%", top: "23%", "--bc": "#8FD4AC", "--bw": "36px", "--r": "-3deg", "--d": "4.9s", "--dl": "1.3s" } as React.CSSProperties} />
            <div className="balloon" style={{ right: "25%", top: "27%", "--bc": "#5FB3F0", "--bw": "38px", "--r": "4deg", "--d": "5.9s", "--dl": ".4s" } as React.CSSProperties} />

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
            {/* block A */}
            <svg className="study" style={{ left: "13%", bottom: "12%", width: "44px", "--d": "5.9s", "--dl": "1s", "--r": "8deg", "--rs": "-7deg" } as React.CSSProperties} viewBox="0 0 44 44" aria-hidden>
              <rect x="5" y="5" width="34" height="34" rx="6" fill="#8FD4AC" stroke="#1F2A37" strokeWidth="2.4" />
              <text x="22" y="29" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="20" fill="#1F2A37">A</text>
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
