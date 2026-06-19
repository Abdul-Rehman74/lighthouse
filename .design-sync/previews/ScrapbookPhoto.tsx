import { ScrapbookPhoto } from 'lighthouse-daycare';

export function Play() {
  return (
    <div style={{ display: 'inline-block', marginTop: 16, marginLeft: 16 }}>
      <ScrapbookPhoto scene="play" caption="circle time" rotate={-2} height={220} />
    </div>
  );
}

export function Art() {
  return (
    <div style={{ display: 'inline-block', marginTop: 16, marginLeft: 16 }}>
      <ScrapbookPhoto scene="art" caption="paint day" rotate={2} tapeColor="rgba(143,212,172,0.6)" height={220} />
    </div>
  );
}

export function Grid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px', padding: '20px 20px 40px', background: '#F5EDD8', borderRadius: 20 }}>
      <ScrapbookPhoto scene="play" caption="circle time" rotate={-2} height={200} tapeColor="rgba(255,210,63,0.6)" />
      <ScrapbookPhoto scene="food" caption="snack o'clock" rotate={1.5} height={200} tapeColor="rgba(255,158,123,0.6)" />
      <ScrapbookPhoto scene="art" caption="masterpiece" rotate={-1} height={200} tapeColor="rgba(95,179,240,0.55)" />
      <ScrapbookPhoto scene="outdoor" caption="garden!" rotate={2} height={200} tapeColor="rgba(143,212,172,0.6)" />
    </div>
  );
}
