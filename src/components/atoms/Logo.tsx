import { cn } from "@/lib/utils";

export function Logo({ dark = true, className }: { dark?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: 44, height: 44, borderRadius: 12, background: "#FFFCF4" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/lighthouse-mark.svg"
          alt="Lighthouse"
          style={{ width: 26, height: "auto", display: "block" }}
        />
      </span>
      <div>
        <div
          className={cn(
            "brand-wordmark text-[21px] leading-none",
            dark ? "text-cream-50" : "text-ink-900"
          )}
          style={{ fontWeight: 600, letterSpacing: "0.03em" }}
        >
          LIGHTHOUSE
        </div>
        <div
          className={cn(
            "brand-wordmark text-[10px] uppercase mt-[3px]",
            dark ? "text-cream-50/65" : "text-ink-500"
          )}
          style={{ fontWeight: 600, letterSpacing: "0.18em" }}
        >
          Daycare &amp; Montessori
        </div>
      </div>
    </div>
  );
}
