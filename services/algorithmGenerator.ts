
import { Snapshot, GraphNode, GraphEdge, Point } from '../types';

export const generateSnapshots = (algorithmId: string, inputData: any): Snapshot[] => {
  const snapshots: Snapshot[] = [];

  switch (algorithmId) {
    case 'selection-sort': generateSelectionSort([...inputData], snapshots); break;
    case 'insertion-sort': generateInsertionSort([...inputData], snapshots); break;
    case 'bubble-sort': generateBubbleSort([...inputData], snapshots); break;
    case 'quick-sort': generateQuickSort([...inputData], 0, inputData.length - 1, snapshots); break;
    case 'merge-sort': generateMergeSort([...inputData], snapshots); break;
    case 'heap-sort': generateHeapSort([...inputData], snapshots); break;
    case 'binary-search': generateBinarySearch([...inputData].sort((a, b) => a - b), 52, snapshots); break;
    case 'dijkstra': generateDijkstra(snapshots); break;
    case 'kruskal': generateKruskal(snapshots); break;
    case 'bellman-ford': generateBellmanFord(snapshots); break;
    case 'floyd-warshall': generateFloydWarshall(snapshots); break;
    case 'prim': generatePrim(snapshots); break;
    case 'warshall': generateWarshall(snapshots); break;
    case 'shamos': generateShamos(inputData, snapshots); break;
    case 'quickhull': generateQuickhull(inputData, snapshots); break;
    case 'strassen': generateStrassen(snapshots); break;
    case 'karatsuba': generateKaratsuba(snapshots); break;
    case 'fibonacci': generateFibonacci(8, snapshots); break;
    case 'backtracking': generateNQueens(4, snapshots); break;
    default:
      snapshots.push({ type: 'array', data: inputData, currentLine: 1, description: "Algorithm implementation pending..." });
  }
  return snapshots;
};

// --- SORTING ---

const generateSelectionSort = (arr: number[], snapshots: Snapshot[]) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [j], minIndices: [min], markers: { i, j, min }, currentLine: 3, description: `Scanning for min. Comparing index ${j} with min at ${min}` });
      if (arr[j] < arr[min]) min = j;
    }
    snapshots.push({ type: 'array', data: [...arr], activeIndices: [i], minIndices: [min], markers: { i, min }, currentLine: 4, description: `Found minimum ${arr[min]} at index ${min}` });
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [i, min], markers: { i, min }, currentLine: 5, description: `Swapped! Position ${i} is now sorted` });
    }
  }
};

const generateInsertionSort = (arr: number[], snapshots: Snapshot[]) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    snapshots.push({ type: 'array', data: [...arr], minIndices: [i], markers: { i, j }, currentLine: 2, description: `Extracting key = ${key} from index ${i}` });
    while (j >= 0 && arr[j] > key) {
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [j], minIndices: [i], markers: { i, j }, currentLine: 3, description: `${arr[j]} > ${key}, need to shift` });
      arr[j + 1] = arr[j];
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [j + 1], minIndices: [i], markers: { i, j }, currentLine: 4, description: `Shifted ${arr[j]} right to position ${j + 1}` });
      j--;
    }
    arr[j + 1] = key;
    snapshots.push({ type: 'array', data: [...arr], minIndices: [j + 1], markers: { i, j }, currentLine: 7, description: `Inserted key ${key} at position ${j + 1}` });
  }
};

const generateBubbleSort = (arr: number[], snapshots: Snapshot[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [j, j + 1], markers: { i, j }, currentLine: 3, description: `Compare ${arr[j]} and ${arr[j + 1]}` });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        snapshots.push({ type: 'array', data: [...arr], activeIndices: [j, j + 1], markers: { i, j }, currentLine: 4, description: `Swap!` });
      }
    }
  }
};

const generateQuickSort = (arr: number[], low: number, high: number, snapshots: Snapshot[]) => {
  if (low < high) {
    let pivot = arr[high], i = low - 1;
    snapshots.push({ type: 'array', data: [...arr], minIndices: [high], markers: { i, high, j: high }, currentLine: 1, description: `Selected pivot ${pivot} at index ${high}` });
    for (let j = low; j < high; j++) {
      snapshots.push({ type: 'array', data: [...arr], activeIndices: [j], minIndices: [high], markers: { i, j, high }, currentLine: 2, description: `Comparing ${arr[j]} with pivot ${pivot}` });
      if (arr[j] < pivot) {
        i++;[arr[i], arr[j]] = [arr[j], arr[i]];
        snapshots.push({ type: 'array', data: [...arr], activeIndices: [i, j], minIndices: [high], markers: { i, j, high }, currentLine: 3, description: `${arr[j]} < pivot, swapped to position ${i}` });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    let p = i + 1;
    snapshots.push({ type: 'array', data: [...arr], minIndices: [p], markers: { i: p, high }, currentLine: 5, description: `Pivot ${pivot} placed at final position ${p}` });
    generateQuickSort(arr, low, p - 1, snapshots);
    generateQuickSort(arr, p + 1, high, snapshots);
  }
};

const generateMergeSort = (arr: number[], snapshots: Snapshot[]) => {
  let nodeId = 0;
  const allNodes: any[] = [];

  const merge = (l: number, m: number, r: number) => {
    let L = arr.slice(l, m + 1), R = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    const nodeIdx = allNodes.findIndex(n => n.left === l && n.right === r);
    if (nodeIdx !== -1) {
      allNodes[nodeIdx].state = 'merging';
    }

    snapshots.push({
      type: 'merge',
      data: [...arr],
      mergeState: { nodes: allNodes.map(n => ({ ...n })), array: [...arr] },
      currentLine: 8,
      description: `Merging ranges [${l}...${m}] and [${m + 1}...${r}]`
    });

    while (i < L.length && j < R.length) {
      if (L[i] <= R[j]) {
        arr[k] = L[i++];
      } else {
        arr[k] = R[j++];
      }
      k++;
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];

    if (nodeIdx !== -1) {
      allNodes[nodeIdx].state = 'completed';
    }

    snapshots.push({
      type: 'merge',
      data: [...arr],
      mergeState: { nodes: allNodes.map(n => ({ ...n })), array: [...arr] },
      currentLine: 15,
      description: `Merge complete for range [${l}...${r}]`
    });
  };

  const sort = (l: number, r: number, level: number = 0) => {
    if (l < r) {
      const currentNode: any = {
        id: nodeId++,
        left: l,
        right: r,
        state: 'dividing',
        level: level
      };
      allNodes.push(currentNode);

      snapshots.push({
        type: 'merge',
        data: [...arr],
        mergeState: { nodes: allNodes.map(n => ({ ...n })), array: [...arr] },
        currentLine: 3,
        description: `Dividing range [${l}...${r}]`
      });

      let m = Math.floor((l + r) / 2);
      sort(l, m, level + 1);
      sort(m + 1, r, level + 1);
      merge(l, m, r);
    }
  };

  sort(0, arr.length - 1);
};

const generateHeapSort = (arr: number[], snapshots: Snapshot[]) => {
  const createTreeSnapshot = (heapArr: number[], activeIdx?: number, highlightIdx?: number, sortedStart?: number) => {
    const treeState = heapArr.map((val, idx) => ({
      id: idx,
      value: val,
      state: sortedStart !== undefined && idx >= sortedStart ? 'sorted' as const
        : idx === activeIdx ? 'active' as const
          : idx === highlightIdx ? 'highlight' as const
            : 'default' as const
    }));
    return treeState;
  };

  const heapify = (n: number, i: number) => {
    let largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      snapshots.push({ type: 'tree', data: [...arr], treeState: createTreeSnapshot(arr, i, largest), currentLine: 3, description: `Heapified: swapped position ${i} with ${largest}` });
      heapify(n, largest);
    }
  };

  snapshots.push({ type: 'tree', data: [...arr], treeState: createTreeSnapshot(arr), currentLine: 1, description: `Building max heap from array of ${arr.length} elements` });
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapify(arr.length, i);
  snapshots.push({ type: 'tree', data: [...arr], treeState: createTreeSnapshot(arr), currentLine: 2, description: `Max heap built, now extracting elements` });
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    snapshots.push({ type: 'tree', data: [...arr], treeState: createTreeSnapshot(arr, 0, i, i), currentLine: 5, description: `Moved largest element to position ${i}` });
    heapify(i, 0);
  }
};

const generateBinarySearch = (arr: number[], target: number, snapshots: Snapshot[]) => {
  let l = 0, r = arr.length - 1;
  snapshots.push({ type: 'array', data: arr, activeIndices: [], markers: { l, r, mid: Math.floor((l + r) / 2), target }, currentLine: 1, description: `Searching for target: ${target}` });
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    const comparison = arr[m] === target ? 'FOUND!' : (arr[m] < target ? `${arr[m]} < ${target} (go right)` : `${arr[m]} > ${target} (go left)`);
    snapshots.push({ type: 'array', data: arr, activeIndices: [m], markers: { l, r, mid: m, target }, currentLine: 3, description: `Checking arr[${m}] = ${arr[m]}. ${comparison}` });
    if (arr[m] === target) {
      snapshots.push({ type: 'array', data: arr, activeIndices: [m], markers: { l, r, mid: m, target }, currentLine: 4, description: `✓ Found ${target} at index ${m}!` });
      return;
    }
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  snapshots.push({ type: 'array', data: arr, activeIndices: [], markers: { l, r, target }, currentLine: 5, description: `✗ Target ${target} not found in array` });
};

// --- GRAPH HELPERS ---

const createDefaultGraph = () => {
  const nodes: GraphNode[] = [
    { id: 0, x: 100, y: 100, label: 'A', state: 'unvisited' },
    { id: 1, x: 300, y: 70, label: 'B', state: 'unvisited' },
    { id: 2, x: 500, y: 100, label: 'C', state: 'unvisited' },
    { id: 3, x: 100, y: 300, label: 'D', state: 'unvisited' },
    { id: 4, x: 300, y: 330, label: 'E', state: 'unvisited' },
    { id: 5, x: 500, y: 300, label: 'F', state: 'unvisited' },
  ];
  const edges: GraphEdge[] = [
    { from: 0, to: 1, weight: 4 }, { from: 0, to: 3, weight: 1 },
    { from: 1, to: 2, weight: 3 }, { from: 1, to: 4, weight: 1 },
    { from: 2, to: 5, weight: 2 }, { from: 3, to: 4, weight: 5 },
    { from: 4, to: 5, weight: 8 },
  ];
  return { nodes, edges };
};

const generateDijkstra = (snapshots: Snapshot[]) => {
  let { nodes, edges } = createDefaultGraph();
  let d: any = { 0: 0 };
  let parent: any = { 0: null };
  let visited = new Set();
  nodes.forEach(n => n.id !== 0 && (d[n.id] = Infinity));

  const createData = () => ({ distances: { ...d }, parents: { ...parent }, visited: Array.from(visited), nodeLabels: nodes.map(n => n.label) });

  snapshots.push({
    type: 'graph',
    data: createData(),
    graphState: {
      nodes: nodes.map(n => ({
        ...n,
        state: n.id === 0 ? 'current' : 'unvisited',
        value: d[n.id] === Infinity ? '∞' : d[n.id]
      })),
      edges: edges.map(e => ({ ...e, state: 'default' as const }))
    },
    currentLine: 1,
    description: `Initialize: Starting node ${nodes[0].label} has distance 0, all others ∞`
  });

  for (let i = 0; i < nodes.length; i++) {
    let u = -1, min = Infinity;
    nodes.forEach(n => !visited.has(n.id) && d[n.id] < min && (min = d[n.id], u = n.id));
    if (u === -1) break;

    snapshots.push({
      type: 'graph',
      data: createData(),
      graphState: {
        nodes: nodes.map(n => ({
          ...n,
          state: visited.has(n.id) ? 'visited' : (n.id === u ? 'current' : 'unvisited'),
          value: d[n.id] === Infinity ? '∞' : d[n.id]
        })),
        edges: edges.map(e => {
          const isPath = (parent[e.to] === e.from || parent[e.from] === e.to);
          return { ...e, state: isPath ? 'path' as const : 'default' as const };
        })
      },
      currentLine: 5,
      markers: { selected: u },
      description: `Selected unvisited node ${nodes[u].label} with smallest distance ${d[u]}`
    });

    visited.add(u);

    let updated = false;
    edges.forEach(e => {
      let v = e.from === u ? e.to : (e.to === u ? e.from : -1);
      if (v !== -1 && !visited.has(v)) {
        const newDist = d[u] + e.weight;
        const oldDist = d[v];

        snapshots.push({
          type: 'graph',
          data: createData(),
          graphState: {
            nodes: nodes.map(n => ({
              ...n,
              state: visited.has(n.id) ? 'visited' : (n.id === u ? 'current' : (n.id === v ? 'neighbor' : 'unvisited')),
              value: d[n.id] === Infinity ? '∞' : d[n.id]
            })),
            edges: edges.map(edge => edge === e ? { ...edge, state: 'active' as const } : (
              (parent[edge.to] === edge.from || parent[edge.from] === edge.to) ? { ...edge, state: 'path' as const } : edge
            ))
          },
          currentLine: 8,
          markers: { comparing: { edge: e, from: u, to: v } },
          description: `Checking edge ${nodes[u].label}→${nodes[v].label} (weight ${e.weight}): distance would be ${d[u]} + ${e.weight} = ${newDist}`
        });

        if (newDist < oldDist) {
          d[v] = newDist;
          parent[v] = u;
          updated = true;

          snapshots.push({
            type: 'graph',
            data: createData(),
            graphState: {
              nodes: nodes.map(n => ({
                ...n,
                state: visited.has(n.id) ? 'visited' : (n.id === u ? 'current' : (n.id === v ? 'neighbor' : 'unvisited')),
                value: d[n.id] === Infinity ? '∞' : d[n.id]
              })),
              edges: edges.map(edge => edge === e ? { ...edge, state: 'active' as const } : (
                (parent[edge.to] === edge.from || parent[edge.from] === edge.to) ? { ...edge, state: 'path' as const } : edge
              ))
            },
            currentLine: 10,
            description: `✓ Updated: ${nodes[v].label} distance improved from ${oldDist === Infinity ? '∞' : oldDist} to ${newDist}`
          });
        } else {
          snapshots.push({
            type: 'graph',
            data: createData(),
            graphState: {
              nodes: nodes.map(n => ({
                ...n,
                state: visited.has(n.id) ? 'visited' : (n.id === u ? 'current' : 'unvisited'),
                value: d[n.id] === Infinity ? '∞' : d[n.id]
              })),
              edges: edges.map(edge => edge === e ? { ...edge, state: 'default' as const } : (
                (parent[edge.to] === edge.from || parent[edge.from] === edge.to) ? { ...edge, state: 'path' as const } : edge
              ))
            },
            currentLine: 10,
            description: `✗ No update: ${nodes[v].label} distance ${d[v]} is already better than ${newDist}`
          });
        }
      }
    });

    snapshots.push({
      type: 'graph',
      data: createData(),
      graphState: {
        nodes: nodes.map(n => ({
          ...n,
          state: visited.has(n.id) ? 'visited' : 'unvisited',
          value: d[n.id] === Infinity ? '∞' : d[n.id]
        })),
        edges: edges.map(e => {
          const isPath = (parent[e.to] === e.from || parent[e.from] === e.to);
          return { ...e, state: isPath ? 'path' as const : 'default' as const };
        })
      },
      currentLine: 3,
      description: `Marked ${nodes[u].label} as visited. Shortest path to ${nodes[u].label} is ${d[u]}`
    });
  }

  snapshots.push({
    type: 'graph',
    data: createData(),
    graphState: {
      nodes: nodes.map(n => ({
        ...n,
        state: 'visited',
        value: d[n.id] === Infinity ? '∞' : d[n.id]
      })),
      edges: edges.map(e => {
        const isPath = (parent[e.to] === e.from || parent[e.from] === e.to);
        return { ...e, state: isPath ? 'path' as const : 'default' as const };
      })
    },
    currentLine: 12,
    description: `Done! All nodes visited. Shortest distances found: ${nodes.map(n => `${n.label}=${d[n.id] === Infinity ? '∞' : d[n.id]}`).join(', ')}`
  });
};

const generateKruskal = (snapshots: Snapshot[]) => {
  let { nodes, edges } = createDefaultGraph();
  let sorted = [...edges].sort((a, b) => a.weight - b.weight);
  let parent = nodes.map(n => n.id);
  let mst: GraphEdge[] = [];

  const find = (i: number): number => parent[i] === i ? i : (parent[i] = find(parent[i]));
  const union = (i: number, j: number) => {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) parent[rootI] = rootJ;
  };

  snapshots.push({
    type: 'graph',
    data: { edges: sorted.map(e => ({ from: e.from, to: e.to, weight: e.weight, state: 'default' })) },
    graphState: { nodes, edges },
    currentLine: 1,
    description: "Kruskal's: Sorting all edges by weight."
  });

  for (let e of sorted) {
    const rootU = find(e.from);
    const rootV = find(e.to);

    snapshots.push({
      type: 'graph',
      data: { edges: sorted.map(edge => (mst.includes(edge) ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'mst' } : (edge === e ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'active' } : { from: edge.from, to: edge.to, weight: edge.weight, state: 'default' }))) },
      graphState: {
        nodes,
        edges: edges.map(edge => {
          if (mst.includes(edge)) return { ...edge, state: 'mst' as const };
          if (edge === e) return { ...edge, state: 'active' as const };
          return edge;
        })
      },
      currentLine: 5,
      description: `Checking edge ${nodes[e.from].label}-${nodes[e.to].label} (weight ${e.weight})`
    });

    if (rootU !== rootV) {
      union(e.from, e.to);
      mst.push(e);
      snapshots.push({
        type: 'graph',
        data: { edges: sorted.map(edge => (mst.includes(edge) ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'mst' } : { from: edge.from, to: edge.to, weight: edge.weight, state: 'default' })) },
        graphState: {
          nodes,
          edges: edges.map(edge => mst.includes(edge) ? { ...edge, state: 'mst' as const } : edge)
        },
        currentLine: 7,
        description: `No cycle formed. Added edge ${nodes[e.from].label}-${nodes[e.to].label} to MST.`
      });
    } else {
      snapshots.push({
        type: 'graph',
        data: { edges: sorted.map(edge => (mst.includes(edge) ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'mst' } : (edge === e ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'active' } : { from: edge.from, to: edge.to, weight: edge.weight, state: 'default' }))) },
        graphState: {
          nodes,
          edges: edges.map(edge => mst.includes(edge) ? { ...edge, state: 'mst' as const } : (edge === e ? { ...edge, state: 'active' as const } : edge))
        },
        currentLine: 5,
        description: `Edge ${nodes[e.from].label}-${nodes[e.to].label} forms a cycle. Skipping.`
      });
    }
  }
};

const generateBellmanFord = (snapshots: Snapshot[]) => {
  let { nodes, edges } = createDefaultGraph();
  let d: any = { 0: 0 };
  let parent: any = { 0: null };
  nodes.forEach(n => {
    if (n.id !== 0) {
      d[n.id] = Infinity;
      parent[n.id] = null;
    }
  });

  const createData = () => ({ distances: { ...d }, parents: { ...parent }, nodeLabels: nodes.map(n => n.label) });

  snapshots.push({
    type: 'graph',
    data: createData(),
    graphState: {
      nodes: nodes.map(n => ({ ...n, value: d[n.id] === Infinity ? '∞' : d[n.id], state: n.id === 0 ? 'current' : 'unvisited' })),
      edges: edges.map(e => ({ ...e, state: 'default' as const }))
    },
    currentLine: 1,
    description: `Initialize Bellman-Ford: distances set (source ${nodes[0].label} = 0)`
  });

  const allEdges = [...edges, ...edges.map(e => ({ from: e.to, to: e.from, weight: e.weight }))];

  for (let iter = 0; iter < nodes.length - 1; iter++) {
    let anyUpdate = false;
    for (let e of allEdges) {
      const u = e.from, v = e.to;
      if (d[u] !== Infinity && d[u] + e.weight < d[v]) {
        const old = d[v];
        d[v] = d[u] + e.weight;
        parent[v] = u;
        anyUpdate = true;

        snapshots.push({
          type: 'graph',
          data: createData(),
          graphState: {
            nodes: nodes.map(n => ({ ...n, value: d[n.id] === Infinity ? '∞' : d[n.id], state: n.id === v ? 'current' : (n.id === u ? 'neighbor' : (d[n.id] === Infinity ? 'unvisited' : 'visited')) })),
            edges: edges.map(edge => (edge.from === e.from && edge.to === e.to) || (edge.from === e.to && edge.to === e.from) ? { ...edge, state: 'active' as const } : edge)
          },
          currentLine: 4,
          description: `Iteration ${iter + 1}: Relaxed ${nodes[u].label}→${nodes[v].label}, distance ${old === Infinity ? '∞' : old} → ${d[v]}`
        });
      } else {
        snapshots.push({
          type: 'graph',
          data: createData(),
          graphState: {
            nodes: nodes.map(n => ({ ...n, value: d[n.id] === Infinity ? '∞' : d[n.id], state: (n.id === u || n.id === v) ? 'neighbor' : (d[n.id] === Infinity ? 'unvisited' : 'visited') })),
            edges: edges.map(edge => (edge.from === e.from && edge.to === e.to) || (edge.from === e.to && edge.to === e.from) ? { ...edge, state: 'default' as const } : edge)
          },
          currentLine: 3,
          description: `Iteration ${iter + 1}: Checking ${nodes[u].label}→${nodes[v].label} (weight ${e.weight})`
        });
      }
    }
    if (!anyUpdate) break;
  }

  let negativeCycle = false;
  for (let e of allEdges) {
    const u = e.from, v = e.to;
    if (d[u] !== Infinity && d[u] + e.weight < d[v]) {
      negativeCycle = true;
      snapshots.push({
        type: 'graph',
        data: createData(),
        graphState: {
          nodes: nodes.map(n => ({ ...n, value: d[n.id] === Infinity ? '∞' : d[n.id] })),
          edges: edges.map(edge => (edge.from === e.from && edge.to === e.to) || (edge.from === e.to && edge.to === e.from) ? { ...edge, state: 'active' as const } : edge)
        },
        currentLine: 6,
        description: `Negative-weight cycle detected involving edge ${nodes[e.from].label}→${nodes[e.to].label}`
      });
      break;
    }
  }

  snapshots.push({
    type: 'graph',
    data: createData(),
    graphState: {
      nodes: nodes.map(n => ({ ...n, value: d[n.id] === Infinity ? '∞' : d[n.id], state: negativeCycle ? 'unvisited' : 'visited' })),
      edges: edges.map(edge => ({ ...edge, state: 'default' as const }))
    },
    currentLine: 7,
    description: negativeCycle ? 'Finished: negative-weight cycle detected' : `Finished: shortest distances computed from ${nodes[0].label}`
  });
};

const generateFloydWarshall = (snapshots: Snapshot[]) => {
  const n = 4;

  const nodes: GraphNode[] = [
    { id: 0, x: 100, y: 100, label: 'A', state: 'unvisited' },
    { id: 1, x: 400, y: 100, label: 'B', state: 'unvisited' },
    { id: 2, x: 400, y: 300, label: 'C', state: 'unvisited' },
    { id: 3, x: 100, y: 300, label: 'D', state: 'unvisited' },
  ];

  const edges: GraphEdge[] = [
    { from: 0, to: 1, weight: 3 },
    { from: 1, to: 2, weight: 2 },
    { from: 0, to: 3, weight: 7 },
    { from: 2, to: 3, weight: 1 },
  ];

  const dist: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity))
  );

  edges.forEach(e => {
    dist[e.from][e.to] = e.weight;
    dist[e.to][e.from] = e.weight;
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {

        if (i === j || i === k || j === k) continue;

        const currentNodes = nodes.map(node => {
          if (node.id === k) return { ...node, state: 'current' };
          if (node.id === i || node.id === j) return { ...node, state: 'visited' };
          return { ...node, state: 'unvisited' };
        });

        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          const candidate = dist[i][k] + dist[k][j];

          if (candidate < dist[i][j]) {
            dist[i][j] = candidate;

            snapshots.push({
              type: 'matrix',
              data: dist.map(row => [...row]),
              markers: { k, i, j },
              graphState: { nodes: currentNodes, edges },
              currentLine: 4,
              description: `Updated shortest path: ${nodes[i].label} → ${nodes[j].label} via ${nodes[k].label}`
            });
            continue;
          }
        }

        snapshots.push({
          type: 'matrix',
          data: dist.map(row => [...row]),
          markers: { k, i, j },
          graphState: { nodes: currentNodes, edges },
          currentLine: 3,
          description: `No improvement for ${nodes[i].label} → ${nodes[j].label} via ${nodes[k].label}`
        });
      }
    }
  }
};


const generatePrim = (snapshots: Snapshot[]) => {
  let { nodes, edges } = createDefaultGraph();
  let visited = new Set([0]);
  let mst: GraphEdge[] = [];
  let sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);

  snapshots.push({
    type: 'graph',
    data: { edges: sortedEdges.map(e => ({ from: e.from, to: e.to, weight: e.weight, state: 'default' })) },
    graphState: {
      nodes: nodes.map(n => ({ ...n, state: visited.has(n.id) ? 'visited' : 'unvisited' as any })),
      edges
    },
    currentLine: 1,
    description: `Prim's: Starting from ${nodes[0].label}; edges list sorted by weight shown.`
  });

  while (visited.size < nodes.length) {
    let minE: any = null, minW = Infinity;
    edges.forEach(e => {
      let uIn = visited.has(e.from), vIn = visited.has(e.to);
      if ((uIn && !vIn) || (!uIn && vIn)) {
        if (e.weight < minW) { minW = e.weight; minE = e; }
      }
    });

    if (minE) {
      const newNode = visited.has(minE.from) ? minE.to : minE.from;
      visited.add(newNode);
      mst.push(minE);
      snapshots.push({
        type: 'graph',
        data: { edges: sortedEdges.map(edge => (mst.includes(edge) ? { from: edge.from, to: edge.to, weight: edge.weight, state: 'mst' } : { from: edge.from, to: edge.to, weight: edge.weight, state: 'default' })) },
        graphState: {
          nodes: nodes.map(n => ({ ...n, state: visited.has(n.id) ? 'visited' : 'unvisited' as any })),
          edges: edges.map(edge => mst.includes(edge) ? { ...edge, state: 'mst' as const } : edge)
        },
        currentLine: 3,
        description: `Prim's: Added nearest node ${nodes[newNode].label} to the MST.`
      });
    } else break;
  }
};

const generateWarshall = (snapshots: Snapshot[]) => {
  const n = 4;

  const baseNodes: GraphNode[] = [
    { id: 0, x: 100, y: 100, label: 'A', state: 'unvisited' },
    { id: 1, x: 400, y: 100, label: 'B', state: 'unvisited' },
    { id: 2, x: 400, y: 300, label: 'C', state: 'unvisited' },
    { id: 3, x: 100, y: 300, label: 'D', state: 'unvisited' },
  ];

  const edges: GraphEdge[] = [
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: 1 },
    { from: 2, to: 3, weight: 1 },
  ];

  const reach: boolean[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => i === j)
  );

  edges.forEach(e => {
    reach[e.from][e.to] = true;
  });

  snapshots.push({
    type: 'matrix',
    data: reach.map(r => r.map(v => (v ? 1 : Infinity))),
    markers: { k: -1, i: -1, j: -1 },
    graphState: {
      nodes: baseNodes.map(n => ({ ...n })),
      edges
    },
    currentLine: 1,
    description: `Initial reachability matrix (direct edges only)`
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!reach[i][j] && reach[i][k] && reach[k][j]) {
          reach[i][j] = true;

          snapshots.push({
            type: 'matrix',
            data: reach.map(r => r.map(v => (v ? 1 : Infinity))),
            markers: { k, i, j },
            graphState: {
              nodes: baseNodes.map(node => {
                if (node.id === k) return { ...node, state: 'current' };
                if (node.id === i || node.id === j)
                  return { ...node, state: 'visited' };
                return { ...node, state: 'unvisited' };
              }),
              edges
            },
            currentLine: 3,
            description: `Path found: ${baseNodes[i].label} → ${baseNodes[j].label} via ${baseNodes[k].label}`
          });
        }
      }
    }

    snapshots.push({
      type: 'matrix',
      data: reach.map(r => r.map(v => (v ? 1 : Infinity))),
      markers: { k, i: -1, j: -1 },
      graphState: {
        nodes: baseNodes.map(node =>
          node.id === k
            ? { ...node, state: 'current' }
            : { ...node, state: 'unvisited' }
        ),
        edges
      },
      currentLine: 2,
      description: `Completed iteration with ${baseNodes[k].label} as intermediate`
    });
  }

  // Final snapshot
  snapshots.push({
    type: 'matrix',
    data: reach.map(r => r.map(v => (v ? 1 : Infinity))),
    markers: { k: -1, i: -1, j: -1 },
    graphState: {
      nodes: baseNodes.map(n => ({ ...n, state: 'visited' })),
      edges
    },
    currentLine: 4,
    description: `✓ Transitive closure complete — matrix shows all reachable pairs`
  });
};


// --- GEOMETRY ---
const crossProduct = (o: Point, a: Point, b: Point) =>
  (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

const area2 = (poly: Point[]) => {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p.x * q.y - p.y * q.x;
  }
  return a;
};

const ensureCCW = (hull: Point[]) => {
  if (hull.length >= 3 && area2(hull) < 0) hull.reverse();
  return hull;
};

const bruteHull = (pts: Point[]): Point[] => {
  const n = pts.length;
  if (n <= 2) return pts;

  const sorted = [...pts].sort((a, b) =>
    a.x !== b.x ? a.x - b.x : a.y - b.y
  );

  const lower: Point[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  lower.pop();
  upper.pop();

  return ensureCCW(lower.concat(upper));
};

const generateShamos = (points: Point[], snapshots: Snapshot[]) => {
  const P = [...points].sort((a, b) =>
    a.x !== b.x ? a.x - b.x : a.y - b.y
  );

  const addSnapshot = (
    activeHull: Point[],
    description: string,
    splitX?: number,
    extras?: any
  ) => {
    snapshots.push({
      type: 'points',
      data: {},
      points: P.map(p => {
        if (activeHull.some(h => h.x === p.x && h.y === p.y))
          return { ...p, state: 'hull' as any };
        return p;
      }),
      markers: { split: splitX, hull: activeHull, ...extras },
      currentLine: 2,
      description
    });
  };

  const solve = (pts: Point[]): Point[] => {
    if (pts.length <= 3) {
      const hull = bruteHull(pts);
      addSnapshot(
        hull,
        `Base Case: Finding Convex Hull for ${pts.length} points.`
      );
      return hull;
    }

    const mid = Math.floor(pts.length / 2);
    const midX = pts[mid].x;

    const leftHull = ensureCCW(solve(pts.slice(0, mid)));
    const rightHull = ensureCCW(solve(pts.slice(mid)));

    addSnapshot(
      [],
      `Merging Hulls across vertical split at x=${midX.toFixed(0)}.`,
      midX,
      { leftHull, rightHull }
    );

    const nL = leftHull.length;
    const nR = rightHull.length;

    let rightmostL = 0;
    for (let i = 1; i < nL; i++)
      if (leftHull[i].x > leftHull[rightmostL].x) rightmostL = i;

    let leftmostR = 0;
    for (let i = 1; i < nR; i++)
      if (rightHull[i].x < rightHull[leftmostR].x) leftmostR = i;

    let uL = rightmostL;
    let uR = leftmostR;
    let done = false;

    while (!done) {
      done = true;

      while (
        crossProduct(
          leftHull[uL],
          rightHull[uR],
          leftHull[(uL + 1) % nL]
        ) >= 0
      ) {
        uL = (uL + 1) % nL;
        done = false;
      }

      while (
        crossProduct(
          rightHull[uR],
          leftHull[uL],
          rightHull[(uR - 1 + nR) % nR]
        ) <= 0
      ) {
        uR = (uR - 1 + nR) % nR;
        done = false;
      }
    }

    let lL = rightmostL;
    let lR = leftmostR;
    done = false;

    while (!done) {
      done = true;

      while (
        crossProduct(
          leftHull[lL],
          rightHull[lR],
          leftHull[(lL - 1 + nL) % nL]
        ) <= 0
      ) {
        lL = (lL - 1 + nL) % nL;
        done = false;
      }

      while (
        crossProduct(
          rightHull[lR],
          leftHull[lL],
          rightHull[(lR + 1) % nR]
        ) >= 0
      ) {
        lR = (lR + 1) % nR;
        done = false;
      }
    }

    const merged: Point[] = [];

    let curr = uL;
    merged.push(leftHull[curr]);
    while (curr !== lL) {
      curr = (curr + 1) % nL;
      merged.push(leftHull[curr]);
    }

    curr = lR;
    merged.push(rightHull[curr]);
    while (curr !== uR) {
      curr = (curr + 1) % nR;
      merged.push(rightHull[curr]);
    }

    const finalMerged = bruteHull(merged);

    addSnapshot(
      finalMerged,
      `Merge Complete: Found tangents and stitched sub-hulls together.`
    );

    return finalMerged;
  };

  const finalHull = solve(P);

  snapshots.push({
    type: 'points',
    data: {},
    points: P.map(p => {
      if (finalHull.some(h => h.x === p.x && h.y === p.y))
        return { ...p, state: 'hull' as any };
      return p;
    }),
    markers: { hull: finalHull, closed: true },
    currentLine: 0,
    description:
      `Convex Envelope found! Using Shamos Divide and Conquer in O(n log n).`
  });
};


const generateQuickhull = (points: Point[], snapshots: Snapshot[]) => {
  let hull: Point[] = [];
  const P = [...points];

  if (P.length < 3) {
    snapshots.push({ type: 'points', data: {}, points: P, currentLine: 1, description: "Not enough points for a hull" });
    return;
  }

  let minX = 0, maxX = 0;
  for (let i = 1; i < P.length; i++) {
    if (P[i].x < P[minX].x) minX = i;
    if (P[i].x > P[maxX].x) maxX = i;
  }

  const p1 = P[minX], p2 = P[maxX];
  hull.push(p1);
  hull.push(p2);

  snapshots.push({
    type: 'points', data: {},
    points: P.map(p => (p === p1 || p === p2 ? { ...p, state: 'hull' as any } : p)),
    markers: { hull: [p1, p2] },
    currentLine: 2, description: `Extreme points found: ${p1.x.toFixed(0)} and ${p2.x.toFixed(0)}`
  });

  const getSide = (a: Point, b: Point, p: Point) => (p.y - a.y) * (b.x - a.x) - (b.y - a.y) * (p.x - a.x);
  const getDist = (a: Point, b: Point, p: Point) => Math.abs((p.y - a.y) * (b.x - a.x) - (b.y - a.y) * (p.x - a.x));

  const findHull = (a: Point, b: Point, pts: Point[], side: number) => {
    let idx = -1;
    let maxDist = 0;

    const candidates = pts.filter(p => {
      const s = getSide(a, b, p);
      if (side === 0) return s > 0;
      return s < 0;
    });

    if (candidates.length === 0) return;

    for (let i = 0; i < candidates.length; i++) {
      let d = getDist(a, b, candidates[i]);
      if (d > maxDist) {
        maxDist = d;
        idx = i;
      }
    }

    const pMax = candidates[idx];
    hull.push(pMax);

    const centerX = hull.reduce((a, b) => a + b.x, 0) / hull.length;
    const centerY = hull.reduce((a, b) => a + b.y, 0) / hull.length;
    hull.sort((a, b) => Math.atan2(a.y - centerY, a.x - centerX) - Math.atan2(b.y - centerY, b.x - centerX));

    snapshots.push({
      type: 'points', data: {},
      points: P.map(p => (hull.includes(p) ? { ...p, state: 'hull' as any } : (candidates.includes(p) ? { ...p, state: 'active' as any } : p))),
      markers: { hull: [...hull] },
      currentLine: 3, description: `Adding ${pMax.x.toFixed(0)}, ${pMax.y.toFixed(0)} to hull`
    });

    findHull(a, pMax, candidates, side);
    findHull(pMax, b, candidates, side);
  };

  findHull(p1, p2, P, 1);
  findHull(p1, p2, P, 0);

  snapshots.push({
    type: 'points', data: {},
    points: P.map(p => (hull.includes(p) ? { ...p, state: 'hull' as any } : p)),
    markers: { hull: [...hull], closed: true },
    currentLine: 0, description: "Convex Hull complete!"
  });
};

// --- MATH ---
const generateStrassen = (snapshots: Snapshot[]) => {
  const a = [[1, 2], [3, 4]];
  const b = [[5, 6], [7, 8]];

  snapshots.push({
    type: 'math',
    data: { type: 'matrices', title: 'Input Matrices', matrices: { A: a, B: b }, step: 'initialization' },
    currentLine: 1,
    description: "Input: Matrix A and B (2x2)"
  });

  const submatrices = {
    A: { A11: 1, A12: 2, A21: 3, A22: 4 },
    B: { B11: 5, B12: 6, B21: 7, B22: 8 }
  };
  snapshots.push({
    type: 'math',
    data: { type: 'submatrices', title: 'Decompose into Quadrants', submatrices, step: 'divide' },
    currentLine: 1,
    description: "Divide: Split matrices into quadrants"
  });

  const mValues = [
    { name: "M1", formula: "(A11+A22)(B11+B22)", val: 65, calc: "(1+4)(5+8) = 65" },
    { name: "M2", formula: "(A21+A22)B11", val: 35, calc: "(3+4)5 = 35" },
    { name: "M3", formula: "A11(B12-B22)", val: -2, calc: "1(6-8) = -2" },
    { name: "M4", formula: "A22(B21-B11)", val: 8, calc: "4(7-5) = 8" },
    { name: "M5", formula: "(A11+A12)B22", val: 24, calc: "(1+2)8 = 24" },
    { name: "M6", formula: "(A21-A11)(B11+B12)", val: 22, calc: "(3-1)(5+6) = 22" },
    { name: "M7", formula: "(A12-A22)(B21+B22)", val: -30, calc: "(2-4)(7+8) = -30" },
  ];

  for (const m of mValues) {
    snapshots.push({
      type: 'math',
      data: { type: 'mvalue', title: `Computing ${m.name}`, formula: m.formula, calculation: m.calc, result: m.val, step: 'conquer' },
      currentLine: 2,
      description: `Step: Compute unique product ${m.name}`
    });
  }

  const result = [[19, 22], [43, 50]];
  snapshots.push({
    type: 'math',
    data: { type: 'result', title: 'Final Result Matrix C', matrix: result, step: 'complete' },
    currentLine: 3,
    description: "Conquer: Combine M-values into final Matrix C"
  });
};

const generateKaratsuba = (snapshots: Snapshot[]) => {
  const x = 1234;
  const y = 5678;
  const n = 4;
  const m = Math.floor(n / 2);

  snapshots.push({
    type: 'math',
    data: { type: 'karatsuba_init', title: 'Input Numbers', x, y, step: 'init' },
    currentLine: 1,
    description: "Goal: Multiply two large integers using Karatsuba trick"
  });

  const a = 12, b = 34, c = 56, d = 78;
  snapshots.push({
    type: 'math',
    data: { type: 'karatsuba_split', title: 'Split at n/2', a, b, c, d, step: 'split' },
    currentLine: 1,
    description: "Step 1: Divide into high and low parts"
  });

  const ac = a * c;
  const bd = b * d;
  const gauss = (a + b) * (c + d);
  const middle = gauss - ac - bd;

  snapshots.push({
    type: 'math',
    data: { type: 'karatsuba_products', title: 'Three Products', ac, bd, gauss, step: 'products' },
    currentLine: 2,
    description: "Step 2-4: Compute three recursive multiplications"
  });

  const finalVal = ac * Math.pow(10, n) + middle * Math.pow(10, m) + bd;
  snapshots.push({
    type: 'math',
    data: { type: 'karatsuba_result', title: 'Final Product', ac, m: middle, bd, result: finalVal, step: 'combine' },
    currentLine: 3,
    description: "Step 5-6: Combine using shifts and addition"
  });
};

const generateFibonacci = (n: number, snapshots: Snapshot[]) => {
  let fib = [0, 1];
  snapshots.push({
    type: 'math',
    data: { type: 'fibonacci', sequence: [0], step: 0, title: 'Base case: F(0) = 0' },
    currentLine: 1,
    description: "Base case: fib(0) = 0"
  });
  snapshots.push({
    type: 'math',
    data: { type: 'fibonacci', sequence: [0, 1], step: 1, title: 'Base case: F(1) = 1' },
    currentLine: 1,
    description: "Base case: fib(1) = 1"
  });

  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
    snapshots.push({
      type: 'math',
      data: { type: 'fibonacci', sequence: [...fib], step: i, title: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i - 1]} + ${fib[i - 2]}`, activeIndices: [i - 2, i - 1] },
      currentLine: 3,
      description: `Adding terms: ${fib[i - 1]} + ${fib[i - 2]} = ${fib[i]}`
    });
  }
};

const generateNQueens = (n: number, snapshots: Snapshot[]) => {
  let board = Array(n).fill(0).map(() => Array(n).fill(0));
  const isSafe = (r: number, c: number) => {
    for (let i = 0; i < c; i++) if (board[r][i]) return false;
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (let i = r, j = c; i < n && j >= 0; i++, j--) if (board[i][j]) return false;
    return true;
  };
  const solve = (col: number): boolean => {
    if (col >= n) return true;
    for (let i = 0; i < n; i++) {
      snapshots.push({ type: 'grid', data: board.map(r => [...r]), activeIndices: [i * n + col], currentLine: 4, description: `Trying row ${i} for column ${col}` });
      if (isSafe(i, col)) {
        board[i][col] = 1;
        snapshots.push({ type: 'grid', data: board.map(r => [...r]), activeIndices: [i * n + col], currentLine: 6, description: "Safe! Placing queen" });
        if (solve(col + 1)) return true;
        board[i][col] = 0;
        snapshots.push({ type: 'grid', data: board.map(r => [...r]), activeIndices: [i * n + col], currentLine: 8, description: "Dead end. Backtracking..." });
      }
    }
    return false;
  };
  solve(0);
};
