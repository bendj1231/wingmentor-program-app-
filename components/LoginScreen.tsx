import React, { useState } from 'react';
import { User, Lock, ArrowRight, BarChart3 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string, jotFormConnected: boolean) => void;
  logoUrl: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, logoUrl }) => {
  const [wmUser, setWmUser] = useState('');
  const [wmPass, setWmPass] = useState('');
  const [jfUser, setJfUser] = useState('');
  const [jfPass, setJfPass] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials here.
    // We pass the username back to the App component to display in the header.
    if (wmUser) {
      onLogin(wmUser, !!jfUser && !!jfPass);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Branding */}
        <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute -right-10 -top-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl"></div>
             <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <img src={logoUrl} alt="WingMentor" className="h-14 w-auto mb-8 bg-white/10 p-2 rounded-lg backdrop-blur-sm" />
            <h2 className="text-3xl font-bold mb-4">Pilot Portal Access</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Sign in to access your flight logs, operating handbooks, and mission control dashboard.
            </p>
          </div>
          <div className="relative z-10 mt-12">
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

                {/* JotForm Login Integration */}
                 <div className="space-y-4 bg-orange-50/50 p-6 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-orange-100 text-orange-600 rounded">
                        <BarChart3 size={16} />
                    </div>
                    <h3 className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                        Analytics Integration (Optional)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Sign in to your JotForm account to automatically load embedded analytics and progress reports.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                        type="text" 
                        placeholder="JotForm Username"
                        value={jfUser}
                        onChange={(e) => setJfUser(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm"
                      />
                       <input 
                        type="password" 
                        placeholder="JotForm Password"
                        value={jfPass}
                        onChange={(e) => setJfPass(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm"
                      />
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