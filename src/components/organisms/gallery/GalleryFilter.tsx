"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Scene } from "@/components/atoms/PhotoPlaceholder";
import { ScrapbookPhoto } from "@/components/molecules/ScrapbookPhoto";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

const filters = ["All", "Play", "Learning", "Outdoor", "Meals", "Art", "Naps"] as const;
type Filter = (typeof filters)[number];

interface Photo {
  s: Scene;
  cat: Filter;
  c: string;
  r: number;
}

const photos: Photo[] = [
  { s: "play", cat: "Play", c: "circle time", r: -2 },
  { s: "art", cat: "Art", c: "paint day", r: 1 },
  { s: "food", cat: "Meals", c: "snack o'clock", r: -1 },
  { s: "outdoor", cat: "Outdoor", c: "garden visit", r: 2 },
  { s: "learn", cat: "Learning", c: "so curious", r: -1 },
  { s: "nap", cat: "Naps", c: "sweet dreams", r: 1.5 },
  { s: "play", cat: "Play", c: "block tower!", r: 2 },
  { s: "food", cat: "Meals", c: "lunch time", r: -1.5 },
  { s: "art", cat: "Art", c: "masterpiece", r: 1 },
  { s: "outdoor", cat: "Outdoor", c: "sun on our face", r: -1 },
  { s: "learn", cat: "Learning", c: "first words", r: 2 },
  { s: "play", cat: "Play", c: "dress-up", r: -1 },
  { s: "art", cat: "Art", c: "finger paints", r: 1.5 },
  { s: "outdoor", cat: "Outdoor", c: "big swing", r: -2 },
  { s: "food", cat: "Meals", c: "fruit salad", r: 1 },
  { s: "nap", cat: "Naps", c: "naptime", r: -1 },
  { s: "learn", cat: "Learning", c: "shapes", r: 2 },
  { s: "play", cat: "Play", c: "race!", r: -1.5 },
];

const tapes = [
  "rgba(255,210,63,0.6)",
  "rgba(143,212,172,0.6)",
  "rgba(255,158,123,0.6)",
  "rgba(95,179,240,0.55)",
];

export function GalleryFilter() {
  const [active, setActive] = useState<Filter>("All");
  const filtered = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.cat === active)),
    [active]
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
                key={`${p.s}-${p.c}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ScrapbookPhoto
                  scene={p.s}
                  caption={p.c}
                  rotate={p.r}
                  tapeColor={tapes[i % tapes.length]}
                  height={240}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="text-[13px] text-ink-500 text-center mt-10">
          New photos uploaded by our teachers every week · Follow us on Instagram for daily updates
        </p>
      </Container>
    </section>
  );
}
