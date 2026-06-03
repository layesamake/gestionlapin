export const dashboardData = {
  indicators: {
    totalLapins: 48,
    malesActifs: 6,
    femellesRepr: 12,
    femellesGestantes: { count: 4, status: 'STABLE' },
    porteesEnCours: { count: 5, status: 'ACTIF' },
    lapereaux: { count: 32, note: 'Non sevrés' },
    alertes: { count: 2, status: 'URGENT' }
  },
  alerts: [
    {
      id: 1,
      type: 'warning',
      badge: 'À surveiller',
      time: "Aujourd'hui",
      title: 'Contrôler la gestation',
      subject: 'F-012',
      location: 'Cage A3',
      action: 'Confirmer',
      color: 'copper-orange'
    },
    {
      id: 2,
      type: 'danger',
      badge: 'Retard critique',
      time: '+2 jours',
      title: 'Mise bas prévue',
      subject: 'F-021',
      location: 'Cage C2',
      action: 'Enregistrer mise bas',
      color: 'alert-red'
    },
    {
      id: 3,
      type: 'warning',
      badge: 'Traitement',
      time: 'Prévu',
      title: 'Déparasitage',
      subject: 'F-016',
      action: 'Marquer fait',
      color: 'copper-orange'
    }
  ]
};

export const cheptelData = {
  animals: [
    {
      id: 'F-012',
      name: 'Blanchette',
      gender: 'F',
      status: 'Gestante',
      type: 'Femelle • Néo-Zélandais',
      location: 'Cage A3',
      badgeColor: 'brand-primary',
      infoIcon: 'check_circle',
      infoText: 'Traitement à jour',
      infoColor: 'brand-primary',
      image: 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5088?auto=format&fit=crop&q=80&w=800',
      robe: 'Blanc pur'
    },
    {
      id: 'M-004',
      name: 'Gribouille',
      gender: 'M',
      status: 'Actif',
      type: 'Mâle • Californien',
      location: 'Cage B1',
      badgeColor: 'brand-secondary',
      infoIcon: 'info',
      infoText: 'Aucun traitement en cours',
      infoColor: 'brand-muted',
      image: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?auto=format&fit=crop&q=80&w=800',
      robe: 'Grisette'
    },
    {
      id: 'F-021',
      name: 'Cacao',
      gender: 'F',
      status: 'Allaitante',
      type: 'Femelle • Croisé',
      location: 'Cage C2',
      badgeColor: 'brand-secondary',
      infoIcon: 'event_repeat',
      infoText: 'Alerte: Rappel vitamine demain',
      infoColor: 'brand-warning',
      isWarning: true,
      image: 'https://images.unsplash.com/photo-1591561582301-7ce6588cc286?auto=format&fit=crop&q=80&w=800',
      robe: 'Chocolat'
    },
    {
      id: 'F-008',
      name: 'Plume',
      gender: 'F',
      status: 'Au repos',
      type: 'Femelle • Géant des Flandres',
      location: 'Cage D1',
      badgeColor: 'brand-neutral',
      image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800',
      robe: 'Fauve'
    }
  ]
};

export const santeData = {
  stats: {
    aFaire: 1,
    enRetard: 1,
    enCours: 2,
    faits: 12
  },
  soins: [
    {
      id: 1,
      animalId: 'F-012',
      type: 'Déparasitage interne',
      category: 'Prophylaxie',
      status: 'À faire',
      statusColor: 'warning',
      date: 'Prévu le 01/06/2026 (Aujourd\'hui)',
      isToday: true
    },
    {
      id: 2,
      animalId: 'P-014',
      type: 'Vitamine Adec',
      category: 'Renforcement',
      status: 'En cours',
      statusColor: 'secondary',
      date: 'Du 01/06/2026 au 05/06/2026'
    },
    {
      id: 3,
      animalId: 'M-004',
      type: 'Soin blessure',
      category: 'Traitement curatif',
      status: 'Fait',
      statusColor: 'primary',
      date: 'Fait le 18/05/2026 • Terminé'
    },
    {
      id: 4,
      animalId: 'F-021',
      type: 'Rappel vaccin',
      category: 'Vaccination',
      status: 'En retard',
      statusColor: 'danger',
      date: 'Prévu le 28/05/2026 (Il y a 4 jours)',
      isLate: true
    }
  ]
};

export const alertesData = [
  {
    id: 1,
    type: 'Urgent',
    typeColor: 'danger',
    subject: 'F-021',
    title: 'Mise bas prévue pour F-021',
    subtitle: '(Cage C2)',
    icon: 'event_busy',
    time: 'En retard de 2 jours',
    primaryAction: 'Enregistrer mise bas',
    secondaryAction: 'Reporter'
  },
  {
    id: 2,
    type: 'Important',
    typeColor: 'warning',
    subject: 'F-012',
    title: 'Contrôler la gestation de F-012',
    subtitle: '(Cage A3)',
    icon: 'today',
    time: 'Aujourd\'hui',
    primaryAction: 'Confirmer gestation',
    secondaryAction: 'Échec saillie',
    primaryColor: 'secondary'
  },
  {
    id: 3,
    type: 'Santé',
    typeColor: 'warning',
    subject: 'Cage A3',
    title: 'Déparasitage de F-012',
    icon: 'medical_services',
    time: 'À faire aujourd\'hui',
    primaryAction: 'Marquer comme fait'
  },
  {
    id: 4,
    type: 'Système',
    typeColor: 'warning',
    title: 'Aucune sauvegarde récente',
    description: 'Pensez à sauvegarder vos données pour éviter les pertes. Dernière sauvegarde : 5 jours.',
    icon: 'backup',
    primaryAction: 'Sauvegarder',
    primaryColor: 'surface'
  }
];


