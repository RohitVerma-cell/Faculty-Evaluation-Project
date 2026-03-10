// ── components/forms/ConsultancyForm.jsx ──

import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';
import { addEntry, removeEntry } from '../../utils/helpers';

const DEFAULT_ENTRY = {
  id: '',
  title: '',
  organization: '',
  amount: 0,
  year: 2024,
};

/**
 * ConsultancyForm
 * Self-contained form for consultancy project entries.
 */
export default function ConsultancyForm() {
  const [entries, setEntries] = useState([{ ...DEFAULT_ENTRY, id: '1' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              Consultancy #{i + 1}
            </h3>
            <button
              onClick={() => removeEntry(setEntries, entries, entry.id)}
              style={{ ...styles.menuBtn, color: '#ef4444' }}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>

            <div>
              <label style={styles.label}>Title</label>
              <input style={styles.input} placeholder="Project title" />
            </div>

            <div>
              <label style={styles.label}>Organization</label>
              <input style={styles.input} placeholder="Client organization" />
            </div>

            <div>
              <label style={styles.label}>Amount (₹)</label>
              <input type="number" style={styles.input} placeholder="0" />
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
        onClick={() => addEntry(setEntries, entries, DEFAULT_ENTRY)}
      >
        <Plus size={16} /> Add Consultancy
      </button>

    </div>
  );
}