import React, { useState } from 'react';
import { PlusCircle, Calendar, PlusSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Reproduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saillies' | 'portees'>('saillies');
  const [saillieFilter, setSaillieFilter] = useState('Toutes');
  const [porteeFilter, setPorteeFilter] = useState('Toutes');
  const navigate = useNavigate();

  const sailliesFilters = ['Toutes', 'En attente', 'Gestation confirmée', 'Échec'];
  const porteesFilters = ['Toutes', 'En cours', 'À surveiller', 'À sevrer'];

  const saillies = [
    { id: 1, female: 'F-012', male: 'M-004', status: 'Gestation confirmée', statusBadgeColor: 'primary', date: '16/05/2026', expectedDate: '16/06/2026' },
    { id: 2, female: 'F-008', male: 'M-002, M-006', status: 'En attente', statusBadgeColor: 'secondary', date: '18/05/2026', hasControlToday: true, type: 'Double passage' },
    { id: 3, female: 'F-021', male: 'M-003', status: 'Échec', statusBadgeColor: 'danger', date: '05/05/2026' }
  ];

  const portees = [
    { id: 'P-014', status: 'En cours', female: 'F-012', age: '21 jours', effectif: '8 vivants', sevrage: '20/06/2026', badgeColor: 'secondary' },
    { id: 'P-009', status: 'À sevrer', female: 'F-008', effectif: '5 lapereaux vivants', badgeColor: 'warning' }
  ];

  const filteredSaillies = saillieFilter === 'Toutes' ? saillies : saillies.filter(s => s.status === saillieFilter);
  const filteredPortees = porteeFilter === 'Toutes' ? portees : portees.filter(p => p.status === porteeFilter);

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
            {sailliesFilters.map(f => (
              <button 
                key={f}
                onClick={() => setSaillieFilter(f)}
                className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
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
                      <button className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-border transition-colors">Voir détails</button>
                      <button className="flex-1 py-2 rounded-lg bg-primary text-background text-xs font-bold hover:opacity-90 transition-opacity">Enregistrer mise bas</button>
                    </>
                  )}
                  {s.status === 'En attente' && (
                    <>
                      <button className="flex-1 py-2 rounded-lg bg-secondary text-background text-xs font-bold">Confirmer gestation</button>
                      <button className="flex-1 py-2 rounded-lg border border-danger text-danger text-xs font-bold">Déclarer échec</button>
                    </>
                  )}
                  {s.status === 'Échec' && (
                    <button className="w-full py-2 rounded-lg border border-border text-xs font-semibold hover:bg-border transition-colors">Détails de l'échec</button>
                  )}
                </div>
              </div>
            ))}
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
            {porteesFilters.map(f => (
              <button 
                key={f}
                onClick={() => setPorteeFilter(f)}
                className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
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
                      <button className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-surface">Déclarer sevrage</button>
                      <button className="flex-1 py-2 rounded-lg border border-danger/30 text-danger text-xs font-semibold hover:bg-danger/10">Mortalité</button>
                    </div>
                  </>
                )}

                {p.status === 'À sevrer' && (
                  <>
                    <p className="text-sm text-muted mb-4">Mère: <span className="font-mono text-foreground">{p.female}</span> • {p.effectif}</p>
                    <button className="w-full py-3 rounded-lg bg-warning text-background font-bold text-sm">Sevrage immédiat</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
