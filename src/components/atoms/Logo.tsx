import { cn } from "@/lib/utils";

export function Logo({ dark = true, className }: { dark?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      <svg width="40" height="40" viewBox="0 0 44 44" aria-hidden>
        <circle cx="22" cy="22" r="22" fill="#FFD23F" />
        <rect x="16" y="16" width="12" height="14" fill="#1F2A37" rx="2" />
        <rect x="19" y="20" width="6" height="6" fill="#FFD23F" />
        <path d="M22 8 L18 14 L26 14 Z" fill="#FF9E7B" />
      </svg>
      <div>
        <div
          className={cn(
            "font-display font-extrabold text-[18px] leading-none",
            dark ? "text-cream-50" : "text-ink-900"
          )}
        >
          Lighthouse
        </div>
        <div
          className={cn(
            "text-[10px] uppercase tracking-[0.12em] mt-[2px]",
            dark ? "text-cream-50/60" : "text-ink-500"
          )}
        >
          Daycare &amp; Montessori
        </div>
      </div>
    </div>
  );
}
