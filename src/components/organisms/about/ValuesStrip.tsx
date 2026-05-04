import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { TiltCard } from "@/components/molecules/TiltCard";

const values = [
  {
    t: "Strict sanitization",
    d: "Linen, toys, meals, care — all supervised on a checklist.",
    i: "🧼",
    c: "#C8EBD7",
    r: -1,
  },
  {
    t: "Always-on staffing",
    d: "A teacher-to-child ratio that keeps real eyes on every child.",
    i: "👩‍🏫",
    c: "#FFE27A",
    r: 1,
  },
  {
    t: "Montessori-led",
    d: "Self-directed play and structured learning, age-tuned.",
    i: "🌱",
    c: "#FFC9B6",
    r: -1,
  },
  {
    t: "Open 11 hours",
    d: "Mon–Sat, 7am–6pm, built for the working day.",
    i: "🕒",
    c: "#C9E7FF",
    r: 1,
  },
];

export function ValuesStrip() {
  return (
    <section className="py-14">
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="text-mint-400">what we stand for</Eyebrow>
          <h2 className="text-3xl md:text-[44px] mt-1.5">Four things, every day.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <TiltCard key={i} bg={v.c} rotate={v.r}>
              <div className="text-4xl">{v.i}</div>
              <h3 className="text-xl mt-3">{v.t}</h3>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{v.d}</p>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
