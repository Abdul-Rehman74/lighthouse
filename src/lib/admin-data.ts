import "server-only";
import { PACKAGE_COPY, resolvePackageCopy } from "@/lib/package-copy";
import { DEFAULT_PAGE_CONTENT, resolvePageContent, type PageContent } from "@/lib/page-content";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { siteConfig } from "@/lib/site-config";
import type { VideoRef } from "@/lib/video";

/* ----------------------------- Types (serializable) ----------------------------- */

export type SubmissionStatus = "new" | "contacted" | "booked" | "closed";

export interface Submission {
  id: string;
  parent: string;
  child: string;
  age: string;
  date: string;
  phone: string;
  package?: string;
  msg: string;
  status: SubmissionStatus;
  notes: string;
  source?: string;
  ts: number;
}

export type PhotoCategory = "Play" | "Learning" | "Outdoor" | "Meals" | "Art" | "Naps";

export interface Photo {
  id: string;
  src: string;
  cat: PhotoCategory;
  cap: string;
  featured: boolean;
  /** Selected to appear in the home page "Look at our day" strip. */
  home: boolean;
  order: number;
  ts: number;
}

export interface Testimonial {
  id: string;
  name: string;
  child: string;
  quote: string;
  duration: string;
  video?: VideoRef | null;
  /** Selected to appear in the home page video testimonials teaser. */
  home: boolean;
  ts: number;
}

/** A team member shown in the About page "the people" section. */
export interface Staff {
  id: string;
  name: string;
  /** Job title, e.g. "Vice Principal". May be empty. */
  role: string;
  /** Optional photo as a base64 data URL. When set it replaces the initials avatar. */
  photo: string;
  order: number;
  ts: number;
}

/**
 * Seed team, shown until the admin adds their own.
 * Ids are stable slugs so the fallback list is deterministic.
 */
export const DEFAULT_STAFF: Staff[] = [
  { id: "amira-malik", name: "Ms. Amira Malik", role: "Founder and Principal", photo: "", order: 0, ts: 0 },
  { id: "zeba", name: "Ms. Zeba", role: "Vice Principal", photo: "", order: 1, ts: 0 },
  { id: "aisha-malik", name: "Ms. Aisha Malik", role: "", photo: "", order: 2, ts: 0 },
  { id: "ayesha-irfan", name: "Ms. Ayesha Irfan", role: "Senior Coordinator", photo: "", order: 3, ts: 0 },
  { id: "maha-zaigham", name: "Ms. Maha Zaigham", role: "Legal Advisor", photo: "", order: 4, ts: 0 },
  { id: "bashir", name: "Dr. Bashir", role: "School Psychologist & Speech-Language Specialist", photo: "", order: 5, ts: 0 },
  { id: "mehpara-qadir", name: "Ms. Mehpara Qadir", role: "Curriculum Development & Media Coordinator", photo: "", order: 6, ts: 0 },
];

/** A card in the About page "a typical day" grid. */
export interface RoutineItem {
  id: string;
  /** Activity name — the bold line on the card. */
  title: string;
  /** Optional supporting line under it. Empty by default. */
  subtitle: string;
  order: number;
  ts: number;
}

/** Seed activities, shown until the admin edits them. Subtitles start empty. */
export const DEFAULT_ROUTINE: { title: string; subtitle: string }[] = [
  "Circle time",
  "Yoga",
  "Music",
  "Zumba",
  "Creative Skills",
  "DIYs",
  "STEM through Art",
  "Table Etiquette",
  "Nature Time",
  "Mind Games",
  "Public Speaking",
].map((title) => ({ title, subtitle: "" }));

/** Which page an FAQ belongs to. Both sets live in one collection. */
export type FaqGroup = "about" | "packages";

export interface Faq {
  id: string;
  group: FaqGroup;
  /** Question. */
  q: string;
  /** Answer. */
  a: string;
  order: number;
  ts: number;
}

/** Seed FAQs for the About page accordion. */
export const DEFAULT_FAQS_ABOUT: { q: string; a: string }[] = [
  { q: "What ages do you accept?", a: "We welcome children from 2 months onwards. Our rooms are organized by age — infants, toddlers, and pre-K — so each child gets care tuned to their stage." },
  { q: "What are your timings?", a: "We are open Monday to Friday, 8:00 AM to 7:00 PM, and Saturdays 8:00 AM to 2:00 PM. We are closed on Sundays and gazetted holidays." },
  { q: "How do you handle hygiene and sanitization?", a: "Sanitization is on a strict daily checklist — linen, toys, surfaces, bottles, and meal areas. Our health & hygiene lead supervises all protocols, and meals are prepared and served under supervision." },
  { q: "How many teachers and nannies are on staff?", a: "We have 22 trained teachers and 5 professional nannies — a teacher-to-child ratio that means real eyes on every little one, all day." },
  { q: "Do you offer a free trial?", a: "Yes — bring your child in for a half-day visit, free of charge. Walk through, meet the teachers, see the rooms. WhatsApp us or fill the form on the Contact page." },
  { q: "How do you communicate with parents?", a: "Most communication is through WhatsApp — instant updates, photos and quick check-ins. We also share photos and updates on our Instagram and Facebook pages." },
  { q: "What is your Montessori approach?", a: "Self-directed play with carefully chosen hands-on materials, calibrated to your child's developmental stage. We blend structured circle time with open exploration." },
  { q: "Where are you located?", a: "We have two branches in Rawalpindi. See the Contact page for addresses and a map." },
];

/** Seed FAQs for the Packages page strip. */
export const DEFAULT_FAQS_PACKAGES: { q: string; a: string }[] = [
  { q: "Do you accept payment monthly?", a: "Yes — we bill monthly. Annual payment gets a 5% discount." },
  { q: "Is there a registration or admission fee?", a: "No registration fee. Just the monthly fee for your chosen package." },
  { q: "Can I switch packages later?", a: "Yes — switch anytime with one month's notice. Many parents start with Half day and move to School day." },
  { q: "Do you offer sibling discount?", a: "Yes — 10% off the monthly fee for the second child." },
];

/**
 * URL the About hero uses for the team group photo. Static (there's only ever
 * one), with a cache-buster appended at read time so a re-upload shows through.
 */
export const GROUP_PHOTO_URL = "/api/group-photo";

/** One line of the opening-hours table, e.g. { label: "Mon – Fri", time: "8:00am – 7:00pm" }. */
export interface HoursRow {
  label: string;
  time: string;
}

export const DEFAULT_HOURS: HoursRow[] = [
  { label: "Mon – Fri", time: "8:00am – 7:00pm" },
  { label: "Saturday", time: "8:00am – 2:00pm" },
];
export const DEFAULT_HOURS_NOTE = "Closed Sundays & gazetted holidays";
/** Compact one-liner for tight spots (nav chips, branch cards) where the table won't fit. */
export const DEFAULT_HOURS_SHORT = "Mon–Sat · 8am–7pm";

export const DEFAULT_STAFF_HEADING = "Meet our Team";
export const DEFAULT_STAFF_NOTE =
  "Every team member is trained in early childhood care, first aid, and our hygiene protocols.";
export const DEFAULT_STAFF_FOOTNOTE =
  "+ 16 more teachers across our Toddler, Pre-K and Montessori rooms · Meet everyone on your visit";

/** Social profile URLs shown in the site footer and contact page. */
export interface SocialLinks {
  instagram: string;
  facebook: string;
}

/** A pricing tier shown on the public Packages page. */
export interface Package {
  id: string;
  /** Heading, e.g. "Half day". */
  label: string;
  /** Timing, e.g. "8 — 12". */
  hours: string;
  /** Short subtitle, e.g. "Mornings + lunch". */
  sub: string;
  /** Monthly price, e.g. "22,000". */
  price: string;
  features: string[];
  /** Render as the highlighted "most popular" tier. */
  highlight: boolean;
}

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: "half",
    ...PACKAGE_COPY.half,
    price: "22,000",
    highlight: false,
    features: ["Breakfast & morning snack", "Hot lunch supervised", "Montessori circle", "Outdoor play time"],
  },
  {
    id: "school",
    ...PACKAGE_COPY.school,
    price: "25,000",
    highlight: true,
    features: ["Everything in Half-Day Discovery Package", "Afternoon nap", "Art & sensory time", "Pre-K readiness activities"],
  },
  {
    id: "full",
    ...PACKAGE_COPY.full,
    price: "28,000",
    highlight: false,
    features: ["Everything in Extended Day Package", "Afternoon outdoor play", "Evening snack", "Late pickup until 7pm"],
  },
];

export const DEFAULT_PACKAGES_NOTE =
  "Sibling discount: 10% off the second child · Annual payment: 5% off · No registration fee";

/** A column header in the "Compare what's included" table on the Packages page. */
export interface ComparisonColumn {
  label: string;
  /** Renders this column highlighted (star + tinted cells), e.g. the "most popular" tier. */
  highlight: boolean;
}

/** A row in the comparison table — one value per column, aligned by index. */
export interface ComparisonRow {
  label: string;
  values: string[];
}

export const DEFAULT_COMPARISON_COLUMNS: ComparisonColumn[] = [
  { label: "Half day", highlight: false },
  { label: "School day ⭐", highlight: true },
  { label: "Full day", highlight: false },
];

export const DEFAULT_COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Hours", values: ["8am – 12pm", "8am – 3pm", "8am – 6pm"] },
  { label: "Breakfast", values: ["✓", "✓", "✓"] },
  { label: "Hot lunch", values: ["✓", "✓", "✓"] },
  { label: "Afternoon nap", values: ["—", "✓", "✓"] },
  { label: "Art & sensory", values: ["—", "✓", "✓"] },
  { label: "Outdoor play (am)", values: ["✓", "✓", "✓"] },
  { label: "Outdoor play (pm)", values: ["—", "—", "✓"] },
  { label: "Evening snack", values: ["—", "—", "✓"] },
  { label: "WhatsApp updates", values: ["✓", "✓", "✓"] },
  { label: "Monthly fee (Rs.)", values: ["22,000", "25,000", "28,000"] },
];

export interface AdminSettings extends PageContent {
  name: string;
  phone: string;
  layout: "sidebar" | "topnav";
  /** Inboxes that receive new booking notifications. Falls back to MAIL_TO env when empty. */
  notifyEmails: string[];
  /** Social profile URLs (admin-editable), used across the public site. */
  social: SocialLinks;
  /** Pricing tiers shown on the Packages page. */
  packages: Package[];
  /** Small print under the package cards. */
  packagesNote: string;
  /** Column headers for the "Compare what's included" table. */
  comparisonColumns: ComparisonColumn[];
  /** Rows for the "Compare what's included" table. */
  comparisonRows: ComparisonRow[];
  /**
   * Team group photo shown in the About page hero, as a base64 data URL.
   * Empty means fall back to the illustrated polaroid collage.
   * Served via `/api/group-photo` so the blob never enters page HTML.
   */
  groupPhoto: string;
  /** Caption/alt text for the group photo. */
  groupPhotoCaption: string;
  /** Opening-hours rows shown in the footer, contact page and FAQ. */
  hours: HoursRow[];
  /** Small print under the hours, e.g. closures. */
  hoursNote: string;
  /** Compact one-liner for chips and branch cards. */
  hoursShort: string;
  /** Headline above the About page team grid, e.g. "Meet our Team". */
  staffHeading: string;
  /** Small print beside that headline. */
  staffNote: string;
  /** Line under the team grid. */
  staffFootnote: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ----------------------------- Collections ----------------------------- */

async function col(name: string) {
  const db = await getDb();
  return db.collection(name);
}

/* ----------------------------- Settings ----------------------------- */

interface SettingsDoc extends Partial<PageContent> {
  packagesCopyVersion?: number;
  _id: string;
  passwordHash: string;
  name: string;
  phone: string;
  layout: "sidebar" | "topnav";
  notifyEmails?: string[];
  social?: Partial<SocialLinks>;
  packages?: Package[];
  packagesNote?: string;
  comparisonColumns?: ComparisonColumn[];
  comparisonRows?: ComparisonRow[];
  groupPhoto?: string;
  groupPhotoCaption?: string;
  hours?: HoursRow[];
  hoursNote?: string;
  hoursShort?: string;
  staffHeading?: string;
  staffNote?: string;
  staffFootnote?: string;
  /** Set once DEFAULT_STAFF has been copied into the `staff` collection. */
  staffSeeded?: boolean;
  /** Set once DEFAULT_ROUTINE has been copied into the `routine` collection. */
  routineSeeded?: boolean;
  /** Set once the default FAQs have been copied into the `faqs` collection. */
  faqsSeeded?: boolean;
}

const SETTINGS_ID = "admin";

async function ensureSettings(): Promise<SettingsDoc> {
  const c = await col("settings");
  const existing = (await c.findOne({ _id: SETTINGS_ID as any })) as SettingsDoc | null;
  if (existing) return existing;

  const initialPw = process.env.ADMIN_PASSWORD || "lighthouse";
  // Seed notification recipients from the MAIL_TO env (supports a comma-separated list).
  const seedEmails = (process.env.MAIL_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter((e) => EMAIL_RE.test(e));
  const doc: SettingsDoc = {
    _id: SETTINGS_ID,
    passwordHash: bcrypt.hashSync(initialPw, 10),
    ...DEFAULT_PAGE_CONTENT,
    name: siteConfig.name,
    phone: siteConfig.whatsapp.display,
    layout: "sidebar",
    notifyEmails: seedEmails,
    social: {
      instagram: siteConfig.social.instagram.href,
      facebook: siteConfig.social.facebook.href,
    },
    packages: DEFAULT_PACKAGES,
    packagesCopyVersion: 1,
    packagesNote: DEFAULT_PACKAGES_NOTE,
    comparisonColumns: DEFAULT_COMPARISON_COLUMNS,
    comparisonRows: DEFAULT_COMPARISON_ROWS,
    hours: DEFAULT_HOURS,
    hoursNote: DEFAULT_HOURS_NOTE,
    hoursShort: DEFAULT_HOURS_SHORT,
    staffHeading: DEFAULT_STAFF_HEADING,
    staffNote: DEFAULT_STAFF_NOTE,
    staffFootnote: DEFAULT_STAFF_FOOTNOTE,
  };
  await c.insertOne(doc as any);
  return doc;
}

export async function getPublicSettings(): Promise<AdminSettings> {
  const s = await ensureSettings();
  return {
    ...resolvePageContent(s),
    name: s.name,
    phone: s.phone,
    layout: s.layout,
    notifyEmails: s.notifyEmails ?? [],
    social: {
      instagram: s.social?.instagram ?? "",
      facebook: s.social?.facebook ?? "",
    },
    packages: resolvePackageCopy(s.packages?.length ? s.packages : DEFAULT_PACKAGES, s.packagesCopyVersion),
    packagesNote: s.packagesNote ?? DEFAULT_PACKAGES_NOTE,
    comparisonColumns: s.comparisonColumns?.length ? s.comparisonColumns : DEFAULT_COMPARISON_COLUMNS,
    comparisonRows: s.comparisonRows?.length ? s.comparisonRows : DEFAULT_COMPARISON_ROWS,
    // `??` not `||` — an admin who clears these fields should get a blank line, not the default back.
    // The blob itself is intentionally NOT returned here — see getGroupPhoto().
    groupPhoto: s.groupPhoto ? GROUP_PHOTO_URL : "",
    groupPhotoCaption: s.groupPhotoCaption ?? "",
    hours: s.hours?.length ? s.hours : DEFAULT_HOURS,
    hoursNote: s.hoursNote ?? DEFAULT_HOURS_NOTE,
    hoursShort: s.hoursShort ?? DEFAULT_HOURS_SHORT,
    staffHeading: s.staffHeading ?? DEFAULT_STAFF_HEADING,
    staffNote: s.staffNote ?? DEFAULT_STAFF_NOTE,
    staffFootnote: s.staffFootnote ?? DEFAULT_STAFF_FOOTNOTE,
  };
}

/** Recipient inboxes for booking notifications (admin-configured, else MAIL_TO env). */
export async function getNotifyEmails(): Promise<string[]> {
  const s = await ensureSettings();
  const emails = s.notifyEmails ?? [];
  if (emails.length) return emails;
  return (process.env.MAIL_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter((e) => EMAIL_RE.test(e));
}

export async function verifyPassword(password: string): Promise<boolean> {
  const s = await ensureSettings();
  return bcrypt.compareSync(password, s.passwordHash);
}

export async function setPassword(password: string): Promise<void> {
  const c = await col("settings");
  await ensureSettings();
  await c.updateOne(
    { _id: SETTINGS_ID as any },
    { $set: { passwordHash: bcrypt.hashSync(password, 10) } },
  );
}

export async function updateSettings(patch: Partial<AdminSettings>): Promise<void> {
  const c = await col("settings");
  await ensureSettings();
  const $set: Record<string, unknown> = {};
  for (const key of Object.keys(DEFAULT_PAGE_CONTENT) as (keyof PageContent)[]) {
    const value = patch[key];
    if (typeof value === typeof DEFAULT_PAGE_CONTENT[key]) {
      $set[key] = typeof value === "string" ? value.trim() : value;
    }
  }
  if (typeof patch.name === "string") $set.name = patch.name;
  if (typeof patch.phone === "string") $set.phone = patch.phone;
  if (patch.layout === "sidebar" || patch.layout === "topnav") $set.layout = patch.layout;
  if (Array.isArray(patch.notifyEmails)) {
    $set.notifyEmails = Array.from(
      new Set(patch.notifyEmails.map((e) => e.trim().toLowerCase()).filter((e) => EMAIL_RE.test(e))),
    );
  }
  if (patch.social) {
    const clean = (u?: string) => {
      const v = (u ?? "").trim();
      if (!v) return "";
      return /^https?:\/\//i.test(v) ? v : `https://${v}`;
    };
    $set.social = {
      instagram: clean(patch.social.instagram),
      facebook: clean(patch.social.facebook),
    };
  }
  if (Array.isArray(patch.packages)) {
    $set.packagesCopyVersion = 1;
    $set.packages = patch.packages.slice(0, 8).map((p, i) => ({
      id: (p.id && String(p.id)) || `pkg-${Date.now()}-${i}`,
      label: String(p.label ?? "").trim(),
      hours: String(p.hours ?? "").trim(),
      sub: String(p.sub ?? "").trim(),
      price: String(p.price ?? "").trim(),
      features: Array.isArray(p.features)
        ? p.features.map((f) => String(f).trim()).filter(Boolean).slice(0, 12)
        : [],
      highlight: !!p.highlight,
    }));
  }
  if (typeof patch.packagesNote === "string") $set.packagesNote = patch.packagesNote.trim();
  // Columns and rows are always saved together (from one admin "Save comparison table" action)
  // so every row's values array can be re-aligned to the current column count here.
  if (Array.isArray(patch.comparisonColumns) && Array.isArray(patch.comparisonRows)) {
    const cols = patch.comparisonColumns.slice(0, 6).map((c) => ({
      label: String(c.label ?? "").trim(),
      highlight: !!c.highlight,
    }));
    $set.comparisonColumns = cols;
    $set.comparisonRows = patch.comparisonRows.slice(0, 20).map((r) => ({
      label: String(r.label ?? "").trim(),
      values: Array.from({ length: cols.length }, (_, i) => String(r.values?.[i] ?? "").trim()),
    }));
  }
  // "" is meaningful: it clears the photo and restores the illustrated collage.
  if (typeof patch.groupPhoto === "string") $set.groupPhoto = patch.groupPhoto;
  if (typeof patch.groupPhotoCaption === "string") $set.groupPhotoCaption = patch.groupPhotoCaption.trim();
  if (Array.isArray(patch.hours)) {
    $set.hours = patch.hours
      .slice(0, 7)
      .map((h) => ({ label: String(h.label ?? "").trim(), time: String(h.time ?? "").trim() }))
      .filter((h) => h.label || h.time);
  }
  if (typeof patch.hoursNote === "string") $set.hoursNote = patch.hoursNote.trim();
  if (typeof patch.hoursShort === "string") $set.hoursShort = patch.hoursShort.trim();
  if (typeof patch.staffHeading === "string") $set.staffHeading = patch.staffHeading.trim();
  if (typeof patch.staffNote === "string") $set.staffNote = patch.staffNote.trim();
  if (typeof patch.staffFootnote === "string") $set.staffFootnote = patch.staffFootnote.trim();
  if (Object.keys($set).length) await c.updateOne({ _id: SETTINGS_ID as any }, { $set });
}

/* ----------------------------- Submissions ----------------------------- */

export async function listSubmissions(): Promise<Submission[]> {
  const c = await col("submissions");
  const docs = await c.find({}).sort({ ts: -1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    parent: d.parent ?? "",
    child: d.child ?? "",
    age: d.age ?? "",
    date: d.date ?? "",
    phone: d.phone ?? "",
    package: d.package ?? "",
    msg: d.msg ?? "",
    status: (d.status as SubmissionStatus) ?? "new",
    notes: d.notes ?? "",
    source: d.source ?? "",
    ts: d.ts ?? d._id.getTimestamp?.().getTime() ?? Date.now(),
  }));
}

export interface NewSubmission {
  parent: string;
  child?: string;
  age: string;
  date: string;
  phone: string;
  package?: string;
  msg?: string;
  source?: string;
}

export async function createSubmission(input: NewSubmission): Promise<string> {
  const c = await col("submissions");
  const doc = {
    parent: input.parent,
    child: input.child ?? "",
    age: input.age,
    date: input.date,
    phone: input.phone,
    package: input.package ?? "",
    msg: input.msg ?? "",
    status: "new" as SubmissionStatus,
    notes: "",
    source: input.source ?? "",
    ts: Date.now(),
  };
  const res = await c.insertOne(doc as any);
  return res.insertedId.toString();
}

export async function updateSubmission(
  id: string,
  patch: { status?: SubmissionStatus; notes?: string },
): Promise<void> {
  const c = await col("submissions");
  const $set: Record<string, unknown> = {};
  if (patch.status) $set.status = patch.status;
  if (typeof patch.notes === "string") $set.notes = patch.notes;
  if (Object.keys($set).length) await c.updateOne({ _id: new ObjectId(id) }, { $set });
}

export async function deleteSubmission(id: string): Promise<void> {
  const c = await col("submissions");
  await c.deleteOne({ _id: new ObjectId(id) });
}

/* ----------------------------- Photos ----------------------------- */

/**
 * Public URL for a stored photo, served by `/api/photo/[id]`.
 * `v` is the row's timestamp so a replaced image can never serve stale bytes.
 */
export function photoUrl(id: string, ts: number): string {
  return `/api/photo/${id}?v=${ts}`;
}

/**
 * Photo metadata — deliberately WITHOUT the base64 `src`.
 *
 * Images average ~200 kB each as base64 in Mongo. Selecting them here meant every
 * page render transferred the whole library out of Atlas and inlined it into the
 * HTML, which burned Vercel origin transfer and made pages crawl. `src` is now a
 * short URL to `/api/photo/[id]`, which the CDN caches immutably.
 *
 * Pass `homeOnly` to filter in the database rather than in JS after the transfer.
 */
export async function listPhotos(opts?: { homeOnly?: boolean }): Promise<Photo[]> {
  const c = await col("photos");
  const query = opts?.homeOnly ? { home: true } : {};
  const docs = await c.find(query, { projection: { src: 0 } }).sort({ order: 1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    src: photoUrl(d._id.toString(), d.ts ?? 0),
    cat: d.cat as PhotoCategory,
    cap: d.cap ?? "",
    featured: !!d.featured,
    home: !!d.home,
    order: d.order ?? 0,
    ts: d.ts ?? Date.now(),
  }));
}

/** Raw base64 data URL for one photo. Only `/api/photo/[id]` should need this. */
export async function getPhotoSrc(id: string): Promise<string | null> {
  if (!ObjectId.isValid(id)) return null;
  const c = await col("photos");
  const doc = (await c.findOne({ _id: new ObjectId(id) }, { projection: { src: 1 } })) as any;
  return typeof doc?.src === "string" ? doc.src : null;
}

export async function addPhoto(input: { src: string; cat: PhotoCategory; cap: string }): Promise<string> {
  const c = await col("photos");
  // New photos appear first: give them the smallest order value.
  const first = await c.find({}).sort({ order: 1 }).limit(1).toArray();
  const minOrder = first.length ? (first[0] as any).order ?? 0 : 0;
  const res = await c.insertOne({
    src: input.src,
    cat: input.cat,
    cap: input.cap,
    featured: false,
    home: false,
    order: minOrder - 1,
    ts: Date.now(),
  } as any);
  return res.insertedId.toString();
}

export async function updatePhoto(
  id: string,
  patch: { cap?: string; cat?: PhotoCategory; featured?: boolean; home?: boolean },
): Promise<void> {
  const c = await col("photos");
  const $set: Record<string, unknown> = {};
  if (typeof patch.cap === "string") $set.cap = patch.cap;
  if (patch.cat) $set.cat = patch.cat;
  if (typeof patch.home === "boolean") $set.home = patch.home;
  if (typeof patch.featured === "boolean") $set.featured = patch.featured;
  if (Object.keys($set).length) await c.updateOne({ _id: new ObjectId(id) }, { $set });
}

export async function deletePhoto(id: string): Promise<void> {
  const c = await col("photos");
  await c.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderPhotos(orderedIds: string[]): Promise<void> {
  const c = await col("photos");
  await Promise.all(
    orderedIds.map((id, i) => c.updateOne({ _id: new ObjectId(id) }, { $set: { order: i } })),
  );
}

/**
 * Set the exact set of photos shown on the home "Look at our day" strip in one
 * shot: the given ids become `home: true`, every other photo becomes `home: false`.
 * Used by the admin "Update home pictures" button so the selection is always in
 * a known, consistent state (independent of individual toggle requests).
 */
export async function setHomePhotos(ids: string[]): Promise<void> {
  const c = await col("photos");
  const wanted = new Set(ids);
  const docs = (await c.find({}, { projection: { home: 1 } }).toArray()) as any[];
  await Promise.all(
    docs.map((d) => {
      const shouldHome = wanted.has(d._id.toString());
      if (!!d.home === shouldHome) return Promise.resolve();
      return c.updateOne({ _id: d._id }, { $set: { home: shouldHome } });
    }),
  );
}

/* ----------------------------- One-time seeding ----------------------------- */

/**
 * Content that ships with starter data. Each entry is copied into its collection
 * the first time that collection is read, so the defaults exist as real,
 * admin-editable rows rather than hard-coded markup nobody can change.
 *
 * Add a new seeded section by adding a row here — there is deliberately only one
 * seeding routine, not one per feature.
 */
const SEEDS = {
  staff: {
    collection: "staff",
    /** Flag on the settings doc marking this seed as done. */
    flag: "staffSeeded",
    build: () =>
      DEFAULT_STAFF.map((m) => ({ name: m.name, role: m.role, photo: m.photo, order: m.order, ts: Date.now() })),
  },
  routine: {
    collection: "routine",
    flag: "routineSeeded",
    build: () =>
      DEFAULT_ROUTINE.map((r, i) => ({ title: r.title, subtitle: r.subtitle, order: i, ts: Date.now() })),
  },
  faqs: {
    collection: "faqs",
    flag: "faqsSeeded",
    // Both groups share one collection, so one seed covers the About accordion
    // and the Packages strip. `order` restarts per group.
    build: () => [
      ...DEFAULT_FAQS_ABOUT.map((f, i) => ({ group: "about", q: f.q, a: f.a, order: i, ts: Date.now() })),
      ...DEFAULT_FAQS_PACKAGES.map((f, i) => ({ group: "packages", q: f.q, a: f.a, order: i, ts: Date.now() })),
    ],
  },
} as const;

/**
 * Copy a section's starter data into its collection, exactly once ever.
 *
 * The "done" flag is claimed with a conditional update — atomic in MongoDB — so
 * two concurrent requests can't both seed and create duplicates. Because the
 * flag is never cleared, an admin who deliberately deletes every row does NOT
 * get the defaults resurrected on the next page load.
 */
async function ensureSeeded(key: keyof typeof SEEDS): Promise<void> {
  const spec = SEEDS[key];
  await ensureSettings();
  const settings = await col("settings");
  const claim = await settings.updateOne(
    { _id: SETTINGS_ID as any, [spec.flag]: { $ne: true } },
    { $set: { [spec.flag]: true } },
  );
  // Already seeded (or another request is seeding right now) — nothing to do.
  if (claim.modifiedCount === 0) return;

  const c = await col(spec.collection);
  if ((await c.countDocuments()) > 0) return;
  await c.insertMany(spec.build() as any[]);
}

/* ----------------------------- Staff ----------------------------- */

/** Public URL for a team member's photo, served by `/api/staff-photo/[id]`. */
export function staffPhotoUrl(id: string, ts: number): string {
  return `/api/staff-photo/${id}?v=${ts}`;
}

/**
 * Team metadata WITHOUT the base64 photo — same reasoning as `listPhotos`: an
 * avatar can be up to 2 MB, and selecting it here would inline every one of them
 * into the About page HTML on every request. `photo` is a short cacheable URL,
 * or "" when the member has no photo (the UI then shows coloured initials).
 */
export async function listStaff(): Promise<Staff[]> {
  await ensureSeeded("staff");
  const c = await col("staff");
  // Aggregation (not find+projection) because we need a *computed* "does this row
  // have a photo?" flag without selecting the blob itself — and a projection may
  // not mix exclusion with computed fields.
  const docs = await c
    .aggregate([
      { $sort: { order: 1 } },
      {
        $project: {
          name: 1,
          role: 1,
          order: 1,
          ts: 1,
          hasPhoto: { $gt: [{ $strLenCP: { $ifNull: ["$photo", ""] } }, 0] },
        },
      },
    ])
    .toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    name: d.name ?? "",
    role: d.role ?? "",
    photo: d.hasPhoto ? staffPhotoUrl(d._id.toString(), d.ts ?? 0) : "",
    order: d.order ?? 0,
    ts: d.ts ?? Date.now(),
  }));
}

/** Raw base64 team group photo. Only `/api/group-photo` needs this. */
export async function getGroupPhoto(): Promise<string | null> {
  const s = await ensureSettings();
  return typeof s.groupPhoto === "string" && s.groupPhoto ? s.groupPhoto : null;
}

/** Raw base64 photo for one team member. Only `/api/staff-photo/[id]` needs this. */
export async function getStaffPhoto(id: string): Promise<string | null> {
  if (!ObjectId.isValid(id)) return null;
  const c = await col("staff");
  const doc = (await c.findOne({ _id: new ObjectId(id) }, { projection: { photo: 1 } })) as any;
  return typeof doc?.photo === "string" && doc.photo ? doc.photo : null;
}

export async function addStaff(input: { name: string; role: string; photo?: string }): Promise<string> {
  const c = await col("staff");
  // New members go to the end of the grid.
  const last = await c.find({}).sort({ order: -1 }).limit(1).toArray();
  const maxOrder = last.length ? (last[0] as any).order ?? 0 : -1;
  const res = await c.insertOne({
    name: input.name,
    role: input.role,
    photo: input.photo ?? "",
    order: maxOrder + 1,
    ts: Date.now(),
  } as any);
  return res.insertedId.toString();
}

export async function updateStaff(
  id: string,
  patch: { name?: string; role?: string; photo?: string },
): Promise<void> {
  const c = await col("staff");
  const $set: Record<string, unknown> = {};
  if (typeof patch.name === "string") $set.name = patch.name;
  if (typeof patch.role === "string") $set.role = patch.role;
  // "" is meaningful here: it clears the photo and restores the initials avatar.
  if (typeof patch.photo === "string") $set.photo = patch.photo;
  if (Object.keys($set).length) await c.updateOne({ _id: new ObjectId(id) }, { $set });
}

export async function deleteStaff(id: string): Promise<void> {
  const c = await col("staff");
  await c.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderStaff(orderedIds: string[]): Promise<void> {
  const c = await col("staff");
  await Promise.all(
    orderedIds.map((id, i) => c.updateOne({ _id: new ObjectId(id) }, { $set: { order: i } })),
  );
}

/* ----------------------------- Daily routine ----------------------------- */

export async function listRoutine(): Promise<RoutineItem[]> {
  await ensureSeeded("routine");
  const c = await col("routine");
  const docs = await c.find({}).sort({ order: 1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    title: d.title ?? "",
    subtitle: d.subtitle ?? "",
    order: d.order ?? 0,
    ts: d.ts ?? Date.now(),
  }));
}

export async function addRoutine(input: { title: string; subtitle?: string }): Promise<string> {
  const c = await col("routine");
  const last = await c.find({}).sort({ order: -1 }).limit(1).toArray();
  const maxOrder = last.length ? (last[0] as any).order ?? 0 : -1;
  const res = await c.insertOne({
    title: input.title,
    subtitle: input.subtitle ?? "",
    order: maxOrder + 1,
    ts: Date.now(),
  } as any);
  return res.insertedId.toString();
}

export async function updateRoutine(
  id: string,
  patch: { title?: string; subtitle?: string },
): Promise<void> {
  const c = await col("routine");
  const $set: Record<string, unknown> = {};
  if (typeof patch.title === "string") $set.title = patch.title;
  // "" is meaningful — it clears the supporting line.
  if (typeof patch.subtitle === "string") $set.subtitle = patch.subtitle;
  if (Object.keys($set).length) await c.updateOne({ _id: new ObjectId(id) }, { $set });
}

export async function deleteRoutine(id: string): Promise<void> {
  const c = await col("routine");
  await c.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderRoutine(orderedIds: string[]): Promise<void> {
  const c = await col("routine");
  await Promise.all(
    orderedIds.map((id, i) => c.updateOne({ _id: new ObjectId(id) }, { $set: { order: i } })),
  );
}

/* ----------------------------- FAQs ----------------------------- */

export async function listFaqs(): Promise<Faq[]> {
  await ensureSeeded("faqs");
  const c = await col("faqs");
  const docs = await c.find({}).sort({ order: 1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    group: (d.group as FaqGroup) ?? "about",
    q: d.q ?? "",
    a: d.a ?? "",
    order: d.order ?? 0,
    ts: d.ts ?? Date.now(),
  }));
}

export async function addFaq(input: { group: FaqGroup; q: string; a?: string }): Promise<string> {
  const c = await col("faqs");
  // Order runs per group, so a new entry lands at the end of its own list.
  const last = await c.find({ group: input.group }).sort({ order: -1 }).limit(1).toArray();
  const maxOrder = last.length ? (last[0] as any).order ?? 0 : -1;
  const res = await c.insertOne({
    group: input.group,
    q: input.q,
    a: input.a ?? "",
    order: maxOrder + 1,
    ts: Date.now(),
  } as any);
  return res.insertedId.toString();
}

export async function updateFaq(id: string, patch: { q?: string; a?: string }): Promise<void> {
  const c = await col("faqs");
  const $set: Record<string, unknown> = {};
  if (typeof patch.q === "string") $set.q = patch.q;
  if (typeof patch.a === "string") $set.a = patch.a;
  if (Object.keys($set).length) await c.updateOne({ _id: new ObjectId(id) }, { $set });
}

export async function deleteFaq(id: string): Promise<void> {
  const c = await col("faqs");
  await c.deleteOne({ _id: new ObjectId(id) });
}

/** Reorder within one group — ids must all belong to that group. */
export async function reorderFaqs(orderedIds: string[]): Promise<void> {
  const c = await col("faqs");
  await Promise.all(
    orderedIds.map((id, i) => c.updateOne({ _id: new ObjectId(id) }, { $set: { order: i } })),
  );
}

/* ----------------------------- Testimonials ----------------------------- */

export async function listTestimonials(): Promise<Testimonial[]> {
  const c = await col("testimonials");
  const docs = await c.find({}).sort({ ts: -1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    name: d.name ?? "",
    child: d.child ?? "",
    quote: d.quote ?? "",
    duration: d.duration ?? "1:00",
    video: (d.video as VideoRef) ?? null,
    home: !!d.home,
    ts: d.ts ?? Date.now(),
  }));
}

export async function addTestimonial(
  input: Omit<Testimonial, "id" | "ts" | "home"> & { home?: boolean },
): Promise<string> {
  const c = await col("testimonials");
  const res = await c.insertOne({ ...input, video: input.video ?? null, home: !!input.home, ts: Date.now() } as any);
  return res.insertedId.toString();
}

export async function updateTestimonial(
  id: string,
  patch: Partial<Omit<Testimonial, "id" | "ts">>,
): Promise<void> {
  const c = await col("testimonials");
  await c.updateOne({ _id: new ObjectId(id) }, { $set: patch });
}

/** Returns the testimonial's attached video (for cleanup), or null. */
export async function getTestimonialVideo(id: string): Promise<VideoRef | null> {
  const c = await col("testimonials");
  const doc = (await c.findOne({ _id: new ObjectId(id) })) as any;
  return (doc?.video as VideoRef) ?? null;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const c = await col("testimonials");
  await c.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Publish the exact set of testimonials chosen for the home page video teaser in one
 * shot, mirroring `setHomePhotos` — the given ids become `home: true`, every other
 * testimonial becomes `home: false`.
 */
export async function setHomeTestimonials(ids: string[]): Promise<void> {
  const c = await col("testimonials");
  const wanted = new Set(ids);
  const docs = (await c.find({}, { projection: { home: 1 } }).toArray()) as any[];
  await Promise.all(
    docs.map((d) => {
      const shouldHome = wanted.has(d._id.toString());
      if (!!d.home === shouldHome) return Promise.resolve();
      return c.updateOne({ _id: d._id }, { $set: { home: shouldHome } });
    }),
  );
}
