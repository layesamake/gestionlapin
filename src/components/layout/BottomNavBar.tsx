import React from 'react';
import { Home, PawPrint, HeartPulse, Stethoscope, Bell, Settings, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const alertes = useStore(state => state.alertes);

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/cheptel', label: 'Cheptel', icon: PawPrint },
    { path: '/reproduction', label: 'Repro', icon: HeartPulse },
    { path: '/sante', label: 'Santé', icon: Stethoscope },
    { path: '/finance', label: 'Finance', icon: Wallet },
    { path: '/alertes', label: 'Alertes', icon: Bell, badge: alertes.length },
    { path: '/parametres', label: 'Réglages', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-lg border-t border-border/50 shadow-2xl safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-12 h-14 rounded-xl transition-all duration-200 active:scale-90 ${
                active
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {/* Active indicator dot */}
              {active && (
                <div className="absolute -top-1 w-5 h-0.5 rounded-full bg-primary animate-fade-in" />
              )}

              <div className="relative">
                <item.icon className={`w-[22px] h-[22px] ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />

                {/* Badge for alerts */}
                {item.badge !== undefined && item.badge > 0 && (
                  <div className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-danger rounded-full border-2 border-background">
                    <span className="text-[9px] font-bold text-white leading-none px-1">{item.badge > 9 ? '9+' : item.badge}</span>
                  </div>
                )}
              </div>

              <span className={`text-[10px] leading-tight ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
