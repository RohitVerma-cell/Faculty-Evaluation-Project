import { useState } from 'react';
import { Save, Send } from 'lucide-react';
import styles from '../utils/styles';
import {
  MAIN_TABS, TEACHING_SUBTABS, RESEARCH_SUBTABS, SD_SUBTABS,
} from '../utils/constants';

// Teaching forms
import TL1Form from '../components/forms/teaching/TL1Form';
import TL4Form from '../components/forms/teaching/TL4Form';

// Research forms
import R1Form from '../components/forms/research/R1Form';
import R2Form from '../components/forms/research/R2Form';
import R3Form from '../components/forms/research/R3Form';
import R4Form from '../components/forms/research/R4Form';
import R5Form from '../components/forms/research/R5Form';
import R6Form from '../components/forms/research/R6Form';

// Self Development forms
import { SD1Form, SD2Form, SD3Form, SD4Form, SD5Form, SD6Form } from '../components/forms/self-development/SDForm';

const FACULTY_EMAIL = 'ananya.sharma@university.edu';
const FACULTY_NAME  = 'Dr. Ananya Sharma';
const ACADEMIC_YEAR = '2024-25';
const BASE_URL      = 'http://localhost:5000/api/submission';

export default function DataEntryPage({ setToastMsg }) {
  const [mainTab,    setMainTab]    = useState('teaching');
  const [teachingTab,setTeachingTab]= useState('tl1');
  const [researchTab,setResearchTab]= useState('r1');
  const [sdTab,      setSdTab]      = useState('sd1');
  const [loading,    setLoading]    = useState(false);

  // ── Teaching State ──
  const [tl1Data, setTl1Data] = useState({});
  const [tl4Data, setTl4Data] = useState({});

  // ── Research State ──
  const [r1Entries, setR1Entries] = useState([{ id:'1', title:'', journalName:'', issnNumber:'', yearOfPublication:'', indexing:'Scopus', authorshipPosition:'1st', volumeIssue:'' }]);
  const [r2Data,    setR2Data]    = useState({});
  const [r3Entries, setR3Entries] = useState([{ id:'1', paperTitle:'', conferenceTitle:'', isbnNumberDate:'', indexing:'Scopus', authorshipPosition:'1st', publisher:'International' }]);
  const [r4Data,    setR4Data]    = useState({});
  const [r5Data,    setR5Data]    = useState({});
  const [r6Data,    setR6Data]    = useState({});

  // ── Self Development State ──
  const [sd1Entries, setSd1Entries] = useState([{ id:'1', title:'', organizingInstitute:'', numberOfDays:'', dates:'' }]);
  const [sd2Entries, setSd2Entries] = useState([{ id:'1', title:'', organizingInstitute:'', numberOfWeeks:'', dates:'' }]);
  const [sd3Entries, setSd3Entries] = useState([{ id:'1', title:'', organizingInstitute:'', numberOfWeeks:'', dates:'' }]);
  const [sd4Entries, setSd4Entries] = useState([{ id:'1', title:'', provider:'', duration:'', startDate:'', completionDate:'' }]);
  const [sd5Data,    setSd5Data]    = useState({});
  const [sd6Entries, setSd6Entries] = useState([{ id:'1', awardTitle:'', organizationName:'', scope:'National', dateOfAward:'' }]);

  // Strip local React id before sending to MongoDB
  const clean = (arr) => (arr||[]).map(({ id, ...rest }) => rest);
  const cleanObj = (obj) => {
    if (!obj) return {};
    const result = {};
    for (const key in obj) {
      result[key] = Array.isArray(obj[key]) ? clean(obj[key]) : obj[key];
    }
    return result;
  };

  const getPayload = () => ({
    facultyName:  FACULTY_NAME,
    facultyEmail: FACULTY_EMAIL,
    academicYear: ACADEMIC_YEAR,

    // Teaching Learning
    tl1: cleanObj(tl1Data),
    tl4: cleanObj(tl4Data),

    // Research
    r1JournalPapers:    clean(r1Entries),
    r2Books:            cleanObj(r2Data),
    r3ConferencePapers: clean(r3Entries),
    r4Projects:         cleanObj(r4Data),
    r5Consultancy:      cleanObj(r5Data),
    r6Patents:          cleanObj(r6Data),

    // Self Development
    sd1FDP:         clean(sd1Entries),
    sd2Workshop:    clean(sd2Entries),
    sd3Refresher:   clean(sd3Entries),
    sd4MOOCs:       clean(sd4Entries),
    sd5PhD:         cleanObj(sd5Data),
    sd6Awards:      clean(sd6Entries),
  });

  const saveToBackend = async () => {
    const res = await fetch(BASE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(getPayload()),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Save failed');
    }
    return res.json();
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await saveToBackend();
      setToastMsg('✅ Draft saved successfully!');
    } catch (err) {
      setToastMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveToBackend();
      const res = await fetch(`${BASE_URL}/${FACULTY_EMAIL}/submit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facultyName: FACULTY_NAME }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message); }
      setToastMsg('✅ Submitted for HoD review!');
    } catch (err) {
      setToastMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  // ── Sub-tab bar renderer ──
  const SubTabBar = ({ tabs, active, setActive }) => (
    <div style={styles.subTabBar}>
      {tabs.map((t) => (
        <button key={t.key} onClick={() => setActive(t.key)}
          style={active === t.key ? styles.subTabActive : styles.subTabInactive}>
          {t.label}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Data Entry</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>Academic Year {ACADEMIC_YEAR} · SAP-2025</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...styles.btn, ...styles.btnSecondary, opacity: loading ? 0.6 : 1 }}
            onClick={handleSaveDraft} disabled={loading}>
            <Save size={16} /> {loading ? 'Saving…' : 'Save Draft'}
          </button>
          <button style={{ ...styles.btn, ...styles.btnPrimary, opacity: loading ? 0.6 : 1 }}
            onClick={handleSubmit} disabled={loading}>
            <Send size={16} /> {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Main Tab bar */}
      <div style={styles.tabBar}>
        {MAIN_TABS.map((t) => (
          <button key={t.key} onClick={() => setMainTab(t.key)}
            style={mainTab === t.key ? styles.tabActive : styles.tabInactive}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ TEACHING LEARNING ══ */}
      {mainTab === 'teaching' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SubTabBar tabs={TEACHING_SUBTABS} active={teachingTab} setActive={setTeachingTab} />
          {teachingTab === 'tl1' && <TL1Form data={tl1Data} setData={setTl1Data} />}
          {teachingTab === 'tl4' && <TL4Form data={tl4Data} setData={setTl4Data} />}
        </div>
      )}

      {/* ══ RESEARCH ══ */}
      {mainTab === 'research' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SubTabBar tabs={RESEARCH_SUBTABS} active={researchTab} setActive={setResearchTab} />
          {researchTab === 'r1' && <R1Form entries={r1Entries} setEntries={setR1Entries} />}
          {researchTab === 'r2' && <R2Form data={r2Data}       setData={setR2Data} />}
          {researchTab === 'r3' && <R3Form entries={r3Entries} setEntries={setR3Entries} />}
          {researchTab === 'r4' && <R4Form data={r4Data}       setData={setR4Data} />}
          {researchTab === 'r5' && <R5Form data={r5Data}       setData={setR5Data} />}
          {researchTab === 'r6' && <R6Form data={r6Data}       setData={setR6Data} />}
        </div>
      )}

      {/* ══ SELF DEVELOPMENT ══ */}
      {mainTab === 'selfdevelopment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SubTabBar tabs={SD_SUBTABS} active={sdTab} setActive={setSdTab} />
          {sdTab === 'sd1' && <SD1Form entries={sd1Entries} setEntries={setSd1Entries} />}
          {sdTab === 'sd2' && <SD2Form entries={sd2Entries} setEntries={setSd2Entries} />}
          {sdTab === 'sd3' && <SD3Form entries={sd3Entries} setEntries={setSd3Entries} />}
          {sdTab === 'sd4' && <SD4Form entries={sd4Entries} setEntries={setSd4Entries} />}
          {sdTab === 'sd5' && <SD5Form data={sd5Data}       setData={setSd5Data} />}
          {sdTab === 'sd6' && <SD6Form entries={sd6Entries} setEntries={setSd6Entries} />}
        </div>
      )}

    </div>
  );
}
