import { Plus, Trash2 } from 'lucide-react';
import styles from '../../../../utils/styles';
import PDFUpload from '../../PDFUpload';

const EMPTY = (extra={}) => ({ id: String(Date.now()+Math.random()), ...extra });

// ── Reusable table form — PDFUpload use karta hai ──
function TableForm({ entries, setEntries, emptyTemplate, columns, title, addLabel }) {
  const add    = () => setEntries([...entries, EMPTY(emptyTemplate)]);
  const remove = (id) => { if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id)); };
  const update = (id, f, v) => setEntries(entries.map((e) => e.id===id ? {...e,[f]:v} : e));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {entries.map((entry, i) => (
        <div key={entry.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-main,#0f172a)' }}>{title} #{i+1}</h3>
            <button onClick={() => remove(entry.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
          </div>
          <div style={styles.grid}>
            {columns.map((col) => (
              <div key={col.key} style={col.full ? styles.gridFull : {}}>
                <label style={styles.label}>{col.label}</label>
                {col.type === 'select' ? (
                  // ── Blank default for select ──
                  <select style={styles.input} value={entry[col.key]||''}
                    onChange={(e) => update(entry.id, col.key, e.target.value)}>
                    <option value="">-- Select --</option>
                    {col.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : col.type === 'upload' ? (
                  // ── PDFUpload component ──
                  <PDFUpload
                    value={entry[col.key]||null}
                    onChange={(val) => update(entry.id, col.key, val)}
                  />
                ) : (
                  <input type={col.type||'text'} style={styles.input} placeholder={col.placeholder||''} value={entry[col.key]||''}
                    onChange={(e) => update(entry.id, col.key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button style={styles.addBtn} onClick={add}><Plus size={16} /> {addLabel}</button>
    </div>
  );
}

// ── SD.1 FDP ──
export function SD1Form({ entries, setEntries }) {
  return (
    <TableForm entries={entries} setEntries={setEntries}
      title="FDP" addLabel="Add FDP"
      emptyTemplate={{ title:'', organizingInstitute:'', numberOfDays:'', dates:'', proof: null }}
      columns={[
        { key:'title',               label:'Title of FDP',                full: true, placeholder:'FDP title' },
        { key:'organizingInstitute', label:'Name of Organizing Institute',             placeholder:'Institute name' },
        { key:'numberOfDays',        label:'Number of Days (3/4/5 Days)',              placeholder:'e.g. 5' },
        { key:'dates',               label:'Dates of FDP',                             placeholder:'DD/MM/YYYY - DD/MM/YYYY' },
        { key:'proof',               label:'',                  type:'upload' },
      ]}
    />
  );
}

// ── SD.2 Workshop ──
export function SD2Form({ entries, setEntries }) {
  return (
    <TableForm entries={entries} setEntries={setEntries}
      title="Workshop" addLabel="Add Workshop"
      emptyTemplate={{ title:'', organizingInstitute:'', numberOfWeeks:'', dates:'', proof: null }}
      columns={[
        { key:'title',               label:'Title of Workshop/Short Term Course', full: true, placeholder:'Workshop title' },
        { key:'organizingInstitute', label:'Name of Organizing Institute',                    placeholder:'Institute name' },
        { key:'numberOfWeeks',       label:'Number of Weeks (2 Weeks)',                       placeholder:'e.g. 2' },
        { key:'dates',               label:'Dates of Workshop',                               placeholder:'DD/MM/YYYY - DD/MM/YYYY' },
        { key:'proof',               label:'',                           type:'upload' },
      ]}
    />
  );
}

// ── SD.3 Refresher/Orientation ──
export function SD3Form({ entries, setEntries }) {
  return (
    <TableForm entries={entries} setEntries={setEntries}
      title="Refresher/Orientation" addLabel="Add Course"
      emptyTemplate={{ title:'', organizingInstitute:'', numberOfWeeks:'', dates:'', proof: null }}
      columns={[
        { key:'title',               label:'Title of Course',              full: true, placeholder:'Course title' },
        { key:'organizingInstitute', label:'Name of Organizing Institute',             placeholder:'Institute name' },
        { key:'numberOfWeeks',       label:'Number of Weeks (3/4/more)',               placeholder:'e.g. 3' },
        { key:'dates',               label:'Dates',                                    placeholder:'DD/MM/YYYY - DD/MM/YYYY' },
        { key:'proof',               label:'',                   type:'upload' },
      ]}
    />
  );
}

// ── SD.4 MOOCs ──
export function SD4Form({ entries, setEntries }) {
  return (
    <TableForm entries={entries} setEntries={setEntries}
      title="MOOC" addLabel="Add MOOC"
      emptyTemplate={{ title:'', provider:'', duration:'', startDate:'', completionDate:'', proof: null }}
      columns={[
        { key:'title',          label:'Title of MOOC Course', full: true, placeholder:'Course title' },
        { key:'provider',       label:'Name of MOOC Provider',            placeholder:'e.g. Coursera, NPTEL' },
        { key:'duration',       label:'Duration of Course',               placeholder:'e.g. 8 weeks' },
        { key:'startDate',      label:'Starting Date',        type:'date' },
        { key:'completionDate', label:'Completion Date',      type:'date' },
        { key:'proof',          label:'',           type:'upload' },
      ]}
    />
  );
}

// ── SD.5 PhD ──
export function SD5Form({ data, setData }) {
  const supervisorRows   = data.phdCandidates    || [];
  const registrationRows = data.phdRegistration  || [];

  // ── Sab blank ──
  const addSup = () => setData({ ...data, phdCandidates:   [...supervisorRows,   EMPTY({ candidateName:'', isBFGI:'',  university:'', enrollmentNo:'', status:'' })] });
  const addReg = () => setData({ ...data, phdRegistration: [...registrationRows, EMPTY({ university:'', enrollmentNo:'', status:'', supervisorBFGI:'' })] });
  const remSup = (id) => setData({ ...data, phdCandidates:   supervisorRows.filter((r) => r.id!==id) });
  const remReg = (id) => setData({ ...data, phdRegistration: registrationRows.filter((r) => r.id!==id) });
  const updSup = (id, f, v) => setData({ ...data, phdCandidates:   supervisorRows.map((r) => r.id===id ? {...r,[f]:v} : r) });
  const updReg = (id, f, v) => setData({ ...data, phdRegistration: registrationRows.map((r) => r.id===id ? {...r,[f]:v} : r) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* SD.5.1-4 Supervisor */}
      <div>
        <div style={styles.sectionTitle}>SD.5.1-4 — PhD Supervisor / Co-Supervisor</div>
        {supervisorRows.map((row, i) => (
          <div key={row.id} style={{ ...styles.card, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main,#0f172a)' }}>Candidate #{i+1}</span>
              <button onClick={() => remSup(row.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
            <div style={styles.grid}>
              <div><label style={styles.label}>Name of PhD Candidate</label>
                <input style={styles.input} placeholder="Candidate name" value={row.candidateName||''}
                  onChange={(e) => updSup(row.id, 'candidateName', e.target.value)} /></div>
              <div><label style={styles.label}>Is candidate BFGI Faculty?</label>
                <select style={styles.input} value={row.isBFGI||''}
                  onChange={(e) => updSup(row.id, 'isBFGI', e.target.value)}>
                  <option value="">-- Select --</option>
                  <option>Yes</option><option>No</option>
                </select></div>
              <div><label style={styles.label}>Name of University</label>
                <input style={styles.input} placeholder="University name" value={row.university||''}
                  onChange={(e) => updSup(row.id, 'university', e.target.value)} /></div>
              <div><label style={styles.label}>Enrollment Number</label>
                <input style={styles.input} placeholder="Enrollment no." value={row.enrollmentNo||''}
                  onChange={(e) => updSup(row.id, 'enrollmentNo', e.target.value)} /></div>
              <div><label style={styles.label}>Status</label>
                <select style={styles.input} value={row.status||''}
                  onChange={(e) => updSup(row.id, 'status', e.target.value)}>
                  <option value="">-- Select --</option>
                  <option>Synopsis Submitted</option>
                  <option>Thesis Submitted</option>
                  <option>Degree Awarded</option>
                </select></div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={addSup}><Plus size={16} /> Add PhD Candidate</button>
      </div>

      {/* SD.5.5-8 Registration */}
      <div>
        <div style={styles.sectionTitle}>SD.5.5-8 — Registration in PhD</div>
        {registrationRows.map((row, i) => (
          <div key={row.id} style={{ ...styles.card, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main,#0f172a)' }}>Registration #{i+1}</span>
              <button onClick={() => remReg(row.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
            <div style={styles.grid}>
              <div><label style={styles.label}>University where pursuing PhD</label>
                <input style={styles.input} placeholder="University name" value={row.university||''}
                  onChange={(e) => updReg(row.id, 'university', e.target.value)} /></div>
              <div><label style={styles.label}>Enrollment Number</label>
                <input style={styles.input} placeholder="Enrollment no." value={row.enrollmentNo||''}
                  onChange={(e) => updReg(row.id, 'enrollmentNo', e.target.value)} /></div>
              <div><label style={styles.label}>Status</label>
                <select style={styles.input} value={row.status||''}
                  onChange={(e) => updReg(row.id, 'status', e.target.value)}>
                  <option value="">-- Select --</option>
                  <option>Synopsis Submitted</option>
                  <option>Thesis Submitted</option>
                  <option>Degree Awarded</option>
                </select></div>
              <div><label style={styles.label}>PhD Supervisor is from BFGI?</label>
                <select style={styles.input} value={row.supervisorBFGI||''}
                  onChange={(e) => updReg(row.id, 'supervisorBFGI', e.target.value)}>
                  <option value="">-- Select --</option>
                  <option>Yes</option><option>No</option>
                </select></div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={addReg}><Plus size={16} /> Add PhD Registration</button>
      </div>

    </div>
  );
}

// ── SD.6 Awards ──
export function SD6Form({ entries, setEntries }) {
  return (
    <TableForm entries={entries} setEntries={setEntries}
      title="Award" addLabel="Add Award"
      emptyTemplate={{ awardTitle:'', organizationName:'', scope:'', dateOfAward:'', proof: null }}
      columns={[
        { key:'awardTitle',       label:'Title of Award',             full: true, placeholder:'Award title' },
        { key:'organizationName', label:'Name of Organization',                   placeholder:'Organization name' },
        { key:'scope',            label:'National / International',    type:'select', options:['National','International'] },
        { key:'dateOfAward',      label:'Date of Award',               type:'date' },
        { key:'proof',            label:'',                  type:'upload' },
      ]}
    />
  );
}