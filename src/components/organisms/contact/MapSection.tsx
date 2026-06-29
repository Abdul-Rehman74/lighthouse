import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/lib/site-config";

// One embed per branch, each centred on the branch's exact coordinates so the
// pin lands precisely on the location. `q=lat,lng` drops a marker; no API key needed.
function branchEmbed(lat: number, lng: number) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=en&output=embed`;
}

export function MapSection() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {siteConfig.branches.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden border-[1.5px] border-cream-200 shadow-soft-md"
            >
              <iframe
                title={`Map of ${b.name} — ${b.address}`}
                src={branchEmbed(b.lat, b.lng)}
                className="w-full h-[320px] block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="px-7 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="text-sm text-ink-700">
                  <strong>{b.name}</strong> — {b.address}
                </div>
                <Button asChild variant="ghost" size="sm">
                  <a href={b.mapsHref} target="_blank" rel="noreferrer">
                    Open in Google Maps →
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
