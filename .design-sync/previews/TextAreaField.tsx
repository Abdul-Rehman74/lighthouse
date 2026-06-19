import { TextAreaField } from 'lighthouse-daycare';

export function Default() {
  return (
    <div style={{ maxWidth: 420, padding: 24 }}>
      <TextAreaField label="Anything we should know? (optional)" rows={4} placeholder="Allergies, special needs, questions..." />
    </div>
  );
}
