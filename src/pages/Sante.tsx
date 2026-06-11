import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, Calendar, CalendarRange, CheckCircle, AlertTriangle, Edit, Syringe } from 'lucide-react';
import { Modal, ConfirmDialog } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { FAB } from '../components/ui/FAB';

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
  const { showToast } = useToast();

  // Modal states
  const [confirmComplete, setConfirmComplete] = useState<{ isOpen: boolean; soinId: number | null }>({ isOpen: false, soinId: null });
  const [postponeModal, setPostponeModal] = useState<{ isOpen: boolean; soinId: number | null; date: string }>({ isOpen: false, soinId: null, date: '' });
  const [doseModal, setDoseModal] = useState<{ isOpen: boolean; soinId: number | null; dose: string }>({ isOpen: false, soinId: null, dose: 'Dose administrée' });
  const [confirmLastDose, setConfirmLastDose] = useState<{ isOpen: boolean; soinId: number | null; dose: string }>({ isOpen: false, soinId: null, dose: '' });

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
    showToast('Traitement marqué comme fait ✓', 'success');
  };

  const handlePostponeSoin = (id: number) => {
    const soin = soins.find(s => s.id === id);
    if (!soin) return;
    const currentPlanned = getPlannedDateFromSoin(soin);
    setPostponeModal({ isOpen: true, soinId: id, date: currentPlanned });
  };

  const confirmPostpone = () => {
    if (!postponeModal.soinId || !postponeModal.date) return;
    const newDate = postponeModal.date;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      showToast('Format de date invalide', 'error');
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

    updateSoin(postponeModal.soinId, {
      plannedDate: newDate,
      status: isLate ? 'En retard' : 'À faire',
      statusColor: isLate ? 'danger' : 'warning',
      date: dateLabel,
      isToday,
      isLate,
    });
    setPostponeModal({ isOpen: false, soinId: null, date: '' });
    showToast('Traitement reporté', 'info');
  };

  const handleRecordDose = (id: number) => {
    setDoseModal({ isOpen: true, soinId: id, dose: 'Dose administrée' });
  };

  const confirmDose = () => {
    if (!doseModal.soinId) return;
    setConfirmLastDose({ isOpen: true, soinId: doseModal.soinId, dose: doseModal.dose });
    setDoseModal({ isOpen: false, soinId: null, dose: '' });
  };

  const finalizeRecordDose = (isLast: boolean) => {
    if (!confirmLastDose.soinId) return;
    const soin = soins.find(s => s.id === confirmLastDose.soinId);
    if (!soin) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const frenchDate = formatToFrenchDate(todayStr);
    const currentObs = soin.observations ? `${soin.observations}\n` : '';

    if (isLast) {
      updateSoin(confirmLastDose.soinId, {
        status: 'Fait',
        statusColor: 'primary',
        date: `Fait le ${frenchDate} • Terminé`,
        observations: `${currentObs}[${frenchDate}] ${confirmLastDose.dose} (Dernière dose)`,
        isToday: false,
        isLate: false
      });
      showToast('Traitement terminé ✓', 'success');
    } else {
      updateSoin(confirmLastDose.soinId, {
        observations: `${currentObs}[${frenchDate}] ${confirmLastDose.dose}`,
      });
      showToast('Dose enregistrée', 'info');
    }
    setConfirmLastDose({ isOpen: false, soinId: null, dose: '' });
  };

  const fabActions = [
    {
      icon: <Syringe className="w-5 h-5" />,
      label: 'Nouveau traitement',
      onClick: () => navigate('/sante/traitement/nouveau'),
      variant: 'primary' as const,
    },
    {
      icon: <History className="w-5 h-5" />,
      label: 'Traitement fait',
      onClick: () => navigate('/sante/soin/nouveau'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-4 gap-2 mb-5">
        {[
          { label: 'À faire', count: aFaireCount, color: 'warning' },
          { label: 'Retard', count: enRetardCount, color: 'danger' },
          { label: 'En cours', count: enCoursCount, color: 'secondary' },
          { label: 'Faits', count: faitsCount, color: 'primary' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface p-3 rounded-xl border border-border text-center">
            <p className="text-2xl font-bold text-foreground">{stat.count}</p>
            <p className="text-[11px] text-muted font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="overflow-x-auto flex gap-2 -mx-4 px-4 pb-3 mb-4 hide-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
              activeFilter === filter
                ? 'bg-primary text-background font-bold'
                : 'bg-surface border border-border text-muted'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Soins list */}
      <section className="space-y-3">
        {filteredSoins.map(soin => (
          <div key={soin.id} className={`bg-surface rounded-xl border p-4 transition-opacity ${
            soin.isLate ? 'border-danger/30 border-l-4 border-l-danger bg-danger/5' : 'border-border'
          } ${soin.status === 'Fait' ? 'opacity-70' : ''}`}>
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`font-mono text-sm px-2 py-0.5 rounded border ${
                  soin.statusColor === 'warning' || soin.statusColor === 'danger' ? 'text-secondary bg-secondary/5 border-secondary/20' 
                  : `text-${soin.statusColor} bg-${soin.statusColor}/5 border-${soin.statusColor}/20`
                }`}>
                  {soin.animalId}
                </span>
                <h3 className="mt-2 font-bold text-foreground text-base leading-tight">{soin.type}</h3>
                <p className="text-xs text-muted font-medium">{soin.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate(`/sante/traitement/modifier/${soin.id}`)}
                  className="p-2 bg-background border border-border rounded-lg text-muted hover:text-primary active:scale-95 transition-all"
                  title="Modifier le traitement"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <span className={`bg-${soin.statusColor}/10 text-${soin.statusColor} text-[11px] font-bold px-2 py-1 rounded uppercase`}>
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
                  onClick={() => setConfirmComplete({ isOpen: true, soinId: soin.id })}
                  className="bg-primary/10 text-primary font-bold py-3 rounded-xl text-sm active:scale-95 transition-all hover:bg-primary/20"
                >
                  Marquer fait
                </button>
                <button 
                  onClick={() => handlePostponeSoin(soin.id)}
                  className="bg-background border border-border text-muted font-bold py-3 rounded-xl text-sm active:scale-95 transition-all hover:bg-surface"
                >
                  Reporter
                </button>
              </div>
            )}

            {soin.status === 'En cours' && (
              <button 
                onClick={() => handleRecordDose(soin.id)}
                className="w-full bg-secondary/10 text-secondary font-bold py-3 rounded-xl text-sm active:scale-95 transition-all hover:bg-secondary/20"
              >
                Enregistrer dose
              </button>
            )}

            {soin.status === 'Fait' && (
              <button 
                onClick={() => navigate(`/sante/traitement/${soin.id}`)}
                className="w-full bg-background border border-border text-foreground font-semibold py-3 rounded-xl text-sm active:scale-95 transition-all hover:bg-surface"
              >
                Voir détails
              </button>
            )}

            {soin.status === 'En retard' && (
              <button 
                onClick={() => setConfirmComplete({ isOpen: true, soinId: soin.id })}
                className="w-full bg-danger text-white font-bold py-3 rounded-xl text-sm active:scale-95 transition-all shadow-lg shadow-danger/20"
              >
                Marquer comme fait
              </button>
            )}
          </div>
        ))}
      </section>

      {/* FAB */}
      <FAB actions={fabActions} />

      {/* ── Modals ── */}

      {/* Confirm complete */}
      <ConfirmDialog
        isOpen={confirmComplete.isOpen}
        onClose={() => setConfirmComplete({ isOpen: false, soinId: null })}
        onConfirm={() => confirmComplete.soinId && handleCompleteSoin(confirmComplete.soinId)}
        title="Confirmer le traitement"
        message="Marquer ce traitement comme effectué ?"
        confirmText="Oui, c'est fait"
        variant="primary"
      />

      {/* Postpone modal */}
      <Modal isOpen={postponeModal.isOpen} onClose={() => setPostponeModal({ isOpen: false, soinId: null, date: '' })} title="Reporter le traitement">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nouvelle date</label>
            <input
              type="date"
              value={postponeModal.date}
              onChange={(e) => setPostponeModal(prev => ({ ...prev, date: e.target.value }))}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPostponeModal({ isOpen: false, soinId: null, date: '' })}
              className="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold text-sm active:scale-95 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={confirmPostpone}
              className="flex-1 py-3 rounded-xl bg-primary text-background font-bold text-sm active:scale-95 transition-all"
            >
              Reporter
            </button>
          </div>
        </div>
      </Modal>

      {/* Dose modal */}
      <Modal isOpen={doseModal.isOpen} onClose={() => setDoseModal({ isOpen: false, soinId: null, dose: '' })} title="Enregistrer une dose">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Note d'administration</label>
            <input
              type="text"
              value={doseModal.dose}
              onChange={(e) => setDoseModal(prev => ({ ...prev, dose: e.target.value }))}
              placeholder="Ex: 2ème dose administrée"
              className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground text-base placeholder:text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <button
            onClick={confirmDose}
            className="w-full py-3 rounded-xl bg-secondary text-background font-bold text-sm active:scale-95 transition-all"
          >
            Enregistrer
          </button>
        </div>
      </Modal>

      {/* Confirm last dose */}
      <ConfirmDialog
        isOpen={confirmLastDose.isOpen}
        onClose={() => {
          finalizeRecordDose(false);
        }}
        onConfirm={() => {
          finalizeRecordDose(true);
        }}
        title="Dernière dose ?"
        message="Est-ce la dernière dose ? Le traitement sera marqué comme terminé."
        confirmText="Oui, terminer"
        cancelText="Non, continuer"
        variant="primary"
      />
    </>
  );
};
