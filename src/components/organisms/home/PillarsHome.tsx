import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { TiltCard } from "@/components/molecules/TiltCard";

const pillars = [
  {
    icon: "👩‍🏫",
    title: "Always staffed",
    text: "22 teachers and 5 professional nannies, every single day. Real eyes on every little one.",
    bg: "#FFE27A",
    rotate: -1.5,
  },
  {
    icon: "🧼",
    title: "Spotlessly clean",
    text: "Sanitization isn't a chore — it's the foundation. Linen, toys, surfaces, bottles, daily.",
    bg: "#C9E7FF",
    rotate: 1,
  },
  {
    icon: "🌱",
    title: "Joyful Montessori",
    text: "Self-directed play and hands-on materials, calibrated to your child's stage.",
    bg: "#C8EBD7",
    rotate: -1,
  },
];

export function PillarsHome() {
  return (
    <section className="pt-10 pb-20">
      <Container>
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <Eyebrow color="text-coral-400">three pillars</Eyebrow>
          <h2 className="text-4xl md:text-5xl mt-2 leading-tight">
            What holds up <span className="squiggle">every Lighthouse day.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <TiltCard key={i} bg={p.bg} rotate={p.rotate}>
              <div className="text-4xl">{p.icon}</div>
              <h3 className="text-2xl mt-3.5">{p.title}</h3>
              <p className="text-[15px] text-ink-700 mt-2">{p.text}</p>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
