import React from 'react';

interface LoadingScreenProps {
  logoUrl: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700">
      <div className="animate-pulse flex flex-col items-center">
        <img 
          src={logoUrl} 
          alt="WingMentor Logo" 
          className="w-32 h-32 object-contain mb-8"
        />
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="mt-4 text-slate-400 text-sm font-medium tracking-widest uppercase">Preparing for Takeoff</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
