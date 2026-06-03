import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloudOff, CalendarClock, Link as LinkIcon, Save, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';

export const NouvellePortee: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { animals, portees, addPortee, updatePortee } = useStore();

  const existingPortee = isEditMode ? portees.find((p) => p.id === id) : null;

  const femelles = animals.filter(a => a.gender === 'F' || a?.type?.startsWith('Femelle'));

  const [female, setFemale] = useState(existingPortee?.female || '');
  const [dateMiseBas, setDateMiseBas] = useState(
    existingPortee?.dateMiseBas || new Date().toISOString().split('T')[0]
  );
  const [totalNes, setTotalNes] = useState(existingPortee?.totalNes || 9);
  const [nesVivants, setNesVivants] = useState(existingPortee?.nesVivants || 8);
  const [mortsNes, setMortsNes] = useState(existingPortee?.mortsNes || 1);
  const [cage, setCage] = useState(existingPortee?.cage || 'Cage A3');
  const [observations, setObservations] = useState(existingPortee?.observations || '');

  const handleNesVivantsChange = (val: number) => {
    setNesVivants(val);
    setTotalNes(val + mortsNes);
  };

  const handleMortsNesChange = (val: number) => {
    setMortsNes(val);
    setTotalNes(nesVivants + val);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!female) {
      alert("Veuillez sélectionner une femelle.");
      return;
    }

    const birthDate = new Date(dateMiseBas);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const ageStr = diffDays < 0 ? "Non née" : diffDays === 0 ? "0 jour" : `${diffDays} jours`;

    const sevrageDate = new Date(birthDate);
    sevrageDate.setDate(birthDate.getDate() + 35);
    const sevrageStr = sevrageDate.toLocaleDateString('fr-FR');

    const porteeData = {
      female,
      effectif: `${nesVivants} vivant${nesVivants > 1 ? 's' : ''}`,
      age: ageStr,
      sevrage: sevrageStr,
      status: existingPortee?.status || 'En cours',
      badgeColor: existingPortee?.badgeColor || 'secondary',
      // Additional details
      dateMiseBas,
      totalNes,
      nesVivants,
      mortsNes,
      cage,
      observations
    };

    if (isEditMode && id) {
      updatePortee(id, porteeData);
      navigate(`/reproduction/portee/${id}`);
    } else {
      const newId = `P-${String(portees.length + 15).padStart(3, '0')}`; // Avoid collision
      addPortee({
        id: newId,
        ...porteeData
      });
      navigate('/reproduction');
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full bg-background text-primary font-headline font-bold text-lg border-b border-border flex justify-between items-center px-4 h-16 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="text-muted font-medium text-base active:scale-95 transition-transform"
        >
          Annuler
        </button>
        <span className="text-foreground font-display font-bold tracking-tight">
          {isEditMode ? 'Modifier la Portée' : 'Nouvelle Portée'}
        </span>
        <button 
          onClick={handleSave}
          className="text-primary font-bold text-base active:scale-95 transition-transform"
        >
          Enregistrer
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-20 px-4 py-6 space-y-6 max-w-lg mx-auto w-full">
        {/* Connection Status Banner */}
        <div className="bg-surface/50 border border-border rounded-lg px-3 py-2 flex items-center justify-center gap-2">
          <CloudOff className="w-4 h-4 text-muted" />
          <span className="text-[12px] font-medium text-muted">Fonctionne sans Internet • Données locales</span>
        </div>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSave}>
          {/* Female Selection */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-muted ml-1">Sélection de la femelle *</label>
            <div className="relative group">
              <select 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary focus:border-primary appearance-none font-mono outline-none"
                value={female}
                onChange={(e) => setFemale(e.target.value)}
                required
              >
                <option value="" disabled>Sélectionner une femelle</option>
                {femelles.map(f => (
                  <option key={f.id} value={f.id}>{f.id}{f.name ? ` - ${f.name}` : ''}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none w-5 h-5" />
            </div>
          </div>

          {/* Mating Link */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-muted ml-1">Saillie liée</label>
            <div className="relative group">
              <select className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-secondary focus:border-secondary appearance-none font-mono outline-none" defaultValue="s1">
                <option value="s1">Saillie du 16/05/2026</option>
                <option value="s2">Saillie du 10/05/2026</option>
              </select>
              <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none w-4 h-4" />
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-muted ml-1">Date de la mise bas *</label>
            <div className="relative">
              <input 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary focus:border-primary font-mono outline-none [color-scheme:light]" 
                type="date" 
                value={dateMiseBas}
                onChange={(e) => setDateMiseBas(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Numerical Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-muted text-center uppercase tracking-wider">Total nés</label>
              <input 
                className="w-full bg-surface border border-border rounded-lg py-3 text-center text-xl font-bold text-foreground focus:border-foreground outline-none transition-colors animate-fade-in" 
                type="number" 
                value={totalNes}
                onChange={(e) => setTotalNes(parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-primary text-center uppercase tracking-wider">Nés vivants</label>
              <input 
                className="w-full bg-surface border-2 border-primary/30 rounded-lg py-3 text-center text-xl font-bold text-primary focus:border-primary outline-none transition-colors" 
                type="number" 
                value={nesVivants}
                onChange={(e) => handleNesVivantsChange(parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-danger text-center uppercase tracking-wider">Morts-nés</label>
              <input 
                className="w-full bg-surface border-2 border-danger/30 rounded-lg py-3 text-center text-xl font-bold text-danger focus:border-danger outline-none transition-colors" 
                type="number" 
                value={mortsNes}
                onChange={(e) => handleMortsNesChange(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-muted ml-1">Emplacement / Cage</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary focus:border-primary font-mono outline-none" 
              placeholder="ex: Cage A3" 
              type="text" 
              value={cage}
              onChange={(e) => setCage(e.target.value)}
            />
          </div>

          {/* Observations */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-muted ml-1">Observations</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none" 
              rows={3}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            ></textarea>
          </div>

          {/* Monitoring Section */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-muted font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              Suivi Prévu
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground text-sm">Âge actuel de la portée</span>
                <span className="text-secondary font-bold">
                  {(() => {
                    const birthDate = new Date(dateMiseBas);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    birthDate.setHours(0, 0, 0, 0);
                    const diffTime = today.getTime() - birthDate.getTime();
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays < 0) return "Non née";
                    return diffDays === 0 ? "0 jour" : `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
                  })()}
                </span>
              </div>
              <div className="h-px bg-border"></div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-foreground text-sm">Sevrage prévu le</span>
                  <span className="font-mono text-warning font-bold">
                    {(() => {
                      const birthDate = new Date(dateMiseBas);
                      birthDate.setDate(birthDate.getDate() + 35);
                      return birthDate.toLocaleDateString('fr-FR');
                    })()}
                  </span>
                </div>
                <span className="text-muted text-[12px] text-right italic font-sans">
                  {(() => {
                    const birthDate = new Date(dateMiseBas);
                    const sevrageDate = new Date(birthDate);
                    sevrageDate.setDate(birthDate.getDate() + 35);
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    sevrageDate.setHours(0,0,0,0);
                    const diffTime = sevrageDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays < 0) return `(dépassé de ${Math.abs(diffDays)} jours)`;
                    return `(dans ${diffDays} jours)`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-foreground text-sm">Statut initial</span>
                <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">Née</span>
              </div>
            </div>
          </div>

          {/* Final Action Buttons */}
          <div className="space-y-3 pt-4">
            <button 
              type="submit"
              className="w-full bg-primary text-background font-bold py-4 rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5 fill-current" /> Enregistrer la portée
            </button>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border border-border text-muted font-medium py-4 rounded-lg active:scale-[0.98] transition-all"
            >
              Annuler
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
