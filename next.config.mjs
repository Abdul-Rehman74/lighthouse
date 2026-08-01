/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next dev` and `next build` both write to `.next` by default, so running a
  // build while a dev server is live overwrites the chunks that server is holding
  // open — which surfaces as "Cannot find module './948.js'" until you delete
  // `.next` and restart. Setting NEXT_DIST_DIR lets a verification build go to a
  // throwaway directory instead. Unset in production (Vercel), so it stays `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // Gallery uploads come through Server Actions as base64; bump the default 1MB limit.
    serverActions: {
      bodySizeLimit: "10mb",
    },
    // Keep the native mongodb driver out of the bundler so it runs as a Node module on Vercel.
    serverComponentsExternalPackages: ["mongodb", "bcryptjs", "cloudinary"],
  },
};

export default nextConfig;
