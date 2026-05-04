import { cn } from "@/lib/utils";

export function TiltCard({
  bg,
  rotate = 0,
  children,
  dashed = true,
  className,
  style,
}: {
  bg: string;
  rotate?: number;
  children: React.ReactNode;
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] p-8 transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1",
        dashed && "border-2 border-dashed border-ink-900/15",
        className
      )}
      style={{
        background: bg,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
