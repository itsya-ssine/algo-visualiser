import { useState, useEffect, useCallback, useRef } from 'react';
import { ALGORITHMS } from '../constants';
import { Snapshot, Point } from '../types';
import { generateSnapshots } from '../services/algorithmGenerator';

const INITIAL_ARRAY_SIZE = 12;
const INITIAL_POINTS_SIZE = 15;

export const useAlgorithmState = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState(ALGORITHMS[0].id);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  const selectedAlgo = ALGORITHMS.find(a => a.id === selectedAlgoId)!;
  const currentSnapshot = snapshots[currentStep] || {
    type: 'array',
    data: [],
    currentLine: 0,
    description: 'Loading...'
  };

  const timerRef = useRef<number | null>(null);

  const generateRandomArray = (size: number) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10);

  const generateRandomPoints = (size: number): Point[] =>
    Array.from({ length: size }, () => ({
      x: Math.random() * 450 + 75,
      y: Math.random() * 250 + 75,
      state: 'default'
    }));

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
    initAlgorithm();
  }, [initAlgorithm]);

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
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, stepForward, playbackSpeed]);

  return {
    selectedAlgoId,
    setSelectedAlgoId,
    selectedAlgo,
    snapshots,
    currentStep,
    currentSnapshot,
    isPlaying,
    togglePlay,
    playbackSpeed,
    setPlaybackSpeed,
    stepForward,
    stepBackward,
    initAlgorithm
  };
};
