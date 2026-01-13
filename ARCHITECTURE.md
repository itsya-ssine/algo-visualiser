# App Architecture

## Project Structure

```
algo-visualiser/
├── components/
│   ├── AlgorithmInsight.tsx       - Displays algorithm description
│   ├── CodeViewer.tsx             - Shows source code with line highlighting
│   ├── ContentArea.tsx            - Main content wrapper (Visualization + Insight)
│   ├── Controls.tsx               - Playback controls (play, pause, speed, progress)
│   ├── Header.tsx                 - Top navigation bar
│   ├── MobileSidebarOverlay.tsx   - Mobile menu backdrop
│   ├── Sidebar.tsx                - Algorithm selection sidebar
│   ├── SidebarDrawer.tsx          - Animated sidebar drawer for mobile
│   ├── Visualizer.tsx             - Algorithm visualization (arrays, graphs, trees)
│   └── VisualizationArea.tsx      - Visualization container with description
├── hooks/
│   └── useAlgorithmState.ts       - Algorithm state management hook
├── services/
│   └── algorithmGenerator.ts      - Algorithm execution and snapshot generation
├── types.ts                       - TypeScript type definitions
├── constants.tsx                  - Algorithm definitions and constants
├── App.tsx                        - Main app component (orchestrator)
└── index.tsx                      - React entry point
```

## Component Hierarchy

```
App
├── MobileSidebarOverlay
├── SidebarDrawer
│   └── Sidebar
├── Header
├── ContentArea
│   ├── VisualizationArea
│   │   └── Visualizer
│   └── AlgorithmInsight
└── Controls
```

## State Management

### useAlgorithmState Hook
Centralized hook managing:
- Selected algorithm
- Snapshots (execution steps)
- Current step in playback
- Playback state (playing/paused)
- Playback speed
- Utility functions (play, pause, step forward/back, reset)

## Key Design Decisions

1. **Custom Hook (useAlgorithmState)**: Separates all algorithm logic from UI
2. **Component Composition**: Small, focused components with single responsibility
3. **Props-Based Communication**: Clean data flow through props
4. **No Comments**: Self-documenting code with clear naming
5. **Responsive Design**: Mobile-first with Tailwind CSS breakpoints
6. **Dynamic Viewport**: Uses `h-dvh` for mobile browser compatibility

## Component Responsibilities

| Component | Purpose |
|-----------|---------|
| App | Orchestrates all components and state |
| Header | Top bar with title and controls |
| SidebarDrawer | Animated mobile sidebar wrapper |
| Sidebar | Algorithm selection list |
| MobileSidebarOverlay | Mobile menu backdrop |
| ContentArea | Main content wrapper |
| VisualizationArea | Visualization + description |
| Visualizer | Canvas for algorithm visualization |
| AlgorithmInsight | Algorithm description text |
| Controls | Playback controls and progress |

## Data Flow

1. User selects algorithm → `handleSelectAlgo()` → updates state
2. Algorithm state changes → `useAlgorithmState()` initializes
3. Algorithm executes → generates snapshots
4. User clicks play/pause → controls update playback
5. Playback updates step → Visualizer re-renders with current snapshot
