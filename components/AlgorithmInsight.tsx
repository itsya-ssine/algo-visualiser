import React from 'react';
import { Terminal, Code2, Clock, Database } from 'lucide-react';

interface AlgorithmInsightProps {
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  onViewCode: () => void;
}

const AlgorithmInsight: React.FC<AlgorithmInsightProps> = ({ 
  description, 
  timeComplexity, 
  spaceComplexity, 
  onViewCode 
}) => {
  return (
    <div className="flex-1 w-full bg-zinc-900/40 border border-zinc-800 rounded-xl lg:rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl transition-all duration-300">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 text-zinc-500">
          <Terminal size={14} className="shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Algorithm Insight</span>
        </div>
        <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed line-clamp-2 lg:truncate pr-4">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
        <div className="flex items-center justify-around sm:justify-start gap-6 bg-zinc-950/50 px-5 py-3 rounded-xl border border-zinc-800/50">
          <div className="flex items-center gap-3">
            <Clock size={14} className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter leading-none mb-1">Time</span>
              <span className="text-sm font-mono font-bold text-indigo-300 leading-none">{timeComplexity}</span>
            </div>
          </div>
          
          <div className="w-px h-8 bg-zinc-800 hidden sm:block" />
          
          <div className="flex items-center gap-3">
            <Database size={14} className="text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter leading-none mb-1">Space</span>
              <span className="text-sm font-mono font-bold text-cyan-300 leading-none">{spaceComplexity}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onViewCode}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20 whitespace-nowrap"
        >
          <Code2 size={18} />
          <span>View Code</span>
        </button>
      </div>
    </div>
  );
};

export default AlgorithmInsight;
