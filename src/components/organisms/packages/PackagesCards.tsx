import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";
import { getPackages } from "@/lib/site-settings";

// Card colour + tilt are derived from position (highlighted tier is always sun-yellow).
const COLORS = ["#C8EBD7", "#FFC9B6", "#C9E7FF", "#FFE27A"];
const ROTATE = [-1.5, 0, 1.5, -1, 1];

export async function PackagesCards() {
  const { packages, note } = await getPackages();

  return (
    <section className="pt-10 pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
          {packages.map((p, i) => {
            const color = p.highlight ? "#FFD23F" : COLORS[i % COLORS.length];
            const rotate = ROTATE[i % ROTATE.length];
            return (
              <div
                key={p.id}
                className={cn(
                  "p-9 rounded-[32px] relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1",
                  p.highlight ? "shadow-soft-lg md:scale-[1.04]" : "shadow-soft-md"
                )}
                style={{ background: color, transform: `rotate(${rotate}deg)` }}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ink-900 text-cream-50 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.08em] uppercase whitespace-nowrap">
                    most popular
                  </div>
                )}
                <div className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-900">{p.label}</div>
                <div className="font-display text-[56px] font-extrabold mt-2 leading-none">{p.hours}</div>
                <div className="text-sm mt-1.5 text-ink-700">{p.sub}</div>

                <div className="mt-6 py-5 border-t border-b border-dashed border-ink-900/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[13px] font-bold text-ink-700">Rs.</span>
                    <span className="font-display text-[40px] font-extrabold text-ink-900 leading-none">{p.price}</span>
                    <span className="text-[13px] text-ink-700 ml-1">/ month</span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {p.features.map((it, k) => (
                    <li key={k} className="flex items-start gap-2.5 text-sm text-ink-900">
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0" /> {it}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={p.highlight ? "primary" : "ghost"}
                  className="mt-7 w-full justify-center"
                >
                  <Link href="/contact">Book a free trial →</Link>
                </Button>
              </div>
            );
          })}
        </div>
        {note && <p className="text-[13px] text-ink-500 text-center mt-8">{note}</p>}
      </Container>
    </section>
  );
}
