/*
  # Utilisateurs de démonstration

  1. Profils types
    - Étudiants CAP/Bac Pro/BTS
    - Garages professionnels
    - Administrateurs

  2. Données de progression
    - Modules suivis
    - Temps passé
    - Résultats obtenus
*/

-- Note: Ces utilisateurs seront créés via l'interface d'inscription
-- Cette migration prépare la structure pour les données de progression

-- Progression type pour démonstration
INSERT INTO user_progress (user_id, module_type, module_id, progress_percentage, time_spent_minutes, exercises_completed, last_accessed) VALUES
-- Utilisateur demo (sera remplacé par vrais utilisateurs)
('00000000-0000-0000-0000-000000000001', 'automotive', 
 (SELECT id FROM learning_modules WHERE title = 'CAP MVA - Module Moteurs Thermiques' LIMIT 1),
 75, 180, 12, NOW() - INTERVAL '2 hours'),

('00000000-0000-0000-0000-000000000001', 'automotive',
 (SELECT id FROM learning_modules WHERE title = 'CAP MVA - Module Systèmes Électriques' LIMIT 1),
 45, 120, 8, NOW() - INTERVAL '1 day'),

('00000000-0000-0000-0000-000000000001', 'general_education',
 (SELECT id FROM learning_modules WHERE title = 'Mathématiques Appliquées Automobile' LIMIT 1),
 90, 90, 15, NOW() - INTERVAL '3 hours');

-- Conversations de démonstration
INSERT INTO chat_conversations (user_id, session_id, bot_type, messages, context, satisfaction_score, resolved) VALUES
('00000000-0000-0000-0000-000000000001', 'demo-session-1', 'automotive',
 '[
   {"role": "user", "content": "Comment diagnostiquer une panne de batterie sur véhicule électrique ?", "timestamp": "2024-01-15T10:00:00Z"},
   {"role": "assistant", "content": "Pour diagnostiquer une batterie de véhicule électrique, voici la procédure : 1) Vérifier l''isolation haute tension (>500 MΩ), 2) Contrôler l''équilibrage des cellules, 3) Tester le BMS, 4) Analyser l''historique des codes défauts. Utilisez un testeur de batterie spécialisé et respectez les consignes de sécurité haute tension.", "timestamp": "2024-01-15T10:00:30Z"}
 ]',
 '{"topic": "diagnostic_batterie", "vehicle_type": "electrique", "user_level": "CAP"}',
 5, true),

('00000000-0000-0000-0000-000000000001', 'demo-session-2', 'education',
 '[
   {"role": "user", "content": "Comment calculer la puissance d''un moteur ?", "timestamp": "2024-01-15T14:30:00Z"},
   {"role": "assistant", "content": "La puissance se calcule avec la formule P = C × ω, où P est la puissance en watts, C le couple en Nm et ω la vitesse angulaire en rad/s. Pour convertir tr/min en rad/s : ω = (N × 2π) / 60. Exemple : moteur 200 Nm à 3000 tr/min = 200 × (3000 × 2π / 60) = 62,8 kW.", "timestamp": "2024-01-15T14:30:45Z"}
 ]',
 '{"topic": "calcul_puissance", "subject": "mathematiques", "level": "CAP"}',
 4, true);