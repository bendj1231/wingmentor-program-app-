import React from 'react';
import { Smartphone, Monitor, ExternalLink, Database, Search } from 'lucide-react';

const PilotApps: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-800">WingMentor Apps</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Choose your platform to access flight tools, logs, and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mobile Option */}
        <a 
          href="https://wingmentorapp.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-6 h-full"
        >
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
            <Smartphone size={48} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Mobile App</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Access the mobile-optimized companion for on-the-go checklists, quick logging, and weather updates directly in your browser.
            </p>
          </div>
          <div className="pt-4 w-full">
            <span className="flex items-center justify-center space-x-2 w-full text-emerald-600 font-bold bg-emerald-50 px-4 py-3 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors text-sm">
              <span>Launch Mobile App</span>
              <ExternalLink size={18} />
            </span>
          </div>
        </a>

        {/* Desktop Option */}
        <a 
          href="https://wingmentorapp.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-6 h-full"
        >
          <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform duration-300">
            <Monitor size={48} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Desktop Version</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Access the full-featured web portal for comprehensive flight planning, logbook management, and mentorship tools.
            </p>
          </div>
          <div className="pt-4 w-full">
            <span className="flex items-center justify-center space-x-2 w-full text-sky-600 font-bold bg-sky-50 px-4 py-3 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors text-sm">
              <span>Launch Desktop App</span>
              <ExternalLink size={18} />
            </span>
          </div>
        </a>

        {/* Blackbox Option */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-700 hover:border-emerald-500 hover:shadow-xl transition-all group flex flex-col items-center text-center space-y-6 h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 z-0"></div>
          <div className="relative z-10 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 border border-slate-700 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all duration-300">
            <Database size={48} />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-xl font-bold text-white mb-3">Blackbox Database</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Secure access to the WingMentor Knowledge Database. Search incident reports, technical manuals, and safety protocols.
            </p>
          </div>
          <div className="pt-4 w-full relative z-10">
            <button className="flex items-center justify-center space-x-2 w-full text-slate-900 font-bold bg-emerald-500 px-4 py-3 rounded-xl hover:bg-emerald-400 transition-colors text-sm shadow-lg shadow-emerald-900/20">
              <span>Access Database</span>
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotApps;