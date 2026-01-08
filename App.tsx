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
  Plus
} from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import PilotTools from './components/PilotTools';
import { View, ProgramLogEntry } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// --- Components ---

const ContactForm = () => (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-fadeIn">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact WingMentor</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
        <select className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white">
          <option>General Inquiry</option>
          <option>Technical Support</option>
          <option>Program Billing</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <textarea rows={4} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
      </div>
      <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium">Send Message</button>
    </form>
  </div>
);

const ProgramProgress = () => {
  const data = [
    { name: 'Week 1', hours: 2, target: 3 },
    { name: 'Week 2', hours: 5, target: 6 },
    { name: 'Week 3', hours: 8, target: 9 },
    { name: 'Week 4', hours: 14, target: 12 },
    { name: 'Week 5', hours: 18, target: 15 },
    { name: 'Week 6', hours: 25, target: 20 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800">Program Progress</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-700 mb-6">Flight Hours vs Target</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="hours" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorHours)" strokeWidth={2} />
              <Area type="monotone" dataKey="target" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// New Log Modal Component
const NewLogModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (log: any) => void }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    personName: '',
    description: '',
    duration: '',
    signature: '',
    isWingMentor: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isWingMentor: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
       date: new Date().toISOString().split('T')[0],
       personName: '',
       description: '',
       duration: '',
       signature: '',
       isWingMentor: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
           <h3 className="text-xl font-bold text-slate-800">New Program Log Entry</h3>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
               <input 
                 type="date" 
                 name="date"
                 value={formData.date}
                 onChange={handleChange}
                 required
                 className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm" 
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Hrs)</label>
               <input 
                 type="number" 
                 name="duration"
                 step="0.1"
                 value={formData.duration}
                 onChange={handleChange}
                 required
                 placeholder="e.g. 1.5"
                 className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm" 
               />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Name of Person</label>
             <input 
               type="text" 
               name="personName"
               value={formData.personName}
               onChange={handleChange}
               required
               placeholder="Instructor or Student Name"
               className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm" 
             />
           </div>

           <div className="flex items-center space-x-2">
             <input 
                type="checkbox" 
                id="isWingMentor"
                name="isWingMentor"
                checked={formData.isWingMentor}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
             />
             <label htmlFor="isWingMentor" className="text-sm text-slate-700 select-none">
               This person is part of the WingMentor Program
             </label>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Description of Support</label>
             <textarea 
               name="description"
               value={formData.description}
               onChange={handleChange}
               required
               rows={3}
               placeholder="Details of training or support provided..."
               className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm" 
             ></textarea>
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Signature</label>
             <input 
               type="text" 
               name="signature"
               value={formData.signature}
               onChange={handleChange}
               required
               placeholder="Type full name to sign"
               className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm font-serif italic text-slate-600 bg-slate-50" 
             />
             <p className="text-xs text-slate-400 mt-1">By typing your name you agree this log is accurate.</p>
           </div>

           <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Cancel</button>
             <button type="submit" className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-medium shadow-sm transition-colors">Save Entry</button>
           </div>
        </form>
      </div>
    </div>
  );
};

const LogsTable = ({ logs, verified = false, onAddClick }: { logs: ProgramLogEntry[], verified: boolean, onAddClick?: () => void }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">{verified ? 'Verified Logs' : 'Program Logs'}</h2>
      {!verified && (
        <button 
          onClick={onAddClick}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium flex items-center space-x-2 shadow-sm"
        >
          <Plus size={16} />
          <span>New Entry</span>
        </button>
      )}
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
                No logs found. {verified ? "" : "Create a new entry to get started."}
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
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  
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

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddLog = (data: any) => {
    const newLog: ProgramLogEntry = {
      id: Date.now().toString(),
      date: data.date,
      personName: data.personName,
      description: data.description,
      duration: data.duration,
      signature: data.signature,
      isWingMentor: data.isWingMentor,
      status: 'Pending'
    };
    setLogs([newLog, ...logs]);
    setIsLogModalOpen(false);
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

  if (loading) {
    return <LoadingScreen logoUrl={LOGO_URL} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NewLogModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)} 
        onSave={handleAddLog} 
      />

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 px-4 md:px-6 flex items-center justify-between shadow-sm">
        
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
          fixed md:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col pt-16 md:pt-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem view={View.PROGRESS} icon={LineChart} label="Current Progress" />
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resources</p>
            </div>
            <NavItem view={View.HANDBOOK} icon={BookOpen} label="Operating Handbook" />
            <NavItem view={View.TOOLS} icon={Wrench} label="Pilot Tools" />
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Logbook</p>
            </div>
            <NavItem view={View.LOGS} icon={FileText} label="Program Logs" />
            <NavItem view={View.VERIFIED_LOGS} icon={CheckCircle} label="Verified Logs" />
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Support</p>
            </div>
            <NavItem view={View.CONTACT} icon={Mail} label="Contact Team" />
          </div>
          
          <div className="p-4 border-t border-slate-200">
            <button className="flex items-center space-x-3 text-slate-500 hover:text-red-600 transition-colors w-full px-4 py-2">
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-10 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-8rem)]">
             {activeView === View.DASHBOARD && <Dashboard />}
             {activeView === View.PROGRESS && <ProgramProgress />}
             {activeView === View.HANDBOOK && <Handbook />}
             {activeView === View.LOGS && <LogsTable logs={logs} verified={false} onAddClick={() => setIsLogModalOpen(true)} />}
             {activeView === View.VERIFIED_LOGS && <LogsTable logs={logs} verified={true} />}
             {activeView === View.TOOLS && <PilotTools />}
             {activeView === View.CONTACT && <ContactForm />}
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