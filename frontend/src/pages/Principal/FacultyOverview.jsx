import React, { useState } from 'react'
import { MOCK_FACULTY } from '../../data/principalmockdata'
import Card from '../../components/principal/Card'
import { Search, Filter, MoreVertical, Mail, ExternalLink } from 'lucide-react'

export default function FacultyOverview() {
  const [searchTerm, setSearchTerm] = useState('')

  // 🔍 Filter Logic
  const filteredFaculty = MOCK_FACULTY.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.dept.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'draft': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
      default: return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="p-6 space-y-6 bg-[#f8fafc] min-h-screen">
      
      {/* 🏷️ Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Overview</h1>
          <p className="text-slate-500 text-sm">Manage and monitor all academic staff performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search faculty..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* 📊 Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
            {MOCK_FACULTY.length}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Staff</p>
            <p className="text-sm font-bold text-slate-800">Verified Faculty</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold">
            {MOCK_FACULTY.filter(f => f.evalStatus === 'complete').length}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Completed</p>
            <p className="text-sm font-bold text-slate-800">Evaluations Done</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold">
            {MOCK_FACULTY.filter(f => f.evalStatus === 'pending').length}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">In Progress</p>
            <p className="text-sm font-bold text-slate-800">Pending Reviews</p>
          </div>
        </div>
      </div>

      {/* 🗂️ Faculty Table */}
      <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Faculty Details</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Department</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Activity</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-xs">
                        {f.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                        <p className="text-[11px] text-slate-400">ID: FAC-00{f.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">
                      {f.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-slate-500">Submissions: {f.submissions}</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${(f.approved / f.submissions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(f.evalStatus)}`}>
                      {f.evalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
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