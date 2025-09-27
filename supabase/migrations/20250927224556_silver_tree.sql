/*
  # Mise à jour contenu formations avec nouveaux prix

  1. Mise à jour des formations
    - Ajustement des prix selon analyse marché IDF
    - Nouvelles formations spécialisées
    - Durées et modalités actualisées
  
  2. Ajout de contenu technique
    - Articles véhicules électriques/hybrides/hydrogène
    - Codes diagnostic spécialisés
    - Procédures maintenance nouvelles technologies
    
  3. Enrichissement base de connaissances
    - Contenu ADAS et systèmes d'aide à la conduite
    - Climatisation moderne R1234yf
    - Habilitations électriques B0L, B2VL
*/

-- Mise à jour des formations avec nouveaux prix
UPDATE learning_modules 
SET 
  title = 'La prévention des risques sur véhicules électriques et hybrides',
  estimated_duration_hours = 16,
  learning_objectives = ARRAY[
    'Obtenir les habilitations B0L, BCL, B2L, B2VL',
    'Maîtriser la sécurité haute tension',
    'Prévenir les risques électriques',
    'Intervenir en sécurité sur VE/VH'
  ]
WHERE category = 'electrique' AND type = 'automotive';

-- Insertion nouveau contenu véhicules électriques
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
(
  'Habilitations Électriques B0L, B2VL pour Véhicules',
  'moteur_electrique',
  'Sécurité haute tension',
  'Les habilitations électriques sont obligatoires pour intervenir sur les véhicules électriques et hybrides. Formation 2 jours présentiel ou distanciel pour 950€.

  **Habilitations couvertes :**
  - B0L : Exécutant non électricien
  - BCL : Chargé de consignation
  - B2L : Chargé de travaux
  - B2VL : Chargé de travaux véhicules

  **Contenu formation :**
  - Réglementation sécurité électrique
  - Risques haute tension (>60V)
  - Procédures de consignation
  - EPI et outillage spécialisé
  - Premiers secours électriques

  **Modalités :**
  - Durée : 2 jours (14h)
  - Prix : 950€ présentiel ou distanciel
  - Certification : Valable 3 ans
  - Recyclage : Obligatoire',
  ARRAY['habilitation', 'électrique', 'sécurité', 'B0L', 'B2VL', 'haute tension'],
  4,
  ARRAY['électrique', 'hybride'],
  ARRAY['Tesla', 'Mercedes EQS', 'BMW i3', 'Renault Zoe']
),
(
  'Véhicules Hydrogène FCEV - Formation Complète 150€',
  'hydrogene',
  'Pile à combustible',
  'Formation spécialisée véhicules hydrogène (FCEV) en 1 jour distanciel pour 150€ seulement.

  **Technologies couvertes :**
  - Pile à combustible PEM
  - Stockage hydrogène 700 bars
  - Compresseur et détendeurs
  - Système de refroidissement
  - Électronique de contrôle

  **Sécurité hydrogène :**
  - Propriétés physiques H2
  - Détection fuites
  - Ventilation obligatoire
  - Procédures d''urgence
  - EPI spécialisés

  **Maintenance FCEV :**
  - Contrôles périodiques
  - Purge système
  - Remplacement filtres
  - Diagnostic spécialisé

  **Constructeurs :**
  - Toyota Mirai
  - Hyundai Nexo
  - Mercedes GLC F-Cell
  - BMW iX5 Hydrogen',
  ARRAY['hydrogène', 'FCEV', 'pile à combustible', 'H2', 'sécurité'],
  5,
  ARRAY['hydrogène'],
  ARRAY['Toyota', 'Hyundai', 'Mercedes', 'BMW']
),
(
  'Véhicules Hybrides HEV/PHEV - 350€ Présentiel / 150€ Ligne',
  'hybride',
  'Systèmes hybrides',
  'Formation véhicules hybrides 1 jour avec deux modalités tarifaires.

  **Architectures hybrides :**
  - Hybride série (Nissan e-Power)
  - Hybride parallèle (Toyota HSD)
  - Hybride mixte (Honda i-MMD)
  - Hybride rechargeable PHEV

  **Technologies batteries :**
  - Batteries NiMH (Toyota)
  - Batteries Li-ion (nouvelles générations)
  - BMS (Battery Management System)
  - Refroidissement batteries

  **Récupération énergie :**
  - Freinage régénératif
  - Décélération moteur
  - Optimisation rendement
  - Stratégies de conduite

  **Diagnostic hybride :**
  - Codes spécifiques HEV/PHEV
  - Outils diagnostic bi-technologie
  - Procédures sécurité
  - Maintenance préventive

  **Tarifs formation :**
  - Présentiel : 350€ (1 jour)
  - Distanciel : 150€ (e-learning)',
  ARRAY['hybride', 'HEV', 'PHEV', 'Toyota', 'Honda', 'batteries'],
  4,
  ARRAY['hybride'],
  ARRAY['Toyota', 'Honda', 'Lexus', 'Hyundai', 'Kia']
),
(
  'Systèmes ADAS - Formation 200€ Distanciel',
  'adas',
  'Aides à la conduite',
  'Formation complète systèmes ADAS (Advanced Driver Assistance Systems) pour 200€ en distanciel.

  **Systèmes couverts :**
  - AEB (Autonomous Emergency Braking)
  - ACC (Adaptive Cruise Control)
  - LKA (Lane Keeping Assist)
  - BSD (Blind Spot Detection)
  - TSR (Traffic Sign Recognition)

  **Technologies capteurs :**
  - Caméras haute résolution
  - Radars courte/longue portée
  - Capteurs ultrasoniques
  - Lidar (véhicules premium)
  - Fusion de données

  **Calibrage et étalonnage :**
  - Procédures constructeur
  - Outils spécialisés requis
  - Cibles d''étalonnage
  - Contrôle géométrie
  - Validation fonctionnement

  **Diagnostic ADAS :**
  - Codes défauts spécifiques
  - Tests fonctionnels
  - Mise à jour logiciels
  - Paramétrage véhicule

  **Formation 200€ distanciel :**
  - Cours théoriques complets
  - Vidéos démonstrations
  - Exercices pratiques
  - Certification incluse',
  ARRAY['ADAS', 'aide conduite', 'capteurs', 'calibrage', 'sécurité'],
  4,
  ARRAY['tous véhicules'],
  ARRAY['Mercedes', 'BMW', 'Audi', 'Volvo', 'Tesla']
),
(
  'Climatisation Moderne R1234yf - 150€ Distanciel',
  'climatisation',
  'Nouveaux fluides frigorigènes',
  'Formation climatisation automobile moderne avec nouveaux fluides R1234yf pour 150€ distanciel.

  **Nouveaux fluides :**
  - R1234yf (remplace R134a)
  - Propriétés écologiques
  - Manipulation sécurisée
  - Récupération obligatoire
  - Réglementation F-Gas

  **Systèmes modernes :**
  - Climatisation automatique
  - Multi-zones indépendantes
  - Pompes à chaleur (VE)
  - Gestion intelligente
  - Économies d''énergie

  **Véhicules électriques :**
  - Pompe à chaleur réversible
  - Préchauffage habitacle
  - Optimisation autonomie
  - Gestion thermique batterie
  - Modes éco/confort

  **Diagnostic climatisation :**
  - Contrôle pression/température
  - Test étanchéité
  - Analyse huile compresseur
  - Vérification filtres
  - Programmation calculateurs

  **Formation 150€ distanciel :**
  - Théorie complète
  - Procédures pratiques
  - Réglementation à jour
  - Certification manipulation',
  ARRAY['climatisation', 'R1234yf', 'pompe chaleur', 'fluides', 'écologie'],
  3,
  ARRAY['tous véhicules', 'électrique'],
  ARRAY['Mercedes', 'BMW', 'Audi', 'Tesla', 'Renault']
),
(
  'Coaching Primo-Arrivants 150€ - Accompagnement Personnalisé',
  'diagnostic',
  'Accompagnement insertion',
  'Coaching spécialisé primo-arrivants pour 150€ avec accompagnement personnalisé complet.

  **Accompagnement 24h/24 :**
  - Conseiller dédié personnel
  - Support WhatsApp permanent
  - Aide administrative
  - Motivation et encouragement
  - Suivi progression quotidien

  **Plateforme e-learning :**
  - Accès cours complets
  - Vidéos pédagogiques
  - Exercices interactifs
  - Évaluations en ligne
  - Ressources téléchargeables

  **Enseignement général :**
  - Mathématiques appliquées
  - Français technique
  - Communication professionnelle
  - Culture générale automobile
  - Préparation examens

  **Insertion professionnelle :**
  - CV optimisé automatique
  - Lettres motivation personnalisées
  - Préparation entretiens
  - Réseau entreprises partenaires
  - Suivi post-formation 6 mois

  **Prix révolutionnaire :**
  - 150€ seulement (vs 3500€ marché)
  - Financement 0% possible
  - Paiement en 3x sans frais
  - Garantie satisfaction',
  ARRAY['primo-arrivant', 'coaching', 'insertion', 'accompagnement', 'personnalisé'],
  2,
  ARRAY['formation'],
  ARRAY['tous constructeurs']
);

-- Mise à jour codes diagnostic spécialisés
INSERT INTO diagnostic_codes (code, system_type, description, symptoms, possible_causes, diagnostic_steps, repair_procedures, tools_required, estimated_time_hours, estimated_cost_euros, severity, brands) VALUES
(
  'P1A00',
  'hybride',
  'Défaut système hybride - Batterie haute tension',
  ARRAY[
    'Voyant hybride allumé',
    'Perte de puissance électrique',
    'Mode dégradé activé',
    'Bruit ventilation batterie'
  ],
  ARRAY[
    'Surchauffe batterie HV',
    'Défaut cellule batterie',
    'Problème BMS',
    'Contacteur HV défaillant'
  ],
  ARRAY[
    'Vérifier température batterie',
    'Contrôler tension cellules',
    'Tester contacteurs HV',
    'Analyser historique défauts'
  ],
  ARRAY[
    'Isolation batterie HV',
    'Contrôle multimètre isolé',
    'Remplacement cellules défectueuses',
    'Calibrage BMS'
  ],
  ARRAY['Multimètre isolé', 'Gants isolants', 'Outil diagnostic constructeur'],
  2.5,
  850,
  'high',
  ARRAY['Toyota', 'Lexus', 'Honda']
),
(
  'U3000',
  'adas',
  'Défaut communication radar ADAS',
  ARRAY[
    'Régulateur adaptatif inactif',
    'Freinage d''urgence désactivé',
    'Voyant ADAS allumé',
    'Message tableau de bord'
  ],
  ARRAY[
    'Radar avant sale/obstrué',
    'Défaut alimentation radar',
    'Problème calibrage',
    'Défaut calculateur ADAS'
  ],
  ARRAY[
    'Nettoyer radar avant',
    'Vérifier alimentation 12V',
    'Contrôler géométrie véhicule',
    'Calibrer radar avec cibles'
  ],
  ARRAY[
    'Nettoyage radar',
    'Calibrage avec cibles',
    'Mise à jour logiciel',
    'Remplacement radar si défaillant'
  ],
  ARRAY['Cibles calibrage', 'Outil diagnostic', 'Logiciel constructeur'],
  1.5,
  450,
  'medium',
  ARRAY['Mercedes', 'BMW', 'Audi', 'Volvo']
);

-- Ajout contenu enseignement général spécialisé
INSERT INTO general_education (subject, level, title, content, exercises, solutions, keywords, difficulty_level, duration_minutes, is_mandatory) VALUES
(
  'mathematiques',
  'CAP',
  'Calculs Électriques Véhicules - Loi d''Ohm Appliquée',
  'Les calculs électriques sont essentiels pour diagnostiquer les véhicules électriques et hybrides.

  **Loi d''Ohm : U = R × I**
  - U : Tension en Volts (V)
  - R : Résistance en Ohms (Ω)  
  - I : Intensité en Ampères (A)

  **Applications pratiques :**
  - Calcul chute de tension
  - Dimensionnement câbles
  - Vérification résistances
  - Diagnostic circuits

  **Puissance électrique : P = U × I**
  - Calcul consommation
  - Dimensionnement fusibles
  - Échauffement composants

  **Exemples véhicules électriques :**
  - Batterie 400V, 100A → P = 40kW
  - Moteur 150kW → I = 375A sous 400V
  - Chargeur 22kW → I = 32A sous 400V triphasé',
  JSONB_BUILD_ARRAY(
    '{"question": "Calculer l''intensité d''un moteur de 75kW sous 400V", "type": "calcul"}',
    '{"question": "Quelle section de câble pour 200A ?", "type": "dimensionnement"}',
    '{"question": "Chute de tension sur 10m de câble 50mm²", "type": "application"}'
  ),
  JSONB_BUILD_ARRAY(
    '{"answer": "I = P/U = 75000/400 = 187.5A", "explanation": "Application directe loi d''Ohm"}',
    '{"answer": "Section 95mm² minimum", "explanation": "Selon norme NF C 15-100"}',
    '{"answer": "ΔU = R×I avec R=0.36mΩ/m", "explanation": "Calcul résistance linéique"}'
  ),
  ARRAY['électricité', 'loi ohm', 'puissance', 'véhicules électriques'],
  3,
  90,
  true
),
(
  'francais',
  'CAP',
  'Communication Client - Véhicules Électriques',
  'La communication avec les clients sur les véhicules électriques nécessite des compétences spécifiques.

  **Vocabulaire technique :**
  - Autonomie vs consommation
  - Recharge AC/DC
  - Régénération au freinage
  - Préchauffage habitacle

  **Explications clients :**
  - Avantages véhicules électriques
  - Coûts d''entretien réduits
  - Aides gouvernementales
  - Réseau de recharge

  **Gestion objections :**
  - "Autonomie insuffisante"
  - "Temps de recharge trop long"
  - "Prix d''achat élevé"
  - "Fiabilité batteries"

  **Rédaction devis :**
  - Interventions spécialisées
  - Pièces haute tension
  - Main d''œuvre qualifiée
  - Garanties spécifiques',
  JSONB_BUILD_ARRAY(
    '{"question": "Rédiger un devis maintenance VE", "type": "rédaction"}',
    '{"question": "Expliquer la régénération au client", "type": "communication"}',
    '{"question": "Répondre aux objections autonomie", "type": "argumentation"}'
  ),
  JSONB_BUILD_ARRAY(
    '{"answer": "Devis détaillé avec spécificités VE", "explanation": "Vocabulaire technique adapté"}',
    '{"answer": "Explication simple et imagée", "explanation": "Pédagogie client"}',
    '{"answer": "Arguments factuels et rassurants", "explanation": "Technique de vente"}'
  ),
  ARRAY['communication', 'client', 'véhicules électriques', 'devis'],
  2,
  60,
  true
),
(
  'anglais',
  'BAC_PRO',
  'Technical English - Electric Vehicles Vocabulary',
  'Vocabulaire technique anglais spécialisé véhicules électriques pour communication internationale.

  **Electric Vehicle Components:**
  - Battery pack : Pack batterie
  - Electric motor : Moteur électrique
  - Inverter : Onduleur
  - Charging port : Port de charge
  - Regenerative braking : Freinage régénératif

  **Charging Technology:**
  - AC charging : Charge courant alternatif
  - DC fast charging : Charge rapide continue
  - Wireless charging : Charge sans fil
  - Plug-in hybrid : Hybride rechargeable
  - Range extender : Prolongateur autonomie

  **Diagnostic Terms:**
  - Fault codes : Codes défauts
  - Battery management : Gestion batterie
  - Thermal management : Gestion thermique
  - High voltage safety : Sécurité haute tension
  - Insulation resistance : Résistance isolation

  **Documentation:**
  - Service manual : Manuel d''atelier
  - Wiring diagram : Schéma électrique
  - Technical bulletin : Bulletin technique
  - Recall notice : Rappel constructeur',
  JSONB_BUILD_ARRAY(
    '{"question": "Traduire ''freinage régénératif''", "type": "vocabulaire"}',
    '{"question": "Expliquer ''thermal runaway'' en français", "type": "technique"}',
    '{"question": "Rédiger email technique en anglais", "type": "communication"}'
  ),
  JSONB_BUILD_ARRAY(
    '{"answer": "Regenerative braking", "explanation": "Terme technique standard"}',
    '{"answer": "Emballement thermique batterie", "explanation": "Phénomène critique"}',
    '{"answer": "Email professionnel structuré", "explanation": "Communication internationale"}'
  ),
  ARRAY['anglais technique', 'véhicules électriques', 'vocabulaire', 'international'],
  3,
  75,
  false
);

-- Mise à jour procédures maintenance
INSERT INTO maintenance_procedures (procedure_name, steps, tools_required, safety_warnings, estimated_duration_minutes, difficulty_level, cost_estimate_euros, frequency_km, frequency_months) VALUES
(
  'Contrôle Sécurité Véhicule Électrique',
  JSONB_BUILD_ARRAY(
    '{"step": 1, "title": "Vérification habilitation", "description": "Contrôler validité habilitation B0L minimum"}',
    '{"step": 2, "title": "EPI obligatoires", "description": "Porter gants isolants, chaussures sécurité, lunettes"}',
    '{"step": 3, "title": "Consignation véhicule", "description": "Couper contact, retirer clé, attendre 5 minutes"}',
    '{"step": 4, "title": "Test absence tension", "description": "Vérifier absence tension avec VAT"}',
    '{"step": 5, "title": "Intervention sécurisée", "description": "Procéder aux opérations de maintenance"}'
  ),
  ARRAY['Gants isolants classe 0', 'VAT (Vérificateur Absence Tension)', 'Chaussures sécurité', 'Lunettes protection'],
  ARRAY[
    'Ne jamais intervenir sous tension',
    'Respecter procédures consignation',
    'Porter EPI en permanence',
    'Formation habilitation obligatoire'
  ],
  45,
  4,
  120,
  20000,
  12
),
(
  'Maintenance Batterie Véhicule Hydrogène',
  JSONB_BUILD_ARRAY(
    '{"step": 1, "title": "Contrôle étanchéité", "description": "Vérifier absence fuites H2 avec détecteur"}',
    '{"step": 2, "title": "Contrôle pression", "description": "Vérifier pression réservoir 700 bars"}',
    '{"step": 3, "title": "Test pile combustible", "description": "Contrôler tension et courant pile"}',
    '{"step": 4, "title": "Purge système", "description": "Purger eau produite par pile"}',
    '{"step": 5, "title": "Contrôle ventilation", "description": "Vérifier fonctionnement ventilation garage"}'
  ),
  ARRAY['Détecteur H2', 'Manomètre 700 bars', 'Multimètre isolé', 'EPI spécialisés'],
  ARRAY[
    'Ventilation garage obligatoire',
    'Détection H2 permanente',
    'Interdiction flammes/étincelles',
    'Formation spécialisée requise'
  ],
  90,
  5,
  200,
  15000,
  6
);

-- Mise à jour produits avec nouveaux prix
INSERT INTO products (name, description, type, is_active, metadata) VALUES
(
  'Formation Prévention Risques Électriques',
  'Habilitations B0L, BCL, B2L, B2VL - 2 jours présentiel ou distanciel',
  'one_time',
  true,
  '{"duration": "2 jours", "certifications": ["B0L", "BCL", "B2L", "B2VL"], "modality": "présentiel ou distanciel"}'
),
(
  'Formation Véhicules Hydrogène FCEV',
  'Formation complète pile à combustible - 1 jour distanciel',
  'one_time',
  true,
  '{"duration": "1 jour", "modality": "distanciel", "specialty": "hydrogène"}'
),
(
  'Formation Véhicules Hybrides',
  'HEV/PHEV - 1 jour présentiel ou distanciel',
  'one_time',
  true,
  '{"duration": "1 jour", "modality": "présentiel ou distanciel", "specialty": "hybride"}'
),
(
  'Formation ADAS',
  'Systèmes aide à la conduite - Formation distanciel',
  'one_time',
  true,
  '{"duration": "formation distanciel", "specialty": "ADAS", "modality": "distanciel"}'
),
(
  'Formation Climatisation Moderne',
  'R1234yf et pompes à chaleur - Formation distanciel',
  'one_time',
  true,
  '{"duration": "formation distanciel", "specialty": "climatisation", "modality": "distanciel"}'
),
(
  'Coaching Primo-Arrivants',
  'Accompagnement personnalisé 12 mois',
  'service',
  true,
  '{"duration": "12 mois", "support": "24h/24", "target": "primo-arrivants"}'
);

-- Ajout des prix correspondants
INSERT INTO prices (product_id, amount, currency, interval, is_active) 
SELECT p.id, 
  CASE 
    WHEN p.name = 'Formation Prévention Risques Électriques' THEN 95000
    WHEN p.name = 'Formation Véhicules Hydrogène FCEV' THEN 15000
    WHEN p.name = 'Formation Véhicules Hybrides' THEN 35000
    WHEN p.name = 'Formation ADAS' THEN 20000
    WHEN p.name = 'Formation Climatisation Moderne' THEN 15000
    WHEN p.name = 'Coaching Primo-Arrivants' THEN 15000
  END,
  'eur',
  'one_time',
  true
FROM products p 
WHERE p.name IN (
  'Formation Prévention Risques Électriques',
  'Formation Véhicules Hydrogène FCEV', 
  'Formation Véhicules Hybrides',
  'Formation ADAS',
  'Formation Climatisation Moderne',
  'Coaching Primo-Arrivants'
);