
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-3 lg:p-4 bg-zinc-900 border-t border-zinc-800 shadow-2xl shrink-0">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Playback Buttons */}
        <div className="flex items-center justify-center gap-2 lg:gap-3 order-2 lg:order-1">
          <button
            onClick={onReset}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Reset"
          >
            {/* Fix: Removed invalid lg:size prop which caused TypeScript errors */}
            <RotateCcw size={20} />
          </button>
          <button
            onClick={onStepBackward}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Step Back"
          >
            {/* Fix: Removed invalid lg:size prop which caused TypeScript errors */}
            <SkipBack size={20} />
          </button>
          <button
            onClick={onTogglePlay}
            className={`p-2.5 lg:p-3 rounded-full ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white shadow-lg transition-all transform active:scale-95`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {/* Fix: Removed invalid lg:size prop which caused TypeScript errors */}
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
          </button>
          <button
            onClick={onStepForward}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Step Forward"
          >
            {/* Fix: Removed invalid lg:size prop which caused TypeScript errors */}
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Slider */}
        <div className="flex-1 w-full lg:max-w-md lg:mx-8 order-1 lg:order-2">
          <div className="flex justify-between text-[10px] lg:text-xs text-zinc-500 mb-1.5 font-medium">
            <span>Step {currentStep + 1} / {totalSteps}</span>
            <span>{Math.round((currentStep / (Math.max(1, totalSteps - 1))) * 100)}%</span>
          </div>
          <div className="relative group">
            <input
              type="range"
              min="0"
              max={Math.max(0, totalSteps - 1)}
              value={currentStep}
              onChange={() => {}} // Could add logic for jumping to step
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center justify-end lg:w-auto order-3">
          <div className="flex items-center gap-2 bg-zinc-800 px-2 lg:px-3 py-1.5 rounded-lg border border-zinc-700">
            <FastForward size={14} className="text-zinc-500 hidden sm:block" />
            <select
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="bg-transparent text-[10px] lg:text-sm font-bold outline-none cursor-pointer text-zinc-300"
            >
              <option value={1000}>0.5x</option>
              <option value={500}>1.0x</option>
              <option value={200}>2.0x</option>
              <option value={50}>4.0x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
