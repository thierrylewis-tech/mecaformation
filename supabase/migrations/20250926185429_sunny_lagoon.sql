/*
  # Procédures de maintenance détaillées

  1. Procédures spécialisées
    - Maintenance véhicules électriques
    - Entretien systèmes hybrides
    - Diagnostic électronique
    - Sécurité haute tension

  2. Conformité réglementaire
    - Procédures constructeur
    - Normes de sécurité
    - Habilitations requises
*/

INSERT INTO maintenance_procedures (procedure_name, system_id, steps, tools_required, safety_warnings, estimated_duration_minutes, difficulty_level, cost_estimate_euros, frequency_km, frequency_months) VALUES

('Contrôle Isolation Haute Tension Véhicule Électrique', 
 (SELECT id FROM vehicle_systems WHERE system_name = 'Batterie Lithium-Ion Automobile' LIMIT 1),
 '[
   {"step": 1, "description": "Vérifier arrêt complet du véhicule et activation du mode service", "duration": 5},
   {"step": 2, "description": "Attendre 5 minutes pour décharge condensateurs haute tension", "duration": 5},
   {"step": 3, "description": "Porter équipements de protection individuelle (gants isolants, chaussures sécurité)", "duration": 3},
   {"step": 4, "description": "Connecter contrôleur d''isolement entre châssis et borne positive HT", "duration": 10},
   {"step": 5, "description": "Mesurer résistance d''isolement (>500 MΩ minimum requis)", "duration": 15},
   {"step": 6, "description": "Répéter mesure entre châssis et borne négative HT", "duration": 10},
   {"step": 7, "description": "Documenter résultats et apposer étiquette de contrôle", "duration": 7}
 ]',
 ARRAY['Contrôleur d''isolement 1000V', 'Gants isolants classe 00', 'Chaussures sécurité', 'Multimètre CAT III'],
 ARRAY['Habilitation B1VL obligatoire', 'Vérifier absence tension avant intervention', 'Ne jamais travailler seul sur haute tension', 'Respecter procédure de consignation'],
 55, 4, 120, 20000, 12),

('Vidange Liquide de Refroidissement Moteur Électrique',
 (SELECT id FROM vehicle_systems WHERE system_name = 'Moteur Électrique Synchrone' LIMIT 1),
 '[
   {"step": 1, "description": "Laisser refroidir le moteur électrique (température <40°C)", "duration": 30},
   {"step": 2, "description": "Localiser bouchon de vidange circuit de refroidissement moteur", "duration": 5},
   {"step": 3, "description": "Placer bac de récupération et dévisser bouchon de vidange", "duration": 10},
   {"step": 4, "description": "Vidanger complètement l''ancien liquide (environ 3-5 litres)", "duration": 15},
   {"step": 5, "description": "Nettoyer et vérifier état du bouchon de vidange", "duration": 5},
   {"step": 6, "description": "Remplir avec liquide de refroidissement spécifique constructeur", "duration": 20},
   {"step": 7, "description": "Purger l''air du circuit et vérifier niveau", "duration": 25},
   {"step": 8, "description": "Tester étanchéité et température de fonctionnement", "duration": 15}
 ]',
 ARRAY['Bac de vidange 10L', 'Clés plates', 'Liquide refroidissement spécifique', 'Entonnoir', 'Thermomètre'],
 ARRAY['Attendre refroidissement complet', 'Recycler ancien liquide selon réglementation', 'Utiliser uniquement liquide constructeur'],
 125, 2, 85, 150000, 60),

('Diagnostic Communication Réseau CAN',
 (SELECT id FROM vehicle_systems WHERE system_name = 'Système de Freinage Électronique' LIMIT 1),
 '[
   {"step": 1, "description": "Connecter outil de diagnostic sur prise OBD", "duration": 3},
   {"step": 2, "description": "Identifier tous les calculateurs présents sur le réseau", "duration": 10},
   {"step": 3, "description": "Vérifier codes défauts de communication (U0XXX)", "duration": 15},
   {"step": 4, "description": "Tester résistance terminaison réseau CAN (doit être 60Ω)", "duration": 10},
   {"step": 5, "description": "Contrôler signaux CAN-H et CAN-L avec oscilloscope", "duration": 20},
   {"step": 6, "description": "Vérifier alimentation +12V des calculateurs", "duration": 15},
   {"step": 7, "description": "Localiser défaut par déconnexion successive des calculateurs", "duration": 30},
   {"step": 8, "description": "Réparer défaut identifié et valider communication", "duration": 20}
 ]',
 ARRAY['Outil diagnostic constructeur', 'Oscilloscope automobile', 'Multimètre', 'Schéma électrique', 'Sondes différentielles'],
 ARRAY['Respecter procédure de diagnostic constructeur', 'Ne pas débrancher calculateurs moteur tournant', 'Vérifier version logicielle outils'],
 123, 4, 180, 40000, 24),

('Calibrage Caméra ADAS Frontale',
 NULL,
 '[
   {"step": 1, "description": "Vérifier géométrie train avant (parallélisme, carrossage)", "duration": 30},
   {"step": 2, "description": "Positionner véhicule face à mire de calibrage à distance exacte", "duration": 15},
   {"step": 3, "description": "Installer mire de calibrage selon spécifications constructeur", "duration": 20},
   {"step": 4, "description": "Connecter outil de diagnostic et sélectionner procédure calibrage", "duration": 10},
   {"step": 5, "description": "Lancer séquence de calibrage automatique", "duration": 45},
   {"step": 6, "description": "Vérifier bon fonctionnement des systèmes ADAS", "duration": 20},
   {"step": 7, "description": "Effectuer essai routier de validation", "duration": 30}
 ]',
 ARRAY['Mire de calibrage ADAS', 'Outil diagnostic constructeur', 'Banc géométrie', 'Mètre laser', 'Niveau à bulle'],
 ARRAY['Respecter distance exacte mire-véhicule', 'Sol parfaitement horizontal requis', 'Éclairage atelier suffisant', 'Pas d''obstacle dans champ caméra'],
 170, 5, 250, 50000, 36),

('Entretien Système GPL Bi-Carburation',
 NULL,
 '[
   {"step": 1, "description": "Contrôler étanchéité circuit GPL (détecteur gaz)", "duration": 20},
   {"step": 2, "description": "Vérifier pression réservoir et détendeur", "duration": 15},
   {"step": 3, "description": "Nettoyer injecteurs GPL aux ultrasons", "duration": 45},
   {"step": 4, "description": "Contrôler fonctionnement commutateur essence/GPL", "duration": 10},
   {"step": 5, "description": "Vérifier réglages richesse sur banc de puissance", "duration": 60},
   {"step": 6, "description": "Tester démarrage et transitions essence/GPL", "duration": 20},
   {"step": 7, "description": "Contrôler émissions polluantes", "duration": 30}
 ]',
 ARRAY['Détecteur de fuite GPL', 'Manomètre haute pression', 'Bac ultrasons', 'Banc de puissance', 'Analyseur gaz'],
 ARRAY['Ventilation atelier obligatoire', 'Interdiction flamme nue', 'Vérifier étanchéité avant allumage', 'Formation GPL requise'],
 200, 3, 150, 20000, 12);