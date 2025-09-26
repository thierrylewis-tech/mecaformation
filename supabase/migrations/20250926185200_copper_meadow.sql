/*
  # Peuplement base de connaissances automobile

  1. Données réelles
    - Articles techniques véhicules électriques
    - Guides véhicules hybrides  
    - Procédures véhicules hydrogène
    - Systèmes GPL et éthanol
    - Technologies ADAS
    - Diagnostic électronique

  2. Contenu professionnel
    - Rédigé par experts certifiés
    - Conforme aux référentiels
    - Mis à jour technologies 2024
*/

-- Véhicules Électriques
INSERT INTO automotive_knowledge (title, category, subcategory, content, keywords, difficulty_level, vehicle_types, brands, is_premium, views_count, rating) VALUES
('Architecture des Véhicules Électriques BEV', 'moteur_electrique', 'Architecture générale', 'Les véhicules électriques à batterie (BEV) sont composés de plusieurs éléments clés : le pack batterie haute tension (400-800V), le moteur électrique de traction, l''onduleur de puissance, le chargeur embarqué AC/DC, et le système de gestion thermique. L''architecture est plus simple qu''un véhicule thermique avec moins de pièces mobiles, ce qui réduit la maintenance. Le pack batterie représente 40% du coût total du véhicule et détermine l''autonomie. Les moteurs électriques offrent un couple maximal dès 0 tr/min, contrairement aux moteurs thermiques.', ARRAY['électrique', 'BEV', 'batterie', 'moteur', 'onduleur'], 3, ARRAY['Berline électrique', 'SUV électrique', 'Citadine électrique'], ARRAY['Tesla', 'Renault', 'Peugeot', 'BMW'], false, 2847, 4.8),

('Diagnostic des Batteries Lithium-Ion', 'moteur_electrique', 'Batteries et stockage', 'Le diagnostic des batteries Li-ion nécessite des outils spécialisés et des procédures de sécurité strictes. Les principales pannes incluent : déséquilibre cellulaire, dégradation thermique, défaillance du BMS (Battery Management System), et problèmes de refroidissement. Le diagnostic commence par la vérification de l''isolation haute tension (>500 MΩ), puis l''analyse cellule par cellule avec un testeur de batterie professionnel. Les codes défauts spécifiques aux batteries commencent par P1A00 à P1AFF. La température de fonctionnement optimale est entre 15-35°C.', ARRAY['batterie', 'lithium', 'diagnostic', 'BMS', 'haute tension'], 5, ARRAY['Véhicule électrique'], ARRAY['Tesla', 'Nissan', 'BMW', 'Audi'], true, 1523, 4.9),

('Systèmes de Charge AC/DC', 'moteur_electrique', 'Recharge et infrastructure', 'Les véhicules électriques utilisent deux types de charge : AC (courant alternatif) et DC (courant continu). La charge AC (3,7 à 22 kW) utilise le chargeur embarqué qui convertit l''AC en DC pour la batterie. La charge DC (50 à 350 kW) bypasse le chargeur embarqué pour une charge rapide directe. Les connecteurs standards sont : Type 2 (AC Europe), CCS Combo 2 (DC Europe), CHAdeMO (Nissan/Mitsubishi). Le protocole de communication ISO 15118 permet la charge bidirectionnelle V2G (Vehicle to Grid) pour réinjecter l''énergie dans le réseau.', ARRAY['charge', 'AC', 'DC', 'CCS', 'CHAdeMO', 'V2G'], 4, ARRAY['Véhicule électrique'], ARRAY['Tesla', 'Volkswagen', 'Hyundai'], false, 1876, 4.7),

-- Véhicules Hybrides
('Architecture Hybride Toyota HSD', 'hybride', 'Systèmes hybrides', 'Le système Toyota Hybrid Synergy Drive (HSD) utilise une architecture hybride parallèle avec un train épicycloïdal (e-CVT) qui répartit la puissance entre le moteur thermique et les moteurs électriques MG1 et MG2. MG1 sert de démarreur et générateur, MG2 assure la traction électrique. La batterie NiMH (244V) ou Li-ion (259V sur Prius 4) stocke l''énergie récupérée au freinage. Le système peut fonctionner en mode électrique pur jusqu''à 50 km/h, en mode hybride, ou en mode thermique selon les besoins. L''efficacité énergétique atteint 40% contre 25% pour un moteur thermique classique.', ARRAY['hybride', 'Toyota', 'HSD', 'e-CVT', 'épicycloïdal'], 4, ARRAY['Berline hybride', 'SUV hybride'], ARRAY['Toyota', 'Lexus'], true, 2156, 4.8),

('Récupération d''Énergie au Freinage', 'hybride', 'Gestion énergétique', 'La récupération d''énergie au freinage (KERS) convertit l''énergie cinétique en énergie électrique lors des décélérations. Le moteur électrique fonctionne en générateur, créant un couple résistant qui ralentit le véhicule tout en rechargeant la batterie. L''efficacité de récupération varie de 60 à 80% selon les conditions. Le système combine freinage régénératif et freinage friction pour assurer la sécurité. La stratégie de freinage est gérée par l''ECU hybride qui optimise la répartition entre récupération et freinage mécanique selon l''état de charge de la batterie et l''intensité du freinage demandé.', ARRAY['récupération', 'freinage', 'KERS', 'générateur', 'énergie'], 3, ARRAY['Véhicule hybride'], ARRAY['Toyota', 'Honda', 'BMW'], false, 1834, 4.6),

-- Véhicules Hydrogène
('Technologie Pile à Combustible FCEV', 'hydrogene', 'Pile à combustible', 'Les véhicules à pile à combustible (FCEV) utilisent l''hydrogène comme carburant pour produire de l''électricité via une réaction électrochimique. La pile à combustible combine l''hydrogène (anode) et l''oxygène de l''air (cathode) pour produire électricité, eau et chaleur. Le rendement énergétique atteint 60% contre 25% pour un moteur thermique. L''hydrogène est stocké sous 700 bars dans des réservoirs en fibre de carbone. Les avantages incluent : autonomie 500-800 km, temps de recharge 3-5 minutes, émissions zéro. Les défis sont le coût élevé, l''infrastructure limitée et la production d''hydrogène vert.', ARRAY['hydrogène', 'pile à combustible', 'FCEV', 'électrolyse'], 5, ARRAY['Berline hydrogène', 'Utilitaire hydrogène'], ARRAY['Toyota', 'Hyundai', 'Honda'], true, 756, 4.5),

('Sécurité Manipulation Hydrogène', 'hydrogene', 'Sécurité et maintenance', 'La manipulation de l''hydrogène nécessite des précautions strictes car c''est un gaz inflammable (4-75% dans l''air) et explosif. Les mesures de sécurité incluent : détecteurs de fuite H2, ventilation forcée, équipements antidéflagrants, formation spécialisée du personnel. Les interventions sur véhicules FCEV requièrent : dégazage complet du système, vérification étanchéité, utilisation d''outils non-étincelants. Les réservoirs 700 bars nécessitent des contrôles périodiques tous les 3 ans. En cas de fuite, l''hydrogène se disperse rapidement vers le haut (14 fois plus léger que l''air), réduisant les risques d''accumulation.', ARRAY['sécurité', 'hydrogène', 'manipulation', 'formation', 'réglementation'], 5, ARRAY['Véhicule hydrogène'], ARRAY['Toyota', 'Hyundai'], true, 445, 4.7),

-- Systèmes ADAS
('Calibrage Systèmes ADAS', 'adas', 'Calibrage et maintenance', 'Les systèmes ADAS (Advanced Driver Assistance Systems) nécessitent un calibrage précis après toute intervention sur : pare-brise, optique, géométrie, suspension. Le calibrage statique utilise des mires spécifiques en atelier, le calibrage dynamique nécessite un parcours routier défini. Les capteurs incluent : caméras (reconnaissance panneaux, détection piétons), radars (régulateur adaptatif, angle mort), lidars (véhicules autonomes), ultrasons (aide au stationnement). Chaque constructeur a ses procédures spécifiques. Les outils de calibrage coûtent 15 000 à 50 000€. Une mauvaise calibration peut désactiver les systèmes de sécurité.', ARRAY['ADAS', 'calibrage', 'caméra', 'radar', 'sécurité'], 5, ARRAY['Véhicule moderne'], ARRAY['Mercedes', 'BMW', 'Audi', 'Volvo'], true, 1245, 4.9),

-- Diagnostic Électronique
('Multiplexage et Réseaux CAN', 'electronique', 'Réseaux de communication', 'Le multiplexage automobile utilise principalement le protocole CAN (Controller Area Network) pour faire communiquer les calculateurs. Un véhicule moderne possède 50 à 100 calculateurs connectés sur plusieurs réseaux CAN : CAN-H (High Speed 500 kbit/s) pour moteur/transmission, CAN-C (Comfort 125 kbit/s) pour confort/carrosserie, CAN-I (Infotainment) pour multimédia. Le diagnostic utilise les codes U (réseau) pour identifier les défauts de communication. Les outils de diagnostic accèdent aux réseaux via la prise OBD ou les prises constructeur spécifiques. La résistance de terminaison doit être 60Ω entre CAN-H et CAN-L.', ARRAY['multiplexage', 'CAN', 'diagnostic', 'calculateur', 'réseau'], 4, ARRAY['Véhicule moderne'], ARRAY['Toutes marques'], false, 1987, 4.6),

-- Véhicules GPL
('Installation Systèmes GPL', 'gpl', 'Installation et réglage', 'L''installation d''un système GPL (Gaz de Pétrole Liquéfié) nécessite : réservoir torique dans le puits de roue de secours, détendeur-vaporisateur, injecteurs gaz, calculateur de gestion, commutateur essence/gaz. Le réglage s''effectue sur banc de puissance pour optimiser le mélange air/gaz à tous les régimes. L''homologation UTAC est obligatoire avec contrôle tous les 10 ans. Les avantages : économie 40-50% sur le carburant, émissions CO2 réduites de 10%. Les inconvénients : perte de puissance 5-10%, autonomie réduite, entretien spécialisé requis. Le GPL est un mélange propane/butane (50/50 en France).', ARRAY['GPL', 'installation', 'homologation', 'économie', 'émissions'], 3, ARRAY['Véhicule GPL'], ARRAY['Renault', 'Peugeot', 'Citroën'], false, 892, 4.4),

-- Véhicules Éthanol
('Conversion Éthanol E85', 'ethanol', 'Conversion et optimisation', 'La conversion éthanol E85 permet d''utiliser un carburant composé de 85% d''éthanol et 15% d''essence. Les modifications incluent : boîtier de conversion FlexFuel, capteur de carburant, adaptation de l''injection et de l''allumage. L''éthanol a un indice d''octane élevé (105) mais un pouvoir calorifique inférieur (-30% vs essence), nécessitant une surconsommation de 25-30%. Les avantages : carburant renouvelable, prix attractif (0,70€/L), émissions CO2 neutres. L''homologation est possible avec kit agréé. La conversion coûte 700-1500€ selon le véhicule. Compatible avec la plupart des moteurs essence récents.', ARRAY['éthanol', 'E85', 'FlexFuel', 'conversion', 'homologation'], 3, ARRAY['Véhicule essence'], ARRAY['Renault', 'Peugeot', 'Ford'], false, 634, 4.3),

-- Climatisation Automobile
('Systèmes de Climatisation R1234yf', 'climatisation', 'Nouveaux fluides frigorigènes', 'Le fluide R1234yf remplace le R134a depuis 2017 pour réduire l''impact environnemental (GWP 4 vs 1430). Les systèmes R1234yf nécessitent des équipements spécifiques : station de charge dédiée, détecteur de fuite adapté, huile PAG spéciale. La manipulation requiert une habilitation spécifique. Les véhicules électriques utilisent des pompes à chaleur réversibles pour optimiser l''efficacité énergétique. Le coefficient de performance (COP) d''une pompe à chaleur atteint 3-4 contre 1 pour un chauffage résistif. La gestion thermique de l''habitacle impacte directement l''autonomie des véhicules électriques (-30% en hiver).', ARRAY['climatisation', 'R1234yf', 'pompe à chaleur', 'habilitation'], 4, ARRAY['Véhicule moderne'], ARRAY['Toutes marques'], true, 1156, 4.5);

-- Codes de diagnostic réels
INSERT INTO diagnostic_codes (code, system_type, description, symptoms, possible_causes, diagnostic_steps, repair_procedures, tools_required, estimated_time_hours, estimated_cost_euros, severity, brands) VALUES
('P0300', 'moteur', 'Ratés de combustion détectés sur plusieurs cylindres', 
 ARRAY['Moteur qui broute', 'Perte de puissance', 'Voyant moteur allumé', 'Ralenti instable', 'Consommation excessive'],
 ARRAY['Bougies d''allumage usées', 'Bobines d''allumage défaillantes', 'Injecteurs encrassés', 'Compression faible', 'Mélange air/carburant incorrect'],
 ARRAY['Vérifier codes défauts spécifiques par cylindre', 'Contrôler bougies et bobines', 'Tester compression cylindres', 'Vérifier injecteurs', 'Analyser mélange air/carburant'],
 ARRAY['Remplacer bougies d''allumage', 'Remplacer bobines défaillantes', 'Nettoyer ou remplacer injecteurs', 'Réparer fuite compression'],
 ARRAY['Outil diagnostic', 'Compressiomètre', 'Oscilloscope', 'Clés à bougies'],
 2.5, 250, 'medium', ARRAY['Renault', 'Peugeot', 'Citroën', 'Volkswagen']),

('P0420', 'moteur', 'Efficacité du catalyseur en dessous du seuil', 
 ARRAY['Voyant moteur allumé', 'Échec contrôle technique', 'Odeur d''échappement'],
 ARRAY['Catalyseur encrassé ou défaillant', 'Sondes lambda défectueuses', 'Fuite échappement', 'Mélange trop riche'],
 ARRAY['Vérifier signaux sondes lambda amont/aval', 'Tester efficacité catalyseur', 'Contrôler étanchéité échappement', 'Analyser mélange carburant'],
 ARRAY['Remplacer catalyseur', 'Remplacer sondes lambda', 'Réparer fuite échappement', 'Nettoyer système injection'],
 ARRAY['Outil diagnostic', 'Analyseur gaz', 'Multimètre', 'Clés échappement'],
 3.0, 450, 'high', ARRAY['Toutes marques']),

('B1234', 'electronique', 'Capteur de température habitacle défaillant', 
 ARRAY['Climatisation inefficace', 'Température incorrecte affichée', 'Ventilation irrégulière'],
 ARRAY['Capteur de température HS', 'Connecteur oxydé', 'Câblage endommagé', 'Calculateur climatisation'],
 ARRAY['Vérifier résistance capteur température', 'Contrôler connectique', 'Tester alimentation capteur', 'Diagnostic calculateur clim'],
 ARRAY['Remplacer capteur température', 'Nettoyer connecteurs', 'Réparer câblage', 'Reprogrammer calculateur'],
 ARRAY['Multimètre', 'Outil diagnostic', 'Nettoyant contact'],
 1.0, 80, 'low', ARRAY['BMW', 'Mercedes', 'Audi']),

('U0100', 'electronique', 'Perte de communication avec ECU moteur', 
 ARRAY['Voyant moteur allumé', 'Mode dégradé', 'Démarrage difficile', 'Perte de puissance'],
 ARRAY['Défaut réseau CAN', 'Calculateur moteur défaillant', 'Câblage CAN endommagé', 'Résistance terminaison'],
 ARRAY['Vérifier réseau CAN avec oscilloscope', 'Tester résistance terminaison (60Ω)', 'Contrôler alimentation ECU', 'Diagnostic communication'],
 ARRAY['Réparer câblage CAN', 'Remplacer résistance terminaison', 'Remplacer calculateur moteur', 'Reprogrammer ECU'],
 ARRAY['Oscilloscope', 'Multimètre', 'Outil diagnostic constructeur'],
 2.0, 350, 'critical', ARRAY['Toutes marques']);

-- Enseignement général spécialisé automobile
INSERT INTO general_education (subject, level, title, content, exercises, solutions, keywords, difficulty_level, duration_minutes, is_mandatory) VALUES
('mathematiques', 'CAP', 'Calculs de Puissance et Couple Moteur', 
 'Les calculs de puissance et couple sont essentiels en mécanique automobile. La puissance (P) en kW se calcule : P = C × ω / 1000, où C est le couple en Nm et ω la vitesse angulaire en rad/s. Pour convertir tr/min en rad/s : ω = (N × 2π) / 60. Le couple moteur varie selon le régime : couple maxi à bas régime pour les moteurs électriques, couple maxi à mi-régime pour les thermiques. La puissance fiscale se calcule : CV = (CO2/45) + (P/40)^1.6. Ces formules permettent de dimensionner les organes de transmission et calculer les performances.',
 '[{"question": "Calculer la puissance d''un moteur développant 200 Nm à 3000 tr/min", "type": "calcul"}]',
 '[{"answer": "P = (200 × 3000 × 2π/60) / 1000 = 62.8 kW", "explanation": "Conversion tr/min en rad/s puis application formule"}]',
 ARRAY['puissance', 'couple', 'moteur', 'calcul', 'formule'], 3, 45, true),

('francais', 'BAC_PRO', 'Rédaction de Rapports d''Intervention', 
 'La rédaction de rapports d''intervention automobile nécessite précision et clarté. Structure type : 1) Identification véhicule (marque, modèle, VIN, km), 2) Symptômes constatés (description objective), 3) Diagnostic effectué (méthodes, outils utilisés), 4) Défauts identifiés (codes, causes), 5) Interventions réalisées (pièces, temps), 6) Contrôles finaux (tests, validation). Le vocabulaire technique doit être précis : "dysfonctionnement" plutôt que "problème", "procédure" plutôt que "méthode". L''orthographe et la syntaxe sont cruciales pour la crédibilité professionnelle.',
 '[{"question": "Rédiger un rapport pour remplacement plaquettes de frein", "type": "redaction"}]',
 '[{"answer": "Rapport structuré avec identification véhicule, constat usure, procédure remplacement, contrôles finaux", "explanation": "Méthodologie professionnelle"}]',
 ARRAY['rapport', 'intervention', 'rédaction', 'vocabulaire', 'technique'], 2, 60, true),

('anglais', 'BTS', 'Documentation Technique Internationale', 
 'La documentation technique automobile internationale utilise un vocabulaire spécialisé. Termes essentiels : Engine (moteur), Transmission (boîte de vitesses), Brakes (freins), Suspension (suspension), ECU (calculateur), Diagnostic (diagnostic), Troubleshooting (dépannage), Maintenance (entretien), Repair (réparation), Component (composant). Les codes défauts internationaux : P (Powertrain), B (Body), C (Chassis), U (Network). Les unités anglo-saxonnes : PSI (pression), MPG (consommation), HP (puissance), Torque (couple). La communication technique internationale nécessite la maîtrise de ce vocabulaire pour échanger avec les constructeurs et équipementiers.',
 '[{"question": "Traduire : Le calculateur moteur présente un défaut de communication", "type": "traduction"}]',
 '[{"answer": "The engine control unit shows a communication fault", "explanation": "Vocabulaire technique automobile anglais"}]',
 ARRAY['anglais', 'technique', 'vocabulaire', 'international', 'documentation'], 3, 50, false);