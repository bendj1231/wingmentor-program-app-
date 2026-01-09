import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  logoUrl: string;
  userName?: string;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoUrl, userName, onComplete }) => {
  const [stage, setStage] = useState<'whiteout' | 'text-in' | 'text-out' | 'finished'>('whiteout');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sequence Timeline
    
    // 1. Start Whiteout (0ms)
    const timer1 = setTimeout(() => setStage('text-in'), 500);

    // 2. Progress Bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    // 3. Text Fade Out (2500ms)
    const timer2 = setTimeout(() => setStage('text-out'), 3500);

    // 4. Complete / Materialize App (4000ms)
    const timer3 = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out ${stage === 'whiteout' ? 'bg-white' : 'bg-slate-50'}`}>
      
      {/* Content Container */}
      <div className={`flex flex-col items-center transition-all duration-1000 transform ${
        stage === 'text-in' ? 'opacity-100 blur-0 scale-100' : 
        stage === 'text-out' ? 'opacity-0 blur-lg scale-110' : 
        'opacity-0 blur-xl scale-95'
      }`}>
        
        {/* Logo (Subtle) */}
        <img 
          src={logoUrl} 
          alt="WingMentor" 
          className="w-20 h-20 object-contain mb-8 opacity-80 grayscale"
        />

        {/* Main Text */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4 text-center">
          WELCOME, <br/>
          <span className="text-sky-600 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-800">FELLOW PILOT</span>
        </h1>

        {/* Subtext */}
        {userName && (
          <p className="text-xl text-slate-500 font-mono tracking-widest uppercase mb-12">
            ID: {userName}
          </p>
        )}

        {/* Futuristic Loader */}
        <div className="w-64 md:w-96 space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400 uppercase">
            <span>System Initialization</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-600 shadow-[0_0_10px_rgba(2,132,199,0.5)] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-300">
            <span>Loading Modules...</span>
            <span className="animate-pulse">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;