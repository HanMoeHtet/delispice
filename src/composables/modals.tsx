import * as React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="z-50 fixed top-0 left-0 w-full h-screen bg-opacity-80 bg-gray-500 py-8 overflow-y-auto">
      {children}
    </div>
  ) : null;
};
