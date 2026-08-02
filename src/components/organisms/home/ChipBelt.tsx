import { Clock, Sun, Baby, Users, SprayCan, Sparkles } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { getHours } from "@/lib/site-settings";

export async function ChipBelt() {
  const hours = await getHours();
  // First two chips come from the admin-editable opening hours; the rest are fixed.
  const chips = [
    { t: hours.rows[0]?.label ? `Open ${hours.rows[0].label}` : "Open Mon–Sat", Icon: Clock },
    { t: hours.rows[0]?.time ?? hours.short, Icon: Sun },
    { t: "From 2 months", Icon: Baby },
    { t: "22 teachers + 5 nannies", Icon: Users },
    { t: "Strict sanitization", Icon: SprayCan },
    { t: "7 years of trust", Icon: Sparkles },
  ];
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
