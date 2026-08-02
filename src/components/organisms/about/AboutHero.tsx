import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";
import { Polaroid } from "@/components/molecules/Polaroid";
import { getGroupPhotoInfo } from "@/lib/site-settings";

export async function AboutHero() {
  const group = await getGroupPhotoInfo();

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <Container className="relative">
        <Star className="top-[80px] left-[8%]" color="#FF9E7B" />
        <Star className="top-[40px] right-[8%]" color="#8FD4AC" scale={1.2} />
        <Star className="top-[260px] right-[16%]" color="#FFD23F" scale={0.9} />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
          <div className="animate-fade-up">
            <Eyebrow color="text-coral-400">about us</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] mt-3.5 leading-[1.02] font-black">
              Meet the faces<br />
              <span className="text-sky-500">behind every</span><br />
              smile.
            </h1>
            <p className="text-lg mt-6 text-ink-700 max-w-[480px] leading-relaxed">
              Behind every smile, every achievement, and every milestone is a team of passionate
              educators dedicated to nurturing, inspiring, and supporting every child&apos;s
              unique journey.
            </p>
          </div>

          {group.src ? (
            /* Real team photo, taped up like the scrapbook polaroids so it still
               reads as part of the illustrated design rather than a stock block. */
            <div className="relative">
              <div
                className="bg-white p-3 pb-4 rounded-[6px] shadow-soft-lg"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                <div
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 -top-3 w-24 h-7 rounded-[3px]"
                  style={{ background: "rgba(255,210,63,0.6)", transform: "rotate(-2deg)" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.src}
                  alt={group.caption || "The Lighthouse team"}
                  className="w-full h-auto rounded-[3px] block"
                />
                {group.caption && (
                  <div className="hand text-center text-[17px] text-ink-700 mt-3">
                    {group.caption}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
