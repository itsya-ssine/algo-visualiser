import React from 'react';
import { Layers, Search, Share2, Box, Cpu, ChevronRight, GraduationCap } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  const features = [
    { icon: <Layers className="text-indigo-400" />, title: "Sorting", desc: "Visualize how data finds its order." },
    { icon: <Search className="text-purple-400" />, title: "Searching", desc: "Master the art of efficiency." },
    { icon: <Share2 className="text-cyan-400" />, title: "Graph Theory", desc: "Traverse complex networks." },
    { icon: <Box className="text-emerald-400" />, title: "Geometry", desc: "Compute hulls and closest pairs." },
    { icon: <Cpu className="text-orange-400" />, title: "Recursion", desc: "Trace logic step-by-step." }
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col justify-between relative p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-5xl w-full flex flex-col items-center z-10 text-center px-2 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 sm:mb-8 animate-fade-in">
          <GraduationCap size={16} />
          <span>Educational Visualizer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-10 sm:mb-16 tracking-tight leading-tight">
          Master Algorithms <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Step by Step
          </span>
        </h1>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-indigo-700 mb-10 sm:mb-16 shadow-xl shadow-indigo-600/20 text-base sm:text-lg"
        >
          Explore Visualizer
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 p-5 sm:p-6 rounded-2xl text-left hover:border-zinc-700 transition-colors"
            >
              <div className="mb-3 sm:mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-base sm:text-sm mb-1">{f.title}</h3>
              <p className="text-zinc-500 text-xs sm:text-[10px] leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-zinc-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] w-full text-center px-2 pb-4">
        Designed for Students &middot; ENSAKH-ALGO &middot; Yassine Elmajdoubi
      </footer>
    </div>
  );
};

export default WelcomePage;
