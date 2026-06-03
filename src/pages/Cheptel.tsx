import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search, PlusCircle, PawPrint, Tag } from 'lucide-react';

export const Cheptel: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();
  const animals = useStore(state => state.animals);

  const filters = ['Tous', 'Mâles', 'Femelles', 'Gestantes', 'Allaitantes', 'Au repos'];

  const filteredAnimals = animals.filter((animal: any) => {
    if (activeFilter === 'Tous') return true;
    if (activeFilter === 'Mâles') return animal.type.includes('Mâle');
    if (activeFilter === 'Femelles') return animal.type.includes('Femelle');
    return animal.status === activeFilter;
  });

  const getStatusBadgeStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('saillie')) {
      return 'bg-amber-500/10 text-amber-500 border border-amber-500/30';
    }
    if (s.includes('actif')) {
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
    }
    if (s.includes('allaitante')) {
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
    }
    if (s.includes('gestante')) {
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
    }
    if (s.includes('repos')) {
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
    }
    return 'bg-brand-neutral/10 text-brand-neutral border border-brand-neutral/30';
  };

  return (
    <>
      <section className="space-y-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
          <input 
            className="w-full bg-brand-card border border-brand-border rounded-xl py-3 pl-10 pr-4 text-brand-text placeholder:text-brand-muted focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all" 
            placeholder="Rechercher par code, race ou statut..." 
            type="text" 
          />
        </div>
        
        <div className="flex overflow-x-auto gap-2 hide-scrollbar -mx-4 px-4 pb-2">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-all active:scale-95 ${
                activeFilter === filter 
                  ? 'bg-brand-primary text-brand-bg font-semibold' 
                  : 'bg-brand-card border border-brand-border text-brand-muted font-medium hover:border-brand-primary/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3 mt-6">
        {filteredAnimals.map((animal: any) => {
          const isFemale = animal.gender === 'F' || animal.type?.toLowerCase().includes('femelle') || animal.id?.startsWith('F-');
          const displayName = animal.name && animal.name !== 'Sans nom' ? animal.name : animal.id;
          
          let breed = animal.race;
          if (!breed && animal.type) {
            const parts = animal.type.split('•');
            if (parts.length > 1) {
              breed = parts[1].trim();
            }
          }

          return (
            <div 
              key={animal.id} 
              onClick={() => navigate(`/cheptel/${animal.id}`)}
              className={`cursor-pointer bg-brand-card border rounded-2xl p-4 flex items-start gap-4 shadow-sm transition-all hover:scale-[1.01] ${
                animal.isWarning 
                  ? 'border-brand-warning/30 border-l-4 border-l-brand-warning hover:border-brand-warning/50' 
                  : 'border-brand-border hover:border-brand-primary/30'
              }`}
            >
              {/* Photo Miniature */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-border/40 flex items-center justify-center border border-brand-border/50">
                {animal.image ? (
                  <img src={animal.image} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <PawPrint className="w-6 h-6 text-brand-muted/50" />
                )}
              </div>

              {/* Informations */}
              <div className="flex-grow min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  {/* Nom ou ID */}
                  <h3 className="font-display font-bold text-lg text-brand-text truncate leading-tight animate-fade-in">
                    {displayName}
                  </h3>
                  
                  {/* Statut Badge */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${getStatusBadgeStyle(animal.status)}`}>
                    {animal.status}
                  </span>
                </div>

                {/* Sexe et Race / Robe */}
                <div className="flex items-center gap-1.5 text-sm text-brand-text/90 font-medium">
                  {isFemale ? (
                    <span className="text-brand-text/95 font-bold">♀</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">♂</span>
                  )}
                  <span className="truncate">
                    {isFemale ? 'Femelle' : 'Mâle'}
                    {(animal.robe || breed) && ' - '}
                    {animal.robe}
                    {animal.robe && breed && ', '}
                    {breed}
                  </span>
                </div>

                {/* Emplacement / Cage */}
                {(animal.cage || animal.location) && (
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted font-medium mt-0.5">
                    <Tag className="w-3.5 h-3.5 text-brand-muted" />
                    <span>{animal.cage || animal.location}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>


      <section className="flex flex-col gap-3 pt-6">
        <button 
          onClick={() => navigate('/cheptel/nouveau')}
          className="flex items-center justify-center gap-2 w-full py-4 bg-brand-primary text-brand-bg rounded-xl font-bold active:scale-95 transition-transform"
        >
          <PlusCircle className="w-5 h-5" /> Nouveau reproducteur
        </button>
        <button 
          onClick={() => navigate('/cheptel/race/nouvelle')}
          className="flex items-center justify-center gap-2 w-full py-3 border border-brand-border text-brand-text rounded-xl font-semibold active:scale-95 transition-transform"
        >
          <PawPrint className="w-5 h-5" /> Nouvelle race
        </button>
      </section>
    </>
  );
};
