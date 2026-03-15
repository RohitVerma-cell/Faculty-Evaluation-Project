import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar       from './components/faculty/sidebar';
import DashboardPage from './pages/faculty/dashboardPage';
import DataEntryPage from './pages/faculty/DataEntryPge';
import Toast         from './components/common/Toast';

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
            </Routes>
          </div>
        </div>

        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
      </div>
    </BrowserRouter>
  );
}