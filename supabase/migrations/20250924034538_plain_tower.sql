/*
  # Base de données complète mécanique automobile

  1. Nouvelles Tables
    - `automotive_knowledge` - Articles techniques toutes technologies
    - `diagnostic_codes` - Codes défauts et solutions
    - `vehicle_systems` - Systèmes véhicules par technologie
    - `maintenance_procedures` - Procédures maintenance
    - `training_modules` - Modules de formation
    - `user_progress` - Progression utilisateurs
    - `chat_conversations` - Historique conversations IA

  2. Technologies Couvertes
    - Véhicules thermiques (essence, diesel)
    - Véhicules électriques (BEV)
    - Véhicules hybrides (HEV, PHEV)
    - Véhicules hydrogène (FCEV)
    - Véhicules GPL/GNV
    - Systèmes ADAS
    - Diagnostic électronique

  3. Sécurité
    - RLS activé sur toutes les tables
    - Accès public en lecture pour le contenu éducatif
    - Accès authentifié pour les données utilisateur
*/

-- Table principale des connaissances automobiles
CREATE TABLE IF NOT EXISTS automotive_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'moteur_thermique', 'moteur_electrique', 'transmission', 'freinage', 
    'suspension', 'direction', 'climatisation', 'electronique', 'diagnostic',
    'hybride', 'hydrogene', 'gpl', 'ethanol', 'adas'
  )),
  subcategory TEXT,
  content TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  vehicle_types TEXT[] DEFAULT '{}', -- thermique, electrique, hybride, hydrogene, gpl
  brands TEXT[] DEFAULT '{}', -- mercedes, bmw, audi, peugeot, etc.
  is_premium BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table des codes de diagnostic
CREATE TABLE IF NOT EXISTS diagnostic_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- P0300, B1234, U0100, etc.
  system_type TEXT NOT NULL CHECK (system_type IN (
    'moteur', 'transmission', 'freinage', 'airbag', 'abs', 
    'climatisation', 'electronique', 'hybride', 'electrique'
  )),
  description TEXT NOT NULL,
  symptoms TEXT[] DEFAULT '{}',
  possible_causes TEXT[] DEFAULT '{}',
  diagnostic_steps TEXT[] DEFAULT '{}',
  repair_procedures TEXT[] DEFAULT '{}',
  tools_required TEXT[] DEFAULT '{}',
  estimated_time_hours NUMERIC(4,2),
  estimated_cost_euros INTEGER,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  brands TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des systèmes véhicules
CREATE TABLE IF NOT EXISTS vehicle_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_name TEXT NOT NULL,
  category TEXT NOT NULL, -- moteur, transmission, chassis, electronique, etc.
  description TEXT NOT NULL,
  components JSONB DEFAULT '[]', -- Liste des composants
  operation_principle TEXT,
  maintenance_intervals JSONB DEFAULT '{}', -- Intervalles de maintenance
  common_failures TEXT[] DEFAULT '{}',
  safety_precautions TEXT[] DEFAULT '{}',
  evolution_trends TEXT, -- Évolution technologique
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des procédures de maintenance
CREATE TABLE IF NOT EXISTS maintenance_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_name TEXT NOT NULL,
  system_id UUID REFERENCES vehicle_systems(id),
  steps JSONB NOT NULL DEFAULT '[]', -- Étapes détaillées
  tools_required TEXT[] DEFAULT '{}',
  safety_warnings TEXT[] DEFAULT '{}',
  estimated_duration_minutes INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  cost_estimate_euros INTEGER,
  frequency_km INTEGER, -- Fréquence en kilomètres
  frequency_months INTEGER, -- Fréquence en mois
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des modules de formation
CREATE TABLE IF NOT EXISTS training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('automotive', 'general_education')),
  category TEXT NOT NULL,
  content_ids UUID[] DEFAULT '{}', -- Références vers automotive_knowledge
  prerequisites UUID[] DEFAULT '{}', -- Prérequis
  learning_objectives TEXT[] DEFAULT '{}',
  estimated_duration_hours INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table de progression utilisateur
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  module_type TEXT NOT NULL CHECK (module_type IN ('automotive', 'general_education')),
  module_id UUID,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des conversations chat
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  bot_type TEXT DEFAULT 'general' CHECK (bot_type IN ('general', 'automotive', 'education', 'diagnostic')),
  messages JSONB NOT NULL DEFAULT '[]',
  context JSONB DEFAULT '{}',
  satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 5),
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table enseignement général
CREATE TABLE IF NOT EXISTS general_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL CHECK (subject IN (
    'mathematiques', 'francais', 'anglais', 'histoire_geo', 
    'sciences_physiques', 'communication', 'gestion'
  )),
  level TEXT NOT NULL CHECK (level IN ('CAP', 'BAC_PRO', 'BTS')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  exercises JSONB DEFAULT '[]',
  solutions JSONB DEFAULT '[]',
  keywords TEXT[] DEFAULT '{}',
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  duration_minutes INTEGER DEFAULT 60,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE automotive_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_education ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour accès public aux contenus éducatifs
CREATE POLICY "Public read access for knowledge base"
  ON automotive_knowledge
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for diagnostic codes"
  ON diagnostic_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for vehicle systems"
  ON vehicle_systems
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for maintenance procedures"
  ON maintenance_procedures
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for training modules"
  ON training_modules
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for general education"
  ON general_education
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politiques pour données utilisateur (accès privé)
CREATE POLICY "Users can manage their own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own conversations"
  ON chat_conversations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_category ON automotive_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_keywords ON automotive_knowledge USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_search ON automotive_knowledge USING gin(to_tsvector('french', title || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_diagnostic_codes_code ON diagnostic_codes(code);
CREATE INDEX IF NOT EXISTS idx_diagnostic_codes_system ON diagnostic_codes(system_type);

CREATE INDEX IF NOT EXISTS idx_general_education_subject ON general_education(subject, level);
CREATE INDEX IF NOT EXISTS idx_general_education_search ON general_education USING gin(to_tsvector('french', title || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_user_progress_user_module ON user_progress(user_id, module_type);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON chat_conversations(user_id, created_at);