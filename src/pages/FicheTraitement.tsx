import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, Syringe, CheckCircle } from 'lucide-react';

export const FicheTraitement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock
  const traitementName = id === '1' ? 'Prévention Coccidiose' : 'Vitamine AD3E';

  return (
    <div className="pb-24">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="active:scale-95 transition-transform text-muted"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-foreground font-display font-bold tracking-tight text-lg truncate w-48">Détail du soin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-muted active:scale-95 transition-transform">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-4 max-w-lg mx-auto">
        {/* Header Card */}
        <div className="bg-surface border border-border p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Syringe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{traitementName}</h2>
                <p className="text-sm text-primary font-medium">Soin Préventif</p>
              </div>
            </div>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/20 uppercase">
              Terminé
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 relative z-10">
            <div>
              <p className="text-[10px] text-muted uppercase font-bold mb-1">Cible</p>
              <p className="text-sm font-semibold text-foreground">Tout le cheptel</p>
            </div>
            <div>
              <p className="text-[10px] text-muted uppercase font-bold mb-1">Date</p>
              <p className="text-sm font-mono font-bold text-foreground">12/04/2026</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-muted uppercase font-bold mb-1">Posologie</p>
              <p className="text-sm text-foreground bg-background p-2 rounded border border-border">1ml/L d'eau pendant 3 jours</p>
            </div>
          </div>
        </div>

        {/* Historique/Compte rendu */}
        <section className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted px-1">Compte-rendu d'exécution</h3>
          <div className="bg-surface rounded-xl border border-border p-4 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              Traitement administré à l'ensemble du cheptel via le système d'abreuvement automatique. Aucune réaction indésirable observée.
            </p>
            <div className="flex items-center gap-4 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted">Coût:</span>
                <span className="font-mono font-bold text-foreground">2 500 XOF</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted">Opérateur:</span>
                <span className="font-medium text-foreground">Propriétaire</span>
              </div>
            </div>
          </div>
        </section>

        {/* Suivi des lapins (Liste) */}
        <section className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted px-1">Impact (5 lapins concernés)</h3>
          <div className="bg-surface rounded-xl border border-border divide-y divide-border">
            <div className="p-3 flex justify-between items-center">
              <span className="font-mono font-bold text-foreground">F-012</span>
              <span className="text-primary text-[10px] font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Fait</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="font-mono font-bold text-foreground">F-008</span>
              <span className="text-primary text-[10px] font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Fait</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="font-mono font-bold text-foreground">M-004</span>
              <span className="text-primary text-[10px] font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Fait</span>
            </div>
            <div className="p-3 flex justify-center items-center">
              <button className="text-xs text-muted font-semibold">Voir les 2 autres...</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
