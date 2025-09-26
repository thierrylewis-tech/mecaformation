/*
  # Peuplement systèmes véhicules

  1. Systèmes automobiles
    - Moteurs thermiques et électriques
    - Transmissions et boîtes de vitesses
    - Systèmes de freinage
    - Suspension et direction
    - Électronique embarquée

  2. Données techniques
    - Composants détaillés
    - Principes de fonctionnement
    - Intervalles de maintenance
    - Pannes courantes
*/

INSERT INTO vehicle_systems (system_name, category, description, components, operation_principle, maintenance_intervals, common_failures, safety_precautions, evolution_trends) VALUES

('Moteur Électrique Synchrone', 'moteur_electrique', 'Moteur électrique à aimants permanents utilisé dans les véhicules électriques pour sa haute efficacité et son couple élevé', 
 '{"stator": "Bobinages triphasés cuivre", "rotor": "Aimants permanents terres rares", "capteurs": "Résolveur position rotor", "refroidissement": "Circuit liquide glycolé", "carter": "Aluminium étanche IP67"}',
 'Le moteur synchrone utilise un champ magnétique tournant créé par les bobinages stator pour entraîner le rotor à aimants permanents. La vitesse de rotation est synchrone avec la fréquence d''alimentation. L''onduleur convertit le courant continu de la batterie en courant alternatif triphasé variable en fréquence et amplitude.',
 '{"vidange_liquide_refroidissement": "5 ans ou 150000 km", "controle_isolement": "Annuel", "verification_connectique": "20000 km", "nettoyage_capteurs": "50000 km"}',
 ARRAY['Défaillance aimants permanents', 'Usure roulements', 'Défaut capteur position', 'Surchauffe bobinages', 'Corrosion connecteurs'],
 ARRAY['Habilitation électrique B1VL minimum', 'Vérifier isolation avant intervention', 'Porter EPI haute tension', 'Consigner véhicule avant maintenance'],
 'Évolution vers moteurs sans terres rares, intégration onduleur, refroidissement direct par huile, motorisation dans roue'),

('Batterie Lithium-Ion Automobile', 'moteur_electrique', 'Système de stockage d''énergie haute tension pour véhicules électriques et hybrides',
 '{"cellules": "Lithium-ion NMC ou LFP", "modules": "Assemblage série/parallèle", "BMS": "Battery Management System", "refroidissement": "Liquide ou air", "boitier": "Aluminium étanche", "connectique": "Haute tension 400-800V"}',
 'Les cellules Li-ion stockent l''énergie par échange d''ions lithium entre anode (graphite) et cathode (oxyde métallique). Le BMS surveille tension, température et courant de chaque cellule pour optimiser performance et sécurité. L''équilibrage actif ou passif maintient l''homogénéité entre cellules.',
 '{"controle_BMS": "Mensuel", "verification_refroidissement": "20000 km", "test_isolement": "Annuel", "mise_a_jour_software": "Selon constructeur"}',
 ARRAY['Déséquilibre cellulaire', 'Dégradation thermique', 'Défaillance BMS', 'Fuite refroidissement', 'Perte d''isolation'],
 ARRAY['Formation haute tension obligatoire', 'Outils isolés uniquement', 'Vérifier absence tension avant intervention', 'Respecter procédures constructeur'],
 'Densité énergétique croissante, charge ultra-rapide 350kW+, recyclage optimisé, batteries structurelles'),

('Transmission e-CVT Hybride', 'transmission', 'Transmission à variation continue électronique utilisée sur véhicules hybrides Toyota/Lexus',
 '{"train_epicycloidal": "Répartiteur de puissance", "MG1": "Moteur-générateur 1", "MG2": "Moteur-générateur 2", "reducteur": "Démultiplication finale", "differentiel": "Répartition roues", "huile_ATF": "Lubrification et refroidissement"}',
 'Le train épicycloïdal répartit la puissance entre moteur thermique et moteurs électriques selon les besoins. MG1 démarre le moteur thermique et génère l''électricité, MG2 assure la traction. La variation continue s''obtient par pilotage électronique des moteurs, sans embrayage ni rapports fixes.',
 '{"vidange_ATF": "100000 km", "controle_niveau": "20000 km", "diagnostic_MG": "40000 km", "nettoyage_capteurs": "60000 km"}',
 ARRAY['Usure train épicycloïdal', 'Défaillance MG1/MG2', 'Fuite huile ATF', 'Surchauffe onduleur', 'Défaut capteurs position'],
 ARRAY['Respecter couple de serrage spécifique', 'Utiliser huile ATF constructeur uniquement', 'Vérifier isolation haute tension'],
 'Intégration moteurs dans transmission, rendement optimisé, réduction encombrement'),

('Système de Freinage Électronique', 'freinage', 'Système de freinage assisté électroniquement avec récupération d''énergie sur véhicules hybrides/électriques',
 '{"maitre_cylindre": "Générateur pression hydraulique", "servo_frein": "Assistance électrique", "ABS": "Anti-blocage roues", "ESP": "Contrôle stabilité", "recuperation": "Freinage régénératif", "capteurs": "Vitesse roues, pression, pédale"}',
 'Le freinage électronique combine freinage hydraulique traditionnel et récupération d''énergie. Le calculateur optimise la répartition entre freinage friction et régénératif selon l''état de charge batterie, adhérence et intensité freinage. L''assistance électrique remplace le servo-frein pneumatique.',
 '{"liquide_frein": "2 ans", "plaquettes": "30000-60000 km", "disques": "60000-100000 km", "diagnostic_ABS": "Annuel"}',
 ARRAY['Usure plaquettes asymétrique', 'Défaillance capteur pédale', 'Perte efficacité récupération', 'Défaut calculateur ABS', 'Fuite circuit hydraulique'],
 ARRAY['Vérifier niveau liquide de frein', 'Contrôler usure plaquettes/disques', 'Tester système ABS/ESP', 'Ne jamais débrancher batterie moteur tournant'],
 'Freinage 100% électrique, récupération optimisée, freinage automatique d''urgence');