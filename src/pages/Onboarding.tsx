import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Rabbit, CloudOff, LineChart, ChevronRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setOnboarded } = useStore();

  const slides = [
    {
      icon: <Rabbit className="w-20 h-20 text-primary" />,
      title: 'Bienvenue sur Lapin Manager',
      description: "L'application ultime pour la gestion moderne de votre élevage cunicole.",
      color: 'bg-primary/10'
    },
    {
      icon: <CloudOff className="w-20 h-20 text-secondary" />,
      title: '100% Hors-ligne',
      description: 'Conçu pour le terrain. Fonctionne parfaitement même sans réseau au fond du hangar.',
      color: 'bg-secondary/10'
    },
    {
      icon: <LineChart className="w-20 h-20 text-warning" />,
      title: 'Suivi et Finances',
      description: 'Gérez vos reproducteurs, suivez vos saillies et analysez vos revenus en un clin d\'œil.',
      color: 'bg-warning/10'
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setOnboarded(true);
      navigate('/');
    }
  };

  const handleSkip = () => {
    setOnboarded(true);
    navigate('/');
  };

  const currentSlide = slides[step];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6">
      <div className="w-full flex justify-end pt-4">
        {step < slides.length - 1 && (
          <button 
            onClick={handleSkip}
            className="text-muted text-sm font-semibold hover:text-foreground transition-colors"
          >
            Passer
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full space-y-10 text-center animate-fade-in">
        <div className={`w-40 h-40 rounded-full flex items-center justify-center ${currentSlide.color} transition-colors duration-500`}>
          {currentSlide.icon}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            {currentSlide.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            {currentSlide.description}
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm pb-10 space-y-8">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-all text-lg"
        >
          {step === slides.length - 1 ? "C'est parti !" : "Suivant"}
          {step < slides.length - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
