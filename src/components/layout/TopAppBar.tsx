import React from 'react';
import { Settings, CloudOff, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TopAppBar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        <CloudOff className="text-primary w-6 h-6" />
        <h1 className="text-foreground font-sans font-bold tracking-tight text-lg">Lapin Manager</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/alertes" className="relative text-muted active:scale-95 transition-transform p-2 hover:bg-surface rounded-full">
          <Bell className="w-6 h-6" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-background"></div>
        </Link>
        <Link to="/parametres" className="text-muted active:scale-95 transition-transform p-2 hover:bg-surface rounded-full">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </header>
  );
};
