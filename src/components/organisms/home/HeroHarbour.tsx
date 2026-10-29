"use client";

import { useId } from "react";
import { useHarbourMotion } from "./useHarbourMotion";
import styles from "./HeroHarbour.module.css";

/** Local vector artwork: each moving part stays independent of the hero copy. */
function HarbourChild({ x, y, scale = 1, girl = false, shirt = "#82BEA3", skin = "#DFA775", hair = "#40352E", later = false, waving = true }: {
  x: number; y: number; scale?: number; girl?: boolean;
  shirt?: string; skin?: string; hair?: string; later?: boolean; waving?: boolean;
}) {
  const childId = `child-${useId().replace(/:/g, "")}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#493F3B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={childId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFE1B7" /><stop offset=".45" stopColor={skin} /><stop offset="1" stopColor={skin} /></linearGradient>
      </defs>
      <ellipse cx="1" cy="76" rx="22" ry="4" fill="#344D43" opacity=".18" stroke="none" />
      {girl && <g fill={hair}><path d="M-12-7q-18 10-10 29l11-4ZM12-7q18 10 10 29l-11-4Z" /><path d="m-21 12 4-12m5 3-4 14m33-5-4-12" fill="none" stroke="#685044" /></g>}
      <path d="M-8 51v20M8 51v20" stroke={skin} strokeWidth="8" />
      <path d="M-9 49v10M8 49v10" stroke="#385A72" strokeWidth="11" />
      <path d="M-8 65v7M8 65v7" stroke="#FFF6E4" strokeWidth="8" />
      <path d="M-12 71q-6 5-1 6h10v-6ZM5 71v6h12q4-3-4-6Z" fill="#3B3937" />
      <path d="M-13 74h7m12 0h7" stroke="#A9957F" />
      <path d="M11 24q12 9 10 20" fill="none" stroke={skin} strokeWidth="8" />
      <path d="M10 24l8 9" stroke={shirt} strokeWidth="12" />
      <ellipse cx="20" cy="46" rx="4" ry="5" fill={`url(#${childId})`} />
      {waving ? <g transform="translate(-11 24)">
        <g className={`${styles.wave} ${later ? styles.waveLater : ""}`}>
          <path d="M0 0q-11-3-14-13l-3-12" fill="none" stroke="#493F3B" strokeWidth="9" />
          <path d="M0 0q-11-3-14-13l-3-12" fill="none" stroke={skin} strokeWidth="7" />
          <path d="M0 0l-8-6" stroke={shirt} strokeWidth="12" />
          <path d="M-20-24q-4-3-4-6 1-2 4 1l-2-8q1-3 3 0l2 6-1-9q2-3 3 1l1 8 2-7q2-2 2 1l-1 9q0 6-5 6Z" fill={`url(#${childId})`} strokeWidth=".8" />
        </g>
      </g> : <path d="M-11 24q-10 9-8 21" fill="none" stroke={skin} strokeWidth="8" />}
      <path d={girl ? "M-12 20q12-5 24 0l7 35q-19 6-38 0Z" : "M-12 20q12-5 24 0l3 30q-15 4-30 0Z"} fill={shirt} />
      <path d="M-12 28v20m24-20 2 19" stroke="#294D69" opacity=".3" />
      <path d="M-7 19 0 27 7 19l-3 12-4-4-4 4Z" fill="#FFFCF3" strokeWidth=".7" />
      <path d="m0 27-2 5 2 10 2-10Z" fill="#E4A244" stroke="none" />
      <path d="M6 35h6v7H6Z" fill="#F3C860" strokeWidth=".7" /><path d="M9 36v4m-2-2h4" stroke="#FFF7D2" strokeWidth=".8" />
      {girl && <path d="m-8 45-2 9m10-9v10m8-10 2 9" fill="none" opacity=".3" />}
      <path d="M-4 13v8q4 4 8 0v-8" fill={skin} />
      <ellipse cx="-15" cy="0" rx="3" ry="5" fill={skin} /><ellipse cx="15" cy="0" rx="3" ry="5" fill={skin} />
      <path d="M-15-9q1-14 15-14T15-9l-1 14q-3 14-14 14T-14 5Z" fill={`url(#${childId})`} />
      <path d={girl ? "M-15 1q-7-26 14-25 22-1 17 25l-5-12Q1-10-3-18q-3 11-12 14Z" : "M-15-1q-7-10-2-17l-5 1 8-8-1-5 9 4 7-5 3 5q17-2 14 19l-4 7-3-13-7 4 1-7-10 8-1-5Z"} fill={hair} stroke={hair} />
      <path d="M-11-16q8-8 18-4m-16 8 5-5" fill="none" stroke="#8B6446" opacity=".5" />
      <path d="M-9-3q3-2 6 0m6 0q3-2 6 0" fill="none" strokeWidth="1" />
      <ellipse cx="-6" cy="2" rx="2.2" ry="3" fill="#312D2C" stroke="none" /><ellipse cx="6" cy="2" rx="2.2" ry="3" fill="#312D2C" stroke="none" />
      <g fill="white" stroke="none"><circle cx="-6.6" cy="1" r=".8" /><circle cx="5.4" cy="1" r=".8" /></g>
      <path d="m0 3-1 4 2 .5" fill="none" stroke="#AA7359" strokeWidth=".8" />
      <path d="M-5 10q5 7 10 0Z" fill="#8D4A43" strokeWidth=".6" /><path d="M-3 10.5h6" stroke="#FFF5E3" strokeWidth="1.5" />
      <g fill="#E98E7C" stroke="none" opacity=".4"><ellipse cx="-10" cy="8" rx="3" ry="2" /><ellipse cx="10" cy="8" rx="3" ry="2" /></g>
      {girl && <g fill="#E8B54E" strokeWidth=".6"><path d="m-17-1-5-4v8l5-2 4 3v-7Zm34 0 5-4v8l-5-2-4 3v-7Z" /></g>}
    </g>
  );
}

function HarbourBoat({ id }: { id: string }) {
  const motion = useHarbourMotion();
  return (
          <g ref={motion.boat} transform="translate(840 740) scale(.9) translate(-157 -492)">
            <ellipse cx="158" cy="551" rx="124" ry="13" fill="#477E85" opacity=".19" />
            <g className={styles.wake} fill="none" stroke="#EFF8ED" strokeLinecap="round"><path d="M44 536q-29 12 15 23m184-28q48 13 12 26M58 566q76 21 169 4" strokeWidth="3" /><path d="M25 552q-8 15 38 20m178-7 29-7" strokeWidth="1.5" /></g>
            {/* Open wooden interior, a raised bow, and a shaded clinker-built hull. */}
            <path d="M49 478Q119 437 248 454l24 17-30 66q-96 45-176-1Z" fill={`url(#${id}-hull)`} stroke="#6E4439" strokeWidth="2.5" />
            <path d="M49 478q74 37 223-7l-8 18q-122 43-209 7Z" fill="#FFF1D4" />
            <path d="m61 519 5 17q82 43 176 1l6-14q-105 37-187-4Z" fill="#F6E6C9" />
            <path d="M69 542q75 32 166 0M58 505q85 38 200-2" fill="none" stroke="#793F35" strokeWidth="1.5" opacity=".65" />
            <path d="M49 478Q129 435 248 454l24 17Q135 520 49 478Z" fill="#E8BC85" stroke="#805A40" strokeWidth="2" />
            <path d="M65 478q75-31 178-16l13 9q-116 36-191 7Z" fill="#A65C44" stroke="#774838" strokeWidth="1.5" />
            <path d="m79 481 10-10 111-3 32 10-58 16Z" fill="#C89663" />
            <path d="m94 478 100-4m-88 10 104-6m-81 12 43-3" stroke="#9E704B" fill="none" />
            <path d="m95 470 30-7 85 20-30 8Z" fill="#E0B17A" stroke="#79533D" strokeWidth="1.5" />
            <path d="m102 470 80 18m-66-21 80 18" stroke="#B58353" />
            {/* A seated child looks toward the children on the island. */}
            <path d="M142 450q30-8 47 6l21 24q-1 8-17 9l-28-12-28-4Z" fill="#456A82" stroke="#344E61" strokeWidth="2" />
            <path d="M137 404q22-10 40 4l10 44q-25 20-52 0Z" fill="#507E9B" stroke="#344E61" strokeWidth="2" />
            <g ref={motion.arm}>
            <path d="M176 413q9 11 9 28l16 12q5 5-1 7l-23-13-8-27" fill="#E8B48D" stroke="#966D54" strokeWidth="1.5" />
            <path d="M169 407q13-1 15 16l-14 5-8-15Z" fill="#FFF0D5" stroke="#A9A58A" strokeWidth="1.5" />
            <path d="m198 451 5-2m-3 4 6-1m-5 3 5 1" fill="none" stroke="#966D54" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <path d="M151 394v16l14 2 2-20" fill="#E5AA7C" stroke="#966D54" strokeWidth="1.5" />
            <g ref={motion.head}>
            <path d="M132 369q6-23 29-16 24 7 21 30l-4 6q-1 14-15 15-24-5-31-35Z" fill="#EBC099" stroke="#966D54" strokeWidth="1.5" />
            <g transform="translate(163 397) scale(.82 .8) translate(-163 -397)">
            <path d="M128 390q-13-9-14-24l-3 5q-3-15 4-24l-6 2q5-9 15-12l-1-7 7 5q9-8 21-9l-4 5q19-4 32 7l-6-1q15 8 16 24l-5-5q4 14-3 25l-3-14-5 8-1-9q-4 9-8 12l1 12-6-3-2 8-5-3-5 5-4-4-4 2-3-5-4 1Z" fill={`url(#${id}-boat-hair)`} stroke="#513B2B" strokeWidth="1.5" strokeLinejoin="round" />
            <g fill="none" strokeLinecap="round">
              <path d="M127 344q13-13 30-9m-20 11q15-9 30-3m-24 8q16-5 29 8m-24-2q13 4 17 15" stroke="#B48A59" strokeWidth="1.5" opacity=".65" />
              <path d="M126 350q-9 11-3 24m10-19q-7 14 0 25m7-18q-3 17 5 25m5-22q8 11 4 24m8-42q14 4 19 16" stroke="#503B2B" strokeWidth="1.2" opacity=".5" />
              <path d="M118 355q0-10 9-14m5 0q12-8 25-7m15 9 8 7" stroke="#D1A872" strokeWidth="1" opacity=".6" />
            </g>
            </g>
            <path d="M171 379q3-6 7-2 3 5-2 10l-4 1" fill="#E6B18A" stroke="#A57553" strokeWidth="1.1" />
            <path d="M174 380q3-2 1 4" fill="none" stroke="#AF7D5A" strokeWidth="1" />
            </g>
            <path d="M133 406q-9 15-4 41m29-41q11 16 9 40" fill="none" stroke="#D8AD4F" strokeWidth="6" />
            <path d="M132 411q-9 0-10 12l-2 30q1 13 25 14 17-1 18-12l-2-29q-1-15-12-15Z" fill="#DDB14E" stroke="#846A39" strokeWidth="1.8" />
            <path d="M132 412v-5q10-9 17 1v4" fill="none" stroke="#846A39" strokeWidth="3" />
            <path d="M128 424q13-5 27 0v13q-13 7-27 0Z" fill="#F2CC70" stroke="#A57E3C" strokeWidth="1.2" />
            <path d="M125 446q15 5 34 0v11q-16 9-34-1Z" fill="#557D91" stroke="#846A39" strokeWidth="1.2" />
            <path d="M130 447h21" stroke="#EBD28E" strokeWidth="2" /><circle cx="152" cy="449" r="1.5" fill="#FFE2A0" />
            <path d="M69 483q23 10 51 11m116-16 23-7" fill="none" stroke="#FFF0CE" strokeWidth="3" strokeLinecap="round" />
            <path d="m251 491 2 12" stroke="#E9C78E" strokeWidth="3" /><path d="M253 503q18 15 8 27" fill="none" stroke="#C6A878" strokeWidth="2" />
          </g>
  );
}

export function HeroHarbour() {
  const id = `harbour-${useId().replace(/:/g, "")}`;
  return (
    <div className={styles.scene}>
      <svg className={styles.art} viewBox="0 0 1440 840" role="img" aria-label="Welcome to the Lighthouse harbour" aria-describedby={`${id}-description`}>
        <desc id={`${id}-description`}>A coastal scene fills the hero. Two children wave at the foot of the original Lighthouse tower as a seated child travels across the water in a red boat.</desc>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#E7F1EF" /><stop offset=".7" stopColor="#FFF1D4" /><stop offset="1" stopColor="#FFE7B9" />
          </linearGradient>
          <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#A1C8C8" /><stop offset=".28" stopColor="#79B3BA" /><stop offset=".65" stopColor="#609FAE" /><stop offset="1" stopColor="#478A9E" />
          </linearGradient>
          <clipPath id={`${id}-water-clip`}><path d="M0 544q180-13 360 0t360 0 360 0 360 0v296H0Z" /></clipPath>
          <radialGradient id={`${id}-sun-water`}><stop stopColor="#FFE5A0" stopOpacity=".38" /><stop offset=".55" stopColor="#FFECB3" stopOpacity=".12" /><stop offset="1" stopColor="#FFE5A0" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-beam`} x1="1" y1="0" x2="0" y2="0">
            <stop stopColor="#FFD23F" stopOpacity=".5" /><stop offset="1" stopColor="#FFD23F" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${id}-tower-crop`}><path d="M1030 130h270v364h-270Z" /></clipPath>
          <radialGradient id={`${id}-boat-hair`} cx="65%" cy="20%" r="85%"><stop stopColor="#9D734B" /><stop offset=".5" stopColor="#795334" /><stop offset="1" stopColor="#503A2B" /></radialGradient>
          <linearGradient id={`${id}-hull`} x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#DC7355" /><stop offset=".5" stopColor="#BE4D3F" /><stop offset="1" stopColor="#843F39" /></linearGradient>
          <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#D8C5A0" /><stop offset=".5" stopColor="#A99E83" /><stop offset="1" stopColor="#797F72" /></linearGradient>
          <radialGradient id={`${id}-glow`}><stop stopColor="#FFFBD1" stopOpacity=".95" /><stop offset=".3" stopColor="#FFE57C" stopOpacity=".55" /><stop offset="1" stopColor="#FFD65E" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-beam-right`}><stop stopColor="#FFE7A0" stopOpacity=".6" /><stop offset="1" stopColor="#FFE7A0" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M0 0h1440v840H0Z" fill={`url(#${id}-sky)`} />
        <circle cx="810" cy="354" r="86" fill="#FFE69A" opacity=".45" />
        <circle cx="810" cy="354" r="63" fill="#FFDF91" />
        <g fill="#FFFCF3" opacity=".85">
          <g className={styles.cloud}><path d="M180 148q-5-14 10-17 6-22 25-12 15-8 22 8 21-3 23 15 0 7-12 7h-60Z" /></g>
          <g className={`${styles.cloud} ${styles.cloudLater}`}><path d="M779 192q-6-20 16-24 9-30 36-17 23-12 33 11 31-4 34 22 0 10-18 10h-89Z" /></g>
          <g className={styles.cloud}><path d="M1250 294q-4-12 10-15 5-18 22-11 16-7 23 11 24-4 26 14 0 8-13 8h-57Z" /></g>
        </g>
        <path d="M0 510q160-58 320-13t320-2 320 4 480-8v98H0Z" fill="#CDD9CA" opacity=".75" />
        <g fill="none" stroke="#6D8C91" strokeWidth="2.5" strokeLinecap="round">
          <path d="M884 326q9-10 18 0 9-10 18 0M953 284q6-7 12 0 6-7 12 0" />
        </g>
        <g className={styles.beam}>
          <path d="M1165 260 690 125v280l475-133Z" fill={`url(#${id}-beam)`} />
          <path d="M1165 260 1440 180v185l-275-93Z" fill={`url(#${id}-beam-right)`} />
        </g>
        <path d="M0 544q180-13 360 0t360 0 360 0 360 0v296H0Z" fill={`url(#${id}-sea)`} />
        <g clipPath={`url(#${id}-water-clip)`}>
          <ellipse cx="809" cy="681" rx="160" ry="193" fill={`url(#${id}-sun-water)`} />
          {/* Broken, tapered ripples grow toward the viewer to give the water depth. */}
          {[0, 1].map((layer) => (
            <g key={layer} className={layer ? styles.waterLater : styles.water}>
              {Array.from({ length: 72 }, (_, index) => {
                const row = Math.floor(index / 8);
                const column = index % 8;
                const depth = row / 8;
                const x = column * 190 + ((row * 73 + column * 29 + layer * 91) % 140) - 70;
                const y = 551 + row * row * 3.9 + layer * 11;
                const width = 18 + depth * 65 + (index * 17 % 38);
                const height = 1.2 + depth * 3;
                return (
                  <g key={index}>
                    <path d={`M${x} ${y + 4}q${width * .3} ${height * 2} ${width} 0q${-width * .4} ${height * 3} ${-width} 0Z`} fill="#276C85" opacity={.09 + depth * .07} />
                    <path d={`M${x} ${y}q${width * .45} ${height} ${width} 0q${-width * .3} ${height * 2.2} ${-width} 0Z`} fill={layer ? "#D7EEE4" : "#B8DEDA"} opacity={.23 + (index % 4) * .07} />
                  </g>
                );
              })}
            </g>
          ))}
          <g className={styles.reflection} fill="#FFE6A4">
            {Array.from({ length: 27 }, (_, index) => {
              const depth = index / 26;
              const y = 548 + depth * depth * 282;
              const width = 12 + depth * 64 + (index * 13 % 29);
              const x = 810 - width / 2 + Math.sin(index * 2.4) * (12 + depth * 48);
              return <path key={index} d={`M${x} ${y}q${width * .35} -2 ${width} 0l${-width * .2} ${1 + depth * 3}q${-width * .45} -1 ${-width * .8} 0Z`} opacity={.8 - depth * .4} />;
            })}
          </g>
          <g className={styles.shoreline} fill="none" strokeLinecap="round">
            <path d="M918 582q87 27 202 17 145 15 231-17" stroke="#3F8290" strokeWidth="13" opacity=".22" />
            <path d="M921 582q87 22 199 12 145 14 228-12" stroke="#DDEEE3" strokeWidth="3" opacity=".65" />
            <path d="M948 600q45 9 90 5m183 2q51 2 92-11" stroke="#DDEEE3" strokeWidth="1.5" opacity=".45" />
          </g>
        </g>
        <ellipse cx="1145" cy="583" rx="218" ry="19" fill="#4B8289" opacity=".22" />
        <path d="M922 567 947 536 974 514 1017 507 1048 484 1103 479 1140 488 1184 475 1238 491 1282 515 1310 543 1349 575Q1240 601 1140 589 1010 602 922 581Z" fill={`url(#${id}-rock)`} stroke="#8C907A" strokeWidth="1.5" />
        <g fill="none" stroke="#777F70" strokeWidth="2" opacity=".55"><path d="m948 568 28-37 31 1 23 43m-23-43 19-22m17 69 32-44 31 8 13 42m-44-50 7-33m40 81 35-49 33 6 18 44m-18-44 21-32m6 80 34-39 28 8 13 31m-13-31 3-24" /></g>
        <path d="m975 518 44-14 31-22 55-6 37 8 39-13 57 18 40 24-31 10-42-7-53 11-46-8-48 10-47-1Z" fill="#8CAB7C" />
        <path d="m1039 503 39-15 28 5 34 20-47 20-32-6Z" fill="#D8C59D" />
        {/* A solid plinth and contact shadow anchor the original tower to the island. */}
        <ellipse cx="1164" cy="515" rx="126" ry="15" fill="#465D47" opacity=".25" />
        <path d="M1050 490 1278 490 1290 509 1278 519 1050 519 1038 509Z" fill="#B9B09A" stroke="#7D8273" strokeWidth="2" />
        <path d="m1050 490-12 19h252l-12-19Z" fill="#DFD4B8" />
        <image href="/assets/lighthouse-mark.svg" x="1030" y="130" width="270" height="420" clipPath={`url(#${id}-tower-crop)`} />
        <g className={styles.lantern}>
          <circle cx="1165" cy="266" r="49" fill={`url(#${id}-glow)`} />
          <path d="M1157 279v-16q0-13 8-13t8 13v16Z" fill="#FFF2AA" opacity=".85" />
          <path d="M1162 275v-12q0-6 3-6" fill="none" stroke="#FFFBE6" strokeWidth="3" strokeLinecap="round" />
        </g>
        <HarbourChild x={992} y={459} scale={1.05} shirt="#527D99" />
        <HarbourChild x={1050} y={464} scale={1} girl shirt="#638C9F" skin="#BD815F" hair="#342C2B" later />
        <g fill="none" stroke="#5F825B" strokeWidth="2" strokeLinecap="round"><path d="m1283 523-4-15m4 15 7-12m-7 12 13-4m-332 13-3-12m3 12 6-8m238-21-3-11m3 11 7-8" /></g>
        <HarbourBoat id={id} />

      </svg>

    </div>
  );
}
