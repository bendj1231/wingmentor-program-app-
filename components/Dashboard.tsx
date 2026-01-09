import React from 'react';
import { Bell, ArrowRight, Database } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const newsItems = [
    {
      id: 1,
      title: "New IFR Simulator Added",
      date: "2 hours ago",
      category: "Desktop App Update",
      summary: "Experience the new IFR training module on the WingMentor Desktop App. Learn the foundations of IFR maneuvers and master chart interpretation."
    },
    {
      id: 2,
      title: "WingMentor Community Webinar",
      date: "1 day ago",
      category: "Event",
      summary: "Join us this Friday for a deep dive into advanced meteorology with Captain Stevenson."
    },
    {
      id: 3,
      title: "Maintenance Notice: Server Upgrades",
      date: "2 days ago",
      category: "System",
      summary: "Brief downtime expected on Sunday 0200Z for database improvements."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mission Control</h1>
          <p className="text-slate-500">Welcome back, Captain Richardson.</p>
        </div>
        <div className="text-sm text-slate-400 hidden md:block">
           {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Blackbox Promo Section */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl min-h-[350px] flex items-center group cursor-pointer" onClick={() => onNavigate(View.PILOT_APPS)}>
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?auto=format&fit=crop&q=80&w=2000" 
             alt="Cockpit Blackbox" 
             className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
         </div>

         <div className="relative z-10 p-8 md:p-12 max-w-3xl">
           <div className="flex items-center space-x-2 text-emerald-400 mb-4 font-mono">
             <Database size={20} />
             <span className="text-sm tracking-widest uppercase font-bold">Blackbox App</span>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Knowledge Database</h2>
           <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
             Access the comprehensive aviation knowledge base. Analyze incident reports, review safety data, and enhance your decision-making skills through our secure pilot apps portal.
           </p>
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onNavigate(View.PILOT_APPS);
             }}
             className="flex items-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1"
           >
             <span>Launch Blackbox</span>
             <ArrowRight size={20} />
           </button>
         </div>
      </div>

      {/* News Feed Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell size={24} className="text-sky-600" />
            Program News
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                {item.summary}
              </p>
              <button className="text-sky-600 text-sm font-semibold hover:text-sky-700 flex items-center gap-1 mt-auto">
                Read Updates <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;