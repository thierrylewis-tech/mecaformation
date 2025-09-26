/*
  # Produits et tarification

  1. Abonnements mensuels
    - Accès plateforme e-learning
    - Différents niveaux de service
    - Tarification récurrente

  2. Formations complètes
    - Certifications officielles
    - Coaching personnalisé
    - Services à la demande
*/

-- Produits d'abonnement mensuel
INSERT INTO products (name, description, type, is_active, metadata) VALUES
('Abonnement CAP MVA', 'Accès mensuel à la plateforme e-learning niveau CAP', 'subscription', true, 
 '{"level": "CAP", "features": ["Cours en ligne", "Vidéos HD", "Exercices", "Support email"], "limitations": ["Pas de certification", "Pas de coaching"]}'),

('Abonnement Bac Pro MVA', 'Accès mensuel à la plateforme e-learning niveau Bac Pro', 'subscription', true,
 '{"level": "BAC_PRO", "features": ["Tout CAP inclus", "Cours Bac Pro", "Management", "Support téléphone", "Webinaires"], "limitations": ["Pas de certification"]}'),

('Abonnement Premium', 'Accès complet à toutes les formations et spécialisations', 'subscription', true,
 '{"level": "PREMIUM", "features": ["Accès complet", "Toutes spécialisations", "Support WhatsApp 24/7", "Diagnostic avancé"], "limitations": []}'),

-- Formations complètes certifiantes
('Formation CAP MVA Complète', 'Formation CAP complète avec certification officielle', 'one_time', true,
 '{"certification": true, "duration": "24 mois", "features": ["Coaching personnalisé", "Stage garanti", "Diplôme État", "Insertion pro"]}'),

('Coaching Primo-Arrivants', 'Accompagnement personnalisé pour primo-arrivants', 'one_time', true,
 '{"target": "primo_arrivants", "duration": "12 mois", "features": ["Accompagnement 24/24", "Financement 0%", "Enseignement général"]}'),

('Coaching Garages Pro', 'Formation équipe complète pour garages professionnels', 'one_time', true,
 '{"target": "garages", "team_size": 8, "features": ["Formation équipe", "Audit atelier", "Support permanent", "ROI garanti"]}'),

-- Services de diagnostic
('Diagnostic Express', 'Diagnostic automobile rapide', 'service', true,
 '{"duration": "15 min", "features": ["Diagnostic rapide", "Rapport PDF", "Support chat"]}'),

('Diagnostic Complet', 'Diagnostic automobile approfondi', 'service', true,
 '{"duration": "45 min", "features": ["Diagnostic complet", "Rapport détaillé", "Recommandations", "Support téléphone"]}'),

('Diagnostic Mercedes Expert', 'Diagnostic Mercedes par expert certifié', 'service', true,
 '{"specialty": "Mercedes", "duration": "60 min", "features": ["Expert certifié", "Codes constructeur", "STAR Diagnosis", "Garantie 30j"]}');

-- Prix correspondants
INSERT INTO prices (product_id, amount, currency, interval, is_active) VALUES
-- Abonnements mensuels (en centimes)
((SELECT id FROM products WHERE name = 'Abonnement CAP MVA'), 1300, 'eur', 'month', true),
((SELECT id FROM products WHERE name = 'Abonnement Bac Pro MVA'), 1500, 'eur', 'month', true),
((SELECT id FROM products WHERE name = 'Abonnement Premium'), 2200, 'eur', 'month', true),

-- Formations complètes (en centimes)
((SELECT id FROM products WHERE name = 'Formation CAP MVA Complète'), 89000, 'eur', 'one_time', true),
((SELECT id FROM products WHERE name = 'Coaching Primo-Arrivants'), 89000, 'eur', 'one_time', true),
((SELECT id FROM products WHERE name = 'Coaching Garages Pro'), 149000, 'eur', 'one_time', true),

-- Services de diagnostic (en centimes)
((SELECT id FROM products WHERE name = 'Diagnostic Express'), 1500, 'eur', 'one_time', true),
((SELECT id FROM products WHERE name = 'Diagnostic Complet'), 5900, 'eur', 'one_time', true),
((SELECT id FROM products WHERE name = 'Diagnostic Mercedes Expert'), 8900, 'eur', 'one_time', true);