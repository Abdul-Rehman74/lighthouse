import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { MapPin } from "lucide-react";

function Pin({ x, y, label, color }: { x: string; y: string; label: string; color: string }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      <div
        className="px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap text-ink-900 shadow-soft-md mb-1"
        style={{ background: color }}
      >
        {label}
      </div>
      <div
        className="w-0 h-0 mx-auto"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `12px solid ${color}`,
        }}
      />
    </div>
  );
}

export function MapSection() {
  return (
    <section className="py-10">
      <Container>
        <div className="bg-white rounded-[28px] md:rounded-[32px] overflow-hidden border-[1.5px] border-cream-200 shadow-soft-md">
          <div
            className="h-[420px] relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #EAF6FF 0%, #C8EBD7 100%)" }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 420"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0"
              aria-hidden
            >
              <path d="M0 280 L400 200 L800 240" stroke="white" strokeWidth="14" fill="none" />
              <path d="M0 280 L400 200 L800 240" stroke="#E5DDC9" strokeWidth="2" strokeDasharray="8 8" fill="none" />
              <path d="M200 0 L240 420" stroke="white" strokeWidth="10" fill="none" />
              <path d="M560 0 L600 420" stroke="white" strokeWidth="10" fill="none" />
              <path d="M0 100 L800 80" stroke="white" strokeWidth="8" fill="none" />
              <circle cx="100" cy="50" r="40" fill="#8FD4AC" opacity="0.7" />
              <circle cx="700" cy="350" r="50" fill="#8FD4AC" opacity="0.6" />
              <circle cx="450" cy="380" r="35" fill="#8FD4AC" opacity="0.5" />
              <rect x="320" y="240" width="40" height="40" fill="#FBF4E3" stroke="#B7BFC9" />
              <rect x="500" y="180" width="50" height="50" fill="#FBF4E3" stroke="#B7BFC9" />
              <rect x="150" y="160" width="35" height="35" fill="#FBF4E3" stroke="#B7BFC9" />
            </svg>

            <Pin x="32%" y="42%" label="Islamabad — F-10" color="#FFD23F" />
            <Pin x="68%" y="56%" label="Rawalpindi — Bahria" color="#FF9E7B" />

            <div className="absolute bottom-3.5 right-4 bg-white/85 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-ink-500 flex items-center gap-1">
              <MapPin size={12} /> Google Maps will go here
            </div>
          </div>
          <div className="px-7 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="text-sm text-ink-700">
              <strong>Both branches</strong> on the map. Click a pin to get directions.
            </div>
            <Button asChild variant="ghost" size="sm">
              <a
                href="https://maps.google.com/?q=Lighthouse+Daycare+Islamabad"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps →
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
