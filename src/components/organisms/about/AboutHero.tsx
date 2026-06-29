import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";
import { Polaroid } from "@/components/molecules/Polaroid";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <Container className="relative">
        <Star className="top-[80px] left-[8%]" color="#FF9E7B" />
        <Star className="top-[40px] right-[8%]" color="#8FD4AC" scale={1.2} />
        <Star className="top-[260px] right-[16%]" color="#FFD23F" scale={0.9} />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
          <div className="animate-fade-up">
            <Eyebrow color="text-coral-400">about us</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-[72px] mt-3.5 leading-[0.98] font-black">
              Seven years.<br />
              <span className="text-sky-500">Hundreds of</span><br />
              little hearts.
            </h1>
            <p className="text-lg mt-6 text-ink-700 max-w-[480px] leading-relaxed">
              Lighthouse started as a small room with big intentions: a daycare that
              working mothers could trust the way they trust family. Today we&apos;re a fully
              staffed Montessori in Rawalpindi — and the same warm idea still runs the place.
            </p>
          </div>
          <div className="relative h-[420px] hidden md:block">
            <Polaroid scene="care" caption="we got you ✿" rotate={-4} style={{ top: 20, left: 40 }} width={260} />
            <Polaroid
              scene="learn"
              caption="curiosity"
              rotate={6}
              style={{ top: 120, left: 300 }}
              width={220}
              tapeColor="rgba(143,212,172,0.6)"
            />
            <Polaroid
              scene="play"
              caption="best part of the day"
              rotate={-2}
              style={{ top: 250, left: 120 }}
              width={240}
              tapeColor="rgba(255,158,123,0.6)"
            />
          </div>

          <div className="md:hidden relative h-[400px]">
            <Polaroid scene="care" caption="we got you ✿" rotate={-4} style={{ top: 0, left: 0 }} width={180} />
            <Polaroid
              scene="learn"
              caption="curiosity"
              rotate={6}
              style={{ top: 50, right: 0, left: "auto" }}
              width={170}
              tapeColor="rgba(143,212,172,0.6)"
            />
            <Polaroid
              scene="play"
              caption="best part"
              rotate={-2}
              style={{ top: 220, left: 30 }}
              width={170}
              tapeColor="rgba(255,158,123,0.6)"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
