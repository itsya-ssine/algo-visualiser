import React from 'react';

interface MobileSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebarOverlay: React.FC<MobileSidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
      onClick={onClose}
    />
  );
};

export default MobileSidebarOverlay;
