import "server-only";
import { cache } from "react";
import {
  getPublicSettings,
  listPhotos,
  listTestimonials,
  DEFAULT_PACKAGES,
  DEFAULT_PACKAGES_NOTE,
  type PhotoCategory,
  type Package,
} from "@/lib/admin-data";
import type { VideoRef } from "@/lib/video";
import { siteConfig } from "@/lib/site-config";

export interface SocialLink {
  href: string;
  handle: string;
}

export interface SiteSettings {
  /** Daycare name (admin-editable). */
  name: string;
  /** WhatsApp number as displayed, e.g. "+92 300 0000000". */
  phoneDisplay: string;
  /** Derived wa.me link from the number's digits. */
  phoneHref: string;
  /** Social profile links (admin-editable), with a display handle. */
  social: { instagram: SocialLink; facebook: SocialLink };
}

/** Derive a friendly @handle from a profile URL's first path segment. */
function handleFromUrl(url: string, fallback: string): string {
  try {
    const seg = new URL(url).pathname.split("/").filter(Boolean)[0];
    return seg ? `@${seg.replace(/^@/, "")}` : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Public-facing daycare details, sourced from the admin `settings` collection
 * with a static fallback so pages still render if the DB is unreachable.
 * `cache()` dedupes the DB hit across all server components in one request.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const fallbackSocial = {
    instagram: { href: siteConfig.social.instagram.href, handle: siteConfig.social.instagram.handle },
    facebook: { href: siteConfig.social.facebook.href, handle: siteConfig.social.facebook.handle },
  };
  try {
    const s = await getPublicSettings();
    const digits = (s.phone || "").replace(/[^0-9]/g, "");
    const ig = s.social.instagram || siteConfig.social.instagram.href;
    const fb = s.social.facebook || siteConfig.social.facebook.href;
    return {
      name: s.name || siteConfig.name,
      phoneDisplay: s.phone || siteConfig.whatsapp.display,
      phoneHref: digits ? `https://wa.me/${digits}` : siteConfig.whatsapp.href,
      social: {
        instagram: { href: ig, handle: handleFromUrl(ig, siteConfig.social.instagram.handle) },
        // Facebook pages read better as the business name than a URL slug.
        facebook: { href: fb, handle: s.name || siteConfig.social.facebook.handle },
      },
    };
  } catch {
    return {
      name: siteConfig.name,
      phoneDisplay: siteConfig.whatsapp.display,
      phoneHref: siteConfig.whatsapp.href,
      social: fallbackSocial,
    };
  }
});

export interface GalleryItem {
  src: string;
  cat: PhotoCategory;
  cap: string;
}

/** Photos for the public gallery — featured first, then saved order. Empty if DB is down. */
export const getGalleryPhotos = cache(async (): Promise<GalleryItem[]> => {
  try {
    const photos = await listPhotos();
    return photos
      .slice()
      .sort((a, b) => Number(b.featured) - Number(a.featured))
      .map((p) => ({ src: p.src, cat: p.cat, cap: p.cap }));
  } catch {
    return [];
  }
});

/**
 * Photos the admin selected for the home "Look at our day" strip (in saved order).
 * Empty if none are selected or the DB is down — the component then shows its
 * decorative fallback.
 */
export const getHomePhotos = cache(async (): Promise<GalleryItem[]> => {
  try {
    const photos = await listPhotos();
    return photos.filter((p) => p.home).map((p) => ({ src: p.src, cat: p.cat, cap: p.cap }));
  } catch {
    return [];
  }
});

/** Pricing tiers + note for the Packages page (and home peek). Falls back to defaults. */
export const getPackages = cache(async (): Promise<{ packages: Package[]; note: string }> => {
  try {
    const s = await getPublicSettings();
    return {
      packages: s.packages?.length ? s.packages : DEFAULT_PACKAGES,
      note: s.packagesNote || DEFAULT_PACKAGES_NOTE,
    };
  } catch {
    return { packages: DEFAULT_PACKAGES, note: DEFAULT_PACKAGES_NOTE };
  }
});

export interface PublicTestimonial {
  name: string;
  child: string;
  quote: string;
  duration: string;
  video: VideoRef | null;
}

/** Testimonials for the public gallery page. Empty if DB is down (component shows fallback). */
export const getPublicTestimonials = cache(async (): Promise<PublicTestimonial[]> => {
  try {
    const items = await listTestimonials();
    return items.map((t) => ({
      name: t.name,
      child: t.child,
      quote: t.quote,
      duration: t.duration,
      video: t.video ?? null,
    }));
  } catch {
    return [];
  }
});
