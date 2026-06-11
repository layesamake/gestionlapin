import React from 'react';
import { ChevronLeft, Info, User, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Apropos: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-surface active:scale-95 transition-all text-muted"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold font-display">À Propos</h1>
          <p className="text-sm text-muted">Informations sur l'application</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 mb-4">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 rotate-3">
          <Info className="w-10 h-10 text-primary -rotate-3" />
        </div>
        <h2 className="text-xl font-bold font-display text-foreground">Lapin Manager</h2>
        <p className="text-sm text-muted mt-1">Version V.6.2026</p>
        <div className="mt-3 px-3 py-1 bg-surface border border-border rounded-full text-xs font-medium flex items-center gap-1.5">
          Fait avec <Heart className="w-3.5 h-3.5 text-danger fill-current" /> au Sénégal
        </div>
      </div>

      <section className="space-y-3 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3 pl-2 border-l-2 border-secondary">L'Application</h3>
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-muted leading-relaxed">
            <strong>Lapin Manager</strong> est une application spécialement conçue pour simplifier la gestion quotidienne de votre élevage cunicole. 
            <br/><br/>
            Elle vous permet de suivre vos reproducteurs, planifier les saillies, gérer les traitements sanitaires et garder un œil sur la rentabilité de votre ferme. Pensée pour les éleveurs, l'application fonctionne parfaitement sans connexion internet.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3 pl-2 border-l-2 border-primary">Concepteur de l'application</h3>
        
        <div className="bg-surface border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-0.5">Nom</p>
              <p className="text-sm font-bold text-foreground">Abdoulaye E SAMAKE</p>
            </div>
          </div>

          <div className="w-full h-px bg-border/50"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-0.5">Email</p>
              <a href="mailto:etiennesamake@gmail.com" className="text-sm font-bold text-foreground hover:text-secondary transition-colors">
                etiennesamake@gmail.com
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-border/50"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center text-warning shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-0.5">Téléphone</p>
              <a href="tel:+221776481782" className="text-sm font-bold text-foreground hover:text-warning transition-colors font-mono">
                +221 77 648 17 82
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-border/50"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-0.5">Adresse</p>
              <p className="text-sm font-bold text-foreground">Quartier MBambara Thiès, Sénégal</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 text-center">
        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} Lapin Manager. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};
