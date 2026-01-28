
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import WelcomePage from './components/Home';
import CodeModal from './components/CodeModal';
import { ALGORITHMS } from './constants';
import { Snapshot, Point } from './types';
import { generateSnapshots } from './services/algorithmGenerator';
import { Info, Terminal, Settings, Menu, Code2 } from 'lucide-react';
import AlgorithmInsight from './components/AlgorithmInsight';

const INITIAL_ARRAY_SIZE = 12;
const INITIAL_POINTS_SIZE = 15;

const generateRandomArray = (size: number) => Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10);

const generateRandomPoints = (size: number): Point[] => {
  return Array.from({ length: size }, () => ({
    x: Math.random() * 450 + 75,
    y: Math.random() * 250 + 75,
    state: 'default'
  }));
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [selectedAlgoId, setSelectedAlgoId] = useState(ALGORITHMS[0].id);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const selectedAlgo = ALGORITHMS.find(a => a.id === selectedAlgoId)!;
  const currentSnapshot = snapshots[currentStep] || { type: 'array', data: [], currentLine: 0, description: 'Loading...' };

  const timerRef = useRef<number | null>(null);

  const initAlgorithm = useCallback(() => {
    let input: any;
    if (selectedAlgo.category === 'Sorting' || selectedAlgo.id === 'binary-search') {
      input = generateRandomArray(INITIAL_ARRAY_SIZE);
    } else if (selectedAlgo.category === 'Geometry') {
      input = generateRandomPoints(INITIAL_POINTS_SIZE);
    } else {
      input = {}; 
    }
    
    const generated = generateSnapshots(selectedAlgoId, input);
    setSnapshots(generated);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedAlgoId, selectedAlgo.category]);

  useEffect(() => {
    if (!showWelcome) {
      initAlgorithm();
    }
  }, [initAlgorithm, showWelcome]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const stepForward = useCallback(() => {
    setCurrentStep(prev => {
      if (prev >= snapshots.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [snapshots.length]);

  const stepBackward = () => setCurrentStep(prev => Math.max(0, prev - 1));

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(stepForward, playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, stepForward, playbackSpeed]);

  const handleSelectAlgo = (id: string) => {
    setSelectedAlgoId(id);
    setIsSidebarOpen(false);
  };

  if (showWelcome) {
    return <WelcomePage onStart={() => setShowWelcome(false)} />;
  }

  return (
    <div className="flex h-dvh bg-zinc-950 overflow-hidden text-zinc-100 flex-col lg:flex-row">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar selectedId={selectedAlgoId} onSelect={handleSelectAlgo} />
      </div>
      
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 bg-zinc-900/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 lg:hidden text-zinc-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-sm lg:text-lg truncate max-w-[150px] lg:max-w-none">{selectedAlgo.name}</h2>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Active</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCodeModalOpen(true)}
              className="hidden sm:flex px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 rounded-lg text-xs font-bold transition-colors items-center gap-2 shrink-0"
            >
              <Code2 size={14} /> View Code
            </button>
            <button onClick={initAlgorithm} className="px-2 lg:px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shrink-0">
              <Settings size={14} /> <span className="hidden sm:inline">New Input</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden p-3 lg:p-6 gap-3 lg:gap-6">
          <div className="flex-[3] bg-zinc-900/40 border border-zinc-800 rounded-xl lg:rounded-2xl relative overflow-hidden flex flex-col shadow-2xl">
            <div className="flex-1 min-h-[300px] lg:min-h-0 relative p-4 lg:p-8">
              <Visualizer snapshot={currentSnapshot} algorithmId={selectedAlgoId} />
            </div>
            <div className="h-auto min-h-[48px] bg-zinc-800/50 border-t border-zinc-800 flex items-center px-4 py-2 shrink-0">
              <div className="flex items-start lg:items-center gap-2 text-xs text-zinc-200">
                <div className="p-1 bg-indigo-500/20 rounded">
                  <Info size={14} className="text-indigo-400 shrink-0" />
                </div>
                <span className="font-medium leading-tight">{currentSnapshot.description}</span>
              </div>
            </div>
          </div>

          <AlgorithmInsight 
            description={selectedAlgo.description} 
            timeComplexity={selectedAlgo.timeComplexity}
            spaceComplexity={selectedAlgo.spaceComplexity}
            onViewCode={() => setIsCodeModalOpen(true)} 
          />
        </div>

        <Controls
          isPlaying={isPlaying} onTogglePlay={togglePlay}
          onStepForward={stepForward} onStepBackward={stepBackward}
          onReset={initAlgorithm} speed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed} currentStep={currentStep}
          totalSteps={snapshots.length}
        />
      </main>

      <CodeModal 
        isOpen={isCodeModalOpen} 
        onClose={() => setIsCodeModalOpen(false)}
        algorithmName={selectedAlgo.name}
        codeVariants={selectedAlgo.codeVariants}
      />
    </div>
  );
};

export default App;
