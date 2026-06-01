import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar,  Save } from 'lucide-react';

export const NouvelleSaillie: React.FC = () => {
  const navigate = useNavigate();
  const [typeSaillie, setTypeSaillie] = useState('Naturelle');
  const [dateSaillie, setDateSaillie] = useState(new Date().toISOString().split('T')[0]);

  const dateObj = new Date(dateSaillie);
  const controleGestation = new Date(dateObj); controleGestation.setDate(dateObj.getDate() + 14);
  const prepMiseBas = new Date(dateObj); prepMiseBas.setDate(dateObj.getDate() + 27);
  const miseBas = new Date(dateObj); miseBas.setDate(dateObj.getDate() + 31);

  const formatDate = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const formatCalendarDate = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  };
  const calDateStr = formatCalendarDate(miseBas);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mise+bas+prévue+(Gestion+Lapins)&dates=${calDateStr}T080000Z/${calDateStr}T100000Z&details=Vérifier+la+mise+bas+de+la+lapine`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    navigate('/reproduction');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* TopAppBar Component */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <button 
          onClick={() => navigate(-1)}
          className="text-muted active:scale-95 transition-transform"
        >
          Annuler
        </button>
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">Nouvelle Saillie</h1>
        <button 
          onClick={handleSave}
          className="text-primary font-bold active:scale-95 transition-transform"
        >
          Enregistrer
        </button>
      </header>

      <main className="flex-grow pt-20 px-4 space-y-6 max-w-lg mx-auto w-full">
        {/* Offline Indicator */}
        <div className="flex items-center justify-center space-x-2 py-1.5 bg-surface/50 rounded-lg border border-border text-[11px] text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>Fonctionne sans Internet • Données locales</span>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          {/* Female Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Sélection de la femelle *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg font-bold">♀</span>
              <input 
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-foreground font-mono placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
                placeholder="ex: F-012" 
                type="text" 
                required
              />
            </div>
          </div>

          {/* Male Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Sélection du/des mâle(s)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg font-bold">♂</span>
              <input 
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-foreground font-mono placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none" 
                placeholder="ex: M-004, M-002" 
                type="text" 
              />
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted">Date de saillie *</label>
              <input 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]" 
                type="date" 
                value={dateSaillie}
                onChange={(e) => setDateSaillie(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted">Heure (Facultatif)</label>
              <input 
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]" 
                type="time" 
              />
            </div>
          </div>

          {/* Type Selector (Segmented UI) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Type de saillie</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-surface border border-border rounded-xl">
              {['Naturelle', 'Contrôlée', 'Double'].map((type) => (
                <button 
                  key={type}
                  type="button"
                  onClick={() => setTypeSaillie(type)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                    typeSaillie === type ? 'bg-border text-primary' : 'text-muted hover:bg-border/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Observations</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-neutral focus:ring-1 focus:ring-primary outline-none resize-none" 
              placeholder="Notes particulières..." 
              rows={3}
            ></textarea>
          </div>

          {/* Planned Dates Section (Bento Info Box) */}
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
                <a 
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/30 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#1a73e8]/20 transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Ajouter à Google Agenda
                </a>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-primary text-background font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Save className="w-5 h-5 fill-current" /> Enregistrer la saillie
            </button>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border border-border text-muted font-semibold py-4 rounded-xl active:scale-[0.98] transition-all hover:bg-surface"
            >
              Annuler
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
