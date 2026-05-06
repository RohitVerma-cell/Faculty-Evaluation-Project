import { useState, useEffect, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Trophy, Loader2 } from 'lucide-react'
import Card from '../../components/HOD/Card'
import Avatar from '../../components/HOD/Avatar'
import StatusBadge from '../../components/HOD/StatusBadge'

const BASE_URL = 'http://localhost:5000/api/submission'

// ── Map raw DB submission → performance row ──
function mapSubmission(sub, index) {
  const hod = sub.hodEvaluation ?? {}

  const tl1 = sub.tl1Score ?? 0
  const tl2 = hod.tl2Total ?? null
  const tl3Raw = hod.tl3Score ?? null
  const tl3Disp = tl3Raw != null ? tl3Raw * 10 : null
  const tl4 = hod.tl4Score ?? null

  const total = (tl2 != null && tl3Raw != null && tl4 != null)
    ? Math.round((tl1 + tl2 + tl3Disp + tl4) / 4)
    : null

  const evalStatus =
    sub.status === 'hod_approved'  ? 'complete' :
    sub.status === 'submitted'     ? 'pending'  :
    sub.status === 'draft'         ? 'draft'    :
    sub.status === 'rejected'      ? 'rejected' : 'pending'

  return {
    id:          sub._id,
    name:        sub.facultyName,
    email:       sub.facultyEmail,
    dept:        sub.department ?? 'CS',
    avatar:      sub.facultyName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    academicYear: sub.academicYear,
    status:      sub.status,
    evalStatus,
    // scores
    tl1, tl2, tl3Disp, tl4, total,
    // counts
    journalPapers:    sub.r1JournalPapers?.length ?? 0,
    books:            (sub.r2Books?.books?.length ?? 0) + (sub.r2Books?.bookChapters?.length ?? 0),
    conferencePapers: sub.r3ConferencePapers?.length ?? 0,
    patents:          sub.r6Patents?.patents?.length ?? 0,
    fdp:              sub.sd1FDP?.length ?? 0,
    internships:      sub.tl1?.internships?.length ?? 0,
  }
}

function ScoreCell({ score, accent }) {
  if (score == null) return <span className="text-slate-400 dark:text-slate-600 text-[12px]">—</span>
  const color = accent ?? '#3b82f6'
  return (
    <div className="flex items-center gap-2">
      <div className="w-14 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 hidden sm:block overflow-hidden">
        <div style={{ width: `${Math.min(score, 100)}%`, background: color, height: '100%', borderRadius: 999, transition: 'width 0.4s ease' }} />
      </div>
      <span className="font-bold text-[13px]" style={{ color }}>{score}</span>
    </div>
  )
}

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <ArrowUpDown size={11} className="text-slate-400" />
  return sortDir === 'asc'
    ? <ArrowUp size={11} className="text-blue-500" />
    : <ArrowDown size={11} className="text-blue-500" />
}

function StatPill({ label, value, color }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 20, background: color + '18', border: `1px solid ${color}33`, marginRight: 4, marginBottom: 2 }}>
      <span style={{ fontSize: 10, color, fontWeight: 700 }}>{value}</span>
      <span style={{ fontSize: 10, color: '#94a3b8' }}>{label}</span>
    </div>
  )
}

export default function FacultyPerformance() {
  const [facultyList, setFacultyList] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [sortBy,      setSortBy]      = useState('total')
  const [sortDir,     setSortDir]     = useState('desc')
  const [search,      setSearch]      = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/all`)
      .then(r => {
        if (!r.ok) throw new Error(`Server error ${r.status}`)
        return r.json()
      })
      .then(data => {
        setFacultyList(data.map(mapSubmission))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() =>
    facultyList.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase())
    )
  , [facultyList, search])

  const maxTotal = useMemo(() =>
    Math.max(...filtered.filter(f => f.total != null).map(f => f.total), 0)
  , [filtered])

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const va = a[sortBy] ?? -1
    const vb = b[sortBy] ?? -1
    return sortDir === 'asc' ? va - vb : vb - va
  }), [filtered, sortBy, sortDir])

  const toggle = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const cols = [
    { key: 'tl1',     label: 'TL1',   accent: '#3b82f6' },
    { key: 'tl2',     label: 'TL2',   accent: '#06b6d4' },
    { key: 'tl3Disp', label: 'TL3',   accent: '#f59e0b' },
    { key: 'tl4',     label: 'TL4',   accent: '#ec4899' },
    { key: 'total',   label: 'Total', accent: '#8b5cf6' },
  ]

  // ── Summary stats ──
  const stats = useMemo(() => ({
    total:    facultyList.length,
    complete: facultyList.filter(f => f.evalStatus === 'complete').length,
    pending:  facultyList.filter(f => f.evalStatus === 'pending').length,
    draft:    facultyList.filter(f => f.evalStatus === 'draft').length,
    avgTotal: facultyList.filter(f => f.total != null).length > 0
      ? Math.round(facultyList.filter(f => f.total != null).reduce((s, f) => s + f.total, 0) / facultyList.filter(f => f.total != null).length)
      : null,
  }), [facultyList])

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-slate-400">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-[14px]">Loading faculty performance data…</span>
    </div>
  )

  if (error) return (
    <div className="p-6 text-center text-red-500 text-[14px]">
      Failed to load data: {error}
    </div>
  )

  return (
    <div className="page-enter space-y-4">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Faculty Performance Overview</h2>
          <p className="text-[12px] text-slate-400 mt-1">
            Click column headers to sort · {facultyList.length} faculty loaded from database
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          <Trophy size={14} className="text-amber-500" />
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
            Top performer highlighted
          </span>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Faculty',    value: stats.total,    color: '#3b82f6', bg: 'bg-blue-50 dark:bg-blue-900/20'    },
          { label: 'Evaluated',        value: stats.complete, color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Pending',          value: stats.pending,  color: '#f59e0b', bg: 'bg-amber-50 dark:bg-amber-900/20'  },
          { label: 'Draft',            value: stats.draft,    color: '#94a3b8', bg: 'bg-slate-50 dark:bg-slate-800/40'  },
          { label: 'Avg Total Score',  value: stats.avgTotal ?? '—', color: '#8b5cf6', bg: 'bg-violet-50 dark:bg-violet-900/20' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700`}>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">{label}</div>
            <div className="text-[22px] font-black" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ── Search ── */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, email or department…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-[12px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            Clear
          </button>
        )}
        <span className="text-[12px] text-slate-400">{sorted.length} results</span>
      </div>

      {/* ── Table ── */}
      <Card>
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-[14px]">
            {search ? 'No faculty match your search.' : 'No submissions found in database.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    Faculty
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    Dept
                  </th>
                  {cols.map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => toggle(key)}
                      className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:text-blue-500 select-none whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        {label} <SortIcon col={key} sortBy={sortBy} sortDir={sortDir} />
                      </div>
                    </th>
                  ))}
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    Contributions
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((f, i) => {
                  const isTop = f.total != null && f.total === maxTotal && maxTotal > 0
                  return (
                    <tr
                      key={f.id}
                      className={[
                        'border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors',
                        isTop
                          ? 'bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40',
                      ].join(' ')}
                    >
                      {/* Faculty */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={f.name} initials={f.avatar} size={32} index={i} />
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-[13px]">
                              {f.name}
                              {isTop && <Trophy size={12} className="text-amber-500" />}
                            </div>
                            <div className="text-[11px] text-slate-400">{f.email}</div>
                            <div className="text-[10px] text-slate-400">{f.academicYear}</div>
                          </div>
                        </div>
                      </td>

                      {/* Dept */}
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded">
                          {f.dept}
                        </span>
                      </td>

                      {/* TL scores */}
                      {cols.map(({ key, accent }) => (
                        <td key={key} className="px-4 py-3">
                          <ScoreCell score={f[key]} accent={accent} />
                        </td>
                      ))}

                      {/* Contributions */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {f.journalPapers > 0    && <StatPill label="Papers"       value={f.journalPapers}    color="#8b5cf6" />}
                          {f.books > 0            && <StatPill label="Books"        value={f.books}            color="#3b82f6" />}
                          {f.conferencePapers > 0 && <StatPill label="Conf."        value={f.conferencePapers} color="#06b6d4" />}
                          {f.patents > 0          && <StatPill label="Patents"      value={f.patents}          color="#f59e0b" />}
                          {f.fdp > 0              && <StatPill label="FDP"          value={f.fdp}              color="#10b981" />}
                          {f.internships > 0      && <StatPill label="Internships"  value={f.internships}      color="#ec4899" />}
                          {[f.journalPapers, f.books, f.conferencePapers, f.patents, f.fdp, f.internships].every(v => v === 0) && (
                            <span className="text-[11px] text-slate-400 italic">No data</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={f.evalStatus} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}