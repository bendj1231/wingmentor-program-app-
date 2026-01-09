import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Wrench, 
  Mail, 
  LineChart,
  Menu,
  X,
  LogOut,
  User,
  Globe,
  LayoutGrid,
  Briefcase,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import PilotTools from './components/PilotTools';
import PilotApps from './components/PilotApps';
import MentorTools from './components/MentorTools';
import WelcomeGuide from './components/WelcomeGuide';
import { View, ProgramLogEntry } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// --- Components ---

const ContactForm = () => (
  <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
    {/* Email Contact Section */}
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
      <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Get in Touch</h2>
      <p className="text-slate-600 mb-6 max-w-lg mx-auto">
        Have questions about the WingMentor program, need verification support, or technical assistance? 
        Email our team directly for the fastest response.
      </p>
      
      <div className="inline-block relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <a 
          href="mailto:wingmentorprogram@gmail.com" 
          className="relative bg-white border border-slate-200 text-sky-600 hover:text-sky-700 px-8 py-4 rounded-lg font-bold text-lg md:text-xl flex items-center gap-3 transition-all shadow-sm hover:shadow-md"
        >
          <Mail size={24} />
          wingmentorprogram@gmail.com
        </a>
      </div>
    </div>

    {/* Telegram Contact Section */}
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center animate-fadeIn">
      <div className="w-16 h-16 bg-[#0088cc]/10 text-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-6">
        <ExternalLink size={32} />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">Instant Support</h3>
      <p className="text-slate-600 mb-8 text-lg">
        Contact our wingmentor team now for immediate assistance.
      </p>
      
      <a 
        href="https://t.me/+qzRaI1K_-Sc1MDM1" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        <ExternalLink size={24} />
        Join Telegram Channel
      </a>
    </div>
  </div>
);

const ProgramProgress = ({ connected, onConnect }: { connected: boolean; onConnect: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) onConnect();
  };

  if (!connected) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-slate-800">Program Progress Analytics</h2>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto py-16">
           <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <LineChart size={40} />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">Connect Analytics Account</h3>
           <p className="text-slate-500 mb-8 max-w-md mx-auto">
             Please sign in to your JotForm account to securely load your personalized program analytics, flight hours, and progress reports.
           </p>
           
           <form onSubmit={handleConnect} className="max-w-sm mx-auto space-y-4">
             <input 
               type="text" 
               placeholder="JotForm Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
             />
             <input 
               type="password" 
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
             />
             <button 
               type="submit"
               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
             >
               Sign In & Load Analytics
             </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Program Progress Analytics</h2>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Live Analytics Synced
        </span>
      </div>
      
      {/* Embedded Analytics Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[800px] relative">
         <iframe 
           src="https://www.jotform.com/report/240087115842049" 
           className="w-full h-full border-0"
           title="Program Analytics"
         ></iframe>
         {/* Fallback/Overlay in case it doesn't load nicely or is generic */}
         <div className="absolute inset-0 bg-slate-50 flex items-center justify-center -z-10">
            <p className="text-slate-400 animate-pulse">Loading Secured Analytics Dashboard...</p>
         </div>
      </div>
    </div>
  );
};

const ProgramLogsEmbed = () => {
  useEffect(() => {
    const scriptId = "jotform-async";
    
    // Ensure we start fresh if the component remounts
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-sheets-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800">Program Logs</h2>
      {/* Container clips the bottom part (footer/branding) of the iframe */}
      <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[500px]">
        <div 
          className="jotform-table-embed" 
          style={{ width: '100%', height: '600px' }} 
          data-id="260077773072055" 
          data-iframesource="www.jotform.com" 
          data-type="interactive"
        ></div>
        {/* Aggressive white overlay to hide the bottom branding/footer area */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

const LogsTable = ({ logs, verified = false }: { logs: ProgramLogEntry[], verified: boolean }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">{verified ? 'Verified Logs' : 'Program Logs'}</h2>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm min-w-[800px]">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Person</th>
            <th className="px-6 py-4 w-1/3">Description</th>
            <th className="px-6 py-4">Duration</th>
            <th className="px-6 py-4">Program</th>
            <th className="px-6 py-4">Signature</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {logs.filter(l => verified ? l.status === 'Verified' : true).map((log) => (
            <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4 text-slate-900 font-medium whitespace-nowrap">{log.date}</td>
              <td className="px-6 py-4 text-slate-800 font-medium">{log.personName}</td>
              <td className="px-6 py-4 text-slate-600 truncate max-w-xs" title={log.description}>{log.description}</td>
              <td className="px-6 py-4 text-slate-600">{log.duration} hrs</td>
              <td className="px-6 py-4">
                {log.isWingMentor ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800 border border-sky-200">
                    Member
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs">-</span>
                )}
              </td>
               <td className="px-6 py-4 text-slate-500 italic font-serif text-xs">{log.signature}</td>
              <td className="px-6 py-4">
                {log.status === 'Verified' ? (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                     Verified
                   </span>
                ) : (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === 'Pending' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'bg-slate-100 text-slate-600'}`}>
                    {log.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
          {logs.filter(l => verified ? l.status === 'Verified' : true).length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const Handbook = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-2xl font-bold text-slate-800">Program Operating Handbook</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['General Operations', 'Emergency Procedures', 'Aircraft Systems', 'Performance Data', 'Safety Protocols', 'Communication Standards'].map((item) => (
        <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-sky-300 transition-all cursor-pointer group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                <BookOpen size={20} />
              </div>
              <span className="font-semibold text-slate-700">{item}</span>
            </div>
            <span className="text-xs text-slate-400">PDF • 2.4 MB</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jotFormConnected, setJotFormConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initial Mock Data matching new structure
  const [logs, setLogs] = useState<ProgramLogEntry[]>([
    {
      id: '1',
      date: '2023-10-18',
      personName: 'Capt. Sarah Jenkins',
      description: 'Review of emergency procedures and stall recovery techniques.',
      duration: '1.5',
      signature: 'Sarah Jenkins',
      isWingMentor: true,
      status: 'Verified'
    },
    {
      id: '2',
      date: '2023-10-15',
      personName: 'Mike Ross',
      description: 'Ground school: Navigation planning for cross-country flight.',
      duration: '2.0',
      signature: 'Mike Ross',
      isWingMentor: false,
      status: 'Pending'
    }
  ]);

  const LOGO_URL = "https://lh3.googleusercontent.com/d/1KgVuIuCv8mKxTcJ4rClCUCdaQ3fxm0x6";

  const handleLogin = (jfConnected: boolean) => {
    setJotFormConnected(jfConnected);
    setIsAuthenticated(true);
    setLoading(true);
    
    // Simulate loading delay after login
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  const getViewLabel = (view: View) => {
    switch (view) {
      case View.DASHBOARD: return 'Dashboard';
      case View.PROGRESS: return 'Program Progress';
      case View.HANDBOOK: return 'Operating Handbook';
      case View.LOGS: return 'Program Logs';
      case View.VERIFIED_LOGS: return 'Verified Logs';
      case View.TOOLS: return 'Pilot Tools';
      case View.CONTACT: return 'Contact Team';
      case View.BROWSER: return 'Web Browser';
      case View.PILOT_APPS: return 'Pilot Apps';
      case View.MENTOR_TOOLS: return 'Mentor Productivity';
      case View.WELCOME_GUIDE: return 'User Guide';
      default: return 'WingMentor';
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        activeView === view 
          ? 'bg-sky-600 text-white shadow-md' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  // View Routing
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} logoUrl={LOGO_URL} />;
  }

  if (loading) {
    return <LoadingScreen logoUrl={LOGO_URL} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-6 flex items-center justify-between shadow-sm">
        
        {/* Left Section: Mobile Menu Button & Page Title */}
        <div className="flex items-center z-20 gap-3 md:gap-0">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Mobile Page Title - Next to side menu bar */}
          <span className="md:hidden font-semibold text-slate-800 text-lg truncate max-w-[150px]">
            {getViewLabel(activeView)}
          </span>

          {/* Desktop Logo & Title Area */}
          <div className="hidden md:flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <img src={LOGO_URL} alt="WingMentor" className="h-8 object-contain" />
                <span className="font-bold text-slate-800 text-xl tracking-tight">WingMentor</span>
             </div>
             <div className="h-6 w-px bg-slate-300"></div>
             <span className="text-slate-600 font-medium text-lg">{getViewLabel(activeView)}</span>
          </div>
        </div>
        
        {/* Center Section on Mobile (Logo) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden z-10">
          <img 
            src={LOGO_URL} 
            alt="WingMentor" 
            className="h-10 object-contain" 
          />
        </div>
        
        {/* Right Section (User Profile on Desktop) */}
        <div className="flex items-center space-x-4 z-20">
          <div className="hidden md:flex items-center space-x-2 text-right">
             <div className="text-xs text-slate-500">
               <p>Cadet Pilot</p>
               <p className="font-bold text-slate-800">Alex Richardson</p>
             </div>
             <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 border border-sky-200">
               <User size={18} />
             </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col pt-16 md:pt-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem view={View.PROGRESS} icon={LineChart} label="Current Progress" />
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resources</p>
            </div>
            <NavItem view={View.HANDBOOK} icon={BookOpen} label="Operating Handbook" />
            <NavItem view={View.PILOT_APPS} icon={LayoutGrid} label="Pilot Apps" />
            <NavItem view={View.TOOLS} icon={Wrench} label="Pilot Tools" />
            
            <a 
              href="https://wing-navigator.vercel.app/"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Globe size={20} />
              <span className="font-medium text-sm">Web Browser</span>
            </a>

            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Logbook</p>
            </div>
            <NavItem view={View.LOGS} icon={FileText} label="Program Logs" />
            <NavItem view={View.VERIFIED_LOGS} icon={CheckCircle} label="Verified Logs" />
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Mentorship</p>
            </div>
            <NavItem view={View.MENTOR_TOOLS} icon={Briefcase} label="Mentor Tools" />
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Support</p>
            </div>
            <NavItem view={View.WELCOME_GUIDE} icon={HelpCircle} label="User Guide" />
            <NavItem view={View.CONTACT} icon={Mail} label="Contact Team" />
            
            <div className="pt-2">
              <a 
                href="https://wingmentorapp.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <ExternalLink size={20} />
                <span className="font-medium text-sm">Official Website</span>
              </a>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-200">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center space-x-3 text-slate-500 hover:text-red-600 transition-colors w-full px-4 py-2"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-8rem)]">
             {activeView === View.DASHBOARD && (
               <Dashboard 
                 onNavigate={(view) => setActiveView(view)} 
               />
             )}
             {activeView === View.PROGRESS && (
               <ProgramProgress 
                 connected={jotFormConnected} 
                 onConnect={() => setJotFormConnected(true)} 
               />
             )}
             {activeView === View.HANDBOOK && <Handbook />}
             {activeView === View.LOGS && <ProgramLogsEmbed />}
             {activeView === View.VERIFIED_LOGS && <LogsTable logs={logs} verified={true} />}
             {activeView === View.TOOLS && <PilotTools />}
             {activeView === View.CONTACT && <ContactForm />}
             {activeView === View.PILOT_APPS && <PilotApps />}
             {activeView === View.MENTOR_TOOLS && <MentorTools />}
             {activeView === View.WELCOME_GUIDE && <WelcomeGuide onNavigate={setActiveView} />}
          </div>
          
          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 py-6 px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                 <img src={LOGO_URL} alt="WingMentor" className="h-6 object-contain" />
                 <span className="text-sm font-semibold text-slate-600">WingMentor</span>
              </div>
              <p className="text-slate-400 text-xs">
                © {new Date().getFullYear()} WingMentor Inc. All rights reserved. Flight data for simulation only.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;