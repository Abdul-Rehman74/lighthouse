import { GalleryFilter, ScrapbookPhoto } from 'lighthouse-daycare';

export function FilterBar() {
  return <GalleryFilter />;
}

export function Grid() {
  const tapes = ['rgba(255,210,63,0.6)', 'rgba(143,212,172,0.6)', 'rgba(255,158,123,0.6)', 'rgba(95,179,240,0.55)'];
  const items = [
    { scene: 'play', caption: 'circle time', r: -2 },
    { scene: 'art', caption: 'paint day', r: 1 },
    { scene: 'food', caption: "snack o'clock", r: -1 },
    { scene: 'outdoor', caption: 'garden visit', r: 2 },
    { scene: 'learn', caption: 'so curious', r: -1.5 },
    { scene: 'nap', caption: 'sweet dreams', r: 1.5 },
  ] as const;
  return (
    <div style={{ padding: '0 20px 60px' }}>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
        {['All', 'Play', 'Learning', 'Outdoor', 'Meals', 'Art', 'Naps'].map((f, i) => (
          <button key={f} style={{ padding: '10px 20px', borderRadius: 999, border: '1.5px solid #E5E7EB', fontSize: 14, fontWeight: 700, background: i === 0 ? '#1F2A37' : '#fff', color: i === 0 ? '#FEFCE8' : '#1F2A37' }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 36px' }}>
        {items.map((it, i) => (
          <ScrapbookPhoto key={i} scene={it.scene} caption={it.caption} rotate={it.r} height={200} tapeColor={tapes[i % tapes.length]} />
        ))}
      </div>
    </div>
  );
}
