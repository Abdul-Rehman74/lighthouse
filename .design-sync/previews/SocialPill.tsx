import { SocialPill } from 'lighthouse-daycare';

export function WhatsApp() {
  return <SocialPill kind="whatsapp" href="#" />;
}

export function Instagram() {
  return <SocialPill kind="instagram" href="#" />;
}

export function Facebook() {
  return <SocialPill kind="facebook" href="#" />;
}

export function Row() {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <SocialPill kind="whatsapp" href="#" />
      <SocialPill kind="instagram" href="#" />
      <SocialPill kind="facebook" href="#" />
    </div>
  );
}
