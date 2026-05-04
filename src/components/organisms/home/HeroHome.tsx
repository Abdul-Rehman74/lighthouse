import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Star } from "@/components/atoms/Star";
import { Polaroid } from "@/components/molecules/Polaroid";

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
        <Star className="top-[40px] left-[10%]" color="#FF9E7B" />
        <Star className="top-[260px] right-[6%]" color="#8FD4AC" scale={1.2} />
        <Star className="top-[460px] left-[18%]" color="#FFD23F" scale={0.9} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="animate-fade-up">
            <div
              className="inline-block bg-coral-300 text-ink-900 px-3.5 py-1.5 rounded-full text-[13px] font-extrabold tracking-[0.04em]"
              style={{ transform: "rotate(-2deg)" }}
            >
              HELLO, LITTLE FRIEND ✿
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
                <Link href="/contact">✿ Book a free visit</Link>
              </Button>
              <Link
                href="/gallery"
                className="text-[15px] font-bold underline underline-offset-4 decoration-2 text-ink-900"
              >
                Or take a video tour →
              </Link>
            </div>
          </div>

          <div className="relative h-[540px] hidden lg:block">
            <Polaroid scene="play" caption="circle time" rotate={-6} style={{ top: 20, left: 40 }} width={260} />
            <Polaroid
              scene="art"
              caption="paint day!"
              rotate={5}
              style={{ top: 80, left: 300 }}
              width={240}
              tapeColor="rgba(143, 212, 172, 0.6)"
            />
            <Polaroid
              scene="outdoor"
              caption="garden visit"
              rotate={-3}
              style={{ top: 300, left: 60 }}
              width={220}
              tapeColor="rgba(255, 158, 123, 0.6)"
            />
            <Polaroid scene="food" caption="yum" rotate={8} style={{ top: 320, left: 310 }} width={210} />
            <svg
              className="absolute"
              style={{ top: 0, left: 230, width: 80, height: 60 }}
              viewBox="0 0 80 60"
              aria-hidden
            >
              <path d="M10 50 Q 30 10, 70 20" stroke="#1F2A37" strokeWidth="2.5" fill="none" />
              <path
                d="M62 12 L70 20 L60 25"
                stroke="#1F2A37"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="hand absolute text-[22px] text-ink-700"
              style={{ top: 480, right: 10, transform: "rotate(-4deg)" }}
            >
              real photos go here →
            </span>
          </div>

          <div className="lg:hidden relative h-[420px]">
            <Polaroid scene="play" caption="circle time" rotate={-6} style={{ top: 0, left: 0 }} width={180} />
            <Polaroid
              scene="art"
              caption="paint day!"
              rotate={5}
              style={{ top: 30, right: 0, left: "auto" }}
              width={170}
              tapeColor="rgba(143, 212, 172, 0.6)"
            />
            <Polaroid
              scene="outdoor"
              caption="garden visit"
              rotate={-3}
              style={{ top: 220, left: 20 }}
              width={160}
              tapeColor="rgba(255, 158, 123, 0.6)"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
