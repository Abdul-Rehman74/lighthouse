import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { getRoutine } from "@/lib/site-settings";

// Card colours cycle by position, so the palette stays balanced whatever the
// admin adds or removes.
const CARD_COLORS = ["#FFE27A", "#FFC9B6", "#C9E7FF", "#C8EBD7"];

export async function DailyRoutine() {
  const cards = await getRoutine();
  if (!cards.length) return null;

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
            {cards.map((c, i) => (
              <div
                key={i}
                className="rounded-[18px] p-4 text-ink-900"
                style={{ background: CARD_COLORS[i % CARD_COLORS.length] }}
              >
                <div className="font-display font-extrabold text-[15px]">{c.title}</div>
                {c.subtitle && <div className="text-sm mt-1.5 font-semibold">{c.subtitle}</div>}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
