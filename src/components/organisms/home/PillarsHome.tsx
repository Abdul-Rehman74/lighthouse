import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { TiltCard } from "@/components/molecules/TiltCard";

const pillars = [
  {
    icon: "🤝",
    title: "Growing Together",
    text: "Partnering with families to support each child's success.",
    bg: "#FFE27A",
    rotate: -1.5,
  },
  {
    icon: "🧩",
    title: "Every Child Belongs",
    text: "Creating an inclusive environment where every child feels valued.",
    bg: "#C9E7FF",
    rotate: 1,
  },
  {
    // A sprout reads as nurtured growth, matching "personalized care and learning
    // support" — and stays visually distinct from the handshake in pillar one.
    icon: "🌱",
    title: "Supporting Every Journey",
    text: "Providing personalized care and learning support based on each child's needs.",
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
