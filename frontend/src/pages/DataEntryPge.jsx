// // ── pages/DataEntryPage.jsx ──

// import { useState } from 'react';
// import { Save, Send } from 'lucide-react';
// import styles           from '../utils/styles';
// import { ENTRY_TABS }   from '../utils/constants';
// import TeachingForm     from '../components/forms/TeachingForm';
// import ResearchForm     from '../components/forms/ResearchForm';
// import PatentForm       from '../components/forms/PatentForm';
// import FDPForm          from '../components/forms/FDPForm';
// import ConsultancyForm  from '../components/forms/ConsultancyForm';

// // Map tab keys → form components
// const TAB_COMPONENTS = {
//   teaching:    TeachingForm,
//   research:    ResearchForm,
//   patents:     PatentForm,
//   fdp:         FDPForm,
//   consultancy: ConsultancyForm,
// };

// /**
//  * DataEntryPage
//  * Props:
//  *   setToastMsg {Function}  — lifted up to AppShell to show toast
//  */
// export default function DataEntryPage({ setToastMsg }) {
//   const [activeTab, setActiveTab] = useState('teaching');

//   const ActiveForm = TAB_COMPONENTS[activeTab];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

//       {/* Page header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
//         <div>
//           <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>
//             Data Entry
//           </h1>
//           <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
//             Academic Year 2024-25
//           </p>
//         </div>

//         <div style={{ display: 'flex', gap: 8 }}>
//           <button
//             style={{ ...styles.btn, ...styles.btnSecondary }}
//             onClick={() => setToastMsg('Draft saved successfully!')}
//           >
//             <Save size={16} /> Save Draft
//           </button>
//           <button
//             style={{ ...styles.btn, ...styles.btnPrimary }}
//             onClick={() => setToastMsg('Submitted for HoD review!')}
//           >
//             <Send size={16} /> Submit
//           </button>
//         </div>
//       </div>

//       {/* Tab bar */}
//       <div style={styles.tabBar}>
//         {ENTRY_TABS.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             style={activeTab === tab.key ? styles.tabActive : styles.tabInactive}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Active form */}
//       <ActiveForm />

//     </div>
//   );
// }

// ── pages/DataEntryPage.jsx  (updated — wired to backend) ──
//
// Changes from previous version:
//   • "Save Draft" → calls saveDraft() API
//   • "Submit"     → calls submitForReview() API
//   • Forms collect real state and pass it up via onDataChange prop

import { useState } from 'react';
import { Save, Send } from 'lucide-react';
import styles           from '../utils/styles';
import { ENTRY_TABS }   from '../utils/constants';
import TeachingForm     from '../components/forms/TeachingForm';
import ResearchForm     from '../components/forms/ResearchForm';
import PatentForm       from '../components/forms/PatentForm';
import FDPForm          from '../components/forms/FDPForm';
import ConsultancyForm  from '../components/forms/ConsultancyForm';
import { saveDraft, submitForReview, createSubmission, getSubmission } from '../../../backend/services/submissionService';

// Faculty info — replace with real auth context later
const FACULTY_EMAIL = 'ananya.sharma@university.edu';
const FACULTY_NAME  = 'Dr. Ananya Sharma';

export default function DataEntryPage({ setToastMsg }) {
  const [activeTab,        setActiveTab]        = useState('teaching');
  const [teachingEntries,  setTeachingEntries]  = useState([]);
  const [researchEntries,  setResearchEntries]  = useState([]);
  const [patentEntries,    setPatentEntries]    = useState([]);
  const [fdpEntries,       setFdpEntries]       = useState([]);
  const [consultancyEntries, setConsultancyEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Save Draft ────────────────────────────────────
  // const handleSaveDraft = async () => {
  //   setLoading(true);
  //   try {
  //     await saveDraft(FACULTY_EMAIL, {
  //       facultyName:  FACULTY_NAME,
  //       teaching:     teachingEntries,
  //       research:     researchEntries,
  //       patents:      patentEntries,
  //       fdp:          fdpEntries,
  //       consultancy:  consultancyEntries,
  //     });
  //     setToastMsg('✅ Draft saved successfully!');
  //   } catch (err) {
  //     setToastMsg(`❌ ${err.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSaveDraft = async () => {
  setLoading(true);
  try {
    // Pehle check karo — exist karta hai ya nahi
    let exists = true;
    try {
      await getSubmission(FACULTY_EMAIL);
    } catch (err) {
      exists = false;  // 404 aaya matlab record nahi hai
    }

    if (!exists) {
      // Pehli baar — POST se create karo
      await createSubmission({
        facultyName:  FACULTY_NAME,
        facultyEmail: FACULTY_EMAIL,
        academicYear: '2024-25',
        teaching:     teachingEntries,
        research:     researchEntries,
        patents:      patentEntries,
        fdp:          fdpEntries,
        consultancy:  consultancyEntries,
      });
    } else {
      // Already exists — PUT se update karo
      await saveDraft(FACULTY_EMAIL, {
        facultyName:  FACULTY_NAME,
        teaching:     teachingEntries,
        research:     researchEntries,
        patents:      patentEntries,
        fdp:          fdpEntries,
        consultancy:  consultancyEntries,
      });
    }

    setToastMsg('✅ Draft saved successfully!');
  } catch (err) {
    setToastMsg(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  // ── Submit ────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Save latest data first, then change status
      await saveDraft(FACULTY_EMAIL, {
        facultyName:  FACULTY_NAME,
        teaching:     teachingEntries,
        research:     researchEntries,
        patents:      patentEntries,
        fdp:          fdpEntries,
        consultancy:  consultancyEntries,
      });
      await submitForReview(FACULTY_EMAIL, FACULTY_NAME);
      setToastMsg('✅ Submitted for HoD review!');
    } catch (err) {
      setToastMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Data Entry</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>Academic Year 2024-25</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{ ...styles.btn, ...styles.btnSecondary, opacity: loading ? 0.6 : 1 }}
            onClick={handleSaveDraft}
            disabled={loading}
          >
            <Save size={16} /> {loading ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary, opacity: loading ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            <Send size={16} /> {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={styles.tabBar}>
        {ENTRY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={activeTab === tab.key ? styles.tabActive : styles.tabInactive}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms — pass setState so parent can collect data for API */}
      {activeTab === 'teaching'    && <TeachingForm    entries={teachingEntries}    setEntries={setTeachingEntries} />}
      {activeTab === 'research'    && <ResearchForm    entries={researchEntries}    setEntries={setResearchEntries} />}
      {activeTab === 'patents'     && <PatentForm      entries={patentEntries}      setEntries={setPatentEntries} />}
      {activeTab === 'fdp'         && <FDPForm         entries={fdpEntries}         setEntries={setFdpEntries} />}
      {activeTab === 'consultancy' && <ConsultancyForm entries={consultancyEntries} setEntries={setConsultancyEntries} />}

    </div>
  );
}