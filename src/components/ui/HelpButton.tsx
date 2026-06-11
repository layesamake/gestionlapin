import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Modal } from './Modal';

interface HelpButtonProps {
  title: string;
  children: React.ReactNode;
}

export const HelpButton: React.FC<HelpButtonProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary/50 transition-colors active:scale-95 shadow-sm"
        aria-label="Aide"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted">
          {children}
        </div>
      </Modal>
    </>
  );
};
