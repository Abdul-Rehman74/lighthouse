import { cn } from "@/lib/utils";

export function Star({
  className,
  color = "#FF9E7B",
  scale = 1,
  style,
}: {
  className?: string;
  color?: string;
  scale?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      className={cn("absolute pointer-events-none", className)}
      style={{ transform: `scale(${scale})`, ...style }}
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 2 L20 12 L30 14 L22 22 L24 32 L16 26 L8 32 L10 22 L2 14 L12 12 Z"
        fill={color}
      />
    </svg>
  );
}
