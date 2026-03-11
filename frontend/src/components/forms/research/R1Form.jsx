
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../utils/styles';

const EMPTY = () => ({ id: String(Date.now() + Math.random()), title: '', journalName: '', issnNumber: '', yearOfPublication: '', indexing: 'Scopus', authorshipPosition: '1st', volumeIssue: '' });

export default function R1Form({ entries, setEntries }) {
  const add    = () => setEntries([...entries, EMPTY()]);
  const remove = (id) => { if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id)); };
  const update = (id, field, value) => setEntries(entries.map((e) => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Journal Paper #{i + 1}</h3>
            <button onClick={() => remove(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
          </div>
          <div style={styles.grid}>
            <div style={styles.gridFull}>
              <label style={styles.label}>Title of Paper</label>
              <input style={styles.input} placeholder="Paper title" value={entry.title}
                onChange={(e) => update(entry.id, 'title', e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Journal Name</label>
              <input style={styles.input} placeholder="Journal name" value={entry.journalName}
                onChange={(e) => update(entry.id, 'journalName', e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>ISSN Number</label>
              <input style={styles.input} placeholder="XXXX-XXXX" value={entry.issnNumber}
                onChange={(e) => update(entry.id, 'issnNumber', e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Year of Publication</label>
              <input type="number" style={styles.input} placeholder="2024" value={entry.yearOfPublication}
                onChange={(e) => update(entry.id, 'yearOfPublication', e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Indexing</label>
              <select style={styles.input} value={entry.indexing}
                onChange={(e) => update(entry.id, 'indexing', e.target.value)}>
                <option>Scopus</option><option>SCI</option><option>NAAS Rating</option>
                <option>ABDC</option><option>ERIC</option><option>Copernicus</option><option>Other</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Authorship Position</label>
              <select style={styles.input} value={entry.authorshipPosition}
                onChange={(e) => update(entry.id, 'authorshipPosition', e.target.value)}>
                <option value="1st">1st Author</option><option value="2nd">2nd Author</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Volume & Issue</label>
              <input style={styles.input} placeholder="e.g. Vol. 12, Issue 3" value={entry.volumeIssue}
                onChange={(e) => update(entry.id, 'volumeIssue', e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Proof (PDF)</label>
              <label style={styles.uploadLabel}><Upload size={16} /> Upload PDF<input type="file" accept=".pdf" style={{ display: 'none' }} /></label>
            </div>
          </div>
        </div>
      ))}
      <button style={styles.addBtn} onClick={add}><Plus size={16} /> Add Journal Paper</button>
    </div>
  );
}