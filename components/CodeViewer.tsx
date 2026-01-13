
import React from 'react';

interface CodeViewerProps {
  code: string;
  currentLine: number;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, currentLine }) => {
  const lines = code.split('\n');

  return (
    <div className="flex-1 bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      <div className="bg-zinc-800/50 px-4 py-2 border-b border-zinc-700 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Source Code</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div className="p-4 overflow-auto code-font text-sm leading-relaxed flex-1">
        {lines.map((line, idx) => {
          const isCurrent = idx + 1 === currentLine;
          return (
            <div
              key={idx}
              className={`flex gap-4 px-2 py-0.5 rounded transition-colors ${
                isCurrent ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30' : 'text-zinc-400'
              }`}
            >
              <span className="w-6 text-right text-zinc-600 select-none">{idx + 1}</span>
              <pre className="whitespace-pre">{line}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeViewer;
