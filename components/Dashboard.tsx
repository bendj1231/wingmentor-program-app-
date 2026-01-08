import React, { useMemo } from 'react';
import { Clock, AlertTriangle, Calendar, Award, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgramLogEntry } from '../types';

interface DashboardProps {
  logs: ProgramLogEntry[];
  onViewLogs: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, onViewLogs }) => {
  // Calculate stats based on actual logs
  const totalHours = useMemo(() => {
    return logs.reduce((acc, log) => acc + (parseFloat(log.duration) || 0), 0);
  }, [logs]);

  const pendingCount = logs.filter(l => l.status === 'Pending').length;
  
  // Calculate completion percentage based on a hypothetical target (e.g., 40 hours for PPL)
  const completionPercentage = Math.min(100, Math.round((totalHours / 40) * 100));

  // Mock data for the chart (visual representation)
  const chartData = [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 0 },
    { name: 'Wed', hours: 2.1 },
    { name: 'Thu', hours: 0.8 },
    { name: 'Fri', hours: 0 },
    { name: 'Sat', hours: 3.0 },
    { name: 'Sun', hours: 0 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800">Pilot Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-sky-50 rounded-lg text-sky-600"><Clock size={20} /></div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{totalHours.toFixed(1)}</h3>
          <p className="text-slate-500 text-sm">Total Program Hours</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><AlertTriangle size={20} /></div>
            {pendingCount > 0 && (
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Action Req</span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{pendingCount}</h3>
          <p className="text-slate-500 text-sm">Pending Verifications</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Calendar size={20} /></div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">12 Oct</h3>
          <p className="text-slate-500 text-sm">Next Scheduled Checkride</p>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Award size={20} /></div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{completionPercentage}%</h3>
          <p className="text-slate-500 text-sm">Program Completion</p>
        </div>
      </div>

      {/* Recent Activity & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6">Weekly Program Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="hours" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Recent Program Logs</h3>
          <div className="space-y-4">
            {logs.slice(0, 3).map((log) => (
              <div key={log.id} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate" title={log.description}>{log.description}</p>
                  <p className="text-xs text-slate-500 truncate">{log.personName} • {log.date}</p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'Verified' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
              </div>
            ))}
             {logs.length === 0 && <p className="text-sm text-slate-400 italic">No logs recorded yet.</p>}
             <button onClick={onViewLogs} className="w-full mt-2 text-sm text-sky-600 hover:text-sky-700 font-medium py-2">View All Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;