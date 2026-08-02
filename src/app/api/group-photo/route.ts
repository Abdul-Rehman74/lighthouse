import { getGroupPhoto } from "@/lib/admin-data";
import { serveDataUrl } from "@/lib/serve-image";

/** Serves the About-page team group photo. See `serveDataUrl` for why this route exists. */
export const dynamic = "force-dynamic"; // needs the DB; caching comes from the response headers

export async function GET() {
  try {
    return serveDataUrl(await getGroupPhoto());
  } catch {
    return new Response("Image unavailable", { status: 503 });
  }
}
