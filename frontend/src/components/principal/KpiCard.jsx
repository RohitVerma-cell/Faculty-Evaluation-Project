
import React from 'react';

export default function KpiCard({ label, value, icon: Icon, color }) {
  // Mapping colors to Tailwind classes
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      
      <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.blue}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}