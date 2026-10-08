import { Clock, Camera, Baby, Users, SprayCan, Sparkles } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { getPageContent } from "@/lib/site-settings";

export async function ChipBelt() {
  const content = await getPageContent();
  // The first two chips have their own admin copy; opening hours remain separate.
  const chips = [
    { t: content.homeDaysChip, Icon: Clock },
    { t: content.homeSafetyChip, Icon: Camera },
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
