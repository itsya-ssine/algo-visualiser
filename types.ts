
export type AlgorithmCategory = 'Sorting' | 'Searching' | 'Graph' | 'Geometry' | 'Math' | 'Backtracking' | 'Dynamic Programming';

export interface CodeVariants {
  js: string;
  python: string;
  cpp: string;
  java: string;
}

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  codeVariants: CodeVariants;
  timeComplexity: string;
  spaceComplexity: string;
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

export interface TreeNode {
  id: number;
  value: string | number;
  state: 'default' | 'active' | 'highlight' | 'sorted';
}

export interface Snapshot {
  type: 'array' | 'graph' | 'grid' | 'matrix' | 'points' | 'math' | 'tree' | 'merge';
  data: any;
  activeIndices?: number[];
  minIndices?: number[];
  markers?: { [key: string]: any };
  currentLine: number;
  description: string;
  graphState?: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  points?: Point[];
  treeState?: TreeNode[];
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
