import { Container } from "@/components/atoms/Container";

export function BeliefBanner() {
  return (
    <section className="py-14">
      <Container>
        <div className="bg-ink-900 text-cream-50 rounded-[28px] md:rounded-[32px] p-7 md:p-16 relative overflow-hidden text-center">
          <div aria-hidden className="absolute -top-16 -right-10 w-[200px] h-[200px] rounded-full bg-sun-300/40" />
          <div aria-hidden className="absolute -bottom-16 -left-10 w-[200px] h-[200px] rounded-full bg-coral-300/25" />
          <div className="relative">
            <div className="hand text-[22px] leading-none text-sun-300">our belief</div>
            <h2 className="text-3xl md:text-[46px] mt-2 leading-tight max-w-[760px] mx-auto">
              Support without separation.
              <br />
              <span className="text-coral-300">Inclusion without labels.</span>
            </h2>
            <p className="text-lg mt-5 text-cream-50/80 max-w-[560px] mx-auto leading-relaxed">
              Children stay alongside their friends in everyday play. The right help simply comes to
              them — quietly, kindly, and from day one.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
