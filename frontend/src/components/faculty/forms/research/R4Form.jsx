import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import styles from '../../../../utils/styles';
import PDFUpload from '../../PDFUpload';

const EMPTY_EXT  = () => ({ id: String(Date.now()+Math.random()), projectTitle:'', agency:'', amount:'', status:'Ongoing', role:'PI', sanctionNo:'' });
const EMPTY_IND  = () => ({ id: String(Date.now()+Math.random()), projectTitle:'', industry:'', amount:'', sanctionNumber:'', role:'PI', coPIs:'' });

const SUBTABS = [
  { key: 'external', label: 'R.4.1-4 BFGI/External Agency' },
  { key: 'industry', label: 'R.4.5-6 Industry Sponsored' },
];

export default function R4Form({ data, setData }) {
  const [sub, setSub] = useState('external');

  const add    = (key, empty) => setData({ ...data, [key]: [...(data[key]||[]), empty()] });
  const remove = (key, id)    => setData({ ...data, [key]: (data[key]||[]).filter((e) => e.id !== id) });
  const update = (key, id, f, v) => setData({ ...data, [key]: (data[key]||[]).map((e) => e.id===id ? {...e,[f]:v} : e) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={styles.subTabBar}>
        {SUBTABS.map((t) => (
          <button key={t.key} onClick={() => setSub(t.key)} style={sub===t.key ? styles.subTabActive : styles.subTabInactive}>{t.label}</button>
        ))}
      </div>

      {sub === 'external' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(data.externalProjects||[]).map((entry, i) => (
            <div key={entry.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Project #{i+1}</h3>
                <button onClick={() => remove('externalProjects', entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
              <div style={styles.grid}>
                <div style={styles.gridFull}><label style={styles.label}>Research Project Title</label>
                  <input style={styles.input} placeholder="Project title" value={entry.projectTitle}
                    onChange={(e) => update('externalProjects', entry.id, 'projectTitle', e.target.value)} /></div>
                <div><label style={styles.label}>Name of Agency (BFGI/External)</label>
                  <input style={styles.input} placeholder="Agency name" value={entry.agency}
                    onChange={(e) => update('externalProjects', entry.id, 'agency', e.target.value)} /></div>
                <div><label style={styles.label}>Amount (₹)</label>
                  <input type="number" style={styles.input} placeholder="0" value={entry.amount}
                    onChange={(e) => update('externalProjects', entry.id, 'amount', e.target.value)} /></div>
                <div><label style={styles.label}>Status</label>
                  <select style={styles.input} value={entry.status}
                    onChange={(e) => update('externalProjects', entry.id, 'status', e.target.value)}>
                    <option>Ongoing</option><option>Completed</option>
                  </select></div>
                <div><label style={styles.label}>Role</label>
                  <select style={styles.input} value={entry.role}
                    onChange={(e) => update('externalProjects', entry.id, 'role', e.target.value)}>
                    <option>PI</option><option>Co-PI</option>
                  </select></div>
                <div><label style={styles.label}>Sanction No.</label>
                  <input style={styles.input} placeholder="Sanction number" value={entry.sanctionNo}
                    onChange={(e) => update('externalProjects', entry.id, 'sanctionNo', e.target.value)} /></div>
                <div>
                  {/* <label style={styles.label}>Proof (PDF)</label>
                  <label style={styles.uploadLabel}><Upload size={16} /> Upload<input type="file" accept=".pdf" style={{ display: 'none' }} /></label> */}
                  <PDFUpload label="Proof (PDF)" value={entry.proof} onChange={(val) => update('externalProjects', entry.id, 'proof', val)} />
                  </div>
              </div>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => add('externalProjects', EMPTY_EXT)}><Plus size={16} /> Add Project</button>
        </div>
      )}

      {sub === 'industry' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(data.industryProjects||[]).map((entry, i) => (
            <div key={entry.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Industry Project #{i+1}</h3>
                <button onClick={() => remove('industryProjects', entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
              <div style={styles.grid}>
                <div style={styles.gridFull}><label style={styles.label}>Project Title</label>
                  <input style={styles.input} placeholder="Project title" value={entry.projectTitle}
                    onChange={(e) => update('industryProjects', entry.id, 'projectTitle', e.target.value)} /></div>
                <div><label style={styles.label}>Name of Industry</label>
                  <input style={styles.input} placeholder="Industry name" value={entry.industry}
                    onChange={(e) => update('industryProjects', entry.id, 'industry', e.target.value)} /></div>
                <div><label style={styles.label}>Amount (₹)</label>
                  <input type="number" style={styles.input} placeholder="0" value={entry.amount}
                    onChange={(e) => update('industryProjects', entry.id, 'amount', e.target.value)} /></div>
                <div><label style={styles.label}>Sanction Number</label>
                  <input style={styles.input} placeholder="Sanction no." value={entry.sanctionNumber}
                    onChange={(e) => update('industryProjects', entry.id, 'sanctionNumber', e.target.value)} /></div>
                <div><label style={styles.label}>Role (PI/Co-PI)</label>
                  <select style={styles.input} value={entry.role}
                    onChange={(e) => update('industryProjects', entry.id, 'role', e.target.value)}>
                    <option>PI</option><option>Co-PI</option>
                  </select></div>
                <div><label style={styles.label}>Name of Co-PIs</label>
                  <input style={styles.input} placeholder="Co-PI names" value={entry.coPIs}
                    onChange={(e) => update('industryProjects', entry.id, 'coPIs', e.target.value)} /></div>
                <div>
                  {/* <label style={styles.label}>Proof (PDF)</label>
                  <label style={styles.uploadLabel}><Upload size={16} /> Upload<input type="file" accept=".pdf" style={{ display: 'none' }} /></label> */}
                  <PDFUpload label="Proof (PDF)" value={entry.proof} onChange={(val) => update('industryProjects', entry.id, 'proof', val)} />
                  </div>
              </div>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => add('industryProjects', EMPTY_IND)}><Plus size={16} /> Add Industry Project</button>
        </div>
      )}
    </div>
  );
}