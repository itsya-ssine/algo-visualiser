
import React from 'react';
import VisualizationArea from './VisualizationArea';
import AlgorithmInsight from './AlgorithmInsight';
import { Snapshot } from '../types';

interface ContentAreaProps {
  snapshot: Snapshot;
  algorithmId: string;
  algorithmDescription: string;
  timeComplexity: string;
  spaceComplexity: string;
  snapshotDescription: string;
  onViewCode: () => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  snapshot,
  algorithmId,
  algorithmDescription,
  timeComplexity,
  spaceComplexity,
  snapshotDescription,
  onViewCode
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden p-3 lg:p-6 gap-3 lg:gap-6">
      <VisualizationArea
        snapshot={snapshot}
        algorithmId={algorithmId}
        description={snapshotDescription}
      />
      <AlgorithmInsight 
        description={algorithmDescription} 
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
        onViewCode={onViewCode} 
      />
    </div>
  );
};

export default ContentArea;
