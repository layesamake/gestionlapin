import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, Pill, Syringe } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProgrammerTraitement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { animals } = useStore();

  const [cible, setCible] = useState(location.state?.animalId ? 'specifique' : 'tout');
  const [specificAnimalId, setSpecificAnimalId] = useState(location.state?.animalId || '');
  const [typeTraitement, setTypeTraitement] = useState<'preventif' | 'curatif'>('preventif');

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
          type="button"
        >
          Annuler
        </button>
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">Nouveau Traitement</h1>
        <button 
          onClick={handleSave}
          className="text-primary font-bold active:scale-95 transition-transform"
          type="button"
        >
          Enregistrer
        </button>
      </header>

      <main className="flex-grow pt-20 px-4 space-y-6 max-w-lg mx-auto w-full">
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Nom du traitement *</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
              placeholder="ex: Vitamine AD3E" 
              type="text" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Cible *</label>
            <select 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary outline-none font-sans"
              value={cible}
              onChange={(e) => setCible(e.target.value)}
            >
              <option value="tout">Tout le cheptel</option>
              <option value="males">Tous les mâles</option>
              <option value="femelles">Toutes les femelles</option>
              <option value="portees">Toutes les portées</option>
              <option value="specifique">Lapin spécifique</option>
            </select>
          </div>

          {cible === 'specifique' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <label className="block text-sm font-medium text-muted">Sélectionner le lapin *</label>
              <select 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none"
                value={specificAnimalId}
                onChange={(e) => setSpecificAnimalId(e.target.value)}
                required
              >
                <option value="" disabled>Sélectionner un lapin</option>
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} {a.name ? `- ${a.name}` : ''} ({a.gender === 'F' ? 'Femelle' : 'Mâle'})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Type</label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-surface border border-border rounded-xl">
              <button 
                type="button" 
                onClick={() => setTypeTraitement('preventif')}
                className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  typeTraitement === 'preventif' ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
                }`}
              >
                <Pill className="w-4 h-4" /> Préventif
              </button>
              <button 
                type="button" 
                onClick={() => setTypeTraitement('curatif')}
                className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  typeTraitement === 'curatif' ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
                }`}
              >
                <Syringe className="w-4 h-4" /> Curatif
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Date prévue *</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:light]" 
              type="date" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Posologie</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
              placeholder="ex: 1ml dans l'eau" 
              type="text" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Observations</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
              placeholder="Notes complémentaires..." 
              rows={3}
            ></textarea>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-primary text-background font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Save className="w-5 h-5 fill-current" /> Programmer
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
