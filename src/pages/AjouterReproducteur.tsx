import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Camera, Check, X, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { calculateAge } from '../utils/dateUtils';
import { useToast } from '../components/ui/Toast';

export const AjouterReproducteur: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { addAnimal, updateAnimal, animals, races, addRace } = useStore();
  const { showToast } = useToast();
  const existingAnimal = isEditMode ? animals.find((a) => a.id === id) : null;

  const [sexe, setSexe] = useState<'male' | 'female'>(() => {
    if (existingAnimal) {
      return existingAnimal.gender === 'F' ? 'female' : 'male';
    }
    return 'male';
  });
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(existingAnimal?.image || null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  // Races addition states
  const [selectedRace, setSelectedRace] = useState<string>(
    existingAnimal?.race || 'Néo-Zélandais'
  );
  const [isAddingRace, setIsAddingRace] = useState(false);
  const [newRaceName, setNewRaceName] = useState('');

  const handleAddNewRace = () => {
    const cleaned = newRaceName.trim();
    if (cleaned) {
      addRace(cleaned);
      setSelectedRace(cleaned);
      setNewRaceName('');
      setIsAddingRace(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewRace();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setPhotoPreview(croppedImage);
        setIsCropping(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    
    // Use the uploaded photo Base64 or fallback to default
    const imageUrl = photoPreview || 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5088?auto=format&fit=crop&q=80&w=800';

    const gender = sexe === 'female' ? 'F' : 'M';
    const status = target.statut?.value || 'Disponible';
    
    // Calculate badge color based on status (matching original style definitions in mockData & DESIGN.md)
    let badgeColor = 'brand-neutral';
    if (status === 'Gestante') badgeColor = 'brand-primary';
    else if (status === 'Actif' || status === 'Allaitante' || status === 'Saillie active') badgeColor = 'brand-secondary';
    else if (status === 'En retard' || status === 'Mort' || status === 'Décédé' || status === 'Échec') badgeColor = 'brand-danger';
    else if (status === 'À surveiller' || status === 'Au repos') badgeColor = 'brand-neutral';

    const animalData = {
      name: target.nom?.value || 'Sans nom',
      status: status,
      type: `${sexe === 'female' ? 'Femelle' : 'Mâle'} • ${selectedRace || 'Race locale'}`,
      location: target.cage?.value || 'Cage par défaut',
      image: imageUrl,
      gender: gender,
      race: selectedRace,
      age: target.naissance?.value ? calculateAge(target.naissance?.value) : (existingAnimal?.age || 'Nouveau'),
      weight: target.poids?.value || existingAnimal?.weight || '',
      naissance: target.naissance?.value || '',
      origine: target.origine?.value || '',
      cage: target.cage?.value || '',
      robe: target.robe?.value || '',
      observations: target.observations?.value || '',
      badgeColor: badgeColor
    };

    if (isEditMode && id) {
      updateAnimal(id, animalData);
      showToast('Reproducteur modifié ✓', 'success');
      navigate(`/cheptel/${id}`);
    } else {
      addAnimal({
        id: target.code?.value || 'N-001',
        ...animalData
      });
      showToast('Reproducteur ajouté ✓', 'success');
      navigate('/cheptel');
    }
  };

  return (
    <div className="pb-8">
      <form id="breed-form" className="space-y-6" onSubmit={handleSubmit}>
          {/* Photo du lapin */}
          <div className="flex flex-col items-center justify-center py-4">
            <div 
              className="w-40 h-40 bg-surface border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-surface/80 transition-all overflow-hidden relative shadow-lg"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-8 h-8 text-muted" />
                  <span className="text-[10px] font-medium text-muted uppercase tracking-wider">Photo</span>
                </>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Code du lapin & Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="code">Code du lapin *</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-mono focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral disabled:opacity-50" 
                id="code" placeholder="ex: F-025" type="text"
                defaultValue={existingAnimal?.id || ''}
                disabled={isEditMode}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="nom">Nom (Optionnel)</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral" 
                id="nom" placeholder="ex: Grisette" type="text"
                defaultValue={existingAnimal?.name || ''}
              />
            </div>
          </div>

          {/* Sexe Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">Sexe</label>
            <div className="grid grid-cols-2 bg-surface border border-border rounded-xl p-1">
              <label 
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg cursor-pointer transition-all font-bold text-sm ${
                  sexe === 'male' ? 'bg-primary text-background' : 'text-muted hover:text-foreground'
                }`}
                onClick={() => setSexe('male')}
              >
                Mâle
              </label>
              <label 
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg cursor-pointer transition-all font-bold text-sm ${
                  sexe === 'female' ? 'bg-primary text-background' : 'text-muted hover:text-foreground'
                }`}
                onClick={() => setSexe('female')}
              >
                Femelle
              </label>
            </div>
          </div>

          {/* Race Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="race">Race</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <select 
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  id="race"
                  value={selectedRace}
                  onChange={(e) => setSelectedRace(e.target.value)}
                >
                  {races.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsAddingRace(true)}
                className="flex-shrink-0 bg-surface border border-border hover:border-primary/50 text-primary px-3 rounded-xl active:scale-95 transition-all flex items-center justify-center"
                title="Ajouter une nouvelle race"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Date & Origine */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="naissance">Date de naissance</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all [color-scheme:light]" 
                id="naissance" type="date"
                defaultValue={existingAnimal?.naissance || ''}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="origine">Origine</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  id="origine"
                  defaultValue={existingAnimal?.origine || "Né dans l'élevage"}
                >
                  <option>Né dans l'élevage</option>
                  <option>Acheté</option>
                  <option>Reçu</option>
                  <option>Autre</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Cage & Poids */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="cage">Emplacement / Cage</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-mono focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral" 
                id="cage" placeholder="ex: Cage B4" type="text"
                defaultValue={existingAnimal?.cage || existingAnimal?.location || ''}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="poids">Poids actuel (kg)</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral" 
                id="poids" placeholder="ex: 3.5" step="0.1" type="number"
                defaultValue={existingAnimal?.weight || ''}
              />
            </div>
          </div>

          {/* Robe & Statut */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="robe">Couleur de la robe</label>
              <input 
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral" 
                id="robe" placeholder="ex: Blanc aux yeux roses" type="text"
                defaultValue={existingAnimal?.robe || ''}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="statut">Statut</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                  id="statut"
                  defaultValue={existingAnimal?.status || 'Disponible'}
                >
                  <option>Disponible</option>
                  <option>Actif</option>
                  <option>Au repos</option>
                  {sexe === 'female' && (
                    <>
                      <option>Allaitante</option>
                      <option>Gestante</option>
                      <option>En saillie</option>
                    </>
                  )}
                  {sexe === 'male' && (
                    <>
                      <option>Saillie active</option>
                      <option>Donneur</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Observation */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="observations">Observation</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral resize-none" 
              id="observations" placeholder="Détails supplémentaires sur le reproducteur..." rows={4}
              defaultValue={existingAnimal?.observations || ''}
            ></textarea>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 pb-12 flex flex-col gap-3">
            <button 
              className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg active:scale-95 transition-all duration-150 shadow-lg shadow-primary/10" 
              type="submit"
            >
              Valider et Enregistrer
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-transparent border border-border text-muted py-3 rounded-xl font-medium active:scale-95 transition-all duration-150" 
              type="button"
            >
              Annuler et retourner
            </button>
          </div>
        </form>

      {/* Cropper Modal */}
      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="relative flex-grow">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="bg-background border-t border-border p-4 flex items-center justify-between z-10">
            <button 
              type="button"
              onClick={() => setIsCropping(false)}
              className="text-white flex items-center gap-2 font-medium"
            >
              <X className="w-5 h-5" /> Annuler
            </button>
            <button 
              type="button"
              onClick={handleCropSave}
              className="bg-primary text-background px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
            >
              <Check className="w-5 h-5" /> Valider
            </button>
          </div>
        </div>
      )}

      {/* Modal d'ajout de race */}
      {isAddingRace && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <h3 className="text-foreground font-display font-bold text-lg">Nouvelle race</h3>
              <button 
                type="button" 
                onClick={() => {
                  setIsAddingRace(false);
                  setNewRaceName('');
                }}
                className="p-1.5 text-muted hover:text-foreground rounded-lg active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="new-race-name">Nom de la race *</label>
                <input 
                  type="text"
                  id="new-race-name"
                  value={newRaceName}
                  onChange={(e) => setNewRaceName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="ex: Bélier Français..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => {
                  setIsAddingRace(false);
                  setNewRaceName('');
                }}
                className="flex-1 bg-transparent border border-border text-muted py-3 rounded-xl font-medium active:scale-95 transition-all text-sm"
              >
                Annuler
              </button>
              <button 
                type="button"
                onClick={handleAddNewRace}
                disabled={!newRaceName.trim()}
                className="flex-1 bg-primary text-background py-3 rounded-xl font-bold active:scale-95 transition-all text-sm shadow-lg shadow-primary/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
