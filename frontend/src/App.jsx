<<<<<<< HEAD
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar       from './components/faculty/sidebar';
import DashboardPage from './pages/faculty/dashboardPage';
import DataEntryPage from './pages/faculty/DataEntryPge';
import Toast         from './components/common/Toast';
import HODAppRoutes from './routes/HOD/AppRoutes';
import './index.css'
=======
// import Sidebar       from './components/faculty/sidebar';
// import DashboardPage from './pages/faculty/dashboardPage';
// import DataEntryPage from './pages/faculty/DataEntryPge';
// import Toast         from './components/common/Toast';
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// const FACULTY_EMAIL = 'Rishamjot@university.edu';
// const BASE_URL      = 'http://localhost:5000/api/submission';

// // ── id add karo arrays mein (React ke liye zaroori) ──
// const addIds = (arr) => (arr || []).map((item, i) => ({ ...item, id: String(i + 1) }));

// export default function App() {
//   const [toastMsg,     setToastMsg]     = useState('');
//   const [activeModule, setActiveModule] = useState('teaching');
//   const [activeItem,   setActiveItem]   = useState('tl1');
//   const [loading,      setLoading]      = useState(true); // page load spinner

//   // ── Teaching State ──
//   const [tl1Data, setTl1Data] = useState({});
//   const [tl4Data, setTl4Data] = useState({});

//   // ── Research State ──
//   // const [r1Entries, setR1Entries] = useState([{ id: '1', title: '', journalName: '', issnNumber: '', yearOfPublication: '', indexing: '', authorshipPosition: '', volumeIssue: '' }]);
//   const [r1Entries, setR1Entries] = useState([]);
// const [r3Entries, setR3Entries] = useState([]);
//   const [r2Data,    setR2Data]    = useState({});
//   // const [r3Entries, setR3Entries] = useState([{ id: '1', paperTitle: '', conferenceTitle: '', isbnNumberDate: '', indexing: '', authorshipPosition: '', publisher: '' }]);
//   const [r4Data,    setR4Data]    = useState({});
//   const [r5Data,    setR5Data]    = useState({});
//   const [r6Data,    setR6Data]    = useState({});

//   // ── Self Development State ──
//   // const [sd1Entries, setSd1Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfDays: '', dates: '' }]);
//   // const [sd2Entries, setSd2Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfWeeks: '', dates: '' }]);
//   // const [sd3Entries, setSd3Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfWeeks: '', dates: '' }]);
//   // const [sd4Entries, setSd4Entries] = useState([{ id: '1', title: '', provider: '', duration: '', startDate: '', completionDate: '' }]);
//   const [sd5Data,    setSd5Data]    = useState({});
//   // const [sd6Entries, setSd6Entries] = useState([{ id: '1', awardTitle: '', organizationName: '', scope: '', dateOfAward: '' }]);
//   const [sd1Entries, setSd1Entries] = useState([]);
// const [sd2Entries, setSd2Entries] = useState([]);
// const [sd3Entries, setSd3Entries] = useState([]);
// const [sd4Entries, setSd4Entries] = useState([]);
// const [sd6Entries, setSd6Entries] = useState([]);

//   // ── Page load par MongoDB se fetch karo ──
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/${FACULTY_EMAIL}`);
//         if (!res.ok) {
//           // No submission found — defaults use karo
//           setLoading(false);
//           return;
//         }
//         const data = await res.json();

//         // ── Teaching ──
//         if (data.tl1) setTl1Data(data.tl1);
//         if (data.tl4) setTl4Data(data.tl4);

//         // ── Research ──
//         if (data.r1JournalPapers?.length)    setR1Entries(addIds(data.r1JournalPapers));
//         if (data.r2Books)                    setR2Data(data.r2Books);
//         if (data.r3ConferencePapers?.length) setR3Entries(addIds(data.r3ConferencePapers));
//         if (data.r4Projects)                 setR4Data(data.r4Projects);
//         if (data.r5Consultancy)              setR5Data(data.r5Consultancy);
//         if (data.r6Patents)                  setR6Data(data.r6Patents);

//         // ── Self Development ──
//         if (data.sd1FDP?.length)      setSd1Entries(addIds(data.sd1FDP));
//         if (data.sd2Workshop?.length) setSd2Entries(addIds(data.sd2Workshop));
//         if (data.sd3Refresher?.length)setSd3Entries(addIds(data.sd3Refresher));
//         if (data.sd4MOOCs?.length)    setSd4Entries(addIds(data.sd4MOOCs));
//         if (data.sd5PhD)              setSd5Data(data.sd5PhD);
//         if (data.sd6Awards?.length)   setSd6Entries(addIds(data.sd6Awards));

//       } catch (err) {
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // sirf ek baar — page load par

//   // ── Loading screen ──
//   if (loading) {
//     return (
//       <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
//           <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>Loading your data…</p>
//         </div>
//         <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   const marksProps = {
//     tl1Data, tl4Data,
//     r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
//     sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
//   };

//   const setterProps = {
//     setTl1Data, setTl4Data,
//     setR1Entries, setR2Data, setR3Entries, setR4Data, setR5Data, setR6Data,
//     setSd1Entries, setSd2Entries, setSd3Entries, setSd4Entries, setSd5Data, setSd6Entries,
//   };

//   return (
//     <BrowserRouter>
//       <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>

//         <Sidebar
//           activeModule={activeModule}
//           activeItem={activeItem}
//           onModuleItemSelect={(mod, item) => { setActiveModule(mod); setActiveItem(item); }}
//         />

//         <div style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#f8fafc' }}>
//           <div style={{ padding: 28, maxWidth: '100%', boxSizing: 'border-box' }}>
//             <Routes>
//               <Route path="/"          element={<Navigate to="/dashboard" replace />} />
//               <Route path="/dashboard" element={<DashboardPage {...marksProps} />} />
//               <Route path="/entry"     element={
//                 <DataEntryPage
//                   setToastMsg={setToastMsg}
//                   activeModule={activeModule}
//                   activeItem={activeItem}
//                   setActiveModule={setActiveModule}
//                   setActiveItem={setActiveItem}
//                   {...marksProps}
//                   {...setterProps}
//                 />
//               } />
//             </Routes>
//           </div>
//         </div>

//         {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
//       </div>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import FacultyRoutes    from './routes/FacultyRoutes';
// import HodRoutes     from './routes/HodRoutes';      ← next ye karna haiii

// Abhi hardcoded — baad mein ye login se aayega
const CURRENT_ROLE = 'faculty';

>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
export default function App() {
  const [toastMsg,     setToastMsg]     = useState('');
  const [activeModule, setActiveModule] = useState('teaching');
  const [activeItem,   setActiveItem]   = useState('tl1');

  // ── Shared form state (used by both DataEntryPage + DashboardPage) ──

  // Teaching
  const [tl1Data, setTl1Data] = useState({});
  const [tl4Data, setTl4Data] = useState({});

  // Research
  const [r1Entries, setR1Entries] = useState([{ id: '1', title: '', journalName: '', issnNumber: '', yearOfPublication: '', indexing: 'Scopus', authorshipPosition: '1st', volumeIssue: '' }]);
  const [r2Data,    setR2Data]    = useState({});
  const [r3Entries, setR3Entries] = useState([{ id: '1', paperTitle: '', conferenceTitle: '', isbnNumberDate: '', indexing: 'Scopus', authorshipPosition: '1st', publisher: 'International' }]);
  const [r4Data,    setR4Data]    = useState({});
  const [r5Data,    setR5Data]    = useState({});
  const [r6Data,    setR6Data]    = useState({});

  // Self Development
  const [sd1Entries, setSd1Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfDays: '', dates: '' }]);
  const [sd2Entries, setSd2Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfWeeks: '', dates: '' }]);
  const [sd3Entries, setSd3Entries] = useState([{ id: '1', title: '', organizingInstitute: '', numberOfWeeks: '', dates: '' }]);
  const [sd4Entries, setSd4Entries] = useState([{ id: '1', title: '', provider: '', duration: '', startDate: '', completionDate: '' }]);
  const [sd5Data,    setSd5Data]    = useState({});
  const [sd6Entries, setSd6Entries] = useState([{ id: '1', awardTitle: '', organizationName: '', scope: 'National', dateOfAward: '' }]);

  // Common marks props — passed to both pages
  const marksProps = {
    tl1Data, tl4Data,
    r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
    sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
  };

  // Setter props — only DataEntryPage needs these
  const setterProps = {
    setTl1Data, setTl4Data,
    setR1Entries, setR2Data, setR3Entries, setR4Data, setR5Data, setR6Data,
    setSd1Entries, setSd2Entries, setSd3Entries, setSd4Entries, setSd5Data, setSd6Entries,
  };

  const handleModuleItemSelect = (moduleKey, itemKey) => {
    setActiveModule(moduleKey);
    setActiveItem(itemKey);
  };

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>

        <Sidebar
          activeModule={activeModule}
          activeItem={activeItem}
          onModuleItemSelect={handleModuleItemSelect}
        />

        <div style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#f8fafc' }}>
          <div style={{ padding: 28, maxWidth: '100%', boxSizing: 'border-box' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={
                <DashboardPage {...marksProps} />
              } />

              <Route path="/entry" element={
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
              <Route path="/HOD/*" element={
                <HODAppRoutes/>
              } />
              
              {/* <HODAppRoutes /> */}
            </Routes>
          </div>
        </div>

        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
      </div>
    </BrowserRouter>
    
=======
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Faculty Routes ── */}
          <Route path="/faculty/*" element={<FacultyRoutes />} />

          
          {/* <Route path="/hod/*" element={<HodRoutes />} /> */}


          {/* ── Default redirect based on role ── */}
          <Route path="*" element={
            <Navigate to={`/${CURRENT_ROLE}/dashboard`} replace />
          } />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
  );
}