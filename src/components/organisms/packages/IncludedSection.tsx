import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Utensils, BedDouble, MessageCircle, Palette, Stethoscope, Trees } from "lucide-react";

const items = [
  { Icon: Utensils, t: "Hot meals & snacks", d: "Freshly prepared, supervised, age-appropriate." },
  { Icon: BedDouble, t: "Linen & bedding", d: "Washed daily. Clean sheets every nap." },
  { Icon: MessageCircle, t: "WhatsApp updates", d: "Photos and quick check-ins through the day." },
  { Icon: Palette, t: "Materials & supplies", d: "Art, sensory, Montessori — all included." },
  { Icon: Stethoscope, t: "Health protocols", d: "Daily checks, sanitization, sick-day policy." },
  { Icon: Trees, t: "Outdoor time", d: "Fresh air every day, weather permitting." },
];

export function IncludedSection() {
  return (
    <section className="py-14">
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="text-coral-400">no surprises</Eyebrow>
          <h2 className="text-3xl md:text-[40px] mt-1.5">All packages include:</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, t, d }, i) => (
            <div
              key={i}
              className="p-6 rounded-[20px] bg-white border-[1.5px] border-cream-200 flex gap-4 items-start hover:shadow-soft-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-sun-100 flex items-center justify-center text-ink-900 shrink-0">
                <Icon size={24} />
              </div>
              <div>
                <div className="font-display font-bold text-lg">{t}</div>
                <div className="text-sm text-ink-700 mt-1">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
