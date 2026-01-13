import React from 'react';
import Sidebar from './Sidebar';

interface SidebarDrawerProps {
  isOpen: boolean;
  selectedId: string;
  onSelect: (id: string) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, selectedId, onSelect }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <Sidebar selectedId={selectedId} onSelect={onSelect} />
    </div>
  );
};

export default SidebarDrawer;
