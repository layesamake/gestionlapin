import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Pill, Syringe, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Wizard } from '../components/ui/Wizard';
import type { WizardStep } from '../components/ui/Wizard';

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

  const [formData, setFormData] = useState({
    nom: existingSoin ? existingSoin.type : '',
    cible: existingSoin ? getCibleFromAnimalId(existingSoin.animalId) : (location.state?.animalId ? 'specifique' : 'tout'),
    specificAnimalId: existingSoin ? (getCibleFromAnimalId(existingSoin.animalId) === 'specifique' ? existingSoin.animalId : '') : (location.state?.animalId || ''),
    typeTraitement: existingSoin ? (existingSoin.category === 'Traitement curatif' ? 'curatif' : 'preventif') : 'preventif',
    datePrevue: existingSoin ? getPlannedDateFromSoin(existingSoin) : new Date().toISOString().split('T')[0],
    posologie: existingSoin?.posologie || '',
    observations: existingSoin?.observations || ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (existingSoin) {
      const computedCible = getCibleFromAnimalId(existingSoin.animalId);
      setFormData({
        nom: existingSoin.type,
        cible: computedCible,
        specificAnimalId: computedCible === 'specifique' ? existingSoin.animalId : '',
        typeTraitement: existingSoin.category === 'Traitement curatif' ? 'curatif' : 'preventif',
        datePrevue: getPlannedDateFromSoin(existingSoin),
        posologie: existingSoin.posologie || '',
        observations: existingSoin.observations || ''
      });
    }
  }, [existingSoin]);

  const handleComplete = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = formData.datePrevue === todayStr;
    const isLate = formData.datePrevue < todayStr;

    let animalId = 'Tout le cheptel';
    if (formData.cible === 'males') animalId = 'Tous les mâles';
    else if (formData.cible === 'femelles') animalId = 'Toutes les femelles';
    else if (formData.cible === 'portees') animalId = 'Toutes les portées';
    else if (formData.cible === 'specifique') {
      animalId = formData.specificAnimalId;
    }

    const category = formData.typeTraitement === 'preventif' ? 'Prophylaxie' : 'Traitement curatif';
    const status = existingSoin ? existingSoin.status : (isLate ? 'En retard' : 'À faire');
    
    let dateLabel = '';
    if (status === 'Fait') {
      dateLabel = `Fait le ${formatToFrenchDate(formData.datePrevue)} • Terminé`;
    } else if (status === 'En cours') {
      dateLabel = `Du ${formatToFrenchDate(formData.datePrevue)} au ${formatToFrenchDate(formData.datePrevue)}`;
    } else {
      if (isToday) {
        dateLabel = `Prévu le ${formatToFrenchDate(formData.datePrevue)} (Aujourd'hui)`;
      } else if (isLate) {
        const diffTime = Math.abs(new Date(todayStr).getTime() - new Date(formData.datePrevue).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        dateLabel = `Prévu le ${formatToFrenchDate(formData.datePrevue)} (Il y a ${diffDays} jours)`;
      } else {
        dateLabel = `Prévu le ${formatToFrenchDate(formData.datePrevue)}`;
      }
    }

    const statusColor = status === 'Fait' ? 'primary' : status === 'En cours' ? 'secondary' : isLate ? 'danger' : 'warning';

    const soinData = {
      type: formData.nom,
      animalId,
      category,
      plannedDate: formData.datePrevue,
      posologie: formData.posologie,
      observations: formData.observations,
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

  const isStep1Valid = formData.nom.trim().length > 0 && 
                      (formData.cible !== 'specifique' || formData.specificAnimalId.trim().length > 0);

  const step1Content = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Nom du traitement *</label>
        <input 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
          placeholder="ex: Vitamine AD3E" 
          type="text" 
          value={formData.nom}
          onChange={(e) => handleChange('nom', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Cible *</label>
        <select 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary outline-none font-sans"
          value={formData.cible}
          onChange={(e) => handleChange('cible', e.target.value)}
        >
          <option value="tout">Tout le cheptel</option>
          <option value="males">Tous les mâles</option>
          <option value="femelles">Toutes les femelles</option>
          <option value="portees">Toutes les portées</option>
          <option value="specifique">Lapin spécifique</option>
        </select>
      </div>

      {formData.cible === 'specifique' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <label className="block text-sm font-medium text-muted">Sélectionner le lapin *</label>
          <select 
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none"
            value={formData.specificAnimalId}
            onChange={(e) => handleChange('specificAnimalId', e.target.value)}
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
            onClick={() => handleChange('typeTraitement', 'preventif')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              formData.typeTraitement === 'preventif' ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
            }`}
          >
            <Pill className="w-4 h-4" /> Préventif
          </button>
          <button 
            type="button" 
            onClick={() => handleChange('typeTraitement', 'curatif')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              formData.typeTraitement === 'curatif' ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
            }`}
          >
            <Syringe className="w-4 h-4" /> Curatif
          </button>
        </div>
      </div>
    </div>
  );

  const step2Content = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Date prévue *</label>
        <input 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:light]" 
          type="date" 
          value={formData.datePrevue}
          onChange={(e) => handleChange('datePrevue', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Posologie</label>
        <input 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
          placeholder="ex: 1ml dans l'eau" 
          type="text" 
          value={formData.posologie}
          onChange={(e) => handleChange('posologie', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Observations</label>
        <textarea 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
          placeholder="Notes complémentaires..." 
          rows={3}
          value={formData.observations}
          onChange={(e) => handleChange('observations', e.target.value)}
        ></textarea>
      </div>

      {existingSoin && (
        <button 
          type="button"
          onClick={handleDelete}
          className="w-full mt-4 bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2"
        >
          <Trash2 className="w-5 h-5" /> Supprimer le traitement
        </button>
      )}
    </div>
  );

  const steps: WizardStep[] = [
    { title: 'Information', content: step1Content, isValid: isStep1Valid },
    { title: 'Détails', content: step2Content, isValid: formData.datePrevue.length > 0 }
  ];

  return (
    <Wizard 
      steps={steps} 
      onComplete={handleComplete} 
      onCancel={() => navigate(-1)} 
      completeText={existingSoin ? 'Mettre à jour' : 'Programmer'}
    />
  );
};
