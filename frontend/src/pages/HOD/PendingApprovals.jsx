import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Eye } from 'lucide-react'
import { useStore } from '../../context/HOD/useStore'
import Card from '../../components/HOD/Card'
import Button from '../../components/HOD/Button'
import StatusBadge from '../../components/HOD/StatusBadge'
import ModuleChip from '../../components/HOD/ModuleChip'
import Avatar from '../../components/HOD/Avatar'
import Pagination from '../../components/HOD/Pagination'

const PER_PAGE = 6

export default function PendingApprovals() {
  const { submissions, setSelectedEntry } = useStore()
  const navigate = useNavigate()

  const [moduleFilter,  setModuleFilter]  = useState('all')
  const [facultyFilter, setFacultyFilter] = useState('all')
  const [statusFilter,  setStatusFilter]  = useState('pending')
  const [search,        setSearch]        = useState('')
  const [page,          setPage]          = useState(1)

  const faculties = useMemo(() => [...new Set(submissions.map(s => s.faculty))], [submissions])

  const filtered = useMemo(() => submissions.filter(s => {
    if (moduleFilter  !== 'all' && s.module  !== moduleFilter)  return false
    if (facultyFilter !== 'all' && s.faculty !== facultyFilter) return false
    if (statusFilter  !== 'all' && s.status  !== statusFilter)  return false
    if (search) {
      const q = search.toLowerCase()
      if (!s.title.toLowerCase().includes(q) && !s.faculty.toLowerCase().includes(q)) return false
    }
    return true
  }), [submissions, moduleFilter, facultyFilter, statusFilter, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleChange = (setter) => (e) => { setter(e.target.value); setPage(1) }

  const inputCls = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[13px] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all'

  return (
    <div className="page-enter space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            className={`${inputCls} pl-8 min-w-[210px]`}
            placeholder="Search title or faculty…"
            value={search}
            onChange={handleChange(setSearch)}
          />
        </div>

        {[
          { value: moduleFilter,  setter: setModuleFilter,  options: [['all','All Modules'],['Teaching','Teaching'],['Research','Research'],['Self Dev','Self Dev']] },
          { value: facultyFilter, setter: setFacultyFilter, options: [['all','All Faculty'], ...faculties.map(f => [f, f])] },
          { value: statusFilter,  setter: setStatusFilter,  options: [['all','All Status'],['pending','Pending'],['approved','Approved'],['rejected','Rejected']] },
        ].map(({ value, setter, options }, i) => (
          <select key={i} className={inputCls} value={value} onChange={handleChange(setter)}>
            {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}

        <span className="ml-auto text-[12px] text-slate-400">{filtered.length} entr{filtered.length === 1 ? 'y' : 'ies'}</span>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                {['Faculty', 'Module', 'Sub-Type', 'Title', 'Est. Marks', 'Submitted', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-slate-400">
                    <div className="text-4xl mb-3 opacity-40">📭</div>
                    <div className="text-sm">No entries match the selected filters.</div>
                  </td>
                </tr>
              ) : paged.map((s, i) => (
                <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.faculty} size={30} index={i} />
                      <span className="font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{s.faculty}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><ModuleChip module={s.module} /></td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{s.subType}</td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <span className="block truncate font-medium text-slate-700 dark:text-slate-300">{s.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[16px] font-bold text-blue-600 dark:text-blue-400">{s.marks}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{s.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setSelectedEntry(s); navigate('/approvals/detail') }}
                    >
                      <Eye size={12} /> View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  )
}
