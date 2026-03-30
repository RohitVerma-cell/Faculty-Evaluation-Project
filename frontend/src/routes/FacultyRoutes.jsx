// ── src/routes/FacultyRoutes.jsx ──
// Saare Faculty ke routes yahan hain
// App.jsx se call hota hai jab role === 'faculty'

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect }     from 'react';

import Sidebar       from '../components/faculty/Sidebar';
import TopBar        from '../components/common/TopBar';
import Toast         from '../components/common/Toast';

import DashboardPage from '../pages/faculty/DashboardPage';
import DataEntryPage from '../pages/faculty/DataEntryPge';

const FACULTY_EMAIL = 'Rishamjot@university.edu';
const FACULTY_NAME  = 'Er. Rishamjot Kaur';
const BASE_URL      = 'http://localhost:5000/api/submission';

const addIds = (arr) => (arr || []).map((item, i) => ({ ...item, id: String(i + 1) }));

export default function FacultyRoutes() {
  const [toastMsg,     setToastMsg]     = useState('');
  const [activeModule, setActiveModule] = useState('teaching');
  const [activeItem,   setActiveItem]   = useState('tl1');
  const [loading,      setLoading]      = useState(true);

  // ── Teaching ──
  const [tl1Data, setTl1Data] = useState({});
  const [tl4Data, setTl4Data] = useState({});

  // ── Research ──
  const [r1Entries, setR1Entries] = useState([]);
  const [r2Data,    setR2Data]    = useState({});
  const [r3Entries, setR3Entries] = useState([]);
  const [r4Data,    setR4Data]    = useState({});
  const [r5Data,    setR5Data]    = useState({});
  const [r6Data,    setR6Data]    = useState({});

  // ── Self Development ──
  const [sd1Entries, setSd1Entries] = useState([]);
  const [sd2Entries, setSd2Entries] = useState([]);
  const [sd3Entries, setSd3Entries] = useState([]);
  const [sd4Entries, setSd4Entries] = useState([]);
  const [sd5Data,    setSd5Data]    = useState({});
  const [sd6Entries, setSd6Entries] = useState([]);

  // ── Fetch from MongoDB on load ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${FACULTY_EMAIL}`);
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();

        if (data.tl1) setTl1Data(data.tl1);
        if (data.tl4) setTl4Data(data.tl4);

        if (data.r1JournalPapers?.length)    setR1Entries(addIds(data.r1JournalPapers));
        if (data.r2Books)                    setR2Data(data.r2Books);
        if (data.r3ConferencePapers?.length) setR3Entries(addIds(data.r3ConferencePapers));
        if (data.r4Projects)                 setR4Data(data.r4Projects);
        if (data.r5Consultancy)              setR5Data(data.r5Consultancy);
        if (data.r6Patents)                  setR6Data(data.r6Patents);

        if (data.sd1FDP?.length)       setSd1Entries(addIds(data.sd1FDP));
        if (data.sd2Workshop?.length)  setSd2Entries(addIds(data.sd2Workshop));
        if (data.sd3Refresher?.length) setSd3Entries(addIds(data.sd3Refresher));
        if (data.sd4MOOCs?.length)     setSd4Entries(addIds(data.sd4MOOCs));
        if (data.sd5PhD)               setSd5Data(data.sd5PhD);
        if (data.sd6Awards?.length)    setSd6Entries(addIds(data.sd6Awards));

      } catch (err) {
        console.error('Faculty fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main, #f8fafc)', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>Loading your data…</p>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  // ── Shared props ──
  const marksProps = {
    tl1Data, tl4Data,
    r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
    sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
  };

  const setterProps = {
    setTl1Data, setTl4Data,
    setR1Entries, setR2Data, setR3Entries, setR4Data, setR5Data, setR6Data,
    setSd1Entries, setSd2Entries, setSd3Entries, setSd4Entries, setSd5Data, setSd6Entries,
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Faculty Sidebar ── */}
      <Sidebar
        activeModule={activeModule}
        activeItem={activeItem}
        onModuleItemSelect={(mod, item) => { setActiveModule(mod); setActiveItem(item); }}
      />

      {/* ── Right side ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TopBar — notification bell visible (role=faculty) */}
        <TopBar
          role="faculty"
          userName={FACULTY_NAME}
          userDept="CSE Department"
        />

        {/* Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', background: 'var(--bg-main, #f8fafc)' }}>
          <div style={{ padding: 28, maxWidth: '100%', boxSizing: 'border-box' }}>
            <Routes>
              <Route index                element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"     element={<DashboardPage {...marksProps} />} />
              <Route path="entry"         element={
                <DataEntryPage
                  setToastMsg={setToastMsg}
                  activeModule={activeModule}
                  activeItem={activeItem}
                  setActiveModule={setActiveModule}
                  setActiveItem={setActiveItem}
                  {...marksProps}
                  {...setterProps}
                />
              } />
              {/* Future faculty routes yahan add karo */}
              {/* <Route path="profile"  element={<ProfilePage />} /> */}
            </Routes>
          </div>
        </div>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
    </div>
  );
}
