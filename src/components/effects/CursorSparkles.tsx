"use client";

import { useEffect } from "react";

const COLORS = ["#F47A4F", "#FFD23F", "#8FD4AC", "#5FB3F0", "#FF9E7B"];
const STAR =
  "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)";
const SPARKLE =
  "polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%)";

type Kind = "star" | "sparkle" | "bubble";

/**
 * Playful sparkle/star/bubble particles that trail the pointer.
 * Ported from the design's index.html / learning-lounge.html cursor effect.
 * Skips touch devices and anyone who prefers reduced motion.
 */
export function CursorSparkles() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;

    let last = 0;

    const particle = (x: number, y: number, kind: Kind) => {
      const s = document.createElement("div");
      const size = (kind === "bubble" ? 9 : 11) + Math.random() * 11;
      const c = COLORS[(Math.random() * COLORS.length) | 0];
      s.className = "spark";
      s.style.left = x + (Math.random() * 14 - 7) + "px";
      s.style.top = y + (Math.random() * 14 - 7) + "px";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.setProperty("--sr", (Math.random() * 200 - 100).toFixed(0) + "deg");
      if (kind === "bubble") {
        s.style.background = c;
        s.style.borderRadius = "50%";
        s.style.opacity = ".8";
        s.style.boxShadow = "inset -2px -2px 0 rgba(255,255,255,.4)";
      } else if (kind === "sparkle") {
        s.style.background = "#fff";
        s.style.clipPath = SPARKLE;
        s.style.filter = "drop-shadow(0 0 3px " + c + ")";
      } else {
        s.style.background = c;
        s.style.clipPath = STAR;
        s.style.filter = "drop-shadow(0 1px 1px rgba(31,42,55,.25))";
      }
      document.body.appendChild(s);
      window.setTimeout(() => s.remove(), 900);
    };

    const emit = (x: number, y: number) => {
      particle(x, y, "star");
      const r = Math.random();
      particle(x, y, r < 0.45 ? "sparkle" : r < 0.75 ? "bubble" : "star");
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const d = Math.hypot(e.movementX || 0, e.movementY || 0);
      if (now - last > 40 && d > 2) {
        last = now;
        emit(e.clientX, e.clientY);
      }
    };

    const onDown = (e: PointerEvent) => {
      for (let i = 0; i < 5; i++) {
        emit(e.clientX, e.clientY);
        particle(e.clientX, e.clientY, "sparkle");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}
