import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { SocialPill } from "@/components/atoms/SocialPill";
import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";
import { Clock, Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-extrabold text-xs uppercase tracking-[0.12em] mb-4 text-cream-50">
      {children}
    </div>
  );
}

export async function SiteFooter() {
  const settings = await getSiteSettings();
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream-100 mt-14 md:mt-20">
      <div
        aria-hidden
        className="absolute -top-20 -right-16 w-[280px] h-[280px] rounded-full bg-sun-300 opacity-[0.18]"
      />
      <div
        aria-hidden
        className="absolute -bottom-12 left-1/3 w-[180px] h-[180px] rounded-full bg-coral-300 opacity-15"
      />

      <Container className="relative pt-14 md:pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 mb-12">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-cream-50/70 max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-2.5 mt-5">
              <SocialPill kind="whatsapp" href={settings.phoneHref} />
              <SocialPill kind="instagram" href={settings.social.instagram.href} />
              <SocialPill kind="facebook" href={settings.social.facebook.href} />
            </div>
          </div>

          <div>
            <FooterTitle>Pages</FooterTitle>
            <ul className="flex flex-col gap-2.5 text-sm">
              {siteConfig.nav.map((it) => (
                <li key={it.id}>
                  <Link
                    href={it.href}
                    className="text-cream-50/70 hover:text-cream-50 transition-colors"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>Hours</FooterTitle>
            <div className="flex flex-col gap-2 text-sm text-cream-50/70">
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {siteConfig.hours.weekday}
              </div>
              <div className="text-cream-50 font-bold">{siteConfig.hours.time}</div>
              <div className="text-xs text-cream-50/50 mt-2">{siteConfig.hours.note}</div>
            </div>
          </div>

          <div>
            <FooterTitle>Reach us</FooterTitle>
            <div className="flex flex-col gap-2.5 text-sm text-cream-50/70">
              <a
                href={settings.phoneHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cream-50 transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp {settings.phoneDisplay}
              </a>
              <a
                href={settings.social.instagram.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cream-50 transition-colors"
              >
                <Instagram size={16} /> {settings.social.instagram.handle}
              </a>
              <a
                href={settings.social.facebook.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cream-50 transition-colors"
              >
                <Facebook size={16} /> {settings.social.facebook.handle}
              </a>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} /> Islamabad · Rawalpindi
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-50/15 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream-50/50">
          <div className="flex items-center gap-3">
            <span>© 2026 {settings.name}. All rights reserved.</span>
            <Link href="/admin" className="text-cream-50/40 hover:text-cream-50 transition-colors">
              Admin
            </Link>
          </div>
          <div className="hand text-base text-sun-300">made with ✿ in the Twin Cities</div>
        </div>
      </Container>
    </footer>
  );
}
