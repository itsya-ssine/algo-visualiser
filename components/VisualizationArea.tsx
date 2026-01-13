import React from 'react';
import { Info } from 'lucide-react';
import Visualizer from './Visualizer';
import { Snapshot } from '../types';

interface VisualizationAreaProps {
  snapshot: Snapshot;
  algorithmId: string;
  description: string;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ snapshot, algorithmId, description }) => {
  return (
    <div className="flex-[3] bg-zinc-900/40 border border-zinc-800 rounded-xl lg:rounded-2xl relative overflow-hidden flex flex-col shadow-2xl">
      <div className="flex-1 min-h-[300px] lg:min-h-0 relative p-4 lg:p-8">
        <Visualizer snapshot={snapshot} algorithmId={algorithmId} />
      </div>
      <div className="h-auto min-h-[48px] bg-zinc-800/50 border-t border-zinc-800 flex items-center px-4 py-2 shrink-0">
        <div className="flex items-start lg:items-center gap-2 text-xs text-zinc-200">
          <Info size={14} className="text-indigo-400 mt-0.5 lg:mt-0 shrink-0" />
          <span className="font-medium leading-tight">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default VisualizationArea;
