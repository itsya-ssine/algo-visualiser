import React from 'react';
import { Layers, Search, Share2, Box, Cpu, ChevronRight, GraduationCap } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  const features = [
    { icon: <Layers className="text-indigo-400" />, title: "Sorting", desc: "Visualize how sorting works." },
    { icon: <Search className="text-purple-400" />, title: "Searching", desc: "Master the art of efficiency." },
    { icon: <Share2 className="text-cyan-400" />, title: "Graph", desc: "Traverse complex networks." },
    { icon: <Box className="text-emerald-400" />, title: "Geometry", desc: "Compute hulls." },
    { icon: <Cpu className="text-orange-400" />, title: "Recursion", desc: "Trace logic step-by-step." }
  ];

  return (
    <div className="min-h-dvh w-full bg-zinc-950 flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="max-w-6xl w-full flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <GraduationCap size={16} />
            <span>Educational Visualizer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 sm:mb-12 tracking-tight leading-[1.1]">
            Master Algorithms <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Step by Step
            </span>
          </h1>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 hover:bg-indigo-700 mb-16 sm:mb-24 shadow-xl shadow-indigo-600/20 text-lg"
          >
            Explore Visualizer
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-2xl text-left hover:border-zinc-600 transition-all hover:bg-zinc-900/80 group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg sm:text-base mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm sm:text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <footer className="w-full py-8 border-t border-zinc-900/50 bg-zinc-950 text-center">
        <p className="text-zinc-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4">
          Designed for Students &middot; ENSAKH-ALGO &middot; Yassine Elmajdoubi
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;