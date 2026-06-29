import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";

export function LearningLoungePeek() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className="rounded-[28px] md:rounded-[40px] p-7 md:p-14 lg:px-16 lg:py-20 relative overflow-hidden"
          style={{ background: "#C9E7FF" }}
        >
          <div aria-hidden className="absolute -top-20 -right-16 w-[280px] h-[280px] rounded-full bg-white/30" />
          <div aria-hidden className="absolute -bottom-20 -left-16 w-[220px] h-[220px] rounded-full bg-white/25" />
          <Star className="top-[40px] right-[10%]" color="#FF9E7B" />
          <Star className="bottom-[60px] right-[6%]" color="#FFD23F" scale={0.9} />
          <Star className="top-[120px] left-[6%]" color="#F47A4F" scale={0.85} />

          <div className="relative text-center max-w-[820px] mx-auto">
            <Eyebrow color="text-coral-400">✯ new at lighthouse</Eyebrow>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] mt-3 leading-[0.98] font-black">
              Every child belongs at the
              <br />
              <span className="text-coral-400">Learning Lounge.</span>
            </h2>
            <p className="text-lg md:text-[19px] mt-6 text-ink-700 leading-relaxed max-w-[580px] mx-auto">
              Because every child learns differently — a dedicated program alongside our Montessori
              &amp; daycare, with gentle, inclusive support woven right into the day, so every child
              belongs from the very first morning.
            </p>
          </div>

          <div className="relative text-center mt-14">
            <Button asChild variant="primary">
              <Link href="/learning-lounge">Explore Learning Lounge →</Link>
            </Button>
            <div className="hand text-[20px] leading-none text-ink-700 mt-5">
              support without separation · inclusion without labels
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
