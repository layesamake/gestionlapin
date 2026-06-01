# Design System: Lapin Manager

## 1. Visual Theme & Atmosphere
Un outil de gestion agricole mobile-first, moderne, sombre et extrêmement rigoureux. L'interface évoque la précision opérationnelle avec des cartes de données claires et une hiérarchie stricte des indicateurs clés d'élevage (gestations, alertes, traitements). L'atmosphère est sobre, professionnelle et rassurante, utilisant des contrastes élevés sur fond sombre pour faciliter l'utilisation en élevage.

## 2. Color Palette & Roles
- **Noir Anthracite** (#0B0F19) — Fond principal (Canvas)
- **Gris Sombre** (#161B26) — Fond des cartes et conteneurs
- **Gris Bordure** (#242B3B) — Bordures de cartes et séparateurs
- **Blanc Pur** (#F3F4F6) — Texte principal et titres
- **Gris Muted** (#9CA3AF) — Texte secondaire, étiquettes, métadonnées
- **Vert Moderne** (#10B981) — Couleur principale / Actions positives, confirmation, disponibilité (Status: Confirmé, Disponible, Fait, Succès)
- **Bleu Cyan** (#06B6D4) — Info, actions secondaires, en cours (Status: Programmé, Saillie, Allaitante, En cours)
- **Orange Cuivre** (#F59E0B) — Alertes, rappels, actions proches (Status: À faire, À surveiller, Rappel, Sevrage)
- **Rouge Alerte** (#EF4444) — Danger, urgence, retards, décès (Status: Urgent, En retard, Décédé, Échec)
- **Gris Neutre** (#6B7280) — Inactif, clôturé, repos (Status: Repos, Réformé, Annulé)

## 3. Typography Rules
- **Display & Headlines:** `Satoshi` ou `Outfit` — Tendance serrée, échelle contrôlée. Les chiffres clés de l'élevage doivent ressortir en gras et grand format.
- **Body:** `Satoshi` ou `Outfit` — Interligne détendu pour une lecture facile sur mobile.
- **Mono:** `JetBrains Mono` — Utilisé pour les codes d'identification (ex: F-012, P-014, Cage A3) et les dates.
- **Banned:** `Inter` est strictement banni. Pas de polices à empattement (serif) dans ce tableau de bord. Tout doit être en français.

## 4. Component Stylings
* **Buttons:** Boutons tactiles plats à bords légèrement arrondis (0.5rem / 8px). Pas de lueur néon. Retrait de -1px au clic. Boutons primaires en vert ou cyan, boutons secondaires en contour gris bordure.
* **Cards:** Angles modérément arrondis (0.75rem / 12px) adaptés à l'affichage mobile. Ombre diffuse teintée très sombre. Remplacement des tableaux complexes par des listes de cartes verticales.
* **Inputs:** Libellé visible en permanence au-dessus, champ sombre avec bordure fine, contour vert ou cyan au focus.
* **Badges de statut:** Fond de couleur de statut à très faible opacité (10-15%) avec texte coloré à 100% de la couleur correspondante (ex: vert pour Disponible, orange pour À faire).
* **Indicateur hors connexion:** Bannière ou badge fixe discret en haut indiquant "Fonctionne sans Internet • Données locales".

## 5. Layout Principles
- Navigation principale via une barre inférieure (Bottom Navigation) avec 5 onglets maximum : Accueil, Cheptel, Reproduction, Santé, Alertes.
- Accès aux Paramètres via une icône d'engrenage discrète dans l'en-tête supérieur.
- Mise en page à une seule colonne sur mobile avec marges de 16px. Pas de défilement horizontal.

## 6. Anti-Patterns (Banned)
- Aucun mot en anglais (ex: pas de "Dashboard", "Settings", "Cancel", "Submit").
- Pas d'emojis.
- Pas de couleur de fond claire par défaut.
- Pas de données ou statistiques inventées farfelues (suivre rigoureusement les exemples de cahier.md).
- Pas de graphiques circulaires complexes ou de tableaux larges.
