"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Scene } from "@/components/atoms/PhotoPlaceholder";
import { ScrapbookPhoto } from "@/components/molecules/ScrapbookPhoto";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

const filters = ["All", "Play", "Learning", "Outdoor", "Meals", "Art", "Naps"] as const;
type Filter = (typeof filters)[number];

interface Item {
  src?: string;
  scene?: Scene;
  cat: Filter;
  cap: string;
  r: number;
}

/** Photos passed from the DB (admin-managed). */
export interface GalleryPhoto {
  src: string;
  cat: string;
  cap: string;
}

const rotations = [-2, 1, -1, 2, -1, 1.5, 2, -1.5, 1, -1, 2, -1, 1.5, -2, 1, -1, 2, -1.5];

// Illustrated fallback shown only when no real photos have been uploaded yet.
const placeholders: Item[] = [
  { scene: "play", cat: "Play", cap: "circle time", r: -2 },
  { scene: "art", cat: "Art", cap: "paint day", r: 1 },
  { scene: "food", cat: "Meals", cap: "snack o'clock", r: -1 },
  { scene: "outdoor", cat: "Outdoor", cap: "garden visit", r: 2 },
  { scene: "learn", cat: "Learning", cap: "so curious", r: -1 },
  { scene: "nap", cat: "Naps", cap: "sweet dreams", r: 1.5 },
  { scene: "play", cat: "Play", cap: "block tower!", r: 2 },
  { scene: "food", cat: "Meals", cap: "lunch time", r: -1.5 },
  { scene: "art", cat: "Art", cap: "masterpiece", r: 1 },
  { scene: "outdoor", cat: "Outdoor", cap: "sun on our face", r: -1 },
  { scene: "learn", cat: "Learning", cap: "first words", r: 2 },
  { scene: "play", cat: "Play", cap: "dress-up", r: -1 },
];

const tapes = [
  "rgba(255,210,63,0.6)",
  "rgba(143,212,172,0.6)",
  "rgba(255,158,123,0.6)",
  "rgba(95,179,240,0.55)",
];

export function GalleryFilter({ photos }: { photos?: GalleryPhoto[] }) {
  const [active, setActive] = useState<Filter>("All");

  const items: Item[] = useMemo(() => {
    if (photos && photos.length) {
      return photos.map((p, i) => ({
        src: p.src,
        cat: (filters as readonly string[]).includes(p.cat) ? (p.cat as Filter) : "Play",
        cap: p.cap || "",
        r: rotations[i % rotations.length],
      }));
    }
    return placeholders;
  }, [photos]);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((p) => p.cat === active)),
    [active, items]
  );

  return (
    <section className="pt-5 pb-20">
      <Container>
        <div className="flex gap-2.5 justify-center flex-wrap mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "px-5 py-2.5 rounded-full border-[1.5px] text-sm font-bold transition-all",
                active === f
                  ? "bg-ink-900 text-cream-50 border-ink-900"
                  : "bg-white text-ink-900 border-cream-200 hover:border-ink-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={`${p.cat}-${p.cap}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ScrapbookPhoto
                  scene={p.scene}
                  src={p.src}
                  caption={p.cap}
                  rotate={p.r}
                  tapeColor={tapes[i % tapes.length]}
                  height={240}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="text-center text-ink-500 py-10">No photos in this category yet.</p>
        )}
        <p className="text-[13px] text-ink-500 text-center mt-10">
          New photos uploaded by our teachers every week · Follow us on Instagram for daily updates
        </p>
      </Container>
    </section>
  );
}
