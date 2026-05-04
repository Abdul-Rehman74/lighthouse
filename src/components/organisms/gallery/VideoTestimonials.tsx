"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

const vids = [
  {
    name: "Ayesha · mother of Zara (2y)",
    quote: "\"My daughter actually asks to come here on weekends.\"",
    bg: "#FFE27A",
    duration: "1:24",
  },
  {
    name: "Sara · mother of Ali (8mo)",
    quote: "\"As a working mother, the WhatsApp updates make my day.\"",
    bg: "#FFC9B6",
    duration: "0:58",
  },
  {
    name: "Hina · mother of twins (3y)",
    quote: "\"They've handled the messy and the magical with the same calm.\"",
    bg: "#C8EBD7",
    duration: "1:41",
  },
];

export function VideoTestimonials() {
  const [, setHover] = useState<number | null>(null);

  return (
    <section className="bg-cream-100 py-14 md:py-20">
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="text-mint-400">parents say</Eyebrow>
          <h2 className="text-3xl md:text-[44px] mt-1.5">Video testimonials.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vids.map((v, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group bg-white rounded-[24px] overflow-hidden shadow-soft-sm text-left hover:shadow-soft-md transition-shadow"
            >
              <div className="h-[220px] relative flex items-center justify-center" style={{ background: v.bg }}>
                <div className="w-[72px] h-[72px] rounded-full bg-ink-900/85 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play size={28} fill="white" stroke="white" />
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-bold">
                  {v.duration}
                </div>
              </div>
              <div className="p-6">
                <p className="font-display text-lg italic text-ink-900 leading-snug">{v.quote}</p>
                <div className="text-[13px] text-ink-500 mt-3 font-semibold">{v.name}</div>
              </div>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
