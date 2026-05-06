import styles from '../../../../utils/styles';
import PDFUpload from '../../PDFUpload';

export default function R5Form({ data, setData }) {
  const f = (field, value) => setData({ ...data, [field]: value });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* R.5.1 External Consultancy */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>R.5.1 — Consultancy Project (External Agency)</div>
        <div style={styles.grid}>
          <div style={styles.gridFull}><label style={styles.label}>Title of Consultancy Project</label>
            <input style={styles.input} placeholder="Project title" value={data.consultancyTitle||''}
              onChange={(e) => f('consultancyTitle', e.target.value)} /></div>
          <div><label style={styles.label}>Name of External Agency</label>
            <input style={styles.input} placeholder="Agency name" value={data.consultancyAgency||''}
              onChange={(e) => f('consultancyAgency', e.target.value)} /></div>
          <div><label style={styles.label}>Amount of Consultancy Fees (₹)</label>
            <input type="number" style={styles.input} placeholder="0" value={data.consultancyAmount||''}
              onChange={(e) => f('consultancyAmount', e.target.value)} /></div>
          <div>
            <PDFUpload label="Proof (PDF)" value={data.consultancyProof||null}
              onChange={(val) => f('consultancyProof', val)} />
          </div>
        </div>
      </div>

      {/* R.5.2 Startup Mentorship */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>R.5.2 — Mentorship to Startup</div>
        <div style={styles.grid}>
          <div><label style={styles.label}>Name of Startup</label>
            <input style={styles.input} placeholder="Startup name" value={data.startupName||''}
              onChange={(e) => f('startupName', e.target.value)} /></div>
          <div><label style={styles.label}>Date of Mentoring Sessions</label>
            <input type="date" style={styles.input} value={data.mentoringDate||''}
              onChange={(e) => f('mentoringDate', e.target.value)} /></div>
          <div>
            <PDFUpload label="Proof (PDF)" value={data.startupProof||null}
              onChange={(val) => f('startupProof', val)} />
          </div>
        </div>
      </div>

      {/* R.5.3 Internal BFGI Consultancy */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>R.5.3 — Internal (BFGI) Consultancy Project</div>
        <div style={styles.grid}>
          <div><label style={styles.label}>Name of Project</label>
            <input style={styles.input} placeholder="Project name" value={data.internalProjectName||''}
              onChange={(e) => f('internalProjectName', e.target.value)} /></div>
          <div><label style={styles.label}>Name of Department offering the Project</label>
            <input style={styles.input} placeholder="Department name" value={data.internalDepartment||''}
              onChange={(e) => f('internalDepartment', e.target.value)} /></div>
          <div>
            <PDFUpload label="Proof (PDF)" value={data.internalProof||null}
              onChange={(val) => f('internalProof', val)} />
          </div>
        </div>
      </div>

    </div>
  );
}