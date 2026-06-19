import { FormField } from 'lighthouse-daycare';

export function Default() {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <FormField label="Parent's name" placeholder="e.g. Ayesha Khan" />
    </div>
  );
}

export function WithValue() {
  return (
    <div style={{ maxWidth: 400, padding: 24 }}>
      <FormField label="WhatsApp number" type="tel" value="+92 300 0000000" placeholder="+92 3__ _______" onChange={() => {}} />
    </div>
  );
}

export function Stack() {
  return (
    <div style={{ maxWidth: 420, padding: 24 }}>
      <FormField label="Parent's name" placeholder="Ayesha Khan" />
      <FormField label="Child's age" placeholder="14 months" />
      <FormField label="Preferred date" placeholder="DD / MM / YYYY" />
    </div>
  );
}
