import React, { useState } from 'react';
import { Calendar, Heart, MonitorSmartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FAB } from '../components/ui/FAB';

export const Reproduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saillies' | 'portees'>('saillies');
  const [saillieFilter, setSaillieFilter] = useState('Toutes');
  const [porteeFilter, setPorteeFilter] = useState('Toutes');
  const navigate = useNavigate();

  const { saillies, portees, updateSaillie, removeSaillie, updatePortee, removePortee } = useStore();

  const sailliesFilters = ['Toutes', 'En attente', 'Gestation confirmée', 'Échec'];
  const porteesFilters = ['Toutes', 'En cours', 'À surveiller', 'À sevrer'];

  const handleConfirmerGestation = (id: number) => {
    updateSaillie(id, { status: 'Gestation confirmée', statusBadgeColor: 'primary' });
  };

  const handleDeclarerEchec = (id: number) => {
    updateSaillie(id, { status: 'Échec', statusBadgeColor: 'danger' });
  };

  const handleEnregistrerMiseBas = (id: number) => {
    removeSaillie(id);
    navigate('/reproduction/portee/nouvelle');
  };

  const handleDeclarerSevrage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updatePortee(id, { status: 'À sevrer', badgeColor: 'warning' });
  };

  const handleMortalite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const portee = portees.find(p => p.id === id);
    if (portee) {
      const match = portee.effectif.match(/(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        updatePortee(id, { effectif: `${Math.max(0, current - 1)} vivant${current - 1 > 1 ? 's' : ''}` });
      }
    }
  };

  const handleSevrageImmediat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removePortee(id);
  };

  const filteredSaillies = saillieFilter === 'Toutes' ? saillies : saillies.filter(s => s.status === saillieFilter);
  const filteredPortees = porteeFilter === 'Toutes' ? portees : portees.filter(p => p.status === porteeFilter);

  return (
    <>
      {/* Tabs Navigation */}
      <div className="flex border-b border-border mb-5">
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
        <section className="space-y-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
            {sailliesFilters.map(f => (
              <button 
                key={f}
                onClick={() => setSaillieFilter(f)}
                className={`px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all active:scale-95 ${
                  saillieFilter === f 
                    ? 'bg-primary/10 border-primary text-primary font-bold border' 
                    : 'bg-surface border-border text-muted border'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredSaillies.map((s) => (
              <div key={s.id} className={`bg-surface border border-border rounded-xl p-4 ${s.status === 'Échec' ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-foreground font-bold text-lg">{s.female}</span>
                    <span className="text-muted">x</span>
                    <span className="font-mono text-foreground font-bold text-lg">{s.male}</span>
                  </div>
                  <span className={`px-2 py-1 rounded bg-${s.statusBadgeColor}/10 text-${s.statusBadgeColor} text-[10px] font-bold uppercase tracking-wider`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-muted mb-1">
                  {s.type ? s.type + ' • ' : ''}Saillie du <span className="font-mono">{s.date}</span>
                </p>
                
                {s.expectedDate && (
                  <p className="text-sm text-foreground font-medium mb-4 italic">Mise bas prévue le <span className="font-mono">{s.expectedDate}</span></p>
                )}
                {s.hasControlToday && (
                  <p className="text-sm text-secondary font-bold mb-4 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Contrôle aujourd'hui
                  </p>
                )}
                
                <div className="flex gap-2">
                  {s.status === 'Gestation confirmée' && (
                    <>
                      <button onClick={() => navigate(`/reproduction/saillie/${s.id}`)} className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-border transition-colors active:scale-95">Voir détails</button>
                      <button onClick={() => handleEnregistrerMiseBas(s.id)} className="flex-1 py-3 rounded-xl bg-primary text-background text-sm font-bold hover:opacity-90 transition-opacity active:scale-95">Enregistrer mise bas</button>
                    </>
                  )}
                  {s.status === 'En attente' && (
                    <>
                      <button onClick={() => handleConfirmerGestation(s.id)} className="flex-1 py-3 rounded-xl bg-secondary text-background text-sm font-bold active:scale-95">Confirmer gestation</button>
                      <button onClick={() => handleDeclarerEchec(s.id)} className="flex-1 py-3 rounded-xl border border-danger text-danger text-sm font-bold active:scale-95">Déclarer échec</button>
                    </>
                  )}
                  {s.status === 'Échec' && (
                    <button onClick={() => navigate(`/reproduction/saillie/${s.id}`)} className="w-full py-3 rounded-xl border border-border text-sm font-semibold hover:bg-border transition-colors active:scale-95">Détails de l'échec</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PORTÉES SECTION */}
      {activeTab === 'portees' && (
        <section className="space-y-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
            {porteesFilters.map(f => (
              <button 
                key={f}
                onClick={() => setPorteeFilter(f)}
                className={`px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all active:scale-95 ${
                  porteeFilter === f 
                    ? 'bg-primary/10 border-primary text-primary font-bold border' 
                    : 'bg-surface border-border text-muted border'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPortees.map(p => (
              <div 
                key={p.id}
                className={`bg-surface border ${p.status === 'À sevrer' ? 'border-l-4 border-l-warning' : 'border-border'} rounded-xl p-4 cursor-pointer`}
                onClick={() => navigate(`/reproduction/portee/${p.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-mono text-${p.badgeColor} font-bold text-lg`}>{p.id}</span>
                  <span className={`px-2 py-1 rounded bg-${p.badgeColor}/10 text-${p.badgeColor} text-[10px] font-bold uppercase`}>
                    {p.status}
                  </span>
                </div>
                
                {p.status === 'En cours' && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] text-muted uppercase">Mère</p>
                        <p className="font-mono text-foreground">{p.female}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase">Âge</p>
                        <p className="text-foreground">{p.age}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase">Effectif</p>
                        <p className="text-foreground">{p.effectif}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase">Sevrage</p>
                        <p className="font-mono text-foreground">{p.sevrage}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={(e) => handleDeclarerSevrage(p.id, e)} className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-surface active:scale-95">Déclarer sevrage</button>
                      <button onClick={(e) => handleMortalite(p.id, e)} className="flex-1 py-3 rounded-xl border border-danger/30 text-danger text-sm font-semibold hover:bg-danger/10 active:scale-95">Mortalité</button>
                    </div>
                  </>
                )}

                {p.status === 'À sevrer' && (
                  <>
                    <p className="text-sm text-muted mb-4">Mère: <span className="font-mono text-foreground">{p.female}</span> • {p.effectif}</p>
                    <button onClick={(e) => handleSevrageImmediat(p.id, e)} className="w-full py-3 rounded-xl bg-warning text-background font-bold text-sm active:scale-95">Sevrage immédiat</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAB for quick actions */}
      <FAB 
        actions={
          activeTab === 'saillies' 
            ? [{ icon: <Heart className="w-5 h-5 fill-current" />, label: 'Nouvelle saillie', onClick: () => navigate('/reproduction/saillie/nouvelle') }]
            : [{ icon: <MonitorSmartphone className="w-5 h-5" />, label: 'Nouvelle portée', onClick: () => navigate('/reproduction/portee/nouvelle') }]
        }
      />
    </>
  );
};
