/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
