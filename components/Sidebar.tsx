
import React from 'react';
import { ALGORITHMS } from '../constants';
import { Algorithm, AlgorithmCategory } from '../types';
import { Terminal, Search, Share2, Layers, Cpu, Box, RotateCcw, Github, Instagram } from 'lucide-react';

interface SidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategoryIcon: React.FC<{ category: AlgorithmCategory }> = ({ category }) => {
  switch (category) {
    case 'Sorting': return <Layers size={18} />;
    case 'Searching': return <Search size={18} />;
    case 'Graph': return <Share2 size={18} />;
    case 'Math': return <Terminal size={18} />;
    case 'Geometry': return <Box size={18} />;
    case 'Backtracking': return <RotateCcw size={18} />;
    case 'Dynamic Programming': return <Cpu size={18} />;
    default: return <Cpu size={18} />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ selectedId, onSelect }) => {
  const categories: AlgorithmCategory[] = ['Sorting', 'Searching', 'Graph', 'Math', 'Geometry', 'Backtracking', 'Dynamic Programming'];

  return (
    <div className="w-72 lg:w-72 h-full bg-zinc-900 border-r border-zinc-800 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ENSAKH-ALGO
          </h1>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold">By Elmajdoubi Yassine</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {categories.map((cat) => {
          const algos = ALGORITHMS.filter(a => a.category === cat);
          if (algos.length === 0) return null;

          return (
            <div key={cat} className="mb-6 px-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2 px-2">
                <CategoryIcon category={cat} />
                <h2 className="text-[10px] font-bold uppercase tracking-widest">{cat}</h2>
              </div>
              <div className="space-y-1">
                {algos.map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => onSelect(algo.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 group ${
                      selectedId === algo.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-transform ${selectedId === algo.id ? 'bg-white scale-125' : 'bg-zinc-700 group-hover:scale-125'}`} />
                    <span className="truncate">{algo.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/itsya-ssine"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.instagram.com/0x_naoki?igsh=cGN5ejZpYmszMjR2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
