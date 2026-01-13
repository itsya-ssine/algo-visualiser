import React from 'react';
import VisualizationArea from './VisualizationArea';
import AlgorithmInsight from './AlgorithmInsight';
import { Snapshot } from '../types';

interface ContentAreaProps {
  snapshot: Snapshot;
  algorithmId: string;
  algorithmDescription: string;
  snapshotDescription: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  snapshot,
  algorithmId,
  algorithmDescription,
  snapshotDescription
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden p-3 lg:p-6 gap-3 lg:gap-6">
      <VisualizationArea
        snapshot={snapshot}
        algorithmId={algorithmId}
        description={snapshotDescription}
      />
      <AlgorithmInsight description={algorithmDescription} />
    </div>
  );
};

export default ContentArea;
