import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Heart, Syringe, MonitorSmartphone, Plus, BellRing, ChevronRight, Activity, CalendarDays, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FAB } from '../components/ui/FAB';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { animals, portees, alertes, removeAlerte } = useStore();

  // Greeting & Date logic
  const { greeting, currentDate } = useMemo(() => {
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 12;
    const isAfternoon = hour >= 12 && hour < 18;
    const greet = isMorning ? 'Bonjour' : isAfternoon ? 'Bon après-midi' : 'Bonsoir';
    
    const dateOpts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = new Date().toLocaleDateString('fr-FR', dateOpts);
    
    return { greeting: greet, currentDate: dateStr };
  }, []);

  // Dynamic indicators calculation
  const aliveAnimals = animals.filter(a => a.status !== 'Mort');
  const totalLapereaux = portees.reduce((sum, p) => {
    const match = p.effectif.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);
  const totalLapins = aliveAnimals.length + totalLapereaux;
  
  const malesActifs = aliveAnimals.filter(a => a.gender === 'M' || a.type?.toLowerCase().includes('mâle')).length;
  const femellesRepr = aliveAnimals.filter(a => a.gender === 'F' || a.type?.toLowerCase().includes('femelle')).length;
  const femellesGestantesCount = aliveAnimals.filter(a => a.status === 'Gestante').length;
  const porteesEnCoursCount = portees.filter(p => p.status === 'En cours').length;

  const urgentAlertes = alertes.filter(a => a.type === 'danger' || a.type === 'warning').slice(0, 3);

  const handleAlertClick = (action: string, id: number) => {
    removeAlerte(id);
    if (action.includes('Confirmer') || action.includes('mise bas')) {
      navigate('/reproduction');
    } else if (action.includes('fait')) {
      navigate('/sante');
    }
  };

  const fabActions = [
    {
      icon: <Heart className="w-5 h-5 fill-current" />,
      label: 'Nouvelle saillie',
      onClick: () => navigate('/reproduction/saillie/nouvelle'),
      variant: 'primary' as const,
    },
    {
      icon: <PawPrint className="w-5 h-5" />,
      label: 'Nouveau reproducteur',
      onClick: () => navigate('/cheptel/nouveau'),
      variant: 'secondary' as const,
    },
    {
      icon: <MonitorSmartphone className="w-5 h-5" />,
      label: 'Nouvelle portée',
      onClick: () => navigate('/reproduction/portee/nouvelle'),
      variant: 'primary' as const,
    },
    {
      icon: <Syringe className="w-5 h-5" />,
      label: 'Nouveau traitement',
      onClick: () => navigate('/sante/traitement/nouveau'),
      variant: 'warning' as const,
    },
  ];

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      {/* Header Section */}
      <header className="animate-fade-in [animation-delay:50ms] mb-6">
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-foreground">
          {greeting},
        </h1>
        <p className="text-muted font-medium flex items-center gap-2 mt-1 capitalize">
          <CalendarDays className="w-4 h-4" /> {currentDate}
        </p>
      </header>

      {/* Bento Grid - KPIs */}
      <section className="grid grid-cols-2 gap-3">
        {/* Main KPI - Full Width */}
        <div className="col-span-2 bg-gradient-to-br from-primary/90 to-primary text-background rounded-3xl p-5 shadow-xl shadow-primary/20 relative overflow-hidden animate-fade-in [animation-delay:100ms] border border-primary/20">
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <PawPrint className="w-40 h-40" />
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-background/80 text-xs font-bold uppercase tracking-widest mb-1">Effectif Total</p>
              <p className="text-6xl font-display font-black leading-none tracking-tighter">{totalLapins}</p>
            </div>
            <div className="bg-background/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-background/20 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Actif</span>
            </div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col justify-between animate-fade-in [animation-delay:150ms] shadow-sm hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <p className="text-muted text-xs font-bold uppercase tracking-wider">Femelles</p>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-display font-bold text-foreground leading-none">{femellesRepr}</p>
            <span className="text-xs text-muted font-medium mb-0.5">{femellesGestantesCount} gestantes</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col justify-between animate-fade-in [animation-delay:200ms] shadow-sm hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <p className="text-muted text-xs font-bold uppercase tracking-wider">Mâles</p>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-display font-bold text-foreground leading-none">{malesActifs}</p>
            <span className="text-xs text-muted font-medium mb-0.5">reproducteurs</span>
          </div>
        </div>

        {/* Portées & Lapereaux span */}
        <div className="col-span-2 bg-surface border border-border rounded-2xl p-4 flex justify-between items-center animate-fade-in [animation-delay:250ms] shadow-sm">
          <div className="flex gap-4">
            <div>
              <p className="text-2xl font-display font-bold text-foreground leading-none">{porteesEnCoursCount}</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Portées</p>
            </div>
            <div className="w-px bg-border my-1"></div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground leading-none">{totalLapereaux}</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">Lapereaux</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/reproduction')}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Urgent Alerts Section */}
      <section className="animate-fade-in [animation-delay:300ms]">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-foreground font-bold text-sm uppercase tracking-wide flex items-center gap-2">
            <BellRing className="w-4 h-4 text-warning" />
            Tâches Urgentes
          </h2>
          {alertes.length > 3 && (
            <button 
              onClick={() => navigate('/alertes')}
              className="text-primary text-xs font-bold hover:underline"
            >
              Voir tout ({alertes.length})
            </button>
          )}
        </div>

        {urgentAlertes.length === 0 ? (
          <div className="bg-surface/50 border border-dashed border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm font-medium text-muted">Tout est à jour pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {urgentAlertes.map((alert) => (
              <div 
                key={alert.id} 
                className={`group relative overflow-hidden rounded-2xl p-4 border transition-all active:scale-[0.98] cursor-pointer
                  ${alert.type === 'danger' 
                    ? 'bg-danger/5 border-danger/20 hover:border-danger/40' 
                    : 'bg-warning/5 border-warning/20 hover:border-warning/40'}`}
                onClick={() => handleAlertClick(alert.action, alert.id)}
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-current opacity-50" style={{ color: alert.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)' }}></div>
                
                <div className="flex gap-3 items-start pl-2">
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    alert.type === 'danger' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                  }`}>
                    {alert.type === 'danger' ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        alert.type === 'danger' ? 'text-danger' : 'text-warning'
                      }`}>
                        {alert.badge}
                      </span>
                      <span className="text-muted font-mono text-[10px]">{alert.time}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-tight truncate">
                      {alert.title}
                    </h3>
                    <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
                      <span className="font-mono text-foreground">{alert.subject}</span>
                      {alert.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span>{alert.location}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAB */}
      <FAB actions={fabActions} mainIcon={<Plus className="w-6 h-6" />} />
    </div>
  );
};

