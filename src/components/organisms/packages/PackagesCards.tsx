import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

const pkgs = [
  {
    hours: "8 — 12",
    label: "Half day",
    sub: "Mornings + lunch",
    price: "22,000",
    color: "#C8EBD7",
    rotate: -1.5,
    highlight: false,
    includes: [
      "Breakfast & morning snack",
      "Hot lunch supervised",
      "Montessori circle",
      "Outdoor play time",
    ],
  },
  {
    hours: "8 — 3",
    label: "School day",
    sub: "Most popular",
    price: "25,000",
    color: "#FFD23F",
    rotate: 0,
    highlight: true,
    includes: [
      "Everything in Half day",
      "Afternoon nap",
      "Art & sensory time",
      "Pre-K readiness activities",
    ],
  },
  {
    hours: "8 — 6",
    label: "Full day",
    sub: "For working parents",
    price: "28,000",
    color: "#FFC9B6",
    rotate: 1.5,
    highlight: false,
    includes: [
      "Everything in School day",
      "Afternoon outdoor play",
      "Evening snack",
      "Late pickup until 6pm",
    ],
  },
];

export function PackagesCards() {
  return (
    <section className="pt-10 pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
          {pkgs.map((p, i) => (
            <div
              key={i}
              className={cn(
                "p-9 rounded-[32px] relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1",
                p.highlight ? "shadow-soft-lg md:scale-[1.04]" : "shadow-soft-md"
              )}
              style={{ background: p.color, transform: `rotate(${p.rotate}deg)` }}
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
                {p.includes.map((it, k) => (
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
          ))}
        </div>
        <p className="text-[13px] text-ink-500 text-center mt-8">
          Sibling discount: 10% off the second child · Annual payment: 5% off · No registration fee
        </p>
      </Container>
    </section>
  );
}
