import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, PenLine } from 'lucide-react'
import { useStore } from '../../context/HOD/useStore'
import { MOCK_COURSES } from '../../data/data'
import { calcTL2Total, calcTL4Base } from '../../utils/HOD/helpers'
import Card from '../../components/HOD/Card'
import Button from '../../components/HOD/Button'
import Avatar from '../../components/HOD/Avatar'
import StatusBadge from '../../components/HOD/StatusBadge'

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
  const steps = ['TL2 – Progression', 'TL3 – Observation', 'TL4 – Outcome', 'Summary']
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
      {steps.map((s, i) => {
        const idx  = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={s} className={[
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-[12px] font-semibold transition-all',
            active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : done  ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-400',
          ].join(' ')}>
            <span className={[
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
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
function FacultySelector({ onSelect }) {
  const { faculty } = useStore()

  return (
    <div className="page-enter space-y-4">
      <div>
        <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Select Faculty to Evaluate</h2>
        <p className="text-[13px] text-slate-400 mt-1">Choose a faculty member to begin the TL2–TL4 evaluation process.</p>
      </div>
      <Card>
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
              {faculty.map((f, i) => (
                <tr key={f.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={f.name} initials={f.avatar} size={30} index={i} />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{f.name}</span>
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
                    <Button size="sm" onClick={() => onSelect(f)}>
                      <PenLine size={12} />
                      {f.evalStatus === 'complete' ? 'Re-Evaluate' : 'Start'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

/* ── Main Evaluation Wizard ────────────────────────────── */
const INIT_FORM = {
  teaching: 7, subject: 8, communication: 7, engagement: 8,
  behavior: 7, hodRemarks: '',
  courses: MOCK_COURSES.map(c => ({ ...c })),
  finalAdjust: null,
}

export default function Evaluation() {
  const { saveEvaluation } = useStore()
  const navigate = useNavigate()

  const [faculty,  setFaculty]  = useState(null)
  const [step,     setStep]     = useState(0)
  const [form,     setForm]     = useState(INIT_FORM)

  const tl2Total = calcTL2Total(form)
  const tl4Base  = calcTL4Base(form.courses)
  const tl4Final = form.finalAdjust ?? tl4Base
  const tl3Final = form.behavior * 10

  const setSlider = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSelect = (f) => {
    setFaculty(f)
    setForm(INIT_FORM)
    setStep(1)
  }

  const handleBack = () => {
    if (step <= 1) { setStep(0); setFaculty(null) }
    else setStep(s => s - 1)
  }

  const handleSave = (isSubmit) => {
    saveEvaluation(faculty.id, { tl2Total, tl3Score: form.behavior, tl4Score: tl4Final }, isSubmit)
    setStep(0)
    setFaculty(null)
  }

  /* ── Step 0: Faculty list */
  if (step === 0) return <FacultySelector onSelect={handleSelect} />

  const total = Math.round((faculty.tl1 + tl2Total + tl3Final + tl4Final) / 4)

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
          <p className="text-[11px] text-slate-400">TL1 Score: {faculty.tl1}</p>
        </div>
      </div>

      <StepBar current={step} />

      {/* ── STEP 1: TL2 */}
      {step === 1 && (
        <Card className="p-6 max-w-2xl">
          <div className="text-[16px] font-bold text-blue-700 dark:text-blue-400 mb-1">📘 TL2 – Faculty Progression</div>
          <p className="text-[12px] text-slate-400 mb-6">Rate each parameter from 0 to 10</p>

          <SliderRow label="Teaching Skills"     field="teaching"      value={form.teaching}      onChange={setSlider} />
          <SliderRow label="Subject Knowledge"   field="subject"       value={form.subject}       onChange={setSlider} />
          <SliderRow label="Communication Skills"field="communication" value={form.communication} onChange={setSlider} />
          <SliderRow label="Student Engagement"  field="engagement"    value={form.engagement}    onChange={setSlider} />

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-xl">
              <span className="text-[12px] text-slate-500">TL2 Total: </span>
              <span className="text-[22px] font-black text-blue-600 dark:text-blue-400">{tl2Total}</span>
              <span className="text-[12px] text-slate-400">/100</span>
            </div>
            <Button onClick={() => setStep(2)}>Next: TL3 →</Button>
          </div>
        </Card>
      )}

      {/* ── STEP 2: TL3 */}
      {step === 2 && (
        <Card className="p-6 max-w-2xl">
          <div className="text-[16px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">📗 TL3 – HoD Observation</div>
          <p className="text-[12px] text-slate-400 mb-6">Based on your direct observation of this faculty member</p>

          <SliderRow label="Behaviour & Professionalism" field="behavior" value={form.behavior} onChange={setSlider} />

          <div className="mb-5">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Observation Remarks</label>
            <textarea
              className="w-full min-h-[120px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y text-slate-700 dark:text-slate-200"
              placeholder="Describe professional conduct, teamwork, departmental contributions…"
              value={form.hodRemarks}
              onChange={e => setForm(f => ({ ...f, hodRemarks: e.target.value }))}
            />
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
            <Button onClick={() => setStep(3)}>Next: TL4 →</Button>
          </div>
        </Card>
      )}

      {/* ── STEP 3: TL4 */}
      {step === 3 && (
        <Card className="p-6">
          <div className="text-[16px] font-bold text-violet-700 dark:text-violet-400 mb-1">📙 TL4 – Outcome as Faculty</div>
          <p className="text-[12px] text-slate-400 mb-5">Based on student performance in handled courses</p>

          <div className="overflow-x-auto mb-5">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  {['Course', 'Students', 'Passed', 'Result %', 'Score /10'].map(h => (
                    <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {form.courses.map(c => (
                  <tr key={c.course} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{c.course}</td>
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
            <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
            <Button onClick={() => setStep(4)}>Summary →</Button>
          </div>
        </Card>
      )}

      {/* ── STEP 4: Summary */}
      {step === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Score breakdown */}
          <Card className="p-6">
            <h3 className="font-bold text-[15px] text-slate-800 dark:text-white mb-5">Evaluation Breakdown</h3>
            {[
              { label: 'TL1 (Auto – Submissions)',  score: faculty.tl1, color: '#2563eb' },
              { label: 'TL2 (Faculty Progression)', score: tl2Total,    color: '#16a34a' },
              { label: 'TL3 (HoD Observation)',     score: tl3Final,    color: '#d97706' },
              { label: 'TL4 (Student Outcomes)',    score: tl4Final,    color: '#7c3aed' },
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

          {/* Gradient summary card + actions */}
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
              <Button variant="outline" size="lg" className="w-full justify-center" onClick={() => handleSave(false)}>
                💾 Save as Draft
              </Button>
              <Button variant="success" size="lg" className="w-full justify-center" onClick={() => handleSave(true)}>
                ✓ Submit Evaluation
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
