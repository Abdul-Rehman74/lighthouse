import { BigStat } from 'lighthouse-daycare';

export function Years() {
  return <BigStat n="7" label="years in the Twin Cities" color="#1F2A37" />;
}

export function Teachers() {
  return <BigStat n="22" label="dedicated teachers" color="#FF9E7B" />;
}

export function Rating() {
  return <BigStat n="4.9★" label="parent satisfaction score" color="#FFD23F" />;
}

export function Row() {
  return (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', background: '#1F2A37', padding: 32, borderRadius: 20 }}>
      <BigStat n="7" label="years serving families" color="#FFD23F" />
      <BigStat n="22" label="trained teachers" color="#FF9E7B" />
      <BigStat n="4.9★" label="parent rating" color="#8FD4AC" />
    </div>
  );
}
