// ── components/forms/ResearchForm.jsx ──

import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';
import { addEntry, removeEntry } from '../../utils/helpers';

const DEFAULT_ENTRY = {
  id: '',
  title: '',
  type: 'journal',
  publicationName: '',
  indexing: 'SCI',
  year: 2024,
};

/**
 * ResearchForm
 * Self-contained form for research paper entries.
 * No props required.
 */
export default function ResearchForm() {
  const [entries, setEntries] = useState([{ ...DEFAULT_ENTRY, id: '1' }]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              Research Paper #{i + 1}
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

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Title</label>
              <input style={styles.input} placeholder="Paper title" />
            </div>

            <div>
              <label style={styles.label}>Type</label>
              <select style={styles.input}>
                <option value="journal">Journal</option>
                <option value="conference">Conference</option>
                <option value="book_chapter">Book Chapter</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Publication</label>
              <input style={styles.input} placeholder="Journal / Conference name" />
            </div>

            <div>
              <label style={styles.label}>Indexing</label>
              <select style={styles.input}>
                <option>SCI</option>
                <option>Scopus</option>
                <option>UGC</option>
                <option>Other</option>
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
        <Plus size={16} /> Add Research Paper
      </button>

    </div>
  );
}