/**
 * Shared handler for images stored in Mongo as base64 data URLs.
 *
 * Inlining those blobs into page HTML meant multi-megabyte documents on every
 * request. Serving them from a route instead keeps the HTML tiny and lets the
 * CDN cache the bytes, so each image is fetched from the origin at most once.
 */

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Turn a `data:<mime>;base64,<payload>` string into a cacheable image response. */
export function serveDataUrl(src: string | null): Response {
  if (!src) return new Response("Not found", { status: 404 });

  const match = /^data:([^;,]+);base64,(.*)$/s.exec(src);
  if (!match) return new Response("Unsupported image encoding", { status: 415 });

  const [, contentType, base64] = match;
  const body = Buffer.from(base64, "base64");

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(body.length),
      // Safe to cache forever: every URL carries a ?v= timestamp that changes
      // whenever the underlying row does.
      "Cache-Control": `public, max-age=${ONE_YEAR}, immutable`,
    },
  });
}
