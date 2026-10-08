import "server-only";
import { DEFAULT_PAGE_CONTENT, resolvePageContent, type PageContent } from "@/lib/page-content";
import { cache } from "react";
import {
  getPublicSettings,
  listPhotos,
  listTestimonials,
  listStaff,
  listRoutine,
  listFaqs,
  DEFAULT_PACKAGES,
  DEFAULT_PACKAGES_NOTE,
  DEFAULT_COMPARISON_COLUMNS,
  DEFAULT_COMPARISON_ROWS,
  DEFAULT_HOURS,
  DEFAULT_HOURS_NOTE,
  DEFAULT_HOURS_SHORT,
  DEFAULT_STAFF_HEADING,
  DEFAULT_STAFF_NOTE,
  DEFAULT_STAFF_FOOTNOTE,
  type PhotoCategory,
  type Package,
  type ComparisonColumn,
  type ComparisonRow,
  type Staff,
  type FaqGroup,
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
 * One shared, request-deduped read of the `settings` document.
 *
 * The name/phone, packages, and comparison table all live in that single doc,
 * so without this every consumer (layout, footer, CTA, packages cards,
 * comparison table) would issue its own `findOne` for the same data — three or
 * more round trips per page render. `cache()` collapses them into one.
 */
const settingsDoc = cache(getPublicSettings);

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
    const s = await settingsDoc();
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
    // Filtered in the database — this used to fetch the entire library and then
    // discard most of it in JS, which meant the home page paid for every photo.
    const photos = await listPhotos({ homeOnly: true });
    return photos.map((p) => ({ src: p.src, cat: p.cat, cap: p.cap }));
  } catch {
    return [];
  }
});

/** Pricing tiers + note for the Packages page (and home peek). Falls back to defaults. */
export const getPackages = cache(async (): Promise<{ packages: Package[]; note: string }> => {
  try {
    const s = await settingsDoc();
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

/**
 * Testimonials the admin selected for the home page video teaser (in saved order).
 * Empty if none are selected or the DB is down — the home teaser then renders nothing.
 */
export const getHomeTestimonials = cache(async (): Promise<PublicTestimonial[]> => {
  try {
    const items = await listTestimonials();
    return items
      .filter((t) => t.home)
      .map((t) => ({ name: t.name, child: t.child, quote: t.quote, duration: t.duration, video: t.video ?? null }));
  } catch {
    return [];
  }
});

export type StaffMember = Pick<Staff, "name" | "role" | "photo">;

/**
 * Team members for the About page, in saved order.
 *
 * `listStaff()` seeds the default team into the DB on first read, so these are
 * always real admin-editable rows — never hard-coded markup. An empty result
 * therefore means the admin deliberately removed everyone, and the section
 * hides itself rather than resurrecting the defaults.
 */
export const getStaff = cache(async (): Promise<StaffMember[]> => {
  try {
    const people = await listStaff();
    return people.map((s) => ({ name: s.name, role: s.role, photo: s.photo }));
  } catch {
    return [];
  }
});

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * FAQs for one page, in saved order. Seeded into the DB on first read, so these
 * are always admin-editable rows. Empty means the admin removed them all and the
 * section hides itself.
 */
export const getFaqs = cache(async (group: FaqGroup): Promise<FaqEntry[]> => {
  try {
    const all = await listFaqs();
    return all.filter((f) => f.group === group).map((f) => ({ q: f.q, a: f.a }));
  } catch {
    return [];
  }
});

export interface RoutineCard {
  title: string;
  subtitle: string;
}

/**
 * "A typical day" activity cards, in saved order. Seeded into the DB on first
 * read (see `ensureSeeded`), so these are always admin-editable rows. An empty
 * result means the admin removed them all, and the section hides itself.
 */
export const getRoutine = cache(async (): Promise<RoutineCard[]> => {
  try {
    const items = await listRoutine();
    return items.map((r) => ({ title: r.title, subtitle: r.subtitle }));
  } catch {
    return [];
  }
});

export interface GroupPhoto {
  /** Cacheable URL, or "" when no photo has been uploaded. */
  src: string;
  caption: string;
}

/** Team group photo for the About hero. `src` is "" when the admin hasn't set one. */
export const getGroupPhotoInfo = cache(async (): Promise<GroupPhoto> => {
  try {
    const s = await settingsDoc();
    return { src: s.groupPhoto || "", caption: s.groupPhotoCaption || "" };
  } catch {
    return { src: "", caption: "" };
  }
});

export interface OpeningHours {
  rows: { label: string; time: string }[];
  note: string;
  /** Compact one-liner for chips and branch cards. */
  short: string;
}

/** Admin-editable opening hours, used everywhere times are shown. */
export const getHours = cache(async (): Promise<OpeningHours> => {
  try {
    const s = await settingsDoc();
    return {
      rows: s.hours?.length ? s.hours : DEFAULT_HOURS,
      note: s.hoursNote ?? DEFAULT_HOURS_NOTE,
      short: s.hoursShort ?? DEFAULT_HOURS_SHORT,
    };
  } catch {
    return { rows: DEFAULT_HOURS, note: DEFAULT_HOURS_NOTE, short: DEFAULT_HOURS_SHORT };
  }
});

export interface StaffCopy {
  heading: string;
  note: string;
  footnote: string;
}

/** Admin-editable headline, side note and footnote around the team grid. */
export const getStaffCopy = cache(async (): Promise<StaffCopy> => {
  try {
    const s = await settingsDoc();
    return {
      heading: s.staffHeading ?? DEFAULT_STAFF_HEADING,
      note: s.staffNote ?? DEFAULT_STAFF_NOTE,
      footnote: s.staffFootnote ?? DEFAULT_STAFF_FOOTNOTE,
    };
  } catch {
    return { heading: DEFAULT_STAFF_HEADING, note: DEFAULT_STAFF_NOTE, footnote: DEFAULT_STAFF_FOOTNOTE };
  }
});

export interface ComparisonTableData {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}

/** The "Compare what's included" table shown on the Packages page. Falls back to defaults. */
export const getComparisonTable = cache(async (): Promise<ComparisonTableData> => {
  try {
    const s = await settingsDoc();
    return {
      columns: s.comparisonColumns?.length ? s.comparisonColumns : DEFAULT_COMPARISON_COLUMNS,
      rows: s.comparisonRows?.length ? s.comparisonRows : DEFAULT_COMPARISON_ROWS,
    };
  } catch {
    return { columns: DEFAULT_COMPARISON_COLUMNS, rows: DEFAULT_COMPARISON_ROWS };
  }
});

/** Editable page copy and visibility, with defaults for old or unavailable DBs. */
export const getPageContent = cache(async (): Promise<PageContent> => {
  try {
    return resolvePageContent(await settingsDoc());
  } catch {
    return { ...DEFAULT_PAGE_CONTENT };
  }
});

/** Keep branch card names, map captions, and accessible map titles consistent. */
export const getBranches = cache(async () => {
  const content = await getPageContent();
  return siteConfig.branches.map((branch, index) => ({
    ...branch,
    name: index === 0 ? content.branchOneName : content.branchTwoName,
  }));
});
