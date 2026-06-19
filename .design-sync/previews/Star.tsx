import { Star } from 'lighthouse-daycare';

export function Stars() {
  return (
    <div style={{ position: 'relative', width: 260, height: 120 }}>
      <Star className="top-[10px] left-[10px]" color="#FF9E7B" />
      <Star className="top-[40px] left-[80px]" color="#FFD23F" scale={1.4} />
      <Star className="top-[10px] left-[160px]" color="#8FD4AC" scale={0.8} />
      <Star className="top-[60px] left-[220px]" color="#92CDF8" scale={1.2} />
    </div>
  );
}

export function Coral() {
  return (
    <div style={{ position: 'relative', width: 60, height: 60 }}>
      <Star color="#FF9E7B" style={{ position: 'static' }} />
    </div>
  );
}

export function Sun() {
  return (
    <div style={{ position: 'relative', width: 60, height: 60 }}>
      <Star color="#FFD23F" scale={1.5} style={{ position: 'static' }} />
    </div>
  );
}
