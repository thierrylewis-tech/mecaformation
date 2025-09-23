/*
  # Contenu Mécanique Automobile - Base de Données

  1. Contenu Spécialisé
    - Véhicules électriques et hybrides
    - Diagnostic électronique avancé
    - Systèmes modernes (ADAS, climatisation)
    - Procédures de maintenance

  2. Codes de Diagnostic
    - Codes OBD standards
    - Codes constructeurs spécifiques
    - Symptômes et solutions

  3. Systèmes Véhicules
    - Architecture complète
    - Composants détaillés
    - Évolutions technologiques
*/

-- Contenu mécanique automobile
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands) VALUES

-- VÉHICULES ÉLECTRIQUES
('Architecture des Véhicules Électriques BEV', 'moteur_electrique', 'Architecture générale', 
'Les véhicules électriques à batterie (BEV) utilisent un ou plusieurs moteurs électriques alimentés par une batterie rechargeable haute tension. L''architecture comprend : batterie lithium-ion (300-800V), onduleur de puissance, moteur électrique synchrone ou asynchrone, réducteur à rapport fixe, chargeur embarqué AC/DC, système de refroidissement liquide. L''absence de moteur thermique simplifie la mécanique mais complexifie l''électronique de puissance.', 
ARRAY['électrique', 'BEV', 'batterie', 'moteur électrique', 'onduleur'], 4, 
ARRAY['electrique'], ARRAY['Tesla', 'Nissan', 'Renault', 'BMW']),

('Batteries Lithium-Ion et Gestion Thermique', 'moteur_electrique', 'Batteries', 
'Les batteries Li-ion automobile utilisent différentes chimies : LFP (sécurité), NMC (densité énergétique), LTO (longévité). La gestion thermique est critique : refroidissement liquide avec glycol, chauffage par résistances PTC, monitoring température par cellule. Le BMS (Battery Management System) surveille tension, courant, température de chaque cellule et équilibre les charges. Durée de vie : 8-15 ans selon usage et climat.', 
ARRAY['batterie', 'lithium', 'BMS', 'refroidissement', 'gestion thermique'], 5, 
ARRAY['electrique', 'hybride'], ARRAY['Tesla', 'BMW', 'Mercedes']),

('Systèmes de Charge AC et DC', 'moteur_electrique', 'Recharge', 
'Charge AC (courant alternatif) : 3.7kW à 22kW via chargeur embarqué, connecteurs Type 2. Charge DC (courant continu) : 50kW à 350kW directement dans la batterie, connecteurs CCS ou CHAdeMO. La charge rapide nécessite refroidissement actif et communication CAN entre véhicule et borne. Courbes de charge : puissance maximale jusqu''à 80%, puis réduction progressive pour protéger la batterie.', 
ARRAY['charge', 'AC', 'DC', 'CCS', 'CHAdeMO', 'Type 2'], 4, 
ARRAY['electrique'], ARRAY['Tesla', 'Audi', 'Porsche']),

-- VÉHICULES HYBRIDES
('Architectures Hybrides : Série, Parallèle, Mixte', 'hybride', 'Architectures', 
'Hybride série : moteur thermique génère électricité, moteur électrique propulse (BMW i3 REX). Hybride parallèle : les deux moteurs peuvent propulser (Toyota Prius). Hybride mixte : combine série et parallèle selon conditions (Toyota Prius 4). L''hybride rechargeable (PHEV) ajoute une prise de charge externe. La gestion énergétique optimise automatiquement l''utilisation des moteurs selon efficacité, charge batterie et demande conducteur.', 
ARRAY['hybride', 'série', 'parallèle', 'PHEV', 'Toyota'], 4, 
ARRAY['hybride'], ARRAY['Toyota', 'Honda', 'BMW']),

('Récupération d''Énergie au Freinage', 'hybride', 'Récupération énergie', 
'Le freinage régénératif convertit l''énergie cinétique en électricité via le moteur électrique utilisé en générateur. Trois modes : récupération légère (décélération naturelle), modérée (freinage normal), intensive (freinage d''urgence). Le système dose automatiquement entre freinage régénératif et friction selon intensité demandée. Récupération optimale entre 30-80 km/h. Gain d''autonomie : 15-25% en ville.', 
ARRAY['freinage', 'régénératif', 'récupération', 'énergie'], 3, 
ARRAY['hybride', 'electrique'], ARRAY['Toyota', 'Tesla', 'BMW']),

-- DIAGNOSTIC ÉLECTRONIQUE
('Protocoles de Communication Automobile', 'electronique', 'Réseaux', 
'CAN (Controller Area Network) : réseau principal 500 kbps, communication entre calculateurs. LIN (Local Interconnect Network) : réseau secondaire 20 kbps pour capteurs simples. FlexRay : réseau haute vitesse 10 Mbps pour systèmes critiques (direction, freinage). Ethernet : 100 Mbps pour infotainment et caméras. OBD : interface diagnostic standardisée. Chaque réseau a ses spécificités de diagnostic et de programmation.', 
ARRAY['CAN', 'LIN', 'FlexRay', 'OBD', 'diagnostic', 'réseaux'], 5, 
ARRAY['thermique', 'electrique', 'hybride'], ARRAY['Mercedes', 'BMW', 'Audi']),

('Diagnostic avec Oscilloscope Automobile', 'diagnostic', 'Outils avancés', 
'L''oscilloscope automobile analyse les signaux électriques en temps réel : capteurs (position, vitesse, pression), actionneurs (injecteurs, bobines), communications (CAN, LIN). Mesures typiques : signal capteur vilebrequin (dents manquantes), forme d''onde injecteurs (temps d''ouverture), communication CAN (niveaux logiques). Sonde différentielle obligatoire pour haute tension (véhicules électriques/hybrides). Analyse spectrale pour détection parasites.', 
ARRAY['oscilloscope', 'signaux', 'capteurs', 'diagnostic avancé'], 5, 
ARRAY['thermique', 'electrique', 'hybride'], ARRAY['Bosch', 'Fluke', 'Pico']),

-- SYSTÈMES ADAS
('Systèmes d''Aide à la Conduite ADAS', 'adas', 'Assistance conduite', 
'ADAS (Advanced Driver Assistance Systems) : AEB (freinage d''urgence autonome), ACC (régulateur adaptatif), LKA (maintien de voie), BSD (détection angle mort), TSR (reconnaissance panneaux). Capteurs : radars 24/77 GHz, caméras haute résolution, lidars, ultrasons. Fusion de données multi-capteurs par calculateur central. Calibrage obligatoire après remplacement pare-brise ou géométrie. Évolution vers conduite autonome niveau 3-4.', 
ARRAY['ADAS', 'AEB', 'ACC', 'LKA', 'radar', 'caméra', 'calibrage'], 5, 
ARRAY['thermique', 'electrique', 'hybride'], ARRAY['Mercedes', 'BMW', 'Audi', 'Tesla']),

-- CLIMATISATION MODERNE
('Climatisation R1234yf et Pompes à Chaleur', 'climatisation', 'Nouveaux fluides', 
'Le fluide R1234yf remplace le R134a (réglementation environnementale). Propriétés : moins polluant (GWP=4 vs 1430), mais inflammable (classe A2L). Nécessite équipements spécifiques et formation. Pompes à chaleur sur véhicules électriques : récupèrent calories air extérieur, optimisent autonomie (-30% consommation chauffage). Systèmes multi-zones : contrôle indépendant température par zone. Diagnostic : pressions, températures, débits, qualité air.', 
ARRAY['climatisation', 'R1234yf', 'pompe chaleur', 'multi-zones'], 4, 
ARRAY['thermique', 'electrique'], ARRAY['Mercedes', 'BMW', 'Audi']);

-- Contenu enseignement général
INSERT INTO general_education (subject, level, title, content, exercises, keywords, difficulty_level, duration_minutes) VALUES

-- MATHÉMATIQUES
('mathematiques', 'CAP', 'Calculs de Puissance et Couple Moteur', 
'Puissance (P) = Couple (C) × Vitesse angulaire (ω). P en Watts, C en N.m, ω en rad/s. Conversion : P(ch) = P(kW) × 1.36. Couple moteur électrique : constant de 0 à vitesse nominale, puis décroît. Rendement moteur électrique : 90-95% vs 35-40% thermique. Calculs pratiques : consommation, autonomie, temps de charge. Unités : kW, kWh, Ah, V. Formules essentielles pour diagnostic et maintenance.', 
'[{"question": "Calculer la puissance d''un moteur développant 200 N.m à 3000 tr/min", "answer": "P = 200 × (3000×2π/60) = 62.8 kW = 85 ch"}]', 
ARRAY['puissance', 'couple', 'moteur', 'calculs'], 3, 90),

('mathematiques', 'BAC_PRO', 'Géométrie et Alignement des Roues', 
'Angles de géométrie : carrossage (inclinaison roue), chasse (inclinaison pivot), pincement (convergence/divergence). Mesures en degrés et minutes. Calculs trigonométriques pour réglages. Parallélisme : différence angles roues gauche/droite. Hauteur de caisse : influence sur géométrie. Outils : banc géométrie laser, règles de parallélisme. Tolérances constructeur : ±30'' pour carrossage, ±15'' pour pincement.', 
'[{"question": "Convertir un carrossage de 1°30'' en décimal", "answer": "1°30'' = 1 + 30/60 = 1.5°"}]', 
ARRAY['géométrie', 'alignement', 'carrossage', 'pincement'], 4, 120),

-- FRANÇAIS TECHNIQUE
('francais', 'CAP', 'Rédaction de Rapports d''Intervention', 
'Structure rapport : en-tête (date, véhicule, client), constat initial (symptômes décrits), diagnostic (tests effectués, codes lus), intervention (pièces changées, réglages), contrôle final (tests validation), recommandations (maintenance préventive). Vocabulaire technique précis, phrases courtes et claires. Éviter jargon, expliquer termes techniques. Présentation soignée, orthographe irréprochable. Signature et cachet obligatoires.', 
'[{"question": "Rédiger un rapport pour remplacement plaquettes de frein", "answer": "Voir modèle type avec structure complète"}]', 
ARRAY['rapport', 'intervention', 'vocabulaire technique'], 2, 60),

('francais', 'BAC_PRO', 'Communication Client et Devis', 
'Accueil client : écoute active, reformulation problème, questions ouvertes. Explication technique : vulgarisation sans simplification excessive, schémas si nécessaire, comparaisons concrètes. Devis : détail interventions, justification prix, délais réalistes, conditions générales. Négociation : arguments techniques, valeur ajoutée, garanties. Suivi : information avancement, validation étapes importantes, facturation claire.', 
'[{"question": "Expliquer à un client pourquoi changer les 4 plaquettes", "answer": "Sécurité, usure homogène, économies long terme"}]', 
ARRAY['communication', 'client', 'devis', 'négociation'], 3, 90),

-- ANGLAIS TECHNIQUE
('anglais', 'CAP', 'Vocabulaire Technique Automobile Anglais', 
'Composants moteur : engine (moteur), cylinder (cylindre), piston, crankshaft (vilebrequin), camshaft (arbre à cames), valve (soupape), spark plug (bougie), fuel injector (injecteur). Systèmes : braking system (freinage), steering (direction), suspension, transmission (boîte vitesses), exhaust (échappement). Outils : wrench (clé), screwdriver (tournevis), multimeter (multimètre), diagnostic scanner (valise diagnostic). Fluides : oil (huile), coolant (liquide refroidissement), brake fluid (liquide frein).', 
'[{"question": "Traduire : Le moteur surchauffe", "answer": "The engine is overheating"}]', 
ARRAY['vocabulaire', 'anglais', 'technique', 'automobile'], 2, 45),

('anglais', 'BTS', 'Documentation Technique Internationale', 
'Lecture documentation constructeur anglaise : service manual (manuel atelier), wiring diagram (schéma électrique), troubleshooting guide (guide dépannage), technical bulletin (bulletin technique), recall notice (rappel constructeur). Rédaction rapports internationaux : diagnostic report, repair procedure, quality control, warranty claim. Communication technique : conference call, technical presentation, training session, customer support.', 
'[{"question": "Rédiger un email technique en anglais pour un problème de transmission", "answer": "Voir modèle professionnel"}]', 
ARRAY['documentation', 'anglais technique', 'international'], 4, 120);

-- Codes de diagnostic courants
INSERT INTO diagnostic_codes (code, system_type, description, symptoms, possible_causes, diagnostic_steps, tools_required, estimated_time_hours, estimated_cost_euros, severity, brands) VALUES

('P0300', 'moteur', 'Ratés de combustion détectés', 
ARRAY['moteur qui broute', 'perte de puissance', 'voyant moteur allumé', 'consommation élevée'], 
ARRAY['bougies usées', 'bobines défaillantes', 'injecteurs encrassés', 'compression faible'], 
ARRAY['lecture codes défauts', 'test compression', 'contrôle bougies', 'test bobines', 'nettoyage injecteurs'], 
ARRAY['valise diagnostic', 'compressiomètre', 'multimètre', 'oscilloscope'], 
2.0, 150, 'medium', 
ARRAY['Peugeot', 'Renault', 'Volkswagen']),

('P0420', 'moteur', 'Efficacité catalyseur en dessous du seuil', 
ARRAY['voyant moteur', 'échec contrôle technique', 'odeur échappement'], 
ARRAY['catalyseur usé', 'sondes lambda défaillantes', 'fuite échappement'], 
ARRAY['test sondes lambda', 'mesure gaz échappement', 'contrôle étanchéité'], 
ARRAY['valise diagnostic', 'analyseur gaz', 'multimètre'], 
1.5, 800, 'high', 
ARRAY['Peugeot', 'Renault', 'Citroën']),

('B1234', 'electronique', 'Défaut capteur température habitacle', 
ARRAY['climatisation inefficace', 'température incorrecte', 'ventilation irrégulière'], 
ARRAY['capteur défaillant', 'câblage coupé', 'calculateur climatisation'], 
ARRAY['test résistance capteur', 'contrôle alimentation', 'diagnostic réseau CAN'], 
ARRAY['multimètre', 'valise diagnostic', 'schéma électrique'], 
1.0, 80, 'low', 
ARRAY['Mercedes', 'BMW', 'Audi']),

('U0100', 'electronique', 'Perte communication avec calculateur moteur', 
ARRAY['voyant moteur', 'mode dégradé', 'perte de puissance'], 
ARRAY['calculateur défaillant', 'câblage CAN coupé', 'alimentation manquante'], 
ARRAY['test réseau CAN', 'contrôle alimentations', 'diagnostic calculateur'], 
ARRAY['oscilloscope', 'multimètre', 'valise constructeur'], 
3.0, 1200, 'critical', 
ARRAY['Mercedes', 'BMW', 'Audi', 'Volkswagen']);

-- Systèmes véhicules
INSERT INTO vehicle_systems (system_name, category, description, components, operation_principle, maintenance_intervals, common_failures) VALUES

('Système de Freinage ABS/ESP', 'Sécurité Active', 
'Système antiblocage des roues et contrôle de stabilité électronique', 
'{"capteurs_vitesse": "4 capteurs roues", "calculateur": "ABS/ESP", "groupe_hydraulique": "pompe + électrovannes", "capteur_lacet": "gyroscope", "capteur_acceleration": "accéléromètre"}', 
'Surveillance vitesse roues en permanence, détection blocage, modulation pression freinage par électrovannes, intervention ESP selon trajectoire souhaitée vs réelle', 
'{"controle_capteurs": "20000_km", "purge_liquide": "40000_km", "test_systeme": "controle_technique"}', 
ARRAY['capteurs vitesse encrassés', 'calculateur défaillant', 'groupe hydraulique usé']),

('Moteur Électrique Synchrone', 'Propulsion Électrique', 
'Moteur électrique à aimants permanents pour véhicules électriques', 
'{"stator": "bobinages cuivre", "rotor": "aimants permanents", "capteur_position": "resolver", "refroidissement": "liquide glycol"}', 
'Champ magnétique tournant créé par bobinages stator, synchronisation avec rotor à aimants permanents, contrôle par onduleur MLI', 
'{"controle_isolement": "12_mois", "vidange_liquide": "60000_km", "controle_roulements": "100000_km"}', 
ARRAY['perte isolement', 'roulements usés', 'aimants démagnétisés']),

('Système AIRMATIC Mercedes', 'Suspension', 
'Suspension pneumatique adaptative Mercedes-Benz', 
'{"compresseur": "pompe air", "spheres": "4 coussins pneumatiques", "calculateur": "ADS", "capteurs_niveau": "4 capteurs hauteur", "electrovannes": "distribution air"}', 
'Ajustement automatique hauteur selon charge, mode conduite, vitesse. Amortissement variable selon conditions route', 
'{"controle_etancheite": "20000_km", "filtre_compresseur": "40000_km", "etalonnage": "apres_intervention"}', 
ARRAY['fuites coussins', 'compresseur défaillant', 'capteurs niveau']);

-- Procédures de maintenance
INSERT INTO maintenance_procedures (procedure_name, steps, tools_required, safety_warnings, estimated_duration_minutes, difficulty_level, cost_estimate_euros, frequency_km) VALUES

('Vidange Moteur Électrique - Réducteur', 
'[
  {"step": 1, "action": "Lever le véhicule et sécuriser", "details": "Utiliser pont ou chandelles, vérifier stabilité"},
  {"step": 2, "action": "Localiser bouchon vidange réducteur", "details": "Généralement sous le moteur électrique"},
  {"step": 3, "action": "Vidanger huile usagée", "details": "Récupérer dans bac étanche, noter quantité"},
  {"step": 4, "action": "Remplacer joint bouchon", "details": "Joint neuf obligatoire, couple de serrage spécifié"},
  {"step": 5, "action": "Remplir huile neuve", "details": "Huile spécifique véhicule électrique, quantité exacte"}
]', 
ARRAY['pont élévateur', 'bac récupération', 'clé dynamométrique', 'huile spécifique'], 
ARRAY['véhicule sécurisé avant intervention', 'huile chaude = brûlures', 'respect couple serrage'], 
45, 2, 80, 60000),

('Calibrage Caméra ADAS', 
'[
  {"step": 1, "action": "Vérification géométrie véhicule", "details": "Parallélisme et carrossage dans tolérances"},
  {"step": 2, "action": "Installation mire de calibrage", "details": "Distance exacte selon constructeur (3-6m)"},
  {"step": 3, "action": "Connexion valise diagnostic", "details": "Outil constructeur ou multimarque compatible"},
  {"step": 4, "action": "Lancement procédure calibrage", "details": "Suivre instructions écran, ne pas bouger véhicule"},
  {"step": 5, "action": "Validation et test système", "details": "Test fonctionnement LKA, AEB, reconnaissance panneaux"}
]', 
ARRAY['mire calibrage', 'valise diagnostic', 'banc géométrie'], 
ARRAY['véhicule immobile pendant calibrage', 'éclairage suffisant', 'mire positionnée précisément'], 
90, 4, 120, 0);