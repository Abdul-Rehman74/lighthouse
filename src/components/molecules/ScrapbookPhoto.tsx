import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoPlaceholder, type Scene } from "@/components/atoms/PhotoPlaceholder";

export function ScrapbookPhoto({
  scene,
  src,
  caption,
  rotate,
  tapeColor = "rgba(255, 210, 63, 0.6)",
  height = 240,
  className,
  onClick,
}: {
  /** Illustrated placeholder scene — used when no real photo `src` is provided. */
  scene?: Scene;
  /** Real uploaded photo URL/data-URL. Takes precedence over `scene`. */
  src?: string;
  caption: string;
  rotate: number;
  tapeColor?: string;
  height?: number;
  className?: string;
  /** Opens the photo in the lightbox. Only wired up when a real `src` is present. */
  onClick?: () => void;
}) {
  const clickable = Boolean(src && onClick);

  return (
    <div
      className={cn(
        "relative bg-white pt-3 px-3 pb-7 shadow-soft-md transition-all duration-300 hover:!rotate-0 hover:-translate-y-1 hover:shadow-soft-lg",
        clickable && "cursor-pointer",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `View photo: ${caption}` : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div
        className="absolute -top-2 left-1/2 -ml-[25px] w-[50px] h-4"
        style={{ background: tapeColor }}
        aria-hidden
      />
      <div className="overflow-hidden relative group" style={{ height }}>
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={caption} className="w-full h-full object-cover" />
            {clickable && (
              <div
                className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/20 transition-colors flex items-center justify-center"
                aria-hidden
              >
                <ZoomIn
                  size={26}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                />
              </div>
            )}
          </>
        ) : (
          <PhotoPlaceholder scene={scene ?? "play"} className="w-full h-full" />
        )}
      </div>
      {caption ? (
        <div className="hand text-center mt-2.5 text-[20px]">{caption}</div>
      ) : null}
    </div>
  );
}
