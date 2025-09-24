/*
  # Données initiales base de connaissances automobile

  1. Contenu Technique
    - Articles par technologie (thermique, électrique, hybride, etc.)
    - Codes de diagnostic courants
    - Procédures de maintenance
    - Systèmes véhicules

  2. Enseignement Général
    - Mathématiques appliquées automobile
    - Français technique
    - Anglais professionnel
*/

-- Insertion des connaissances automobiles par technologie

-- VÉHICULES THERMIQUES
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Fonctionnement du moteur 4 temps', 'moteur_thermique', 'Moteurs essence', 
'Le moteur 4 temps fonctionne selon le cycle de Beau de Rochas : admission, compression, combustion-détente, échappement. Chaque phase correspond à un demi-tour de vilebrequin.', 
ARRAY['moteur', '4 temps', 'cycle', 'beau de rochas', 'essence'], 2, ARRAY['thermique'], ARRAY['toutes marques']),

('Injection directe essence', 'moteur_thermique', 'Systèmes injection', 
'L''injection directe essence permet une meilleure combustion en injectant le carburant directement dans la chambre de combustion. Améliore rendement et réduit consommation.', 
ARRAY['injection', 'directe', 'essence', 'combustion', 'rendement'], 3, ARRAY['thermique'], ARRAY['volkswagen', 'audi', 'mercedes']),

('Turbocompresseur et suralimentation', 'moteur_thermique', 'Suralimentation', 
'Le turbocompresseur utilise les gaz d''échappement pour comprimer l''air d''admission, augmentant la puissance sans augmenter la cylindrée.', 
ARRAY['turbo', 'suralimentation', 'puissance', 'gaz echappement'], 4, ARRAY['thermique'], ARRAY['toutes marques']);

-- VÉHICULES ÉLECTRIQUES
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Architecture véhicule électrique BEV', 'moteur_electrique', 'Architecture générale', 
'Un véhicule électrique BEV comprend : pack batterie, moteur électrique, onduleur, chargeur embarqué, système de refroidissement. Pas de moteur thermique.', 
ARRAY['BEV', 'batterie', 'moteur electrique', 'onduleur', 'architecture'], 3, ARRAY['electrique'], ARRAY['tesla', 'nissan', 'renault']),

('Batteries lithium-ion automobile', 'moteur_electrique', 'Stockage énergie', 
'Les batteries Li-ion automobile utilisent différentes chimies : NMC, LFP, NCA. Gestion thermique et BMS essentiels pour performance et sécurité.', 
ARRAY['batterie', 'lithium', 'BMS', 'thermique', 'chimie'], 4, ARRAY['electrique'], ARRAY['tesla', 'bmw', 'mercedes']),

('Moteurs électriques synchrones', 'moteur_electrique', 'Moteurs électriques', 
'Les moteurs synchrones à aimants permanents offrent excellent rendement (>95%). Contrôlés par onduleur avec modulation PWM.', 
ARRAY['moteur synchrone', 'aimants', 'rendement', 'onduleur', 'PWM'], 5, ARRAY['electrique'], ARRAY['tesla', 'bmw']);

-- VÉHICULES HYBRIDES
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Systèmes hybrides Toyota HSD', 'hybride', 'Architecture hybride', 
'Le système HSD (Hybrid Synergy Drive) combine moteur thermique, deux moteurs électriques et train épicycloïdal pour optimiser efficacité.', 
ARRAY['HSD', 'toyota', 'epicycloidal', 'hybride', 'efficacite'], 4, ARRAY['hybride'], ARRAY['toyota', 'lexus']),

('Batteries hybrides NiMH vs Li-ion', 'hybride', 'Stockage énergie', 
'Les batteries hybrides NiMH (Toyota) sont robustes mais lourdes. Les Li-ion (Honda, BMW) sont plus légères mais nécessitent refroidissement actif.', 
ARRAY['batterie hybride', 'NiMH', 'Li-ion', 'refroidissement'], 3, ARRAY['hybride'], ARRAY['toyota', 'honda', 'bmw']),

('Récupération énergie au freinage', 'hybride', 'Récupération énergie', 
'Le freinage régénératif convertit l''énergie cinétique en électricité via le moteur électrique fonctionnant en générateur.', 
ARRAY['regeneratif', 'freinage', 'energie', 'generateur'], 3, ARRAY['hybride', 'electrique'], ARRAY['toutes marques']);

-- VÉHICULES HYDROGÈNE
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Pile à combustible PEMFC', 'hydrogene', 'Pile à combustible', 
'La pile PEMFC (Proton Exchange Membrane) convertit hydrogène et oxygène en électricité avec comme seul déchet de l''eau pure.', 
ARRAY['pile combustible', 'PEMFC', 'hydrogene', 'oxygene', 'eau'], 5, ARRAY['hydrogene'], ARRAY['toyota', 'hyundai', 'honda']),

('Stockage hydrogène 700 bars', 'hydrogene', 'Stockage H2', 
'L''hydrogène est stocké sous 700 bars dans des réservoirs en fibre de carbone. Système de sécurité avec détecteurs de fuite.', 
ARRAY['stockage', '700 bars', 'fibre carbone', 'securite', 'fuite'], 4, ARRAY['hydrogene'], ARRAY['toyota', 'hyundai']),

('Station hydrogène et ravitaillement', 'hydrogene', 'Infrastructure', 
'Le plein d''hydrogène prend 3-5 minutes. Connecteur standardisé, pression contrôlée automatiquement. Autonomie 400-600 km.', 
ARRAY['station', 'ravitaillement', 'connecteur', 'autonomie'], 2, ARRAY['hydrogene'], ARRAY['toutes marques']);

-- VÉHICULES GPL
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Installation système GPL', 'gpl', 'Installation', 
'L''installation GPL comprend : réservoir torique, détendeur, rail injecteurs gaz, calculateur, commutateur essence/gaz.', 
ARRAY['GPL', 'installation', 'detendeur', 'injecteurs', 'calculateur'], 3, ARRAY['gpl'], ARRAY['toutes marques']),

('Réglementation GPL France', 'gpl', 'Réglementation', 
'Contrôle décennal obligatoire du réservoir GPL. Interdiction parkings souterrains. Homologation UTAC nécessaire.', 
ARRAY['reglementation', 'controle', 'homologation', 'UTAC'], 2, ARRAY['gpl'], ARRAY['toutes marques']),

('Maintenance système GPL', 'gpl', 'Maintenance', 
'Maintenance spécifique : contrôle étanchéité, nettoyage injecteurs gaz, vérification détendeur, test commutateur.', 
ARRAY['maintenance', 'etancheite', 'injecteurs', 'detendeur'], 3, ARRAY['gpl'], ARRAY['toutes marques']);

-- SYSTÈMES ADAS
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Systèmes ADAS - Vue d''ensemble', 'adas', 'Généralités', 
'Les ADAS incluent : AEB (freinage urgence), ACC (régulateur adaptatif), LKA (maintien voie), BSM (surveillance angles morts).', 
ARRAY['ADAS', 'AEB', 'ACC', 'LKA', 'BSM', 'securite'], 3, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['toutes marques']),

('Calibrage caméras ADAS', 'adas', 'Calibrage', 
'Le calibrage des caméras ADAS nécessite un environnement contrôlé, mires spécifiques et outils de calibrage certifiés constructeur.', 
ARRAY['calibrage', 'cameras', 'mires', 'outils'], 5, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['mercedes', 'bmw', 'audi']),

('Capteurs radar et lidar', 'adas', 'Capteurs', 
'Les radars (24/77 GHz) détectent objets métalliques. Les lidars mesurent distances précises. Fusion de données pour décision.', 
ARRAY['radar', 'lidar', 'capteurs', 'fusion', 'detection'], 4, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['mercedes', 'bmw', 'volvo']);

-- DIAGNOSTIC ÉLECTRONIQUE
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES
('Protocoles de communication CAN', 'diagnostic', 'Réseaux embarqués', 
'Le bus CAN permet communication entre calculateurs. Vitesses 125 kbps (CAN-C) à 1 Mbps (CAN-B). Diagnostic via OBD.', 
ARRAY['CAN', 'communication', 'calculateurs', 'OBD', 'diagnostic'], 4, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['toutes marques']),

('Multiplexage automobile', 'diagnostic', 'Électronique', 
'Le multiplexage réduit le câblage en partageant informations sur bus de données. Réseaux CAN, LIN, FlexRay selon applications.', 
ARRAY['multiplexage', 'cablage', 'CAN', 'LIN', 'FlexRay'], 4, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['toutes marques']),

('Diagnostic OBD-II avancé', 'diagnostic', 'Outils diagnostic', 
'L''OBD-II donne accès aux codes défauts, paramètres temps réel, tests actionneurs. Mode 6 pour surveillance continue.', 
ARRAY['OBD-II', 'codes defauts', 'parametres', 'actionneurs', 'mode 6'], 3, ARRAY['thermique', 'electrique', 'hybride'], ARRAY['toutes marques']);

-- Insertion codes de diagnostic courants
INSERT INTO diagnostic_codes (code, system_type, description, symptoms, possible_causes, diagnostic_steps, repair_procedures, tools_required, estimated_time_hours, estimated_cost_euros, severity, brands) VALUES
('P0300', 'moteur', 'Ratés de combustion détectés sur plusieurs cylindres', 
ARRAY['Moteur qui broute', 'Perte de puissance', 'Voyant moteur allumé', 'Ralenti instable'], 
ARRAY['Bougies usées', 'Bobines défaillantes', 'Injecteurs encrassés', 'Compression faible'], 
ARRAY['Contrôler bougies', 'Tester bobines', 'Mesurer compression', 'Vérifier injecteurs'], 
ARRAY['Remplacer bougies', 'Changer bobines défaillantes', 'Nettoyer injecteurs'], 
ARRAY['Multimètre', 'Compressiomètre', 'Oscilloscope'], 2.0, 250, 'medium', 
ARRAY['toutes marques']),

('P0420', 'moteur', 'Efficacité catalyseur en dessous du seuil', 
ARRAY['Consommation élevée', 'Émissions polluantes', 'Voyant moteur'], 
ARRAY['Catalyseur encrassé', 'Sondes lambda défaillantes', 'Fuite échappement'], 
ARRAY['Tester sondes lambda', 'Contrôler catalyseur', 'Vérifier étanchéité'], 
ARRAY['Remplacer catalyseur', 'Changer sondes lambda'], 
ARRAY['Multimètre', 'Analyseur gaz'], 3.0, 800, 'high', 
ARRAY['toutes marques']),

('B1234', 'electronique', 'Capteur de température défaillant', 
ARRAY['Affichage température erroné', 'Climatisation inefficace'], 
ARRAY['Capteur HS', 'Câblage coupé', 'Connecteur oxydé'], 
ARRAY['Tester capteur', 'Vérifier continuité', 'Contrôler alimentation'], 
ARRAY['Remplacer capteur', 'Réparer câblage'], 
ARRAY['Multimètre', 'Schéma électrique'], 1.0, 120, 'low', 
ARRAY['toutes marques']),

('U0100', 'electronique', 'Perte de communication avec ECU moteur', 
ARRAY['Voyant moteur', 'Mode dégradé', 'Perte de puissance'], 
ARRAY['Calculateur HS', 'Bus CAN coupé', 'Alimentation défaillante'], 
ARRAY['Tester bus CAN', 'Vérifier alimentation ECU', 'Scanner réseau'], 
ARRAY['Remplacer ECU', 'Réparer bus CAN'], 
ARRAY['Scanner OBD', 'Multimètre', 'Oscilloscope'], 4.0, 1200, 'critical', 
ARRAY['toutes marques']);

-- Insertion systèmes véhicules
INSERT INTO vehicle_systems (system_name, category, description, components, operation_principle, maintenance_intervals, common_failures, safety_precautions) VALUES
('Système de freinage ABS', 'freinage', 'Système antiblocage des roues', 
'{"composants": ["Capteurs de roue", "Calculateur ABS", "Groupe hydraulique", "Voyant tableau bord"]}',
'Détection blocage roue par capteurs, modulation pression freinage par électrovannes',
'{"vidange_liquide": "24_mois", "controle_capteurs": "12_mois"}',
ARRAY['Capteurs encrassés', 'Calculateur défaillant', 'Fuite hydraulique'],
ARRAY['Liquide de frein corrosif', 'Pression hydraulique élevée']),

('Pack batterie véhicule électrique', 'electrique', 'Stockage énergie électrique', 
'{"composants": ["Cellules Li-ion", "BMS", "Contacteurs HT", "Système refroidissement", "Fusible pyrotechnique"]}',
'Stockage énergie électrique, gestion par BMS, refroidissement liquide ou air',
'{"controle_BMS": "6_mois", "test_isolation": "12_mois"}',
ARRAY['Dégradation cellules', 'Défaut BMS', 'Fuite refroidissement'],
ARRAY['Haute tension 400-800V', 'Risque électrocution', 'Habilitation B2VL requise']);

-- Insertion procédures de maintenance
INSERT INTO maintenance_procedures (procedure_name, steps, tools_required, safety_warnings, estimated_duration_minutes, difficulty_level, cost_estimate_euros, frequency_km, frequency_months) VALUES
('Vidange moteur thermique', 
'[
  {"etape": 1, "description": "Chauffer le moteur à température de service"},
  {"etape": 2, "description": "Déposer le bouchon de vidange"},
  {"etape": 3, "description": "Vidanger huile usagée"},
  {"etape": 4, "description": "Remplacer le filtre à huile"},
  {"etape": 5, "description": "Remplir avec huile neuve selon préconisations"}
]',
ARRAY['Clé à vidange', 'Bac de récupération', 'Entonnoir', 'Chiffons'],
ARRAY['Huile chaude - risque brûlure', 'Respecter couple de serrage bouchon'],
45, 2, 80, 15000, 12),

('Contrôle batterie véhicule électrique', 
'[
  {"etape": 1, "description": "Consigner le véhicule (coupure HT)"},
  {"etape": 2, "description": "Vérifier isolation avec mégohmmètre"},
  {"etape": 3, "description": "Contrôler équilibrage cellules"},
  {"etape": 4, "description": "Tester BMS et capteurs"},
  {"etape": 5, "description": "Vérifier refroidissement batterie"}
]',
ARRAY['Mégohmmètre', 'Scanner constructeur', 'EPI haute tension'],
ARRAY['Haute tension mortelle', 'Habilitation B2VL obligatoire', 'Procédure consignation'],
120, 5, 200, 20000, 6);

-- Insertion enseignement général
INSERT INTO general_education (subject, level, title, content, exercises, solutions, keywords, difficulty_level, duration_minutes) VALUES
('mathematiques', 'CAP', 'Calculs de puissance et couple moteur', 
'La puissance (P) en watts se calcule : P = C × ω, où C est le couple en Nm et ω la vitesse angulaire en rad/s. Conversion : P(ch) = P(kW) × 1.36',
'[
  {"question": "Un moteur développe 200 Nm à 3000 tr/min. Calculer la puissance en kW.", "type": "calcul"},
  {"question": "Convertir 150 ch en kW.", "type": "conversion"}
]',
'[
  {"reponse": "P = 200 × (3000×2π/60) = 62.8 kW", "explication": "ω = 2πN/60"},
  {"reponse": "150 ch = 150/1.36 = 110.3 kW", "explication": "Division par 1.36"}
]',
ARRAY['puissance', 'couple', 'vitesse angulaire', 'conversion'], 3, 60),

('francais', 'BAC_PRO', 'Rédaction rapport d''intervention', 
'Un rapport d''intervention doit être clair, précis et structuré : contexte, diagnostic, actions réalisées, recommandations.',
'[
  {"question": "Rédiger un rapport pour remplacement plaquettes de frein", "type": "redaction"},
  {"question": "Expliquer à un client le fonctionnement de l''ABS", "type": "communication"}
]',
'[
  {"structure": "Date, véhicule, symptômes, diagnostic, intervention, contrôles, recommandations"},
  {"vulgarisation": "Système qui évite le blocage des roues au freinage pour garder le contrôle"}
]',
ARRAY['rapport', 'intervention', 'communication', 'client'], 2, 45),

('anglais', 'BTS', 'Vocabulaire technique automobile', 
'Terminologie anglaise essentielle : engine (moteur), transmission (boîte), brakes (freins), battery (batterie), diagnostic (diagnostic).',
'[
  {"question": "Traduire: Le moteur ne démarre pas", "type": "traduction"},
  {"question": "Expliquer en anglais le fonctionnement d''un turbo", "type": "explication"}
]',
'[
  {"traduction": "The engine does not start / The engine fails to start"},
  {"explication": "A turbocharger uses exhaust gases to compress intake air, increasing power output"}
]',
ARRAY['vocabulaire', 'technique', 'anglais', 'automobile'], 3, 50);

-- Insertion modules de formation
INSERT INTO training_modules (title, type, category, learning_objectives, estimated_duration_hours, difficulty_level) VALUES
('Formation Véhicules Électriques Complète', 'automotive', 'moteur_electrique',
ARRAY[
  'Comprendre l''architecture des véhicules électriques',
  'Maîtriser la sécurité haute tension',
  'Diagnostiquer les pannes spécifiques',
  'Effectuer la maintenance préventive'
], 40, 4),

('Diagnostic Avancé Multi-Technologies', 'automotive', 'diagnostic',
ARRAY[
  'Utiliser les outils de diagnostic professionnels',
  'Interpréter les codes défauts complexes',
  'Diagnostiquer véhicules thermiques, électriques, hybrides',
  'Optimiser les procédures de diagnostic'
], 60, 5),

('Mathématiques Appliquées Automobile', 'general_education', 'mathematiques',
ARRAY[
  'Maîtriser les calculs de puissance et couple',
  'Comprendre les conversions d''unités',
  'Appliquer la géométrie aux trains roulants',
  'Calculer les coûts et rentabilité'
], 30, 2);