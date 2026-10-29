"use client";

import { useEffect, useRef } from "react";

/** One continuous foreground journey with soft, unhurried direction changes. */
export function useHarbourMotion() {
  const boat = useRef<SVGGElement>(null);
  const head = useRef<SVGGElement>(null);
  const arm = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let visible = true;
    // Suspend motion when the hero is outside the viewport.
    const scene = boat.current?.ownerSVGElement;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (scene) observer.observe(scene);
    const smooth = (value: number) => {
      const t = Math.max(0, Math.min(1, value));
      return t * t * (3 - 2 * t);
    };

    function tick(now: number) {
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      if (!reduced.matches && !document.hidden && visible) {
        elapsed += dt;
        const phase = elapsed * Math.PI * 2 / 32;
        const progress = (1 - Math.cos(phase)) / 2;
        // Approach the children at the near shore, shrinking with distance.
        const x = 840 + 175 * progress;
        const y = 740 - 90 * progress;
        const scale = .9 - .22 * progress;
        const turn = Math.sin(phase) * 2;
        boat.current?.setAttribute("transform", `translate(${x} ${y}) skewX(${turn}) scale(${scale}) translate(-157 -492)`);

        const waveTime = elapsed % 9;
        const lift = smooth((waveTime - 2) / .7) * (1 - smooth((waveTime - 5.5) / .7));
        const greeting = lift * (-112 + Math.sin(waveTime * 8) * 12);
        arm.current?.setAttribute("transform", `rotate(${greeting} 169 413)`);
        head.current?.setAttribute("transform", `rotate(${Math.sin(elapsed * .6) * 5 - lift * 5} 155 400)`);
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  return { boat, head, arm };
}
