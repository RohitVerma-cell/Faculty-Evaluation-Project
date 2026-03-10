// ── components/forms/FDPForm.jsx ──

import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';
import { addEntry, removeEntry } from '../../utils/helpers';

const DEFAULT_ENTRY = {
  id: '',
  title: '',
  organizer: '',
  duration: '',
  type: 'attended',
  year: 2024,
};

/**
 * FDPForm
 * Self-contained form for FDP / Workshop entries.
 */
export default function FDPForm() {
  const [entries, setEntries] = useState([{ ...DEFAULT_ENTRY, id: '1' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              FDP / Workshop #{i + 1}
            </h3>
            <button
              onClick={() => removeEntry(setEntries, entries, entry.id)}
              style={{ ...styles.menuBtn, color: '#ef4444' }}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Title</label>
              <input style={styles.input} placeholder="FDP title" />
            </div>

            <div>
              <label style={styles.label}>Organizer</label>
              <input style={styles.input} placeholder="Organizing institution" />
            </div>

            <div>
              <label style={styles.label}>Duration</label>
              <input style={styles.input} placeholder="e.g., 5 days" />
            </div>

            <div>
              <label style={styles.label}>Type</label>
              <select style={styles.input}>
                <option value="attended">Attended</option>
                <option value="organized">Organized</option>
              </select>
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
        <Plus size={16} /> Add FDP / Workshop
      </button>

    </div>
  );
}