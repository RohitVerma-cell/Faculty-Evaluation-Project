import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../utils/styles';

const DEFAULT_ENTRY = {
  subject: '',
  semester: 'Odd',
  hoursPerWeek: 0,
  attendancePercent: 0,
  resultPercent: 0,
};

export default function TeachingForm({ entries, setEntries }) {
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
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Teaching Entry #{i + 1}</h3>
            <button onClick={() => removeEntry(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label style={styles.label}>Subject</label>
              <input
                style={styles.input}
                placeholder="e.g., Data Structures"
                value={entry.subject}
                onChange={(e) => updateEntry(entry.id, 'subject', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Semester</label>
              <select
                style={styles.input}
                value={entry.semester}
                onChange={(e) => updateEntry(entry.id, 'semester', e.target.value)}
              >
                <option>Odd</option>
                <option>Even</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Hours / Week</label>
              <input
                type="number"
                style={styles.input}
                placeholder="0"
                value={entry.hoursPerWeek}
                onChange={(e) => updateEntry(entry.id, 'hoursPerWeek', Number(e.target.value))}
              />
            </div>

            <div>
              <label style={styles.label}>Attendance %</label>
              <input
                type="number"
                style={styles.input}
                placeholder="0"
                value={entry.attendancePercent}
                onChange={(e) => updateEntry(entry.id, 'attendancePercent', Number(e.target.value))}
              />
            </div>

            <div>
              <label style={styles.label}>Result %</label>
              <input
                type="number"
                style={styles.input}
                placeholder="0"
                value={entry.resultPercent}
                onChange={(e) => updateEntry(entry.id, 'resultPercent', Number(e.target.value))}
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
        <Plus size={16} /> Add Teaching Entry
      </button>
    </div>
  );
}