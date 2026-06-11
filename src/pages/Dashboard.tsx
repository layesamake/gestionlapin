import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Heart, Syringe, MonitorSmartphone, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FAB } from '../components/ui/FAB';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { animals, portees, alertes, removeAlerte } = useStore();

  // Dynamic indicators calculation
  const aliveAnimals = animals.filter(a => a.status !== 'Mort');
  const totalLapins = aliveAnimals.length + portees.reduce((sum, p) => {
    const match = p.effectif.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);
  const malesActifs = aliveAnimals.filter(a => a.gender === 'M' || a.type.toLowerCase().includes('mâle')).length;
  const femellesRepr = aliveAnimals.filter(a => a.gender === 'F' || a.type.toLowerCase().includes('femelle')).length;
  const femellesGestantesCount = aliveAnimals.filter(a => a.status === 'Gestante').length;
  const porteesEnCoursCount = portees.filter(p => p.status === 'En cours').length;
  const totalLapereaux = portees.reduce((sum, p) => {
    const match = p.effectif.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

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
    <>
      {/* Key Indicators — Simplified: 3 primary + 3 secondary */}
      <section className="space-y-3 mb-6">
        {/* Primary KPI */}
        <div className="bg-surface border border-border p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-wider">Total Lapins</p>
            <p className="text-4xl font-bold font-sans text-foreground leading-none mt-1">{totalLapins}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            <PawPrint className="text-primary w-7 h-7" />
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface border border-border p-3 rounded-xl text-center">
            <p className="text-2xl font-bold text-foreground">{malesActifs}</p>
            <p className="text-[11px] text-muted font-medium mt-0.5">Mâles</p>
          </div>
          <div className="bg-surface border border-border p-3 rounded-xl text-center">
            <p className="text-2xl font-bold text-foreground">{femellesRepr}</p>
            <p className="text-[11px] text-muted font-medium mt-0.5">Femelles</p>
          </div>
          <div className="bg-surface border border-border p-3 rounded-xl text-center">
            <p className="text-2xl font-bold text-foreground">{totalLapereaux}</p>
            <p className="text-[11px] text-muted font-medium mt-0.5">Lapereaux</p>
          </div>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface border border-border p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted font-medium">Gestantes</p>
              <p className="text-xl font-bold text-foreground">{femellesGestantesCount}</p>
            </div>
            <div className="w-1.5 h-8 rounded-full bg-primary" />
          </div>
          <div className="bg-surface border border-border p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted font-medium">Portées actives</p>
              <p className="text-xl font-bold text-foreground">{porteesEnCoursCount}</p>
            </div>
            <div className="w-1.5 h-8 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* Daily Alerts */}
      {alertes.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground font-semibold text-xs uppercase tracking-wide">
              Alertes ({alertes.length})
            </h2>
          </div>
          <div className="space-y-2">
            {alertes.map((alert) => (
              <div key={alert.id} className={`bg-surface border-l-4 rounded-r-xl p-4 ${
                alert.type === 'danger' ? 'border-danger bg-danger/5' : 'border-warning bg-warning/5'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`${
                    alert.type === 'danger' ? 'text-danger' : 'text-warning'
                  } text-[11px] font-bold uppercase`}>
                    {alert.badge}
                  </span>
                  <span className="text-muted font-mono text-[11px]">{alert.time}</span>
                </div>
                <p className="text-foreground text-sm leading-snug mb-3">
                  {alert.title} <span className={`font-mono ${
                    alert.type === 'danger' ? 'text-danger' : 'text-warning'
                  }`}>{alert.subject}</span> {alert.location && `(Cage `}
                  {alert.location && <span className="font-mono">{alert.location.replace('Cage ', '')}</span>}
                  {alert.location && `)`}
                </p>
                <button
                  onClick={() => handleAlertClick(alert.action, alert.id)}
                  className={`w-full py-3 text-sm font-bold rounded-xl transition-all active:scale-[0.97] ${
                    alert.type === 'danger'
                      ? 'bg-danger text-white'
                      : 'bg-warning text-background'
                  }`}
                >
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAB — replaces the old "Actions Rapides" section */}
      <FAB actions={fabActions} mainIcon={<Plus className="w-6 h-6" />} />
    </>
  );
};
