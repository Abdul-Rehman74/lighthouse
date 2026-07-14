import type { Metadata } from "next";
import Script from "next/script";
import { SiteNav } from "@/components/organisms/SiteNav";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { WhatsAppFab } from "@/components/organisms/WhatsAppFab";
import { CursorSparkles } from "@/components/effects/CursorSparkles";
import { getSiteSettings } from "@/lib/site-settings";

// Google Ads conversion tag, provided by marketing (AW-18322831557).
const GOOGLE_ADS_ID = "AW-18322831557";

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
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <CursorSparkles />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab phoneHref={settings.phoneHref} />
    </div>
  );
}
