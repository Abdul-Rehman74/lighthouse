import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";
import { MapPin, Phone, Clock } from "lucide-react";

export async function BranchesSection() {
  const settings = await getSiteSettings();
  return (
    <section className="py-14">
      <Container>
        <div className="text-center mb-10">
          <Eyebrow color="text-mint-400">our branches</Eyebrow>
          <h2 className="text-3xl md:text-[44px] mt-1.5">Two branches in Rawalpindi.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {siteConfig.branches.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-[28px] p-9 border-[1.5px] border-cream-200 shadow-soft-sm transition-transform hover:!rotate-0 hover:-translate-y-1"
              style={{ transform: `rotate(${i === 0 ? -1 : 1}deg)` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: i === 0 ? "#FFE27A" : "#FFC9B6" }}
                >
                  <MapPin size={24} className="text-ink-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl">{b.name}</h3>
                  <p className="text-[15px] text-ink-700 mt-1.5">{b.address}</p>
                  <div className="flex flex-col gap-1.5 mt-4 text-[13px] text-ink-700">
                    <div className="flex items-center gap-1.5">
                      <Phone size={14} /> {b.phone}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} /> {b.hours}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    <Button asChild variant="ghost" size="sm">
                      <a href={b.mapsHref} target="_blank" rel="noreferrer">
                        Get directions →
                      </a>
                    </Button>
                    <Button asChild variant="whatsapp" size="sm">
                      <a href={settings.phoneHref} target="_blank" rel="noreferrer">
                        💬 WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
