import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  color = "text-coral-400",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return <div className={cn("hand text-[22px] leading-none", color, className)}>{children}</div>;
}
