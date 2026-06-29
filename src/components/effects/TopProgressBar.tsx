"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin top-of-page loading bar shown during route navigations, so a click that
 * triggers a slow server render gives immediate visual feedback instead of
 * feeling stuck. No dependencies: it starts on internal link clicks and
 * completes once the pathname actually changes.
 */
export function TopProgressBar() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const active = useRef(false);
  const trickle = useRef<number | undefined>(undefined);
  const hideTimer = useRef<number | undefined>(undefined);

  const clearTimers = () => {
    if (trickle.current) window.clearInterval(trickle.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  };

  const start = () => {
    if (active.current) return;
    active.current = true;
    clearTimers();
    setVisible(true);
    setWidth(8);
    // Creep toward 90% so the bar keeps moving while the next route renders.
    trickle.current = window.setInterval(() => {
      setWidth((w) => (w < 90 ? w + (90 - w) * 0.12 : w));
    }, 200);
  };

  const done = () => {
    if (!active.current) return;
    active.current = false;
    clearTimers();
    setWidth(100);
    hideTimer.current = window.setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 320);
  };

  // Start the bar when an internal navigation link is clicked.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || href.startsWith("#") || (target && target !== "_self")) return;
      if (anchor.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same page (or hash-only) — no navigation, no bar.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // The pathname changing means the navigation resolved — finish the bar.
  useEffect(() => {
    done();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${width}%`,
        zIndex: 100,
        background: "linear-gradient(90deg, #FFD23F, #F47A4F)",
        boxShadow: "0 0 10px rgba(255,210,63,0.6)",
        borderRadius: "0 2px 2px 0",
        transition: "width 0.2s ease",
        pointerEvents: "none",
      }}
    />
  );
}
