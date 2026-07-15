"use client";

import { Button, type ButtonProps } from "@/components/atoms/Button";
import { trackMetaEvent } from "@/lib/pixel";

/** WhatsApp CTA — Button's "whatsapp" variant with Meta Pixel click tracking wired in. */
export function WhatsAppButton({
  href,
  children,
  size,
  className,
}: {
  href: string;
  children: React.ReactNode;
  size?: ButtonProps["size"];
  className?: string;
}) {
  return (
    <Button asChild variant="whatsapp" size={size} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackMetaEvent("Contact", { method: "whatsapp" })}
      >
        {children}
      </a>
    </Button>
  );
}
