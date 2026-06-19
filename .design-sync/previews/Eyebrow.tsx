import { Eyebrow } from 'lighthouse-daycare';

export function Coral() {
  return <Eyebrow color="text-coral-400">our story</Eyebrow>;
}

export function Sun() {
  return <Eyebrow color="text-sun-300">a typical day</Eyebrow>;
}

export function Mint() {
  return <Eyebrow color="text-mint-400">what we stand for</Eyebrow>;
}

export function OnDark() {
  return (
    <div style={{ background: '#1F2A37', padding: '20px 24px', borderRadius: 16 }}>
      <Eyebrow color="text-sun-300">fastest reply</Eyebrow>
    </div>
  );
}
