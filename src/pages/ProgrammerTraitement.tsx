import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Save, Pill, Syringe, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

// Helper to format Date string to YYYY-MM-DD
const getPlannedDateFromSoin = (soin: any) => {
  if (soin.plannedDate) return soin.plannedDate;
  const match = soin.date?.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    const [, d, m, y] = match;
    return `${y}-${m}-${d}`;
  }
  return new Date().toISOString().split('T')[0];
};

// Helper to format YYYY-MM-DD to DD/MM/YYYY
const formatToFrenchDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
  }
  return dateStr;
};

// Helper to map animalId label to cible select value
const getCibleFromAnimalId = (animalId: string) => {
  if (animalId === 'Tout le cheptel' || animalId === 'Tous') return 'tout';
  if (animalId === 'Tous les mâles' || animalId === 'Mâles') return 'males';
  if (animalId === 'Toutes les femelles' || animalId === 'Femelles') return 'femelles';
  if (animalId === 'Toutes les portées' || animalId === 'Portées') return 'portees';
  return 'specifique';
};

export const ProgrammerTraitement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { animals, soins, addSoin, updateSoin, removeSoin } = useStore();

  const existingSoin = id ? soins.find(s => String(s.id) === String(id)) : null;

  const [nom, setNom] = useState(existingSoin ? existingSoin.type : '');
  const [cible, setCible] = useState(
    existingSoin ? getCibleFromAnimalId(existingSoin.animalId) : (location.state?.animalId ? 'specifique' : 'tout')
  );
  const [specificAnimalId, setSpecificAnimalId] = useState(
    existingSoin ? (getCibleFromAnimalId(existingSoin.animalId) === 'specifique' ? existingSoin.animalId : '') : (location.state?.animalId || '')
  );
  const [typeTraitement, setTypeTraitement] = useState<'preventif' | 'curatif'>(
    existingSoin ? (existingSoin.category === 'Traitement curatif' ? 'curatif' : 'preventif') : 'preventif'
  );
  const [datePrevue, setDatePrevue] = useState(
    existingSoin ? getPlannedDateFromSoin(existingSoin) : new Date().toISOString().split('T')[0]
  );
  const [posologie, setPosologie] = useState(existingSoin?.posologie || '');
  const [observations, setObservations] = useState(existingSoin?.observations || '');

  // Synchronize state if existingSoin changes/loads
  useEffect(() => {
    if (existingSoin) {
      setNom(existingSoin.type);
      const computedCible = getCibleFromAnimalId(existingSoin.animalId);
      setCible(computedCible);
      setSpecificAnimalId(computedCible === 'specifique' ? existingSoin.animalId : '');
      setTypeTraitement(existingSoin.category === 'Traitement curatif' ? 'curatif' : 'preventif');
      setDatePrevue(getPlannedDateFromSoin(existingSoin));
      setPosologie(existingSoin.posologie || '');
      setObservations(existingSoin.observations || '');
    }
  }, [existingSoin]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !datePrevue) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = datePrevue === todayStr;
    const isLate = datePrevue < todayStr;

    // determine animalId label
    let animalId = 'Tout le cheptel';
    if (cible === 'males') animalId = 'Tous les mâles';
    else if (cible === 'femelles') animalId = 'Toutes les femelles';
    else if (cible === 'portees') animalId = 'Toutes les portées';
    else if (cible === 'specifique') {
      if (!specificAnimalId) {
        alert('Veuillez sélectionner un lapin.');
        return;
      }
      animalId = specificAnimalId;
    }

    const category = typeTraitement === 'preventif' ? 'Prophylaxie' : 'Traitement curatif';
    const status = existingSoin ? existingSoin.status : (isLate ? 'En retard' : 'À faire');
    
    // calculate date label
    let dateLabel = '';
    if (status === 'Fait') {
      dateLabel = `Fait le ${formatToFrenchDate(datePrevue)} • Terminé`;
    } else if (status === 'En cours') {
      dateLabel = `Du ${formatToFrenchDate(datePrevue)} au ${formatToFrenchDate(datePrevue)}`;
    } else {
      if (isToday) {
        dateLabel = `Prévu le ${formatToFrenchDate(datePrevue)} (Aujourd'hui)`;
      } else if (isLate) {
        const diffTime = Math.abs(new Date(todayStr).getTime() - new Date(datePrevue).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        dateLabel = `Prévu le ${formatToFrenchDate(datePrevue)} (Il y a ${diffDays} jours)`;
      } else {
        dateLabel = `Prévu le ${formatToFrenchDate(datePrevue)}`;
      }
    }

    const statusColor = status === 'Fait' ? 'primary' : status === 'En cours' ? 'secondary' : isLate ? 'danger' : 'warning';

    const soinData = {
      type: nom,
      animalId,
      category,
      plannedDate: datePrevue,
      posologie,
      observations,
      status,
      statusColor,
      date: dateLabel,
      isToday,
      isLate: isLate && status !== 'Fait',
    };

    if (existingSoin) {
      updateSoin(existingSoin.id, soinData);
    } else {
      addSoin({
        id: Date.now(),
        ...soinData,
      });
    }

    navigate('/sante');
  };

  const handleDelete = () => {
    if (existingSoin && window.confirm('Êtes-vous sûr de vouloir supprimer ce traitement ?')) {
      removeSoin(existingSoin.id);
      navigate('/sante');
    }
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
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">
          {existingSoin ? 'Modifier le Traitement' : 'Nouveau Traitement'}
        </h1>
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
              value={nom}
              onChange={(e) => setNom(e.target.value)}
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
              value={datePrevue}
              onChange={(e) => setDatePrevue(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Posologie</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
              placeholder="ex: 1ml dans l'eau" 
              type="text" 
              value={posologie}
              onChange={(e) => setPosologie(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Observations</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
              placeholder="Notes complémentaires..." 
              rows={3}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            ></textarea>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-primary text-background font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Save className="w-5 h-5 fill-current" /> {existingSoin ? 'Enregistrer les modifications' : 'Programmer'}
            </button>
            
            {existingSoin && (
              <button 
                type="button"
                onClick={handleDelete}
                className="w-full bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                <Trash2 className="w-5 h-5" /> Supprimer le traitement
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};
