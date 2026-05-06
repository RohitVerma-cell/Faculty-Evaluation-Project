import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from '../../../../utils/styles';
import PDFUpload from '../../PDFUpload';

// ── Sab blank ──
const EMPTY_BOOK    = () => ({ id: String(Date.now()+Math.random()), title:'', isbnNumber:'', yearOfPublication:'', indexing:'', authorshipPosition:'', publisher:'', proof: null });
const EMPTY_CHAPTER = () => ({ id: String(Date.now()+Math.random()), chapterTitle:'', bookTitle:'', isbnNumber:'', authorshipPosition:'', publisherName:'', proof: null });
const EMPTY_EDITOR  = () => ({ id: String(Date.now()+Math.random()), title:'', isbnNumber:'', yearOfPublication:'', authorshipPosition:'', publisher:'', proof: null });

const SUBTABS = [
  { key: 'book',    label: 'R.2.1-3 Book Publication' },
  { key: 'chapter', label: 'R.2.4 Book Chapter' },
  { key: 'editor',  label: 'R.2.5-6 Book as Editor' },
];

export default function R2Form({ data, setData }) {
  const [sub, setSub] = useState('book');

  const add    = (key, empty) => setData({ ...data, [key]: [...(data[key]||[]), empty()] });
  const remove = (key, id)    => setData({ ...data, [key]: (data[key]||[]).filter((e) => e.id !== id) });
  const update = (key, id, field, value) => setData({ ...data, [key]: (data[key]||[]).map((e) => e.id===id ? {...e,[field]:value} : e) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={styles.subTabBar}>
        {SUBTABS.map((t) => (
          <button key={t.key} onClick={() => setSub(t.key)} style={sub === t.key ? styles.subTabActive : styles.subTabInactive}>{t.label}</button>
        ))}
      </div>

      {/* R.2.1-3 Book */}
      {sub === 'book' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(data.books||[]).map((entry, i) => (
            <div key={entry.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-main,#0f172a)' }}>Book #{i + 1}</h3>
                <button onClick={() => remove('books', entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
              <div style={styles.grid}>
                <div style={styles.gridFull}>
                  <label style={styles.label}>Title of Book</label>
                  <input style={styles.input} placeholder="Book title" value={entry.title}
                    onChange={(e) => update('books', entry.id, 'title', e.target.value)} />
                </div>
                <div><label style={styles.label}>ISBN Number</label>
                  <input style={styles.input} placeholder="ISBN" value={entry.isbnNumber}
                    onChange={(e) => update('books', entry.id, 'isbnNumber', e.target.value)} /></div>
                <div><label style={styles.label}>Year of Publication</label>
                  <input type="number" style={styles.input} placeholder="e.g. 2024" value={entry.yearOfPublication}
                    onChange={(e) => update('books', entry.id, 'yearOfPublication', e.target.value)} /></div>
                <div><label style={styles.label}>Indexing</label>
                  <select style={styles.input} value={entry.indexing}
                    onChange={(e) => update('books', entry.id, 'indexing', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option>Scopus</option><option>IEEE</option><option>Wiley</option><option>Springer</option><option>Other</option>
                  </select></div>
                <div><label style={styles.label}>Authorship Position</label>
                  <select style={styles.input} value={entry.authorshipPosition}
                    onChange={(e) => update('books', entry.id, 'authorshipPosition', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="1st">1st</option><option value="2nd">2nd</option>
                  </select></div>
                <div><label style={styles.label}>Publisher</label>
                  <select style={styles.input} value={entry.publisher}
                    onChange={(e) => update('books', entry.id, 'publisher', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option>International</option><option>National</option>
                  </select></div>
                <div>
                  <PDFUpload label="Proof (PDF)" value={entry.proof}
                    onChange={(val) => update('books', entry.id, 'proof', val)} />
                </div>
              </div>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => add('books', EMPTY_BOOK)}><Plus size={16} /> Add Book</button>
        </div>
      )}

      {/* R.2.4 Chapter */}
      {sub === 'chapter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(data.bookChapters||[]).map((entry, i) => (
            <div key={entry.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-main,#0f172a)' }}>Chapter #{i + 1}</h3>
                <button onClick={() => remove('bookChapters', entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
              <div style={styles.grid}>
                <div style={styles.gridFull}><label style={styles.label}>Chapter Title</label>
                  <input style={styles.input} placeholder="Chapter title" value={entry.chapterTitle}
                    onChange={(e) => update('bookChapters', entry.id, 'chapterTitle', e.target.value)} /></div>
                <div style={styles.gridFull}><label style={styles.label}>Book Title</label>
                  <input style={styles.input} placeholder="Book title" value={entry.bookTitle}
                    onChange={(e) => update('bookChapters', entry.id, 'bookTitle', e.target.value)} /></div>
                <div><label style={styles.label}>ISBN Number</label>
                  <input style={styles.input} placeholder="ISBN" value={entry.isbnNumber}
                    onChange={(e) => update('bookChapters', entry.id, 'isbnNumber', e.target.value)} /></div>
                <div><label style={styles.label}>Authorship Position</label>
                  <select style={styles.input} value={entry.authorshipPosition}
                    onChange={(e) => update('bookChapters', entry.id, 'authorshipPosition', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="1st">1st</option><option value="2nd">2nd</option>
                  </select></div>
                <div style={styles.gridFull}><label style={styles.label}>Publisher Name & Address</label>
                  <input style={styles.input} placeholder="Publisher name and address" value={entry.publisherName}
                    onChange={(e) => update('bookChapters', entry.id, 'publisherName', e.target.value)} /></div>
                <div>
                  <PDFUpload label="Proof (PDF)" value={entry.proof}
                    onChange={(val) => update('bookChapters', entry.id, 'proof', val)} />
                </div>
              </div>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => add('bookChapters', EMPTY_CHAPTER)}><Plus size={16} /> Add Book Chapter</button>
        </div>
      )}

      {/* R.2.5-6 Editor */}
      {sub === 'editor' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(data.editorBooks||[]).map((entry, i) => (
            <div key={entry.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-main,#0f172a)' }}>Editor Book #{i + 1}</h3>
                <button onClick={() => remove('editorBooks', entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
              <div style={styles.grid}>
                <div style={styles.gridFull}><label style={styles.label}>Title</label>
                  <input style={styles.input} placeholder="Book title" value={entry.title}
                    onChange={(e) => update('editorBooks', entry.id, 'title', e.target.value)} /></div>
                <div><label style={styles.label}>ISBN Number</label>
                  <input style={styles.input} placeholder="ISBN" value={entry.isbnNumber}
                    onChange={(e) => update('editorBooks', entry.id, 'isbnNumber', e.target.value)} /></div>
                <div><label style={styles.label}>Year of Publication</label>
                  <input type="number" style={styles.input} placeholder="e.g. 2024" value={entry.yearOfPublication}
                    onChange={(e) => update('editorBooks', entry.id, 'yearOfPublication', e.target.value)} /></div>
                <div><label style={styles.label}>Authorship Position</label>
                  <select style={styles.input} value={entry.authorshipPosition}
                    onChange={(e) => update('editorBooks', entry.id, 'authorshipPosition', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="1st">1st</option><option value="2nd">2nd</option>
                  </select></div>
                <div><label style={styles.label}>Publisher</label>
                  <select style={styles.input} value={entry.publisher}
                    onChange={(e) => update('editorBooks', entry.id, 'publisher', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option>International</option><option>National</option>
                  </select></div>
                <div>
                  <PDFUpload label="Proof (PDF)" value={entry.proof}
                    onChange={(val) => update('editorBooks', entry.id, 'proof', val)} />
                </div>
              </div>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => add('editorBooks', EMPTY_EDITOR)}><Plus size={16} /> Add Editor Book</button>
        </div>
      )}
    </div>
  );
}