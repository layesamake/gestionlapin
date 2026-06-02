import React from 'react';
import { Home, PawPrint, HeartPulse, Stethoscope, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/cheptel', label: 'Cheptel', icon: PawPrint },
    { path: '/reproduction', label: 'Reproduction', icon: HeartPulse },
    { path: '/sante', label: 'Santé', icon: Stethoscope },
    { path: '/finance', label: 'Finance', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-background px-2 border-t border-border shadow-2xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center relative active:scale-95 transition-all duration-150 ${
              isActive ? 'text-primary' : 'text-muted hover:bg-surface active:bg-surface'
            } w-16 h-full`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            <span className="font-sans text-[10px] font-medium mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
