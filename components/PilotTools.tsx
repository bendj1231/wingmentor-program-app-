import React, { useState } from 'react';
import { CloudRain, Wind, Calculator, MessageSquare, Send, Bot, Plane } from 'lucide-react';
import { askWingman } from '../services/geminiService';

const PilotTools: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Welcome to the Cockpit. I'm Wingman, your AI assistant. How can I help with your flight planning or studies today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await askWingman(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'ai', content: "System malfunction. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Pilot Tools</h2>
        <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-full font-semibold">Gemini AI Integrated</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Tools Grid */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100">
                <Wind size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">METAR/TAF Decoder</h3>
                <p className="text-xs text-slate-500">Get current weather data</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">E6B Calculator</h3>
                <p className="text-xs text-slate-500">Fuel, time, and distance</p>
              </div>
            </div>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100">
                <Plane size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Weight & Balance</h3>
                <p className="text-xs text-slate-500">Cessna 172S Config</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 flex items-center space-x-2 bg-slate-50 rounded-t-xl">
            <Bot className="text-sky-600" />
            <h3 className="font-semibold text-slate-800">Wingman AI Assistant</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user' 
                    ? 'bg-sky-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-500 rounded-lg p-3 rounded-bl-none shadow-sm flex items-center space-x-2">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl">
            <div className="flex space-x-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about regulations, maneuvers, or checklists..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={loading || !chatInput.trim()}
                className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotTools;
