import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudOff, Info, Save } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AjouterRace: React.FC = () => {
  const navigate = useNavigate();
  const addRace = useStore((state) => state.addRace);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [raceName, setRaceName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = raceName.trim();
    if (!cleaned) return;
    setIsSubmitting(true);
    addRace(cleaned);
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(-1); // Or wherever appropriate
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <button 
          onClick={() => navigate(-1)}
          className="text-muted hover:text-foreground transition-colors active:scale-95"
          type="button"
        >
          Annuler
        </button>
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">Ajouter une Race</h1>
        <button 
          className="text-primary font-bold hover:opacity-80 transition-all active:scale-95 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isSubmitting || !raceName.trim()}
          type="button"
        >
          Enregistrer
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 px-4 overflow-y-auto hide-scrollbar max-w-2xl mx-auto w-full">
        {/* Offline Indicator */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
            <CloudOff className="w-4 h-4" />
            Fonctionne sans Internet • Données locales
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nom de la race */}
          <div className="space-y-1.5 focus-within:text-primary text-muted transition-colors">
            <label className="block text-sm font-medium" htmlFor="race_name">
              Nom de la race <span className="text-danger">*</span>
            </label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted/50" 
              id="race_name" name="race_name" placeholder="ex: Géant des Flandres, Californien..." required type="text"
              value={raceName}
              onChange={(e) => setRaceName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 focus-within:text-primary text-muted transition-colors">
            <label className="block text-sm font-medium" htmlFor="description">
              Description (facultatif)
            </label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all placeholder:text-muted/50" 
              id="description" name="description" placeholder="Caractéristiques principales" type="text"
            />
          </div>

          {/* Poids moyen */}
          <div className="space-y-1.5 focus-within:text-primary text-muted transition-colors">
            <label className="block text-sm font-medium" htmlFor="average_weight">
              Poids moyen adulte (kg)
            </label>
            <div className="relative">
              <input 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted/50" 
                id="average_weight" name="average_weight" placeholder="4.5" step="0.1" type="number"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted font-mono text-sm">
                kg
              </div>
            </div>
          </div>

          {/* Remarques */}
          <div className="space-y-1.5 focus-within:text-primary text-muted transition-colors">
            <label className="block text-sm font-medium" htmlFor="remarks">
              Remarques ou spécificités
            </label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all placeholder:text-muted/50 resize-none" 
              id="remarks" name="remarks" placeholder="Race très prolifique, rustique..." rows={3}
            ></textarea>
          </div>

          {/* Aide / Info Section */}
          <div className="bg-surface/50 border-l-4 border-secondary rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Conseils de saisie</p>
              <p className="text-xs text-muted leading-relaxed">
                Exemples de races courantes : Géant des Flandres, Californien, Néo-Zélandais, Croisé, Race locale.
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="pt-6 space-y-3">
            <button 
              className="w-full bg-primary text-background font-bold py-4 rounded-lg active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-70" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Enregistrement...</span>
              ) : (
                <>
                  <Save className="w-5 h-5 fill-current" />
                  Enregistrer la race
                </>
              )}
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-transparent border border-border text-muted font-semibold py-4 rounded-lg active:scale-[0.98] transition-transform" 
              type="button"
            >
              Annuler
            </button>
          </div>
        </form>
      </main>

      {/* Visual Background Decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>
    </div>
  );
};
