
import { Algorithm } from './types';

export const ALGORITHMS: Algorithm[] = [
  // Sorting
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element and moves it to the front.',
    codeVariants: {
      js: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap elements
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        swap(arr[minIdx], arr[i]);
    }
}`,
      java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`
    }
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time.',
    codeVariants: {
      js: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Move elements of arr[0..i-1] that are greater than key
        # to one position ahead of their current position
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; ++i) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`
    }
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Repeatedly swaps adjacent elements if they are in wrong order.',
    codeVariants: {
      js: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    # Optimized with a flag to stop if no swaps occur
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(arr[j], arr[j+1]);\n            }\n        }\n    }\n}`,
      java: `public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n        }\n    }\n`
    }
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Divide and conquer using a pivot element.',
    codeVariants: {
      js: `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `public class QuickSort {
    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`
    }
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Recursively splits and merges sorted sub-arrays.',
    codeVariants: {
      js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      java: `public class MergeSort {
    void merge(int arr[], int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int L[] = new int[n1];
        int R[] = new int[n2];

        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    void sort(int arr[], int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
}`
    }
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Uses a binary heap to sort elements.',
    codeVariants: {
      js: `function heapSort(arr) {
  let n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
      python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`,
      cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      java: `public class HeapSort {
    public void sort(int arr[]) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    void heapify(int arr[], int n, int i) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}`
    }
  },

  // Searching
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Searches a sorted array by repeatedly halving the search interval.',
    codeVariants: {
      js: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      cpp: `int binarySearch(vector<int>& arr, int low, int high, int target) {
    if (high >= low) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] > target) return binarySearch(arr, low, mid - 1, target);
        return binarySearch(arr, mid + 1, high, target);
    }
    return -1;
}`,
      java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
    }
  },
  // Graph
  {
    id: 'dijkstra',
    name: "Dijkstra",
    category: 'Graph',
    timeComplexity: 'O((V+E) log V)',
    spaceComplexity: 'O(V)',
    description: 'Finds shortest paths from a source node.',
    codeVariants: {
      js: `function dijkstra(graph, start) {
  let distances = {};
  let visited = new Set();
  let nodes = Object.keys(graph);

  for (let node of nodes) distances[node] = Infinity;
  distances[start] = 0;

  while (nodes.length) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    let closestNode = nodes.shift();

    if (distances[closestNode] === Infinity) break;

    visited.add(closestNode);

    for (let neighbor in graph[closestNode]) {
      if (!visited.has(neighbor)) {
        let newDist = distances[closestNode] + graph[closestNode][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
        }
      }
    }
  }
  return distances;
}`,
      python: `import heapq

def dijkstra(graph, start):
    # graph is a dict of dicts: {node: {neighbor: weight}}
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)] # Priority queue: (distance, node)

    while pq:
        current_dist, current_node = heapq.heappop(pq)

        if current_dist > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> pi;

void dijkstra(int V, vector<list<pi>>& adj, int src) {
    priority_queue<pi, vector<pi>, greater<pi>> pq;
    vector<int> dist(V, 1e9);

    pq.push(make_pair(0, src));
    dist[src] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push(make_pair(dist[v], v));
            }
        }
    }
}`,
      java: `import java.util.*;

public class Dijkstra {
    static class Node implements Comparable<Node> {
        int target, weight;
        Node(int target, int weight) {
            this.target = target;
            this.weight = weight;
        }
        public int compareTo(Node other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    public void calculate(List<List<Node>> adj, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<Node> pq = new PriorityQueue<>();

        dist[src] = 0;
        pq.add(new Node(src, 0));

        while (!pq.isEmpty()) {
            int u = pq.poll().target;

            for (Node neighbor : adj.get(u)) {
                if (dist[u] + neighbor.weight < dist[neighbor.target]) {
                    dist[neighbor.target] = dist[u] + neighbor.weight;
                    pq.add(new Node(neighbor.target, dist[neighbor.target]));
                }
            }
        }
    }
}`
    }
  },
  {
    id: 'kruskal',
    name: "Kruskal",
    category: 'Graph',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    description: 'Finds MST using sorted edges and DSU.',
    codeVariants: {
      js: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]);
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

function kruskal(n, edges) {
  edges.sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(n);
  const mst = [];
  
  for (const edge of edges) {
    if (uf.union(edge.u, edge.v)) {
      mst.push(edge);
    }
  }
  return mst;
}`,
      python: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j
            return True
        return False

def kruskal(n, edges):
    # edges is a list of (u, v, weight)
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    mst = []
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
    return mst`,
      cpp: `struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

struct DSU {
    vector<int> parent;
    DSU(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
};

vector<Edge> kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    vector<Edge> mst;
    for (auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            mst.push_back(edge);
        }
    }
    return mst;
}`,
      java: `import java.util.*;

class Kruskal {
    class Edge implements Comparable<Edge> {
        int u, v, weight;
        public int compareTo(Edge other) {
            return this.weight - other.weight;
        }
    }

    int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }

    void union(int[] parent, int x, int y) {
        int rootX = find(parent, x);
        int rootY = find(parent, y);
        parent[rootX] = rootY;
    }

    public List<Edge> findMST(int n, List<Edge> edges) {
        Collections.sort(edges);
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        List<Edge> mst = new ArrayList<>();
        for (Edge edge : edges) {
            if (find(parent, edge.u) != find(parent, edge.v)) {
                mst.add(edge);
                union(parent, edge.u, edge.v);
            }
        }
        return mst;
    }
}`
    }
  },
  {
    id: 'bellman-ford',
    name: 'Bellman-Ford',
    category: 'Graph',
    timeComplexity: 'O(VE)',
    spaceComplexity: 'O(V)',
    description: 'Shortest paths with negative weights.',
    codeVariants: {
      js: `function bellmanFord(vertices, edges, start) {
  let distances = Array(vertices).fill(Infinity);
  distances[start] = 0;

  // Relax edges V-1 times
  for (let i = 0; i < vertices - 1; i++) {
    for (let { u, v, weight } of edges) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }

  // Check for negative cycles
  for (let { u, v, weight } of edges) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      console.log("Graph contains a negative weight cycle");
      return null;
    }
  }

  return distances;
}`,
      python: `def bellman_ford(vertices, edges, start):
    # edges is a list of (u, v, weight)
    distances = [float('inf')] * vertices
    distances[start] = 0

    for _ in range(vertices - 1):
        for u, v, weight in edges:
            if distances[u] != float('inf') and distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Final check for negative cycles
    for u, v, weight in edges:
        if distances[u] != float('inf') and distances[u] + weight < distances[v]:
            raise ValueError("Graph contains a negative weight cycle")

    return distances`,
      cpp: `struct Edge {
    int u, v, weight;
};

void bellmanFord(int V, vector<Edge>& edges, int start) {
    vector<int> dist(V, 1e9);
    dist[start] = 0;

    for (int i = 0; i < V - 1; i++) {
        for (auto& edge : edges) {
            if (dist[edge.u] != 1e9 && dist[edge.u] + edge.weight < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.weight;
            }
        }
    }

    for (auto& edge : edges) {
        if (dist[edge.u] != 1e9 && dist[edge.u] + edge.weight < dist[edge.v]) {
            cout << "Negative cycle detected!" << endl;
            return;
        }
    }
}`,
      java: `import java.util.*;

public class BellmanFord {
    static class Edge {
        int u, v, weight;
        Edge(int u, int v, int w) { this.u = u; this.v = v; this.weight = w; }
    }

    void solve(int V, List<Edge> edges, int start) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;

        for (int i = 0; i < V - 1; i++) {
            for (Edge e : edges) {
                if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.weight < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.weight;
                }
            }
        }

        for (Edge e : edges) {
            if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.weight < dist[e.v]) {
                System.out.println("Negative cycle exists");
                return;
            }
        }
    }
}`
    }
  },
  {
    id: 'floyd-warshall',
    name: 'Floyd-Warshall',
    category: 'Graph',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    description: 'All-pairs shortest paths.',
    codeVariants: {
      js: `function floydWarshall(V, graph) {
  let dist = Array.from({ length: V }, (_, i) => 
    Array.from({ length: V }, (_, j) => graph[i][j])
  );

  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
      python: `def floyd_warshall(V, graph):
    # Initialize distance matrix
    dist = [list(row) for row in graph]

    for k in range(V):
        for i in range(V):
            for j in range(V):
                # If vertex k is on the shortest path from i to j, update dist[i][j]
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                
    return dist`,
      cpp: `const int INF = 1e9;

void floydWarshall(int V, vector<vector<int>>& dist) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}`,
      java: `public class FloydWarshall {
    final static int INF = 99999;

    void solve(int V, int[][] dist) {
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
}`
    }
  },
  {
    id: 'prim',
    name: "Prim",
    category: 'Graph',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    description: 'Finds MST by growing from a starting node.',
    codeVariants: {
      js: `function primMST(graph, V) {
  let parent = [], key = [], mstSet = [];
  for (let i = 0; i < V; i++) {
    key[i] = Infinity;
    mstSet[i] = false;
  }

  key[0] = 0;
  parent[0] = -1;

  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet, V);
    mstSet[u] = true;

    for (let v = 0; v < V; v++) {
      if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
  return parent;
}

function minKey(key, mstSet, V) {
  let min = Infinity, minIndex;
  for (let v = 0; v < V; v++) {
    if (!mstSet[v] && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
}`,
      python: `import heapq

def prim_mst(adj, V):
    # adj is list of lists: adj[u] = [(v, weight), ...]
    mst = [False] * V
    pq = [(0, 0)]  # (weight, vertex)
    total_weight = 0
    
    while pq:
        weight, u = heapq.heappop(pq)
        
        if mst[u]:
            continue
            
        mst[u] = True
        total_weight += weight
        
        for v, w in adj[u]:
            if not mst[v]:
                heapq.heappush(pq, (w, v))
                
    return total_weight`,
      cpp: `#include <bits/stdc++.h>

typedef pair<int, int> pi;

void primMST(int V, vector<vector<pi>>& adj) {
    priority_queue<pi, vector<pi>, greater<pi>> pq;
    vector<int> key(V, 1e9);
    vector<bool> inMST(V, false);

    pq.push({0, 0});
    key[0] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        inMST[u] = true;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (!inMST[v] && key[v] > weight) {
                key[v] = weight;
                pq.push({key[v], v});
            }
        }
    }
}`,
      java: `import java.util.*;

public class Prim {
    class Node implements Comparable<Node> {
        int v, weight;
        Node(int v, int w) { this.v = v; this.weight = w; }
        public int compareTo(Node other) { return this.weight - other.weight; }
    }

    public void prim(int V, List<List<Node>> adj) {
        boolean[] inMST = new boolean[V];
        int[] key = new int[V];
        Arrays.fill(key, Integer.MAX_VALUE);
        PriorityQueue<Node> pq = new PriorityQueue<>();

        key[0] = 0;
        pq.add(new Node(0, 0));

        while (!pq.isEmpty()) {
            int u = pq.poll().v;
            inMST[u] = true;

            for (Node neighbor : adj.get(u)) {
                if (!inMST[neighbor.v] && key[neighbor.v] > neighbor.weight) {
                    key[neighbor.v] = neighbor.weight;
                    pq.add(new Node(neighbor.v, key[neighbor.v]));
                }
            }
        }
    }
}`
    }
  },
  {
    id: 'warshall',
    name: "Warshall",
    category: 'Graph',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    description: 'Computes transitive closure of a graph.',
    codeVariants: {
      js: `function warshall(V, adjMatrix) {
  let reach = adjMatrix.map(row => [...row]);

  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        // If i can reach k AND k can reach j, then i can reach j
        reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
      }
    }
  }
  return reach;
}`,
      python: `def warshall(V, adj_matrix):
    # Create a copy of the adjacency matrix
    reach = [row[:] for row in adj_matrix]

    for k in range(V):
        for i in range(V):
            for j in range(V):
                # Update reachability using bitwise OR/AND
                reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j])
                
    return reach`,
      cpp: `void warshall(int V, vector<vector<bool>>& reach) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
            }
        }
    }
}`,
      java: `public class Warshall {
    public void transitiveClosure(int V, boolean[][] reach) {
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (reach[i][k] && reach[k][j]) {
                        reach[i][j] = true;
                    }
                }
            }
        }
    }
}`
    }
  },
  // Geometry
  {
    id: 'shamos',
    name: 'Shamos',
    category: 'Geometry',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Finds the closest pair of points.',
    codeVariants: {
      js: `function getOrientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // Collinear
  return (val > 0) ? 1 : 2; // 1: Clockwise, 2: Counter-clockwise
}

function grahamScan(points) {
  let n = points.length;
  if (n < 3) return points;

  // 1. Find the bottom-most point (lowest y)
  let minY = points[0].y, minIdx = 0;
  for (let i = 1; i < n; i++) {
    if (points[i].y < minY || (points[i].y === minY && points[i].x < points[minIdx].x)) {
      minY = points[i].y;
      minIdx = i;
    }
  }

  // 2. Place the bottom-most point at the first position
  [points[0], points[minIdx]] = [points[minIdx], points[0]];
  let p0 = points[0];

  // 3. Sort points by polar angle with p0
  points.sort((a, b) => {
    let o = getOrientation(p0, a, b);
    if (o === 0) {
      let d1 = Math.pow(p0.x - a.x, 2) + Math.pow(p0.y - a.y, 2);
      let d2 = Math.pow(p0.x - b.x, 2) + Math.pow(p0.y - b.y, 2);
      return d1 - d2;
    }
    return (o === 2) ? -1 : 1;
  });

  // 4. Build the hull
  let stack = [points[0], points[1], points[2]];
  for (let i = 3; i < n; i++) {
    while (stack.length > 1 && getOrientation(stack[stack.length - 2], stack[stack.length - 1], points[i]) !== 2) {
      stack.pop();
    }
    stack.push(points[i]);
  }
  return stack;
}`,
      python: `import math

def get_orientation(p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if val == 0: return 0  # Collinear
    return 1 if val > 0 else 2 # 1: CW, 2: CCW

def graham_scan(points):
    n = len(points)
    if n < 3: return points

    # Find bottom-most point
    p0 = min(points, key=lambda p: (p[1], p[0]))
    
    # Sort by polar angle
    def dist_sq(p1, p2):
        return (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2

    def compare(p1):
        # We use atan2 for angle, and distance for ties
        return (math.atan2(p1[1] - p0[1], p1[0] - p0[0]), dist_sq(p0, p1))

    sorted_pts = sorted(points, key=compare)

    stack = [sorted_pts[0], sorted_pts[1], sorted_pts[2]]
    for i in range(3, n):
        while len(stack) > 1 and get_orientation(stack[-2], stack[-1], sorted_pts[i]) != 2:
            stack.pop()
        stack.append(sorted_pts[i])
    
    return stack`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Point { int x, y; };

Point p0;

int distSq(Point p1, Point p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

int orientation(Point p, Point q, Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;
    return (val > 0) ? 1 : 2; 
}

bool compare(Point p1, Point p2) {
    int o = orientation(p0, p1, p2);
    if (o == 0) return distSq(p0, p2) > distSq(p0, p1);
    return (o == 2);
}

vector<Point> grahamScan(vector<Point>& points) {
    int n = points.size();
    int ymin = points[0].y, min = 0;
    for (int i = 1; i < n; i++) {
        int y = points[i].y;
        if ((y < ymin) || (ymin == y && points[i].x < points[min].x))
            ymin = points[i].y, min = i;
    }

    swap(points[0], points[min]);
    p0 = points[0];
    sort(points.begin() + 1, points.end(), compare);

    vector<Point> hull;
    hull.push_back(points[0]);
    hull.push_back(points[1]);
    hull.push_back(points[2]);

    for (int i = 3; i < n; i++) {
        while (hull.size() > 1 && orientation(hull[hull.size() - 2], hull.back(), points[i]) != 2)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    return hull;
}`,
      java: `import java.util.*;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

public class GrahamScan {
    private Point p0;

    private int orientation(Point p, Point q, Point r) {
        int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val == 0) return 0;
        return (val > 0) ? 1 : 2;
    }

    private int distSq(Point p1, Point p2) {
        return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    }

    public List<Point> getHull(Point[] points) {
        int n = points.length;
        if (n < 3) return Arrays.asList(points);

        int min = 0;
        for (int i = 1; i < n; i++) {
            if (points[i].y < points[min].y || (points[i].y == points[min].y && points[i].x < points[min].x))
                min = i;
        }

        Point temp = points[0];
        points[0] = points[min];
        points[min] = temp;
        p0 = points[0];

        Arrays.sort(points, 1, n, (p1, p2) -> {
            int o = orientation(p0, p1, p2);
            if (o == 0) return distSq(p0, p1) - distSq(p0, p2);
            return (o == 2) ? -1 : 1;
        });

        Stack<Point> stack = new Stack<>();
        stack.push(points[0]);
        stack.push(points[1]);
        stack.push(points[2]);

        for (int i = 3; i < n; i++) {
            while (stack.size() > 1 && orientation(nextToTop(stack), stack.peek(), points[i]) != 2) {
                stack.pop();
            }
            stack.push(points[i]);
        }
        return new ArrayList<>(stack);
    }

    private Point nextToTop(Stack<Point> stack) {
        Point top = stack.pop();
        Point res = stack.peek();
        stack.push(top);
        return res;
    }
}`
    }
  },
  {
    id: 'quickhull',
    name: 'Quickhull',
    category: 'Geometry',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide and conquer convex hull algorithm.',
    codeVariants: {
      js: `function getDistance(p1, p2, p) {
  return Math.abs((p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x));
}

function findSide(p1, p2, p) {
  const val = (p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x);
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;
}

function quickHull(points) {
  if (points.length < 3) return points;
  let hull = [];

  let minIdx = 0, maxIdx = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].x < points[minIdx].x) minIdx = i;
    if (points[i].x > points[maxIdx].x) maxIdx = i;
  }

  const p1 = points[minIdx], p2 = points[maxIdx];
  hull.push(p1, p2);

  let leftSet = [], rightSet = [];
  for (let p of points) {
    if (findSide(p1, p2, p) === 1) leftSet.push(p);
    else if (findSide(p1, p2, p) === -1) rightSet.push(p);
  }

  hull = [...hull, ...findHull(leftSet, p1, p2), ...findHull(rightSet, p2, p1)];
  return hull;
}

function findHull(set, p1, p2) {
  if (set.length === 0) return [];
  let farthestDist = -1, farthestPoint = null;

  for (let p of set) {
    let dist = getDistance(p1, p2, p);
    if (dist > farthestDist) {
      farthestDist = dist;
      farthestPoint = p;
    }
  }

  let results = [farthestPoint];
  let s1 = [], s2 = [];
  for (let p of set) {
    if (findSide(p1, farthestPoint, p) === 1) s1.push(p);
    if (findSide(farthestPoint, p2, p) === 1) s2.push(p);
  }

  return [...results, ...findHull(s1, p1, farthestPoint), ...findHull(s2, farthestPoint, p2)];
}`,
      python: `def find_side(p1, p2, p):
    val = (p[1] - p1[1]) * (p2[0] - p1[0]) - (p2[1] - p1[1]) * (p[0] - p1[0])
    return 1 if val > 0 else -1 if val < 0 else 0

def line_dist(p1, p2, p):
    return abs((p[1] - p1[1]) * (p2[0] - p1[0]) - (p2[1] - p1[1]) * (p[0] - p1[0]))

def quick_hull(points):
    n = len(points)
    if n < 3: return points
    
    hull = set()
    min_x = min(points, key=lambda p: p[0])
    max_x = max(points, key=lambda p: p[0])
    
    def find_hull(pts, p1, p2):
        if not pts: return
        farthest = max(pts, key=lambda p: line_dist(p1, p2, p))
        hull.add(farthest)
        
        # Points to the left of p1-farthest and farthest-p2
        s1 = [p for p in pts if find_side(p1, farthest, p) == 1]
        s2 = [p for p in pts if find_side(farthest, p2, p) == 1]
        
        find_hull(s1, p1, farthest)
        find_hull(s2, farthest, p2)

    hull.add(min_x); hull.add(max_x)
    find_hull([p for p in points if find_side(min_x, max_x, p) == 1], min_x, max_x)
    find_hull([p for p in points if find_side(max_x, min_x, p) == 1], max_x, min_x)
    return list(hull)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Point { int x, y; };

int findSide(Point p1, Point p2, Point p) {
    int val = (p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x);
    if (val > 0) return 1;
    if (val < 0) return -1;
    return 0;
}

int lineDist(Point p1, Point p2, Point p) {
    return abs((p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x));
}

void findHull(vector<Point>& pts, Point p1, Point p2, vector<Point>& hull) {
    if (pts.empty()) return;
    int maxDist = -1;
    Point farthest;
    for (auto& p : pts) {
        int d = lineDist(p1, p2, p);
        if (d > maxDist) { maxDist = d; farthest = p; }
    }
    hull.push_back(farthest);
    vector<Point> s1, s2;
    for (auto& p : pts) {
        if (findSide(p1, farthest, p) == 1) s1.push_back(p);
        if (findSide(farthest, p2, p) == 1) s2.push_back(p);
    }
    findHull(s1, p1, farthest, hull);
    findHull(s2, farthest, p2, hull);
}`,
      java: `import java.util.*;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

public class QuickHull {
    public List<Point> getHull(List<Point> points) {
        if (points.size() < 3) return points;
        List<Point> hull = new ArrayList<>();
        Point minX = points.stream().min(Comparator.comparingInt(p -> p.x)).get();
        Point maxX = points.stream().max(Comparator.comparingInt(p -> p.x)).get();
        
        hull.add(minX); hull.add(maxX);
        List<Point> leftSet = new ArrayList<>(), rightSet = new ArrayList<>();
        
        for (Point p : points) {
            if (findSide(minX, maxX, p) == 1) leftSet.add(p);
            else if (findSide(minX, maxX, p) == -1) rightSet.add(p);
        }
        
        findHull(leftSet, minX, maxX, hull);
        findHull(rightSet, maxX, minX, hull);
        return hull;
    }

    private void findHull(List<Point> set, Point p1, Point p2, List<Point> hull) {
        if (set.isEmpty()) return;
        Point farthest = set.stream().max(Comparator.comparingInt(p -> lineDist(p1, p2, p))).get();
        hull.add(farthest);
        List<Point> s1 = new ArrayList<>(), s2 = new ArrayList<>();
        for (Point p : set) {
            if (findSide(p1, farthest, p) == 1) s1.add(p);
            if (findSide(farthest, p2, p) == 1) s2.add(p);
        }
        findHull(s1, p1, farthest, hull);
        findHull(s2, farthest, p2, hull);
    }

    private int findSide(Point p1, Point p2, Point p) {
        int val = (p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x);
        return val > 0 ? 1 : (val < 0 ? -1 : 0);
    }

    private int lineDist(Point p1, Point p2, Point p) {
        return Math.abs((p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x));
    }
}`
    }
  },

  // Math
  {
    id: 'strassen',
    name: 'Strassen',
    category: 'Math',
    timeComplexity: 'O(n^2.81)',
    spaceComplexity: 'O(n²)',
    description: 'Fast matrix multiplication.',
    codeVariants: {
      js: `function add(A, B) {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

function sub(A, B) {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

function strassen(A, B) {
    const n = A.length;
    if (n === 1) return [[A[0][0] * B[0][0]]];

    const mid = n / 2;
    const a11 = [], a12 = [], a21 = [], a22 = [];
    const b11 = [], b12 = [], b21 = [], b22 = [];

    for (let i = 0; i < mid; i++) {
        a11[i] = A[i].slice(0, mid);
        a12[i] = A[i].slice(mid);
        a21[i] = A[i + mid].slice(0, mid);
        a22[i] = A[i + mid].slice(mid);

        b11[i] = B[i].slice(0, mid);
        b12[i] = B[i].slice(mid);
        b21[i] = B[i + mid].slice(0, mid);
        b22[i] = B[i + mid].slice(mid);
    }

    const p1 = strassen(a11, sub(b12, b22));
    const p2 = strassen(add(a11, a12), b22);
    const p3 = strassen(add(a21, a22), b11);
    const p4 = strassen(a22, sub(b21, b11));
    const p5 = strassen(add(a11, a22), add(b11, b22));
    const p6 = strassen(sub(a12, a22), add(b21, b22));
    const p7 = strassen(sub(a11, a21), add(b11, b12));

    const c = Array.from({ length: n }, () => Array(n));
    for (let i = 0; i < mid; i++) {
        for (let j = 0; j < mid; j++) {
            c[i][j] = p5[i][j] + p4[i][j] - p2[i][j] + p6[i][j];
            c[i][j + mid] = p1[i][j] + p2[i][j];
            c[i + mid][j] = p3[i][j] + p4[i][j];
            c[i + mid][j + mid] = p1[i][j] + p5[i][j] - p3[i][j] - p7[i][j];
        }
    }
    return c;
}`,
      python: `import numpy as np

def pad_to_power_of_two(A):
    n = A.shape[0]
    m = A.shape[1]
    max_dim = max(n, m)
    new_size = 1 << (max_dim - 1).bit_length()
    padded = np.zeros((new_size, new_size))
    padded[:n, :m] = A
    return padded

def strassen(A, B):
    n = len(A)
    # Base case: use standard multiplication for small matrices
    if n <= 64: 
        return np.dot(A, B)

    mid = n // 2
    # Divide matrices into quadrants
    a11, a12 = A[:mid, :mid], A[:mid, mid:]
    a21, a22 = A[mid:, :mid], A[mid:, mid:]
    b11, b12 = B[:mid, :mid], B[:mid, mid:]
    b21, b22 = B[mid:, :mid], B[mid:, mid:]

    # 7 Products
    p1 = strassen(a11, b12 - b22)
    p2 = strassen(a11 + a12, b22)
    p3 = strassen(a21 + a22, b11)
    p4 = strassen(a22, b21 - b11)
    p5 = strassen(a11 + a22, b11 + b22)
    p6 = strassen(a12 - a22, b21 + b22)
    p7 = strassen(a11 - a21, b11 + b12)

    # Combine results
    c11 = p5 + p4 - p2 + p6
    c12 = p1 + p2
    c21 = p3 + p4
    c22 = p1 + p5 - p3 - p7

    # Stack quadrants back together
    return np.vstack((np.hstack((c11, c12)), np.hstack((c21, c22))))`,
      cpp: `#include <bits/stdc++.h>

using namespace std;
typedef vector<vector<int>> Matrix;

Matrix add(Matrix A, Matrix B) {
    int n = A.size();
    Matrix res(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) res[i][j] = A[i][j] + B[i][j];
    return res;
}

Matrix sub(Matrix A, Matrix B) {
    int n = A.size();
    Matrix res(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) res[i][j] = A[i][j] - B[i][j];
    return res;
}

Matrix strassen(Matrix A, Matrix B) {
    int n = A.size();
    if (n == 1) return {{A[0][0] * B[0][0]}};

    int mid = n / 2;
    Matrix a11(mid, vector<int>(mid)), a12(mid, vector<int>(mid)), a21(mid, vector<int>(mid)), a22(mid, vector<int>(mid));
    Matrix b11(mid, vector<int>(mid)), b12(mid, vector<int>(mid)), b21(mid, vector<int>(mid)), b22(mid, vector<int>(mid));

    for (int i = 0; i < mid; i++) {
        for (int j = 0; j < mid; j++) {
            a11[i][j] = A[i][j]; a12[i][j] = A[i][j + mid];
            a21[i][j] = A[i + mid][j]; a22[i][j] = A[i + mid][j + mid];
            b11[i][j] = B[i][j]; b12[i][j] = B[i][j + mid];
            b21[i][j] = B[i + mid][j]; b22[i][j] = B[i + mid][j + mid];
        }
    }

    Matrix p1 = strassen(a11, sub(b12, b22));
    Matrix p2 = strassen(add(a11, a12), b22);
    Matrix p3 = strassen(add(a21, a22), b11);
    Matrix p4 = strassen(a22, sub(b21, b11));
    Matrix p5 = strassen(add(a11, a22), add(b11, b22));
    Matrix p6 = strassen(sub(a12, a22), add(b21, b22));
    Matrix p7 = strassen(sub(a11, a21), add(b11, b12));

    Matrix C(n, vector<int>(n));
    for (int i = 0; i < mid; i++) {
        for (int j = 0; j < mid; j++) {
            C[i][j] = p5[i][j] + p4[i][j] - p2[i][j] + p6[i][j];
            C[i][j + mid] = p1[i][j] + p2[i][j];
            C[i + mid][j] = p3[i][j] + p4[i][j];
            C[i + mid][j + mid] = p1[i][j] + p5[i][j] - p3[i][j] - p7[i][j];
        }
    }
    return C;
}`,
      java: `import java.util.Arrays;

public class Strassen {

    public int[][] multiply(int[][] A, int[][] B) {
        int n = A.length;
        // Calculate the next power of 2
        int m = 1;
        while (m < n) m *= 2;

        // Pad matrices with zeros if necessary
        int[][] APadded = new int[m][m];
        int[][] BPadded = new int[m][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                APadded[i][j] = A[i][j];
                BPadded[i][j] = B[i][j];
            }
        }

        int[][] CPadded = strassenRecursive(APadded, BPadded);

        // Extract the original n x n result
        int[][] result = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                result[i][j] = CPadded[i][j];
            }
        }
        return result;
    }

    private int[][] strassenRecursive(int[][] A, int[][] B) {
        int n = A.length;

        // Threshold for switching to standard multiplication for efficiency
        if (n <= 64) {
            return standardMultiply(A, B);
        }

        int mid = n / 2;
        int[][] a11 = new int[mid][mid];
        int[][] a12 = new int[mid][mid];
        int[][] a21 = new int[mid][mid];
        int[][] a22 = new int[mid][mid];
        int[][] b11 = new int[mid][mid];
        int[][] b12 = new int[mid][mid];
        int[][] b21 = new int[mid][mid];
        int[][] b22 = new int[mid][mid];

        split(A, a11, 0, 0);
        split(A, a12, 0, mid);
        split(A, a21, mid, 0);
        split(A, a22, mid, mid);
        split(B, b11, 0, 0);
        split(B, b12, 0, mid);
        split(B, b21, mid, 0);
        split(B, b22, mid, mid);

        int[][] p1 = strassenRecursive(a11, sub(b12, b22));
        int[][] p2 = strassenRecursive(add(a11, a12), b22);
        int[][] p3 = strassenRecursive(add(a21, a22), b11);
        int[][] p4 = strassenRecursive(a22, sub(b21, b11));
        int[][] p5 = strassenRecursive(add(a11, a22), add(b11, b22));
        int[][] p6 = strassenRecursive(sub(a12, a22), add(b21, b22));
        int[][] p7 = strassenRecursive(sub(a11, a21), add(b11, b12));

        int[][] c11 = add(sub(add(p5, p4), p2), p6);
        int[][] c12 = add(p1, p2);
        int[][] c21 = add(p3, p4);
        int[][] c22 = sub(sub(add(p1, p5), p3), p7);

        int[][] result = new int[n][n];
        join(c11, result, 0, 0);
        join(c12, result, 0, mid);
        join(c21, result, mid, 0);
        join(c22, result, mid, mid);

        return result;
    }

    private int[][] standardMultiply(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int k = 0; k < n; k++) {
                for (int j = 0; j < n; j++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }

    private int[][] add(int[][] A, int[][] B) {
        int n = A.length;
        int[][] res = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                res[i][j] = A[i][j] + B[i][j];
        return res;
    }

    private int[][] sub(int[][] A, int[][] B) {
        int n = A.length;
        int[][] res = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                res[i][j] = A[i][j] - B[i][j];
        return res;
    }

    private void split(int[][] p, int[][] c, int r, int co) {
        for (int i = 0; i < c.length; i++)
            System.arraycopy(p[i + r], co, c[i], 0, c.length);
    }

    private void join(int[][] c, int[][] p, int r, int co) {
        for (int i = 0; i < c.length; i++)
            System.arraycopy(c[i], 0, p[i + r], co, c.length);
    }
}`
    }
  },
  {
    id: 'karatsuba',
    name: 'Karatsuba',
    category: 'Math',
    timeComplexity: 'O(n^1.585)',
    spaceComplexity: 'O(n)',
    description: 'Fast multiplication of large integers.',
    codeVariants: {
      js: `function karatsuba(x, y) {
    if (x < 10n || y < 10n) return x * y;

    const n = Math.max(x.toString().length, y.toString().length);
    const m = BigInt(Math.floor(n / 2));
    const power = 10n ** m;

    const high1 = x / power;
    const low1 = x % power;
    const high2 = y / power;
    const low2 = y % power;

    const z0 = karatsuba(low1, low2);
    const z2 = karatsuba(high1, high2);
    const z1 = karatsuba(low1 + high1, low2 + high2) - z2 - z0;

    return (z2 * (10n ** (2n * m))) + (z1 * power) + z0;
}`,
      python: `def karatsuba(x, y):
    if x < 10 or y < 10:
        return x * y
    
    n = max(len(str(x)), len(str(y)))
    m = n // 2
    
    high1, low1 = divmod(x, 10**m)
    high2, low2 = divmod(y, 10**m)
    
    z0 = karatsuba(low1, low2)
    z2 = karatsuba(high1, high2)
    z1 = karatsuba(low1 + high1, low2 + high2) - z2 - z0
    
    return (z2 * 10**(2*m)) + (z1 * 10**m) + z0`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long karatsuba(long long x, long long y) {
    if (x < 10 || y < 10) return x * y;

    int n = max(to_string(x).length(), to_string(y).length());
    int m = n / 2;
    long long power = pow(10, m);

    long long high1 = x / power;
    long long low1 = x % power;
    long long high2 = y / power;
    long long low2 = y % power;

    long long z0 = karatsuba(low1, low2);
    long long z2 = karatsuba(high1, high2);
    long long z1 = karatsuba(low1 + high1, low2 + high2) - z2 - z0;

    return (z2 * (long long)pow(10, 2 * m)) + (z1 * power) + z0;
}`,
      java: `import java.math.BigInteger;

public class Karatsuba {

    public BigInteger multiply(BigInteger x, BigInteger y) {
        int n = Math.max(x.bitLength(), y.bitLength());
        
        // Base case: small numbers
        if (n <= 1000) return x.multiply(y);

        n = n / 2;

        // x = a + 2^n b, y = c + 2^n d
        BigInteger b = x.shiftRight(n);
        BigInteger a = x.subtract(b.shiftLeft(n));
        BigInteger d = y.shiftRight(n);
        BigInteger c = y.subtract(d.shiftLeft(n));

        // 3 recursive calls
        BigInteger ac = multiply(a, c);
        BigInteger bd = multiply(b, d);
        BigInteger abcd = multiply(a.add(b), c.add(d));

        return ac.add(abcd.subtract(ac).subtract(bd).shiftLeft(n)).add(bd.shiftLeft(2 * n));
    }
}`
    }
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci',
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Recursive or DP calculation of Fibonacci sequence.',
    codeVariants: {
      js: `function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0n, b = 1n; // Using BigInt for large numbers
    for (let i = 2; i <= n; i++) {
        let next = a + b;
        a = b;
        b = next;
    }
    return b;
}`,
      python: `def fibonacci(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      cpp: `long long fibonacci(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long next = a + b;
        a = b;
        b = next;
    }
    return b;
}`,
      java: `public long fibonacci(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long next = a + b;
        a = b;
        b = next;
    }
    return b;
}`
    }
  },

  // Backtracking
  {
    id: 'backtracking',
    name: 'N-Queens',
    category: 'Backtracking',
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N²)',
    description: 'Classic backtracking to place queens safely.',
    codeVariants: {
      js: `function isSafe(board, row, col, n) {
    for (let i = 0; i < col; i++) if (board[row][i] === 1) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 1) return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j] === 1) return false;
    return true;
}

function solve(n) {
    let board = Array.from({ length: n }, () => Array(n).fill(0));
    const backtrack = (col) => {
        if (col >= n) return true;
        for (let i = 0; i < n; i++) {
            if (isSafe(board, i, col, n)) {
                board[i][col] = 1;
                if (backtrack(col + 1)) return true;
                board[i][col] = 0;
            }
        }
        return false;
    };
    return backtrack(0) ? board : null;
}`,
      python: `def is_safe(board, row, col, n):
    # Check row on left side
    for i in range(col):
        if board[row][i] == 1: return False
    # Check upper diagonal on left
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1: return False
    # Check lower diagonal on left
    for i, j in zip(range(row, n), range(col, -1, -1)):
        if board[i][j] == 1: return False
    return True

def solve_n_queens(board, col, n):
    if col >= n: return True
    for i in range(n):
        if is_safe(board, i, col, n):
            board[i][col] = 1
            if solve_n_queens(board, col + 1, n): return True
            board[i][col] = 0 # Backtrack
    return False`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isSafe(vector<vector<int>>& board, int row, int col, int n) {
    for (int i = 0; i < col; i++) if (board[row][i]) return false;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (int i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j]) return false;
    return true;
}

bool solveNQueens(vector<vector<int>>& board, int col, int n) {
    if (col >= n) return true;
    for (int i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQueens(board, col + 1, n)) return true;
            board[i][col] = 0; // Backtrack
        }
    }
    return false;
}`,
      java: `public class NQueens {
    public void solve(int n) {
        int[][] board = new int[n][n];
        if (backtrack(board, 0, n)) {
            printBoard(board);
        } else {
            System.out.println("No solution exists");
        }
    }

    private boolean backtrack(int[][] board, int col, int n) {
        if (col >= n) return true;

        for (int i = 0; i < n; i++) {
            if (isSafe(board, i, col, n)) {
                board[i][col] = 1; // Place queen
                if (backtrack(board, col + 1, n)) return true;
                board[i][col] = 0; // Backtrack
            }
        }
        return false;
    }

    private boolean isSafe(int[][] board, int row, int col, int n) {
        for (int i = 0; i < col; i++) if (board[row][i] == 1) return false;
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 1) return false;
        for (int i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j] == 1) return false;
        return true;
    }
}`
    }
  }
];
