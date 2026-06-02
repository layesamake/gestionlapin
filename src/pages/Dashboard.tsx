import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardData } from '../data/mockData';
import { PawPrint, Plus, Heart, MonitorSmartphone, Syringe } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { indicators } = dashboardData;
  const [alerts, setAlerts] = useState(dashboardData.alerts);

  const handleAlertClick = (action: string, id: number) => {
    // Visually remove the alert
    setAlerts(prev => prev.filter(a => a.id !== id));
    
    // Navigate to appropriate section based on action text
    if (action.includes('Confirmer') || action.includes('mise bas')) {
      navigate('/reproduction');
    } else if (action.includes('fait')) {
      navigate('/sante');
    }
  };

  return (
    <>
      {/* Connectivity Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary/10 border border-primary/20">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-primary text-[11px] font-medium uppercase tracking-wider">Mode hors connexion disponible • Données locales</span>
      </div>

      {/* Key Indicators Grid */}
      <section className="grid grid-cols-2 gap-3 mb-8">
        <div className="col-span-2 bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-wider">Total Lapins</p>
            <p className="text-4xl font-bold font-sans text-foreground leading-none mt-1">{indicators.totalLapins}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <PawPrint className="text-primary w-8 h-8" />
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Mâles Actifs</p>
          <p className="text-2xl font-bold text-foreground mt-1">{indicators.malesActifs}</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Femelles Repr.</p>
          <p className="text-2xl font-bold text-foreground mt-1">{indicators.femellesRepr}</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-primary"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Femelles Gestantes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-foreground leading-none">{indicators.femellesGestantes.count}</p>
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">{indicators.femellesGestantes.status}</span>
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-secondary"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Portées en cours</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-foreground leading-none">{indicators.porteesEnCours.count}</p>
            <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold">{indicators.porteesEnCours.status}</span>
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Lapereaux</p>
          <p className="text-2xl font-bold text-foreground mt-1">{indicators.lapereaux.count}</p>
          <p className="text-[10px] text-muted mt-1">{indicators.lapereaux.note}</p>
        </div>

        <div className="bg-surface border border-danger/30 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-danger"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Alertes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-danger leading-none">{indicators.alertes.count}</p>
            <span className="px-1.5 py-0.5 rounded bg-danger/10 text-danger text-[10px] font-bold">{indicators.alertes.status}</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground font-bold text-sm uppercase tracking-widest">Actions Rapides</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate('/cheptel/nouveau')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Nouveau reproducteur
          </button>
          <button 
            onClick={() => navigate('/reproduction/saillie/nouvelle')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-background text-sm font-bold active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-current" /> Nouvelle saillie
          </button>
          <button 
            onClick={() => navigate('/reproduction/portee/nouvelle')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface active:scale-95 transition-all"
          >
            <MonitorSmartphone className="w-4 h-4" /> Nouvelle portée
          </button>
          <button 
            onClick={() => navigate('/sante/traitement/nouveau')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface active:scale-95 transition-all"
          >
            <Syringe className="w-4 h-4" /> Nouveau traitement
          </button>
        </div>
      </section>

      {/* Daily Alerts */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground font-bold text-sm uppercase tracking-widest">Alertes du Jour</h2>
          <span className="text-[10px] text-muted font-mono uppercase">Mise à jour 08:45</span>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`bg-surface border-l-4 rounded-r-xl p-4 shadow-lg ${
              alert.type === 'danger' ? 'border-danger' : 'border-warning'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`${
                  alert.type === 'danger' ? 'text-danger bg-danger/10' : 'text-warning bg-warning/10'
                } text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded`}>
                  {alert.badge}
                </span>
                <span className={`${
                  alert.type === 'danger' ? 'text-danger' : 'text-muted'
                } font-mono text-[10px] font-bold`}>{alert.time}</span>
              </div>
              <p className="text-foreground text-sm leading-tight mb-3">
                {alert.title} <span className={`font-mono ${
                  alert.type === 'danger' ? 'text-danger' : 'text-warning'
                }`}>{alert.subject}</span> {alert.location && `(Cage `}
                {alert.location && <span className="font-mono">{alert.location.replace('Cage ', '')}</span>}
                {alert.location && `)`}
              </p>
              <button 
                onClick={() => handleAlertClick(alert.action, alert.id)}
                className={`w-full py-2.5 text-xs font-bold rounded-lg transition-all active:scale-[0.98] ${
                  alert.type === 'danger' 
                    ? 'bg-danger text-foreground hover:bg-danger/90 shadow-lg shadow-danger/10' 
                    : alert.title === 'Déparasitage'
                      ? 'border border-border text-muted hover:bg-[#1C2331]'
                      : 'bg-warning/10 border border-warning/30 text-warning hover:bg-warning/20'
                }`}
              >
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
