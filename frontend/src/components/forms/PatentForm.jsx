// ── components/forms/PatentForm.jsx ──

import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';
import { calculatePatentMarks } from '../../utils/helpers';

const DEFAULT_ENTRY = {
  id: '',
  title: '',
  status: 'filed',
  type: 'national',
  year: 2024,
  marks: 5,   // filed + national = 5
};

/**
 * PatentForm
 * Self-contained form for patent entries.
 * Auto-calculates marks when status / type changes.
 */
export default function PatentForm() {
  const [entries, setEntries] = useState([{ ...DEFAULT_ENTRY, id: '1' }]);

  /** Update a single field on one entry and recalculate marks */
  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, [field]: value };
        updated.marks = calculatePatentMarks(updated.status, updated.type);
        return updated;
      })
    );
  };

  const removeEntry = (id) => {
    if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              Patent #{i + 1}
            </h3>
            <button
              onClick={() => removeEntry(entry.id)}
              style={{ ...styles.menuBtn, color: '#ef4444' }}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Title</label>
              <input style={styles.input} placeholder="Patent title" />
            </div>

            <div>
              <label style={styles.label}>Status</label>
              <select
                style={styles.input}
                value={entry.status}
                onChange={(e) => updateEntry(entry.id, 'status', e.target.value)}
              >
                <option value="filed">Filed</option>
                <option value="published">Published</option>
                <option value="granted">Granted</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Type</label>
              <select
                style={styles.input}
                value={entry.type}
                onChange={(e) => updateEntry(entry.id, 'type', e.target.value)}
              >
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Auto-Calculated Marks</label>
              <div style={{
                padding: '8px 12px',
                background: '#f1f5f9',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                color: '#0f172a',
              }}>
                {entry.marks} marks
              </div>
            </div>

            <div>
              <label style={styles.label}>Proof (PDF)</label>
              <label style={styles.uploadLabel}>
                <Upload size={16} /> Upload PDF
                <input type="file" accept=".pdf" style={{ display: 'none' }} />
              </label>
            </div>

          </div>
        </div>
      ))}

      <button
        style={styles.addBtn}
        onClick={() =>
          setEntries([...entries, { ...DEFAULT_ENTRY, id: String(Date.now()) }])
        }
      >
        <Plus size={16} /> Add Patent
      </button>

    </div>
  );
}