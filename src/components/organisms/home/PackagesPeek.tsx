import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";

const pkgs = [
  { hours: "8 — 12", label: "Half day", sub: "Mornings + lunch", color: "#C8EBD7", rotate: -1, highlight: false },
  { hours: "8 — 3", label: "School day", sub: "Most popular", color: "#FFD23F", rotate: 0, highlight: true },
  { hours: "8 — 6", label: "Full day", sub: "For working parents", color: "#FFC9B6", rotate: 1, highlight: false },
];

export function PackagesPeek() {
  return (
    <section className="pt-10 pb-20">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow color="text-coral-400">three little packages</Eyebrow>
          <h2 className="text-4xl md:text-5xl mt-2">Pick the rhythm that fits.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {pkgs.map((p, i) => (
            <div
              key={i}
              className={cn(
                "p-8 rounded-[28px] relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1",
                p.highlight ? "shadow-soft-lg md:scale-105" : "shadow-soft-md"
              )}
              style={{ background: p.color, transform: `rotate(${p.rotate}deg)` }}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink-900 text-cream-50 px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-[0.08em] uppercase whitespace-nowrap">
                  most popular
                </div>
              )}
              <div className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-900">{p.label}</div>
              <div className="font-display text-[60px] font-extrabold mt-2.5 leading-none">{p.hours}</div>
              <div className="text-sm mt-2 text-ink-700">{p.sub}</div>
              <Button asChild variant="primary" size="sm" className="mt-7">
                <Link href="/packages">See pricing →</Link>
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
