import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { getSiteSettings } from "@/lib/site-settings";
import { Instagram, Facebook } from "lucide-react";

export async function SocialSection() {
  const { social } = await getSiteSettings();
  return (
    <section className="py-10">
      <Container>
        <div
          className="rounded-[28px] md:rounded-[32px] p-7 md:px-14 md:py-12 text-center"
          style={{ background: "linear-gradient(135deg, #C9E7FF 0%, #FFF0B8 100%)" }}
        >
          <Eyebrow color="text-coral-400">stay in the loop</Eyebrow>
          <h2 className="text-3xl md:text-[36px] mt-1.5">Follow along on socials.</h2>
          <p className="text-base text-ink-700 mt-3.5 max-w-[480px] mx-auto">
            Daily photos, classroom updates, and little wins from the Lighthouse rooms.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center mt-7">
            <a
              href={social.instagram.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-full text-white font-bold text-sm shadow-soft-md hover:-translate-y-0.5 transition-transform"
              style={{ background: "linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)" }}
            >
              <Instagram size={18} /> {social.instagram.handle}
            </a>
            <a
              href={social.facebook.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-full text-white font-bold text-sm shadow-soft-md bg-[#1877F2] hover:-translate-y-0.5 transition-transform"
            >
              <Facebook size={18} /> {social.facebook.handle}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
