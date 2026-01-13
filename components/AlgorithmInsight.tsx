import React from 'react';
import { Terminal } from 'lucide-react';

interface AlgorithmInsightProps {
  description: string;
}

const AlgorithmInsight: React.FC<AlgorithmInsightProps> = ({ description }) => {
  return (
    <div className="flex-1 min-h-[80px] max-h-[120px] lg:max-h-[60px] bg-zinc-900/40 border border-zinc-800 rounded-xl lg:rounded-2xl p-3 lg:p-4 overflow-hidden flex flex-col shadow-xl shrink-0">
      <div className="flex items-center gap-2 mb-1.5 lg:mb-2 text-zinc-500">
        <Terminal size={14} />
        <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">Algorithm Insight</span>
      </div>
      <p className="text-[11px] lg:text-xs text-zinc-400 leading-relaxed overflow-y-auto pr-2">
        {description}
      </p>
    </div>
  );
};

export default AlgorithmInsight;
