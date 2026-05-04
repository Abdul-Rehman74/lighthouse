import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

const slots = [
  { t: "7:00 — 9:00", l: "Drop-off & free play", c: "#FFE27A" },
  { t: "9:00 — 9:30", l: "Breakfast (supervised)", c: "#FFC9B6" },
  { t: "9:30 — 11:00", l: "Montessori circle", c: "#C9E7FF" },
  { t: "11:00 — 12:00", l: "Outdoor / sensory", c: "#C8EBD7" },
  { t: "12:00 — 1:00", l: "Hot lunch", c: "#FFE27A" },
  { t: "1:00 — 3:00", l: "Nap time", c: "#C9E7FF" },
  { t: "3:00 — 4:30", l: "Art & sensory", c: "#FFC9B6" },
  { t: "4:30 — 6:00", l: "Outdoor & pickup", c: "#C8EBD7" },
];

export function DailyRoutine() {
  return (
    <section className="py-14">
      <Container>
        <div className="bg-ink-900 text-cream-50 rounded-[28px] md:rounded-[32px] p-7 md:p-14 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-16 right-10 w-[180px] h-[180px] rounded-full bg-sun-300/50"
          />
          <div className="relative text-center mb-12">
            <Eyebrow color="text-sun-300">a typical day</Eyebrow>
            <h2 className="text-3xl md:text-[44px] mt-2">Predictable rhythm. Joyful moments.</h2>
          </div>
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {slots.map((s, i) => (
              <div
                key={i}
                className="rounded-[18px] p-4 text-ink-900"
                style={{ background: s.c }}
              >
                <div className="font-display font-extrabold text-[15px]">{s.t}</div>
                <div className="text-sm mt-1.5 font-semibold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
