import type { Metadata } from "next";
import { GalleryHero } from "@/components/organisms/gallery/GalleryHero";
import { GalleryFilter } from "@/components/organisms/gallery/GalleryFilter";
import { VideoTestimonials } from "@/components/organisms/gallery/VideoTestimonials";
import { GalleryCTA } from "@/components/organisms/gallery/GalleryCTA";
import { getGalleryPhotos, getPublicTestimonials } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and video testimonials from the Lighthouse classrooms — updated weekly by our teachers.",
};

export default async function GalleryPage() {
  const [photos, testimonials] = await Promise.all([getGalleryPhotos(), getPublicTestimonials()]);
  return (
    <>
      <GalleryHero />
      <GalleryFilter photos={photos} />
      <VideoTestimonials items={testimonials} />
      <GalleryCTA />
    </>
  );
}
