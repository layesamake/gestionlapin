import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Plus, Heart, MonitorSmartphone, Syringe } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { animals, saillies, portees, alertes, removeAlerte } = useStore();

  // Dynamic indicators calculation
  const aliveAnimals = animals.filter(a => a.status !== 'Mort');
  const totalLapins = aliveAnimals.length + portees.reduce((sum, p) => {
    const match = p.effectif.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);
  const malesActifs = aliveAnimals.filter(a => a.gender === 'M' || a.type.toLowerCase().includes('mâle')).length;
  const femellesRepr = aliveAnimals.filter(a => a.gender === 'F' || a.type.toLowerCase().includes('femelle')).length;
  const femellesGestantesCount = saillies.filter(s => s.status === 'Gestation confirmée').length;
  const porteesEnCoursCount = portees.filter(p => p.status === 'En cours').length;
  const totalLapereaux = portees.reduce((sum, p) => {
    const match = p.effectif.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  const handleAlertClick = (action: string, id: number) => {
    // Visually remove the alert
    removeAlerte(id);
    
    // Navigate to appropriate section based on action text
    if (action.includes('Confirmer') || action.includes('mise bas')) {
      navigate('/reproduction');
    } else if (action.includes('fait')) {
      navigate('/sante');
    }
  };

  return (
    <>
      {/* Key Indicators Grid */}
      <section className="grid grid-cols-2 gap-3 mb-8">
        <div className="col-span-2 bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-wider">Total Lapins</p>
            <p className="text-4xl font-bold font-sans text-foreground leading-none mt-1">{totalLapins}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <PawPrint className="text-primary w-8 h-8" />
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Mâles Actifs</p>
          <p className="text-2xl font-bold text-foreground mt-1">{malesActifs}</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Femelles Repr.</p>
          <p className="text-2xl font-bold text-foreground mt-1">{femellesRepr}</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-primary"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Femelles Gestantes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-foreground leading-none">{femellesGestantesCount}</p>
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">STABLE</span>
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-secondary"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Portées en cours</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-foreground leading-none">{porteesEnCoursCount}</p>
            <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold">ACTIF</span>
          </div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-xl">
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Lapereaux</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalLapereaux}</p>
          <p className="text-[10px] text-muted mt-1">Non sevrés</p>
        </div>

        <div className="bg-surface border border-danger/30 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-danger"></div>
          <p className="text-muted text-xs font-medium uppercase tracking-wider">Alertes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-danger leading-none">{alertes.length}</p>
            {alertes.length > 0 && <span className="px-1.5 py-0.5 rounded bg-danger/10 text-danger text-[10px] font-bold">URGENT</span>}
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
          {alertes.map((alert) => (
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
