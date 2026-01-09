import React from 'react';
import { Smartphone, Monitor, ExternalLink } from 'lucide-react';

const PilotTools: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-800">Pilot Tools</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Access advanced flight planning, weather analysis, and performance calculation tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mobile Option */}
        <a 
          href="https://wingmentorapp.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-6 h-full"
        >
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
            <Smartphone size={64} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Mobile Tools</h3>
            <p className="text-slate-500 leading-relaxed">
              Quick-access tools for pre-flight checks, weather briefings, and calculations on the go.
            </p>
          </div>
          <div className="pt-4 w-full">
            <span className="flex items-center justify-center space-x-2 w-full text-emerald-600 font-bold bg-emerald-50 px-6 py-4 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <span>Launch Mobile Tools</span>
              <ExternalLink size={20} />
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
          <div className="w-32 h-32 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform duration-300">
            <Monitor size={64} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Desktop Tools</h3>
            <p className="text-slate-500 leading-relaxed">
              Full suite of flight planning calculators, METAR decoders, and the Wingman AI assistant optimized for desktop use.
            </p>
          </div>
          <div className="pt-4 w-full">
            <span className="flex items-center justify-center space-x-2 w-full text-sky-600 font-bold bg-sky-50 px-6 py-4 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <span>Launch Desktop Tools</span>
              <ExternalLink size={20} />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PilotTools;