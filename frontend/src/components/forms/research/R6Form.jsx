
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../utils/styles';
import { Upload as UploadIcon } from 'lucide-react';

const EMPTY_PATENT = () => ({ id: String(Date.now()+Math.random()), patentTitle:'', dateOfPublication:'', patentNo:'', status:'Filed', authorshipPosition:'1st', patentOffice:'India' });

export default function R6Form({ data, setData }) {
  const f = (field, value) => setData({ ...data, [field]: value });
  const add    = () => setData({ ...data, patents: [...(data.patents||[]), EMPTY_PATENT()] });
  const remove = (id) => setData({ ...data, patents: (data.patents||[]).filter((e) => e.id !== id) });
  const update = (id, field, value) => setData({ ...data, patents: (data.patents||[]).map((e) => e.id===id ? {...e,[field]:value} : e) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* R.6.1-2 Patents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={styles.sectionTitle} >R.6.1 & R.6.2 — Patent Publication</div>
        {(data.patents||[]).map((entry, i) => (
          <div key={entry.id} style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Patent #{i+1}</h3>
              <button onClick={() => remove(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
            </div>
            <div style={styles.grid}>
              <div style={styles.gridFull}><label style={styles.label}>Patent Title</label>
                <input style={styles.input} placeholder="Patent title" value={entry.patentTitle}
                  onChange={(e) => update(entry.id, 'patentTitle', e.target.value)} /></div>
              <div><label style={styles.label}>Date of Publication</label>
                <input type="date" style={styles.input} value={entry.dateOfPublication}
                  onChange={(e) => update(entry.id, 'dateOfPublication', e.target.value)} /></div>
              <div><label style={styles.label}>Patent No.</label>
                <input style={styles.input} placeholder="Patent number" value={entry.patentNo}
                  onChange={(e) => update(entry.id, 'patentNo', e.target.value)} /></div>
              <div><label style={styles.label}>Status</label>
                <select style={styles.input} value={entry.status}
                  onChange={(e) => update(entry.id, 'status', e.target.value)}>
                  <option>Filed</option><option>Published</option><option>Granted</option>
                </select></div>
              <div><label style={styles.label}>Authorship Position</label>
                <select style={styles.input} value={entry.authorshipPosition}
                  onChange={(e) => update(entry.id, 'authorshipPosition', e.target.value)}>
                  <option value="1st">1st</option><option value="2nd">2nd</option>
                </select></div>
              <div><label style={styles.label}>Patent Office</label>
                <select style={styles.input} value={entry.patentOffice}
                  onChange={(e) => update(entry.id, 'patentOffice', e.target.value)}>
                  <option>India</option><option>Australia</option><option>USA</option><option>Europe</option><option>Other</option>
                </select></div>
              <div><label style={styles.label}>Proof (PDF)</label>
                <label style={styles.uploadLabel}><Upload size={16} /> Upload<input type="file" accept=".pdf" style={{ display: 'none' }} /></label></div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={add}><Plus size={16} /> Add Patent</button>
      </div>

      {/* R.6.3 Startup */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>R.6.3 — New Startup</div>
        <div style={styles.grid}>
          <div><label style={styles.label}>Title of Startup</label>
            <input style={styles.input} placeholder="Startup name" value={data.startupTitle||''}
              onChange={(e) => f('startupTitle', e.target.value)} /></div>
          <div><label style={styles.label}>DPIIT Registration Number</label>
            <input style={styles.input} placeholder="DPIIT no." value={data.dpiitNumber||''}
              onChange={(e) => f('dpiitNumber', e.target.value)} /></div>
          <div><label style={styles.label}>Proof (PDF)</label>
            <label style={styles.uploadLabel}><Upload size={16} /> Upload<input type="file" accept=".pdf" style={{ display: 'none' }} /></label></div>
        </div>
      </div>

    </div>
  );
}