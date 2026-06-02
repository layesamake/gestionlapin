import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, Info, HeartPulse } from 'lucide-react';

export const FicheSaillie: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock Data
  const saillieId = id || '1';
  const status = 'Gestation confirmée'; // Simulate state

  return (
    <div className="pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="active:scale-95 transition-transform text-muted"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-foreground font-display font-bold tracking-tight text-lg">Fiche Saillie #{saillieId}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{status}</span>
          <button className="text-muted active:scale-95 transition-transform">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-4">
        {/* Offline Indicator */}
        <div className="flex items-center justify-center gap-2 py-1 text-[10px] text-muted font-medium bg-surface rounded-full w-fit mx-auto px-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Fonctionne sans Internet • Données locales
        </div>

        {/* Hero Card */}
        <section className="bg-surface rounded-xl border border-border overflow-hidden shadow-2xl">
          <div className="p-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-muted text-xs font-medium uppercase tracking-widest mb-1">Croisement</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold text-foreground">F-012</span>
                  <HeartPulse className="w-5 h-5 text-danger" />
                  <span className="font-mono text-2xl font-bold text-foreground">M-004</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Type de saillie</span>
                <span className="font-medium text-foreground">Naturelle (Simple passage)</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <span className="text-muted">Date de saillie</span>
                <span className="font-mono text-foreground">16/05/2026</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <span className="text-muted">Palpation (J+14)</span>
                <span className="font-bold text-primary flex items-center gap-1">
                  Positif <Info className="w-3 h-3" />
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <div className="flex flex-col">
                  <span className="text-muted">Date prévue de mise bas</span>
                  <span className="text-[10px] text-warning">dans 14 jours</span>
                </div>
                <span className="font-mono text-foreground">16/06/2026</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border-t border-border">
            <div className="flex gap-2 items-start">
              <span className="text-muted w-4 h-4 flex-shrink-0">📝</span>
              <p className="text-xs text-muted italic">"Bonne acceptation du mâle, saillie rapide."</p>
            </div>
          </div>
        </section>

        {/* Historique */}
        <section className="space-y-3 pb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted px-1">Historique</h3>
          <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
            <div className="relative flex gap-4">
              <div className="z-10 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background mt-1.5"></div>
              <div>
                <p className="text-[10px] font-mono text-muted">30/05/2026</p>
                <p className="text-xs text-foreground">Confirmation de la gestation par palpation.</p>
              </div>
            </div>
            <div className="relative flex gap-4">
              <div className="z-10 w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background mt-1.5"></div>
              <div>
                <p className="text-[10px] font-mono text-muted">16/05/2026</p>
                <p className="text-xs text-foreground">Enregistrement de la saillie.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 gap-3 py-4">
          <button className="bg-primary text-background font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            Enregistrer la mise bas
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-danger text-danger font-bold py-3 rounded-lg text-sm active:scale-[0.98] transition-transform">
              Déclarer échec
            </button>
            <button className="border border-border text-foreground font-bold py-3 rounded-lg text-sm active:scale-[0.98] transition-transform hover:bg-surface">
              Modifier
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
