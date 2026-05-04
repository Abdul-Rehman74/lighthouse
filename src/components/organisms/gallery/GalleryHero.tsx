import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";

export function GalleryHero() {
  return (
    <section className="relative pt-12 md:pt-16 pb-10 text-center overflow-hidden">
      <Container className="relative">
        <Star className="top-[20px] left-[8%]" color="#FF9E7B" />
        <Star className="top-[80px] right-[8%]" color="#8FD4AC" scale={1.2} />
        <Eyebrow color="text-coral-400">our gallery</Eyebrow>
        <h1 className="text-5xl sm:text-6xl md:text-[80px] mt-3.5 leading-[0.98] font-black animate-fade-up">
          Real days,<br />
          <span className="text-sky-500 italic">real</span> smiles.
        </h1>
        <p className="text-lg text-ink-700 mt-5 max-w-[560px] mx-auto">
          Photos and videos from the Lighthouse classrooms — updated weekly by our teachers.
        </p>
      </Container>
    </section>
  );
}
