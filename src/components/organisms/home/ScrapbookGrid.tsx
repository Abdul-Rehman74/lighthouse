import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ScrapbookPhoto } from "@/components/molecules/ScrapbookPhoto";
import type { Scene } from "@/components/atoms/PhotoPlaceholder";
import { getHomePhotos } from "@/lib/site-settings";

// Decorative fallback shown when the admin hasn't picked any home photos yet.
const fallback: { s: Scene; c: string }[] = [
  { s: "play", c: "circle time" },
  { s: "food", c: "snack o'clock" },
  { s: "art", c: "masterpiece" },
  { s: "outdoor", c: "garden!" },
  { s: "learn", c: "so curious" },
  { s: "nap", c: "sweet dreams" },
];

// Cycled scrapbook styling (tilt + tape colour) applied to whatever fills the grid.
const ROTATE = [-2, 1.5, -1, 2, -1.5, 2.5];
const TAPE = [
  "rgba(255, 210, 63, 0.6)",
  "rgba(255, 158, 123, 0.6)",
  "rgba(95, 179, 240, 0.55)",
  "rgba(143, 212, 172, 0.6)",
  "rgba(255, 210, 63, 0.6)",
  "rgba(255, 158, 123, 0.6)",
];

export async function ScrapbookGrid() {
  const homePhotos = await getHomePhotos();
  const tiles = homePhotos.slice(0, 6);

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
          {tiles.length > 0
            ? tiles.map((p, i) => (
                <ScrapbookPhoto
                  key={i}
                  src={p.src}
                  caption={p.cap}
                  rotate={ROTATE[i % ROTATE.length]}
                  tapeColor={TAPE[i % TAPE.length]}
                  height={220}
                />
              ))
            : fallback.map((it, i) => (
                <ScrapbookPhoto
                  key={i}
                  scene={it.s}
                  caption={it.c}
                  rotate={ROTATE[i % ROTATE.length]}
                  tapeColor={TAPE[i % TAPE.length]}
                  height={220}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}
