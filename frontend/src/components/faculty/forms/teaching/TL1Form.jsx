import { Plus, Trash2 } from 'lucide-react';
import styles from '../../../../utils/styles'
import PDFUpload from '../../PDFUpload';

const EMPTY_ROW = (extra = {}) => ({ id: String(Date.now() + Math.random()), ...extra });

// Info box — formula hint
const FormulaHint = ({ text }) => (
  <div style={{
    padding: '6px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0',
    borderRadius: 6, fontSize: 11, color: '#15803d', marginBottom: 10,
  }}>
    {text}
  </div>
);

export default function TL1Form({ data = {}, setData }) {
  const updateField = (field, value) => setData({ ...data, [field]: value });

  const addRow = (key, template) =>
    setData({ ...data, [key]: [...(data[key] || []), EMPTY_ROW(template)] });

  const removeRow = (key, id) =>
    setData({ ...data, [key]: (data[key] || []).filter((r) => r.id !== id) });

  const updateRow = (key, id, field, value) =>
    setData({ ...data, [key]: (data[key] || []).map((r) => r.id === id ? { ...r, [field]: value } : r) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Total Mentees — Common field used in TL.1.2 to TL.1.7 ── */}
      <div style={{
        background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)',
        border: '1.5px solid #c7d2fe',
        borderRadius: 10, padding: '16px 20px',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#4338ca', marginBottom: 4 }}>
          👥 Total Mentees (Required for TL.1.2 – TL.1.7)
        </div>
        <div style={{ fontSize: 12, color: '#6366f1', marginBottom: 12 }}>
          Formula: <strong>15 × (Students Engaged / Total Mentees)</strong> — max 10 marks per sub-criteria
        </div>
        <div style={{ maxWidth: 280 }}>
          <label style={styles.label}>Total Number of Mentees assigned to you</label>
          <input
            style={styles.input} type="number" placeholder="e.g. 30"
            value={data.totalMentees || ''}
            onChange={(e) => updateField('totalMentees', e.target.value)}
          />
        </div>
      </div>

      {/* ── TL.1.1 Live Projects ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.1 — Live Projects</div>
<<<<<<< HEAD
        <FormulaHint text="1 Project = 5 Marks (Max 10)" />
=======
        {/* <FormulaHint text="1 Project = 5 Marks (Max 10)" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Number of Live Projects Completed</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.liveProjectCount || ''}
              onChange={(e) => updateField('liveProjectCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Title(s) of Live Projects</label>
            <input style={styles.input} placeholder="Enter project titles"
              value={data.liveProjectTitles || ''}
              onChange={(e) => updateField('liveProjectTitles', e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Projects won Prize outside Campus</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.liveProjectPrizeCount || ''}
              onChange={(e) => updateField('liveProjectPrizeCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Event Name with Date and Place</label>
            <input style={styles.input} placeholder="Event, date, place"
              value={data.liveProjectEvent || ''}
              onChange={(e) => updateField('liveProjectEvent', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <PDFUpload label="Proof (PDF)" value={data.liveProjectProof}
              onChange={(val) => updateField('liveProjectProof', val)} />
          </div>
        </div>
      </div>

      {/* ── TL.1.2 Case Study ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.2 — Case Study in Newspaper/Magazine</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Students Engaged / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Students Engaged / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        <div style={styles.grid}>
          <div style={styles.gridFull}>
            <label style={styles.label}>Title of Case Study</label>
            <input style={styles.input} placeholder="Case study title"
              value={data.caseStudyTitle || ''}
              onChange={(e) => updateField('caseStudyTitle', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Newspaper/Magazine Name with Date</label>
            <input style={styles.input} placeholder="e.g., Times of India, 12 Jan 2025"
              value={data.caseStudyPublication || ''}
              onChange={(e) => updateField('caseStudyPublication', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Students Involved (Semester & Program)</label>
            <input style={styles.input} placeholder="e.g., Rahul Sharma, Sem 4, B.Tech CSE"
              value={data.caseStudyStudents || ''}
              onChange={(e) => updateField('caseStudyStudents', e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Number of Students Engaged</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.caseStudyStudentsCount || ''}
              onChange={(e) => updateField('caseStudyStudentsCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <PDFUpload label="Proof (PDF)" value={data.caseStudyProof}
              onChange={(val) => updateField('caseStudyProof', val)} />
          </div>
        </div>
      </div>

      {/* ── TL.1.3 Articles ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.3 — Articles in Newspaper/Magazine</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Students Engaged / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Students Engaged / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        <div style={styles.grid}>
          <div style={styles.gridFull}>
            <label style={styles.label}>Title of Article</label>
            <input style={styles.input} placeholder="Article title"
              value={data.articleTitle || ''}
              onChange={(e) => updateField('articleTitle', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Newspaper/Magazine Name with Date</label>
            <input style={styles.input} placeholder="e.g., Tribune, 5 Feb 2025"
              value={data.articlePublication || ''}
              onChange={(e) => updateField('articlePublication', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Students Involved (Semester & Program)</label>
            <input style={styles.input} placeholder="e.g., Priya Verma, Sem 6, B.Tech IT"
              value={data.articleStudents || ''}
              onChange={(e) => updateField('articleStudents', e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Number of Students Engaged</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.articleStudentsCount || ''}
              onChange={(e) => updateField('articleStudentsCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <PDFUpload label="Proof (PDF)" value={data.articleProof}
              onChange={(val) => updateField('articleProof', val)} />
          </div>
        </div>
      </div>

      {/* ── TL.1.4 Paper Writing ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.4 — Student Paper Writing</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Total Students in Papers / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Total Students in Papers / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        {(data.studentPapers || []).map((row, i) => (
          <div key={row.id} style={{ ...styles.card, marginBottom: 12, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Paper #{i + 1}</span>
              <button onClick={() => removeRow('studentPapers', row.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
            <div style={styles.grid}>
              <div style={styles.gridFull}>
                <label style={styles.label}>Title of Research Paper</label>
                <input style={styles.input} placeholder="Paper title" value={row.title || ''}
                  onChange={(e) => updateRow('studentPapers', row.id, 'title', e.target.value)} />
              </div>
              <div style={styles.gridFull}>
                <label style={styles.label}>Students Involved (as in paper)</label>
                <input style={styles.input} placeholder="Student names" value={row.students || ''}
                  onChange={(e) => updateRow('studentPapers', row.id, 'students', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Number of Students</label>
                <input type="number" style={styles.input} placeholder="0" value={row.studentsCount || ''}
                  onChange={(e) => updateRow('studentPapers', row.id, 'studentsCount', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Journal Name with ISSN</label>
                <input style={styles.input} placeholder="Journal, ISSN: XXXX-XXXX" value={row.journal || ''}
                  onChange={(e) => updateRow('studentPapers', row.id, 'journal', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Indexing</label>
                <select style={styles.input} value={row.indexing || 'UGC'}
                  onChange={(e) => updateRow('studentPapers', row.id, 'indexing', e.target.value)}>
                  <option>UGC</option><option>Scopus</option><option>SCI</option><option>NAAS Rating</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Date of Publication</label>
                <input type="date" style={styles.input} value={row.date || ''}
                  onChange={(e) => updateRow('studentPapers', row.id, 'date', e.target.value)} />
              </div>
              <div style={styles.gridFull}>
                <PDFUpload label="Proof (PDF)" value={row.proof}
                  onChange={(val) => updateRow('studentPapers', row.id, 'proof', val)} />
              </div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addRow('studentPapers', { title: '', students: '', studentsCount: '', journal: '', indexing: 'UGC', date: '', proof: null })}>
          <Plus size={16} /> Add Paper
        </button>
      </div>

      {/* ── TL.1.5 Internships ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.5 — Student Internships</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Number of Interns / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Number of Interns / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        {(data.internships || []).map((row, i) => (
          <div key={row.id} style={{ ...styles.card, marginBottom: 12, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Internship #{i + 1}</span>
              <button onClick={() => removeRow('internships', row.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
            <div style={styles.grid}>
              <div>
                <label style={styles.label}>Student Name</label>
                <input style={styles.input} placeholder="Student name" value={row.studentName || ''}
                  onChange={(e) => updateRow('internships', row.id, 'studentName', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Company / BFGI</label>
                <input style={styles.input} placeholder="Company name" value={row.company || ''}
                  onChange={(e) => updateRow('internships', row.id, 'company', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Start Date</label>
                <input type="date" style={styles.input} value={row.startDate || ''}
                  onChange={(e) => updateRow('internships', row.id, 'startDate', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>End Date</label>
                <input type="date" style={styles.input} value={row.endDate || ''}
                  onChange={(e) => updateRow('internships', row.id, 'endDate', e.target.value)} />
              </div>
              <div style={styles.gridFull}>
                <PDFUpload label="Proof (PDF)" value={row.proof}
                  onChange={(val) => updateRow('internships', row.id, 'proof', val)} />
              </div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addRow('internships', { studentName: '', company: '', startDate: '', endDate: '', proof: null })}>
          <Plus size={16} /> Add Internship
        </button>
      </div>

      {/* ── TL.1.6 Student Patents ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.6 — Student Patents</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Total Patent Students / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Total Patent Students / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        {(data.studentPatents || []).map((row, i) => (
          <div key={row.id} style={{ ...styles.card, marginBottom: 12, background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Patent #{i + 1}</span>
              <button onClick={() => removeRow('studentPatents', row.id)} style={{ ...styles.menuBtn, color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
            <div style={styles.grid}>
              <div style={styles.gridFull}>
                <label style={styles.label}>Patent Title</label>
                <input style={styles.input} placeholder="Patent title" value={row.title || ''}
                  onChange={(e) => updateRow('studentPatents', row.id, 'title', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Date of Publication</label>
                <input type="date" style={styles.input} value={row.dateOfPublication || ''}
                  onChange={(e) => updateRow('studentPatents', row.id, 'dateOfPublication', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Patent Number</label>
                <input style={styles.input} placeholder="Patent no." value={row.patentNo || ''}
                  onChange={(e) => updateRow('studentPatents', row.id, 'patentNo', e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Status</label>
                <select style={styles.input} value={row.status || 'Filed'}
                  onChange={(e) => updateRow('studentPatents', row.id, 'status', e.target.value)}>
                  <option>Filed</option><option>Published</option><option>Granted</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Number of Students Involved</label>
                <input type="number" style={styles.input} placeholder="0" value={row.studentCount || ''}
                  onChange={(e) => updateRow('studentPatents', row.id, 'studentCount', e.target.value)} />
              </div>
              <div style={styles.gridFull}>
                <PDFUpload label="Proof (PDF)" value={row.proof}
                  onChange={(val) => updateRow('studentPatents', row.id, 'proof', val)} />
              </div>
            </div>
          </div>
        ))}
        <button style={styles.addBtn} onClick={() => addRow('studentPatents', { title: '', dateOfPublication: '', patentNo: '', status: 'Filed', studentCount: '', proof: null })}>
          <Plus size={16} /> Add Patent
        </button>
      </div>

      {/* ── TL.1.7 Certificate Programs ── */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.1.7 — Certificate Programs (min 30 hrs)</div>
<<<<<<< HEAD
        <FormulaHint text="15 × (Students in Cert Programs / Total Mentees) — Max 10" />
=======
        {/* <FormulaHint text="15 × (Students in Cert Programs / Total Mentees) — Max 10" /> */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Number of Students in Certificate Programs</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.certStudentCount || ''}
              onChange={(e) => updateField('certStudentCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <label style={styles.label}>Title of Certificate Program(s)</label>
            <input style={styles.input} placeholder="Program title"
              value={data.certProgramTitle || ''}
              onChange={(e) => updateField('certProgramTitle', e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Name of Agency</label>
            <input style={styles.input} placeholder="Certifying agency"
              value={data.certAgency || ''}
              onChange={(e) => updateField('certAgency', e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Students Received Certification</label>
            <input style={styles.input} type="number" placeholder="0"
              value={data.certReceivedCount || ''}
              onChange={(e) => updateField('certReceivedCount', e.target.value)} />
          </div>
          <div style={styles.gridFull}>
            <PDFUpload label="Proof (PDF)" value={data.certProof}
              onChange={(val) => updateField('certProof', val)} />
          </div>
        </div>
      </div>

    </div>
  );
}