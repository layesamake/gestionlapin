import { PlusCircle, Calendar, PlusSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Reproduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saillies' | 'portees'>('saillies');
  const navigate = useNavigate();

  return (
    <>
      {/* Tabs Navigation */}
      <div className="flex border-b border-border mb-6">
        <button 
          className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === 'saillies' ? 'border-b-4 border-primary text-primary' : 'text-muted hover:text-foreground'}`}
          onClick={() => setActiveTab('saillies')}
        >
          Saillies
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === 'portees' ? 'border-b-4 border-primary text-primary' : 'text-muted hover:text-foreground'}`}
          onClick={() => setActiveTab('portees')}
        >
          Portées
        </button>
      </div>

      {/* SAILLIES SECTION */}
      {activeTab === 'saillies' && (
        <section className="space-y-6">
          <button 
            onClick={() => navigate('/reproduction/saillie/nouvelle')}
            className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            <PlusCircle className="w-5 h-5" /> Nouvelle Saillie
          </button>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap">Toutes</button>
            <button className="px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-xs font-bold whitespace-nowrap">En attente</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap text-muted">Gestation confirmée</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap text-muted">Échec</button>
          </div>

          <div className="space-y-4">
            {/* Card 1 */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground font-bold text-lg">F-012</span>
                  <span className="text-muted">x</span>
                  <span className="font-mono text-foreground font-bold text-lg">M-004</span>
                </div>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Gestation confirmée</span>
              </div>
              <p className="text-sm text-muted mb-1">Saillie du <span className="font-mono">16/05/2026</span></p>
              <p className="text-sm text-foreground font-medium mb-4 italic">Mise bas prévue le <span className="font-mono">16/06/2026</span></p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-border transition-colors">Voir détails</button>
                <button className="flex-1 py-2 rounded-lg bg-primary text-background text-xs font-bold hover:opacity-90 transition-opacity">Enregistrer mise bas</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground font-bold text-lg">F-008</span>
                  <span className="text-muted">x</span>
                  <span className="font-mono text-foreground font-bold text-lg">M-002, M-006</span>
                </div>
                <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">En attente</span>
              </div>
              <p className="text-sm text-muted mb-1">Double passage • Saillie du <span className="font-mono">18/05/2026</span></p>
              <p className="text-sm text-secondary font-bold mb-4 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Contrôle aujourd'hui
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-secondary text-background text-xs font-bold">Confirmer gestation</button>
                <button className="flex-1 py-2 rounded-lg border border-danger text-danger text-xs font-bold">Déclarer échec</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface border border-border rounded-xl p-4 opacity-60">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground font-bold text-lg">F-021</span>
                  <span className="text-muted">x</span>
                  <span className="font-mono text-foreground font-bold text-lg">M-003</span>
                </div>
                <span className="px-2 py-1 rounded bg-danger/10 text-danger text-[10px] font-bold uppercase tracking-wider">Échec</span>
              </div>
              <p className="text-sm text-muted">Saillie du <span className="font-mono">05/05/2026</span></p>
            </div>
          </div>
        </section>
      )}

      {/* PORTÉES SECTION */}
      {activeTab === 'portees' && (
        <section className="space-y-6">
          <button 
            onClick={() => navigate('/reproduction/portee/nouvelle')}
            className="w-full border-2 border-dashed border-secondary text-secondary font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <PlusSquare className="w-5 h-5" /> Nouvelle Portée
          </button>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
            <button className="px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-xs font-bold whitespace-nowrap">Toutes</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap text-muted">En cours</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap text-muted">À surveiller</button>
            <button className="px-4 py-2 rounded-full bg-surface border border-border text-xs whitespace-nowrap text-muted">À sevrer</button>
          </div>

          <div className="space-y-4">
            <div 
              className="bg-surface border border-border rounded-xl p-4 cursor-pointer"
              onClick={() => navigate('/reproduction/portee/P-014')}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-secondary font-bold text-lg">P-014</span>
                <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-bold">EN COURS</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-muted uppercase">Mère</p>
                  <p className="font-mono text-foreground">F-012</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Âge</p>
                  <p className="text-foreground">21 jours</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Effectif</p>
                  <p className="text-foreground">8 vivants</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Sevrage</p>
                  <p className="font-mono text-foreground">20/06/2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-surface">Déclarer sevrage</button>
                <button className="flex-1 py-2 rounded-lg border border-danger/30 text-danger text-xs font-semibold hover:bg-danger/10">Mortalité</button>
              </div>
            </div>

            <div className="bg-surface border-l-4 border-l-warning border-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-warning font-bold text-lg">P-009</span>
                <span className="px-2 py-1 rounded bg-warning/10 text-warning text-[10px] font-bold">À SEVRER</span>
              </div>
              <p className="text-sm text-muted mb-4">Mère: <span className="font-mono text-foreground">F-008</span> • 5 lapereaux vivants</p>
              <button className="w-full py-3 rounded-lg bg-warning text-background font-bold text-sm">Sevrage immédiat</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
