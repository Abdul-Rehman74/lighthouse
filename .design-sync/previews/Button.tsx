import { Button } from 'lighthouse-daycare';

export function Primary() {
  return <Button variant="primary">Book a visit</Button>;
}

export function Sun() {
  return <Button variant="sun">✿ Book a free visit</Button>;
}

export function Ghost() {
  return <Button variant="ghost">Learn more →</Button>;
}

export function WhatsApp() {
  return <Button variant="whatsapp">💬 WhatsApp us</Button>;
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="sun" size="sm">Small</Button>
      <Button variant="sun" size="md">Medium</Button>
      <Button variant="sun" size="lg">Large</Button>
    </div>
  );
}
