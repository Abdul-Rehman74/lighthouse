import "server-only";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });

export function cloudinaryConfigured(): boolean {
  return !!(cloudName && apiKey && apiSecret);
}

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

/**
 * Produce a short-lived signature so the browser can upload a video directly
 * to Cloudinary (signed upload) without exposing the API secret. The signed
 * params must exactly match what the client sends (besides file/api_key).
 */
export function signUpload(folder = "lighthouse/testimonials"): UploadSignature {
  if (!cloudinaryConfigured()) throw new Error("Cloudinary is not configured");
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, apiSecret!);
  return { cloudName: cloudName!, apiKey: apiKey!, timestamp, folder, signature };
}

/** Delete an uploaded video by its public_id (best-effort). */
export async function destroyVideo(publicId: string): Promise<void> {
  if (!cloudinaryConfigured() || !publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video", invalidate: true });
  } catch (err) {
    console.error("[cloudinary] failed to delete video", publicId, err);
  }
}
