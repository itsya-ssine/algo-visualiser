
import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { CodeVariants } from '../types';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  algorithmName: string;
  codeVariants?: CodeVariants;
}

const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, algorithmName, codeVariants }) => {
  const [activeLang, setActiveLang] = useState<keyof CodeVariants>('js');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const languages = [
    { id: 'js', name: 'JavaScript', color: 'text-yellow-400' },
    { id: 'python', name: 'Python', color: 'text-blue-400' },
    { id: 'cpp', name: 'C++', color: 'text-purple-400' },
    { id: 'java', name: 'Java', color: 'text-red-400' },
  ];

  const currentCode = codeVariants?.[activeLang] || "Code implementation not available for this language yet.";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    const keywords = ['function', 'let', 'var', 'const', 'for', 'while', 'if', 'else', 'return', 'def', 'class', 'public', 'static', 'void', 'int', 'range', 'len', 'import', 'include'];
    const parts = code.split(/(\W+)/);
    return parts.map((part, i) => {
      if (keywords.includes(part)) {
        return <span key={i} className="text-pink-400 font-bold">{part}</span>;
      }
      if (!isNaN(Number(part)) && part.trim() !== '') {
        return <span key={i} className="text-orange-300">{part}</span>;
      }
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={i} className="text-green-400">{part}</span>;
      }
      if (part.startsWith('//') || part.startsWith('#')) {
        return <span key={i} className="text-zinc-500 italic">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <Code2 className="text-indigo-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">{algorithmName} Implementation</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Source Code Reference</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-1 p-2 bg-zinc-950/50 border-b border-zinc-800 overflow-x-auto no-scrollbar">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id as keyof CodeVariants)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeLang === lang.id 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${lang.color} ${activeLang === lang.id ? 'animate-pulse' : ''}`} />
              {lang.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-6 bg-zinc-950 relative group">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          
          <pre className="code-font text-sm leading-relaxed text-zinc-300 whitespace-pre overflow-x-auto">
            {highlightCode(currentCode)}
          </pre>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <Terminal size={14} />
            <span>Ready for documentation or testing</span>
          </div>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            ALGO-VIS
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
