import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";

const rows: [string, string, string, string][] = [
  ["Hours", "8am – 12pm", "8am – 3pm", "8am – 6pm"],
  ["Breakfast", "✓", "✓", "✓"],
  ["Hot lunch", "✓", "✓", "✓"],
  ["Afternoon nap", "—", "✓", "✓"],
  ["Art & sensory", "—", "✓", "✓"],
  ["Outdoor play (am)", "✓", "✓", "✓"],
  ["Outdoor play (pm)", "—", "—", "✓"],
  ["Evening snack", "—", "—", "✓"],
  ["WhatsApp updates", "✓", "✓", "✓"],
  ["Monthly fee (Rs.)", "22,000", "25,000", "28,000"],
];

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const dim = value === "—";
  return (
    <div
      className={cn(
        "text-center",
        dim ? "text-ink-300" : "text-ink-900",
        value === "✓" ? "font-extrabold" : "font-semibold",
        highlight && "bg-sun-300/15"
      )}
    >
      {value}
    </div>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-14">
      <Container>
        <div className="text-center mb-9">
          <Eyebrow color="text-mint-400">side-by-side</Eyebrow>
          <h2 className="text-3xl md:text-[40px] mt-1.5">Compare what&apos;s included.</h2>
        </div>
        <div className="bg-white rounded-[24px] overflow-hidden border-[1.5px] border-cream-200">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-ink-900 text-cream-50 px-5 sm:px-7 py-5 font-extrabold text-sm">
            <div />
            <div className="text-center">Half day</div>
            <div className="text-center text-sun-300">School day ⭐</div>
            <div className="text-center">Full day</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className={cn(
                "grid grid-cols-[2fr_1fr_1fr_1fr] px-5 sm:px-7 py-4 text-[15px] items-center",
                i === 0 ? "" : "border-t border-cream-200",
                i % 2 === 0 ? "bg-cream-50" : "bg-white"
              )}
            >
              <div className="font-bold text-ink-900">{r[0]}</div>
              <Cell value={r[1]} />
              <Cell value={r[2]} highlight />
              <Cell value={r[3]} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
