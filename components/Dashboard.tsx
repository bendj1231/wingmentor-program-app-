import React, { useState, useEffect } from 'react';
import { Bell, ArrowRight, Database, Users, ClipboardList, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const apps = [
    {
      id: 'blackbox',
      title: "Knowledge Database",
      subtitle: "Blackbox App",
      description: "Access the comprehensive aviation knowledge base. Analyze incident reports, review safety data, and enhance your decision-making skills.",
      image: "https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?auto=format&fit=crop&q=80&w=2000",
      color: "text-emerald-400",
      btnColor: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25",
      icon: Database
    },
    {
      id: 'forum',
      title: "The Pilot Gap Forum",
      subtitle: "Community Hub",
      description: "Connect with mentors and cadets. Discuss career strategies, share flight experiences, and build your professional network in our secure hangar.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000",
      color: "text-sky-400",
      btnColor: "bg-sky-500 hover:bg-sky-600 shadow-sky-500/25",
      icon: Users
    },
    {
      id: 'exam',
      title: "Examination Terminal",
      subtitle: "Testing Center",
      description: "Validate your knowledge with rigorous mock exams, technical questionnaires, and type-rating preparation modules to ensure you are checkride ready.",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=2000",
      color: "text-amber-400",
      btnColor: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/25",
      icon: ClipboardList
    },
    {
      id: 'sim',
      title: "The Simulator Room",
      subtitle: "Flight Training",
      description: "Master IFR maneuvers, practice emergency procedures, and refine your instrument scan in our high-fidelity virtual environment.",
      image: "https://images.unsplash.com/photo-1483304528321-0674f0040030?auto=format&fit=crop&q=80&w=2000",
      color: "text-indigo-400",
      btnColor: "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/25",
      icon: Plane
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % apps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [apps.length]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % apps.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + apps.length) % apps.length);
  };

  // Touch handlers for Swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swiped left, show next slide
      setCurrentSlide((prev) => (prev + 1) % apps.length);
    }

    if (isRightSwipe) {
      // Swiped right, show previous slide
      setCurrentSlide((prev) => (prev - 1 + apps.length) % apps.length);
    }
  };

  const getCardStyle = (index: number) => {
    const total = apps.length;
    let offset = (index - currentSlide + total) % total;
    if (offset > total / 2) offset -= total;

    const isActive = offset === 0;
    
    return {
      position: 'absolute' as const,
      width: '85%',
      height: '100%',
      left: '7.5%',
      top: 0,
      transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
      transformStyle: 'preserve-3d' as const,
      zIndex: isActive ? 20 : 10,
      opacity: Math.abs(offset) > 1 ? 0 : (isActive ? 1 : 0.4),
      transform: `translateX(${offset * 105}%) scale(${isActive ? 1 : 0.85}) rotateY(${offset * -25}deg) translateZ(${isActive ? 0 : -50}px)`,
      cursor: isActive ? 'default' : 'pointer',
      pointerEvents: (Math.abs(offset) > 1 ? 'none' : 'auto') as any,
    };
  };

  const newsItems = [
    {
      id: 1,
      title: "New IFR Simulator Added",
      date: "2 hours ago",
      category: "Desktop App Update",
      summary: "Experience the new IFR training module on the WingMentor Desktop App. Learn the foundations of IFR maneuvers and master chart interpretation."
    },
    {
      id: 2,
      title: "WingMentor Community Webinar",
      date: "1 day ago",
      category: "Event",
      summary: "Join us this Friday for a deep dive into advanced meteorology with Captain Stevenson."
    },
    {
      id: 3,
      title: "Maintenance Notice: Server Upgrades",
      date: "2 days ago",
      category: "System",
      summary: "Brief downtime expected on Sunday 0200Z for database improvements."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mission Control</h1>
          <p className="text-slate-500">Welcome back, Captain Richardson.</p>
        </div>
        <div className="text-sm text-slate-400 hidden md:block">
           {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* 3D App Carousel Section */}
      <div 
        className="relative h-[450px] w-full touch-pan-y" 
        style={{ perspective: '1200px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
         {apps.map((app, index) => {
           const Icon = app.icon;
           const isActive = index === currentSlide;
           
           return (
             <div 
               key={app.id}
               style={getCardStyle(index)}
               onClick={() => !isActive && setCurrentSlide(index)}
               className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700/50"
             >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover opacity-50 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                  {/* Additional futuristic overlay */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>

                {/* Content */}
                <div 
                  className={`relative z-10 p-8 md:p-12 h-full flex flex-col justify-center max-w-3xl transition-opacity duration-500 ${isActive ? 'opacity-100 delay-200' : 'opacity-0'}`}
                >
                  <div className={`flex items-center space-x-2 mb-4 font-mono ${app.color}`}>
                    <Icon size={20} />
                    <span className="text-sm tracking-widest uppercase font-bold">{app.subtitle}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">{app.title}</h2>
                  
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
                    {app.description}
                  </p>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(View.PILOT_APPS);
                    }}
                    className={`self-start flex items-center space-x-3 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-1 ${app.btnColor}`}
                  >
                    <span>Launch App</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
             </div>
           );
         })}

         {/* Navigation Controls (Floating) */}
         <div className="absolute right-12 bottom-12 flex space-x-3 z-30 pointer-events-auto">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-colors shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-colors shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
         </div>

         {/* Indicators */}
         <div className="absolute left-12 bottom-12 flex space-x-2 z-30">
            {apps.map((_, index) => (
              <div 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              ></div>
            ))}
         </div>
      </div>

      {/* News Feed Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell size={24} className="text-sky-600" />
            Program News
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                {item.summary}
              </p>
              <button className="text-sky-600 text-sm font-semibold hover:text-sky-700 flex items-center gap-1 mt-auto">
                Read Updates <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;