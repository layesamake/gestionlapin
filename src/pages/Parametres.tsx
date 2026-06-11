import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudOff, CloudUpload, CloudDownload, Syringe, FileText, RotateCcw, Save, AlertTriangle, HelpCircle, ChevronRight, Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generatePDFRegister } from '../utils/pdfGenerator';
import { ConfirmDialog } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';

// Interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const Parametres: React.FC = () => {
  const navigate = useNavigate();
  const { exportData, importData, theme, setTheme, resetData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const fileName = `gestion-lapins-backup-${new Date().toISOString().split('T')[0]}.json`;

    if (navigator.share) {
      const file = new File([blob], fileName, { type: 'application/json' });
      navigator.share({
        title: 'Sauvegarde Gestion Lapins',
        files: [file]
      }).catch((err) => {
        console.error("Erreur de partage:", err);
        fallbackDownload(blob, fileName);
      });
    } else {
      fallbackDownload(blob, fileName);
    }
  };

  const fallbackDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const success = importData(event.target.result);
          if (success) {
            showToast('Données restaurées avec succès !', 'success');
          } else {
            showToast('Erreur lors de la restauration du fichier.', 'error');
          }
        }
      };
      reader.readAsText(file);
    }
  };


  return (
    <div className="pb-8">
      <div className="space-y-6">
        {/* Offline Status & PWA Install Banner */}
        <div className="bg-surface border border-primary/30 rounded-xl p-4">
          <div className="flex items-start gap-4 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <CloudOff className="w-6 h-6 text-primary fill-current" />
            </div>
            <div>
              <h3 className="text-primary font-bold text-sm">Application Native & Hors-ligne</h3>
              <p className="text-muted text-xs leading-relaxed mt-1">
                Vos informations sont stockées directement sur ce téléphone. Le mode hors connexion est géré automatiquement pour une utilisation en élevage sans interruption.
              </p>
            </div>
          </div>
          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="w-full bg-primary/10 text-primary py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-2"
            >
              <CloudDownload className="w-4 h-4" /> Installer l'application sur l'écran d'accueil
            </button>
          )}
        </div>

        {/* Apparence */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Apparence</h2>
          <div className="bg-surface border border-border p-2 rounded-xl grid grid-cols-4 gap-2">
            <button 
              onClick={() => setTheme('clair')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                theme === 'clair' ? 'bg-primary text-background shadow-md' : 'text-muted hover:bg-border/50'
              }`}
            >
              Clair
            </button>
            <button 
              onClick={() => setTheme('sombre')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                theme === 'sombre' ? 'bg-primary text-background shadow-md' : 'text-muted hover:bg-border/50'
              }`}
            >
              Sombre
            </button>
            <button 
              onClick={() => setTheme('nature')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                theme === 'nature' ? 'bg-primary text-background shadow-md' : 'text-muted hover:bg-border/50'
              }`}
            >
              Nature
            </button>
            <button 
              onClick={() => setTheme('ferme')}
              className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                theme === 'ferme' ? 'bg-primary text-background shadow-md' : 'text-muted hover:bg-border/50'
              }`}
            >
              Ferme
            </button>
          </div>
        </section>

        {/* Support & Aide */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Support & Aide</h2>
          <button 
            onClick={() => navigate('/aide')}
            className="w-full bg-surface border border-border p-4 rounded-xl flex items-center justify-between active:scale-[0.98] transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm text-foreground">Centre d'Aide & FAQ</h3>
                <p className="text-xs text-muted mt-0.5">Guide d'utilisation et parcours de l'éleveur</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" />
          </button>
          
          <button 
            onClick={() => navigate('/a-propos')}
            className="w-full bg-surface border border-border p-4 rounded-xl flex items-center justify-between active:scale-[0.98] transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm text-foreground">À Propos</h3>
                <p className="text-xs text-muted mt-0.5">Informations sur l'application et le concepteur</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" />
          </button>
        </section>

        {/* Sauvegarde Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Sauvegarde</h2>
            <span className="font-mono text-[10px] text-muted">Dernière : 28/05/2026</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleExport}
              className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl active:scale-[0.98] transition-all hover:bg-border/50"
            >
              <CloudUpload className="w-6 h-6 text-warning mb-2" />
              <span className="text-xs font-medium">Sauvegarder JSON</span>
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl active:scale-[0.98] transition-all hover:bg-border/50"
            >
              <CloudDownload className="w-6 h-6 text-warning mb-2" />
              <span className="text-xs font-medium">Restaurer</span>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept=".json" 
                onChange={handleImport} 
              />
            </button>
            <button 
              onClick={generatePDFRegister}
              className="col-span-2 flex items-center justify-center gap-2 p-4 bg-primary/10 border border-primary/30 rounded-xl active:scale-[0.98] transition-all hover:bg-primary/20 text-primary"
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm font-bold">Générer Registre PDF</span>
            </button>
          </div>
        </section>

        {/* Reproduction Parameters */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Paramètres Reproduction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border p-4 rounded-xl">
              <label className="block text-[11px] font-medium text-muted mb-1">Contrôle de gestation</label>
              <div className="flex items-center justify-between">
                <input className="bg-transparent border-none p-0 text-2xl font-bold font-display text-secondary focus:ring-0 w-20 outline-none" type="number" defaultValue="14" min="1" />
                <span className="text-muted font-mono text-sm">jours</span>
              </div>
            </div>
            
            <div className="bg-surface border border-border p-4 rounded-xl">
              <label className="block text-[11px] font-medium text-muted mb-1">Préparation mise bas</label>
              <div className="flex items-center justify-between">
                <input className="bg-transparent border-none p-0 text-2xl font-bold font-display text-secondary focus:ring-0 w-20 outline-none" type="number" defaultValue="27" min="1" />
                <span className="text-muted font-mono text-sm">jours</span>
              </div>
            </div>

            <div className="bg-surface border border-border p-4 rounded-xl">
              <label className="block text-[11px] font-medium text-muted mb-1">Durée gestation</label>
              <div className="flex items-center justify-between">
                <input className="bg-transparent border-none p-0 text-2xl font-bold font-display text-secondary focus:ring-0 w-20 outline-none" type="number" defaultValue="31" min="1" />
                <span className="text-muted font-mono text-sm">jours</span>
              </div>
            </div>

            <div className="bg-surface border border-border p-4 rounded-xl">
              <label className="block text-[11px] font-medium text-muted mb-1">Âge sevrage</label>
              <div className="flex items-center justify-between">
                <input className="bg-transparent border-none p-0 text-2xl font-bold font-display text-secondary focus:ring-0 w-20 outline-none" type="number" defaultValue="35" min="1" />
                <span className="text-muted font-mono text-sm">jours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Paramètres Sanitaires */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Paramètres Sanitaires</h2>
          <div className="bg-surface border border-border rounded-xl overflow-hidden divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Syringe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Rappel auto traitements</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Rappel auto sauvegarde</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Zone Dangereuse */}
        <section className="space-y-3 pt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-danger">Zone Dangereuse</h2>
          <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 flex flex-col items-center gap-3 text-center">
            <AlertTriangle className="w-8 h-8 text-danger" />
            <p className="text-xs text-muted">
              Supprimer toutes les données (animaux, saillies, transactions). Cette action est irréversible.
            </p>
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="mt-2 px-4 py-3 bg-danger text-white rounded-xl text-sm font-bold active:scale-95 transition-transform"
            >
              Réinitialiser les données
            </button>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="pt-6 space-y-3">
          <button className="w-full bg-primary text-background py-4 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Save className="w-5 h-5 fill-current" /> Enregistrer les paramètres
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-transparent text-muted py-3 rounded-xl font-semibold text-sm active:bg-surface transition-all hover:text-foreground"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          resetData();
          showToast('Toutes les données ont été réinitialisées.', 'warning');
          navigate('/');
        }}
        title="Réinitialiser les données"
        message="Êtes-vous sûr de vouloir supprimer TOUTES vos données ? Cette action est définitive et irréversible."
        confirmText="Supprimer tout"
        cancelText="Annuler"
        variant="danger"
      />
    </div>
  );
};
