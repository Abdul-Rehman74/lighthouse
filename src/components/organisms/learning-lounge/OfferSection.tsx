import { Container } from "@/components/atoms/Container";

const offers = [
  {
    icon: "📚",
    title: "Remedial education",
    body: "One-step-at-a-time academic support that rebuilds the basics with confidence.",
  },
  {
    icon: "🗣️",
    title: "Speech, occupational & play therapy",
    body: "Specialist sessions woven naturally into the daycare day.",
  },
  {
    icon: "🤝",
    title: "One-on-one & inclusive support",
    body: "A dedicated facilitator when needed, inside the regular classroom.",
  },
  {
    icon: "🏠",
    title: "Safe, caring daycare integration",
    body: "The same warm, hygienic, fully-staffed Lighthouse environment.",
  },
  {
    icon: "🌈",
    title: "Support without separation",
    body: "Children stay with their friends — help comes to them.",
  },
  {
    icon: "🏷️",
    title: "Inclusion without labels",
    body: "Every child is a child first. No tags, no sidelining.",
  },
];

export function OfferSection() {
  return (
    <section id="offer" className="py-14">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-12">
          <div>
            <div className="hand text-[22px] leading-none text-mint-400">what we offer</div>
            <h2 className="text-3xl md:text-[44px] mt-1.5">Specialized care, the Lighthouse way.</h2>
          </div>
          <div className="text-sm text-ink-500 max-w-[280px]">
            All delivered inside our safe, hygienic, fully-staffed daycare — no separate building,
            no sense of being singled out.
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((o) => (
            <div
              key={o.title}
              className="bg-white rounded-[24px] p-7 flex items-start gap-4 border-[1.5px] border-cream-200 hover:shadow-soft-md transition-shadow"
            >
              <div
                className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#FBF4E6" }}
              >
                {o.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-lg leading-snug">{o.title}</h3>
                <p className="text-[14px] text-ink-700 mt-1.5 leading-relaxed">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
