"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFab() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={siteConfig.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-6 right-6 sm:bottom-7 sm:right-7 z-40 bg-[#25D366] text-white rounded-full flex items-center gap-2.5 cursor-pointer font-bold text-sm transition-all duration-300"
      style={{
        padding: hover ? "14px 22px 14px 18px" : "14px",
        boxShadow: "0 12px 28px rgba(37, 211, 102, 0.45)",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white" aria-hidden>
        <path d="M16 3 C 8.8 3 3 8.8 3 16 c 0 2.3 0.6 4.5 1.7 6.5 L 3 29 l 6.7 -1.7 c 1.9 1 4 1.6 6.3 1.6 c 7.2 0 13 -5.8 13 -13 S 23.2 3 16 3 z m 0 23.6 c -2 0 -4 -0.5 -5.7 -1.5 l -0.4 -0.2 l -4 1 l 1.1 -3.9 l -0.3 -0.4 c -1.1 -1.7 -1.6 -3.7 -1.6 -5.6 c 0 -6 4.9 -10.9 10.9 -10.9 s 10.9 4.9 10.9 10.9 s -4.9 10.6 -10.9 10.6 z m 6 -7.9 c -0.3 -0.2 -2 -1 -2.3 -1.1 c -0.3 -0.1 -0.5 -0.2 -0.8 0.2 c -0.2 0.3 -0.9 1.1 -1.1 1.4 c -0.2 0.2 -0.4 0.3 -0.7 0.1 c -0.3 -0.2 -1.4 -0.5 -2.6 -1.6 c -1 -0.9 -1.6 -2 -1.8 -2.3 c -0.2 -0.3 0 -0.5 0.1 -0.6 c 0.1 -0.1 0.3 -0.4 0.5 -0.5 c 0.2 -0.2 0.2 -0.3 0.3 -0.5 c 0.1 -0.2 0.1 -0.4 0 -0.5 c -0.1 -0.2 -0.8 -1.9 -1.1 -2.6 c -0.3 -0.7 -0.6 -0.6 -0.8 -0.6 c -0.2 0 -0.4 0 -0.7 0 c -0.2 0 -0.5 0.1 -0.8 0.4 c -0.3 0.3 -1 1 -1 2.5 c 0 1.5 1.1 2.9 1.2 3.1 c 0.2 0.2 2.2 3.4 5.4 4.7 c 0.8 0.3 1.4 0.5 1.8 0.7 c 0.8 0.2 1.5 0.2 2 0.1 c 0.6 -0.1 2 -0.8 2.2 -1.6 c 0.3 -0.8 0.3 -1.5 0.2 -1.6 c -0.1 -0.2 -0.3 -0.3 -0.6 -0.5 z" />
      </svg>
      <span
        className="overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300"
        style={{ maxWidth: hover ? 200 : 0, opacity: hover ? 1 : 0 }}
      >
        Chat with us
      </span>
    </a>
  );
}
