import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/lib/site-config";

// Use the first branch as the map's focus; no API key needed for the embed.
const primary = siteConfig.branches[0];
const query = `${primary.name}, ${primary.address}`;
const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export function MapSection() {
  return (
    <section className="py-10">
      <Container>
        <div className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden border-[1.5px] border-cream-200 shadow-soft-md">
          <iframe
            title={`Map of ${primary.name}`}
            src={embedSrc}
            className="w-full h-[420px] block border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="px-7 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="text-sm text-ink-700">
              <strong>{primary.name}</strong> — {primary.address}
            </div>
            <Button asChild variant="ghost" size="sm">
              <a href={primary.mapsHref} target="_blank" rel="noreferrer">
                Open in Google Maps →
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
