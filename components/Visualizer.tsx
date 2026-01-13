
import React from 'react';
import { Snapshot, GraphNode, GraphEdge, Point, TreeNode, MergeNode } from '../types';

interface VisualizerProps {
  snapshot: Snapshot;
  algorithmId: string;
}

const GraphView: React.FC<{ graphState: { nodes: GraphNode[], edges: GraphEdge[] }, markers?: any, extraData?: any }> = ({ graphState, markers, extraData }) => {
  const renderSvg = () => (
    <svg className="w-full h-full min-w-[300px] min-h-[300px]" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="20" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#52525b" />
        </marker>
      </defs>
      
      {/* Edges */}
      {graphState.edges.map((edge, i) => {
        const fromNode = graphState.nodes[edge.from];
        const toNode = graphState.nodes[edge.to];
        if (!fromNode || !toNode) return null;

        const isActive = edge.state === 'active';
        const isMst = edge.state === 'mst';
        const isPath = edge.state === 'path';

        const isTargetEdge = markers && (
          (markers.i === edge.from && markers.j === edge.to) ||
          (markers.i === edge.to && markers.j === edge.from)
        );

        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;

        return (
          <g key={`edge-group-${i}`}>
            <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
              stroke={isActive ? '#facc15' : (isMst ? '#4ade80' : (isPath ? '#6366f1' : (isTargetEdge ? '#f472b6' : '#3f3f46')))}
              strokeWidth={isActive || isMst || isPath || isTargetEdge ? 4 : 2} markerEnd="url(#arrowhead)" 
              className="transition-all duration-300" />
            
            {/* Edge Weight Label with Background for better visibility */}
            <g transform={`translate(${midX}, ${midY})`}>
              <rect x="-12" y="-10" width="24" height="18" rx="4" fill="#18181b" className="opacity-90" />
              <text 
                x="0" y="3" 
                fill={isActive || isTargetEdge ? "#ffffff" : "#a1a1aa"} 
                fontSize="11" 
                fontWeight="bold" 
                textAnchor="middle" 
                className="pointer-events-none select-none"
              >
                {edge.weight}
              </text>
            </g>
          </g>
        );
      })}

      {/* Nodes */}
      {graphState.nodes.map((node) => {
        let fill = '#18181b';
        let stroke = '#3f3f46';
        let strokeWidth = 3;
        if (node.state === 'current') { stroke = '#facc15'; fill = '#422006'; }
        if (node.state === 'visited') { stroke = '#4ade80'; fill = '#064e3b'; }
        if (node.state === 'neighbor') { stroke = '#06b6d4'; fill = '#164e63'; strokeWidth = 3; }
        if (markers && node.id === markers.k) { stroke = '#facc15'; strokeWidth = 4; }
        if (markers && (node.id === markers.i || node.id === markers.j)) { stroke = '#6366f1'; }

        return (
          <g key={`node-group-${node.id}`}>
            <circle cx={node.x} cy={node.y} r="22" fill={fill} stroke={stroke} strokeWidth={strokeWidth} className="transition-all duration-300 shadow-xl" />
            <text x={node.x} y={node.y + 6} fill="white" fontSize="14" fontWeight="800" textAnchor="middle" className="pointer-events-none select-none">{node.label}</text>
            {node.value !== undefined && (
              <g transform={`translate(${node.x}, ${node.y - 32})`}>
                <text fill="#818cf8" fontSize="10" fontWeight="700" textAnchor="middle" className="pointer-events-none select-none">
                  {node.value}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );

  // Prepare side data
  const labels: string[] = extraData?.nodeLabels || graphState.nodes.map(n => n.label);
  const distances: any = extraData?.distances;
  const parents: any = extraData?.parents;
  const hasDistances = distances && Object.keys(distances).length > 0;
  const hasParents = parents && Object.keys(parents).length > 0;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 p-3 overflow-hidden">
      <div className="flex-1 w-full h-full min-h-[300px] bg-zinc-950/20 rounded-xl border border-zinc-800/50 shadow-inner">
        {renderSvg()}
      </div>
      
      {/* Side Panel for Graph Properties */}
      <div className="w-full lg:w-72 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 overflow-y-auto flex flex-col gap-6 shadow-2xl">
        {hasDistances && (
          <section>
            <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Node Distances
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {labels.map((lab, idx) => (
                <div key={`dist-${idx}`} className="flex justify-between items-center px-3 py-1.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <span className="text-sm font-bold text-zinc-300">{lab}</span>
                  <span className="font-mono text-sm text-indigo-400">
                    {distances[idx] === Infinity || distances[idx] === undefined ? '∞' : distances[idx]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasParents && (
          <section>
            <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Shortest Path Tree
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {labels.map((lab, idx) => (
                <div key={`parent-${idx}`} className="flex justify-between items-center px-3 py-1.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <span className="text-sm font-bold text-zinc-300">{lab}</span>
                  <span className="font-mono text-sm text-cyan-400">
                    {parents[idx] === null || parents[idx] === undefined ? '-' : labels[parents[idx]]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="flex-1">
          <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Edge Weights
          </h4>
          <div className="space-y-1.5">
            {graphState.edges.map((e, i) => {
              const from = graphState.nodes[e.from]?.label || e.from;
              const to = graphState.nodes[e.to]?.label || e.to;
              const state = e.state || 'default';
              
              let borderColor = 'border-zinc-700/50';
              let bgColor = 'bg-zinc-800/30';
              let textColor = 'text-zinc-400';
              
              if (state === 'active') { borderColor = 'border-yellow-500/50'; bgColor = 'bg-yellow-500/10'; textColor = 'text-yellow-400'; }
              else if (state === 'mst') { borderColor = 'border-emerald-500/50'; bgColor = 'bg-emerald-500/10'; textColor = 'text-emerald-400'; }
              else if (state === 'path') { borderColor = 'border-indigo-500/50'; bgColor = 'bg-indigo-500/10'; textColor = 'text-indigo-400'; }

              return (
                <div key={`edge-li-${i}`} className={`flex justify-between items-center px-3 py-1.5 rounded-lg border ${borderColor} ${bgColor} transition-colors`}>
                  <span className={`text-xs font-bold ${textColor}`}>{from} → {to}</span>
                  <span className="font-mono text-xs font-semibold">{e.weight}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

const TreeView: React.FC<{ treeState: TreeNode[] }> = ({ treeState }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = React.useState({ width: 600, height: 500 });

  React.useEffect(() => {
    const updateSize = () => {
      if (svgRef.current?.parentElement) {
        const parent = svgRef.current.parentElement;
        setSvgSize({ width: parent.clientWidth, height: parent.clientHeight });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const calculatePositions = (nodes: TreeNode[]): { [key: number]: { x: number; y: number } } => {
    const positions: { [key: number]: { x: number; y: number } } = {};
    const depth = Math.ceil(Math.log2(nodes.length + 1));
    const baseOffset = Math.min(150, svgSize.width / (Math.pow(2, Math.min(3, depth)) + 2));
    
    const traverse = (idx: number, xPos: number, yPos: number, xOffset: number) => {
      if (idx >= nodes.length) return;
      positions[idx] = { x: xPos, y: yPos };
      
      const leftChild = 2 * idx + 1;
      const rightChild = 2 * idx + 2;
      const yGap = Math.max(60, svgSize.height / (depth + 2));
      
      if (leftChild < nodes.length) {
        traverse(leftChild, xPos - xOffset, yPos + yGap, Math.max(20, xOffset / 2));
      }
      if (rightChild < nodes.length) {
        traverse(rightChild, xPos + xOffset, yPos + yGap, Math.max(20, xOffset / 2));
      }
    };
    
    traverse(0, svgSize.width / 2, 40, baseOffset);
    return positions;
  };

  const positions = calculatePositions(treeState);
  const nodeRadius = Math.max(15, Math.min(25, svgSize.width / 30));
  const fontSize = Math.max(10, Math.min(14, svgSize.width / 60));

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full" viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} preserveAspectRatio="xMidYMid meet">
        {/* Draw edges */}
        {treeState.map((node, idx) => {
          const leftChild = 2 * idx + 1;
          const rightChild = 2 * idx + 2;
          const parentPos = positions[idx];

          return (
            <g key={`edges-${idx}`}>
              {leftChild < treeState.length && parentPos && positions[leftChild] && (
                <line x1={parentPos.x} y1={parentPos.y} x2={positions[leftChild].x} y2={positions[leftChild].y}
                  stroke="#3f3f46" strokeWidth={Math.max(1, svgSize.width / 300)} />
              )}
              {rightChild < treeState.length && parentPos && positions[rightChild] && (
                <line x1={parentPos.x} y1={parentPos.y} x2={positions[rightChild].x} y2={positions[rightChild].y}
                  stroke="#3f3f46" strokeWidth={Math.max(1, svgSize.width / 300)} />
              )}
            </g>
          );
        })}

        {/* Draw nodes */}
        {treeState.map((node, idx) => {
          const pos = positions[idx];
          if (!pos) return null;

          let fill = '#18181b';
          let stroke = '#52525b';
          
          if (node.state === 'active') {
            stroke = '#facc15';
            fill = '#422006';
          } else if (node.state === 'highlight') {
            stroke = '#f97316';
            fill = '#7c2d12';
          } else if (node.state === 'sorted') {
            stroke = '#4ade80';
            fill = '#064e3b';
          }

          return (
            <g key={`node-${idx}`}>
              <circle cx={pos.x} cy={pos.y} r={nodeRadius} fill={fill} stroke={stroke} strokeWidth="3" />
              <text x={pos.x} y={pos.y + fontSize / 3} fill="white" fontSize={fontSize} fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const MergeView: React.FC<{ mergeState: { nodes: MergeNode[]; array: number[] } }> = ({ mergeState }) => {
  const { nodes, array } = mergeState;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = React.useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (svgRef.current?.parentElement) {
        const parent = svgRef.current.parentElement;
        setSvgSize({ width: parent.clientWidth, height: parent.clientHeight - 60 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const maxLevels = Math.max(...nodes.map(n => n.level), 0) + 1;
  const levelHeight = Math.max(isMobile ? 70 : 90, svgSize.height / (maxLevels + 0.5));
  const nodeWidth = isMobile ? Math.max(60, Math.min(90, svgSize.width / 10)) : Math.max(80, Math.min(120, svgSize.width / 8));
  const nodeHeight = isMobile ? 50 : 65;
  const fontSize = isMobile ? Math.max(8, Math.min(11, svgSize.width / 110)) : Math.max(10, Math.min(13, svgSize.width / 95));
  const detailFontSize = isMobile ? Math.max(6, Math.min(8, svgSize.width / 140)) : Math.max(8, Math.min(10, svgSize.width / 120));
  const strokeWidth = Math.max(2, svgSize.width / 350);
  
  const calculateNodeX = (node: MergeNode) => {
    const spread = svgSize.width / (Math.pow(2, node.level) + 1);
    const indexAtLevel = nodes.filter(n => n.level === node.level).findIndex(n => n.id === node.id);
    return spread * (indexAtLevel + 1);
  };

  const getStateLabel = (state?: string) => {
    if (state === 'dividing') return 'DIV';
    if (state === 'merging') return 'MRG';
    if (state === 'completed') return 'OK';
    return '';
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto w-full">
        <svg ref={svgRef} className="w-full" style={{ minHeight: `${svgSize.height}px` }} 
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} preserveAspectRatio="xMidYMid meet"> 
          {nodes.map((node, idx) => {
            const parentLevel = node.level - 1;
            const parentNodes = nodes.filter(n => n.level === parentLevel);
            const parentNode = parentNodes.find(p => 
              (p.left <= node.left && node.right <= p.right)
            );
            
            if (!parentNode) return null;
            
            const parentX = calculateNodeX(parentNode);
            const parentY = parentNode.level * levelHeight + 50;
            const childX = calculateNodeX(node);
            const childY = node.level * levelHeight + 50;
            
            return (
              <line key={`line-${idx}`} x1={parentX} y1={parentY} x2={childX} y2={childY} 
                stroke="#3f3f46" strokeWidth={strokeWidth} strokeDasharray={node.state === 'completed' ? '0' : '4,2'} />
            );
          })}
          
          {nodes.map((node) => {
            const x = calculateNodeX(node);
            const y = node.level * levelHeight + 50;
            
            let fill = '#18181b';
            let stroke = '#52525b';
            
            if (node.state === 'dividing') {
              stroke = '#facc15';
              fill = '#422006';
            } else if (node.state === 'merging') {
              stroke = '#f97316';
              fill = '#7c2d12';
            } else if (node.state === 'completed') {
              stroke = '#4ade80';
              fill = '#064e3b';
            }
            
            return (
              <g key={node.id}>
                <rect x={x - nodeWidth / 2} y={y - nodeHeight / 2} width={nodeWidth} height={nodeHeight} rx="6"
                  fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
                
                <text x={x} y={y - 8} fill="white" fontSize={fontSize} fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">
                  [{node.left}..{node.right}]
                </text>
                
                <text x={x} y={y + 8} fill="#a1a1aa" fontSize={detailFontSize} textAnchor="middle" className="pointer-events-none select-none">
                  size: {node.right - node.left + 1}
                </text>
                
                <circle cx={x + nodeWidth / 2 - 8} cy={y - nodeHeight / 2 + 8} r="6" fill={stroke} />
                <text x={x + nodeWidth / 2 - 8} y={y - nodeHeight / 2 + 11} fill="white" fontSize={detailFontSize - 1} fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none">
                  {getStateLabel(node.state)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const MatrixView: React.FC<{ data: any, markers: any }> = ({ data, markers }) => {
    return (
        <div className="flex items-center justify-center h-full w-full p-2 overflow-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 lg:p-4">
          <table className="border-collapse">
            <tbody>
              {data.map((row: any, i: number) => (
                <tr key={i}>
                  {row.map((cell: any, j: number) => {
                    const isKRowCol = markers.k === i || markers.k === j;
                    const isTarget = markers.i === i && markers.j === j;
                    const isPivot = i === markers.k && j === markers.k;

                    let cellBg = 'bg-transparent';
                    if (isTarget) cellBg = 'bg-indigo-600 text-white ring-2 ring-indigo-400 z-10';
                    else if (isPivot) cellBg = 'bg-yellow-600 text-white';
                    else if (isKRowCol) cellBg = 'bg-zinc-800 text-zinc-300';
                    else cellBg = 'text-zinc-500';

                    return (
                      <td key={j} className={`p-2 lg:p-4 border border-zinc-800 text-center font-mono text-[10px] lg:text-sm transition-colors ${cellBg}`}>
                        {cell === Infinity ? '∞' : cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

const Visualizer: React.FC<VisualizerProps> = ({ snapshot, algorithmId }) => {
  const { type, data, activeIndices = [], minIndices = [], markers = {}, graphState, points } = snapshot;

  if (type === 'array' && Array.isArray(data)) {
    const maxVal = Math.max(...data, 1);
    const showIndices = data.length <= 20;
    const isBinarySearch = algorithmId === 'binary-search';
    
    const pointers: { [key: string]: number } = {};
    if (markers) {
      Object.entries(markers).forEach(([key, value]) => {
        if (typeof value === 'number' && key !== 'target') {
          pointers[key] = value;
        }
      });
    }
    
    return (
      <div className="flex flex-col items-center justify-end h-full w-full px-1 lg:px-4 relative">
        {Object.keys(pointers).length > 0 && (
          <div className="absolute top-2 left-0 right-0 px-1 lg:px-4 pointer-events-none">
            <div className="flex items-start justify-center w-full gap-0.5 lg:gap-1 relative" style={{ height: '20px' }}>
              {Object.entries(pointers).map(([label, idx]) => {
                const position = (idx / data.length) * 100;
                const pointerColors: { [key: string]: string } = {
                  'i': '#ec4899', 'j': '#8b5cf6', 'mid': '#06b6d4', 'k': '#f59e0b', 'l': '#ef4444', 'r': '#ef4444', 'm': '#10b981'
                };
                const color = pointerColors[label] || '#a1a1aa';
                
                return (
                  <div key={`ptr-${label}`} className="absolute flex flex-col items-center"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
                    <div className="text-[9px] lg:text-[11px] font-bold text-white px-1.5 py-0.5 rounded bg-zinc-800 border" style={{ borderColor: color }}>
                      {label}
                    </div>
                    <div className="w-0.5 h-2" style={{ backgroundColor: color }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-end justify-center h-5/6 w-full gap-0.5 lg:gap-1" style={{ marginTop: Object.keys(pointers).length > 0 ? '30px' : '0' }}>
          {data.map((val, idx) => {
            const isActive = activeIndices.includes(idx);
            const isMin = minIndices.includes(idx);
            const isMarked = markers && (markers.l === idx || markers.r === idx);
            let bgColor = 'bg-indigo-500';
            if (isActive) bgColor = 'bg-yellow-400';
            if (isMin) bgColor = 'bg-orange-500';
            if (isMarked) bgColor = 'bg-red-500';
            return (
              <div key={idx} className={`transition-all duration-300 rounded-t flex items-center justify-center text-[8px] lg:text-[10px] font-bold text-zinc-950 ${bgColor}`}
                style={{ height: `${(val / maxVal) * 90}%`, width: `${Math.max(12, 100 / data.length)}%` }}>
                <span className="hidden sm:inline">{data.length < 25 ? val : ''}</span>
              </div>
            );
          })}
        </div>
        
        {showIndices && (
          <div className="flex items-start justify-center w-full gap-0.5 lg:gap-1 h-1/6 pt-1">
            {data.map((_, idx) => (
              <div key={`idx-${idx}`} className="text-[7px] lg:text-[9px] text-zinc-500 font-mono font-semibold flex-1 text-center"
                style={{ width: `${Math.max(12, 100 / data.length)}%` }}>
                {idx}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (type === 'graph' && graphState) {
    return <GraphView graphState={graphState} markers={markers} extraData={data} />;
  }

  if (type === 'tree' && snapshot.treeState) {
    return <TreeView treeState={snapshot.treeState} />;
  }

  if (type === 'merge' && snapshot.mergeState) {
    return <MergeView mergeState={snapshot.mergeState} />;
  }

  if (type === 'matrix' && Array.isArray(data)) {
    if (graphState) {
        return (
            <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full gap-4">
                <div className="flex-1 w-full h-full min-h-[250px]">
                    <MatrixView data={data} markers={markers} />
                </div>
                <div className="flex-1 w-full h-full min-h-[300px]">
                  <GraphView graphState={graphState} markers={markers} extraData={data} />
                </div>
            </div>
        );
    }
    return <MatrixView data={data} markers={markers} />;
  }

  if (type === 'grid' && Array.isArray(data)) {
    return (
      <div className="flex items-center justify-center h-full w-full p-2 overflow-auto">
        <div className="grid gap-0.5 lg:gap-1 bg-zinc-800 p-1 lg:p-2 rounded-lg" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
          {data.flat().map((cell, idx) => {
            const isActive = activeIndices.includes(idx);
            return (
              <div key={idx} className={`w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded border border-zinc-700 transition-colors shrink-0
                ${isActive ? 'bg-yellow-400/20 border-yellow-400' : 'bg-zinc-900'} ${cell ? 'text-xl lg:text-2xl' : ''}`}>
                {cell === 1 ? '👑' : ''}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'points' && points) {
    return (
      <div className="w-full h-full overflow-hidden">
        <svg className="w-full h-full min-w-[300px] min-h-[300px]" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          {markers.split !== undefined && (
            <line x1={markers.split} y1={0} x2={markers.split} y2={400} stroke="#3f3f46" strokeDasharray="5,5" strokeWidth="1" />
          )}
          {markers.line && Array.isArray(markers.line) && markers.line.length === 2 && markers.line[0] && markers.line[1] && (
            <>
              <line 
                x1={markers.line[0].x} 
                y1={markers.line[0].y} 
                x2={markers.line[1].x} 
                y2={markers.line[1].y} 
                stroke="#22d3ee" 
                strokeWidth="3" 
                strokeDasharray="4,2"
                opacity="0.8"
              />
            </>
          )}
          {markers.hull && markers.hull.length > 1 && (
            <polygon points={markers.hull.map((p: Point) => `${p.x},${p.y}`).join(' ')} 
              fill="rgba(74, 222, 128, 0.1)" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" />
          )}
          {points.map((p, i) => {
            let fill = '#3f3f46';
            let r = 5;
            if (p.state === 'active') fill = '#facc15';
            if (p.state === 'hull') { fill = '#4ade80'; r = 6; }
            if (p.state === 'closest') { fill = '#ef4444'; r = 7; }
            return <circle key={i} cx={p.x} cy={p.y} r={r} fill={fill} className="transition-all duration-300" />;
          })}
        </svg>
      </div>
    );
  }

  if (type === 'math') {
    const mathData = data as any;
    
    // Render matrix visualization
    if (mathData?.type === 'matrices') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-center text-indigo-300 text-lg lg:text-xl font-bold">{mathData.title}</h2>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(mathData.matrices).map(([name, matrix]: any) => (
                <div key={name} className="space-y-2">
                  <div className="text-center text-indigo-400 font-semibold">{name}</div>
                  <div className="bg-zinc-800 p-4 rounded border border-zinc-700">
                    {(matrix as number[][]).map((row, i) => (
                      <div key={i} className="flex gap-3 justify-center font-mono text-indigo-300">
                        {row.map((val, j) => (
                          <div key={j} className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center border border-indigo-500/50">
                            {val}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Render submatrices visualization
    if (mathData?.type === 'submatrices') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-center text-indigo-300 text-lg lg:text-xl font-bold">{mathData.title}</h2>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(mathData.submatrices).map(([matName, elements]: any) => (
                <div key={matName} className="space-y-2">
                  <div className="text-center text-indigo-400 font-semibold">{matName} Quadrants</div>
                  <div className="bg-zinc-800 p-4 rounded border border-zinc-700 grid grid-cols-2 gap-2">
                    {Object.entries(elements).map(([quad, val]: any) => (
                      <div key={quad} className="bg-zinc-900 p-3 rounded border border-indigo-500/50 text-center">
                        <div className="text-sm text-indigo-400 font-mono">{quad}</div>
                        <div className="text-lg font-bold text-indigo-300">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Render M-value visualization
    if (mathData?.type === 'mvalue') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="bg-zinc-800 p-6 lg:p-10 rounded-xl border border-indigo-500/50 max-w-xl space-y-4">
            <h2 className="text-center text-indigo-300 text-lg font-bold">{mathData.title}</h2>
            <div className="bg-zinc-900 p-4 rounded border border-zinc-700 space-y-3 font-mono text-sm lg:text-base">
              <div className="text-indigo-300">Formula: <span className="text-indigo-400">{mathData.formula}</span></div>
              <div className="text-indigo-300">Calculation: <span className="text-green-400">{mathData.calculation}</span></div>
              <div className="text-indigo-300">Result: <span className="text-yellow-400 text-lg font-bold">{mathData.result}</span></div>
            </div>
          </div>
        </div>
      );
    }

    // Render result matrix
    if (mathData?.type === 'result') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-6 max-w-md">
            <h2 className="text-center text-green-400 text-lg lg:text-xl font-bold">{mathData.title}</h2>
            <div className="bg-zinc-800 p-6 rounded-xl border-2 border-green-500/50">
              {(mathData.matrix as number[][]).map((row, i) => (
                <div key={i} className="flex gap-4 justify-center font-mono text-green-300 mb-2">
                  {row.map((val, j) => (
                    <div key={j} className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border-2 border-green-500/50 text-lg font-bold">
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Render Karatsuba init
    if (mathData?.type === 'karatsuba_init') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="bg-zinc-800 p-8 rounded-xl border border-cyan-500/50 max-w-md space-y-6">
            <h2 className="text-center text-cyan-300 text-lg font-bold">{mathData.title}</h2>
            <div className="space-y-4 font-mono text-base">
              <div className="bg-zinc-900 p-4 rounded border border-cyan-500/30 text-center">
                <div className="text-cyan-400 mb-2">X =</div>
                <div className="text-3xl font-bold text-cyan-300">{mathData.x}</div>
              </div>
              <div className="bg-zinc-900 p-4 rounded border border-cyan-500/30 text-center">
                <div className="text-cyan-400 mb-2">Y =</div>
                <div className="text-3xl font-bold text-cyan-300">{mathData.y}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render Karatsuba split
    if (mathData?.type === 'karatsuba_split') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-center text-cyan-300 text-lg font-bold">{mathData.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 p-4 rounded border border-cyan-500/50">
                <div className="text-cyan-400 font-mono text-sm mb-3">X Split</div>
                <div className="space-y-2 font-mono text-indigo-300">
                  <div>a (high) = <span className="text-cyan-300 font-bold">{mathData.a}</span></div>
                  <div>b (low) = <span className="text-cyan-300 font-bold">{mathData.b}</span></div>
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded border border-cyan-500/50">
                <div className="text-cyan-400 font-mono text-sm mb-3">Y Split</div>
                <div className="space-y-2 font-mono text-indigo-300">
                  <div>c (high) = <span className="text-cyan-300 font-bold">{mathData.c}</span></div>
                  <div>d (low) = <span className="text-cyan-300 font-bold">{mathData.d}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render Karatsuba products
    if (mathData?.type === 'karatsuba_products') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-center text-cyan-300 text-lg font-bold">{mathData.title}</h2>
            <div className="space-y-3 font-mono text-sm">
              <div className="bg-zinc-800 p-4 rounded border border-cyan-500/50">
                <div className="text-green-400 mb-2">P1: a × c =</div>
                <div className="text-2xl font-bold text-green-300">{mathData.ac}</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded border border-cyan-500/50">
                <div className="text-blue-400 mb-2">P2: b × d =</div>
                <div className="text-2xl font-bold text-blue-300">{mathData.bd}</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded border border-yellow-500/50">
                <div className="text-yellow-400 mb-2">P3: (a+b) × (c+d) =</div>
                <div className="text-2xl font-bold text-yellow-300">{mathData.gauss}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render Karatsuba result
    if (mathData?.type === 'karatsuba_result') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="bg-zinc-800 p-8 rounded-xl border-2 border-green-500/50 max-w-lg space-y-6">
            <h2 className="text-center text-green-400 text-lg font-bold">{mathData.title}</h2>
            <div className="bg-zinc-900 p-4 rounded border border-zinc-700 font-mono text-xs lg:text-sm space-y-3">
              <div className="text-indigo-300">Result = (P1 × 10⁴) + (P_middle × 10²) + P2</div>
              <div className="text-indigo-300">= ({mathData.ac} × 10000) + ({mathData.m} × 100) + {mathData.bd}</div>
              <div className="text-center pt-2 border-t border-zinc-700">
                <div className="text-green-400 text-sm mb-2">Final Answer:</div>
                <div className="text-3xl font-bold text-green-300">{mathData.result}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render Fibonacci sequence
    if (mathData?.type === 'fibonacci') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-8 overflow-auto">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-center text-purple-300 text-lg font-bold">{mathData.title}</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {(mathData.sequence as number[]).map((val, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-lg border-2 font-mono font-bold text-base lg:text-lg transition-all ${
                    mathData.activeIndices && mathData.activeIndices.includes(idx)
                      ? 'bg-yellow-900/50 border-yellow-400 text-yellow-300'
                      : 'bg-zinc-800 border-purple-500/50 text-purple-300'
                  }`}
                >
                  F({idx}) = {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Fallback for unhandled math types (string data)
    if (typeof data === 'string') {
      return (
        <div className="flex items-center justify-center h-full w-full p-4 lg:p-12 overflow-auto">
          <div className="bg-zinc-900 p-6 lg:p-10 rounded-2xl lg:rounded-3xl border border-zinc-800 shadow-2xl font-mono text-sm lg:text-lg text-indigo-400 whitespace-pre-wrap leading-relaxed w-full max-w-2xl relative">
            <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            {data}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full w-full p-4 lg:p-12 overflow-auto">
        <div className="bg-zinc-900 p-6 lg:p-10 rounded-2xl lg:rounded-3xl border border-zinc-800 shadow-2xl font-mono text-sm lg:text-lg text-indigo-400 whitespace-pre-wrap leading-relaxed w-full max-w-2xl relative">
          <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          {JSON.stringify(data, null, 2)}
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center h-full text-zinc-500 italic text-sm">No visualizer for this type</div>;
};

export default Visualizer;
