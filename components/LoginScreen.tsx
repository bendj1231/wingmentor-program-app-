import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
  logoUrl: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, logoUrl }) => {
  const [wmUser, setWmUser] = useState('');
  const [wmPass, setWmPass] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials here.
    // We pass the username back to the App component to display in the header.
    if (wmUser) {
      onLogin(wmUser);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Branding */}
        <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-center items-center relative overflow-hidden text-center">
          <div className="absolute inset-0 z-0">
             <div className="absolute -right-10 -top-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl"></div>
             <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <img src={logoUrl} alt="WingMentor" className="h-40 w-auto mb-8 object-contain" />
            <h2 className="text-3xl font-bold mb-4">WingMentor Program Portal</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Sign in to gain access to the Pilot apps & tools, program logbooks & progress tracking, WingMentor's Communications Network & groupchats.
            </p>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-10">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">System Status</p>
            <div className="flex items-center space-x-2 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Operational</span>
            </div>
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-500 mb-8">Please enter your credentials to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
                {/* WingMentor Login */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    WingMentor Account
                  </h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Username / Pilot ID"
                        value={wmUser}
                        onChange={(e) => setWmUser(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="password" 
                        placeholder="Password"
                        value={wmPass}
                        onChange={(e) => setWmPass(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Access Platform</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
      <p className="mt-8 text-slate-400 text-xs">© {new Date().getFullYear()} WingMentor Inc. Authorized Personnel Only.</p>
    </div>
  );
};

export default LoginScreen;