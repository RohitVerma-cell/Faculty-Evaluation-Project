const EMPTY_COURSE = (id) => ({
  id, courseName: '', session: '', exam: 'Odd',
  totalStudents: '', studentsCleared: '', percentage: '',
});

const DEFAULT_ATTENDANCE = [
  { id: '1', avg: '' },
  { id: '2', avg: '' },
  { id: '3', avg: '' },
  { id: '4', avg: '' },
];

export default function TL4Form({ data, setData }) {

  const updateRow = (key, id, field, value) =>
    setData({ ...data, [key]: (data[key] || []).map((r) => r.id === id ? { ...r, [field]: value } : r) });

  // ── Fix: mutation nahi, naya array banao ──
  const ensureRows = (key) => {
    const existing = data[key] || [];
    if (existing.length >= 4) return existing;
    const extra = Array.from({ length: 4 - existing.length }, (_, i) =>
      EMPTY_COURSE(String(existing.length + i + 1))
    );
    return [...existing, ...extra];
  };

  const renderResultTable = (key, title) => (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>{title}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              {['S.No', 'Course Name', 'Session', 'Exam (Odd/Even)', 'Total Students', 'Students Cleared', 'Percentage'].map((h) => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ensureRows(key).map((row, i) => (
              <tr key={row.id}>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>{i + 1}</td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input style={{ ...styles.input, minWidth: 120 }} placeholder="Course name" value={row.courseName || ''}
                    onChange={(e) => updateRow(key, row.id, 'courseName', e.target.value)} />
                </td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input style={{ ...styles.input, minWidth: 90 }} placeholder="2024-25" value={row.session || ''}
                    onChange={(e) => updateRow(key, row.id, 'session', e.target.value)} />
                </td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <select style={{ ...styles.input, minWidth: 90 }} value={row.exam || 'Odd'}
                    onChange={(e) => updateRow(key, row.id, 'exam', e.target.value)}>
                    <option>Odd</option><option>Even</option>
                  </select>
                </td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input type="number" style={{ ...styles.input, minWidth: 80 }} placeholder="0" value={row.totalStudents || ''}
                    onChange={(e) => updateRow(key, row.id, 'totalStudents', e.target.value)} />
                </td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input type="number" style={{ ...styles.input, minWidth: 80 }} placeholder="0" value={row.studentsCleared || ''}
                    onChange={(e) => updateRow(key, row.id, 'studentsCleared', e.target.value)} />
                </td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input type="number" style={{ ...styles.input, minWidth: 80 }} placeholder="0" value={row.percentage || ''}
                    onChange={(e) => updateRow(key, row.id, 'percentage', e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Fix: attendance state properly handle karo ──
  const attendanceRows = (data.attendance && data.attendance.length > 0)
    ? data.attendance
    : DEFAULT_ATTENDANCE;

  const updateAttendance = (id, value) => {
    const updated = attendanceRows.map((r) => r.id === id ? { ...r, avg: value } : r);
    setData({ ...data, attendance: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {renderResultTable('universityResult', 'TL.4.1 — University Result Percentage')}
      {renderResultTable('mstResult',        'TL.4.2 — MST Result Percentage')}

      {/* TL.4.3 Attendance */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>TL.4.3 — Attendance (% of Students Eligible for University Exam)</div>
        {/* <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, padding: '6px 10px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0' }}>
          📐 Formula: <strong>((Average % - 80) / 20) × 10</strong> — Max 10 marks
        </div> */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#334155', width: 80 }}>S.No</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#334155' }}>Average % of Subjects Allotted</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRows.map((row, i) => (
              <tr key={row.id}>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>{i + 1}</td>
                <td style={{ padding: '4px 6px', borderBottom: '1px solid #f1f5f9' }}>
                  <input
                    type="number"
                    style={{ ...styles.input, maxWidth: 200 }}
                    placeholder="e.g. 85"
                    value={row.avg || ''}
                    onChange={(e) => updateAttendance(row.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}