"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import styles from "./HomeIntro.module.css";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Home-page entrance: a full-screen lighthouse "portal" that zooms in and
 * dissolves, then reveals a welcome modal. Ported from the design's index.html.
 * The intro completing is what triggers the modal, so both live here.
 */
export function HomeIntro() {
  const [showPortal, setShowPortal] = useState(true);
  const [welcomeState, setWelcomeState] = useState<"hidden" | "show" | "in">("hidden");

  const portalRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const revealed = useRef(false);
  const welcomeTimer = useRef<number | undefined>(undefined);

  const lock = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };
  const unlock = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  const showWelcome = useCallback(() => {
    setWelcomeState("show");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setWelcomeState("in"))
    );
  }, []);

  const finish = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    setShowPortal(false);
    unlock();
    welcomeTimer.current = window.setTimeout(showWelcome, 650);
  }, [showWelcome]);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    const portal = portalRef.current;
    const mark = markRef.current;
    if (!portal || !mark) {
      finish();
      return;
    }
    const dur = 1700;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const e = easeIO(clamp((ts - t0) / dur));
      mark.style.transform = `scale(${1 + Math.pow(e, 1.25) * 13})`;
      if (imgRef.current)
        imgRef.current.style.opacity = (e < 0.45 ? 1 : clamp(1 - (e - 0.45) / 0.3)).toFixed(3);
      if (bloomRef.current)
        bloomRef.current.style.opacity = (e < 0.22 ? 0 : clamp((e - 0.22) / 0.5)).toFixed(3);
      portal.style.opacity = (e < 0.8 ? 1 : clamp(1 - (e - 0.8) / 0.2)).toFixed(3);
      if (e < 1) requestAnimationFrame(step);
      else finish();
    };
    requestAnimationFrame(step);
    window.setTimeout(finish, dur + 500);
  }, [finish]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShowPortal(false);
      welcomeTimer.current = window.setTimeout(showWelcome, 400);
      return () => window.clearTimeout(welcomeTimer.current);
    }
    lock();
    // Total intro ≈ 2s: a brief hold, then the ~1.7s zoom-out.
    const startTimer = window.setTimeout(reveal, 300);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(welcomeTimer.current);
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeWelcome = useCallback(() => {
    setWelcomeState("hidden");
  }, []);

  useEffect(() => {
    if (welcomeState !== "in") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWelcome();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [welcomeState, closeWelcome]);

  return (
    <>
      {showPortal && (
        <div className={styles.portal} ref={portalRef}>
          <div className={styles.sky} />
          <div className={styles.cam}>
            <div className={styles.mark} ref={markRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/lighthouse-mark.svg" alt="Lighthouse Daycare & Montessori" ref={imgRef} />
              <div className={styles.bloom} ref={bloomRef} />
            </div>
          </div>
        </div>
      )}

      {welcomeState !== "hidden" && (
        <div
          className={`${styles.welcome} ${styles.welcomeShow} ${
            welcomeState === "in" ? styles.welcomeIn : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcomeTitle"
        >
          <div className={styles.backdrop} onClick={closeWelcome} />
          <div className={styles.card}>
            <button
              className={styles.close}
              type="button"
              aria-label="Close welcome"
              onClick={closeWelcome}
            >
              <X size={18} strokeWidth={2.6} />
            </button>
            <div className={styles.top}>
              <div
                className={styles.ball}
                style={{ left: "7%", top: "16px", width: "26px", height: "31px", background: "#FFD23F", "--wr": "-6deg" } as React.CSSProperties}
              />
              <div
                className={styles.ball}
                style={{ right: "9%", top: "11px", width: "30px", height: "36px", background: "#8FD4AC", animationDelay: "-1.4s", "--wr": "6deg" } as React.CSSProperties}
              />
              <div
                className={styles.ball}
                style={{ right: "21%", top: "44px", width: "20px", height: "24px", background: "#5FB3F0", animationDelay: "-2.7s", "--wr": "-3deg" } as React.CSSProperties}
              />
              <span className={styles.wmark}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lighthouse-mark.svg" alt="" style={{ width: "34px", height: "auto", display: "block" }} />
              </span>
              <div className={styles.wname}>LIGHTHOUSE</div>
              <div className={styles.wsub}>Daycare &amp; Montessori</div>
            </div>
            <div className={styles.body}>
              <div className={styles.eyebrow}>✯ Now enrolling ✯</div>
              <h2 id="welcomeTitle">
                A free trial week,
                <br />
                just for you.
              </h2>
              <p>
                Bring your little one for a free half-day visit — walk the rooms, meet our 22
                teachers, and feel the joy for yourself.
              </p>
              <div className={styles.cta}>
                <Link href="/contact" className="btn btn-sun" onClick={closeWelcome}>
                  ✯ Book a free visit
                </Link>
                <button className={styles.later} type="button" onClick={closeWelcome}>
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
