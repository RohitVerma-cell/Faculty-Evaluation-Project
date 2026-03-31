
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../utils/styles';

const DEFAULT_ENTRY = {
  title: '',
  organizer: '',
  duration: '',
  type: 'attended',
  year: new Date().getFullYear(),
};

export default function FDPForm({ entries, setEntries }) {
  const addEntry = () => {
    setEntries([...entries, { ...DEFAULT_ENTRY, id: String(Date.now()) }]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id, field, value) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>FDP / Workshop #{i + 1}</h3>
            <button onClick={() => removeEntry(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Title</label>
              <input
                style={styles.input}
                placeholder="FDP / Workshop title"
                value={entry.title}
                onChange={(e) => updateEntry(entry.id, 'title', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Organizer</label>
              <input
                style={styles.input}
                placeholder="Organizing institution"
                value={entry.organizer}
                onChange={(e) => updateEntry(entry.id, 'organizer', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Duration</label>
              <input
                style={styles.input}
                placeholder="e.g., 5 days"
                value={entry.duration}
                onChange={(e) => updateEntry(entry.id, 'duration', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Type</label>
              <select
                style={styles.input}
                value={entry.type}
                onChange={(e) => updateEntry(entry.id, 'type', e.target.value)}
              >
                <option value="attended">Attended</option>
                <option value="organized">Organized</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Year</label>
              <input
                type="number"
                style={styles.input}
                value={entry.year}
                onChange={(e) => updateEntry(entry.id, 'year', Number(e.target.value))}
              />
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

      <button style={styles.addBtn} onClick={addEntry}>
        <Plus size={16} /> Add FDP / Workshop
      </button>
    </div>
  );
}