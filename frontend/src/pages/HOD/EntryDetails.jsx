import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, FileText, Download, Eye, CheckCircle, XCircle, Award, PenLine } from 'lucide-react'
import { useStore } from '../../context/useStore'
import Button from '../../components/HOD/Button'
import ModuleChip from '../../components/HOD/ModuleChip'
import StatusBadge from '../../components/HOD/StatusBadge'
import ConfirmModal from '../../components/HOD/ConfirmModal'
import Card from '../../components/HOD/Card'

function SectionTitle({ icon: Icon, label, color = 'text-blue-600' }) {
  return (
    <div className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-4 ${color}`}>
      <Icon size={13} />
      {label}
    </div>
  )
}

function DetailField({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200">{value}</div>
    </div>
  )
}

export default function EntryDetail() {
  const { selectedEntry, setSelectedEntry, approveEntry, rejectEntry } = useStore()
  const navigate = useNavigate()

  const [overrideMark, setOverrideMark] = useState('')
  const [remarks,      setRemarks]      = useState('')
  const [modal,        setModal]        = useState(null)

  if (!selectedEntry) {
    return (
      <div className="page-enter flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4 opacity-30">🔍</div>
        <p className="text-slate-400 mb-6">No entry selected.</p>
        <Button onClick={() => navigate('/approvals')}>Back to Approvals</Button>
      </div>
    )
  }

  const e = selectedEntry
  const isActionable = e.status === 'pending'
  const markToUse    = overrideMark ? parseInt(overrideMark, 10) : e.marks
  const pct          = Math.round((e.marks / 20) * 100)
  const circumference = 2 * Math.PI * 22

  const handleConfirm = () => {
    if (modal === 'approve') approveEntry(e.id, remarks, markToUse)
    else rejectEntry(e.id, remarks)
    setModal(null)
    setSelectedEntry(null)
    navigate('/approvals')
  }

  return (
    <div className="page-enter space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="outline" size="sm" onClick={() => { navigate('/approvals'); setSelectedEntry(null) }}>
          <ChevronLeft size={13} /> Back
        </Button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[18px] font-bold text-slate-900 dark:text-white leading-tight" style={{fontFamily:"'Playfair Display',serif"}}>
            {e.title}
          </h2>
          <p className="text-[12px] text-slate-400 mt-1">Submitted by <strong className="text-slate-600 dark:text-slate-300">{e.faculty}</strong> · {e.date}</p>
        </div>
        <StatusBadge status={e.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Section 1 – Entry Info */}
          <Card className="p-5">
            <SectionTitle icon={FileText} label="Entry Information" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <DetailField label="Module"       value={<ModuleChip module={e.module} />} />
              <DetailField label="Sub-Type"     value={e.subType} />
              <DetailField label="Organisation" value={e.company} />
              <DetailField label="Submitted"    value={e.date} />
            </div>
            <div className="mb-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</p>
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {e.description}
              </div>
            </div>
            {e.students.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Students Involved</p>
                <div className="flex flex-wrap gap-1.5">
                  {e.students.map(st => (
                    <span key={st} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Section 2 – Document */}
          <Card className="p-5">
            <SectionTitle icon={FileText} label="Supporting Document" color="text-violet-600" />
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center text-slate-400">
              <FileText size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-[13px] font-semibold mb-1">{e.file}</p>
              <p className="text-[12px] mb-5">PDF Document</p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" size="sm"><Eye size={12} /> Preview</Button>
                <Button size="sm"><Download size={12} /> Download</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Section 3 – Marks */}
          <Card className="p-5">
            <SectionTitle icon={Award} label="Marks Assessment" color="text-emerald-600" />
            <div className="flex items-center gap-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
              <div>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Auto-Calculated</p>
                <div className="text-[32px] font-black text-blue-600 dark:text-blue-400 leading-none">
                  {e.marks}
                  <span className="text-[14px] font-normal text-slate-400 ml-1">/ 20</span>
                </div>
              </div>
              {/* Ring */}
              <svg width="60" height="60" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                <circle
                  cx="26" cy="26" r="22" fill="none" stroke="#2563eb" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
                  transform="rotate(-90 26 26)"
                />
                <text x="26" y="31" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">{pct}%</text>
              </svg>
            </div>

            {isActionable && (
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Override Marks <span className="text-slate-400 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="number" min={0} max={20}
                  placeholder={`Default: ${e.marks}`}
                  value={overrideMark}
                  onChange={ev => setOverrideMark(ev.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200"
                />
              </div>
            )}
          </Card>

          {/* Section 4 – Remarks */}
          <Card className="p-5">
            <SectionTitle icon={PenLine} label="HoD Remarks" color="text-amber-600" />
            {isActionable ? (
              <textarea
                className="w-full min-h-[100px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y text-slate-700 dark:text-slate-200"
                placeholder="Add your remarks or feedback for the faculty…"
                value={remarks}
                onChange={ev => setRemarks(ev.target.value)}
              />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-[13px] text-slate-600 dark:text-slate-300 min-h-[80px]">
                {e.remarks || <span className="italic text-slate-400">No remarks added.</span>}
              </div>
            )}
          </Card>

          {/* Section 5 – Actions */}
          {isActionable && (
            <Card className="p-5">
              <SectionTitle icon={CheckCircle} label="Actions" color="text-slate-600" />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="danger" size="lg" className="justify-center" onClick={() => setModal('reject')}>
                  <XCircle size={16} /> Reject
                </Button>
                <Button variant="success" size="lg" className="justify-center" onClick={() => setModal('approve')}>
                  <CheckCircle size={16} /> Approve
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <ConfirmModal
        open={!!modal}
        title={modal === 'approve' ? 'Approve this Entry?' : 'Reject this Entry?'}
        body={
          modal === 'approve'
            ? `You are about to approve "${e.title}" with ${markToUse} marks.${remarks ? ' Your remarks will be attached.' : ''}`
            : `You are about to reject "${e.title}".${remarks ? ' Your remarks will be sent to the faculty.' : ' Consider adding remarks to help the faculty.'}`
        }
        confirmLabel={modal === 'approve' ? '✓ Yes, Approve' : '✗ Yes, Reject'}
        variant={modal === 'approve' ? 'success' : 'danger'}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
    </div>
  )
}
