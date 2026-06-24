import { Container } from "@/components/atoms/Container";

const cards = [
  {
    icon: "🧠",
    title: "Learning difficulties",
    body: "Dyslexia, attention, memory and processing — met with patient, structured help.",
    bg: "#FFE27A",
    rotate: -1,
  },
  {
    icon: "💬",
    title: "Speech & language delays",
    body: "Late talkers and articulation needs, guided by a speech therapist.",
    bg: "#C9E7FF",
    rotate: 1,
  },
  {
    icon: "🧩",
    title: "Developmental challenges",
    body: "Milestones at their own pace, with gentle goal-by-goal progress.",
    bg: "#FFC9B6",
    rotate: -1,
  },
  {
    icon: "❤️",
    title: "Behavioral & social skills",
    body: "Big feelings and friendships — building regulation and confidence.",
    bg: "#C8EBD7",
    rotate: 1,
  },
];

export function SupportSection() {
  return (
    <section id="support" className="py-14">
      <Container>
        <div className="text-center mb-12">
          <div className="hand text-[22px] leading-none text-coral-400">
            who this program supports
          </div>
          <h2 className="text-3xl md:text-[44px] mt-1.5">Help, tuned to each child.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-[24px] p-8 transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1 border-2 border-dashed border-ink-900/15"
              style={{ background: c.bg, transform: `rotate(${c.rotate}deg)` }}
            >
              <div className="text-4xl">{c.icon}</div>
              <h3 className="text-xl mt-3">{c.title}</h3>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
