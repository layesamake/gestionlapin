import React from 'react';
import { ChevronLeft, Info, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FaqItem: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => {
  return (
    <details className="group bg-surface border border-border rounded-xl mb-3 overflow-hidden">
      <summary className="flex items-center justify-between p-4 font-bold text-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-4 h-4 text-primary shrink-0" />
          <span>{question}</span>
        </div>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <div className="p-4 pt-0 text-sm text-muted leading-relaxed">
        {children}
      </div>
    </details>
  );
};

export const Aide: React.FC = () => {
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
          <h1 className="text-2xl font-extrabold font-display">Centre d'Aide</h1>
          <p className="text-sm text-muted">Parcours utilisateur & FAQ</p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-primary/90 font-medium leading-relaxed">
          Bienvenue dans le guide d'utilisation de Lapin Manager. Suivez les étapes ci-dessous pour une prise en main rapide et optimale de votre élevage.
        </p>
      </div>

      {/* 0. Paramètres */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 pl-2 border-l-2 border-border">Configuration Initiale</h2>
        <FaqItem question="0 - Régler les Paramètres de Reproduction">
          Avant de commencer, allez dans <strong>Paramètres</strong> pour configurer :
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Le délai pour le contrôle de gestation (ex: 14 jours)</li>
            <li>Le délai pour la préparation à la mise bas (ex: 27 jours)</li>
            <li>La durée moyenne de gestation (ex: 31 jours)</li>
            <li>L'âge de sevrage (ex: 35 jours)</li>
          </ul>
        </FaqItem>
      </section>

      {/* 1. Cheptel & Repro */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 pl-2 border-l-2 border-secondary">Gestion du Cheptel & Reproduction</h2>
        <FaqItem question="1 - Créer les différentes races">
          Allez dans l'onglet <strong>Cheptel</strong>, cliquez sur le bouton flottant <strong>(+)</strong> puis sur <strong>Nouvelle race</strong>. Cela vous permettra de classer vos reproducteurs.
        </FaqItem>
        <FaqItem question="2 - Programmer les reproductions">
          Dans l'onglet <strong>Reproduction</strong>, utilisez le bouton <strong>(+)</strong> pour créer une <strong>Nouvelle saillie</strong>. 
          Sélectionnez le mâle et la femelle concernés. L'application calculera automatiquement les dates de contrôle et de mise bas selon vos paramètres.
        </FaqItem>
        <FaqItem question="3 - Enregistrer les mises bas">
          Toujours dans <strong>Reproduction</strong>, allez sur une saillie dont la gestation a été confirmée, et cliquez sur <strong>Enregistrer mise bas</strong>.
          Vous pourrez y renseigner le nombre de lapereaux nés vivants et morts-nés.
        </FaqItem>
      </section>

      {/* 2. Santé */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 pl-2 border-l-2 border-danger">Gestion Sanitaire</h2>
        <FaqItem question="4 - Programmer un traitement">
          Allez dans l'onglet <strong>Santé</strong>, cliquez sur <strong>(+)</strong> puis sur <strong>Programmer traitement</strong>.
          Remplissez les détails du vaccin ou du médicament et définissez la date de rappel prévue.
        </FaqItem>
        <FaqItem question="5 - Enregistrer un traitement déjà fait">
          Dans l'onglet <strong>Santé</strong>, cliquez sur <strong>(+)</strong> puis sur <strong>Enregistrer un soin</strong> pour historiser une intervention ponctuelle sans programmer de rappel futur.
        </FaqItem>
      </section>

      {/* 3. Finance */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 pl-2 border-l-2 border-warning">Gestion Financière</h2>
        <FaqItem question="6 - Ajouter une recette (Revenu)">
          Dans l'onglet <strong>Finance</strong>, cliquez sur <strong>(+)</strong> et choisissez <strong>Nouveau revenu</strong>. 
          Idéal pour enregistrer la vente de lapins de chair, de reproducteurs ou de fumier.
        </FaqItem>
        <FaqItem question="7 - Ajouter une dépense">
          Toujours dans <strong>Finance</strong>, cliquez sur <strong>(+)</strong> et choisissez <strong>Nouvelle dépense</strong>. 
          Indiquez le montant de vos achats d'aliments, de pharmacie ou de matériel.
        </FaqItem>
      </section>

    </div>
  );
};
