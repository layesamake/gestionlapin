import React from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Lapin Manager',
  '/cheptel': 'Cheptel',
  '/reproduction': 'Reproduction',
  '/sante': 'Santé',
  '/finance': 'Finance',
  '/alertes': 'Alertes',
  '/parametres': 'Paramètres',
};

export const TopAppBar: React.FC = () => {
  const location = useLocation();
  
  // Find matching title (exact or starts-with for nested routes)
  const title = pageTitles[location.pathname] 
    || Object.entries(pageTitles).find(([path]) => path !== '/' && location.pathname.startsWith(path))?.[1]
    || 'Lapin Manager';

  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 w-full z-50 flex items-center px-4 h-12 bg-background/80 backdrop-blur-lg border-b border-border/50">
      {isHome ? (
        <h1 className="text-foreground font-sans font-bold tracking-tight text-base">
          🐇 Lapin Manager
        </h1>
      ) : (
        <h1 className="text-foreground font-sans font-semibold tracking-tight text-base">
          {title}
        </h1>
      )}
    </header>
  );
};
