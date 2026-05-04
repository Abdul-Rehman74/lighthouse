import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { siteConfig } from "@/lib/site-config";

export function ContactInfoCard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-ink-900 text-cream-50 rounded-[28px] p-8 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full bg-sun-300/25"
        />
        <div className="relative">
          <Eyebrow color="text-sun-300">fastest reply</Eyebrow>
          <h3 className="text-2xl mt-1.5 mb-4">WhatsApp us</h3>
          <Button asChild variant="whatsapp" className="w-full justify-center" size="lg">
            <a href={siteConfig.whatsapp.href} target="_blank" rel="noreferrer">
              💬 {siteConfig.whatsapp.display}
            </a>
          </Button>
          <p className="text-[13px] text-cream-50/70 mt-3.5 leading-relaxed">
            We answer within an hour during open hours (Mon–Sat, 7am–6pm).
          </p>
        </div>
      </div>

      <div className="bg-cream-100 rounded-[24px] p-7">
        <div className="font-display font-bold text-lg mb-3">Hours</div>
        <div className="flex justify-between text-sm py-2 border-b border-cream-200">
          <span className="text-ink-700">{siteConfig.hours.weekday}</span>
          <span className="font-bold">{siteConfig.hours.time}</span>
        </div>
        <div className="flex justify-between text-sm py-2">
          <span className="text-ink-700">Sundays</span>
          <span className="text-ink-500">Closed</span>
        </div>
        <div className="text-xs text-ink-500 mt-2">{siteConfig.hours.note}</div>
      </div>

      <div className="bg-sun-100 rounded-[24px] p-6 text-center">
        <div className="hand text-[22px] text-coral-400">walk-ins welcome ✿</div>
        <p className="text-sm text-ink-700 mt-2">
          Drop by anytime during open hours — no appointment needed.
        </p>
      </div>
    </div>
  );
}
