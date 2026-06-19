import { SelectField } from 'lighthouse-daycare';

export function Default() {
  return (
    <div style={{ maxWidth: 420, padding: 24 }}>
      <SelectField label="Package interested in">
        <option>Half day (8–12) — Rs. 22,000</option>
        <option>School day (8–3)</option>
        <option>Full day (8–6) — Rs. 28,000</option>
        <option>Not sure yet — please advise</option>
      </SelectField>
    </div>
  );
}
