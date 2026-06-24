// Shared (client + server safe) video helpers for testimonial clips.

export type VideoType = "youtube" | "vimeo" | "cloudinary";

export interface VideoRef {
  type: VideoType;
  /** Embeddable URL (iframe src) for youtube/vimeo, or the file URL for cloudinary. */
  url: string;
  /** Thumbnail/poster image, when available. */
  posterUrl?: string;
  /** Cloudinary public_id — kept so the file can be deleted later. */
  publicId?: string;
}

/** Parse a pasted YouTube/Vimeo link into an embeddable VideoRef. Returns null if unrecognised. */
export function parseVideoLink(input: string): VideoRef | null {
  const s = (input || "").trim();
  if (!s) return null;

  const yt = s.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  if (yt) {
    return {
      type: "youtube",
      url: `https://www.youtube.com/embed/${yt[1]}`,
      posterUrl: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }

  const vm = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return { type: "vimeo", url: `https://player.vimeo.com/video/${vm[1]}` };
  }

  return null;
}
