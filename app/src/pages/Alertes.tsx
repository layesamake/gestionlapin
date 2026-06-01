import React, { useState } from 'react';
import { alertesData } from '../data/mockData';
import { CalendarX, Calendar, Activity, Database, Leaf, Shield, HeartPulse } from 'lucide-react';

export const Alertes: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Aujourd'hui");

  const filters = ["Aujourd'hui", "En retard", "Cette semaine", "Toutes"];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'event_busy': return <CalendarX className="w-5 h-5" />;
      case 'today': return <Calendar className="w-5 h-5" />;
      case 'medical_services': return <HeartPulse className="w-5 h-5" />;
      case 'backup': return <Database className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <>
      <section className="mb-4 overflow-x-auto hide-scrollbar flex gap-2 -mx-4 px-4 pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-none px-4 py-2 rounded-full font-medium text-sm transition-all ${
              activeFilter === filter 
                ? 'bg-primary text-background' 
                : 'bg-surface text-muted hover:bg-border'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="mb-6 flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface/50 text-xs font-semibold text-muted hover:text-foreground transition-colors whitespace-nowrap">
          <Leaf className="w-4 h-4" /> Reproduction
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface/50 text-xs font-semibold text-muted hover:text-foreground transition-colors whitespace-nowrap">
          <Shield className="w-4 h-4" /> Santé
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface/50 text-xs font-semibold text-muted hover:text-foreground transition-colors whitespace-nowrap">
          <Database className="w-4 h-4" /> Sauvegarde
        </button>
      </section>

      <div className="space-y-4">
        {alertesData.map((alerte) => (
          <article 
            key={alerte.id}
            className={`bg-surface border-l-4 rounded-xl p-4 shadow-xl transition-all hover:translate-y-[-2px] active:scale-[0.98] border-l-${alerte.typeColor}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-${alerte.typeColor}/10 text-${alerte.typeColor}`}>
                {alerte.type}
              </span>
              {alerte.subject && (
                <span className="font-mono text-[11px] text-muted">
                  {alerte.title.includes('Cage') || !alerte.subtitle ? alerte.subject : alerte.subject}
                </span>
              )}
            </div>

            <h3 className="text-foreground font-bold leading-snug mb-1">
              {alerte.title} {alerte.subtitle && <span className="text-muted font-normal">{alerte.subtitle}</span>}
            </h3>

            {alerte.description && (
              <p className="text-muted text-sm mb-4 leading-relaxed">
                {alerte.description}
              </p>
            )}

            {alerte.time && (
              <p className={`text-sm font-medium mb-4 flex items-center gap-1 text-${alerte.typeColor}`}>
                {getIcon(alerte.icon)} {alerte.time}
              </p>
            )}

            <div className={`gap-2 ${alerte.secondaryAction ? 'grid grid-cols-2' : ''}`}>
              <button className={`w-full text-sm font-bold py-2.5 rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                alerte.primaryColor === 'surface' 
                  ? 'bg-border text-foreground border border-gray-700' 
                  : `bg-${alerte.primaryColor || 'primary'} text-background`
              }`}>
                {alerte.icon === 'backup' && <Database className="w-5 h-5" />}
                {alerte.primaryAction}
              </button>
              
              {alerte.secondaryAction && (
                <button className="border border-border text-muted text-sm font-bold py-2.5 rounded-lg transition-transform active:scale-95 hover:bg-surface">
                  {alerte.secondaryAction}
                </button>
              )}
            </div>
          </article>
        ))}

        <div className="h-10"></div>
      </div>
    </>
  );
};
