import { Logo } from 'lighthouse-daycare';

export function OnDark() {
  return (
    <div style={{ background: '#1F2A37', padding: '20px 24px', display: 'inline-block', borderRadius: 16 }}>
      <Logo dark={true} />
    </div>
  );
}

export function OnLight() {
  return (
    <div style={{ background: '#FBF4E3', padding: '20px 24px', display: 'inline-block', borderRadius: 16 }}>
      <Logo dark={false} />
    </div>
  );
}
