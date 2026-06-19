import { TiltCard } from 'lighthouse-daycare';

export function Sun() {
  return (
    <TiltCard bg="#FFE27A" rotate={-1.5} style={{ maxWidth: 280 }}>
      <div style={{ fontSize: 36 }}>👩‍🏫</div>
      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, margin: '12px 0 0' }}>Always staffed</h3>
      <p style={{ fontSize: 14, color: '#3A4756', marginTop: 8 }}>22 teachers and 5 professional nannies, every single day.</p>
    </TiltCard>
  );
}

export function Sky() {
  return (
    <TiltCard bg="#C9E7FF" rotate={1} style={{ maxWidth: 280 }}>
      <div style={{ fontSize: 36 }}>🧼</div>
      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, margin: '12px 0 0' }}>Spotlessly clean</h3>
      <p style={{ fontSize: 14, color: '#3A4756', marginTop: 8 }}>Sanitization isn't a chore — it's the foundation.</p>
    </TiltCard>
  );
}

export function Row() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <TiltCard bg="#FFE27A" rotate={-1.5}><div style={{ fontSize: 32 }}>👩‍🏫</div><h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginTop: 12 }}>Always staffed</h3></TiltCard>
      <TiltCard bg="#C9E7FF" rotate={1}><div style={{ fontSize: 32 }}>🧼</div><h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginTop: 12 }}>Spotlessly clean</h3></TiltCard>
      <TiltCard bg="#C8EBD7" rotate={-1}><div style={{ fontSize: 32 }}>🌱</div><h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginTop: 12 }}>Joyful Montessori</h3></TiltCard>
    </div>
  );
}
