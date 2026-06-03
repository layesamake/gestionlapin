import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, Calendar, CalendarRange, CheckCircle, AlertTriangle, Edit } from 'lucide-react';

// Helper to format Date string to YYYY-MM-DD
const getPlannedDateFromSoin = (soin: any) => {
  if (soin.plannedDate) return soin.plannedDate;
  const match = soin.date?.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    const [, d, m, y] = match;
    return `${y}-${m}-${d}`;
  }
  return new Date().toISOString().split('T')[0];
};

// Helper to format YYYY-MM-DD to DD/MM/YYYY
const formatToFrenchDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
  }
  return dateStr;
};

export const Sante: React.FC = () => {
  const soins = useStore(s => s.soins);
  const updateSoin = useStore(s => s.updateSoin);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();

  const aFaireCount = soins.filter(s => s.status === 'À faire').length;
  const enRetardCount = soins.filter(s => s.status === 'En retard').length;
  const enCoursCount = soins.filter(s => s.status === 'En cours').length;
  const faitsCount = soins.filter(s => s.status === 'Fait').length;

  const filters = ['Tous', 'À faire', 'En cours', 'Faits', 'En retard', 'Prophylaxie'];

  const filteredSoins = soins.filter(soin => {
    if (activeFilter === 'Tous') return true;
    if (activeFilter === 'Faits') return soin.status === 'Fait';
    if (activeFilter === 'Prophylaxie') return soin.category === 'Prophylaxie';
    return soin.status === activeFilter;
  });

  const getIcon = (status: string) => {
    switch (status) {
      case 'À faire': return <Calendar className="w-4 h-4" />;
      case 'En cours': return <CalendarRange className="w-4 h-4" />;
      case 'Fait': return <CheckCircle className="w-4 h-4" />;
      case 'En retard': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleCompleteSoin = (id: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const frenchDate = formatToFrenchDate(todayStr);
    updateSoin(id, {
      status: 'Fait',
      statusColor: 'primary',
      date: `Fait le ${frenchDate} • Terminé`,
      isToday: false,
      isLate: false,
    });
  };

  const handlePostponeSoin = (id: number) => {
    const soin = soins.find(s => s.id === id);
    if (!soin) return;
    
    const currentPlanned = getPlannedDateFromSoin(soin);
    const newDate = prompt("Saisir la nouvelle date du traitement (AAAA-MM-JJ) :", currentPlanned);
    
    if (!newDate) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      alert("Format de date invalide. Veuillez utiliser le format AAAA-MM-JJ.");
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = newDate === todayStr;
    const isLate = newDate < todayStr;

    let dateLabel = '';
    if (isToday) {
      dateLabel = `Prévu le ${formatToFrenchDate(newDate)} (Aujourd'hui)`;
    } else if (isLate) {
      const diffTime = Math.abs(new Date(todayStr).getTime() - new Date(newDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      dateLabel = `Prévu le ${formatToFrenchDate(newDate)} (Il y a ${diffDays} jours)`;
    } else {
      dateLabel = `Prévu le ${formatToFrenchDate(newDate)}`;
    }

    updateSoin(id, {
      plannedDate: newDate,
      status: isLate ? 'En retard' : 'À faire',
      statusColor: isLate ? 'danger' : 'warning',
      date: dateLabel,
      isToday,
      isLate,
    });
  };

  const handleRecordDose = (id: number) => {
    const soin = soins.find(s => s.id === id);
    if (!soin) return;
    const dose = prompt("Saisir la dose ou note d'administration (ex: 2ème dose administrée) :", "Dose administrée");
    if (!dose) return;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const frenchDate = formatToFrenchDate(todayStr);
    const currentObs = soin.observations ? `${soin.observations}\n` : '';
    
    const complete = window.confirm("Est-ce la dernière dose ? (Marquer comme terminé)");
    
    if (complete) {
      updateSoin(id, {
        status: 'Fait',
        statusColor: 'primary',
        date: `Fait le ${frenchDate} • Terminé`,
        observations: `${currentObs}[${frenchDate}] ${dose} (Dernière dose)`,
        isToday: false,
        isLate: false
      });
    } else {
      updateSoin(id, {
        observations: `${currentObs}[${frenchDate}] ${dose}`,
      });
      alert("Dose enregistrée dans les observations.");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">À faire</span>
            <span className="bg-warning/10 text-warning text-[10px] font-bold px-2 py-0.5 rounded-full">Auj.</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{aFaireCount}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Action urgente</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">En retard</span>
            <span className="bg-danger/10 text-danger text-[10px] font-bold px-2 py-0.5 rounded-full">Retard</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{enRetardCount}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">À régulariser</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">En cours</span>
            <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">Suivi</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{enCoursCount}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Traitements</p>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <span className="text-muted text-xs font-medium">Faits</span>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">Mois</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{faitsCount}</p>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-tighter">Interventions</p>
        </div>
      </section>

      <section className="space-y-3 mb-6">
        <button 
          onClick={() => navigate('/sante/traitement/nouveau')}
          className="w-full bg-primary text-background font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <PlusCircle className="w-5 h-5 fill-current" /> Nouveau traitement prévu
        </button>
        <button 
          onClick={() => navigate('/sante/soin/nouveau')}
          className="w-full bg-transparent border border-border text-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <History className="w-5 h-5 text-muted" /> Enregistrer un traitement fait
        </button>
      </section>

      <section className="no-scrollbar overflow-x-auto flex gap-2 -mx-4 px-4 pb-2 mb-4 hide-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-primary text-background font-bold shadow-lg shadow-primary/10'
                : 'bg-surface border border-border text-muted'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="space-y-4">
        {filteredSoins.map(soin => (
          <div key={soin.id} className={`bg-surface rounded-xl border p-4 shadow-sm transition-opacity ${
            soin.isLate ? 'border-danger/30 border-l-4 border-l-danger' : 'border-border'
          } ${soin.status === 'Fait' ? 'opacity-80' : ''}`}>
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`font-mono text-sm px-2 py-0.5 rounded border ${
                  soin.statusColor === 'warning' || soin.statusColor === 'danger' ? 'text-secondary bg-secondary/5 border-secondary/20' 
                  : `text-${soin.statusColor} bg-${soin.statusColor}/5 border-${soin.statusColor}/20`
                }`}>
                  {soin.animalId}
                </span>
                <h3 className="mt-2 font-bold text-foreground text-lg leading-tight">{soin.type}</h3>
                <p className="text-xs text-muted font-medium">{soin.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate(`/sante/traitement/modifier/${soin.id}`)}
                  className="p-1.5 bg-background border border-border rounded-lg text-muted hover:text-primary active:scale-95 transition-all"
                  title="Modifier le traitement"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <span className={`bg-${soin.statusColor}/10 text-${soin.statusColor} text-[10px] font-bold px-2 py-1 rounded uppercase`}>
                  {soin.status}
                </span>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 text-sm mb-4 ${soin.isLate ? 'text-danger' : 'text-muted'}`}>
              {getIcon(soin.status)}
              <span className={soin.isLate ? 'font-bold' : ''}>
                {soin.date.replace('(Aujourd\'hui)', '')} 
                {soin.isToday && <span className="text-warning ml-1">(Aujourd'hui)</span>}
              </span>
            </div>

            {soin.status === 'À faire' && (
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleCompleteSoin(soin.id)}
                  className="bg-primary/10 text-primary font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-primary/20"
                >
                  Marquer comme fait
                </button>
                <button 
                  onClick={() => handlePostponeSoin(soin.id)}
                  className="bg-border text-muted font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-surface"
                >
                  Reporter
                </button>
              </div>
            )}

            {soin.status === 'En cours' && (
              <button 
                onClick={() => handleRecordDose(soin.id)}
                className="w-full bg-secondary/10 text-secondary font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-secondary/20"
              >
                Enregistrer dose
              </button>
            )}

            {soin.status === 'Fait' && (
              <button 
                onClick={() => navigate(`/sante/traitement/${soin.id}`)}
                className="w-full bg-border text-foreground font-bold py-2.5 rounded text-xs active:scale-95 transition-all hover:bg-surface"
              >
                Voir détails
              </button>
            )}

            {soin.status === 'En retard' && (
              <button 
                onClick={() => handleCompleteSoin(soin.id)}
                className="w-full bg-danger text-white font-bold py-3 rounded text-sm active:scale-95 transition-all shadow-lg shadow-danger/20 hover:bg-danger/90"
              >
                Marquer comme fait
              </button>
            )}
          </div>
        ))}
      </section>
    </>
  );
};
