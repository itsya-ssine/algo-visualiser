import React from 'react';
import { Menu, Settings } from 'lucide-react';

interface HeaderProps {
  algorithmName: string;
  onMenuClick: () => void;
  onNewInput: () => void;
}

const Header: React.FC<HeaderProps> = ({ algorithmName, onMenuClick, onNewInput }) => {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 bg-zinc-900/50 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 lg:hidden text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="font-bold text-sm lg:text-lg truncate max-w-[150px] lg:max-w-none">
          {algorithmName}
        </h2>
      </div>
      <button
        onClick={onNewInput}
        className="px-2 lg:px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shrink-0"
      >
        <Settings size={14} />
        <span className="hidden sm:inline">New Input</span>
      </button>
    </header>
  );
};

export default Header;
