# PROMPT MASTER GOOGLE STITCH
## Création des interfaces de l’application mobile “Lapin Manager”

Tu es un expert senior en design UX/UI mobile-first, en création d’interfaces d’applications agricoles, en design system professionnel et en conception d’applications de gestion d’élevage.

Je veux créer les interfaces complètes d’une application mobile personnelle de gestion d’élevage de lapins.

Nom provisoire de l’application : **Lapin Manager**

L’application sera utilisée principalement sur smartphone par un seul éleveur.  
Elle doit fonctionner comme une application mobile autonome, utilisable sans connexion Internet.

Ta mission est uniquement de créer les interfaces utilisateur.  
Ne crée pas de backend.  
Ne crée pas de logique serveur.  
Ne crée pas de code technique complexe.  
Concentre-toi sur la maquette, les écrans, les formulaires, les cartes, les listes, les boutons, les badges, les alertes, la navigation, le design system, les modales et l’expérience utilisateur.

---

# 1. OBJECTIF GÉNÉRAL DE L’APPLICATION

L’application doit permettre à l’éleveur de gérer son élevage de lapins à partir de son téléphone.

Elle doit couvrir quatre grands domaines :

1. Le cheptel ;
2. La reproduction ;
3. La santé sanitaire ;
4. Les alertes et rappels.

La partie reproduction comprend :

- les saillies ;
- les gestations ;
- les mises bas ;
- les portées ;
- les mortalités de portée ;
- les sevrages.

La partie santé doit se concentrer sur :

- la prophylaxie sanitaire ;
- les traitements prévus ;
- les traitements à faire ;
- les traitements en cours ;
- les traitements déjà faits ;
- les traitements en retard ;
- les rappels sanitaires ;
- l’historique sanitaire des reproducteurs et des portées.

L’application doit aider l’éleveur à ne plus oublier :

- les dates de saillie ;
- les contrôles de gestation ;
- les préparations de mise bas ;
- les mises bas prévues ;
- les sevrages ;
- les traitements sanitaires à faire ;
- les traitements déjà faits ;
- les rappels prophylactiques ;
- les sauvegardes de données.

---

# 2. EXIGENCE MAJEURE : APPLICATION MOBILE AUTONOME

L’application doit être présentée comme une application mobile autonome.

Elle doit pouvoir fonctionner sans connexion Internet.

L’interface doit faire comprendre que :

- les données sont enregistrées dans le téléphone ;
- l’application peut être utilisée hors connexion ;
- l’utilisateur peut sauvegarder ses données ;
- l’utilisateur peut restaurer ses données en cas de changement de téléphone ou de perte.

Ajouter dans l’interface des mentions comme :

- Fonctionne sans Internet ;
- Données enregistrées sur ce téléphone ;
- Mode hors connexion disponible ;
- Sauvegarde locale disponible.

---

# 3. PÉRIMÈTRE STRICT DE L’APPLICATION

L’application doit gérer uniquement :

- les races ;
- les reproducteurs mâles ;
- les reproductrices femelles ;
- les saillies ;
- les gestations ;
- les portées ;
- les lapereaux ;
- les mortalités de portée ;
- les sevrages ;
- les traitements sanitaires prévus ;
- les traitements sanitaires faits ;
- les rappels sanitaires ;
- les alertes de reproduction ;
- les alertes de santé ;
- les paramètres simples ;
- la sauvegarde et la restauration des données.

---

# 4. ÉLÉMENTS À NE PAS CRÉER

Ne pas créer :

- module de vente ;
- module de dépenses ;
- module financier ;
- module de caisse ;
- module client ;
- module fournisseur ;
- module livraison ;
- module facture ;
- module reçu PDF ;
- module stock d’aliment ;
- module stock de médicaments ;
- module pharmacie ;
- diagnostic vétérinaire automatique ;
- prescription médicale ;
- ordonnance ;
- calcul automatique de dosage ;
- recommandation médicale ;
- espace multi-utilisateur ;
- rôles et permissions ;
- module complexe de cages.

Important : la cage ou l’emplacement doit rester un simple champ texte dans les fiches.  
Ne pas créer un module séparé pour les cages.

---

# 5. LANGUE DE L’INTERFACE

Toute l’application doit être entièrement en français.

Aucun mot visible ne doit être en anglais.

Cela concerne :

- menus ;
- boutons ;
- titres ;
- sous-titres ;
- champs ;
- filtres ;
- statuts ;
- messages ;
- alertes ;
- libellés ;
- badges ;
- textes vides ;
- confirmations ;
- modales.

Utiliser des libellés français comme :

- Accueil ;
- Cheptel ;
- Reproduction ;
- Santé ;
- Alertes ;
- Paramètres ;
- Nouveau reproducteur ;
- Nouvelle race ;
- Nouvelle saillie ;
- Nouvelle portée ;
- Nouveau traitement prévu ;
- Enregistrer un traitement fait ;
- Ajouter une mortalité ;
- Déclarer le sevrage ;
- Sauvegarder les données ;
- Restaurer les données ;
- Marquer comme fait ;
- Reporter ;
- Ignorer ;
- Annuler ;
- Enregistrer.

---

# 6. STYLE VISUEL GLOBAL

Créer une interface :

- mobile-first ;
- sombre ;
- moderne ;
- sobre ;
- professionnelle ;
- agricole mais premium ;
- très lisible ;
- rapide à utiliser ;
- adaptée à une utilisation quotidienne dans un élevage ;
- sans surcharge graphique ;
- sans décoration inutile.

L’application doit donner une impression de :

- rigueur ;
- maîtrise ;
- fiabilité ;
- organisation ;
- sécurité ;
- simplicité.

---

# 7. DESIGN SYSTEM

Créer un design system cohérent pour toute l’application.

## Palette de couleurs

Utiliser une palette sombre :

- fond principal : noir bleuté ou gris anthracite très foncé ;
- cartes : gris foncé légèrement plus clair que le fond ;
- bordures : gris discret ;
- texte principal : blanc cassé ou gris très clair ;
- texte secondaire : gris clair atténué ;
- couleur principale : vert moderne ou bleu cyan discret ;
- action positive : vert ;
- information : bleu ;
- alerte : orange ;
- danger : rouge ;
- statut neutre : gris.

## Rôle des couleurs

- Vert : disponible, confirmé, fait, terminé, réussite.
- Bleu : information, programmé, en cours, action secondaire.
- Orange : à faire, à surveiller, rappel, action proche.
- Rouge : urgent, en retard, échec, décès, danger.
- Gris : annulé, clôturé, repos, inactif.

Ne pas utiliser trop de couleurs différentes.  
La cohérence visuelle est prioritaire.

---

# 8. TYPOGRAPHIE

Utiliser une typographie moderne, simple et très lisible.

Hiérarchie :

- titre principal d’écran : grand, clair, visible ;
- sous-titre de section : moyen, bien distingué ;
- texte courant : lisible ;
- texte secondaire : discret mais clair ;
- chiffres statistiques : grands et immédiatement visibles.

Les chiffres importants doivent être fortement visibles :

- total lapins ;
- femelles gestantes ;
- portées en cours ;
- traitements à faire ;
- alertes urgentes ;
- lapereaux vivants.

---

# 9. COMPOSANTS VISUELS

Utiliser partout les mêmes composants :

- cartes statistiques ;
- cartes de liste ;
- badges de statut ;
- boutons principaux ;
- boutons secondaires ;
- boutons danger ;
- filtres horizontaux ;
- barre de recherche ;
- formulaires verticaux ;
- champs date ;
- menus déroulants ;
- sélection multiple ;
- navigation inférieure ;
- modales de confirmation ;
- alertes visuelles.

Préférer les cartes verticales aux tableaux complexes.  
L’application doit être facile à utiliser sur smartphone.

---

# 10. NAVIGATION PRINCIPALE

Créer une navigation inférieure mobile avec 5 entrées maximum :

1. Accueil ;
2. Cheptel ;
3. Reproduction ;
4. Santé ;
5. Alertes.

Le menu **Reproduction** doit regrouper deux onglets internes :

- Saillies ;
- Portées.

Les **Paramètres** doivent être accessibles par une icône discrète en haut de l’écran.

---

# 11. ÉCRANS À CRÉER

Créer les écrans suivants :

1. Tableau de bord ;
2. Cheptel ;
3. Fiche reproducteur ;
4. Nouveau reproducteur ;
5. Nouvelle race ;
6. Reproduction ;
7. Nouvelle saillie ;
8. Nouvelle portée ;
9. Fiche portée ;
10. Santé ;
11. Nouveau traitement prévu ;
12. Enregistrer un traitement fait ;
13. Fiche traitement ;
14. Alertes ;
15. Paramètres.

Créer aussi, si nécessaire, des modales simples pour :

- sauvegarder les données ;
- restaurer les données ;
- confirmer une action sensible ;
- marquer une alerte comme faite.

---

# 12. ÉCRAN 1 — TABLEAU DE BORD

Créer un écran intitulé :

**Tableau de bord**

Cet écran doit afficher immédiatement les informations essentielles de l’élevage.

## Indicateur hors connexion

Ajouter en haut un petit indicateur discret :

**Fonctionne sans Internet**

ou :

**Données enregistrées sur ce téléphone**

## Cartes statistiques principales

Afficher :

- Total lapins ;
- Mâles reproducteurs ;
- Femelles reproductrices ;
- Femelles gestantes ;
- Portées en cours ;
- Lapereaux non sevrés ;
- Alertes urgentes.

## Section suivi reproduction

Créer une section :

**Suivi reproduction**

Afficher :

- femelles à contrôler ;
- mises bas prévues ;
- portées à sevrer ;
- femelles allaitantes ;
- prochaines actions de reproduction.

## Section suivi sanitaire

Créer une section :

**Suivi sanitaire**

Afficher :

- Traitements à faire aujourd’hui ;
- Traitements en cours ;
- Traitements en retard ;
- Prophylaxies prévues ;
- Traitements faits ce mois-ci.

## Actions rapides

Afficher des boutons visibles :

- Nouveau reproducteur ;
- Nouvelle saillie ;
- Nouvelle portée ;
- Nouveau traitement prévu ;
- Enregistrer un traitement fait.

## Alertes du jour

Afficher des exemples :

- Contrôler la gestation de F-012 ;
- Préparer le nid de F-008 ;
- Mise bas probable pour F-021 ;
- Sevrage prévu pour la portée P-014 ;
- Déparasitage de F-016 à faire aujourd’hui ;
- Traitement de P-009 à renouveler demain.

---

# 13. ÉCRAN 2 — CHEPTEL

Créer un écran intitulé :

**Cheptel**

Cet écran affiche la liste des lapins de l’élevage.

## Haut de l’écran

Ajouter :

- barre de recherche : “Rechercher par code, race ou statut” ;
- filtres horizontaux : Tous, Mâles, Femelles, Gestantes, Disponibles, Réformés.

## Cartes reproducteurs

Chaque carte doit afficher :

- code du lapin ;
- sexe ;
- race ;
- âge ;
- statut ;
- emplacement/cage ;
- prochaine action ;
- statut sanitaire résumé.

Exemples :

- F-012 — Femelle — Néo-Zélandais — Gestante — Cage A3 — Traitement à jour ;
- M-004 — Mâle — Californien — Actif — Cage B1 — Aucun traitement en cours ;
- F-021 — Femelle — Croisé — Allaitante — Cage C2 — Rappel vitamine demain.

## Boutons

Ajouter :

- Nouveau reproducteur ;
- Nouvelle race.

---

# 14. ÉCRAN 3 — FICHE REPRODUCTEUR

Créer un écran intitulé :

**Fiche reproducteur**

Afficher les détails d’un lapin.

## Informations générales

Afficher :

- code ;
- nom facultatif ;
- sexe ;
- race ;
- âge ;
- origine ;
- statut ;
- emplacement/cage ;
- observation.

## Section reproduction pour une femelle

Afficher :

- nombre de saillies ;
- gestations confirmées ;
- mises bas ;
- total lapereaux nés ;
- total lapereaux sevrés ;
- dernière saillie ;
- dernière mise bas ;
- prochaine action.

## Section performance

Afficher des cartes :

- moyenne nés par portée ;
- moyenne sevrés par portée ;
- taux de réussite des saillies ;
- taux de survie des lapereaux.

## Section historique sanitaire

Ajouter une section :

**Historique sanitaire**

Afficher :

- traitements prévus ;
- traitements faits ;
- derniers soins ;
- rappels à venir ;
- observations sanitaires ;
- statut sanitaire actuel.

## Boutons

Ajouter :

- Nouvelle saillie ;
- Nouveau traitement ;
- Ajouter observation ;
- Modifier.

---

# 15. ÉCRAN 4 — NOUVEAU REPRODUCTEUR

Créer un formulaire intitulé :

**Nouveau reproducteur**

## Champs

- Code du lapin ;
- Nom facultatif ;
- Sexe ;
- Race ;
- Date de naissance ;
- Âge estimé ;
- Origine ;
- Statut ;
- Emplacement / cage ;
- Couleur ;
- Poids ;
- Observation.

## Sexe

Valeurs :

- Mâle ;
- Femelle.

## Origine

Valeurs :

- Né dans l’élevage ;
- Acheté ;
- Reçu ;
- Autre.

## Statuts femelle

- Disponible ;
- Saillie ;
- Gestante ;
- Allaitante ;
- Au repos ;
- Réformée ;
- Décédée.

## Statuts mâle

- Actif ;
- Au repos ;
- Réformé ;
- Décédé.

## Boutons

- Annuler ;
- Enregistrer.

---

# 16. ÉCRAN 5 — NOUVELLE RACE

Créer un formulaire intitulé :

**Nouvelle race**

## Champs

- Nom de la race ;
- Description ;
- Poids moyen adulte ;
- Remarques.

Afficher comme exemples :

- Géant des Flandres ;
- Néo-Zélandais ;
- Californien ;
- Papillon ;
- Race locale ;
- Croisé.

## Boutons

- Annuler ;
- Enregistrer.

---

# 17. ÉCRAN 6 — REPRODUCTION

Créer un écran intitulé :

**Reproduction**

Cet écran doit regrouper deux onglets :

1. Saillies ;
2. Portées.

---

## Onglet Saillies

Afficher :

- bouton Nouvelle saillie ;
- filtres : Toutes, En attente, Gestation confirmée, Échec, Mise bas effectuée.

Chaque carte de saillie doit afficher :

- femelle ;
- mâle ou mâles utilisés ;
- date de saillie ;
- contrôle prévu ;
- mise bas prévue ;
- statut.

Exemples :

- F-012 × M-004 — Saillie du 16/05/2026 — Mise bas prévue le 16/06/2026 — Gestation confirmée ;
- F-008 × M-002, M-006 — Double passage — Contrôle aujourd’hui — En attente ;
- F-021 × M-003 — Échec.

Actions rapides :

- Confirmer gestation ;
- Déclarer échec ;
- Enregistrer mise bas ;
- Voir détails.

---

## Onglet Portées

Afficher :

- bouton Nouvelle portée ;
- filtres : Toutes, En cours, À surveiller, À sevrer, Sevrées.

Chaque carte de portée doit afficher :

- code de portée ;
- femelle ;
- date de mise bas ;
- âge actuel ;
- nombre de lapereaux vivants ;
- statut ;
- date prévue de sevrage.

Exemples :

- P-014 — Femelle F-012 — 8 lapereaux vivants — 21 jours — En cours ;
- P-009 — Femelle F-008 — 5 lapereaux vivants — À sevrer ;
- P-002 — Femelle F-021 — Sevrée.

Actions rapides :

- Voir détails ;
- Ajouter mortalité ;
- Déclarer sevrage.

---

# 18. ÉCRAN 7 — NOUVELLE SAILLIE

Créer un formulaire intitulé :

**Nouvelle saillie**

## Champs obligatoires

- Femelle ;
- Mâle(s) ;
- Date de saillie.

## Champs facultatifs

- Heure ;
- Type de saillie ;
- Observation.

## Type de saillie

Valeurs :

- Naturelle ;
- Contrôlée ;
- Double passage ;
- Autre.

Le champ **Mâle(s)** doit permettre visuellement de sélectionner un ou plusieurs mâles.

## Section automatique

Afficher une section :

**Dates prévues**

Avec :

- Contrôle de gestation ;
- Préparation de mise bas ;
- Mise bas prévue.

Exemple :

- Contrôle de gestation : 30/05/2026 ;
- Préparation de mise bas : 12/06/2026 ;
- Mise bas prévue : 16/06/2026.

## Boutons

- Annuler ;
- Enregistrer la saillie.

---

# 19. ÉCRAN 8 — NOUVELLE PORTÉE

Créer un formulaire intitulé :

**Nouvelle portée**

## Champs

- Femelle ;
- Saillie liée ;
- Date de mise bas ;
- Nombre total de lapereaux nés ;
- Nombre de lapereaux vivants à la naissance ;
- Nombre de morts-nés ;
- Emplacement / cage ;
- Observation.

## Section automatique

Afficher :

**Suivi prévu**

Avec :

- âge actuel ;
- date prévue de sevrage ;
- statut initial.

## Boutons

- Annuler ;
- Enregistrer la portée.

---

# 20. ÉCRAN 9 — FICHE PORTÉE

Créer un écran intitulé :

**Fiche portée**

## Informations principales

Afficher :

- code de la portée ;
- femelle ;
- saillie liée ;
- mâle(s) utilisé(s) ;
- date de mise bas ;
- âge exact ;
- total nés ;
- vivants à la naissance ;
- morts-nés ;
- morts après naissance ;
- vivants actuels ;
- date prévue de sevrage ;
- statut ;
- emplacement/cage ;
- observations.

## Suivi sanitaire de la portée

Ajouter une section :

**Suivi sanitaire**

Afficher :

- traitements prévus ;
- traitements faits ;
- vitamines ;
- prévention ;
- mortalités éventuelles ;
- observations sanitaires ;
- rappels à venir.

## Actions disponibles

Ajouter les boutons :

- Ajouter mortalité ;
- Ajouter observation ;
- Nouveau traitement ;
- Modifier emplacement ;
- Déclarer le sevrage.

## Historique

Afficher une section :

**Historique de la portée**

Avec :

- Mise bas enregistrée ;
- Mortalité ajoutée ;
- Observation ajoutée ;
- Traitement fait ;
- Sevrage déclaré.

---

# 21. ÉCRAN 10 — SANTÉ

Créer un écran intitulé :

**Santé**

Cet écran est consacré à la prophylaxie sanitaire et au suivi des traitements.

Il ne doit pas être conçu comme un module de diagnostic vétérinaire.

## Cartes statistiques

Afficher en haut :

- Traitements à faire aujourd’hui ;
- Traitements en cours ;
- Traitements programmés ;
- Traitements faits ce mois-ci ;
- Animaux concernés ;
- Portées concernées.

## Boutons principaux

Ajouter deux boutons visibles :

- Nouveau traitement prévu ;
- Enregistrer un traitement fait.

## Filtres horizontaux

Ajouter :

- Tous ;
- À faire ;
- En cours ;
- Faits ;
- En retard ;
- Programmés ;
- Prophylaxie ;
- Traitement curatif.

## Liste des traitements

Chaque carte de traitement doit afficher :

- animal, portée ou lot concerné ;
- type de traitement ;
- objectif du traitement ;
- date prévue ;
- statut ;
- prochain rappel ;
- observation courte.

Exemples :

- F-012 — Déparasitage — À faire aujourd’hui ;
- P-014 — Vitamines — Traitement en cours ;
- Lot engraissement 01 — Prévention coccidiose — Prévu vendredi ;
- M-004 — Soin blessure — Fait le 18/05/2026.

---

# 22. ÉCRAN 11 — NOUVEAU TRAITEMENT PRÉVU

Créer un formulaire intitulé :

**Nouveau traitement prévu**

Ce formulaire sert à programmer un traitement ou une action prophylactique avant sa réalisation.

## Champs

- Sujet concerné ;
- Animal / portée / lot concerné ;
- Type d’action sanitaire ;
- Nom du traitement ou du produit ;
- Objectif du traitement ;
- Date prévue ;
- Fréquence ;
- Durée prévue ;
- Prochain rappel ;
- Responsable ;
- Observation.

## Sujet concerné

Valeurs :

- Reproducteur ;
- Portée ;
- Lot ;
- Tout l’élevage ;
- Autre.

## Type d’action sanitaire

Valeurs :

- Prophylaxie ;
- Déparasitage ;
- Prévention coccidiose ;
- Vitamines ;
- Vaccination si applicable ;
- Traitement curatif ;
- Soin local ;
- Nettoyage / désinfection ;
- Autre.

## Objectif du traitement

Exemples :

- Prévention ;
- Renforcement ;
- Traitement d’un problème observé ;
- Rappel sanitaire ;
- Désinfection ;
- Suivi post-mise bas ;
- Suivi des lapereaux.

## Statut initial

Le statut initial doit être :

**À faire**

## Boutons

- Annuler ;
- Enregistrer le traitement prévu.

---

# 23. ÉCRAN 12 — ENREGISTRER UN TRAITEMENT FAIT

Créer un formulaire intitulé :

**Enregistrer un traitement fait**

Ce formulaire sert à noter qu’un traitement a réellement été administré.

## Champs

- Sujet concerné ;
- Animal / portée / lot concerné ;
- Traitement administré ;
- Type d’action sanitaire ;
- Date de réalisation ;
- Heure facultative ;
- Dose ou quantité donnée ;
- Fréquence ;
- Durée ;
- Prochain rappel ;
- Résultat observé ;
- Observation.

## Résultat observé

Valeurs :

- Aucun changement observé ;
- Amélioration ;
- À surveiller ;
- Traitement terminé ;
- À renouveler ;
- Cas préoccupant.

## Boutons

- Annuler ;
- Enregistrer comme fait.

---

# 24. ÉCRAN 13 — FICHE TRAITEMENT

Créer un écran intitulé :

**Fiche traitement**

Afficher :

- sujet concerné ;
- code de l’animal, de la portée ou du lot ;
- type d’action sanitaire ;
- traitement ou produit utilisé ;
- objectif ;
- date prévue ;
- date réelle de réalisation ;
- statut ;
- fréquence ;
- durée ;
- prochain rappel ;
- résultat observé ;
- observations.

## Actions disponibles

Ajouter :

- Marquer comme fait ;
- Ajouter une observation ;
- Programmer un rappel ;
- Renouveler le traitement ;
- Modifier ;
- Annuler.

## Historique du traitement

Afficher :

- Traitement programmé ;
- Rappel créé ;
- Traitement administré ;
- Observation ajoutée ;
- Traitement renouvelé ;
- Traitement terminé.

---

# 25. ÉCRAN 14 — ALERTES

Créer un écran intitulé :

**Alertes**

Cet écran doit regrouper les alertes de reproduction et les alertes sanitaires.

## Filtres principaux

Ajouter :

- Aujourd’hui ;
- En retard ;
- Cette semaine ;
- Toutes.

## Filtres par type

Ajouter :

- Gestation ;
- Mise bas ;
- Sevrage ;
- Santé ;
- Traitement ;
- Prophylaxie ;
- Sauvegarde.

## Cartes d’alerte

Chaque carte doit afficher :

- type d’alerte ;
- message ;
- date prévue ;
- niveau d’urgence ;
- statut ;
- action rapide.

## Exemples d’alertes reproduction

- Contrôle de gestation — F-012 — Aujourd’hui — À faire ;
- Préparation de mise bas — F-008 — Demain — À faire ;
- Mise bas prévue — F-021 — En retard — Urgent ;
- Sevrage prévu — P-014 — Cette semaine — À faire.

## Exemples d’alertes santé

- Déparasitage de F-012 à faire aujourd’hui ;
- Prévention coccidiose prévue pour P-014 ;
- Traitement de M-004 à renouveler demain ;
- Désinfection du clapier prévue cette semaine ;
- Traitement en retard pour F-021.

## Exemple d’alerte sauvegarde

- Aucune sauvegarde récente — Pensez à sauvegarder vos données.

## Actions

Ajouter :

- Marquer comme fait ;
- Reporter ;
- Ignorer ;
- Voir détails.

---

# 26. ÉCRAN 15 — PARAMÈTRES

Créer un écran intitulé :

**Paramètres**

Cet écran doit contenir des paramètres simples.

## Section données locales

Créer une section :

**Données locales**

Afficher un texte :

**Vos données sont enregistrées dans ce téléphone. L’application peut fonctionner sans connexion Internet. Pensez à faire régulièrement une sauvegarde pour éviter toute perte en cas de panne, suppression ou changement de téléphone.**

Afficher un indicateur :

**Mode hors connexion disponible**

## Section sauvegarde et restauration

Créer une section :

**Sauvegarde et restauration**

Afficher :

- bouton Sauvegarder les données ;
- bouton Restaurer les données ;
- Dernière sauvegarde : jamais ;
- ou Dernière sauvegarde : 28/05/2026.

## Section paramètres de reproduction

Afficher :

- Contrôle de gestation après combien de jours ;
- Préparation de mise bas après combien de jours ;
- Durée moyenne de gestation ;
- Âge prévu de sevrage.

Valeurs par défaut :

- Contrôle de gestation : 14 jours ;
- Préparation de mise bas : 27 jours ;
- Durée moyenne de gestation : 31 jours ;
- Sevrage : 35 jours.

## Section paramètres sanitaires

Afficher :

- rappel automatique des traitements ;
- rappel des prophylaxies ;
- rappel des traitements en retard ;
- affichage des traitements faits ce mois-ci ;
- rappel de sauvegarde régulière.

## Boutons

- Annuler ;
- Enregistrer les paramètres.

---

# 27. MODALE — SAUVEGARDER LES DONNÉES

Créer une modale intitulée :

**Sauvegarder les données**

Texte :

**Cette action va créer un fichier de sauvegarde contenant toutes les données de votre élevage : cheptel, saillies, portées, traitements, alertes, paramètres et historiques. Conservez ce fichier en lieu sûr.**

Boutons :

- Annuler ;
- Créer la sauvegarde.

Style :

- rassurant ;
- sobre ;
- clair ;
- icône de sauvegarde ou de téléphone.

---

# 28. MODALE — RESTAURER LES DONNÉES

Créer une modale intitulée :

**Restaurer les données**

Texte :

**Attention : la restauration remplacera les données actuelles de l’application par celles du fichier sélectionné. Assurez-vous d’avoir choisi le bon fichier de sauvegarde.**

Boutons :

- Annuler ;
- Choisir un fichier ;
- Restaurer.

Style :

- plus prudent ;
- couleur d’avertissement orange ;
- icône de restauration ou de fichier.

---

# 29. STATUTS À REPRÉSENTER VISUELLEMENT

Créer des badges visuels pour tous les statuts.

## Statuts femelles

- Disponible ;
- Saillie ;
- Gestante ;
- Allaitante ;
- Au repos ;
- Réformée ;
- Décédée.

## Statuts mâles

- Actif ;
- Au repos ;
- Réformé ;
- Décédé.

## Statuts saillies

- Saillie enregistrée ;
- En attente de contrôle ;
- Gestation confirmée ;
- Gestation non confirmée ;
- Mise bas effectuée ;
- Échec ;
- Annulée.

## Statuts portées

- Née ;
- En cours ;
- À surveiller ;
- À sevrer ;
- Sevrée ;
- Clôturée.

## Statuts traitements

- Programmé ;
- À faire ;
- En cours ;
- Fait ;
- En retard ;
- À renouveler ;
- Terminé ;
- Annulé.

## Statuts alertes

- À faire ;
- Fait ;
- Reporté ;
- Ignoré.

---

# 30. COULEURS DES BADGES

Utiliser une logique cohérente.

## Reproduction

- Disponible : vert ;
- Saillie : bleu ;
- Gestante : vert accentué ;
- Allaitante : violet ou bleu doux ;
- Au repos : gris ;
- Réformée : orange ou gris ;
- Décédée : rouge ;
- Échec : rouge ;
- Annulée : gris.

## Portées

- Née : bleu ;
- En cours : vert ;
- À surveiller : orange ;
- À sevrer : orange accentué ;
- Sevrée : vert ;
- Clôturée : gris.

## Santé

- Programmé : bleu ;
- À faire : orange ;
- En cours : bleu accentué ;
- Fait : vert ;
- En retard : rouge ;
- À renouveler : orange foncé ;
- Terminé : vert ;
- Annulé : gris.

## Sauvegarde

- Sauvegarde récente : vert ;
- Sauvegarde ancienne : orange ;
- Aucune sauvegarde : rouge ou orange.

---

# 31. ALERTES VISUELLES

Créer trois niveaux d’alerte :

## Alerte normale

Pour une action à venir.

## Alerte importante

Pour une action prévue aujourd’hui.

## Alerte urgente

Pour une action en retard.

Les alertes urgentes doivent être très visibles avec une couleur rouge ou orange foncé.

---

# 32. FORMULAIRES

Les formulaires doivent être simples, lisibles et adaptés au téléphone.

Chaque formulaire doit avoir :

- un titre clair ;
- des sections si nécessaire ;
- des champs bien espacés ;
- des libellés en français ;
- des boutons visibles ;
- un bouton Annuler ;
- un bouton Enregistrer.

Ne pas créer de longs formulaires confus.  
Privilégier :

- menus déroulants ;
- champs date ;
- cartes de sélection ;
- boutons larges ;
- textes courts ;
- organisation verticale.

---

# 33. ICÔNES

Utiliser des icônes simples et sobres.

Exemples :

- lapin ou animal pour le cheptel ;
- calendrier pour les dates ;
- cloche pour les alertes ;
- cœur ou reproduction pour les saillies ;
- groupe ou petits animaux pour les portées ;
- bouclier pour la prophylaxie ;
- croix médicale simple pour les traitements ;
- validation pour les traitements faits ;
- téléphone pour les données locales ;
- fichier pour les sauvegardes ;
- flèche de restauration pour restaurer ;
- engrenage pour les paramètres.

Les icônes doivent aider à comprendre, sans décorer inutilement.

---

# 34. RÈGLES UX IMPORTANTES

L’utilisateur doit pouvoir :

- voir immédiatement les alertes importantes ;
- enregistrer une saillie rapidement ;
- enregistrer une portée rapidement ;
- programmer un traitement rapidement ;
- enregistrer un traitement fait rapidement ;
- consulter l’historique d’un lapin ;
- consulter l’historique sanitaire d’un lapin ;
- consulter l’âge exact d’une portée ;
- voir les traitements à faire aujourd’hui ;
- distinguer clairement ce qui est prévu de ce qui est déjà fait ;
- voir que l’application fonctionne sans Internet ;
- sauvegarder ses données facilement ;
- restaurer ses données avec prudence.

L’interface doit être rapide, claire et utilisable dans un contexte d’élevage.

---

# 35. INTERDICTIONS DESIGN

Ne pas utiliser :

- interface claire par défaut ;
- textes en anglais ;
- boutons en anglais ;
- tableaux complexes sur mobile ;
- surcharge graphique ;
- design enfantin ;
- trop de couleurs ;
- trop d’icônes ;
- trop de menus ;
- écrans financiers ;
- écrans de vente ;
- écrans de stock ;
- écrans clients ;
- écrans fournisseurs ;
- système cloud complexe ;
- interface médicale trop avancée.

---

# 36. RÉSULTAT FINAL ATTENDU

Créer une maquette complète, moderne, sombre, mobile-first, cohérente et entièrement en français.

L’application doit permettre à l’éleveur de comprendre rapidement :

- combien de lapins il possède ;
- quelles femelles sont gestantes ;
- quelles femelles doivent être contrôlées ;
- quelles femelles doivent bientôt mettre bas ;
- quelles portées sont en cours ;
- quel âge ont les portées ;
- quelles portées doivent être sevrées ;
- quels traitements sont prévus ;
- quels traitements sont à faire aujourd’hui ;
- quels traitements sont en cours ;
- quels traitements sont déjà faits ;
- quels traitements sont en retard ;
- quelles prophylaxies sanitaires sont programmées ;
- si ses données sont sauvegardées ;
- que l’application fonctionne sans Internet.

L’application doit donner une impression de simplicité, de rigueur, de fiabilité, de sécurité et d’efficacité.

Créer maintenant la maquette complète de l’application **Lapin Manager** en respectant strictement toutes ces instructions.