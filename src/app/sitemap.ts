import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const BASE_URL = "https://lighthousedaycareschool.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.nav.map((item) => ({
    url: `${BASE_URL}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
