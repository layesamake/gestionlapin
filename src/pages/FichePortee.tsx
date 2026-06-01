import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Settings,   Pill, CheckCircle, LogOut } from 'lucide-react';

export const FichePortee: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock ID
  const porteeId = id || 'P-014';

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
          <h1 className="text-foreground font-display font-bold tracking-tight text-lg">Fiche Portée: {porteeId}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">En cours</span>
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

        {/* Hero Card (Bento Style) */}
        <section className="bg-surface rounded-xl border border-border overflow-hidden shadow-2xl">
          <div className="p-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-muted text-xs font-medium uppercase tracking-widest mb-1">Identification</p>
                <h2 className="font-mono text-2xl font-bold text-primary">{porteeId}</h2>
              </div>
              <div className="text-right">
                <p className="text-muted text-xs font-medium uppercase tracking-widest mb-1">Emplacement</p>
                <span className="font-mono bg-border px-3 py-1 rounded text-sm font-bold text-foreground">Cage A3</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background p-3 rounded-lg border border-border/50">
                <p className="text-muted text-[10px] uppercase font-bold mb-1">Mère</p>
                <p className="font-mono text-foreground text-sm">F-012</p>
                <p className="text-muted text-xs">Blanchette</p>
              </div>
              <div className="bg-background p-3 rounded-lg border border-border/50">
                <p className="text-muted text-[10px] uppercase font-bold mb-1">Père</p>
                <p className="font-mono text-foreground text-sm">M-004</p>
                <p className="text-muted text-xs">Grisou</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Saillie</span>
                <span className="font-mono text-foreground">16/05/2026</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <span className="text-muted">Mise bas</span>
                <span className="font-mono text-foreground">16/06/2026</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <span className="text-muted">Âge de la portée</span>
                <span className="font-bold text-secondary">21 jours</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                <div className="flex flex-col">
                  <span className="text-muted">Sevrage</span>
                  <span className="text-[10px] text-warning">dans 14 jours</span>
                </div>
                <span className="font-mono text-foreground">21/07/2026</span>
              </div>
            </div>
          </div>

          {/* Bilan Stats */}
          <div className="bg-background p-4 border-t border-border">
            <p className="text-muted text-[10px] uppercase font-bold mb-3">Bilan de production</p>
            <div className="grid grid-cols-5 gap-2">
              <div className="text-center">
                <p className="text-foreground font-bold text-lg leading-tight">9</p>
                <p className="text-[8px] text-muted uppercase">Nés</p>
              </div>
              <div className="text-center">
                <p className="text-primary font-bold text-lg leading-tight">8</p>
                <p className="text-[8px] text-muted uppercase">Vifs</p>
              </div>
              <div className="text-center">
                <p className="text-danger font-bold text-lg leading-tight">1</p>
                <p className="text-[8px] text-muted uppercase">Morts</p>
              </div>
              <div className="text-center">
                <p className="text-foreground font-bold text-lg leading-tight">0</p>
                <p className="text-[8px] text-muted uppercase">Post</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-secondary font-bold text-lg leading-tight">8</p>
                <p className="text-[8px] text-muted uppercase">Actu.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface border-t border-border">
            <div className="flex gap-2 items-start">
              {/* Note icon placeholder */}
              <span className="text-muted w-4 h-4 flex-shrink-0">📝</span>
              <p className="text-xs text-muted italic">"Portée vigoureuse, bon développement."</p>
            </div>
          </div>
        </section>

        {/* Suivi Sanitaire */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted px-1">Suivi Sanitaire</h3>
          <div className="bg-surface rounded-xl border border-border divide-y divide-border">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Vitamine Adec</p>
                  <p className="text-[10px] text-muted">Prévu le 10/07/2026</p>
                </div>
              </div>
              <span className="bg-warning/10 text-warning text-[10px] font-bold px-2 py-1 rounded">À FAIRE</span>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Prévention Coccidiose</p>
                  <p className="text-[10px] text-muted">Fait le 30/06/2026</p>
                </div>
              </div>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">TERMINÉ</span>
            </div>
          </div>
        </section>

        {/* Historique */}
        <section className="space-y-3 pb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted px-1">Historique</h3>
          <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
            <div className="relative flex gap-4">
              <div className="z-10 w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background mt-1.5"></div>
              <div>
                <p className="text-[10px] font-mono text-muted">30/06/2026</p>
                <p className="text-xs text-foreground">Traitement préventif Coccidiose.</p>
              </div>
            </div>
            <div className="relative flex gap-4">
              <div className="z-10 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background mt-1.5"></div>
              <div>
                <p className="text-[10px] font-mono text-muted">16/06/2026</p>
                <p className="text-xs text-foreground">Enregistrement de la mise bas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 gap-3 py-4">
          <button className="bg-primary text-background font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <LogOut className="w-5 h-5" />
            Déclarer sevrage
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-danger text-danger font-bold py-3 rounded-lg text-sm active:scale-[0.98] transition-transform">
              Mortalité
            </button>
            <button className="border border-border text-foreground font-bold py-3 rounded-lg text-sm active:scale-[0.98] transition-transform hover:bg-surface">
              Emplacement
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
