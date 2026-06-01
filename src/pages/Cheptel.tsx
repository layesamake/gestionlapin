import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cheptelData } from '../data/mockData';
import { Search, PlusCircle, CheckCircle, Info, Repeat, PawPrint } from 'lucide-react';

export const Cheptel: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();

  const filters = ['Tous', 'Mâles', 'Femelles', 'Gestantes', 'Allaitantes', 'Au repos'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'check_circle': return <CheckCircle className="w-5 h-5 text-brand-primary" />;
      case 'info': return <Info className="w-5 h-5 text-brand-neutral" />;
      case 'event_repeat': return <Repeat className="w-5 h-5 text-brand-warning" />;
      default: return null;
    }
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
        {cheptelData.animals.map((animal) => (
          <div 
            key={animal.id} 
            onClick={() => navigate(`/cheptel/${animal.id}`)}
            className={`cursor-pointer bg-brand-card border rounded-xl p-4 flex flex-col gap-3 shadow-sm transition-colors ${
              animal.isWarning ? 'border-brand-warning/30 border-l-4 border-l-brand-warning hover:border-brand-warning/50' : 'border-brand-border hover:border-brand-primary/30'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold text-lg text-${animal.badgeColor}`}>{animal.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-${animal.badgeColor}/10 text-${animal.badgeColor}`}>
                    {animal.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-brand-text">{animal.type}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-brand-muted block uppercase">Localisation</span>
                <span className="text-sm font-bold text-brand-text">{animal.location}</span>
              </div>
            </div>
            {animal.infoText && (
              <div className="flex items-center gap-2 pt-2 border-t border-brand-border/50">
                {getIcon(animal.infoIcon as string)}
                <span className={`text-xs font-semibold text-${animal.infoColor}`}>{animal.infoText}</span>
              </div>
            )}
          </div>
        ))}
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
