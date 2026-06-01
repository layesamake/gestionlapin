import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle,  Thermometer, Info } from 'lucide-react';

export const EnregistrerSoin: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/sante');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <button 
          onClick={() => navigate(-1)}
          className="text-muted active:scale-95 transition-transform"
        >
          Annuler
        </button>
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">Valider un Soin</h1>
        <button 
          onClick={handleSave}
          className="text-primary font-bold active:scale-95 transition-transform"
        >
          Valider
        </button>
      </header>

      <main className="flex-grow pt-20 px-4 space-y-6 max-w-lg mx-auto w-full">
        <div className="bg-surface border border-border p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Prévention Coccidiose</h2>
              <p className="text-sm text-muted">Traitement préventif</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3 text-xs">
            <span className="bg-background px-2 py-1 rounded border border-border text-foreground">Cible : Tout le cheptel</span>
            <span className="bg-background px-2 py-1 rounded border border-border text-foreground">1ml/L d'eau</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Date de réalisation *</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]" 
              type="date" 
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Coût (Optionnel)</label>
            <div className="relative">
              <input 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none font-mono" 
                placeholder="0.00" 
                type="number" 
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-mono">XOF</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Compte-rendu</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
              placeholder="Avez-vous remarqué quelque chose pendant le traitement ?" 
              rows={4}
            ></textarea>
          </div>

          <div className="bg-surface/50 border-l-4 border-secondary rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Traçabilité</p>
              <p className="text-xs text-muted leading-relaxed">
                Valider ce soin mettra à jour l'historique de tous les lapins ciblés par ce traitement.
              </p>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-primary text-background font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              <CheckCircle className="w-5 h-5" /> Enregistrer le soin
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
