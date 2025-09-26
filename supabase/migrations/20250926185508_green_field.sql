/*
  # Modules d'apprentissage structurés

  1. Modules par niveau
    - CAP Maintenance Véhicules
    - Bac Pro Maintenance
    - BTS Maintenance
    - Spécialisations techniques

  2. Progression pédagogique
    - Prérequis définis
    - Objectifs d'apprentissage
    - Durée estimée
*/

INSERT INTO learning_modules (title, type, category, content_ids, prerequisites, learning_objectives, estimated_duration_hours, difficulty_level, is_active) VALUES

-- Modules CAP MVA
('CAP MVA - Module Moteurs Thermiques', 'automotive', 'moteur_thermique',
 ARRAY['1', '2', '3']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Comprendre le fonctionnement des moteurs 4 temps essence et diesel',
   'Identifier les organes moteur et leur rôle',
   'Diagnostiquer les pannes moteur courantes',
   'Effectuer la maintenance préventive moteur'
 ],
 40, 2, true),

('CAP MVA - Module Systèmes Électriques', 'automotive', 'electronique',
 ARRAY['4', '5']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Maîtriser les bases de l''électricité automobile',
   'Utiliser les outils de mesure électrique',
   'Diagnostiquer les pannes électriques',
   'Lire et interpréter les schémas électriques'
 ],
 35, 3, true),

('CAP MVA - Module Transmission', 'automotive', 'transmission',
 ARRAY['6']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Comprendre le fonctionnement des boîtes de vitesses',
   'Diagnostiquer les problèmes de transmission',
   'Effectuer la maintenance des organes de transmission',
   'Contrôler l''embrayage et les joints'
 ],
 30, 2, true),

-- Modules Bac Pro MVA
('Bac Pro MVA - Véhicules Hybrides', 'automotive', 'hybride',
 ARRAY['7', '8']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Comprendre les architectures hybrides série/parallèle',
   'Diagnostiquer les systèmes hybrides Toyota/Honda',
   'Maîtriser la sécurité haute tension',
   'Effectuer la maintenance spécialisée hybride'
 ],
 50, 4, true),

('Bac Pro MVA - Diagnostic Électronique Avancé', 'automotive', 'diagnostic',
 ARRAY['9', '10']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Maîtriser les réseaux multiplexés CAN/LIN',
   'Utiliser oscilloscope et analyseur de réseau',
   'Diagnostiquer les défauts de communication',
   'Programmer et configurer les calculateurs'
 ],
 45, 5, true),

-- Modules BTS MVA
('BTS MVA - Management d''Atelier', 'automotive', 'diagnostic',
 ARRAY['11']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Organiser et planifier l''activité d''atelier',
   'Gérer une équipe de techniciens',
   'Optimiser la productivité et la qualité',
   'Assurer la relation client et la satisfaction'
 ],
 60, 3, true),

('BTS MVA - Technologies Émergentes', 'automotive', 'moteur_electrique',
 ARRAY['12', '13']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Maîtriser les véhicules électriques et hydrogène',
   'Comprendre les systèmes ADAS et conduite autonome',
   'Anticiper les évolutions technologiques',
   'Former et encadrer sur nouvelles technologies'
 ],
 55, 5, true),

-- Spécialisations
('Spécialisation Véhicules Électriques', 'automotive', 'moteur_electrique',
 ARRAY['1', '2', '3']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Obtenir l''habilitation électrique B1VL/B2VL',
   'Diagnostiquer les véhicules électriques',
   'Maintenir les systèmes haute tension',
   'Installer et configurer bornes de recharge'
 ],
 80, 5, true),

('Spécialisation Diagnostic Mercedes-Benz', 'automotive', 'diagnostic',
 ARRAY['14']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Maîtriser l''outil STAR Diagnosis',
   'Diagnostiquer systèmes COMAND/MBUX',
   'Programmer calculateurs Mercedes',
   'Effectuer calibrages spécifiques'
 ],
 35, 4, true),

-- Enseignement général
('Mathématiques Appliquées Automobile', 'general_education', 'mathematiques',
 ARRAY['15']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Maîtriser les calculs de puissance et couple',
   'Calculer les rapports de transmission',
   'Comprendre les unités techniques',
   'Résoudre les problèmes de géométrie'
 ],
 25, 2, true),

('Communication Professionnelle', 'general_education', 'francais',
 ARRAY['16']::uuid[],
 ARRAY[]::uuid[],
 ARRAY[
   'Rédiger des rapports d''intervention',
   'Communiquer efficacement avec la clientèle',
   'Présenter un devis technique',
   'Maîtriser le vocabulaire professionnel'
 ],
 30, 2, true);