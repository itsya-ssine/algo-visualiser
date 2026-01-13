import React, { useState } from 'react';
import Header from './components/Header';
import SidebarDrawer from './components/SidebarDrawer';
import ContentArea from './components/ContentArea';
import Controls from './components/Controls';
import MobileSidebarOverlay from './components/MobileSidebarOverlay';
import { useAlgorithmState } from './hooks/useAlgorithmState';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    selectedAlgoId,
    setSelectedAlgoId,
    selectedAlgo,
    currentSnapshot,
    isPlaying,
    togglePlay,
    playbackSpeed,
    setPlaybackSpeed,
    stepForward,
    stepBackward,
    initAlgorithm,
    currentStep,
    snapshots
  } = useAlgorithmState();

  const handleSelectAlgo = (id: string) => {
    setSelectedAlgoId(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex bg-zinc-950 overflow-hidden text-zinc-100 flex-col lg:flex-row h-dvh">
      <MobileSidebarOverlay isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <SidebarDrawer
        isOpen={isSidebarOpen}
        selectedId={selectedAlgoId}
        onSelect={handleSelectAlgo}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full">
        <Header
          algorithmName={selectedAlgo.name}
          onMenuClick={() => setIsSidebarOpen(true)}
          onNewInput={initAlgorithm}
        />

        <ContentArea
          snapshot={currentSnapshot}
          algorithmId={selectedAlgoId}
          algorithmDescription={selectedAlgo.description}
          snapshotDescription={currentSnapshot.description}
        />

        <Controls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onReset={initAlgorithm}
          speed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed}
          currentStep={currentStep}
          totalSteps={snapshots.length}
        />
      </main>
    </div>
  );
};

export default App;
