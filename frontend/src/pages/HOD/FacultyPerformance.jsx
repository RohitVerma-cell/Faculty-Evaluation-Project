import { useState, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Trophy } from 'lucide-react'
import { useStore } from '../../context/useStore'
import Card from '../../components/HOD/Card'
import Avatar from '../../components/HOD/Avatar'
import StatusBadge from '../../components/HOD/StatusBadge'

function ScoreCell({ score }) {
  if (score == null) return <span className="text-slate-300 dark:text-slate-600 text-[12px]">—</span>
  return (
    <div className="flex items-center gap-2">
      <div className="score-bar w-14 hidden sm:block">
        <div className="score-fill" style={{ width: `${score}%` }} />
      </div>
      <span className="font-bold text-[14px] text-blue-600 dark:text-blue-400">{score}</span>
    </div>
  )
}

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <ArrowUpDown size={12} className="text-slate-300 dark:text-slate-600" />
  return sortDir === 'asc'
    ? <ArrowUp size={12} className="text-blue-500" />
    : <ArrowDown size={12} className="text-blue-500" />
}

export default function FacultyPerformance() {
  const { faculty } = useStore()
  const [sortBy,  setSortBy]  = useState('total')
  const [sortDir, setSortDir] = useState('desc')

  const withTotal = useMemo(() =>
    faculty.map(f => ({
      ...f,
      tl3Disp: f.tl3 ? f.tl3 * 10 : null,
      total: (f.tl2 != null && f.tl3 != null && f.tl4 != null)
        ? Math.round((f.tl1 + f.tl2 + f.tl3 * 10 + f.tl4) / 4)
        : null,
    }))
  , [faculty])

  const maxTotal = useMemo(() =>
    Math.max(...withTotal.filter(f => f.total != null).map(f => f.total), 0)
  , [withTotal])

  const sorted = useMemo(() => [...withTotal].sort((a, b) => {
    const va = a[sortBy] ?? -1
    const vb = b[sortBy] ?? -1
    return sortDir === 'asc' ? va - vb : vb - va
  }), [withTotal, sortBy, sortDir])

  const toggle = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const cols = [
    { key: 'tl1',     label: 'TL1' },
    { key: 'tl2',     label: 'TL2' },
    { key: 'tl3Disp', label: 'TL3' },
    { key: 'tl4',     label: 'TL4' },
    { key: 'total',   label: 'Total' },
  ]

  return (
    <div className="page-enter space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Faculty Performance Overview</h2>
          <p className="text-[12px] text-slate-400 mt-1">Click column headers to sort. Evaluation-complete faculty shown with total scores.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          <Trophy size={14} className="text-amber-500" />
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
            Top Performer highlighted
          </span>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  Faculty
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
                  Eval Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((f, i) => {
                const isTop = f.total != null && f.total === maxTotal
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={f.name} initials={f.avatar} size={32} index={i} />
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            {f.name}
                            {isTop && <Trophy size={13} className="text-amber-500" />}
                          </div>
                          <div className="text-[11px] text-slate-400">{f.submissions} submissions</div>
                        </div>
                      </div>
                    </td>
                    {[f.tl1, f.tl2, f.tl3Disp, f.tl4, f.total].map((val, ci) => (
                      <td key={ci} className="px-4 py-3">
                        <ScoreCell score={val} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <StatusBadge status={f.evalStatus} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
