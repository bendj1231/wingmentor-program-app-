import React from 'react';
import { Plane, CloudLightning, Map, Book, Shield, Radio, ExternalLink, Smartphone } from 'lucide-react';

const PilotApps: React.FC = () => {
  const apps = [
    {
      title: "FlightPlan Pro",
      description: "Advanced flight planning with performance calculations and fuel management.",
      icon: Map,
      color: "bg-blue-50 text-blue-600",
      status: "Installed"
    },
    {
      title: "SkyRadar Weather",
      description: "Real-time radar, METARs, TAFs, and satellite imagery overlay.",
      icon: CloudLightning,
      color: "bg-indigo-50 text-indigo-600",
      status: "Launch"
    },
    {
      title: "WingMentor Logbook",
      description: "Digital pilot logbook with EASA/FAA compliance and export features.",
      icon: Book,
      color: "bg-sky-50 text-sky-600",
      status: "Launch"
    },
    {
      title: "Safety Ops",
      description: "Safety management system (SMS) reporting and risk assessment tools.",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
      status: "Launch"
    },
    {
      title: "Radio Master",
      description: "ATC communication simulator with voice recognition practice.",
      icon: Radio,
      color: "bg-orange-50 text-orange-600",
      status: "Update Available"
    },
    {
      title: "Checklist Mobile",
      description: "Interactive checklists for Cessna, Piper, and Diamond aircraft.",
      icon: Smartphone,
      color: "bg-slate-50 text-slate-600",
      status: "Launch"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">WingMentor Pilot Apps</h2>
          <p className="text-slate-500 mt-1">Access your suite of integrated flight applications.</p>
        </div>
        <button className="text-sm text-sky-600 font-medium hover:underline">Manage Subscriptions</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-sky-300 transition-all group cursor-pointer flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${app.color}`}>
                <app.icon size={24} />
              </div>
              <ExternalLink size={18} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">{app.title}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">{app.description}</p>
            
            <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
              app.status === 'Update Available' 
                ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 group-hover:bg-sky-50 group-hover:text-sky-700'
            }`}>
              {app.status}
            </button>
          </div>
        ))}
        
        {/* Coming Soon Card */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-xl flex flex-col items-center justify-center text-center opacity-75">
           <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-3">
             <Plane size={24} />
           </div>
           <h3 className="font-semibold text-slate-600">More Coming Soon</h3>
           <p className="text-xs text-slate-400 mt-1">We are constantly adding new tools to the ecosystem.</p>
        </div>
      </div>
    </div>
  );
};

export default PilotApps;