import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { Users, Clock, CheckCircle, XCircle, Loader2, TrendingUp } from 'lucide-react'
import KpiCard from '../../components/HOD/KpiCard'
import Card, { CardHeader } from '../../components/HOD/Card'
import Button from '../../components/HOD/Button'
import Avatar from '../../components/HOD/Avatar'

const BASE_URL = 'http://localhost:5000/api/submission'

const TT_STYLE = {
  background: '#1e293b',
  border: '1px solid #2d3f55',
  borderRadius: 8,
  fontSize: 12,
  color: '#e2e8f0',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/all`)
      .then(r => { if (!r.ok) throw new Error(`Server error ${r.status}`); return r.json() })
      .then(data => { setSubmissions(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-slate-400">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-[14px]">Loading dashboard…</span>
    </div>
  )

  if (error) return (
    <div className="p-6 text-center text-red-500 text-[14px]">Failed to load: {error}</div>
  )

  // ── Derived stats ──
  const total        = submissions.length
  const pending      = submissions.filter(s => s.status === 'submitted').length
  const approved     = submissions.filter(s => s.status === 'hod_approved').length
  const rejected     = submissions.filter(s => s.status === 'rejected').length
  const draft        = submissions.filter(s => s.status === 'draft').length

  // ── Module distribution (Research / Teaching / Self Dev) ──
  const moduleData = [
    { name: 'Teaching',     value: submissions.reduce((s, sub) => s + (sub.tl1?.studentPapers?.length ?? 0) + (sub.tl1?.internships?.length ?? 0), 0) },
    { name: 'Research',     value: submissions.reduce((s, sub) => s + (sub.r1JournalPapers?.length ?? 0) + (sub.r3ConferencePapers?.length ?? 0) + (sub.r6Patents?.patents?.length ?? 0), 0) },
    { name: 'Self Dev',     value: submissions.reduce((s, sub) => s + (sub.sd1FDP?.length ?? 0) + (sub.sd2Workshop?.length ?? 0) + (sub.sd4MOOCs?.length ?? 0), 0) },
  ]

  // ── Status distribution for pie ──
  const statusData = [
    { name: 'Draft',        value: draft,    color: '#94a3b8' },
    { name: 'Submitted',    value: pending,  color: '#f59e0b' },
    { name: 'HoD Approved', value: approved, color: '#10b981' },
    { name: 'Rejected',     value: rejected, color: '#ef4444' },
  ].filter(d => d.value > 0)

  // ── Trend: group by month using updatedAt ──
  const monthMap = {}
  submissions.forEach(sub => {
    const d = new Date(sub.updatedAt)
    const key = d.toLocaleString('default', { month: 'short' })
    if (!monthMap[key]) monthMap[key] = { month: key, submissions: 0, approved: 0, rejected: 0 }
    monthMap[key].submissions++
    if (sub.status === 'hod_approved') monthMap[key].approved++
    if (sub.status === 'rejected')     monthMap[key].rejected++
  })
  const trendData = Object.values(monthMap).slice(-6)

  // ── Department breakdown ──
  const deptMap = {}
  submissions.forEach(sub => {
    const dept = sub.department ?? 'CS'
    if (!deptMap[dept]) deptMap[dept] = { name: dept, count: 0, evaluated: 0 }
    deptMap[dept].count++
    if (sub.status === 'hod_approved') deptMap[dept].evaluated++
  })
  const deptData = Object.values(deptMap)

  // ── Recent activity: last 5 submissions sorted by updatedAt ──
  const recentActivity = [...submissions]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
    .map(sub => ({
      id:     sub._id,
      name:   sub.facultyName,
      email:  sub.facultyEmail,
      status: sub.status,
      dept:   sub.department ?? 'CS',
      time:   timeAgo(new Date(sub.updatedAt)),
      color:  sub.status === 'hod_approved' ? '#10b981'
            : sub.status === 'rejected'     ? '#ef4444'
            : sub.status === 'submitted'    ? '#f59e0b'
            : '#94a3b8',
    }))

  // ── Pending submissions (submitted, not yet approved) ──
  const pendingList = submissions
    .filter(s => s.status === 'submitted')
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  // ── Top performers (by hodEvaluation.totalScore) ──
  const topPerformers = [...submissions]
    .filter(s => s.hodEvaluation?.totalScore > 0)
    .sort((a, b) => (b.hodEvaluation?.totalScore ?? 0) - (a.hodEvaluation?.totalScore ?? 0))
    .slice(0, 5)

  const kpis = [
    { label: 'Total Faculty',     value: total,    Icon: Users,       color: 'blue',   change: `${draft} drafts`,          changeDir: 'up'   },
    { label: 'Pending Review',    value: pending,  Icon: Clock,       color: 'orange', change: 'Awaiting HoD review',      changeDir: 'down' },
    { label: 'HoD Approved',      value: approved, Icon: CheckCircle, color: 'green',  change: `${total > 0 ? Math.round((approved/total)*100) : 0}% of total`, changeDir: 'up' },
    { label: 'Rejected',          value: rejected, Icon: XCircle,     color: 'red',    change: 'Need resubmission',        changeDir: 'down' },
  ]

  return (
    <div className="page-enter space-y-5">

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => <KpiCard key={k.label} {...k} icon={k.Icon} />)}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Submissions Trend */}
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Submissions Trend" subtitle="Activity grouped by month" />
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={trendData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="submissions" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3.5 }} name="Submissions" />
                <Line type="monotone" dataKey="approved"   stroke="#10b981" strokeWidth={2}   dot={false} name="Approved" strokeDasharray="5 3" />
                <Line type="monotone" dataKey="rejected"   stroke="#ef4444" strokeWidth={2}   dot={false} name="Rejected" strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[210px] flex items-center justify-center text-slate-400 text-[13px]">No trend data yet</div>
          )}
        </Card>

        {/* Status Pie */}
        <Card className="p-5">
          <CardHeader title="Status Breakdown" subtitle="Current submission statuses" />
          {statusData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} dataKey="value" paddingAngle={3}>
                    {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={TT_STYLE} formatter={(v, n) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {statusData.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                      <span className="text-slate-500 dark:text-slate-400">{d.name}</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[210px] flex items-center justify-center text-slate-400 text-[13px]">No data</div>
          )}
        </Card>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Module Distribution */}
        <Card className="p-5">
          <CardHeader title="Contribution Distribution" subtitle="Entries across categories" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={moduleData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT_STYLE} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52} name="Entries">
                {moduleData.map((_, i) => (
                  <Cell key={i} fill={['#3b82f6', '#8b5cf6', '#10b981'][i % 3]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Department Breakdown */}
        <Card className="p-5">
          <CardHeader title="Department Overview" subtitle="Faculty count per department" />
          {deptData.length > 0 ? (
            <div className="space-y-3 mt-2">
              {deptData.map(d => (
                <div key={d.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">{d.name}</span>
                    <span className="text-[11px] text-slate-400">{d.evaluated}/{d.count} evaluated</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: d.count > 0 ? `${(d.evaluated / d.count) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[160px] flex items-center justify-center text-slate-400 text-[13px]">No department data</div>
          )}
        </Card>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Activity */}
        <Card className="p-5">
          <CardHeader title="Recent Activity" subtitle="Latest submission updates" />
          <div className="space-y-0">
            {recentActivity.length > 0 ? recentActivity.map((a, i) => (
              <div key={a.id} className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 truncate">{a.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{statusLabel(a.status)} · {a.dept}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            )) : (
              <p className="text-[12px] text-slate-400 italic py-4 text-center">No recent activity</p>
            )}
          </div>
        </Card>

        {/* Pending Quick View */}
        <Card className="p-5">
          <CardHeader
            title="Pending Review"
            subtitle="Submitted, awaiting HoD"
            action={<Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>View All</Button>}
          />
          <div className="space-y-0">
            {pendingList.length > 0 ? pendingList.map((s, i) => (
              <div
                key={s._id}
                className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-lg transition-colors"
                onClick={() => navigate('/evaluation')}
              >
                <Avatar name={s.facultyName} size={30} index={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-200 truncate">{s.facultyName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{s.facultyEmail}</p>
                </div>
                <span className="text-[10px] text-amber-500 font-semibold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                  {s.department ?? 'CS'}
                </span>
              </div>
            )) : (
              <p className="text-[12px] text-slate-400 italic py-4 text-center">No pending submissions</p>
            )}
          </div>
        </Card>

        {/* Top Performers */}
        <Card className="p-5">
          <CardHeader
            title="Top Performers"
            subtitle="By HoD evaluation score"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('/performance')}><TrendingUp size={12} /> View All</Button>}
          />
          <div className="space-y-0">
            {topPerformers.length > 0 ? topPerformers.map((s, i) => (
              <div key={s._id} className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                  style={{
                    background: i === 0 ? '#fef3c7' : i === 1 ? '#f1f5f9' : i === 2 ? '#fef3c7' : '#f8fafc',
                    color:      i === 0 ? '#d97706' : i === 1 ? '#64748b' : i === 2 ? '#92400e' : '#94a3b8',
                  }}>
                  {i + 1}
                </div>
                <Avatar name={s.facultyName} size={28} index={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-200 truncate">{s.facultyName}</p>
                  <p className="text-[11px] text-slate-400">{s.department ?? 'CS'}</p>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-black text-violet-600 dark:text-violet-400">
                    {s.hodEvaluation?.totalScore}
                  </span>
                  <span className="text-[10px] text-slate-400">/100</span>
                </div>
              </div>
            )) : (
              <p className="text-[12px] text-slate-400 italic py-4 text-center">No evaluations completed yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ── Helpers ──
function timeAgo(date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function statusLabel(status) {
  return status === 'hod_approved' ? 'HoD Approved'
       : status === 'submitted'    ? 'Submitted'
       : status === 'rejected'     ? 'Rejected'
       : status === 'draft'        ? 'Draft'
       : status
}