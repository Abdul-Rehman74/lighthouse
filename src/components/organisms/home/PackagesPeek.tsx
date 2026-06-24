import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";
import { getPackages } from "@/lib/site-settings";

const COLORS = ["#C8EBD7", "#FFC9B6", "#C9E7FF", "#FFE27A"];
const ROTATE = [-1, 0, 1, -1, 1];

export async function PackagesPeek() {
  const { packages } = await getPackages();
  const pkgs = packages.map((p, i) => ({
    hours: p.hours,
    label: p.label,
    sub: p.sub,
    color: p.highlight ? "#FFD23F" : COLORS[i % COLORS.length],
    rotate: ROTATE[i % ROTATE.length],
    highlight: p.highlight,
  }));
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
