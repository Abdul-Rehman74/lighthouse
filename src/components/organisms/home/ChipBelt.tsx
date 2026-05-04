import { Clock, Sun, Baby, Users, SprayCan, Sparkles } from "lucide-react";
import { Container } from "@/components/atoms/Container";

const chips = [
  { t: "Open Mon–Sat", Icon: Clock },
  { t: "7am – 6pm", Icon: Sun },
  { t: "From 2 months", Icon: Baby },
  { t: "22 teachers + 5 nannies", Icon: Users },
  { t: "Strict sanitization", Icon: SprayCan },
  { t: "7 years of trust", Icon: Sparkles },
];

export function ChipBelt() {
  return (
    <section className="bg-ink-900 text-cream-50 py-6 overflow-hidden">
      <Container>
        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-between">
          {chips.map(({ t, Icon }, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold">
              <Icon size={18} className="text-sun-300" />
              {t}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
