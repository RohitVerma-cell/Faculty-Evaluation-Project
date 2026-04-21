import React from 'react';
import { 
  MOCK_SCHOOL_DATA, 
  MOCK_MODULE_DATA, 
  MOCK_TREND 
} from '../../data/principalmockdata';

import Card from '../../components/principal/Card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, Award, Shield, Target } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function Analytics() {
  // ✅ Create copies to avoid "read-only" errors
  const sortedDeptData = [...MOCK_SCHOOL_DATA].sort((a, b) => b.score - a.score);
  const trendData = [...MOCK_TREND];

  return (
    <div className="space-y-6 p-6 bg-[#f8fafc] min-h-screen">
      
      {/* 🏷️ Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Institutional Analytics</h1>
          <p className="text-slate-500 text-sm">Strategic insights into faculty performance and growth</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 📈 Submission Growth (Area Chart) */}
        <Card className="lg:col-span-2 p-6 bg-white border-slate-200">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
            <TrendingUp size={20} className="text-blue-500" />
            Overall Growth Trend
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSub)" />
                <Area type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 🥧 Module Distribution (Pie Chart) */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
            <PieIcon size={20} className="text-purple-500" />
            Module Distribution
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_MODULE_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {MOCK_MODULE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 🏆 Department Leaderboard */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
            <Target size={20} className="text-orange-500" />
            Department Benchmarking
          </div>
          <div className="space-y-5">
            {sortedDeptData.map((dept, index) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">{dept.name} Department</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {dept.score}% Efficiency
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${dept.score}%`, 
                      backgroundColor: COLORS[index % COLORS.length] 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 💡 Insight Card */}
        <Card className="p-8 bg-slate-900 text-white border-none shadow-xl relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
              <Award size={32} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Strategic Insight</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Based on the current trends, the <strong>Research Output</strong> is projected to grow by 15% this semester. 
              The CS department shows the highest conversion rate from submissions to approvals.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Top Dept</p>
                <p className="text-lg font-bold">CS (81%)</p>
              </div>
              <div className="flex-1 bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Top Goal</p>
                <p className="text-lg font-bold">Patents</p>
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        </Card>

      </div>
    </div>
  );
}