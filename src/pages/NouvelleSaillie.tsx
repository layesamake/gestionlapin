import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from '../components/ui/Toast';
import { Wizard } from '../components/ui/Wizard';
import type { WizardStep } from '../components/ui/Wizard';

export const NouvelleSaillie: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { animals, addSaillie } = useStore();
  const { showToast } = useToast();
  
  const femelles = animals.filter(a => a.gender === 'F' || a?.type?.startsWith('Femelle'));
  const males = animals.filter(a => a.gender === 'M' || a?.type?.startsWith('Mâle'));

  const [formData, setFormData] = useState({
    selectedFemale: location.state?.femaleId || '',
    selectedMale: location.state?.maleId || '',
    typeSaillie: 'Naturelle',
    dateSaillie: new Date().toISOString().split('T')[0],
    observations: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const dateObj = new Date(formData.dateSaillie);
  const controleGestation = new Date(dateObj); controleGestation.setDate(dateObj.getDate() + 14);
  const prepMiseBas = new Date(dateObj); prepMiseBas.setDate(dateObj.getDate() + 27);
  const miseBas = new Date(dateObj); miseBas.setDate(dateObj.getDate() + 31);

  const formatDate = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d+/g, '').substring(0, 15) + 'Z';
  };

  const handleAddToCalendar = () => {
    if (!formData.selectedFemale) {
      alert("Veuillez d'abord sélectionner une femelle.");
      return;
    }

    const events = [
      {
        title: `🐰 Palper ${formData.selectedFemale}`,
        date: controleGestation,
        desc: `Contrôle de gestation à J+14 pour la saillie du ${formatDate(dateObj)}`
      },
      {
        title: `🐰 Boîte à nid ${formData.selectedFemale}`,
        date: prepMiseBas,
        desc: `Mettre la boîte à nid. Mise bas prévue dans 4 jours.`
      },
      {
        title: `🐰 Mise bas prévue : ${formData.selectedFemale}`,
        date: miseBas,
        desc: `Vérifier la mise bas de la femelle ${formData.selectedFemale}.`
      }
    ];

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Gestion Lapins//FR\n";
    
    events.forEach(event => {
      event.date.setHours(8, 0, 0, 0);
      const start = formatICSDate(event.date);
      const end = formatICSDate(new Date(event.date.getTime() + 60 * 60 * 1000));
      
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `DTSTART:${start}\n`;
      icsContent += `DTEND:${end}\n`;
      icsContent += `SUMMARY:${event.title}\n`;
      icsContent += `DESCRIPTION:${event.desc}\n`;
      icsContent += "BEGIN:VALARM\nTRIGGER:-PT1H\nACTION:DISPLAY\nDESCRIPTION:Rappel\nEND:VALARM\n";
      icsContent += "END:VEVENT\n";
    });
    
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `suivi_${formData.selectedFemale}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleComplete = () => {
    addSaillie({
      id: Date.now(),
      female: formData.selectedFemale,
      male: formData.selectedMale || 'N/A',
      date: formData.dateSaillie,
      expectedDate: formatDate(miseBas),
      status: 'En attente',
      statusBadgeColor: 'bg-warning/20 text-warning'
    });

    showToast('Saillie enregistrée avec succès ✓', 'success');
    navigate('/reproduction');
  };

  const step1Content = (
    <div className="space-y-6">
      <div className="flex items-center justify-center space-x-2 py-1.5 bg-surface/50 rounded-lg border border-border text-[11px] text-muted mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <span>Fonctionne sans Internet • Données locales</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Sélection de la femelle *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg font-bold">♀</span>
          <select 
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-3 text-foreground font-mono appearance-none focus:ring-1 focus:ring-primary outline-none" 
            value={formData.selectedFemale}
            onChange={(e) => handleChange('selectedFemale', e.target.value)}
          >
            <option value="" disabled>Sélectionner une femelle</option>
            {femelles.map(f => (
              <option key={f.id} value={f.id}>{f.id}{f.name ? ` - ${f.name}` : ''}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Sélection du/des mâle(s)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg font-bold">♂</span>
          <select 
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-3 text-foreground font-mono appearance-none focus:ring-1 focus:ring-primary outline-none" 
            value={formData.selectedMale}
            onChange={(e) => handleChange('selectedMale', e.target.value)}
          >
            <option value="" disabled>Sélectionner un mâle</option>
            {males.map(m => (
              <option key={m.id} value={m.id}>{m.id}{m.name ? ` - ${m.name}` : ''}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
        </div>
      </div>
    </div>
  );

  const step2Content = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted">Date de saillie *</label>
          <input 
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:light]" 
            type="date" 
            value={formData.dateSaillie}
            onChange={(e) => handleChange('dateSaillie', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted">Heure (Facultatif)</label>
          <input 
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:light]" 
            type="time" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Type de saillie</label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-surface border border-border rounded-xl">
          {['Naturelle', 'Contrôlée', 'Double'].map((type) => (
            <button 
              key={type}
              type="button"
              onClick={() => handleChange('typeSaillie', type)}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                formData.typeSaillie === type ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted">Observations</label>
        <textarea 
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
          placeholder="Notes particulières..." 
          rows={3}
          value={formData.observations}
          onChange={(e) => handleChange('observations', e.target.value)}
        ></textarea>
      </div>
    </div>
  );

  const step3Content = (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="px-4 py-3 border-b border-border bg-background/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Dates Prévues
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-xs text-muted">Contrôle de gestation</p>
              <p className="text-sm font-mono font-medium text-foreground">{formatDate(controleGestation)}</p>
            </div>
            <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase">Dans 14j</span>
          </div>
          <div className="h-px bg-border"></div>
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-xs text-muted">Préparation mise bas</p>
              <p className="text-sm font-mono font-medium text-foreground">{formatDate(prepMiseBas)}</p>
            </div>
            <span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-bold rounded uppercase">Dans 27j</span>
          </div>
          <div className="h-px bg-border"></div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <p className="text-xs text-muted">Mise bas prévue</p>
                <p className="text-sm font-mono font-medium text-foreground">{formatDate(miseBas)}</p>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Dans 31j</span>
            </div>
            <button 
              type="button"
              onClick={handleAddToCalendar}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/30 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#1a73e8]/20 transition-colors"
            >
              <Calendar className="w-4 h-4" /> Ajouter au Calendrier
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const steps: WizardStep[] = [
    { title: 'Animaux', content: step1Content, isValid: formData.selectedFemale.length > 0 },
    { title: 'Détails', content: step2Content, isValid: formData.dateSaillie.length > 0 },
    { title: 'Prévisions', content: step3Content }
  ];

  return (
    <Wizard 
      steps={steps} 
      onComplete={handleComplete} 
      onCancel={() => navigate(-1)} 
      completeText="Créer la saillie"
    />
  );
};
