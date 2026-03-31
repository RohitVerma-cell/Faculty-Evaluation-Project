import { calcTLTotal, calcResearchTotal, calcSDTotal, calcGrandTotal } from '../../utils/marksCalculator';

const C = {
  tl:       { color: '#6366f1', light: '#eef2ff', border: '#c7d2fe' },
  research: { color: '#0ea5e9', light: '#e0f2fe', border: '#bae6fd' },
  sd:       { color: '#10b981', light: '#d1fae5', border: '#a7f3d0' },
  grand:    { color: '#f59e0b', light: '#fef3c7', border: '#fde68a' },
};

function Bar({ value, max, color }) {
  return (
    <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden', marginTop: 5 }}>
      <div style={{ height: '100%', width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: 3, transition: 'width 0.4s ease' }} />
    </div>
  );
}

function Section({ label, marks, max, color, light, border, subs }) {
  const pct = max > 0 ? Math.round((marks / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{pct}%</span>
          <span style={{ fontSize: 13, fontWeight: 700, color, background: light, border: `1px solid ${border}`, padding: '2px 10px', borderRadius: 20 }}>
            {marks.toFixed(1)} / {max}
          </span>
        </div>
      </div>
      <Bar value={marks} max={max} color={color} />
      {subs && subs.filter(s => s.marks > 0).length > 0 && (
        <div style={{ marginTop: 8, paddingLeft: 10, borderLeft: `2px solid ${color}25` }}>
          {subs.filter(s => s.marks > 0).map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 11.5, color: '#64748b' }}>{s.label}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color }}>{s.marks.toFixed(1)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarksSummaryCard({
  tl1Data, tl4Data,
  r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
  sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
}) {
  const tl       = calcTLTotal(tl1Data, tl4Data);
  const research = calcResearchTotal(r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data);
  const sd       = calcSDTotal(sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries);
  const grand    = calcGrandTotal(tl.total, research.total, sd.total);

  const grandPct = Math.round((grand.total / 300) * 100);

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', marginBottom: 20 }}>

      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>📊 Marks Summary</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Updates as you fill the form</div>
        </div>
        {/* Grand Total */}
        <div style={{ textAlign: 'center', background: C.grand.light, border: `1px solid ${C.grand.border}`, borderRadius: 12, padding: '8px 18px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.grand.color, lineHeight: 1 }}>{grand.total.toFixed(1)}</div>
          <div style={{ fontSize: 10, color: '#92400e', fontWeight: 600 }}>/ 300</div>
          <div style={{ fontSize: 10, color: '#b45309', marginTop: 1 }}>{grandPct}%</div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ padding: '16px 20px' }}>
        <Section
          label="Teaching Learning" marks={tl.total} max={110}
          color={C.tl.color} light={C.tl.light} border={C.tl.border}
          subs={[
            { label: 'TL.1 Student Involvement', marks: tl.tl1 },
            { label: 'TL.4 Outcome',             marks: tl.tl4 },
          ]}
        />
        <Section
          label="Research" marks={research.total} max={125}
          color={C.research.color} light={C.research.light} border={C.research.border}
          subs={[
            { label: 'R.1 Journal Papers',     marks: research.r1 },
            { label: 'R.2 Books',              marks: research.r2 },
            { label: 'R.3 Conference',         marks: research.r3 },
            { label: 'R.4 Sponsored Projects', marks: research.r4 },
            { label: 'R.5 Consultancy',        marks: research.r5 },
            { label: 'R.6 Patents & Startup',  marks: research.r6 },
          ]}
        />
        <Section
          label="Self Development" marks={sd.total} max={65}
          color={C.sd.color} light={C.sd.light} border={C.sd.border}
          subs={[
            { label: 'SD.1 FDP',       marks: sd.sd1 },
            { label: 'SD.2 Workshop',  marks: sd.sd2 },
            { label: 'SD.3 Refresher', marks: sd.sd3 },
            { label: 'SD.4 MOOCs',     marks: sd.sd4 },
            { label: 'SD.5 PhD',       marks: sd.sd5 },
            { label: 'SD.6 Awards',    marks: sd.sd6 },
          ]}
        />

        {/* HoD Note */}
        <div style={{ padding: '8px 12px', background: '#fef9c3', borderRadius: 8, fontSize: 11.5, color: '#854d0e', border: '1px solid #fde047' }}>
          ⚠ <strong>TL.2 (10) + TL.3 (10) = 20 marks</strong> will be added by HoD after review. Faculty max: <strong>280 / 300</strong>
        </div>
      </div>
    </div>
  );
}