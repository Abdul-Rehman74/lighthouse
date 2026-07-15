"use client";

import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { trackMetaEvent } from "@/lib/pixel";

type Kind = "whatsapp" | "instagram" | "facebook";

const styles: Record<Kind, { bg: string; Icon: typeof Instagram; label: string }> = {
  whatsapp: { bg: "#25D366", Icon: MessageCircle, label: "WhatsApp" },
  instagram: {
    bg: "linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)",
    Icon: Instagram,
    label: "Instagram",
  },
  facebook: { bg: "#1877F2", Icon: Facebook, label: "Facebook" },
};

export function SocialPill({ kind, href = "#" }: { kind: Kind; href?: string }) {
  const s = styles[kind];
  const { Icon } = s;
  return (
    <a
      aria-label={s.label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white transition-transform hover:-translate-y-0.5"
      style={{ background: s.bg }}
      onClick={kind === "whatsapp" ? () => trackMetaEvent("Contact", { method: "whatsapp" }) : undefined}
    >
      <Icon size={18} />
    </a>
  );
}
