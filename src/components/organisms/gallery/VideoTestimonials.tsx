"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import type { VideoRef } from "@/lib/video";

export interface TestimonialItem {
  name: string;
  child: string;
  quote: string;
  duration: string;
  video?: VideoRef | null;
}

// Shown only when no testimonials have been added in the admin yet.
const fallback: TestimonialItem[] = [
  { name: "Ayesha", child: "mother of Zara (2y)", quote: "My daughter actually asks to come here on weekends.", duration: "1:24" },
  { name: "Sara", child: "mother of Ali (8mo)", quote: "As a working mother, the WhatsApp updates make my day.", duration: "0:58" },
  { name: "Hina", child: "mother of twins (3y)", quote: "They've handled the messy and the magical with the same calm.", duration: "1:41" },
];

const bgs = ["#FFE27A", "#FFC9B6", "#C8EBD7", "#CDE8FB", "#FFD7B0", "#C9BEE8"];

function Card({ t, i }: { t: TestimonialItem; i: number }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!t.video?.url;
  const who = [t.name, t.child].filter(Boolean).join(" · ");

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-shadow">
      <div className="h-[220px] relative flex items-center justify-center" style={{ background: bgs[i % bgs.length] }}>
        {hasVideo && playing && t.video!.type === "cloudinary" && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={t.video!.url} poster={t.video!.posterUrl} controls autoPlay className="absolute inset-0 w-full h-full object-cover bg-black" />
        )}
        {hasVideo && playing && t.video!.type !== "cloudinary" && (
          <iframe
            src={`${t.video!.url}?autoplay=1`}
            title={who}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {hasVideo && !playing && (
          <>
            {t.video!.posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.video!.posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${who}`}
              className="group relative w-[72px] h-[72px] rounded-full bg-ink-900/85 flex items-center justify-center transition-transform hover:scale-110"
            >
              <Play size={28} fill="white" stroke="white" />
            </button>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-bold">{t.duration}</div>
          </>
        )}

        {!hasVideo && (
          <div className="font-display text-6xl text-ink-900/15 select-none">&ldquo;</div>
        )}
      </div>
      <div className="p-6">
        <p className="font-display text-lg italic text-ink-900 leading-snug">&ldquo;{t.quote}&rdquo;</p>
        <div className="text-[13px] text-ink-500 mt-3 font-semibold">{who}</div>
      </div>
    </div>
  );
}

export function VideoTestimonials({ items }: { items?: TestimonialItem[] }) {
  const list = items && items.length ? items : fallback;

  return (
    <section className="bg-cream-100 py-14 md:py-20">
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="text-mint-400">parents say</Eyebrow>
          <h2 className="text-3xl md:text-[44px] mt-1.5">Video testimonials.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((t, i) => (
            <Card key={i} t={t} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
