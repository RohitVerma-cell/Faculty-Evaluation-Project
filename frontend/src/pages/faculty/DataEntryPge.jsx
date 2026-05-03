import { useState } from 'react';
import { Save, Send, BookOpen, FlaskConical, GraduationCap } from 'lucide-react';

import TL1Form from '../../components/faculty/forms/teaching/TL1Form';
import TL4Form from '../../components/faculty/forms/teaching/TL4Form';
import R1Form  from '../../components/faculty/forms/research/R1Form';
import R2Form  from '../../components/faculty/forms/research/R2Form';
import R3Form  from '../../components/faculty/forms/research/R3Form';
import R4Form  from '../../components/faculty/forms/research/R4Form';
import R5Form  from '../../components/faculty/forms/research/R5Form';
import R6Form  from '../../components/faculty/forms/research/R6Form';
import { SD1Form, SD2Form, SD3Form, SD4Form, SD5Form, SD6Form } from '../../components/faculty/forms/self-development/SDForm';
import { calcTLTotal, calcResearchTotal, calcSDTotal, calcGrandTotal } from '../../utils/marksCalculator';

const BASE_URL      = 'http://localhost:5000/api/submission';
const ACADEMIC_YEAR = '2024-25';

const MODULE_META = {
  teaching:        { label: 'Teaching Learning', icon: BookOpen,      color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  research:        { label: 'Research',           icon: FlaskConical,  color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)' },
  selfdevelopment: { label: 'Self Development',   icon: GraduationCap, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
};

const ITEM_LABELS = {
  tl1: 'TL.1 Student Involvement', tl4: 'TL.4 Outcome',
  r1: 'R.1 Journal Papers',   r2: 'R.2 Books',
  r3: 'R.3 Conference',       r4: 'R.4 Sponsored Projects',
  r5: 'R.5 Consultancy',      r6: 'R.6 Patents & Startup',
  sd1: 'SD.1 FDP',   sd2: 'SD.2 Workshop', sd3: 'SD.3 Refresher',
  sd4: 'SD.4 MOOCs', sd5: 'SD.5 PhD',      sd6: 'SD.6 Awards',
};

export default function DataEntryPage({
  setToastMsg, activeModule, activeItem,
  facultyEmail, facultyName,
  onStatusChange, // ← NEW — status update karo dashboard par
  tl1Data, setTl1Data, tl4Data, setTl4Data,
  r1Entries, setR1Entries, r2Data, setR2Data,
  r3Entries, setR3Entries, r4Data, setR4Data,
  r5Data, setR5Data, r6Data, setR6Data,
  sd1Entries, setSd1Entries, sd2Entries, setSd2Entries,
  sd3Entries, setSd3Entries, sd4Entries, setSd4Entries,
  sd5Data, setSd5Data, sd6Entries, setSd6Entries,
}) {
  const [loading, setLoading] = useState(false);

  const clean    = (arr) => (arr || []).map(({ id, ...rest }) => rest);
  const cleanObj = (obj) => {
    if (!obj) return {};
    const r = {};
    for (const k in obj) r[k] = Array.isArray(obj[k]) ? clean(obj[k]) : obj[k];
    return r;
  };

  // Marks
  const tl       = calcTLTotal(tl1Data || {}, tl4Data || {});
  const research = calcResearchTotal(r1Entries||[], r2Data||{}, r3Entries||[], r4Data||{}, r5Data||{}, r6Data||{});
  const sd       = calcSDTotal(sd1Entries||[], sd2Entries||[], sd3Entries||[], sd4Entries||[], sd5Data||{}, sd6Entries||[]);
  const grand    = calcGrandTotal(tl.total, research.total, sd.total);

  const getPayload = () => ({
    facultyName, facultyEmail, academicYear: ACADEMIC_YEAR,
    tl1: cleanObj(tl1Data), tl4: cleanObj(tl4Data),
    r1JournalPapers: clean(r1Entries), r2Books: cleanObj(r2Data),
    r3ConferencePapers: clean(r3Entries), r4Projects: cleanObj(r4Data),
    r5Consultancy: cleanObj(r5Data), r6Patents: cleanObj(r6Data),
    sd1FDP: clean(sd1Entries), sd2Workshop: clean(sd2Entries),
    sd3Refresher: clean(sd3Entries), sd4MOOCs: clean(sd4Entries),
    sd5PhD: cleanObj(sd5Data), sd6Awards: clean(sd6Entries),
    calculatedMarks: {
      tl:         parseFloat(tl.total.toFixed(2)),
      research:   parseFloat(research.total.toFixed(2)),
      sd:         parseFloat(sd.total.toFixed(2)),
      grandTotal: parseFloat(grand.total.toFixed(2)),
      hodMarks:   0,
      finalTotal: parseFloat(grand.total.toFixed(2)),
    },
  });

  const saveToBackend = async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getPayload()),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.message || 'Save failed'); }
    return res.json();
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await saveToBackend();
      setToastMsg('✅ Draft saved successfully!');
      onStatusChange?.('draft'); // ← status update
    } catch (err) { setToastMsg(`❌ ${err.message}`); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveToBackend();
      const res = await fetch(`${BASE_URL}/${facultyEmail}/submit`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facultyName }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message); }
      setToastMsg('✅ Submitted for HoD review!');
      onStatusChange?.('submitted'); // ← status update — tracker move karega
    } catch (err) { setToastMsg(`❌ ${err.message}`); }
    finally { setLoading(false); }
  };

  const sectionScore = {
    teaching:        { marks: tl.total,       max: 110 },
    research:        { marks: research.total, max: 125 },
    selfdevelopment: { marks: sd.total,       max: 65  },
  };

  const meta      = MODULE_META[activeModule] || MODULE_META.teaching;
  const itemLabel = ITEM_LABELS[activeItem]   || '';
  const ModIcon   = meta.icon;
  const currScore = sectionScore[activeModule] || sectionScore.teaching;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div style={{ background: 'var(--bg-card,#fff)', borderRadius: 14, border: '1px solid var(--border,#e2e8f0)', padding: '16px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ModIcon size={20} color={meta.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{meta.label}</span>
              <span style={{ color: 'var(--border,#cbd5e1)' }}>›</span>
              <span style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', fontWeight: 500 }}>{itemLabel}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-main,#0f172a)', letterSpacing: '-0.4px' }}>{itemLabel}</h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Section score */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 16px', borderRadius: 10, background: meta.bg, border: `1.5px solid ${meta.color}40`, minWidth: 70 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: meta.color, lineHeight: 1.1 }}>{currScore.marks.toFixed(1)}</span>
            <span style={{ fontSize: 10, color: meta.color, opacity: 0.75, fontWeight: 500 }}>/ {currScore.max} marks</span>
          </div>
          <button onClick={handleSaveDraft} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, border: '1.5px solid var(--border,#e2e8f0)', background: 'var(--bg-card,#fff)', fontSize: 13, fontWeight: 500, color: 'var(--text-sub,#475569)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            <Save size={15} /> {loading ? 'Saving…' : 'Save Draft'}
          </button>
          <button onClick={handleSubmit} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, border: 'none', background: loading ? '#94a3b8' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 13, fontWeight: 600, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 2px 8px rgba(99,102,241,0.35)' }}>
            <Send size={15} /> {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Forms */}
      <div>
        {activeModule==='teaching'        && activeItem==='tl1' && <TL1Form data={tl1Data||{}} setData={setTl1Data} />}
        {activeModule==='teaching'        && activeItem==='tl4' && <TL4Form data={tl4Data||{}} setData={setTl4Data} />}
        {activeModule==='research'        && activeItem==='r1'  && <R1Form entries={r1Entries} setEntries={setR1Entries} />}
        {activeModule==='research'        && activeItem==='r2'  && <R2Form data={r2Data||{}}   setData={setR2Data} />}
        {activeModule==='research'        && activeItem==='r3'  && <R3Form entries={r3Entries} setEntries={setR3Entries} />}
        {activeModule==='research'        && activeItem==='r4'  && <R4Form data={r4Data||{}}   setData={setR4Data} />}
        {activeModule==='research'        && activeItem==='r5'  && <R5Form data={r5Data||{}}   setData={setR5Data} />}
        {activeModule==='research'        && activeItem==='r6'  && <R6Form data={r6Data||{}}   setData={setR6Data} />}
        {activeModule==='selfdevelopment' && activeItem==='sd1' && <SD1Form entries={sd1Entries} setEntries={setSd1Entries} />}
        {activeModule==='selfdevelopment' && activeItem==='sd2' && <SD2Form entries={sd2Entries} setEntries={setSd2Entries} />}
        {activeModule==='selfdevelopment' && activeItem==='sd3' && <SD3Form entries={sd3Entries} setEntries={setSd3Entries} />}
        {activeModule==='selfdevelopment' && activeItem==='sd4' && <SD4Form entries={sd4Entries} setEntries={setSd4Entries} />}
        {activeModule==='selfdevelopment' && activeItem==='sd5' && <SD5Form data={sd5Data||{}}  setData={setSd5Data} />}
        {activeModule==='selfdevelopment' && activeItem==='sd6' && <SD6Form entries={sd6Entries} setEntries={setSd6Entries} />}
      </div>
    </div>
  );
}