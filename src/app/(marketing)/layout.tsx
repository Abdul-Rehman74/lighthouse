import type { Metadata } from "next";
import Script from "next/script";
import { SiteNav } from "@/components/organisms/SiteNav";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { WhatsAppFab } from "@/components/organisms/WhatsAppFab";
import { CursorSparkles } from "@/components/effects/CursorSparkles";
import { getSiteSettings } from "@/lib/site-settings";

// Google Ads conversion tag, provided by marketing (AW-18322831557).
const GOOGLE_ADS_ID = "AW-18322831557";
// Meta (Facebook/Instagram) Pixel, provided by marketing.
const META_PIXEL_ID = "2183136998918438";
// Google Tag Manager container, provided by marketing.
const GTM_ID = "GTM-MW7K2CJT";

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
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      <CursorSparkles />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab phoneHref={settings.phoneHref} />
    </div>
  );
}
