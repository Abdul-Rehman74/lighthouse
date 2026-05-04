import { BigStat } from "@/components/atoms/BigStat";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Star } from "@/components/atoms/Star";

export function PromisePanel() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="bg-ink-900 text-cream-50 rounded-[28px] md:rounded-[40px] px-7 py-12 md:px-16 md:py-[72px] relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-sun-300/85"
          />
          <div
            aria-hidden
            className="absolute -bottom-8 right-[200px] w-[100px] h-[100px] rounded-full bg-coral-300/60"
          />
          <div
            aria-hidden
            className="absolute top-10 -left-10 w-[120px] h-[120px] rounded-full bg-mint-300/40"
          />
          <Star className="top-[300px] left-[80px]" color="#FFD23F" scale={1.4} />
          <Star className="bottom-[100px] right-[80px]" color="#FF9E7B" scale={1.2} />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-14 items-start">
            <div>
              <Eyebrow color="text-sun-300">our promise</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[52px] mt-2 leading-none">
                Your child<br />
                is <span className="italic text-coral-300">never</span><br />
                alone.
              </h2>
            </div>
            <div>
              <p className="text-lg md:text-xl lg:text-[22px] leading-relaxed text-cream-50/90">
                A home nanny may be unavailable any day — but at Lighthouse, our
                <em className="text-sun-300 not-italic font-display font-bold"> system never stops</em>.
                Linen washed, meals supervised, every cuddle and nap monitored. That&apos;s the
                difference seven years of practice makes.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 border-t border-cream-50/20 pt-9">
            <BigStat n="22" label="Trained teachers" color="#FFD23F" />
            <BigStat n="5" label="Professional nannies" color="#FF9E7B" />
            <BigStat n="7y" label="Years of trust" color="#8FD4AC" />
            <BigStat n="2mo+" label="From age" color="#92CDF8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
