
import React from 'react';
import { Terminal, Code2, Clock, Database } from 'lucide-react';

interface AlgorithmInsightProps {
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  onViewCode: () => void;
}

const AlgorithmInsight: React.FC<AlgorithmInsightProps> = ({ description, timeComplexity, spaceComplexity, onViewCode }) => {
  return (
    <div className="flex-1 min-h-[100px] lg:min-h-[100px] bg-zinc-900/40 border border-zinc-800 rounded-xl lg:rounded-2xl p-3 lg:p-4 overflow-hidden flex flex-col lg:flex-row lg:items-center gap-4 shadow-xl shrink-0">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 mb-1 lg:mb-1.5 text-zinc-500">
          <Terminal size={14} />
          <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">Algorithm Insight</span>
        </div>
        <p className="text-[11px] lg:text-xs text-zinc-400 leading-relaxed truncate pr-2">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <div className="flex items-center gap-4 bg-zinc-950/50 px-4 py-2 rounded-xl border border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter leading-none mb-0.5">Time</span>
              <span className="text-xs font-mono font-bold text-indigo-300 leading-none">{timeComplexity}</span>
            </div>
          </div>
          <div className="w-px h-6 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Database size={12} className="text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter leading-none mb-0.5">Space</span>
              <span className="text-xs font-mono font-bold text-cyan-300 leading-none">{spaceComplexity}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onViewCode}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20 whitespace-nowrap"
        >
          <Code2 size={16} />
          View Code
        </button>
      </div>
    </div>
  );
};

export default AlgorithmInsight;
