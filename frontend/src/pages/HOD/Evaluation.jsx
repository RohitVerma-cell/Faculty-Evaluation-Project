// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ChevronLeft, PenLine } from 'lucide-react'
// import { useStore } from '../../context/useStore'
// import { MOCK_COURSES } from '../../data/HODmockdata'
// import { calcTL2Total, calcTL4Base } from '../../utils/HODhelpers'
// import Card from '../../components/HOD/Card'
// import Button from '../../components/HOD/Button'
// import Avatar from '../../components/HOD/Avatar'
// import StatusBadge from '../../components/HOD/StatusBadge'

// /* ── Shared primitives ─────────────────────────────────── */
// function SliderRow({ label, field, value, onChange }) {
//   return (
//     <div className="mb-5">
//       <div className="flex justify-between mb-2">
//         <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{label}</label>
//         <span className="text-[12px] text-slate-400">{value} / 10</span>
//       </div>
//       <div className="flex items-center gap-3">
//         <input
//           type="range" min={0} max={10} step={1}
//           value={value}
//           onChange={e => onChange(field, +e.target.value)}
//           className="flex-1"
//         />
//         <span className="w-10 text-center text-[18px] font-black text-blue-600 dark:text-blue-400">{value}</span>
//       </div>
//       <div className="score-bar mt-1.5">
//         <div className="score-fill" style={{ width: `${value * 10}%` }} />
//       </div>
//     </div>
//   )
// }

// function StepBar({ current }) {
//   const steps = ['TL2 – Progression', 'TL3 – Observation', 'TL4 – Outcome', 'Summary']
//   return (
//     <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
//       {steps.map((s, i) => {
//         const idx  = i + 1
//         const done = current > idx
//         const active = current === idx
//         return (
//           <div key={s} className={[
//             'flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-[12px] font-semibold transition-all',
//             active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
//               : done  ? 'text-emerald-600 dark:text-emerald-400'
//               : 'text-slate-400',
//           ].join(' ')}>
//             <span className={[
//               'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0',
//               active ? 'bg-white text-blue-600'
//                 : done ? 'bg-emerald-500 text-white'
//                 : 'bg-slate-300 dark:bg-slate-600 text-slate-500',
//             ].join(' ')}>
//               {done ? '✓' : idx}
//             </span>
//             <span className="hidden sm:inline">{s}</span>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// /* ── Faculty Selection Table ───────────────────────────── */
// function FacultySelector({ onSelect }) {
//   const { faculty } = useStore()

//   return (
//     <div className="page-enter space-y-4">
//       <div>
//         <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Select Faculty to Evaluate</h2>
//         <p className="text-[13px] text-slate-400 mt-1">Choose a faculty member to begin the TL2–TL4 evaluation process.</p>
//       </div>
//       <Card>
//         <div className="overflow-x-auto">
//           <table className="w-full text-[13px]">
//             <thead>
//               <tr className="bg-slate-50 dark:bg-slate-800/60">
//                 {['Faculty', 'Dept.', 'TL1 Score', 'Evaluation Status', 'Action'].map(h => (
//                   <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {faculty.map((f, i) => (
//                 <tr key={f.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors last:border-0">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-2.5">
//                       <Avatar name={f.name} initials={f.avatar} size={30} index={i} />
//                       <span className="font-semibold text-slate-800 dark:text-slate-200">{f.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded">{f.dept}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-2">
//                       <div className="score-bar w-16"><div className="score-fill" style={{ width: `${f.tl1}%` }} /></div>
//                       <span className="font-bold text-[14px] text-blue-600 dark:text-blue-400">{f.tl1}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3"><StatusBadge status={f.evalStatus} /></td>
//                   <td className="px-4 py-3">
//                     <Button size="sm" onClick={() => onSelect(f)}>
//                       <PenLine size={12} />
//                       {f.evalStatus === 'complete' ? 'Re-Evaluate' : 'Start'}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   )
// }

// /* ── Main Evaluation Wizard ────────────────────────────── */
// const INIT_FORM = {
//   teaching: 7, subject: 8, communication: 7, engagement: 8,
//   behavior: 7, hodRemarks: '',
//   courses: MOCK_COURSES.map(c => ({ ...c })),
//   finalAdjust: null,
// }

// export default function Evaluation() {
//   const { saveEvaluation } = useStore()
//   const navigate = useNavigate()

//   const [faculty,  setFaculty]  = useState(null)
//   const [step,     setStep]     = useState(0)
//   const [form,     setForm]     = useState(INIT_FORM)

//   const tl2Total = calcTL2Total(form)
//   const tl4Base  = calcTL4Base(form.courses)
//   const tl4Final = form.finalAdjust ?? tl4Base
//   const tl3Final = form.behavior * 10

//   const setSlider = (field, val) => setForm(f => ({ ...f, [field]: val }))

//   const handleSelect = (f) => {
//     setFaculty(f)
//     setForm(INIT_FORM)
//     setStep(1)
//   }

//   const handleBack = () => {
//     if (step <= 1) { setStep(0); setFaculty(null) }
//     else setStep(s => s - 1)
//   }

//   const handleSave = (isSubmit) => {
//     saveEvaluation(faculty.id, { tl2Total, tl3Score: form.behavior, tl4Score: tl4Final }, isSubmit)
//     setStep(0)
//     setFaculty(null)
//   }

//   /* ── Step 0: Faculty list */
//   if (step === 0) return <FacultySelector onSelect={handleSelect} />

//   const total = Math.round((faculty.tl1 + tl2Total + tl3Final + tl4Final) / 4)

//   return (
//     <div className="page-enter space-y-4">
//       {/* Step header */}
//       <div className="flex items-center gap-3">
//         <Button variant="outline" size="sm" onClick={handleBack}>
//           <ChevronLeft size={13} /> {step === 1 ? 'Faculty List' : 'Back'}
//         </Button>
//         <Avatar name={faculty.name} initials={faculty.avatar} size={32} />
//         <div>
//           <p className="font-bold text-slate-800 dark:text-white text-[14px]">{faculty.name}</p>
//           <p className="text-[11px] text-slate-400">TL1 Score: {faculty.tl1}</p>
//         </div>
//       </div>

//       <StepBar current={step} />

//       {/* ── STEP 1: TL2 */}
//       {step === 1 && (
//         <Card className="p-6 max-w-2xl">
//           <div className="text-[16px] font-bold text-blue-700 dark:text-blue-400 mb-1">📘 TL2 – Faculty Progression</div>
//           <p className="text-[12px] text-slate-400 mb-6">Rate each parameter from 0 to 10</p>

//           <SliderRow label="Teaching Skills"     field="teaching"      value={form.teaching}      onChange={setSlider} />
//           <SliderRow label="Subject Knowledge"   field="subject"       value={form.subject}       onChange={setSlider} />
//           <SliderRow label="Communication Skills"field="communication" value={form.communication} onChange={setSlider} />
//           <SliderRow label="Student Engagement"  field="engagement"    value={form.engagement}    onChange={setSlider} />

//           <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
//             <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl">
//               <span className="text-[12px] text-slate-500">TL2 Total: </span>
//               <span className="text-[22px] font-black text-blue-600 dark:text-blue-400">{tl2Total}</span>
//               <span className="text-[12px] text-slate-400">/100</span>
//             </div>
//             <Button onClick={() => setStep(2)}>Next: TL3 →</Button>
//           </div>
//         </Card>
//       )}

//       {/* ── STEP 2: TL3 */}
//       {step === 2 && (
//         <Card className="p-6 max-w-2xl">
//           <div className="text-[16px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">📗 TL3 – HoD Observation</div>
//           <p className="text-[12px] text-slate-400 mb-6">Based on your direct observation of this faculty member</p>

//           <SliderRow label="Behaviour & Professionalism" field="behavior" value={form.behavior} onChange={setSlider} />

//           <div className="mb-5">
//             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Observation Remarks</label>
//             <textarea
//               className="w-full min-h-[120px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y text-slate-700 dark:text-slate-200"
//               placeholder="Describe professional conduct, teamwork, departmental contributions…"
//               value={form.hodRemarks}
//               onChange={e => setForm(f => ({ ...f, hodRemarks: e.target.value }))}
//             />
//           </div>

//           <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
//             <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
//             <Button onClick={() => setStep(3)}>Next: TL4 →</Button>
//           </div>
//         </Card>
//       )}

//       {/* ── STEP 3: TL4 */}
//       {step === 3 && (
//         <Card className="p-6">
//           <div className="text-[16px] font-bold text-violet-700 dark:text-violet-400 mb-1">📙 TL4 – Outcome as Faculty</div>
//           <p className="text-[12px] text-slate-400 mb-5">Based on student performance in handled courses</p>

//           <div className="overflow-x-auto mb-5">
//             <table className="w-full text-[13px]">
//               <thead>
//                 <tr className="bg-slate-50 dark:bg-slate-800/60">
//                   {['Course', 'Students', 'Passed', 'Result %', 'Score /10'].map(h => (
//                     <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {form.courses.map(c => (
//                   <tr key={c.course} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
//                     <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{c.course}</td>
//                     <td className="px-4 py-3 text-slate-500">{c.students}</td>
//                     <td className="px-4 py-3 text-slate-500">{c.passed}</td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <div className="score-bar w-14"><div className="score-fill" style={{ width: `${c.result}%`, background: 'linear-gradient(90deg,#7c3aed,#2563eb)' }} /></div>
//                         <span className="font-semibold">{c.result}%</span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 font-black text-[15px] text-violet-600 dark:text-violet-400">
//                       {(c.result / 10).toFixed(1)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex flex-wrap gap-5 items-start">
//             <div className="bg-violet-50 dark:bg-violet-900/20 px-5 py-3 rounded-xl">
//               <p className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider mb-1">Auto TL4</p>
//               <div className="text-[28px] font-black text-violet-600 dark:text-violet-400">
//                 {tl4Base}<span className="text-[12px] font-normal text-slate-400 ml-1">/100</span>
//               </div>
//             </div>
//             <div className="flex-1 min-w-[180px]">
//               <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">HoD Final Adjustment <span className="normal-case font-normal text-slate-400">(optional)</span></label>
//               <input
//                 type="number" min={0} max={100}
//                 placeholder={`Default: ${tl4Base}`}
//                 value={form.finalAdjust ?? ''}
//                 onChange={e => setForm(f => ({ ...f, finalAdjust: e.target.value ? +e.target.value : null }))}
//                 className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200"
//               />
//             </div>
//           </div>

//           <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-5 flex items-center justify-between">
//             <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
//             <Button onClick={() => setStep(4)}>Summary →</Button>
//           </div>
//         </Card>
//       )}

//       {/* ── STEP 4: Summary */}
//       {step === 4 && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           {/* Score breakdown */}
//           <Card className="p-6">
//             <h3 className="font-bold text-[15px] text-slate-800 dark:text-white mb-5">Evaluation Breakdown</h3>
//             {[
//               { label: 'TL1 (Auto – Submissions)',  score: faculty.tl1, color: '#2563eb' },
//               { label: 'TL2 (Faculty Progression)', score: tl2Total,    color: '#16a34a' },
//               { label: 'TL3 (HoD Observation)',     score: tl3Final,    color: '#d97706' },
//               { label: 'TL4 (Student Outcomes)',    score: tl4Final,    color: '#7c3aed' },
//             ].map(row => (
//               <div key={row.label} className="mb-4">
//                 <div className="flex justify-between mb-1.5">
//                   <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">{row.label}</span>
//                   <span className="text-[14px] font-black" style={{ color: row.color }}>{row.score}</span>
//                 </div>
//                 <div className="score-bar">
//                   <div className="score-fill" style={{ width: `${row.score}%`, background: row.color }} />
//                 </div>
//               </div>
//             ))}

//             <div className="mt-5 border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3">
//               <span className="font-semibold text-blue-700 dark:text-blue-300">Total Score</span>
//               <div className="text-[26px] font-black text-blue-600 dark:text-blue-400">
//                 {total}<span className="text-[13px] font-normal text-slate-400 ml-1">/100</span>
//               </div>
//             </div>

//             {form.hodRemarks && (
//               <div className="mt-4">
//                 <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">HoD Remarks</p>
//                 <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
//                   {form.hodRemarks}
//                 </div>
//               </div>
//             )}
//           </Card>

//           {/* Gradient summary card + actions */}
//           <div className="space-y-5">
//             <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
//               <p className="text-[13px] font-semibold opacity-80 mb-2">Final Evaluation Card</p>
//               <p className="text-[22px] font-black mb-5">{faculty.name}</p>
//               {[['TL1', faculty.tl1], ['TL2', tl2Total], ['TL3', tl3Final], ['TL4', tl4Final]].map(([l, v]) => (
//                 <div key={l} className="flex justify-between py-2 border-b border-white/20 last:border-0">
//                   <span className="text-[13px] opacity-80">{l}</span>
//                   <span className="text-[18px] font-bold">{v}</span>
//                 </div>
//               ))}
//               <div className="mt-4 pt-4 border-t-2 border-white/30 text-center text-[26px] font-black">
//                 Total: {total} / 100
//               </div>
//             </div>

//             <Card className="p-5 space-y-3">
//               <Button variant="outline" size="lg" className="w-full justify-center" onClick={() => handleSave(false)}>
//                 💾 Save as Draft
//               </Button>
//               <Button variant="success" size="lg" className="w-full justify-center" onClick={() => handleSave(true)}>
//                 ✓ Submit Evaluation
//               </Button>
//               <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => setStep(3)}>
//                 ← Revise
//               </Button>
//             </Card>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, PenLine, Loader2, Eye } from 'lucide-react'
import { useStore } from '../../context/useStore'
import { calcTL2Total } from '../../utils/HODhelpers'
import Card from '../../components/HOD/Card'
import Button from '../../components/HOD/Button'
import Avatar from '../../components/HOD/Avatar'
import StatusBadge from '../../components/HOD/StatusBadge'
import PDFModal from '../../components/common/PDFModal';

const API = '/api/submissions'   // ← adjust to your base URL if needed

const BASE_URL = 'http://localhost:5000/api/submission';
/* ── Helpers ───────────────────────────────────────────── */

function SAPModal({ faculty, onClose }) {
  const raw = faculty._raw

  // ── Design tokens matching your dark app ──
  const C = {
    bg:         '#0f172a',   // page bg
    surface:    '#1e293b',   // card bg
    surfaceAlt: '#162032',   // alternate row
    border:     '#2d3f55',   // table borders
    text:       '#e2e8f0',   // primary text
    textMuted:  '#94a3b8',   // muted text
    textEmpty:  '#475569',   // empty state
    tlAccent:   '#3b82f6',   // blue — Teaching Learning
    rAccent:    '#8b5cf6',   // purple — Research
    sdAccent:   '#10b981',   // green — Self Dev
    cumAccent:  '#f59e0b',   // amber — Cumulative
    subBg:      '#1a2d45',   // subsection header bg
    headerGrad: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
  }

  // ── Reusable table header cell ──
  const Th = ({ children, w }) => (
    <th style={{
      background: '#1a2d45',
      color: '#93c5fd',
      padding: '8px 12px',
      fontSize: 10.5,
      fontWeight: 700,
      textAlign: 'left',
      borderBottom: `2px solid ${C.border}`,
      borderRight: `1px solid ${C.border}`,
      whiteSpace: 'nowrap',
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      width: w,
    }}>
      {children}
    </th>
  )

  // ── Reusable table data cell ──
  const Td = ({ children, bold, center, mono }) => (
    <td style={{
      padding: '7px 12px',
      fontSize: 12,
      borderBottom: `1px solid ${C.border}`,
      borderRight: `1px solid ${C.border}`,
      color: bold ? C.text : C.textMuted,
      fontWeight: bold ? 700 : 400,
      verticalAlign: 'top',
      textAlign: center ? 'center' : 'left',
      fontFamily: mono ? 'monospace' : 'inherit',
    }}>
      {children ?? '—'}
    </td>
  )

  // ── Empty row ──
  const EmptyRow = ({ cols }) => (
    <tr>
      <td colSpan={cols} style={{
        padding: '14px 16px',
        fontSize: 12,
        color: C.textEmpty,
        fontStyle: 'italic',
        textAlign: 'center',
        borderBottom: `1px solid ${C.border}`,
        background: C.surfaceAlt,
      }}>
        No entries submitted
      </td>
    </tr>
  )

  // ── Major section divider (TL / Research / Self Dev) ──
  const MajorSection = ({ label, accent, icon }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '28px 0 16px',
      paddingBottom: 10,
      borderBottom: `2px solid ${accent}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: accent + '22',
        border: `1.5px solid ${accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 15, fontWeight: 800, color: accent, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )

  // ── Sub-section label ──
  const SubSection = ({ label, accent }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '18px 0 8px',
    }}>
      <div style={{ width: 3, height: 16, borderRadius: 2, background: accent, flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: 0.3 }}>
        {label}
      </span>
    </div>
  )

  // ── Table wrapper ──
  const DataTable = ({ headers, children }) => (
    <div style={{ overflowX: 'auto', borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: C.surface, minWidth: 400 }}>
        <thead>
          <tr>{headers.map((h, i) => <Th key={i}>{h}</Th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )

  // ── Alternating row style ──
  const rowStyle = (i) => ({ background: i % 2 === 0 ? C.surface : C.surfaceAlt })

  // ── Marks row ──
  const MarksRow = ({ fMarks = '—', hMarks = '—' }) => (
    <div style={{
      display: 'flex',
      gap: 10,
      margin: '6px 0 0',
      padding: '8px 14px',
      background: '#1a2d45',
      borderRadius: 6,
      border: `1px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 11, color: C.textMuted }}>
        Marks by Faculty: <strong style={{ color: C.text }}>{fMarks}</strong>
      </span>
      <span style={{ color: C.border, fontSize: 11 }}>|</span>
      <span style={{ fontSize: 11, color: C.textMuted }}>
        Marks verified by HoD: <strong style={{ color: '#93c5fd' }}>{hMarks}</strong>
      </span>
    </div>
  )

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 999, backdropFilter: 'blur(4px)' }}
      />

      {/* Modal shell */}
      <div style={{
        position: 'fixed', inset: '12px', zIndex: 1000,
        background: C.bg,
        borderRadius: 14,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
      }}>

        {/* ── Header ── */}
        <div style={{
          background: C.headerGrad,
          padding: '18px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
          borderBottom: `1px solid #2563eb`,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#93c5fd', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
              Self Assessment Proforma
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>
              {faculty.name}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
              {[
                { label: 'Email', val: faculty.email },
                { label: 'Dept', val: faculty.dept },
                { label: 'TL1 Score', val: faculty.tl1 },
                { label: 'Status', val: faculty.evalStatus },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 10.5, color: '#93c5fd', fontWeight: 600 }}>{label}:</span>
                  <span style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, color: '#fff',
              width: 36, height: 36, cursor: 'pointer',
              fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px 28px', background: C.bg }}>

          {/* ════════════════════════════════════ */}
          {/* TEACHING LEARNING                    */}
          {/* ════════════════════════════════════ */}
          <MajorSection label="Teaching Learning" accent={C.tlAccent} icon="📘" />

          <SubSection label="TL.1.1 — Live Projects (Efforts for Students' Involvement as Mentor)" accent={C.tlAccent} />
          <DataTable headers={['No. of Projects', 'Project Titles', 'Prize-Winning Count', 'Event Name']}>
            <tr style={rowStyle(0)}>
              <Td bold>{raw.tl1?.liveProjectCount}</Td>
              <Td>{raw.tl1?.liveProjectTitles}</Td>
              <Td center>{raw.tl1?.liveProjectPrizeCount}</Td>
              <Td>{raw.tl1?.liveProjectEvent}</Td>
            </tr>
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.2 — Case Study Published in Newspaper/Magazine" accent={C.tlAccent} />
          <DataTable headers={['Title', 'Publication / Date', 'Students Involved']}>
            <tr style={rowStyle(0)}>
              <Td bold>{raw.tl1?.caseStudyTitle}</Td>
              <Td>{raw.tl1?.caseStudyPublication}</Td>
              <Td>{raw.tl1?.caseStudyStudents}</Td>
            </tr>
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.3 — Articles Published in Newspaper/Magazine" accent={C.tlAccent} />
          <DataTable headers={['Title', 'Publication / Date', 'Students Involved']}>
            <tr style={rowStyle(0)}>
              <Td bold>{raw.tl1?.articleTitle}</Td>
              <Td>{raw.tl1?.articlePublication}</Td>
              <Td>{raw.tl1?.articleStudents}</Td>
            </tr>
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.4 — Student Research Papers" accent={C.tlAccent} />
          <DataTable headers={['#', 'Title', 'Students', 'Journal (ISSN)', 'Indexing', 'Date']}>
            {raw.tl1?.studentPapers?.length > 0
              ? raw.tl1.studentPapers.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td><Td>{p.students}</Td>
                  <Td>{p.journal}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#1e3a5f', color: '#93c5fd', fontSize: 10.5, fontWeight: 700 }}>{p.indexing || '—'}</span></Td>
                  <Td>{p.date}</Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.5 — Student Internships" accent={C.tlAccent} />
          <DataTable headers={['#', 'Student Name', 'Company', 'Start Date', 'End Date']}>
            {raw.tl1?.internships?.length > 0
              ? raw.tl1.internships.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.studentName}</Td><Td>{p.company}</Td>
                  <Td>{p.startDate}</Td><Td>{p.endDate}</Td>
                </tr>
              ))
              : <EmptyRow cols={5} />}
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.6 — Student Patents" accent={C.tlAccent} />
          <DataTable headers={['#', 'Title', 'Patent No.', 'Date', 'Status', 'No. of Students']}>
            {raw.tl1?.studentPatents?.length > 0
              ? raw.tl1.studentPatents.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td><Td mono>{p.patentNo}</Td>
                  <Td>{p.dateOfPublication}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#2d1b69', color: '#c4b5fd', fontSize: 10.5, fontWeight: 700 }}>{p.status || '—'}</span></Td>
                  <Td center>{p.studentCount}</Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="TL.1.7 — Student Certificate Programs" accent={C.tlAccent} />
          <DataTable headers={['No. of Students', 'Program Title', 'Agency', 'Certifications Received']}>
            <tr style={rowStyle(0)}>
              <Td center bold>{raw.tl1?.certStudentCount}</Td>
              <Td>{raw.tl1?.certProgramTitle}</Td>
              <Td>{raw.tl1?.certAgency}</Td>
              <Td center>{raw.tl1?.certReceivedCount}</Td>
            </tr>
          </DataTable>
          <MarksRow />

          {/* ════════════════════════════════════ */}
          {/* RESEARCH                             */}
          {/* ════════════════════════════════════ */}
          <MajorSection label="Research" accent={C.rAccent} icon="🔬" />

          <SubSection label="R.1 — Journal Papers" accent={C.rAccent} />
          <DataTable headers={['#', 'Title', 'Journal', 'ISSN', 'Year', 'Indexing', 'Authorship', 'Vol/Issue']}>
            {raw.r1JournalPapers?.length > 0
              ? raw.r1JournalPapers.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td><Td>{p.journalName}</Td>
                  <Td mono>{p.issnNumber}</Td><Td center>{p.yearOfPublication}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#1e1b4b', color: '#a5b4fc', fontSize: 10.5, fontWeight: 700 }}>{p.indexing || '—'}</span></Td>
                  <Td center>{p.authorshipPosition}</Td><Td>{p.volumeIssue}</Td>
                </tr>
              ))
              : <EmptyRow cols={8} />}
          </DataTable>
          <MarksRow />

          <SubSection label="R.2 — Books" accent={C.rAccent} />
          <DataTable headers={['#', 'Title', 'ISBN', 'Year', 'Publisher', 'Indexing', 'Authorship']}>
            {raw.r2Books?.books?.length > 0
              ? raw.r2Books.books.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td><Td mono>{p.isbnNumber}</Td>
                  <Td center>{p.yearOfPublication}</Td><Td>{p.publisher}</Td>
                  <Td>{p.indexing}</Td><Td center>{p.authorshipPosition}</Td>
                </tr>
              ))
              : <EmptyRow cols={7} />}
          </DataTable>

          <SubSection label="R.2 — Book Chapters" accent={C.rAccent} />
          <DataTable headers={['#', 'Chapter Title', 'Book Title', 'ISBN', 'Publisher', 'Authorship']}>
            {raw.r2Books?.bookChapters?.length > 0
              ? raw.r2Books.bookChapters.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.chapterTitle}</Td><Td>{p.bookTitle}</Td>
                  <Td mono>{p.isbnNumber}</Td><Td>{p.publisherName}</Td><Td center>{p.authorshipPosition}</Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="R.3 — Conference Papers" accent={C.rAccent} />
          <DataTable headers={['#', 'Paper Title', 'Conference', 'ISBN/Date', 'Indexing', 'Publisher', 'Authorship']}>
            {raw.r3ConferencePapers?.length > 0
              ? raw.r3ConferencePapers.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.paperTitle}</Td><Td>{p.conferenceTitle}</Td>
                  <Td>{p.isbnNumberDate}</Td><Td>{p.indexing}</Td><Td>{p.publisher}</Td><Td center>{p.authorshipPosition}</Td>
                </tr>
              ))
              : <EmptyRow cols={7} />}
          </DataTable>
          <MarksRow />

          <SubSection label="R.4 — External / Industry Projects" accent={C.rAccent} />
          <DataTable headers={['#', 'Project Title', 'Agency / Industry', 'Amount (₹)', 'Role', 'Status']}>
            {[...(raw.r4Projects?.externalProjects ?? []), ...(raw.r4Projects?.industryProjects ?? [])].length > 0
              ? [...(raw.r4Projects?.externalProjects ?? []), ...(raw.r4Projects?.industryProjects ?? [])].map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.projectTitle}</Td>
                  <Td>{p.agency || p.industry}</Td><Td>{p.amount}</Td>
                  <Td center>{p.role}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#1a2d1a', color: '#86efac', fontSize: 10.5, fontWeight: 700 }}>{p.status || '—'}</span></Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="R.6 — Patents" accent={C.rAccent} />
          <DataTable headers={['#', 'Title', 'Patent No.', 'Date', 'Status', 'Office', 'Authorship']}>
            {raw.r6Patents?.patents?.length > 0
              ? raw.r6Patents.patents.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.patentTitle}</Td><Td mono>{p.patentNo}</Td>
                  <Td>{p.dateOfPublication}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#2d1b69', color: '#c4b5fd', fontSize: 10.5, fontWeight: 700 }}>{p.status || '—'}</span></Td>
                  <Td>{p.patentOffice}</Td><Td center>{p.authorshipPosition}</Td>
                </tr>
              ))
              : <EmptyRow cols={7} />}
          </DataTable>
          <MarksRow />

          {/* ════════════════════════════════════ */}
          {/* SELF DEVELOPMENT                     */}
          {/* ════════════════════════════════════ */}
          <MajorSection label="Self Development" accent={C.sdAccent} icon="🌱" />

          <SubSection label="SD.1 — Faculty Development Programs (FDP)" accent={C.sdAccent} />
          <DataTable headers={['#', 'Title', 'Organizing Institute', 'No. of Days', 'Dates']}>
            {raw.sd1FDP?.length > 0
              ? raw.sd1FDP.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td>
                  <Td>{p.organizingInstitute}</Td><Td center>{p.numberOfDays}</Td><Td>{p.dates}</Td>
                </tr>
              ))
              : <EmptyRow cols={5} />}
          </DataTable>
          <MarksRow />

          <SubSection label="SD.2 — Workshops / Short-Term Courses" accent={C.sdAccent} />
          <DataTable headers={['#', 'Title', 'Organizing Institute', 'No. of Weeks', 'Dates']}>
            {raw.sd2Workshop?.length > 0
              ? raw.sd2Workshop.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td>
                  <Td>{p.organizingInstitute}</Td><Td center>{p.numberOfWeeks}</Td><Td>{p.dates}</Td>
                </tr>
              ))
              : <EmptyRow cols={5} />}
          </DataTable>
          <MarksRow />

          <SubSection label="SD.3 — Refresher / Orientation Courses" accent={C.sdAccent} />
          <DataTable headers={['#', 'Title', 'Organizing Institute', 'No. of Weeks', 'Dates']}>
            {raw.sd3Refresher?.length > 0
              ? raw.sd3Refresher.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td>
                  <Td>{p.organizingInstitute}</Td><Td center>{p.numberOfWeeks}</Td><Td>{p.dates}</Td>
                </tr>
              ))
              : <EmptyRow cols={5} />}
          </DataTable>
          <MarksRow />

          <SubSection label="SD.4 — MOOCs / EDX / Udemy" accent={C.sdAccent} />
          <DataTable headers={['#', 'Title', 'Provider', 'Duration', 'Start Date', 'Completion Date']}>
            {raw.sd4MOOCs?.length > 0
              ? raw.sd4MOOCs.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.title}</Td><Td>{p.provider}</Td>
                  <Td center>{p.duration}</Td><Td>{p.startDate}</Td><Td>{p.completionDate}</Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="SD.5 — Ph.D Supervisor / Co-Supervisor" accent={C.sdAccent} />
          <DataTable headers={['#', 'Candidate Name', 'BFGI Faculty?', 'University', 'Enrollment No.', 'Status']}>
            {raw.sd5PhD?.phdCandidates?.length > 0
              ? raw.sd5PhD.phdCandidates.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.candidateName}</Td>
                  <Td center>{p.isBFGI}</Td><Td>{p.university}</Td>
                  <Td mono>{p.enrollmentNo}</Td><Td>{p.status}</Td>
                </tr>
              ))
              : <EmptyRow cols={6} />}
          </DataTable>
          <MarksRow />

          <SubSection label="SD.6 — Awards for Research / Academic Achievement" accent={C.sdAccent} />
          <DataTable headers={['#', 'Award Title', 'Organization', 'Scope', 'Date of Award']}>
            {raw.sd6Awards?.length > 0
              ? raw.sd6Awards.map((p, i) => (
                <tr key={i} style={rowStyle(i)}>
                  <Td center>{i + 1}</Td><Td bold>{p.awardTitle}</Td>
                  <Td>{p.organizationName}</Td>
                  <Td><span style={{ padding: '2px 8px', borderRadius: 20, background: '#1a2030', color: '#fbbf24', fontSize: 10.5, fontWeight: 700 }}>{p.scope || '—'}</span></Td>
                  <Td>{p.dateOfAward}</Td>
                </tr>
              ))
              : <EmptyRow cols={5} />}
          </DataTable>
          <MarksRow />

          {/* ════════════════════════════════════ */}
          {/* CUMULATIVE SHEET                     */}
          {/* ════════════════════════════════════ */}
          <MajorSection label="Cumulative Sheet" accent={C.cumAccent} icon="📊" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Teaching Learning', max: 110, score: raw.hodEvaluation?.totalScore, accent: C.tlAccent },
              { label: 'Research',          max: 125, score: null,                          accent: C.rAccent  },
              { label: 'Self Development',  max: 65,  score: null,                          accent: C.sdAccent },
            ].map(({ label, max, score, accent }) => (
              <div key={label} style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '14px 16px',
                borderTop: `3px solid ${accent}`,
              }}>
                <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 6 }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: accent }}>{score ?? '—'}</span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>/ {max}</span>
                </div>
                <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: C.border }}>
                  {score != null && (
                    <div style={{ height: '100%', borderRadius: 2, background: accent, width: `${Math.min((score / max) * 100, 100)}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: C.surface, border: `1px solid ${C.cumAccent}44`,
            borderRadius: 10, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 2 }}>TOTAL MARKS</div>
              <div style={{ fontSize: 11, color: C.textEmpty }}>Teaching Learning (110) + Research (125) + Self Development (65)</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: C.cumAccent }}>{faculty.tl1}</span>
              <span style={{ fontSize: 14, color: C.textMuted, marginLeft: 4 }}>/ 300</span>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '12px 28px',
          borderTop: `1px solid ${C.border}`,
          background: C.surface,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 11, color: C.textMuted }}>
            Academic Year: <strong style={{ color: C.text }}>{raw.academicYear || '—'}</strong>
            &nbsp;·&nbsp; Status: <strong style={{ color: C.text }}>{raw.status}</strong>
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={onClose}
              style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 600, color: C.textMuted }}
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: C.tlAccent, color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
            >
              🖨 Print
            </button>
          </div>
        </div>
      </div>
    </>
  )
}



/** Convert a universityResult row → { course, students, passed, result } */
function mapResultRow(row) {
  const students = Number(row.totalStudents) || 0
  const passed = Number(row.studentsCleared) || 0
  const result = students > 0 ? parseFloat(((passed / students) * 100).toFixed(1)) : 0
  return { course: row.courseName || 'Course', students, passed, result }
}

/** Derive a 0-100 TL4 score from courses */
function calcTL4Base(courses) {
  if (!courses.length) return 0
  const avg = courses.reduce((s, c) => s + c.result, 0) / courses.length
  return Math.round(avg)
}

/** Map a raw DB submission → faculty row for the selector table */
function submissionToFaculty(sub) {
  // TL1 score: stored as tl1Score field OR derive from submissions data
  // We'll use sub.tl1Score if present; otherwise default to 0
  const tl1 = sub.tl1Score ?? 0

  // eval status
  const evalStatus =
    sub.status === 'hod_approved' ? 'complete' :
      sub.status === 'submitted' ? 'pending' :
        sub.status === 'draft' ? 'draft' :
          sub.status === 'rejected' ? 'pending' : 'pending'

  // courses from universityResult
  const courses = (sub.tl4?.universityResult ?? []).map(mapResultRow)

  return {
    id: sub._id,
    email: sub.facultyEmail,
    name: sub.facultyName,
    dept: sub.department ?? 'CS',
    avatar: sub.facultyName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    tl1,
    evalStatus,
    courses,
    // carry full submission for reference
    _raw: sub,
  }
}

/* ── Shared primitives ─────────────────────────────────── */
function SliderRow({ label, field, value, onChange }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{label}</label>
        <span className="text-[12px] text-slate-400">{value} / 10</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range" min={0} max={10} step={1}
          value={value}
          onChange={e => onChange(field, +e.target.value)}
          className="flex-1"
        />
        <span className="w-10 text-center text-[18px] font-black text-blue-600 dark:text-blue-400">{value}</span>
      </div>
      <div className="score-bar mt-1.5">
        <div className="score-fill" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  )
}

function StepBar({ current }) {
  const steps = ['TL1 – Effort', 'TL2 – Progression', 'TL3 – Observation', 'TL4 – Outcome', 'Summary']
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
      {steps.map((s, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={s} className={[
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-[12px] font-semibold transition-all',
            active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : done ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400',
          ].join(' ')}>
            <span className={[
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0',
              active ? 'bg-white text-blue-600'
                : done ? 'bg-emerald-500 text-white'
                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500',
            ].join(' ')}>
              {done ? '✓' : idx}
            </span>
            <span className="hidden sm:inline">{s}</span>
          </div>
        )
      })}
    </div>
  )
}



/* ── Faculty Selection Table ───────────────────────────── */
function FacultySelector({ onSelect, onView  }) {
  // const [facultyList, setFacultyList] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const [viewingFaculty, setViewingFaculty] = useState(null)
  const [facultyList, setFacultyList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/all`)
      .then(r => {
        if (!r.ok) throw new Error(`Server error ${r.status}`)
        return r.json()
      })
      .then(data => {
        setFacultyList(data.map(submissionToFaculty))
        console.log('Loaded faculty submissions:', data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-48 gap-3 text-slate-400">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-[14px]">Loading faculty submissions…</span>
    </div>
  )

  if (error) return (
    <div className="p-6 text-center text-red-500 text-[14px]">
      Failed to load faculty: {error}
    </div>
  )


  // In the step === 0 return:
  // if (step === 0) return (
  //   <>
  //     <FacultySelector onSelect={handleSelect} onView={setViewingFaculty} />
  //     {viewingFaculty && (
  //       <SAPModal faculty={viewingFaculty} onClose={() => setViewingFaculty(null)} />
  //     )}
  //   </>
  // )

  return (
    <div className="page-enter space-y-4">
      <div>
        <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Select Faculty to Evaluate</h2>
        <p className="text-[13px] text-slate-400 mt-1">Choose a faculty member to begin the TL2–TL4 evaluation process.</p>
      </div>
      <Card>
        {facultyList.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-[14px]">
            No submissions found in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  {['Faculty', 'Dept.', 'TL1 Score', 'Evaluation Status', 'Action'].map(h => (
                    <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facultyList.map((f, i) => (
                  <tr key={f.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={f.name} initials={f.avatar} size={30} index={i} />
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{f.name}</span>
                          <span className="text-[11px] text-slate-400">{f.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded">{f.dept}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="score-bar w-16"><div className="score-fill" style={{ width: `${f.tl1}%` }} /></div>
                        <span className="font-bold text-[14px] text-blue-600 dark:text-blue-400">{f.tl1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={f.evalStatus} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => onView(f)}>
                          <Eye size={12} /> View
                        </Button>
                        <Button size="sm" onClick={() => onSelect(f)}>
                          <PenLine size={12} />
                          {f.evalStatus === 'complete' ? 'Re-Evaluate' : 'Start'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ── Main Evaluation Wizard ────────────────────────────── */
const makeInitForm = (courses = []) => ({
  teaching: 7, subject: 8, communication: 7, engagement: 8,
  behavior: 7, hodRemarks: '',
  courses,          // ← real courses from DB
  finalAdjust: null,
})

export default function Evaluation() {
  const { saveEvaluation } = useStore()
  const navigate = useNavigate()

  const [faculty, setFaculty] = useState(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(makeInitForm())
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false); // ← modal state

  const [viewingFaculty, setViewingFaculty] = useState(null)  // ← ADD THIS

  const tl2Total = calcTL2Total(form)
  const tl4Base = calcTL4Base(form.courses)
  const tl4Final = form.finalAdjust ?? tl4Base
  const tl3Final = form.behavior * 10

  const setSlider = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSelect = (f) => {
    setFaculty(f)
    setForm(makeInitForm(f.courses))   // ← seed with real courses
    setStep(1)
  }

  const handleBack = () => {
    if (step <= 1) { setStep(0); setFaculty(null) }
    else setStep(s => s - 1)
  }

  const handleSave = async (isSubmit) => {
    setSaving(true)

    // ADD THIS — check console to see exact URL being called
    console.log('Saving to:', `/api/submissions`)
    console.log('Payload:', {
      facultyEmail: faculty.email,
      academicYear: faculty._raw.academicYear,
    })

    try {
      const saveRes = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facultyEmail: faculty.email,
          facultyName: faculty.name,
          academicYear: faculty._raw.academicYear,
          hodEvaluation: {
            tl2Total,
            tl2Breakdown: {
              teaching: form.teaching,
              subject: form.subject,
              communication: form.communication,
              engagement: form.engagement,
            },
            tl3Score: form.behavior,
            tl3Remarks: form.hodRemarks,
            tl4Score: tl4Final,
            totalScore: Math.round((faculty.tl1 + tl2Total + tl3Final + tl4Final) / 4),
            evaluatedAt: new Date().toISOString(),
          },
        }),
      })

      // ADD THIS — see what the server actually returns
      const rawText = await saveRes.text()
      console.log('Server response:', rawText)

      if (!saveRes.ok) throw new Error(`Server returned ${saveRes.status}`)

      const data = JSON.parse(rawText)
      console.log('Saved:', data)

      if (isSubmit) {
        await fetch(`/api/submissions/${encodeURIComponent(faculty.email)}/submit`, {
          method: 'PATCH',
        })
      }

    } catch (err) {
      console.error('Save failed:', err)
      alert(`Failed to save: ${err.message}`)
    } finally {
      setSaving(false)
      setStep(0)
      setFaculty(null)
    }
  }

  /* ── Step 0: Faculty list */
  // if (step === 0) return <FacultySelector onSelect={handleSelect} />
  if (step === 0) return (
    <>
      <FacultySelector
        onSelect={handleSelect}
        onView={setViewingFaculty}  
      />
      {viewingFaculty && (
        <SAPModal
          faculty={viewingFaculty}
          onClose={() => setViewingFaculty(null)}
        />
      )}
    </>
  )

  const total = Math.round((faculty.tl1 + tl2Total + tl3Final + tl4Final) / 4)


  /* ── TL1 Read-only helpers ─────────────────────────────── */
  function Section({ title, children }) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{title}</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    )
  }

  function Row({ label, value }) {
    if (!value) return null   // hide empty fields
    return (
      <div className="flex gap-3 py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
        <span className="text-[12px] text-slate-400 w-44 flex-shrink-0">{label}</span>
        <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">{value}</span>
      </div>
    )
  }

  function FileRow({ label, value }) {
    if (!value?.fileName) return null
    return (
      <div className="flex gap-3 py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
        <span className="text-[12px] text-slate-400 w-44 flex-shrink-0">{label}</span>
        <span className="text-[12px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
          📎 {value.originalName || value.fileName}
        </span>
      </div>
    )
  }

  function Empty() {
    return (
      <p className="text-[12px] text-slate-400 italic py-2">No entries submitted.</p>
    )
  }



  return (
    <div className="page-enter space-y-4">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ChevronLeft size={13} /> {step === 1 ? 'Faculty List' : 'Back'}
        </Button>
        <Avatar name={faculty.name} initials={faculty.avatar} size={32} />
        <div>
          <p className="font-bold text-slate-800 dark:text-white text-[14px]">{faculty.name}</p>
          <p className="text-[11px] text-slate-400">{faculty.email} · TL1: {faculty.tl1}</p>
        </div>
      </div>

      <StepBar current={step} />

      {/* 
      {step === 1 && (
        <Card className="p-6 max-w-2xl">
          <div className="text-[16px] font-bold text-blue-700 dark:text-blue-400 mb-1">📘 TL1 – EFFORTS FOR STUDENTS' INVOLVEMENT AS MENTOR</div>
          <p className="text-[12px] text-slate-400 mb-6">There is data available for this faculty member.</p>

          <SliderRow label="Teaching Skills" field="teaching" value={form.teaching} onChange={setSlider} />
          <SliderRow label="Subject Knowledge" field="subject" value={form.subject} onChange={setSlider} />
          <SliderRow label="Communication Skills" field="communication" value={form.communication} onChange={setSlider} />
          <SliderRow label="Student Engagement" field="engagement" value={form.engagement} onChange={setSlider} />

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl">
              <span className="text-[12px] text-slate-500">TL2 Total: </span>
              <span className="text-[22px] font-black text-blue-600 dark:text-blue-400">{tl2Total}</span>
              <span className="text-[12px] text-slate-400">/100</span>
            </div>
            <Button onClick={() => setStep(2)}>Next: TL3 →</Button>
          </div>
        </Card>
      )} */}
      {step === 1 && (
        <div className="space-y-4 max-w-5xl">
          <Card className="p-6">
            <div className="text-[16px] font-bold text-blue-700 dark:text-blue-400 mb-1">
              📘 TL1 – Efforts for Students' Involvement as Mentor
            </div>
            <p className="text-[12px] text-slate-400 mb-6">
              Read-only view of faculty's TL1 submission data.
            </p>

            {/* ── TL1.1 Live Projects ── */}
            <Section title="TL1.1 – Live Projects">
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60">
                      {['No. of Projects', 'Project Titles', 'Event Name', 'Prize-Winning', 'Proof'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.liveProjectCount || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.liveProjectTitles || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.liveProjectEvent || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.liveProjectPrizeCount || '—'}</td>
                      <td className="px-4 py-2.5">
                        {faculty._raw.tl1?.liveProjectProof?.fileName ? (
                          // <button
                          //   onClick={() => window.open(faculty._raw.tl1?.filePath, '_blank', 'noopener,noreferrer')}
                          //   className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          // >
                          //   👁 See
                          // </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                            title="View PDF"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
                            <Eye size={15} />
                          </button>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>

                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ── TL1.2 Case Study ── */}
            <Section title="TL1.2 – Case Study">
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60">
                      {['Title', 'Publication', 'Students', 'Proof'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.caseStudyTitle || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.caseStudyPublication || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.caseStudyStudents || '—'}</td>
                      <td className="px-4 py-2.5">
                        {faculty._raw.tl1?.caseStudyProof?.fileName ? (
                          // <button onClick={() => setViewingProof(faculty._raw.tl1.caseStudyProof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          //   👁 See
                          // </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                            title="View PDF"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
                            <Eye size={15} />
                          </button>
                        ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* PDF Modal */}
            {showModal && (
              <PDFModal
                url={faculty._raw.tl1?.filePath}
                fileName={faculty._raw.tl1?.fileOriginalName || faculty._raw.tl1?.fileName}
                onClose={() => setShowModal(false)}
              />
            )}

            {/* ── TL1.3 Articles ── */}
            <Section title="TL1.3 – Articles / Blog Posts">
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60">
                      {['Title', 'Publication', 'Students', 'Proof'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.articleTitle || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.articlePublication || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.articleStudents || '—'}</td>
                      <td className="px-4 py-2.5">
                        {faculty._raw.tl1?.articleProof?.fileName ? (
                          <button onClick={() => setViewingProof(faculty._raw.tl1.articleProof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            👁 See
                          </button>
                        ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ── TL1.4 Student Papers ── */}
            <Section title="TL1.4 – Student Research Papers">
              {faculty._raw.tl1?.studentPapers?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60">
                        {['#', 'Title', 'Students', 'Journal', 'Date', 'Indexing', 'Proof'].map(h => (
                          <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {faculty._raw.tl1.studentPapers.map((p, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-4 py-2.5 text-slate-400">{i + 1}</td>
                          <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">{p.title || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{p.students || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{p.journal || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{p.date || '—'}</td>
                          <td className="px-4 py-2.5">
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-semibold rounded">
                              {p.indexing || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            {p.proof?.fileName ? (
                              <button onClick={() => setViewingProof(p.proof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                👁 See
                              </button>
                            ) : <span className="text-slate-300 dark:text-slate-600 text-[11px]">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty />}
            </Section>

            {/* ── TL1.5 Internships ── */}
            <Section title="TL1.5 – Student Internships">
              {faculty._raw.tl1?.internships?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60">
                        {['#', 'Student Name', 'Company', 'Start Date', 'End Date', 'Proof'].map(h => (
                          <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {faculty._raw.tl1.internships.map((intern, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-4 py-2.5 text-slate-400">{i + 1}</td>
                          <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">{intern.studentName || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{intern.company || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{intern.startDate || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{intern.endDate || '—'}</td>
                          <td className="px-4 py-2.5">
                            {intern.proof?.fileName ? (
                              <button onClick={() => setViewingProof(intern.proof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                👁 See
                              </button>
                            ) : <span className="text-slate-300 dark:text-slate-600 text-[11px]">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty />}
            </Section>

            {/* ── TL1.6 Student Patents ── */}
            <Section title="TL1.6 – Student Patents">
              {faculty._raw.tl1?.studentPatents?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60">
                        {['#', 'Title', 'Patent No.', 'Students', 'Date', 'Status', 'Proof'].map(h => (
                          <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {faculty._raw.tl1.studentPatents.map((pat, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-4 py-2.5 text-slate-400">{i + 1}</td>
                          <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">{pat.title || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{pat.patentNo || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{pat.studentCount || '—'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{pat.dateOfPublication || '—'}</td>
                          <td className="px-4 py-2.5">
                            <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-[10px] font-semibold rounded">
                              {pat.status || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            {pat.proof?.fileName ? (
                              <button onClick={() => setViewingProof(pat.proof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                👁 See
                              </button>
                            ) : <span className="text-slate-300 dark:text-slate-600 text-[11px]">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty />}
            </Section>

            {/* ── TL1.7 Certifications ── */}
            <Section title="TL1.7 – Student Certifications">
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60">
                      {['Program Title', 'Certifying Agency', 'Certifications Received', 'No. of Students', 'Proof'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.certProgramTitle || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.certAgency || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.certStudentCount || '—'}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{faculty._raw.tl1?.certReceivedCount || '—'}</td>
                      <td className="px-4 py-2.5">
                        {faculty._raw.tl1?.certProof?.fileName ? (
                          <button onClick={() => setViewingProof(faculty._raw.tl1.certProof)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            👁 See
                          </button>
                        ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ── Navigation ── */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between mt-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl">
                <span className="text-[12px] text-slate-500">TL1 Score: </span>
                <span className="text-[22px] font-black text-blue-600 dark:text-blue-400">{faculty.tl1}</span>
                <span className="text-[12px] text-slate-400">/100</span>
              </div>
              <Button onClick={() => setStep(2)}>Next: TL2 →</Button>
            </div>
          </Card>
        </div>
      )}
      {/* ── STEP 2: TL2 */}
      {step === 2 && (
        <Card className="p-6 max-w-2xl">
          <div className="text-[16px] font-bold text-blue-700 dark:text-blue-400 mb-1">📘 TL2 – Faculty Progression</div>
          <p className="text-[12px] text-slate-400 mb-6">Rate each parameter from 0 to 10</p>

          <SliderRow label="Teaching Skills" field="teaching" value={form.teaching} onChange={setSlider} />
          <SliderRow label="Subject Knowledge" field="subject" value={form.subject} onChange={setSlider} />
          <SliderRow label="Communication Skills" field="communication" value={form.communication} onChange={setSlider} />
          <SliderRow label="Student Engagement" field="engagement" value={form.engagement} onChange={setSlider} />

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl">
              <span className="text-[12px] text-slate-500">TL2 Total: </span>
              <span className="text-[22px] font-black text-blue-600 dark:text-blue-400">{tl2Total}</span>
              <span className="text-[12px] text-slate-400">/100</span>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
            <Button onClick={() => setStep(3)}>Next: TL3 →</Button>
            {/* <Button onClick={() => setStep(4)}>Next: TL4 →</Button> */}
          </div>
        </Card>
      )}

      {/* ── STEP 3: TL3 */}
      {step === 3 && (
        <Card className="p-6 max-w-2xl">
          <div className="text-[16px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">📗 TL3 – HoD Observation</div>
          <p className="text-[12px] text-slate-400 mb-6">Based on your direct observation of this faculty member</p>

          <SliderRow label="Behaviour & Professionalism" field="behavior" value={form.behavior} onChange={setSlider} />

          <div className="mb-5">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Observation Remarks</label>
            <textarea
              className="w-full min-h-30 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y text-slate-700 dark:text-slate-200"
              placeholder="Describe professional conduct, teamwork, departmental contributions…"
              value={form.hodRemarks}
              onChange={e => setForm(f => ({ ...f, hodRemarks: e.target.value }))}
            />
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
            <Button onClick={() => setStep(4)}>Next: TL4 →</Button>
          </div>
        </Card>
      )}

      {/* ── STEP 4: TL4 */}
      {step === 4 && (
        <Card className="p-6">
          <div className="text-[16px] font-bold text-violet-700 dark:text-violet-400 mb-1">📙 TL4 – Outcome as Faculty</div>
          <p className="text-[12px] text-slate-400 mb-5">Based on student performance in handled courses</p>

          {form.courses.length === 0 ? (
            <div className="mb-5 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
              ⚠️ No university result data found in this faculty's submission. TL4 score will default to 0.
            </div>
          ) : (
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60">
                    {['Course', 'Session', 'Students', 'Passed', 'Result %', 'Score /10'].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {form.courses.map((c, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{c.course}</td>
                      <td className="px-4 py-3 text-slate-400 text-[12px]">{c.session ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-500">{c.students}</td>
                      <td className="px-4 py-3 text-slate-500">{c.passed}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="score-bar w-14"><div className="score-fill" style={{ width: `${c.result}%`, background: 'linear-gradient(90deg,#7c3aed,#2563eb)' }} /></div>
                          <span className="font-semibold">{c.result}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-black text-[15px] text-violet-600 dark:text-violet-400">
                        {(c.result / 10).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap gap-5 items-start">
            <div className="bg-violet-50 dark:bg-violet-900/20 px-5 py-3 rounded-xl">
              <p className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider mb-1">Auto TL4</p>
              <div className="text-[28px] font-black text-violet-600 dark:text-violet-400">
                {tl4Base}<span className="text-[12px] font-normal text-slate-400 ml-1">/100</span>
              </div>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">HoD Final Adjustment <span className="normal-case font-normal text-slate-400">(optional)</span></label>
              <input
                type="number" min={0} max={100}
                placeholder={`Default: ${tl4Base}`}
                value={form.finalAdjust ?? ''}
                onChange={e => setForm(f => ({ ...f, finalAdjust: e.target.value ? +e.target.value : null }))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-5 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>← Back</Button>
            <Button onClick={() => setStep(5)}>Summary →</Button>
          </div>
        </Card>
      )}

      {/* ── STEP 5: Summary */}
      {step === 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-6">
            <h3 className="font-bold text-[15px] text-slate-800 dark:text-white mb-5">Evaluation Breakdown</h3>
            {[
              { label: 'TL1 (Auto – Submissions)', score: faculty.tl1, color: '#2563eb' },
              { label: 'TL2 (Faculty Progression)', score: tl2Total, color: '#16a34a' },
              { label: 'TL3 (HoD Observation)', score: tl3Final, color: '#d97706' },
              { label: 'TL4 (Student Outcomes)', score: tl4Final, color: '#7c3aed' },
            ].map(row => (
              <div key={row.label} className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">{row.label}</span>
                  <span className="text-[14px] font-black" style={{ color: row.color }}>{row.score}</span>
                </div>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${row.score}%`, background: row.color }} />
                </div>
              </div>
            ))}

            <div className="mt-5 border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3">
              <span className="font-semibold text-blue-700 dark:text-blue-300">Total Score</span>
              <div className="text-[26px] font-black text-blue-600 dark:text-blue-400">
                {total}<span className="text-[13px] font-normal text-slate-400 ml-1">/100</span>
              </div>
            </div>

            {form.hodRemarks && (
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">HoD Remarks</p>
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {form.hodRemarks}
                </div>
              </div>
            )}
          </Card>

          {/* ── STEP 5: Final Evaluation */}
          <div className="space-y-5">
            <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
              <p className="text-[13px] font-semibold opacity-80 mb-2">Final Evaluation Card</p>
              <p className="text-[22px] font-black mb-5">{faculty.name}</p>
              {[['TL1', faculty.tl1], ['TL2', tl2Total], ['TL3', tl3Final], ['TL4', tl4Final]].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-white/20 last:border-0">
                  <span className="text-[13px] opacity-80">{l}</span>
                  <span className="text-[18px] font-bold">{v}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t-2 border-white/30 text-center text-[26px] font-black">
                Total: {total} / 100
              </div>
            </div>

            <Card className="p-5 space-y-3">
              <Button variant="outline" size="lg" className="w-full justify-center" onClick={() => handleSave(false)} disabled={saving}>
                {saving ? <Loader2 size={14} className="animate-spin mr-1" /> : '💾'} Save as Draft
              </Button>
              <Button variant="success" size="lg" className="w-full justify-center" onClick={() => handleSave(true)} disabled={saving}>
                {saving ? <Loader2 size={14} className="animate-spin mr-1" /> : '✓'} Submit Evaluation
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => setStep(3)}>
                ← Revise
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}