import { cn } from "@/lib/utils";
import { PhotoPlaceholder, type Scene } from "@/components/atoms/PhotoPlaceholder";

export function ScrapbookPhoto({
  scene,
  caption,
  rotate,
  tapeColor = "rgba(255, 210, 63, 0.6)",
  height = 240,
  className,
}: {
  scene: Scene;
  caption: string;
  rotate: number;
  tapeColor?: string;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative bg-white pt-3 px-3 pb-7 shadow-soft-md transition-all duration-300 hover:!rotate-0 hover:-translate-y-1 hover:shadow-soft-lg",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="absolute -top-2 left-1/2 -ml-[25px] w-[50px] h-4"
        style={{ background: tapeColor }}
        aria-hidden
      />
      <div className="overflow-hidden" style={{ height }}>
        <PhotoPlaceholder scene={scene} className="w-full h-full" />
      </div>
      <div className="hand text-center mt-2.5 text-[20px]">{caption}</div>
    </div>
  );
}
