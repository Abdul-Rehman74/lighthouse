import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ScrapbookPhoto } from "@/components/molecules/ScrapbookPhoto";
import type { Scene } from "@/components/atoms/PhotoPlaceholder";

const items: { s: Scene; c: string; r: number; tape: string }[] = [
  { s: "play", c: "circle time", r: -2, tape: "rgba(255, 210, 63, 0.6)" },
  { s: "food", c: "snack o'clock", r: 1.5, tape: "rgba(255, 158, 123, 0.6)" },
  { s: "art", c: "masterpiece", r: -1, tape: "rgba(95, 179, 240, 0.55)" },
  { s: "outdoor", c: "garden!", r: 2, tape: "rgba(143, 212, 172, 0.6)" },
  { s: "learn", c: "so curious", r: -1.5, tape: "rgba(255, 210, 63, 0.6)" },
  { s: "nap", c: "sweet dreams", r: 2.5, tape: "rgba(255, 158, 123, 0.6)" },
];

export function ScrapbookGrid() {
  return (
    <section className="bg-cream-100 py-14 md:py-20">
      <Container>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
          <div>
            <Eyebrow color="text-mint-400">scrapbook</Eyebrow>
            <h2 className="text-4xl md:text-5xl mt-1.5">Look at our day →</h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-start">
            <Link href="/gallery">Visit the gallery</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((it, i) => (
            <ScrapbookPhoto key={i} scene={it.s} caption={it.c} rotate={it.r} tapeColor={it.tape} height={220} />
          ))}
        </div>
      </Container>
    </section>
  );
}
