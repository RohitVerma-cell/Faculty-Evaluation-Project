import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { TrendingUp, CheckCircle, Award, FileText } from 'lucide-react'
import { useStore } from '../../context/HOD/useStore'
import { MOCK_TREND, MOCK_MODULE_DATA, MOCK_SCHOOL_DATA } from '../../data/data'
import KpiCard from '../../components/HOD/KpiCard'
import Card, { CardHeader } from '../../components/HOD//Card'
import Avatar from '../../components/HOD/Avatar'

const TT = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }

export default function Analytics() {
  const { faculty, submissions } = useStore()

  const kpis = [
    { label: 'Avg. Faculty Score', value: '81.4', Icon: TrendingUp, color: 'blue',   change: '+2.1 from last year', changeDir: 'up'   },
    { label: 'Evaluations Done',   value: `${faculty.filter(f=>f.evalStatus==='complete').length}/${faculty.length}`, Icon: CheckCircle, color: 'green', change: 'On track',         changeDir: 'up'   },
    { label: 'Top Department',     value: 'CS',   Icon: Award,      color: 'orange', change: 'Consistent leader',  changeDir: 'up'   },
    { label: 'Active Submissions', value: submissions.filter(s=>s.status==='pending').length, Icon: FileText, color: 'red', change: 'Needs review', changeDir: 'down' },
  ]

  return (
    <div className="page-enter space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => <KpiCard key={k.label} {...k} icon={k.Icon} />)}
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardHeader title="School-wise Performance" subtitle="Average score comparison across departments" />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={MOCK_SCHOOL_DATA} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={TT} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <Bar dataKey="score" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={52} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="Submission Trend" subtitle="Approved vs total over 6 months" />
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={MOCK_TREND} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="submissions" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3.5 }} name="Submissions" />
              <Line type="monotone" dataKey="approved"    stroke="#16a34a" strokeWidth={2}   dot={false}       name="Approved"    />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardHeader title="Module-wise Contribution" subtitle="Horizontal breakdown" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_MODULE_DATA} layout="vertical" margin={{ top: 4, right: 30, left: 50, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="value" fill="#7c3aed" radius={[0, 6, 6, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <CardHeader title="Faculty Submission Breakdown" subtitle="Approved vs total per faculty" />
          <div className="space-y-3 mt-1">
            {faculty.map((f, i) => (
              <div key={f.id} className="flex items-center gap-3">
                <Avatar name={f.name} initials={f.avatar} size={28} index={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 mb-1 truncate">{f.name}</p>
                  <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
                      style={{ width: `${(f.approved / f.submissions) * 100}%` }}
                    />
                    {f.rejected > 0 && (
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${(f.rejected / f.submissions) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                  {f.approved}/{f.submissions}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Approved
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> Rejected
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
