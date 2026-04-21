import React, { useMemo } from 'react';
import {
  MOCK_FACULTY,
  MOCK_SUBMISSIONS,
  MOCK_COURSES,
  MOCK_TREND
} from '../../data/principalmockdata';

import KpiCard from '../../components/principal/KpiCard';
import Card from '../../components/principal/Card';
import { Users, FileText, Lightbulb, BarChart2, Send } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

export default function PrincipalDashboard() {
  
  // 🔢 Optimized Data Calculations
  const { topFaculty, publications, patents, avgResult } = useMemo(() => {
    const pubs = MOCK_SUBMISSIONS.filter(s => 
      s.module === 'Research' && (s.subType === 'Journal Paper' || s.subType === 'Conference Paper')
    ).length;
    
    const pats = MOCK_SUBMISSIONS.filter(s => s.subType === 'Patent').length;
    
    const avg = MOCK_COURSES.length > 0 
      ? (MOCK_COURSES.reduce((acc, c) => acc + (Number(c.result) || 0), 0) / MOCK_COURSES.length).toFixed(1) 
      : 0;

    const top = [...MOCK_FACULTY]
      .map(f => ({
        ...f,
        totalScore: (Number(f.tl1) || 0) + (Number(f.tl2) || 0) + (Number(f.tl3) || 0)
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5);

    return { topFaculty: top, publications: pubs, patents: pats, avgResult: avg };
  }, []);

  const kpis = [
    { label: 'Total Faculty', value: MOCK_FACULTY.length, Icon: Users, color: 'blue' },
    { label: 'Publications', value: publications, Icon: FileText, color: 'purple' },
    { label: 'Patents', value: patents, Icon: Lightbulb, color: 'green' },
    { label: 'Avg Result', value: `${avgResult}%`, Icon: BarChart2, color: 'orange' }
  ];

  return (
    <div className="space-y-6 p-6 bg-[#f8fafc] min-h-screen">
      
      {/* 🏷️ Header Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Principal Dashboard</h1>
          <p className="text-slate-500 text-sm">School performance overview and faculty management</p>
        </div>
        <div className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          Academic Year 2026-27
        </div>
      </div>

      {/* 🔥 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map(k => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            icon={k.Icon}
            color={k.color}
          />
        ))}
      </div>

      {/* 🏆 Top Faculty Performance Table */}
      <Card className="overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800">Top Faculty Performance</h3>
          <button className="flex items-center text-black gap-2 px-4 py-2 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-all active:scale-95">
            <Send size={14} />
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold text-center">Teaching</th>
                <th className="px-6 py-4 font-semibold text-center">Research</th>
                <th className="px-6 py-4 font-semibold text-center">Self Dev</th>
                <th className="px-6 py-4 font-semibold text-center">Total Score</th>
                <th className="px-6 py-4 font-semibold text-right">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topFaculty.map((f, index) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{f.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{f.tl1 || 0}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{f.tl2 || 0}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{f.tl3 || 0}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{f.totalScore}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center justify-center w-8 h-6 rounded text-[10px] font-bold ${
                      index === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      #{index + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 📊 School Performance Trend Graph */}
      <Card className="p-6 border border-slate-200 shadow-sm bg-white">
        <div className="mb-8">
          <h3 className="font-bold text-slate-800">School Performance Trend</h3>
          <p className="text-xs text-slate-400 mt-1">Monthly overall institutional growth score</p>
        </div>
        
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="submissions" radius={[6, 6, 0, 0]} barSize={50}>
                {MOCK_TREND.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === MOCK_TREND.length - 1 ? '#2563eb' : '#3b82f6'} fillOpacity={0.8 + (index * 0.04)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}