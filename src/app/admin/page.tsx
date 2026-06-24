import { listSubmissions, listPhotos, listTestimonials, getPublicSettings } from "@/lib/admin-data";
import { AdminApp } from "./AdminApp";

// Always render fresh from the DB — this dashboard is per-request data.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [submissions, photos, testimonials, settings] = await Promise.all([
    listSubmissions(),
    listPhotos(),
    listTestimonials(),
    getPublicSettings(),
  ]);

  return (
    <AdminApp
      initialSubmissions={submissions}
      initialPhotos={photos}
      initialTestimonials={testimonials}
      initialSettings={settings}
    />
  );
}
