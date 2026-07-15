"use client";

import { trackMetaEvent } from "@/lib/pixel";

/** Plain WhatsApp anchor with Meta Pixel click tracking, for spots not using the Button atom. */
export function WhatsAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackMetaEvent("Contact", { method: "whatsapp" })}
    >
      {children}
    </a>
  );
}
