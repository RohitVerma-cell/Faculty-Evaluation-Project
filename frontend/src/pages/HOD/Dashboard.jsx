import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useStore } from '../../context/HOD/useStore'
import { MOCK_TREND, MOCK_MODULE_DATA, MOCK_ACTIVITIES } from '../../data/data'
import KpiCard from '../../components/HOD/KpiCard'
import Card, { CardHeader } from '../../components/HOD/Card'
import Button from '../../components/HOD/Button'
import ModuleChip from '../../components/HOD/ModuleChip'
import Avatar from '../../components/HOD/Avatar'

const TT_STYLE = {
  background: 'var(--tw-bg)',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 12,
}

export default function Dashboard() {
  const { submissions, faculty, setSelectedEntry } = useStore()
  const navigate = useNavigate()

  const pending  = submissions.filter(s => s.status === 'pending').length
  const approved = submissions.filter(s => s.status === 'approved').length
  const rejected = submissions.filter(s => s.status === 'rejected').length

  const kpis = [
    { label: 'Total Faculty',       value: faculty.length, Icon: Users,        color: 'blue',   change: '+1 this semester', changeDir: 'up'   },
    { label: 'Pending Approvals',   value: pending,        Icon: Clock,        color: 'orange', change: 'Needs attention',  changeDir: 'down' },
    { label: 'Approved This Month', value: approved,       Icon: CheckCircle,  color: 'green',  change: '+3 from last month', changeDir: 'up' },
    { label: 'Rejected',            value: rejected,       Icon: XCircle,      color: 'red',    change: 'Review required',  changeDir: 'down' },
  ]

  return (
    <div className="page-enter space-y-5">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => <KpiCard key={k.label} {...k} icon={k.Icon} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardHeader title="Submissions Trend" subtitle="Last 6 months" />
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={MOCK_TREND} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="submissions" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3.5 }} name="Submissions" />
              <Line type="monotone" dataKey="approved"    stroke="#16a34a" strokeWidth={2}   dot={false}       name="Approved"    strokeDasharray="5 3" />
              <Line type="monotone" dataKey="rejected"    stroke="#dc2626" strokeWidth={2}   dot={false}       name="Rejected"    strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="Module-wise Distribution" subtitle="Total entries by category" />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={MOCK_MODULE_DATA} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT_STYLE} />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={52} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Activity Feed */}
        <Card className="p-5">
          <CardHeader
            title="Recent Activity"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('/approvals')}>View All</Button>}
          />
          <div className="space-y-0">
            {MOCK_ACTIVITIES.map(a => (
              <div key={a.id} className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.color }} />
                <div>
                  <p className="text-[13px] text-slate-700 dark:text-slate-300 leading-snug">{a.text}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Quick View */}
        <Card className="p-5">
          <CardHeader
            title="Pending Entries"
            action={
              <Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>
                Review All
              </Button>
            }
          />
          <div className="space-y-0">
            {submissions.filter(s => s.status === 'pending').slice(0, 4).map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-lg transition-colors"
                onClick={() => { setSelectedEntry(s); navigate('/approvals/detail') }}
              >
                <Avatar name={s.faculty} size={32} index={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">{s.faculty}</p>
                  <p className="text-[11px] text-slate-400 truncate">{s.title}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <ModuleChip module={s.module} />
                  <span className="text-[10px] text-slate-400">{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
