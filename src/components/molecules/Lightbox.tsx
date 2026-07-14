"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  src: string;
  caption?: string;
}

/** Fullscreen photo viewer with keyboard + swipe-free prev/next navigation. */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = index !== null;
  const current = index !== null ? items[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  // Render straight into <body> — several sections on the site (e.g. the home
  // page's scroll-reveal wrapper) set `will-change: transform`, which creates
  // a new containing block for `position: fixed` descendants and would
  // otherwise pin the overlay to that section instead of the viewport.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 backdrop-blur-sm px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X size={28} />
          </button>

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.caption || "Photo"}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            {current.caption ? (
              <p className="hand text-white text-center mt-4 text-xl">{current.caption}</p>
            ) : null}
            {items.length > 1 && (
              <p className="text-white/50 text-sm mt-2">
                {index! + 1} / {items.length}
              </p>
            )}
          </motion.div>

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
