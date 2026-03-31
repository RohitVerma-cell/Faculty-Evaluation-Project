<<<<<<< HEAD
=======
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard, BookOpen, FlaskConical, GraduationCap,
//   ChevronDown, ChevronRight, LogOut, Menu,
//   Book,
// } from 'lucide-react';

// const FACULTY_NAME  = 'Er.Rishamjot Kaur';
// const FACULTY_DEPT  = 'CSE Department';
// const ACADEMIC_YEAR = '2025-26';

// // ── Module definitions ──
// const MODULES = [
//   {
//     key:      'teaching',
//     label:    'Teaching Learning',
//     short:    'TL',
//     icon:     BookOpen,
//     color:    '#6366f1',
//     lightBg:  'rgba(99,102,241,0.12)',
//     border:   'rgba(99,102,241,0.35)',
//     items: [
//       { key: 'tl1', label: 'TL.1 Student Involvement' },
//       { key: 'tl4', label: 'TL.4 Outcome' },
//     ],
//   },
//   {
//     key:      'research',
//     label:    'Research',
//     short:    'R',
//     icon:     FlaskConical,
//     color:    '#6366f1',
//     lightBg:  'rgba(99,102,241,0.12)',
//     border:   'rgba(99,102,241,0.35)',
//     items: [
//       { key: 'r1', label: 'R.1 Journal Papers' },
//       { key: 'r2', label: 'R.2 Books' },
//       { key: 'r3', label: 'R.3 Conference' },
//       { key: 'r4', label: 'R.4 Sponsored Projects' },
//       { key: 'r5', label: 'R.5 Consultancy' },
//       { key: 'r6', label: 'R.6 Patents & Startup' },
//     ],
//   },
//   {
//     key:      'selfdevelopment',
//     label:    'Self Development',
//     short:    'SD',
//     icon:     GraduationCap,
//     color:    '#6366f1',
//     lightBg:  'rgba(99,102,241,0.12)',
//     border:   'rgba(99,102,241,0.35)',
//     items: [
//       { key: 'sd1', label: 'SD.1 FDP' },
//       { key: 'sd2', label: 'SD.2 Workshop' },
//       { key: 'sd3', label: 'SD.3 Refresher' },
//       { key: 'sd4', label: 'SD.4 MOOCs' },
//       { key: 'sd5', label: 'SD.5 PhD' },
//       { key: 'sd6', label: 'SD.6 Awards' },
//     ],
//   },
// ];

// export default function Sidebar({ activeModule, activeItem, onModuleItemSelect }) {
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const isEntry   = location.pathname === '/entry';

//   // Which modules are expanded
//   const [openModules, setOpenModules] = useState({ teaching: true, research: false, selfdevelopment: false });

//   const toggleModule = (key) =>
//     setOpenModules((prev) => ({ ...prev, [key]: !prev[key] }));

//   const handleItemClick = (moduleKey, itemKey) => {
//     // Expand module if collapsed
//     if (!openModules[moduleKey]) setOpenModules((p) => ({ ...p, [moduleKey]: true }));
//     onModuleItemSelect?.(moduleKey, itemKey);
//     if (!isEntry) navigate('/entry');
//   };

//   // ── Inline styles ──
//   const s = {
//     sidebar: {
//       width: 264,
//       minWidth: 264,
//       height: '100vh',
//       background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
//       display: 'flex',
//       flexDirection: 'column',
//       boxShadow: '4px 0 32px rgba(0,0,0,0.25)',
//       position: 'relative',
//       zIndex: 40,
//       fontFamily: "'Inter', sans-serif",
//     },
//     logo: {
//       padding: '20px 18px 16px',
//       borderBottom: '1px solid rgba(255,255,255,0.06)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 11,
//     },
//     logoIcon: {
//       width: 38,
//       height: 38,
//       borderRadius: 10,
//       background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: 15,
//       fontWeight: 800,
//       color: '#fff',
//       flexShrink: 0,
//       boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
//     },
//     logoText: {
//       fontSize: 15,
//       fontWeight: 700,
//       color: '#f1f5f9',
//       letterSpacing: '-0.3px',
//     },
//     logoSub: {
//       fontSize: 11,
//       color: 'rgba(255,255,255,0.35)',
//       marginTop: 1,
//     },
//     navSection: {
//       padding: '12px 10px 6px',
//     },
//     navBtn: (active) => ({
//       width: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 10,
//       padding: '9px 12px',
//       borderRadius: 8,
//       border: 'none',
//       cursor: 'pointer',
//       background: active ? 'rgba(99,102,241,0.4)' : 'transparent',
//       color: active ? '#a5b4fc' : 'rgba(255,255,255,0.7)',
//       fontWeight: active ? 600 : 400,
//       fontSize: 13.5,
//       transition: 'all 0.15s',
//       textAlign: 'left',
//       marginBottom: 2,
//     }),
//     divider: {
//       margin: '4px 14px 0',
//       borderBottom: '1px solid rgba(255,255,255,0.05)',
//       paddingBottom: 4,
//     },
//     sectionLabel: {
//       fontSize: 10,
//       fontWeight: 700,
//       color: 'rgba(255,255,255,0.3)',
//       letterSpacing: '1.3px',
//       textTransform: 'uppercase',
//       padding: '10px 14px 5px',
//     },
//     modulesScroll: {
//       flex: 1,
//       overflowY: 'auto',
//       padding: '0 10px 10px',
//       scrollbarWidth: 'thin',
//       scrollbarColor: 'rgba(255,255,255,0.1) transparent',
//     },
//     moduleHeader: (mod, isOpen, isAnyItemActive) => ({
//       width: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 10,
//       padding: '9px 10px',
//       borderRadius: 9,
//       border: 'none',
//       cursor: 'pointer',
//       background: isAnyItemActive ? mod.lightBg : 'transparent',
//       transition: 'all 0.15s',
//       textAlign: 'left',
//       marginBottom: 1,
//     }),
//     moduleIcon: (mod, isAnyItemActive) => ({
//       width: 30,
//       height: 30,
//       borderRadius: 8,
//       background: isAnyItemActive ? mod.color : 'rgba(255,255,255,0.07)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexShrink: 0,
//       transition: 'all 0.2s',
//       boxShadow: isAnyItemActive ? `0 2px 8px ${mod.color}55` : 'none',
//     }),
//     moduleLabel: (isAnyItemActive) => ({
//       flex: 1,
//       fontSize: 13,
//       fontWeight: isAnyItemActive ? 700 : 500,
//       color: isAnyItemActive ? '#f1f5f9' : 'rgba(255,255,255,0.8)',
//       letterSpacing: '-0.1px',
//     }),
//     subList: (mod) => ({
//       marginLeft: 15,
//       paddingLeft: 14,
//       borderLeft: `2px solid ${mod.border}`,
//       marginTop: 2,
//       marginBottom: 6,
//     }),
//     subItem: (mod, isActive) => ({
//       width: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 9,
//       padding: '7px 10px',
//       borderRadius: 7,
//       border: 'none',
//       cursor: 'pointer',
//       background: isActive ? `${mod.color}20` : 'transparent',
//       transition: 'all 0.12s',
//       textAlign: 'left',
//       marginBottom: 1,
//     }),
//     dot: (mod, isActive) => ({
//       width: isActive ? 7 : 5,
//       height: isActive ? 7 : 5,
//       borderRadius: '50%',
//       background: isActive ? mod.color : 'rgba(255,255,255,0.18)',
//       flexShrink: 0,
//       transition: 'all 0.15s',
//       boxShadow: isActive ? `0 0 6px ${mod.color}` : 'none',
//     }),
//     subLabel: (isActive) => ({
//       fontSize: 12.5,
//       color: isActive ? '#f1f5f9' : 'rgba(255,255,255,0.6)',
//       fontWeight: isActive ? 600 : 400,
//       flex: 1,
//     }),
//     activePill: (mod) => ({
//       width: 3,
//       height: 14,
//       borderRadius: 2,
//       background: mod.color,
//       flexShrink: 0,
//     }),
//     userArea: {
//       padding: '12px 14px',
//       borderTop: '1px solid rgba(255,255,255,0.06)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 10,
//     },
//     avatar: {
//       width: 34,
//       height: 34,
//       borderRadius: '50%',
//       background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: 12,
//       fontWeight: 700,
//       color: '#fff',
//       flexShrink: 0,
//     },
//     userName: {
//       fontSize: 13,
//       fontWeight: 600,
//       color: '#e2e8f0',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//     },
//     userDept: {
//       fontSize: 11,
//       color: 'rgba(255,255,255,0.3)',
//       marginTop: 1,
//     },
//   };

//   const initials = FACULTY_NAME.split(' ').map((w) => w[0]).slice(0, 2).join('');

//   return (
//     <div style={s.sidebar}>

//       {/* ── Logo ── */}
//       <div style={s.logo}>
//         <div style={s.logoIcon}>S</div>
//         <div>
//           <div style={s.logoText}>SAP 2025</div>
//           <div style={s.logoSub}>Academic Year {ACADEMIC_YEAR}</div>
//         </div>
//       </div>

//       {/* ── Top Nav ── */}
//       <div style={s.navSection}>
//         <button style={s.navBtn(location.pathname === '/dashboard')} onClick={() => navigate('/dashboard')}>
//           <LayoutDashboard size={16} />
//           Dashboard
//         </button>
//       </div>

//       <div style={s.divider} />

//       {/* ── Modules Label ── */}
//       <div style={s.sectionLabel}>Data Entry Modules</div>

//       {/* ── Modules List ── */}
//       <div style={s.modulesScroll}>
//         {MODULES.map((mod) => {
//           const isOpen        = openModules[mod.key];
//           const isAnyActive   = activeModule === mod.key && isEntry;

//           return (
//             <div key={mod.key}>
//               {/* Module Header */}
//               <button
//                 style={s.moduleHeader(mod, isOpen, isAnyActive)}
//                 onClick={() => {
//                   toggleModule(mod.key);
//                   // If navigating to entry page
//                   if (!isEntry) navigate('/entry');
//                 }}
//               >
//                 <div style={s.moduleIcon(mod, isAnyActive)}>
//                   <mod.icon size={15} color={isAnyActive ? '#fff' : 'rgba(255,255,255,0.35)'} />
//                 </div>
//                 <span style={s.moduleLabel(isAnyActive)}>{mod.label}</span>
//                 {isOpen
//                   ? <ChevronDown size={14} color="rgba(255,255,255,0.25)" />
//                   : <ChevronRight size={14} color="rgba(255,255,255,0.2)" />}
//               </button>

//               {/* Sub Items */}
//               {isOpen && (
//                 <div style={s.subList(mod)}>
//                   {mod.items.map((item) => {
//                     const isActive = isEntry && activeModule === mod.key && activeItem === item.key;
//                     return (
//                       <button
//                         key={item.key}
//                         style={s.subItem(mod, isActive)}
//                         onClick={() => handleItemClick(mod.key, item.key)}
//                       >
//                         <span style={s.dot(mod, isActive)} />
//                         <span style={s.subLabel(isActive)}>{item.label}</span>
//                         {isActive && <span style={s.activePill(mod)} />}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* ── User Area ── */}
//       <div style={s.userArea}>
//         <div style={s.avatar}>{initials}</div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div style={s.userName}>{FACULTY_NAME}</div>
//           <div style={s.userDept}>{FACULTY_DEPT}</div>
//         </div>
//       </div>

//     </div>
//   );
// }


>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FlaskConical, GraduationCap,
<<<<<<< HEAD
  ChevronDown, ChevronRight, LogOut, Menu,
  Book,
=======
  ChevronDown, ChevronRight,
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
} from 'lucide-react';

const FACULTY_NAME  = 'Er.Rishamjot Kaur';
const FACULTY_DEPT  = 'CSE Department';
const ACADEMIC_YEAR = '2025-26';

<<<<<<< HEAD
// ── Module definitions ──
const MODULES = [
  {
    key:      'teaching',
    label:    'Teaching Learning',
    short:    'TL',
    icon:     BookOpen,
    color:    '#6366f1',
    lightBg:  'rgba(99,102,241,0.12)',
    border:   'rgba(99,102,241,0.35)',
=======
const MODULES = [
  {
    key:     'teaching',
    label:   'Teaching Learning',
    icon:    BookOpen,
    color:   '#6366f1',
    lightBg: 'rgba(99,102,241,0.12)',
    border:  'rgba(99,102,241,0.35)',
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
    items: [
      { key: 'tl1', label: 'TL.1 Student Involvement' },
      { key: 'tl4', label: 'TL.4 Outcome' },
    ],
  },
  {
<<<<<<< HEAD
    key:      'research',
    label:    'Research',
    short:    'R',
    icon:     FlaskConical,
    color:    '#6366f1',
    lightBg:  'rgba(99,102,241,0.12)',
    border:   'rgba(99,102,241,0.35)',
=======
    key:     'research',
    label:   'Research',
    icon:    FlaskConical,
    color:   '#6366f1',
    lightBg: 'rgba(99,102,241,0.12)',
    border:  'rgba(99,102,241,0.35)',
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
    items: [
      { key: 'r1', label: 'R.1 Journal Papers' },
      { key: 'r2', label: 'R.2 Books' },
      { key: 'r3', label: 'R.3 Conference' },
      { key: 'r4', label: 'R.4 Sponsored Projects' },
      { key: 'r5', label: 'R.5 Consultancy' },
      { key: 'r6', label: 'R.6 Patents & Startup' },
    ],
  },
  {
<<<<<<< HEAD
    key:      'selfdevelopment',
    label:    'Self Development',
    short:    'SD',
    icon:     GraduationCap,
    color:    '#6366f1',
    lightBg:  'rgba(99,102,241,0.12)',
    border:   'rgba(99,102,241,0.35)',
=======
    key:     'selfdevelopment',
    label:   'Self Development',
    icon:    GraduationCap,
    color:   '#6366f1',
    lightBg: 'rgba(99,102,241,0.12)',
    border:  'rgba(99,102,241,0.35)',
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
    items: [
      { key: 'sd1', label: 'SD.1 FDP' },
      { key: 'sd2', label: 'SD.2 Workshop' },
      { key: 'sd3', label: 'SD.3 Refresher' },
      { key: 'sd4', label: 'SD.4 MOOCs' },
      { key: 'sd5', label: 'SD.5 PhD' },
      { key: 'sd6', label: 'SD.6 Awards' },
    ],
  },
];

export default function Sidebar({ activeModule, activeItem, onModuleItemSelect }) {
<<<<<<< HEAD
  const navigate  = useNavigate();
  const location  = useLocation();
  const isEntry   = location.pathname === '/entry';

  // Which modules are expanded
  const [openModules, setOpenModules] = useState({ teaching: true, research: false, selfdevelopment: false });
=======
  const navigate = useNavigate();
  const location = useLocation();

  const isEntry     = location.pathname === '/faculty/entry';
  const isDashboard = location.pathname === '/faculty/dashboard';

  const [openModules, setOpenModules] = useState({
    teaching: true, research: false, selfdevelopment: false,
  });
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9

  const toggleModule = (key) =>
    setOpenModules((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleItemClick = (moduleKey, itemKey) => {
<<<<<<< HEAD
    // Expand module if collapsed
    if (!openModules[moduleKey]) setOpenModules((p) => ({ ...p, [moduleKey]: true }));
    onModuleItemSelect?.(moduleKey, itemKey);
    if (!isEntry) navigate('/entry');
  };

  // ── Inline styles ──
  const s = {
    sidebar: {
      width: 264,
      minWidth: 264,
      height: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 32px rgba(0,0,0,0.25)',
      position: 'relative',
      zIndex: 40,
=======
    if (!openModules[moduleKey])
      setOpenModules((p) => ({ ...p, [moduleKey]: true }));
    onModuleItemSelect?.(moduleKey, itemKey);
    if (!isEntry) navigate('/faculty/entry');
  };

  // ── Styles ──
  const s = {
    sidebar: {
      width: 264, minWidth: 264, height: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
      display: 'flex', flexDirection: 'column',
      boxShadow: '4px 0 32px rgba(0,0,0,0.25)',
      position: 'relative', zIndex: 40,
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      fontFamily: "'Inter', sans-serif",
    },
    logo: {
      padding: '20px 18px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
<<<<<<< HEAD
      display: 'flex',
      alignItems: 'center',
      gap: 11,
    },
    logoIcon: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 800,
      color: '#fff',
      flexShrink: 0,
      boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    },
    logoText: {
      fontSize: 15,
      fontWeight: 700,
      color: '#f1f5f9',
      letterSpacing: '-0.3px',
    },
    logoSub: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.35)',
      marginTop: 1,
    },
    navSection: {
      padding: '12px 10px 6px',
    },
    navBtn: (active) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 12px',
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      background: active ? 'rgba(99,102,241,0.4)' : 'transparent',
      color: active ? '#a5b4fc' : 'rgba(255,255,255,0.7)',
      fontWeight: active ? 600 : 400,
      fontSize: 13.5,
      transition: 'all 0.15s',
      textAlign: 'left',
      marginBottom: 2,
=======
      display: 'flex', alignItems: 'center', gap: 11,
    },
    logoIcon: {
      width: 38, height: 38, borderRadius: 10,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 15, fontWeight: 800, color: '#fff', flexShrink: 0,
      boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    },
    logoText: { fontSize: 15, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.3px' },
    logoSub:  { fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 },
    navSection: { padding: '12px 10px 6px' },
    navBtn: (active) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(99,102,241,0.4)' : 'transparent',
      color:      active ? '#a5b4fc' : 'rgba(255,255,255,0.7)',
      fontWeight: active ? 600 : 400,
      fontSize: 13.5, transition: 'all 0.15s', textAlign: 'left', marginBottom: 2,
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
    }),
    divider: {
      margin: '4px 14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      paddingBottom: 4,
    },
    sectionLabel: {
<<<<<<< HEAD
      fontSize: 10,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.3)',
      letterSpacing: '1.3px',
      textTransform: 'uppercase',
      padding: '10px 14px 5px',
    },
    modulesScroll: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 10px 10px',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(255,255,255,0.1) transparent',
    },
    moduleHeader: (mod, isOpen, isAnyItemActive) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 10px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: isAnyItemActive ? mod.lightBg : 'transparent',
      transition: 'all 0.15s',
      textAlign: 'left',
      marginBottom: 1,
    }),
    moduleIcon: (mod, isAnyItemActive) => ({
      width: 30,
      height: 30,
      borderRadius: 8,
      background: isAnyItemActive ? mod.color : 'rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s',
      boxShadow: isAnyItemActive ? `0 2px 8px ${mod.color}55` : 'none',
    }),
    moduleLabel: (isAnyItemActive) => ({
      flex: 1,
      fontSize: 13,
      fontWeight: isAnyItemActive ? 700 : 500,
      color: isAnyItemActive ? '#f1f5f9' : 'rgba(255,255,255,0.8)',
      letterSpacing: '-0.1px',
    }),
    subList: (mod) => ({
      marginLeft: 15,
      paddingLeft: 14,
      borderLeft: `2px solid ${mod.border}`,
      marginTop: 2,
      marginBottom: 6,
    }),
    subItem: (mod, isActive) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '7px 10px',
      borderRadius: 7,
      border: 'none',
      cursor: 'pointer',
      background: isActive ? `${mod.color}20` : 'transparent',
      transition: 'all 0.12s',
      textAlign: 'left',
      marginBottom: 1,
    }),
    dot: (mod, isActive) => ({
      width: isActive ? 7 : 5,
      height: isActive ? 7 : 5,
      borderRadius: '50%',
      background: isActive ? mod.color : 'rgba(255,255,255,0.18)',
      flexShrink: 0,
      transition: 'all 0.15s',
=======
      fontSize: 10, fontWeight: 700,
      color: 'rgba(255,255,255,0.3)',
      letterSpacing: '1.3px', textTransform: 'uppercase',
      padding: '10px 14px 5px',
    },
    modulesScroll: {
      flex: 1, overflowY: 'auto', padding: '0 10px 10px',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(255,255,255,0.1) transparent',
    },
    moduleHeader: (mod, isAnyActive) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
      background: isAnyActive ? mod.lightBg : 'transparent',
      transition: 'all 0.15s', textAlign: 'left', marginBottom: 1,
    }),
    moduleIcon: (mod, isAnyActive) => ({
      width: 30, height: 30, borderRadius: 8,
      background: isAnyActive ? mod.color : 'rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all 0.2s',
      boxShadow: isAnyActive ? `0 2px 8px ${mod.color}55` : 'none',
    }),
    moduleLabel: (isAnyActive) => ({
      flex: 1, fontSize: 13,
      fontWeight: isAnyActive ? 700 : 500,
      color: isAnyActive ? '#f1f5f9' : 'rgba(255,255,255,0.8)',
      letterSpacing: '-0.1px',
    }),
    subList: (mod) => ({
      marginLeft: 15, paddingLeft: 14,
      borderLeft: `2px solid ${mod.border}`,
      marginTop: 2, marginBottom: 6,
    }),
    subItem: (mod, isActive) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
      padding: '7px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
      background: isActive ? `${mod.color}20` : 'transparent',
      transition: 'all 0.12s', textAlign: 'left', marginBottom: 1,
    }),
    dot: (mod, isActive) => ({
      width: isActive ? 7 : 5, height: isActive ? 7 : 5,
      borderRadius: '50%',
      background: isActive ? mod.color : 'rgba(255,255,255,0.18)',
      flexShrink: 0, transition: 'all 0.15s',
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      boxShadow: isActive ? `0 0 6px ${mod.color}` : 'none',
    }),
    subLabel: (isActive) => ({
      fontSize: 12.5,
<<<<<<< HEAD
      color: isActive ? '#f1f5f9' : 'rgba(255,255,255,0.6)',
=======
      color:      isActive ? '#f1f5f9' : 'rgba(255,255,255,0.6)',
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      fontWeight: isActive ? 600 : 400,
      flex: 1,
    }),
    activePill: (mod) => ({
<<<<<<< HEAD
      width: 3,
      height: 14,
      borderRadius: 2,
      background: mod.color,
      flexShrink: 0,
=======
      width: 3, height: 14, borderRadius: 2,
      background: mod.color, flexShrink: 0,
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
    }),
    userArea: {
      padding: '12px 14px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
<<<<<<< HEAD
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0,
    },
    userName: {
      fontSize: 13,
      fontWeight: 600,
      color: '#e2e8f0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    userDept: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.3)',
      marginTop: 1,
    },
=======
      display: 'flex', alignItems: 'center', gap: 10,
    },
    avatar: {
      width: 34, height: 34, borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
    },
    userName: {
      fontSize: 13, fontWeight: 600, color: '#e2e8f0',
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    userDept: { fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 },
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
  };

  const initials = FACULTY_NAME.split(' ').map((w) => w[0]).slice(0, 2).join('');

  return (
    <div style={s.sidebar}>

<<<<<<< HEAD
      {/* ── Logo ── */}
=======
      {/* Logo */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      <div style={s.logo}>
        <div style={s.logoIcon}>S</div>
        <div>
          <div style={s.logoText}>SAP 2025</div>
          <div style={s.logoSub}>Academic Year {ACADEMIC_YEAR}</div>
        </div>
      </div>

<<<<<<< HEAD
      {/* ── Top Nav ── */}
      <div style={s.navSection}>
        <button style={s.navBtn(location.pathname === '/dashboard')} onClick={() => navigate('/dashboard')}>
=======
      {/* Dashboard nav button */}
      <div style={s.navSection}>
        <button
          style={s.navBtn(isDashboard)}
          onClick={() => navigate('/faculty/dashboard')}
        >
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
          <LayoutDashboard size={16} />
          Dashboard
        </button>
      </div>

      <div style={s.divider} />
<<<<<<< HEAD

      {/* ── Modules Label ── */}
      <div style={s.sectionLabel}>Data Entry Modules</div>

      {/* ── Modules List ── */}
      <div style={s.modulesScroll}>
        {MODULES.map((mod) => {
          const isOpen        = openModules[mod.key];
          const isAnyActive   = activeModule === mod.key && isEntry;

          return (
            <div key={mod.key}>
              {/* Module Header */}
              <button
                style={s.moduleHeader(mod, isOpen, isAnyActive)}
                onClick={() => {
                  toggleModule(mod.key);
                  // If navigating to entry page
                  if (!isEntry) navigate('/entry');
=======
      <div style={s.sectionLabel}>Data Entry Modules</div>

      {/* Modules */}
      <div style={s.modulesScroll}>
        {MODULES.map((mod) => {
          const isOpen      = openModules[mod.key];
          const isAnyActive = activeModule === mod.key && isEntry;

          return (
            <div key={mod.key}>

              {/* ── Module Header — toggle accordion + navigate to entry ── */}
              <button
                style={s.moduleHeader(mod, isAnyActive)}
                onClick={() => {
                  toggleModule(mod.key);
                  if (!isEntry) navigate('/faculty/entry');
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
                }}
              >
                <div style={s.moduleIcon(mod, isAnyActive)}>
                  <mod.icon size={15} color={isAnyActive ? '#fff' : 'rgba(255,255,255,0.35)'} />
                </div>
                <span style={s.moduleLabel(isAnyActive)}>{mod.label}</span>
                {isOpen
<<<<<<< HEAD
                  ? <ChevronDown size={14} color="rgba(255,255,255,0.25)" />
                  : <ChevronRight size={14} color="rgba(255,255,255,0.2)" />}
=======
                  ? <ChevronDown  size={14} color="rgba(255,255,255,0.25)" />
                  : <ChevronRight size={14} color="rgba(255,255,255,0.2)"  />}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
              </button>

              {/* Sub Items */}
              {isOpen && (
                <div style={s.subList(mod)}>
                  {mod.items.map((item) => {
                    const isActive = isEntry && activeModule === mod.key && activeItem === item.key;
                    return (
                      <button
                        key={item.key}
                        style={s.subItem(mod, isActive)}
                        onClick={() => handleItemClick(mod.key, item.key)}
                      >
                        <span style={s.dot(mod, isActive)} />
                        <span style={s.subLabel(isActive)}>{item.label}</span>
                        {isActive && <span style={s.activePill(mod)} />}
                      </button>
                    );
                  })}
                </div>
              )}
<<<<<<< HEAD
=======

>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
            </div>
          );
        })}
      </div>

<<<<<<< HEAD
      {/* ── User Area ── */}
=======
      {/* User Area */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      <div style={s.userArea}>
        <div style={s.avatar}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={s.userName}>{FACULTY_NAME}</div>
          <div style={s.userDept}>{FACULTY_DEPT}</div>
        </div>
      </div>

    </div>
  );
}