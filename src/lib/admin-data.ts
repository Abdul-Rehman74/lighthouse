import "server-only";
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
  ts: number;
}

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
    label: "Half day",
    hours: "8 — 12",
    sub: "Mornings + lunch",
    price: "22,000",
    highlight: false,
    features: ["Breakfast & morning snack", "Hot lunch supervised", "Montessori circle", "Outdoor play time"],
  },
  {
    id: "school",
    label: "School day",
    hours: "8 — 3",
    sub: "Most popular",
    price: "25,000",
    highlight: true,
    features: ["Everything in Half day", "Afternoon nap", "Art & sensory time", "Pre-K readiness activities"],
  },
  {
    id: "full",
    label: "Full day",
    hours: "8 — 6",
    sub: "For working parents",
    price: "28,000",
    highlight: false,
    features: ["Everything in School day", "Afternoon outdoor play", "Evening snack", "Late pickup until 6pm"],
  },
];

export const DEFAULT_PACKAGES_NOTE =
  "Sibling discount: 10% off the second child · Annual payment: 5% off · No registration fee";

export interface AdminSettings {
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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ----------------------------- Collections ----------------------------- */

async function col(name: string) {
  const db = await getDb();
  return db.collection(name);
}

/* ----------------------------- Settings ----------------------------- */

interface SettingsDoc {
  _id: string;
  passwordHash: string;
  name: string;
  phone: string;
  layout: "sidebar" | "topnav";
  notifyEmails?: string[];
  social?: Partial<SocialLinks>;
  packages?: Package[];
  packagesNote?: string;
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
    name: siteConfig.name,
    phone: siteConfig.whatsapp.display,
    layout: "sidebar",
    notifyEmails: seedEmails,
    social: {
      instagram: siteConfig.social.instagram.href,
      facebook: siteConfig.social.facebook.href,
    },
    packages: DEFAULT_PACKAGES,
    packagesNote: DEFAULT_PACKAGES_NOTE,
  };
  await c.insertOne(doc as any);
  return doc;
}

export async function getPublicSettings(): Promise<AdminSettings> {
  const s = await ensureSettings();
  return {
    name: s.name,
    phone: s.phone,
    layout: s.layout,
    notifyEmails: s.notifyEmails ?? [],
    social: {
      instagram: s.social?.instagram ?? "",
      facebook: s.social?.facebook ?? "",
    },
    packages: s.packages?.length ? s.packages : DEFAULT_PACKAGES,
    packagesNote: s.packagesNote ?? DEFAULT_PACKAGES_NOTE,
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

export async function listPhotos(): Promise<Photo[]> {
  const c = await col("photos");
  const docs = await c.find({}).sort({ order: 1 }).toArray();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    src: d.src,
    cat: d.cat as PhotoCategory,
    cap: d.cap ?? "",
    featured: !!d.featured,
    home: !!d.home,
    order: d.order ?? 0,
    ts: d.ts ?? Date.now(),
  }));
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
    ts: d.ts ?? Date.now(),
  }));
}

export async function addTestimonial(input: Omit<Testimonial, "id" | "ts">): Promise<string> {
  const c = await col("testimonials");
  const res = await c.insertOne({ ...input, video: input.video ?? null, ts: Date.now() } as any);
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
