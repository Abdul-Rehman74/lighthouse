import { cn } from "@/lib/utils";
import { PhotoPlaceholder, type Scene } from "@/components/atoms/PhotoPlaceholder";

export function Polaroid({
  scene,
  caption,
  rotate,
  width = 240,
  tapeColor = "rgba(255, 210, 63, 0.6)",
  className,
  style,
}: {
  scene: Scene;
  caption: string;
  rotate: number;
  width?: number;
  tapeColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute bg-white pt-3 px-3 pb-9 shadow-soft-lg rounded-[4px]",
        "transition-transform duration-300 hover:!rotate-0 hover:scale-105",
        className
      )}
      style={{
        width,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <div
        className="absolute -top-2.5 h-[18px]"
        style={{
          left: width / 2 - 30,
          width: 60,
          background: tapeColor,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
        aria-hidden
      />
      <div className="w-full overflow-hidden rounded-[2px]" style={{ height: width }}>
        <PhotoPlaceholder scene={scene} className="w-full h-full" />
      </div>
      <div className="hand text-center mt-2.5 text-[18px] text-ink-900">{caption}</div>
    </div>
  );
}
