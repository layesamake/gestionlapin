import { santeData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, Calendar, CalendarRange, CheckCircle, AlertTriangle } from 'lucide-react';

export const Sante: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();

  const filters = ['Tous', 'À faire', 'En cours', 'Faits', 'En retard', 'Prophylaxie'];

  const getIcon = (status: string) => {
    switch (status) {
      case 'À faire': return <Calendar className="w-4 h-4" />;
      case 'En cours': return <CalendarRange className="w-4 h-4" />;
      case 'Fait': return <CheckCircle className="w-4 h-4" />;
      case 'En retard': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">À faire</span>
            <span className="bg-warning/10 text-warning text-[10px] font-bold px-2 py-0.5 rounded-full">Auj.</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{santeData.stats.aFaire}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Action urgente</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">En retard</span>
            <span className="bg-danger/10 text-danger text-[10px] font-bold px-2 py-0.5 rounded-full">Retard</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{santeData.stats.enRetard}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">À régulariser</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">En cours</span>
            <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">Suivi</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{santeData.stats.enCours}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Traitements</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">Faits</span>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">Mois</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{santeData.stats.faits}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Interventions</p>
        </div>
      </section>

      <section className="space-y-3 mb-6">
        <button 
          onClick={() => navigate('/sante/traitement/nouveau')}
          className="w-full bg-primary text-background font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <PlusCircle className="w-5 h-5 fill-current" /> Nouveau traitement prévu
        </button>
        <button 
          onClick={() => navigate('/sante/soin/nouveau')}
          className="w-full bg-transparent border border-border text-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <History className="w-5 h-5 text-muted" /> Enregistrer un traitement fait
        </button>
      </section>

      <section className="no-scrollbar overflow-x-auto flex gap-2 -mx-4 px-4 pb-2 mb-4 hide-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-primary text-background font-bold shadow-lg shadow-primary/10'
                : 'bg-surface border border-border text-muted'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="space-y-4">
        {santeData.soins.map(soin => (
          <div key={soin.id} className={`bg-surface rounded-xl border p-4 shadow-sm transition-opacity ${
            soin.isLate ? 'border-danger/30 border-l-4 border-l-danger' : 'border-border'
          } ${soin.status === 'Fait' ? 'opacity-80' : ''}`}>
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`font-mono text-sm px-2 py-0.5 rounded border ${
                  soin.statusColor === 'warning' || soin.statusColor === 'danger' ? 'text-secondary bg-secondary/5 border-secondary/20' 
                  : `text-${soin.statusColor} bg-${soin.statusColor}/5 border-${soin.statusColor}/20`
                }`}>
                  {soin.animalId}
                </span>
                <h3 className="mt-2 font-bold text-foreground text-lg leading-tight">{soin.type}</h3>
                <p className="text-xs text-muted font-medium">{soin.category}</p>
              </div>
              <span className={`bg-${soin.statusColor}/10 text-${soin.statusColor} text-[10px] font-bold px-2 py-1 rounded uppercase`}>
                {soin.status}
              </span>
            </div>
            
            <div className={`flex items-center gap-2 text-sm mb-4 ${soin.isLate ? 'text-danger' : 'text-muted'}`}>
              {getIcon(soin.status)}
              <span className={soin.isLate ? 'font-bold' : ''}>
                {soin.date.replace('(Aujourd\'hui)', '')} 
                {soin.isToday && <span className="text-warning ml-1">(Aujourd'hui)</span>}
              </span>
            </div>

            {soin.status === 'À faire' && (
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-primary/10 text-primary font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-primary/20">Marquer comme fait</button>
                <button className="bg-border text-muted font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-surface">Reporter</button>
              </div>
            )}

            {soin.status === 'En cours' && (
              <button className="w-full bg-secondary/10 text-secondary font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-secondary/20">Enregistrer dose</button>
            )}

            {soin.status === 'Fait' && (
              <button 
                onClick={() => navigate(`/sante/traitement/${soin.id}`)}
                className="w-full bg-border text-foreground font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-surface"
              >
                Voir détails
              </button>
            )}

            {soin.status === 'En retard' && (
              <button className="w-full bg-danger text-white font-bold py-3 rounded text-sm active:scale-95 transition-all shadow-lg shadow-danger/20 hover:bg-danger/90">Marquer comme fait</button>
            )}
          </div>
        ))}
      </section>
    </>
  );
};
