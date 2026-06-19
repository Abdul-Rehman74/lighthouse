import { CTABanner } from 'lighthouse-daycare';

export function MintSky() {
  return (
    <CTABanner
      eyebrow="photos are nice..."
      title="...visiting is better."
      ctaLabel="Book a free trial →"
      ctaHref="/contact"
    />
  );
}

export function SunCoral() {
  return (
    <CTABanner
      eyebrow="still deciding?"
      title="Try a half-day, on us."
      ctaLabel="Book a free trial →"
      ctaHref="/contact"
      background="linear-gradient(135deg, #FFD23F 0%, #FF9E7B 100%)"
    />
  );
}

export function Sky() {
  return (
    <CTABanner
      eyebrow="see everything we offer"
      title="Three packages. Pay monthly."
      ctaLabel="View packages →"
      ctaHref="/packages"
      background="linear-gradient(135deg, #C9E7FF 0%, #FFF0B8 100%)"
    />
  );
}
