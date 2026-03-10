// ── components/forms/TeachingForm.jsx ──

import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';
import { addEntry, removeEntry } from '../../utils/helpers';

const DEFAULT_ENTRY = {
  id: '',
  subject: '',
  semester: 'Odd',
  hoursPerWeek: 0,
  attendancePercent: 0,
  resultPercent: 0,
};

/**
 * TeachingForm
 * Self-contained form for teaching entries.
 * No props required.
 */
export default function TeachingForm() {
  const [entries, setEntries] = useState([{ ...DEFAULT_ENTRY, id: '1' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              Teaching Entry #{i + 1}
            </h3>
            <button
              onClick={() => removeEntry(setEntries, entries, entry.id)}
              style={{ ...styles.menuBtn, color: '#ef4444' }}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>

            <div>
              <label style={styles.label}>Subject</label>
              <input style={styles.input} placeholder="e.g., Data Structures" />
            </div>

            <div>
              <label style={styles.label}>Semester</label>
              <select style={styles.input}>
                <option>Odd</option>
                <option>Even</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Hours / Week</label>
              <input type="number" style={styles.input} placeholder="0" />
            </div>

            <div>
              <label style={styles.label}>Attendance %</label>
              <input type="number" style={styles.input} placeholder="0" />
            </div>

            <div>
              <label style={styles.label}>Result %</label>
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

      {/* Add button */}
      <button
        style={styles.addBtn}
        onClick={() => addEntry(setEntries, entries, DEFAULT_ENTRY)}
      >
        <Plus size={16} /> Add Teaching Entry
      </button>

    </div>
  );
}