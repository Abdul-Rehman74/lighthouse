"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/auth";
import {
  verifyPassword,
  setPassword,
  updateSettings,
  updateSubmission,
  deleteSubmission,
  addPhoto,
  updatePhoto,
  deletePhoto,
  reorderPhotos,
  setHomePhotos,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialVideo,
  setHomeTestimonials,
  addStaff,
  updateStaff,
  deleteStaff,
  reorderStaff,
  addRoutine,
  updateRoutine,
  deleteRoutine,
  reorderRoutine,
  addFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
  type SubmissionStatus,
  type PhotoCategory,
  type AdminSettings,
  type FaqGroup,
} from "@/lib/admin-data";
import { signUpload, destroyVideo, cloudinaryConfigured, type UploadSignature } from "@/lib/cloudinary";
import type { VideoRef } from "@/lib/video";

/* ----------------------------- auth ----------------------------- */

export async function login(password: string): Promise<{ ok: boolean; error?: string }> {
  const ok = await verifyPassword(password);
  if (!ok) return { ok: false, error: "Incorrect password — try again." };
  const token = await createSessionToken();
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
  return { ok: true };
}

export async function logout(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
}

/** Guard: every mutation below must run for an authenticated admin. */
async function requireSession(): Promise<void> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) throw new Error("Not authenticated");
}

/* ----------------------------- submissions ----------------------------- */

export async function saveSubmission(
  id: string,
  patch: { status?: SubmissionStatus; notes?: string },
): Promise<void> {
  await requireSession();
  await updateSubmission(id, patch);
  revalidatePath("/admin");
}

export async function removeSubmission(id: string): Promise<void> {
  await requireSession();
  await deleteSubmission(id);
  revalidatePath("/admin");
}

/* ----------------------------- gallery ----------------------------- */

export async function createPhoto(input: {
  src: string;
  cat: PhotoCategory;
  cap: string;
}): Promise<string> {
  await requireSession();
  const id = await addPhoto(input);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  return id;
}

export async function savePhoto(
  id: string,
  patch: { cap?: string; cat?: PhotoCategory; featured?: boolean; home?: boolean },
): Promise<void> {
  await requireSession();
  await updatePhoto(id, patch);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function removePhoto(id: string): Promise<void> {
  await requireSession();
  await deletePhoto(id);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function savePhotoOrder(orderedIds: string[]): Promise<void> {
  await requireSession();
  await reorderPhotos(orderedIds);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

/**
 * Publish the exact set of photos chosen for the home "Look at our day" strip.
 * Backs the admin "Update home pictures" button — re-syncs the whole selection
 * and refreshes the home page, so it's reliable even if an individual toggle
 * request was missed.
 */
export async function syncHomePhotos(homeIds: string[]): Promise<void> {
  await requireSession();
  await setHomePhotos(homeIds);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

/* ----------------------------- testimonials ----------------------------- */

export async function createTestimonial(input: {
  name: string;
  child: string;
  quote: string;
  duration: string;
  video?: VideoRef | null;
}): Promise<string> {
  await requireSession();
  const id = await addTestimonial(input);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  return id;
}

export async function saveTestimonial(
  id: string,
  patch: { name?: string; child?: string; quote?: string; duration?: string; video?: VideoRef | null; home?: boolean },
): Promise<void> {
  await requireSession();
  // If the video changed/cleared and the old one was a Cloudinary upload, remove the old file.
  if ("video" in patch) {
    const old = await getTestimonialVideo(id);
    const oldId = old?.type === "cloudinary" ? old.publicId : undefined;
    if (oldId && patch.video?.publicId !== oldId) await destroyVideo(oldId);
  }
  await updateTestimonial(id, patch);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function removeTestimonial(id: string): Promise<void> {
  await requireSession();
  const video = await getTestimonialVideo(id);
  if (video?.type === "cloudinary" && video.publicId) await destroyVideo(video.publicId);
  await deleteTestimonial(id);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

/**
 * Publish the exact set of testimonials chosen for the home page video teaser —
 * re-syncs the whole selection, so it's reliable even if an individual toggle was missed.
 */
export async function syncHomeTestimonials(homeIds: string[]): Promise<void> {
  await requireSession();
  await setHomeTestimonials(homeIds);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
}

/* ----------------------------- staff ----------------------------- */

export async function createStaff(input: { name: string; role: string; photo?: string }): Promise<string> {
  await requireSession();
  const id = await addStaff(input);
  revalidatePath("/admin");
  revalidatePath("/about");
  return id;
}

export async function saveStaff(
  id: string,
  patch: { name?: string; role?: string; photo?: string },
): Promise<void> {
  await requireSession();
  await updateStaff(id, patch);
  revalidatePath("/admin");
  revalidatePath("/about");
}

export async function removeStaff(id: string): Promise<void> {
  await requireSession();
  await deleteStaff(id);
  revalidatePath("/admin");
  revalidatePath("/about");
}

export async function saveStaffOrder(orderedIds: string[]): Promise<void> {
  await requireSession();
  await reorderStaff(orderedIds);
  revalidatePath("/admin");
  revalidatePath("/about");
}

/* ----------------------------- daily routine ----------------------------- */

export async function createRoutine(input: { title: string; subtitle?: string }): Promise<string> {
  await requireSession();
  const id = await addRoutine(input);
  revalidatePath("/admin");
  revalidatePath("/about");
  return id;
}

export async function saveRoutine(
  id: string,
  patch: { title?: string; subtitle?: string },
): Promise<void> {
  await requireSession();
  await updateRoutine(id, patch);
  revalidatePath("/admin");
  revalidatePath("/about");
}

export async function removeRoutine(id: string): Promise<void> {
  await requireSession();
  await deleteRoutine(id);
  revalidatePath("/admin");
  revalidatePath("/about");
}

export async function saveRoutineOrder(orderedIds: string[]): Promise<void> {
  await requireSession();
  await reorderRoutine(orderedIds);
  revalidatePath("/admin");
  revalidatePath("/about");
}

/* ----------------------------- faqs ----------------------------- */

/** About FAQs show on /about, package FAQs on /packages — revalidate both. */
function revalidateFaqPages() {
  revalidatePath("/admin");
  revalidatePath("/about");
  revalidatePath("/packages");
}

export async function createFaq(input: { group: FaqGroup; q: string; a?: string }): Promise<string> {
  await requireSession();
  const id = await addFaq(input);
  revalidateFaqPages();
  return id;
}

export async function saveFaq(id: string, patch: { q?: string; a?: string }): Promise<void> {
  await requireSession();
  await updateFaq(id, patch);
  revalidateFaqPages();
}

export async function removeFaq(id: string): Promise<void> {
  await requireSession();
  await deleteFaq(id);
  revalidateFaqPages();
}

export async function saveFaqOrder(orderedIds: string[]): Promise<void> {
  await requireSession();
  await reorderFaqs(orderedIds);
  revalidateFaqPages();
}

/* ----------------------------- cloudinary ----------------------------- */

/** Signed-upload params so the admin browser can upload a video directly to Cloudinary. */
export async function getUploadSignature(): Promise<UploadSignature> {
  await requireSession();
  if (!cloudinaryConfigured()) throw new Error("Cloudinary is not configured on the server.");
  return signUpload();
}

/* ----------------------------- settings ----------------------------- */

export async function saveSettings(patch: Partial<AdminSettings>): Promise<void> {
  await requireSession();
  await updateSettings(patch);
  revalidatePath("/admin");
  // Name/phone appear in the footer + WhatsApp FAB on every public page.
  revalidatePath("/", "layout");
}

export async function changePassword(newPassword: string): Promise<{ ok: boolean; error?: string }> {
  await requireSession();
  const pw = newPassword.trim();
  if (pw.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
  await setPassword(pw);
  return { ok: true };
}
