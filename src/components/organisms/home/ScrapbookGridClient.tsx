"use client";

import { useState } from "react";
import { ScrapbookPhoto } from "@/components/molecules/ScrapbookPhoto";
import { Lightbox } from "@/components/molecules/Lightbox";

interface Photo {
  src: string;
  cap: string;
}

/** Renders the "Look at our day" photo grid with a click-to-expand lightbox. */
export function ScrapbookGridClient({
  tiles,
  rotate,
  tape,
}: {
  tiles: Photo[];
  rotate: number[];
  tape: string[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {tiles.map((p, i) => (
          <ScrapbookPhoto
            key={i}
            src={p.src}
            caption={p.cap}
            rotate={rotate[i % rotate.length]}
            tapeColor={tape[i % tape.length]}
            height={220}
            onClick={() => setOpenIndex(i)}
          />
        ))}
      </div>
      <Lightbox
        items={tiles.map((p) => ({ src: p.src, caption: p.cap }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
