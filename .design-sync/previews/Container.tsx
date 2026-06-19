import { Container } from 'lighthouse-daycare';

export function Default() {
  return (
    <Container>
      <div style={{ background: '#FFE27A', borderRadius: 16, padding: '24px 32px', fontFamily: 'Fraunces, serif', fontSize: 20 }}>
        Max-width 1440px · auto horizontal padding (20px → 64px across breakpoints)
      </div>
    </Container>
  );
}

export function AsSection() {
  return (
    <Container as="section">
      <div style={{ background: '#C8EBD7', borderRadius: 16, padding: '24px 32px', fontFamily: 'Nunito, sans-serif', fontSize: 15, color: '#1F2A37' }}>
        Container as &lt;section&gt; — same layout constraints, semantic wrapper
      </div>
    </Container>
  );
}
