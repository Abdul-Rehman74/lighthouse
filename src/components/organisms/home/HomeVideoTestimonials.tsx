import { VideoTestimonials } from "@/components/organisms/gallery/VideoTestimonials";
import { getHomeTestimonials } from "@/lib/site-settings";

/**
 * Home page teaser for a hand-picked set of video testimonials (admin-selected,
 * mirroring the "Look at our day" photo strip). Renders nothing until the admin
 * has featured at least one — no dummy fallback content on the home page.
 */
export async function HomeVideoTestimonials() {
  const items = await getHomeTestimonials();
  if (!items.length) return null;

  return (
    <VideoTestimonials
      items={items.slice(0, 3)}
      eyebrow="parents say"
      heading="Hear it from parents."
      viewAllHref="/gallery#video-testimonials"
      viewAllLabel="Visit the gallery"
    />
  );
}
