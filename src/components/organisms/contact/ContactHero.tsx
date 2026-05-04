import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";

export function ContactHero() {
  return (
    <section className="relative pt-12 md:pt-16 pb-8 text-center overflow-hidden">
      <Container className="relative">
        <Star className="top-[20px] left-[8%]" color="#FF9E7B" />
        <Star className="top-[80px] right-[8%]" color="#8FD4AC" scale={1.2} />
        <Eyebrow color="text-coral-400">say hi ✿</Eyebrow>
        <h1 className="text-5xl sm:text-6xl md:text-[80px] mt-3.5 leading-[0.98] font-black animate-fade-up">
          Let&apos;s <span className="text-sky-500 italic">talk.</span>
        </h1>
        <p className="text-lg text-ink-700 mt-5 max-w-[540px] mx-auto">
          WhatsApp is fastest — usually within an hour. Or fill the form and we&apos;ll reach out.
        </p>
      </Container>
    </section>
  );
}
