import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../../utils/styles'
import PDFUpload from '../../PDFUpload';

const EMPTY = () => ({ id: String(Date.now()+Math.random()), paperTitle:'', conferenceTitle:'', isbnNumberDate:'', indexing:'Scopus', authorshipPosition:'1st', publisher:'International' });

export default function R3Form({ entries, setEntries }) {
  const add    = () => setEntries([...entries, EMPTY()]);
  const remove = (id) => { if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id)); };
  const update = (id, f, v) => setEntries(entries.map((e) => e.id===id ? {...e,[f]:v} : e));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Conference Paper #{i + 1}</h3>
            <button onClick={() => remove(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
          </div>
          <div style={styles.grid}>
            <div style={styles.gridFull}><label style={styles.label}>Research Paper Title</label>
              <input style={styles.input} placeholder="Paper title" value={entry.paperTitle}
                onChange={(e) => update(entry.id, 'paperTitle', e.target.value)} /></div>
            <div style={styles.gridFull}><label style={styles.label}>Conference Title</label>
              <input style={styles.input} placeholder="Conference name" value={entry.conferenceTitle}
                onChange={(e) => update(entry.id, 'conferenceTitle', e.target.value)} /></div>
            <div><label style={styles.label}>ISBN Number & Date</label>
              <input style={styles.input} placeholder="ISBN, Date" value={entry.isbnNumberDate}
                onChange={(e) => update(entry.id, 'isbnNumberDate', e.target.value)} /></div>
            <div><label style={styles.label}>Indexing</label>
              <select style={styles.input} value={entry.indexing}
                onChange={(e) => update(entry.id, 'indexing', e.target.value)}>
                <option>Scopus</option><option>IEEE</option><option>Wiley</option><option>Springer</option>
              </select></div>
            <div><label style={styles.label}>Authorship Position</label>
              <select style={styles.input} value={entry.authorshipPosition}
                onChange={(e) => update(entry.id, 'authorshipPosition', e.target.value)}>
                <option value="1st">1st</option><option value="2nd">2nd</option>
              </select></div>
            <div><label style={styles.label}>Publisher</label>
              <select style={styles.input} value={entry.publisher}
                onChange={(e) => update(entry.id, 'publisher', e.target.value)}>
                <option>International</option><option>National</option>
              </select></div>
            <div>
              {/* <label style={styles.label}>Proof (PDF)</label>
              <label style={styles.uploadLabel}><Upload size={16} /> Upload<input type="file" accept=".pdf" style={{ display: 'none' }} /></label> */}
              <PDFUpload label="Proof (PDF)" value={entry.proof} onChange={(val) => update(entry.id, 'proof', val)} />
              </div>
          </div>
        </div>
      ))}
      <button style={styles.addBtn} onClick={add}><Plus size={16} /> Add Conference Paper</button>
    </div>
  );
}