import {
  listSubmissions,
  listPhotos,
  listTestimonials,
  listStaff,
  listRoutine,
  listFaqs,
  getPublicSettings,
} from "@/lib/admin-data";
import { AdminApp } from "./AdminApp";

// Always render fresh from the DB — this dashboard is per-request data.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [submissions, photos, testimonials, staff, routine, faqs, settings] = await Promise.all([
    listSubmissions(),
    listPhotos(),
    listTestimonials(),
    listStaff(),
    listRoutine(),
    listFaqs(),
    getPublicSettings(),
  ]);

  return (
    <AdminApp
      initialSubmissions={submissions}
      initialPhotos={photos}
      initialTestimonials={testimonials}
      initialStaff={staff}
      initialRoutine={routine}
      initialFaqs={faqs}
      initialSettings={settings}
    />
  );
}
