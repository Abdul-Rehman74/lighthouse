import Image from "next/image";
import { Container } from "@/components/atoms/Container";

export function LearningLoungeHero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
          <div className="animate-fade-up">
            <div className="hand text-[22px] leading-none text-sky-400">✯ learning lounge</div>
            <h1 className="text-5xl md:text-6xl lg:text-[68px] mt-3.5 leading-[0.98] font-black">
              Because every
              <br />
              child <span className="text-coral-400">learns</span>
              <br />
              differently.
            </h1>
            <p className="text-lg mt-6 text-ink-700 max-w-[480px] leading-relaxed">
              Learning Lounge runs alongside our Montessori &amp; Daycare programs — specialized
              support for children with learning, speech, developmental or behavioral challenges,
              so every child feels included from the very beginning.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#contact" className="btn btn-sun !text-[15px]">
                Talk to our principal →
              </a>
              <a href="#offer" className="btn btn-ghost !text-[15px]">
                What we offer
              </a>
            </div>
          </div>

          <div className="relative h-[420px] hidden md:block">
            <div className="absolute inset-0 rounded-[32px] overflow-hidden border-[1.5px] border-cream-200">
              <Image
                src="/assets/learning-lounge-hero.png"
                alt="A child and teacher together at Learning Lounge"
                fill
                sizes="(max-width: 1024px) 50vw, 600px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-white rounded-[20px] shadow-soft-lg p-5 flex items-center gap-4">
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#FFE27A" }}
              >
                ✿
              </div>
              <div>
                <div className="font-display font-bold text-[15px]">Every child included</div>
                <div className="text-[13px] text-ink-500 mt-0.5">from the very first day</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
