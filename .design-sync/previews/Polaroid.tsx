import { Polaroid } from 'lighthouse-daycare';

export function Single() {
  return (
    <div style={{ position: 'relative', width: 280, height: 310, margin: '16px 0 0 16px' }}>
      <Polaroid scene="play" caption="circle time" rotate={-4} width={260} />
    </div>
  );
}

export function Care() {
  return (
    <div style={{ position: 'relative', width: 280, height: 310, margin: '16px 0 0 16px' }}>
      <Polaroid scene="care" caption="we got you ✿" rotate={3} width={260} tapeColor="rgba(143,212,172,0.6)" />
    </div>
  );
}

export function Stack() {
  return (
    <div style={{ position: 'relative', width: 440, height: 380, margin: '20px 0 0 20px' }}>
      <Polaroid scene="play" caption="circle time" rotate={-6} style={{ top: 0, left: 0 }} width={220} />
      <Polaroid scene="art" caption="paint day!" rotate={5} style={{ top: 40, left: 200 }} width={200} tapeColor="rgba(143,212,172,0.6)" />
    </div>
  );
}
