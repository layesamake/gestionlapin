import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WizardStep {
  title: string;
  content: React.ReactNode;
  isValid?: boolean; // If false, the 'Next' button is disabled
}

interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel: () => void;
  completeText?: string;
}

export const Wizard: React.FC<WizardProps> = ({ 
  steps, 
  onComplete, 
  onCancel,
  completeText = "Terminer"
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const nextStep = () => {
    if (!isLastStep && (steps[currentStep].isValid !== false)) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else if (isLastStep && (steps[currentStep].isValid !== false)) {
      onComplete();
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col h-full min-h-[60vh]">
      {/* Progress Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
          <span>{steps[currentStep].title}</span>
          <span>Étape {currentStep + 1} sur {steps.length}</span>
        </div>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: `${progressPercentage}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden px-4 py-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 bg-background border-t border-border flex gap-3 mt-auto sticky bottom-0 z-20">
        <button
          onClick={prevStep}
          className="px-4 py-3.5 bg-surface text-foreground font-semibold rounded-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          {isFirstStep ? 'Annuler' : <ChevronLeft className="w-5 h-5" />}
        </button>
        <button
          onClick={nextStep}
          disabled={steps[currentStep].isValid === false}
          className="flex-1 py-3.5 bg-primary text-background font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
        >
          {isLastStep ? (
            <>
              {completeText}
              <Check className="w-5 h-5" />
            </>
          ) : (
            <>
              Suivant
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
