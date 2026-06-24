"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./TestHome.module.css";

/** Join CSS-module class keys into a className string. */
const k = (...names: string[]) => names.map((n) => styles[n]).filter(Boolean).join(" ");

/**
 * Alternate home design served at /test-home. Fully self-contained:
 * its own nav/hero/footer and scoped styling (TestHome.module.css), so it
 * does not affect — and is not affected by — the rest of the app.
 * Ported from the design's home.html.
 */
export function TestHome() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const lhStageRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    const nav = navRef.current;
    const heroCopy = heroCopyRef.current;
    const lhStage = lhStageRef.current;
    const hint = hintRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rvs = Array.from(root.querySelectorAll<HTMLElement>("." + styles.rv));
    const stat = root.querySelector<HTMLElement>("." + styles.statbar);
    const nums = Array.from(root.querySelectorAll<HTMLElement>("." + styles.n));

    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      if (bar) bar.style.width = (y / max) * 100 + "%";
      if (nav) nav.classList.toggle(styles.navSolid, y > 40);
      const vh = window.innerHeight;
      const t = Math.min(1, y / vh);
      if (!reduce) {
        if (heroCopy) {
          heroCopy.style.transform = "translateY(" + t * -60 + "px)";
          heroCopy.style.opacity = (1 - t * 1.15).toFixed(3);
        }
        if (lhStage) {
          lhStage.style.transform =
            "translateY(" + t * 40 + "px) scale(" + (1 - t * 0.06).toFixed(3) + ")";
        }
      }
      if (hint) hint.style.opacity = y > 30 ? "0" : "0.9";
    };
    const onScrollRAF = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const reveal = () => {
      const vh = window.innerHeight;
      rvs.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.86 && r.bottom > vh * 0.05) el.classList.add(styles.in);
      });
    };

    let counted = false;
    const counts = () => {
      if (counted || !stat) return;
      const r = stat.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85) {
        counted = true;
        nums.forEach((el) => {
          const tg = +(el.getAttribute("data-c") || "0");
          if (reduce) {
            el.textContent = String(tg);
            return;
          }
          let t0: number | null = null;
          const stepFn = (ts: number) => {
            if (t0 === null) t0 = ts;
            const kf = Math.min(1, (ts - t0) / 1200);
            const e = 1 - Math.pow(1 - kf, 3);
            el.textContent = String(Math.round(e * tg));
            if (kf < 1) requestAnimationFrame(stepFn);
          };
          el.textContent = "0";
          requestAnimationFrame(stepFn);
        });
      }
    };

    if (reduce) {
      rvs.forEach((el) => el.classList.add(styles.in));
    }

    window.addEventListener("scroll", onScrollRAF, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("scroll", counts, { passive: true });
    onScroll();
    reveal();
    counts();
    const revealFallback = window.setTimeout(() => {
      rvs.forEach((el) => el.classList.add(styles.in));
    }, 2600);

    return () => {
      window.removeEventListener("scroll", onScrollRAF);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("scroll", counts);
      window.clearTimeout(revealFallback);
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.bar} ref={barRef} />

      <header className={styles.nav} ref={navRef as React.Ref<HTMLElement>}>
        <Link className={styles.brand} href="/test-home">
          <span className={styles.mark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/lighthouse-mark.svg" alt="Lighthouse" />
          </span>
          <div className={styles.wm}>
            Lighthouse<small>Daycare &amp; Montessori</small>
          </div>
        </Link>
        <nav className={styles.navlinks}>
          <Link href="/test-home" className={styles.on}>
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact" className={styles.navbtn}>
            Book trial →
          </Link>
        </nav>
        <button className={styles.burger} aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </header>

      {/* ===== PINNED HERO ===== */}
      <section className={styles.hero}>
        <div className={k("blob", "b1")} />
        <div className={k("blob", "b2")} />
        <div className={styles.heroWrap}>
          <div className={styles.heroCopy} ref={heroCopyRef}>
            <span className={styles.kicker}>✿ Est. 2019 · Twin Cities</span>
            <h1 className={styles.heroH1}>
              The brightest
              <br />
              <span className={styles.u}>
                part of every day.
                <svg viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path d="M4 14 Q 80 2 150 9 T 296 8" stroke="#FFD23F" strokeWidth="7" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className={styles.heroSub}>
              A daycare &amp; Montessori built around joyful play, real safety, and 22 teachers who
              genuinely love what they do.
            </p>
            <div className={styles.heroCta}>
              <Link className={k("btn", "btnSun")} href="/contact">
                ✿ Book a free visit
              </Link>
              <Link className={k("btn", "btnGhost")} href="/gallery">
                Take a tour →
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.s}>
                <b>22</b>
                <span>Teachers</span>
              </div>
              <div className={styles.s}>
                <b>5</b>
                <span>Nannies</span>
              </div>
              <div className={styles.s}>
                <b>7yrs</b>
                <span>Of trust</span>
              </div>
              <div className={styles.s}>
                <b>2mo+</b>
                <span>From age</span>
              </div>
            </div>
          </div>
          <div className={styles.lhStage} ref={lhStageRef}>
            <div className={styles.beam}>
              <i />
              <i className={styles.b} />
            </div>
            <div className={styles.lhGlow} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.lhSvg} src="/assets/lighthouse-mark-onred.svg" alt="Lighthouse Daycare & Montessori" />
          </div>
        </div>
        <div className={styles.scrolldown} ref={hintRef}>
          <div className={styles.m} />
          Scroll
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0 70 L0 34 Q 360 0 720 26 T 1440 30 L1440 70 Z" fill="#FBF4E6" />
          </svg>
        </div>
      </section>

      {/* ===== STACKED PANELS ===== */}
      <div className={styles.stack}>
        <section className={k("panel", "pCream")}>
          <div className={k("inner", "center")}>
            <div className={k("eyebrow", "rv")}>three pillars</div>
            <h2 className={k("h2", "rv", "d1")}>What holds up every Lighthouse day.</h2>
            <div className={styles.cards3}>
              <div className={k("card", "k1", "rv", "d1")}>
                <div className={styles.ic}>👩‍🏫</div>
                <h3>Always staffed</h3>
                <p>22 teachers and 5 professional nannies, every single day. Real eyes on every little one.</p>
              </div>
              <div className={k("card", "k2", "rv", "d2")}>
                <div className={styles.ic}>🧼</div>
                <h3>Spotlessly clean</h3>
                <p>Sanitization is the foundation — linen, toys, surfaces and bottles, cleaned daily.</p>
              </div>
              <div className={k("card", "k3", "rv", "d3")}>
                <div className={styles.ic}>🌱</div>
                <h3>Joyful Montessori</h3>
                <p>Self-directed play and hands-on materials, calibrated to your child&apos;s stage.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={k("panel", "pInk")}>
          <div className={styles.inner}>
            <div className={k("eyebrow", "rv")}>our promise</div>
            <h2 className={k("h2", "rv", "d1")} style={{ maxWidth: "760px" }}>
              Your child is <span style={{ color: "var(--coral)" }}>never</span> alone.
            </h2>
            <p className={k("lead", "rv", "d2")}>
              A home nanny may be unavailable any day — but our system never stops. Linen washed,
              meals supervised, every cuddle and nap monitored. That&apos;s the difference seven
              years of practice makes.
            </p>
            <div className={styles.statbar}>
              <div className={k("rv", "d1")}>
                <div className={styles.n} style={{ color: "var(--sun)" }} data-c="22">22</div>
                <div className={styles.l}>Trained teachers</div>
              </div>
              <div className={k("rv", "d2")}>
                <div className={styles.n} style={{ color: "var(--coral)" }} data-c="5">5</div>
                <div className={styles.l}>Professional nannies</div>
              </div>
              <div className={k("rv", "d3")}>
                <div className={styles.n} style={{ color: "var(--mint)" }} data-c="7">7</div>
                <div className={styles.l}>Years of trust</div>
              </div>
              <div className={k("rv", "d4")}>
                <div className={styles.n} style={{ color: "var(--sky)" }} data-c="100">100</div>
                <div className={styles.l}>% supervised</div>
              </div>
            </div>
          </div>
        </section>

        <section className={k("panel", "pSky")}>
          <div className={k("inner", "center")}>
            <div className={k("eyebrow", "rv")}>new · learning lounge</div>
            <h2 className={k("h2", "rv", "d1")} style={{ maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}>
              Because every child learns differently.
            </h2>
            <p className={k("lead", "rv", "d2")}>
              A dedicated program alongside our Montessori &amp; Daycare — gentle, inclusive support
              woven right into the day, so every child belongs from the very first morning.
            </p>
            <div className={k("heroCta", "rv", "d3")} style={{ justifyContent: "center", marginTop: "30px" }}>
              <Link className={k("btn", "btnSun")} href="/learning-lounge">
                Explore Learning Lounge →
              </Link>
            </div>
          </div>
        </section>

        <section className={k("panel", "pWhite")}>
          <div className={styles.inner}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div className={k("eyebrow", "rv")}>scrapbook</div>
                <h2 className={k("h2", "rv", "d1")}>Look at our day →</h2>
              </div>
              <Link className={k("btn", "btnWhite", "rv", "d2")} style={{ boxShadow: "0 10px 24px rgba(240,81,79,.18)" }} href="/gallery">
                Visit the gallery
              </Link>
            </div>
            <div className={styles.scrap}>
              <div className={k("polaroid", "rv", "d1")}>
                <div className={styles.ph}>
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#FFE27A,#FFB3A6)" }}>
                    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
                      <circle cx="80" cy="60" r="22" fill="#FFD23F" />
                      <g stroke="#FFD23F" strokeWidth="3" strokeLinecap="round">
                        <line x1="80" y1="20" x2="80" y2="32" />
                        <line x1="80" y1="88" x2="80" y2="100" />
                        <line x1="40" y1="60" x2="52" y2="60" />
                        <line x1="108" y1="60" x2="120" y2="60" />
                      </g>
                      <rect x="120" y="220" width="60" height="60" rx="6" fill="#5FB3F0" />
                      <rect x="190" y="240" width="40" height="40" rx="6" fill="#FF9E7B" />
                      <rect x="240" y="210" width="50" height="70" rx="6" fill="#8FD4AC" />
                      <circle cx="220" cy="150" r="28" fill="#FBF4E3" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cap}>circle time</div>
              </div>
              <div className={k("polaroid", "rv", "d2")}>
                <div className={styles.ph}>
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#FFB3A6,#FFE27A)" }}>
                    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
                      <ellipse cx="200" cy="180" rx="110" ry="80" fill="#FBF4E3" stroke="#373a3b" strokeWidth="3" />
                      <circle cx="150" cy="150" r="14" fill="#FF9E7B" />
                      <circle cx="190" cy="135" r="14" fill="#FFD23F" />
                      <circle cx="240" cy="140" r="14" fill="#8FD4AC" />
                      <circle cx="160" cy="200" r="14" fill="#5FB3F0" />
                      <circle cx="220" cy="220" r="14" fill="#F0514F" />
                      <rect x="100" y="80" width="8" height="100" rx="2" fill="#3A4756" transform="rotate(-25 104 130)" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cap}>paint day!</div>
              </div>
              <div className={k("polaroid", "rv", "d3")}>
                <div className={styles.ph}>
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#92CDF8,#C8EBD7 60%,#FFE27A)" }}>
                    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
                      <rect x="280" y="180" width="20" height="100" fill="#8B5A3C" />
                      <circle cx="290" cy="160" r="50" fill="#5BB484" />
                      <circle cx="265" cy="170" r="38" fill="#8FD4AC" />
                      <circle cx="315" cy="170" r="38" fill="#8FD4AC" />
                      <circle cx="120" cy="240" r="30" fill="#FF9E7B" />
                      <path d="M90 240 Q120 220 150 240" stroke="#fff" strokeWidth="3" fill="none" />
                      <path d="M90 240 Q120 260 150 240" stroke="#fff" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cap}>garden visit</div>
              </div>
            </div>
          </div>
        </section>

        <section className={k("panel", "pMint")}>
          <div className={k("inner", "center")}>
            <div className={k("eyebrow", "rv")}>three little packages</div>
            <h2 className={k("h2", "rv", "d1")}>Pick the rhythm that fits.</h2>
            <div className={styles.pkg}>
              <div className={k("pcard", "rv", "d1")}>
                <div className={styles.tier}>Half day</div>
                <div className={styles.hrs}>8–12</div>
                <div className={styles.d}>Mornings + lunch</div>
                <Link className={k("btn", "btnWhite")} style={{ boxShadow: "0 10px 24px rgba(240,81,79,.18)" }} href="/packages">
                  See pricing →
                </Link>
              </div>
              <div className={k("pcard", "feat", "rv", "d2")}>
                <div className={styles.tagm}>most popular</div>
                <div className={styles.tier}>School day</div>
                <div className={styles.hrs}>8–3</div>
                <div className={styles.d}>Our most popular</div>
                <Link className={k("btn", "btnWhite")} style={{ boxShadow: "0 10px 24px rgba(0,0,0,.14)" }} href="/packages">
                  See pricing →
                </Link>
              </div>
              <div className={k("pcard", "rv", "d3")}>
                <div className={styles.tier}>Full day</div>
                <div className={styles.hrs}>8–6</div>
                <div className={styles.d}>For working parents</div>
                <Link className={k("btn", "btnWhite")} style={{ boxShadow: "0 10px 24px rgba(240,81,79,.18)" }} href="/packages">
                  See pricing →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={k("panel", "pSun")}>
          <div className={k("inner", "center")}>
            <div className={k("eyebrow", "rv")} style={{ color: "#9a3b1e" }}>come say hi! ✿</div>
            <h2 className={k("h2", "rv", "d1")} style={{ color: "var(--ink)" }}>Free trial this week.</h2>
            <p className={k("lead", "rv", "d2")} style={{ color: "#5a3a26" }}>
              Bring your little one for a half-day. Walk through, meet the teachers, see the rooms —
              we&apos;ll WhatsApp confirm within the hour.
            </p>
            <div className={k("heroCta", "rv", "d3")} style={{ justifyContent: "center", marginTop: "26px" }}>
              <a className={styles.btn} style={{ background: "#25D366", color: "#fff" }} href="https://wa.me/923000000000" target="_blank" rel="noreferrer">
                💬 WhatsApp us
              </a>
              <Link className={k("btn", "btnWhite")} style={{ color: "var(--red)" }} href="/contact">
                Fill the form →
              </Link>
            </div>
          </div>
        </section>

        <footer className={styles.foot}>
          <div className={styles.inner}>
            <div>
              <Link className={styles.brand} href="/test-home" style={{ marginBottom: "14px" }}>
                <span className={styles.mark}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/lighthouse-mark.svg" alt="Lighthouse" />
                </span>
                <div className={styles.wm}>
                  Lighthouse<small>Daycare &amp; Montessori</small>
                </div>
              </Link>
              <p style={{ fontSize: "14px", lineHeight: 1.6, maxWidth: "280px" }}>
                Twin Cities&apos; favourite daycare and Montessori — caring for little ones from 2
                months onwards since 2019.
              </p>
            </div>
            <div>
              <h4>Pages</h4>
              <Link href="/test-home">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <h4>Hours</h4>
              <a style={{ pointerEvents: "none" }}>Mon — Sat</a>
              <a style={{ pointerEvents: "none", color: "#fff", fontWeight: 700 }}>7:00am — 6:00pm</a>
              <a style={{ pointerEvents: "none", fontSize: "12px" }}>Closed Sundays</a>
            </div>
            <div>
              <h4>Reach us</h4>
              <a href="https://wa.me/923000000000" target="_blank" rel="noreferrer">💬 WhatsApp +92 300 0000000</a>
              <a href="https://instagram.com/lighthousedaycare" target="_blank" rel="noreferrer">📷 @lighthousedaycare</a>
              <a>📍 Islamabad · Rawalpindi</a>
            </div>
          </div>
          <div className={k("inner", "bottom")}>
            <div>© 2026 Lighthouse Daycare &amp; Montessori.</div>
            <div className={styles.hand} style={{ color: "var(--sun)" }}>made with ✿ in the Twin Cities</div>
          </div>
        </footer>
      </div>

      <a className={styles.wa} href="https://wa.me/923000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff">
          <path d="M16 3 C 8.8 3 3 8.8 3 16 c 0 2.3 0.6 4.5 1.7 6.5 L 3 29 l 6.7 -1.7 c 1.9 1 4 1.6 6.3 1.6 c 7.2 0 13 -5.8 13 -13 S 23.2 3 16 3 z m 0 23.6 c -2 0 -4 -0.5 -5.7 -1.5 l -0.4 -0.2 l -4 1 l 1.1 -3.9 l -0.3 -0.4 c -1.1 -1.7 -1.6 -3.7 -1.6 -5.6 c 0 -6 4.9 -10.9 10.9 -10.9 s 10.9 4.9 10.9 10.9 s -4.9 10.6 -10.9 10.6 z m 6 -7.9 c -0.3 -0.2 -2 -1 -2.3 -1.1 c -0.3 -0.1 -0.5 -0.2 -0.8 0.2 c -0.2 0.3 -0.9 1.1 -1.1 1.4 c -0.2 0.2 -0.4 0.3 -0.7 0.1 c -0.3 -0.2 -1.4 -0.5 -2.6 -1.6 c -1 -0.9 -1.6 -2 -1.8 -2.3 c -0.2 -0.3 0 -0.5 0.1 -0.6 c 0.1 -0.1 0.3 -0.4 0.5 -0.5 c 0.2 -0.2 0.2 -0.3 0.3 -0.5 c 0.1 -0.2 0.1 -0.4 0 -0.5 c -0.1 -0.2 -0.8 -1.9 -1.1 -2.6 c -0.3 -0.7 -0.6 -0.6 -0.8 -0.6 c -0.2 0 -0.4 0 -0.7 0 c -0.2 0 -0.5 0.1 -0.8 0.4 c -0.3 0.3 -1 1 -1 2.5 c 0 1.5 1.1 2.9 1.2 3.1 c 0.2 0.2 2.2 3.4 5.4 4.7 c 0.8 0.3 1.4 0.5 1.8 0.7 c 0.8 0.2 1.5 0.2 2 0.1 c 0.6 -0.1 2 -0.8 2.2 -1.6 c 0.3 -0.8 0.3 -1.5 0.2 -1.6 c -0.1 -0.2 -0.3 -0.3 -0.6 -0.5 z" />
        </svg>
      </a>
    </div>
  );
}
