
import { Algorithm } from './types';

export const ALGORITHMS: Algorithm[] = [
  // Sorting
  { id: 'selection-sort', name: 'Selection Sort', category: 'Sorting', description: 'Finds the minimum element and moves it to the front.', code: `for (let i = 0; i < n; i++) {\n  let min = i;\n  for (let j = i+1; j < n; j++) {\n    if (arr[j] < arr[min]) min = j;\n  }\n  swap(arr[i], arr[min]);\n}` },
  { id: 'insertion-sort', name: 'Insertion Sort', category: 'Sorting', description: 'Builds the sorted array one item at a time.', code: `for (let i = 1; i < n; i++) {\n  let key = arr[i], j = i - 1;\n  while (j >= 0 && arr[j] > key) {\n    arr[j+1] = arr[j];\n    j--;\n  }\n  arr[j+1] = key;\n}` },
  { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting', description: 'Repeatedly swaps adjacent elements if they are in wrong order.', code: `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n-i-1; j++) {\n    if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);\n  }\n}` },
  { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting', description: 'Divide and conquer using a pivot element.', code: `function quickSort(arr, low, high) {\n  if (low < high) {\n    let p = partition(arr, low, high);\n    quickSort(arr, low, p-1);\n    quickSort(arr, p+1, high);\n  }\n}` },
  { id: 'merge-sort', name: 'Merge Sort', category: 'Sorting', description: 'Recursively splits and merges sorted sub-arrays.', code: `function mergeSort(arr, l, r) {\n  if (l < r) {\n    let m = (l+r)/2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m+1, r);\n    merge(arr, l, m, r);\n  }\n}` },
  { id: 'heap-sort', name: 'Heap Sort', category: 'Sorting', description: 'Uses a binary heap to sort elements.', code: `buildMaxHeap(arr);\nfor (let i = n-1; i > 0; i--) {\n  swap(arr[0], arr[i]);\n  heapify(arr, 0, i);\n}` },
  
  // Searching
  { id: 'binary-search', name: 'Binary Search', category: 'Searching', description: 'Searches a sorted array by repeatedly halving the search interval.', code: `while (l <= r) {\n  let m = (l+r)/2;\n  if (arr[m] === x) return m;\n  if (arr[m] < x) l = m + 1;\n  else r = m - 1;\n}` },
  
  // Graph
  { id: 'dijkstra', name: "Dijkstra", category: 'Graph', description: 'Finds shortest paths from a source node.', code: `while (pq) {\n  let u = pq.pop();\n  for (let v of adj[u]) {\n    if (d[u] + w < d[v]) d[v] = d[u] + w;\n  }\n}` },
  { id: 'kruskal', name: "Kruskal", category: 'Graph', description: 'Finds MST using sorted edges and DSU.', code: `edges.sort();\nfor (let e of edges) {\n  if (find(e.u) !== find(e.v)) {\n    union(e.u, e.v); mst.push(e);\n  }\n}` },
  { id: 'bellman-ford', name: 'Bellman-Ford', category: 'Graph', description: 'Shortest paths with negative weights.', code: `for (let i = 0; i < V-1; i++) {\n  for (let {u,v,w} of edges) {\n    if (d[u] + w < d[v]) d[v] = d[u] + w;\n  }\n}` },
  { id: 'floyd-warshall', name: 'Floyd-Warshall', category: 'Graph', description: 'All-pairs shortest paths.', code: `for (k) for (i) for (j)\n  if (d[i][j] > d[i][k] + d[k][j])\n    d[i][j] = d[i][k] + d[k][j];` },
  { id: 'prim', name: "Prim", category: 'Graph', description: 'Finds MST by growing from a starting node.', code: `while (mst.size < V) {\n  let e = minEdge(mstSet, nonMstSet);\n  mstSet.add(e.v); mst.push(e);\n}` },
  { id: 'warshall', name: "Warshall", category: 'Graph', description: 'Computes transitive closure of a graph.', code: `for (k) for (i) for (j)\n  reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);` },
  // Geometry
  { id: 'shamos', name: 'Shamos', category: 'Geometry', description: 'Finds the closest pair of points.', code: `function closest(P) {\n  if (P.length <= 3) return brute(P);\n  let d = min(closest(L), closest(R));\n  return min(d, stripMin(S, d));\n}` },
  { id: 'quickhull', name: 'Quickhull', category: 'Geometry', description: 'Divide and conquer convex hull algorithm.', code: `function quickHull(points, p1, p2) {\n  let pMax = findFurthest(points, p1, p2);\n  return [...quickHull(S1, p1, pMax), ...quickHull(S2, pMax, p2)];\n}` },

  // Math
  { id: 'strassen', name: 'Strassen', category: 'Math', description: 'Fast matrix multiplication.', code: `M1 = (A11 + A22)(B11 + B22)\nM2 = (A21 + A22)B11 ...\nC11 = M1 + M4 - M5 + M7` },
  { id: 'karatsuba', name: 'Karatsuba', category: 'Math', description: 'Fast multiplication of large integers.', code: `xy = (10^n)ac + (10^n/2)(ad+bc) + bd\nwhere ad+bc = (a+b)(c+d) - ac - bd` },
  { id: 'fibonacci', name: 'Fibonacci', category: 'Math', description: 'Recursive or DP calculation of Fibonacci sequence.', code: `function fib(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}` },

  // Backtracking
  { id: 'backtracking', name: 'N-Queens', category: 'Backtracking', description: 'Classic backtracking to place queens safely.', code: `function solve(col) {\n  for (row) {\n    if (isSafe(row, col)) {\n      place(row, col);\n      if (solve(col+1)) return true;\n      remove(row, col);\n    }\n  }\n}` }
];
