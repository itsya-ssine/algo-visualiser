
export type AlgorithmCategory = 'Sorting' | 'Searching' | 'Graph' | 'Geometry' | 'Math' | 'Backtracking' | 'Dynamic Programming';

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  code: string;
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
  state?: 'unvisited' | 'current' | 'visited' | 'neighbor';
  value?: string | number;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight: number;
  state?: 'default' | 'active' | 'mst' | 'path';
}

export interface Point {
  x: number;
  y: number;
  state?: 'default' | 'active' | 'hull' | 'closest';
}

// Added TreeNode interface to support Tree visualization
export interface TreeNode {
  id: number;
  value: string | number;
  state: 'default' | 'active' | 'highlight' | 'sorted';
}

export interface Snapshot {
  // Updated type union to include 'tree' and 'merge' for extended visualization support
  type: 'array' | 'graph' | 'grid' | 'matrix' | 'points' | 'math' | 'tree' | 'merge';
  data: any;
  activeIndices?: number[];
  // Added minIndices to fix property access errors in sorting algorithm generation
  minIndices?: number[];
  markers?: { [key: string]: any };
  currentLine: number;
  description: string;
  graphState?: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  points?: Point[];
  // Added treeState to fix property access errors in tree visualization components
  treeState?: TreeNode[];
  // Added mergeState to fix property access errors in merge sort visualization components
  mergeState?: { nodes: MergeNode[]; array: number[] };
}

export interface VisualizationState {
  snapshots: Snapshot[];
  currentStep: number;
  isPlaying: boolean;
  playbackSpeed: number;
}

export interface MergeNode {
  id: number;
  left: number;
  right: number;
  level: number;
  state?: 'dividing' | 'merging' | 'completed';
}
