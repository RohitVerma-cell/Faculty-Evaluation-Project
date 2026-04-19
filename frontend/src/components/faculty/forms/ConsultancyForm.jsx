import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../utils/styles';

const DEFAULT_ENTRY = {
  title: '',
  organization: '',
  amount: 0,
  year: new Date().getFullYear(),
};

export default function ConsultancyForm({ entries, setEntries }) {
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
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Consultancy #{i + 1}</h3>
            <button onClick={() => removeEntry(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label style={styles.label}>Title</label>
              <input
                style={styles.input}
                placeholder="Project title"
                value={entry.title}
                onChange={(e) => updateEntry(entry.id, 'title', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Organization</label>
              <input
                style={styles.input}
                placeholder="Client organization"
                value={entry.organization}
                onChange={(e) => updateEntry(entry.id, 'organization', e.target.value)}
              />
            </div>

            <div>
              <label style={styles.label}>Amount (₹)</label>
              <input
                type="number"
                style={styles.input}
                placeholder="0"
                value={entry.amount}
                onChange={(e) => updateEntry(entry.id, 'amount', Number(e.target.value))}
              />
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
        <Plus size={16} /> Add Consultancy
      </button>
    </div>
  );
}