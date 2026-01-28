import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2, ChevronRight, Power } from 'lucide-react';
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
    { id: 'js', name: 'main.js', color: 'text-yellow-400' },
    { id: 'python', name: 'main.py', color: 'text-blue-400' },
    { id: 'cpp', name: 'main.cpp', color: 'text-purple-400' },
    { id: 'java', name: 'Main.java', color: 'text-red-400' },
  ];

  const currentCode = codeVariants?.[activeLang] || "// Implementation not available yet.";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    const tokens = {
      keyword: "text-[#569cd6]",
      function: "text-[#dcdcaa]",
      string: "text-[#ce9178]",
      comment: "text-[#6a9955]",
      number: "text-[#b5cea8]",
      type: "text-[#4ec9b0]"
    };

    const keywords = ['function', 'let', 'const', 'for', 'while', 'if', 'else', 'return', 'def', 'class', 'public', 'static', 'void', 'import', 'include'];
    const types = ['int', 'str', 'boolean', 'list', 'vector'];

    const parts = code.split(/(\W+)/);
    return parts.map((part, i) => {
      if (keywords.includes(part)) return <span key={i} className={tokens.keyword}>{part}</span>;
      if (types.includes(part)) return <span key={i} className={tokens.type}>{part}</span>;
      if (!isNaN(Number(part)) && part.trim() !== '') return <span key={i} className={tokens.number}>{part}</span>;
      if (part.startsWith('"') || part.startsWith("'")) return <span key={i} className={tokens.string}>{part}</span>;
      if (part.startsWith('//') || part.startsWith('#')) return <span key={i} className={tokens.comment}>{part}</span>;
      if (parts[i+1] === '(') return <span key={i} className={tokens.function}>{part}</span>;
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-lg w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans animate-in fade-in zoom-in duration-150">
        
        <div className="flex items-center justify-between px-4 py-2 bg-[#323233] text-[#cccccc] text-sm select-none">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-blue-400" />
            <span className="flex items-center gap-1 opacity-80">
              {algorithmName} <ChevronRight size={12} /> <span className="text-white">editor</span>
            </span>
          </div>
          
          <div className="flex items-center">
             <div className="flex items-center gap-2 mr-4">
               <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 cursor-pointer" />
               <div className="w-3 h-3 rounded-full bg-[#28c840] hover:opacity-80 cursor-pointer" />
             </div>
             <button 
                onClick={onClose}
                className="group flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5f56] hover:bg-[#ff443a] transition-colors shadow-inner"
                title="Close Window"
             >
                <X size={10} className="text-black/50 group-hover:text-black font-bold" />
             </button>
          </div>
        </div>

        <div className="flex bg-[#252526] overflow-x-auto no-scrollbar border-b border-[#1e1e1e]">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id as keyof CodeVariants)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-all border-r border-[#1e1e1e] relative group ${
                activeLang === lang.id 
                  ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                  : 'text-[#969696] hover:bg-[#2a2d2e] bg-[#2d2d2d]'
              }`}
            >
              <div className={`w-3 h-3 ${lang.color} font-bold`}>
                {lang.id === 'python' ? 'Py' : lang.id === 'js' ? 'JS' : 'C+'}
              </div>
              {lang.name}
              <X 
                size={12} 
                className={`ml-2 opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-[#333] rounded p-0.5 transition-opacity ${activeLang === lang.id ? 'opacity-40' : ''}`} 
              />
            </button>
          ))}
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-12 bg-[#1e1e1e] border-r border-[#333] flex flex-col items-center py-4 text-[#858585] text-xs font-mono select-none">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="leading-relaxed h-[21px]">{i + 1}</span>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-4 relative group bg-[#1e1e1e]">
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-6 p-2 bg-[#333] hover:bg-[#444] text-[#ccc] rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs border border-[#444]"
            >
              {copied ? <Check size={14} className="text-[#4ec9b0]" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            
            <pre className="font-mono text-[13px] leading-relaxed whitespace-pre">
              {highlightCode(currentCode)}
            </pre>
          </div>
        </div>

        <div className="px-3 py-1 bg-[#007acc] text-white flex items-center justify-between text-[11px] font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
              <Terminal size={12} />
              <span>Ready</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={onClose}
              className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              <Power size={10} />
              <span>Close Editor</span>
            </button>
            <span className="opacity-70">Ln 1, Col 1</span>
            <span className="hover:bg-white/10 px-1 cursor-pointer uppercase">{activeLang}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
