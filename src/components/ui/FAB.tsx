import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'warning';
}

interface FABProps {
  actions: FABAction[];
  mainIcon?: React.ReactNode;
}

export const FAB: React.FC<FABProps> = ({ actions, mainIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const variantStyles: Record<string, string> = {
    primary: 'bg-primary text-background shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-background shadow-lg shadow-secondary/20',
    warning: 'bg-warning text-background shadow-lg shadow-warning/20',
  };

  if (actions.length === 1) {
    // Single action — just show the button directly
    return (
      <button
        onClick={actions[0].onClick}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-primary text-background shadow-xl shadow-primary/30 flex items-center justify-center active:scale-90 transition-all hover:shadow-2xl"
      >
        {actions[0].icon || mainIcon || <Plus className="w-6 h-6" />}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action items */}
      <div className={`fixed bottom-20 mb-24 right-4 z-50 flex flex-col-reverse items-end gap-3 transition-all ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {actions.map((action, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-200 ${
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
          >
            <span className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-medium text-foreground shadow-lg whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={() => { action.onClick(); setIsOpen(false); }}
              className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all ${variantStyles[action.variant || 'primary']}`}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-primary text-background shadow-xl shadow-primary/30 flex items-center justify-center transition-all duration-200 hover:shadow-2xl ${
          isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
        }`}
      >
        {mainIcon || <Plus className="w-6 h-6" />}
      </button>
    </>
  );
};
