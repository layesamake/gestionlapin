import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Heart, Baby, CalendarClock, CheckCircle, CalendarX, PlusCircle, Syringe, Edit3 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const FicheReproducteur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const animals = useStore(state => state.animals);
  const updateAnimal = useStore(state => state.updateAnimal);

  // Find animal or fallback to a default mock for the demo
  const animalInfo = (animals.find((a: any) => a.id === id) || {
    id: 'F-012', name: 'Blanchette', gender: 'F', race: 'Néo-Zélandais', age: '14 mois', weight: '4.2', status: 'Gestante', statusColor: 'primary', cage: 'A3'
  }) as any;

  const handleMortalite = () => {
    if (window.confirm(`Voulez-vous vraiment déclarer la mortalité de ce reproducteur (${animalInfo.id}) ?`)) {
      updateAnimal(animalInfo.id, { status: 'Mort', badgeColor: 'brand-danger' });
      navigate('/cheptel');
    }
  };

  return (
    <div className="pb-24">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform text-muted"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted font-mono uppercase tracking-wider">Identifiant</span>
            <h1 className="text-foreground font-display font-bold tracking-tight text-lg leading-tight">{animalInfo.id}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`bg-${animalInfo.statusColor}/15 text-${animalInfo.statusColor} px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase`}>
            {animalInfo.status}
          </span>
          <button className="p-2 text-muted active:scale-95 transition-transform">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-6">
        {/* Offline Indicator */}
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-surface/50 border border-border rounded-xl">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] text-muted font-medium">Fonctionne sans Internet • Données locales</span>
        </div>

        {/* Section: Informations Générales */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-muted uppercase tracking-widest">Informations Générales</h2>
            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">MODÈLE NE-Z-01</span>
          </div>
          <div className="bg-surface/70 backdrop-blur-md border border-border rounded-xl overflow-hidden">
            <div className="h-48 relative overflow-hidden bg-surface">
              {animalInfo.image ? (
                <img src={animalInfo.image} alt={animalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-border to-surface flex items-center justify-center">
                   <Baby className="w-20 h-20 text-muted/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-foreground">{animalInfo.name}</h3>
                <p className="text-sm text-muted">{animalInfo.gender === 'F' ? 'Femelle' : 'Mâle'} • {animalInfo.race}</p>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] text-muted font-medium uppercase">Âge</p>
                <p className="text-sm font-semibold">{animalInfo.age} <span className="text-[10px] text-muted font-normal">(12/04/2025)</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted font-medium uppercase">Origine</p>
                <p className="text-sm font-semibold">Élevage du Val</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted font-medium uppercase">Emplacement</p>
                <p className="text-sm font-mono font-bold text-secondary">CAGE {animalInfo.cage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted font-medium uppercase">Poids actuel</p>
                <p className="text-sm font-semibold">{animalInfo.weight} kg</p>
              </div>
              <div className="col-span-2 pt-2 mt-2 border-t border-border/50">
                <p className="text-[10px] text-muted font-medium uppercase mb-1">Observation</p>
                <p className="text-xs italic text-foreground/80 leading-relaxed">"Très bonne mère, attentive aux lapereaux."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Performances (Bento Grid Style) */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-muted uppercase tracking-widest">Performances Reproduction</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface border border-border p-3 rounded-xl flex flex-col justify-between aspect-square">
              <Baby className="w-6 h-6 text-primary mb-2" />
              <div>
                <p className="text-2xl font-bold font-display">100%</p>
                <p className="text-[10px] text-muted uppercase font-medium">Taux Réussite</p>
              </div>
            </div>
            
            <div className="grid grid-rows-2 gap-3">
              <div className="bg-surface border border-border px-3 py-2 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold font-mono">3</p>
                  <p className="text-[9px] text-muted uppercase font-medium">Saillies</p>
                </div>
                <Heart className="w-5 h-5 text-muted" />
              </div>
              <div className="bg-surface border border-border px-3 py-2 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold font-mono">2</p>
                  <p className="text-[9px] text-muted uppercase font-medium">Mises Bas</p>
                </div>
                <Baby className="w-5 h-5 text-muted" />
              </div>
            </div>
            
            <div className="col-span-2 bg-surface border border-border p-3 rounded-xl flex items-center justify-around divide-x divide-border">
              <div className="text-center px-4">
                <p className="text-lg font-bold">16</p>
                <p className="text-[10px] text-muted uppercase font-medium">Nés Vivants</p>
              </div>
              <div className="text-center px-4">
                <p className="text-lg font-bold">14</p>
                <p className="text-[10px] text-muted uppercase font-medium">Sevrés</p>
              </div>
              <div className="text-center px-4">
                <p className="text-[10px] font-mono text-muted">10/03/2026</p>
                <p className="text-[10px] text-muted uppercase font-medium">Dernière MB</p>
              </div>
            </div>

            {/* Next Action Callout */}
            <div className="col-span-2 bg-primary/10 border border-primary/30 p-4 rounded-xl flex items-center gap-4 animate-pulse">
              <div className="bg-primary p-2 rounded-lg">
                <CalendarClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Action Immédiate</p>
                <p className="text-sm font-bold text-white">Contrôle gestation (Aujourd'hui)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Historique Sanitaire */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-muted uppercase tracking-widest">Historique Sanitaire</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4 bg-surface/40 border border-border p-3 rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-semibold">Déparasitage interne</h4>
                <p className="text-[10px] text-muted font-mono">12/04/2026</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-primary uppercase">Fait</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-surface/40 border border-border p-3 rounded-xl border-l-4 border-l-danger">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
                <CalendarX className="w-6 h-6 text-danger" />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-semibold">Rappel Vitamines AD3E</h4>
                <p className="text-[10px] text-muted font-mono">Prévu le 28/05/2026</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-danger uppercase">En retard</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Buttons */}
        <section className="grid grid-cols-2 gap-3 pt-4">
          <button 
            onClick={() => navigate('/reproduction/saillie/nouvelle')}
            className="col-span-2 bg-primary text-background py-4 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            <PlusCircle className="w-5 h-5" />
            Nouvelle saillie
          </button>
          <button className="border border-secondary text-secondary py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Syringe className="w-5 h-5" />
            Nouveau traitement
          </button>
          <button className="border border-border text-muted py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-surface">
            <Edit3 className="w-5 h-5" />
            Modifier
          </button>
          <button 
            onClick={handleMortalite}
            className="col-span-2 border border-danger/50 bg-danger/10 text-danger py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-danger/20"
          >
            Déclarer mortalité
          </button>
        </section>
      </main>
    </div>
  );
};
