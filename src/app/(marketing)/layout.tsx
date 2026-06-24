import type { Metadata } from "next";
import { SiteNav } from "@/components/organisms/SiteNav";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { WhatsAppFab } from "@/components/organisms/WhatsAppFab";
import { CursorSparkles } from "@/components/effects/CursorSparkles";
import { getSiteSettings } from "@/lib/site-settings";

// Render public pages per-request so admin-managed details (name, WhatsApp,
// gallery photos) always reflect the current database state immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getSiteSettings();
  return { title: { default: name, template: `%s · ${name}` } };
}

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="min-h-screen flex flex-col">
      <CursorSparkles />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab phoneHref={settings.phoneHref} />
    </div>
  );
}
