import { getPhotoSrc } from "@/lib/admin-data";
import { serveDataUrl } from "@/lib/serve-image";

/** Serves a gallery photo's bytes. See `serveDataUrl` for why this route exists. */
export const dynamic = "force-dynamic"; // needs the DB; caching comes from the response headers

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    return serveDataUrl(await getPhotoSrc(params.id));
  } catch {
    return new Response("Image unavailable", { status: 503 });
  }
}
