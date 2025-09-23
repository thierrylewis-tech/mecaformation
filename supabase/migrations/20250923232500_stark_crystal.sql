/*
  # Base de Données Mécanique Automobile et Enseignement Général

  1. Nouvelles Tables
    - `automotive_knowledge` - Base de connaissances mécanique
    - `general_education` - Contenu enseignement général
    - `diagnostic_codes` - Codes défauts véhicules
    - `vehicle_systems` - Systèmes automobiles
    - `maintenance_procedures` - Procédures de maintenance
    - `chat_conversations` - Historique conversations
    - `user_progress` - Progression utilisateurs
    - `learning_modules` - Modules d'apprentissage

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour accès utilisateurs authentifiés
    - Protection données sensibles

  3. Fonctionnalités
    - Recherche full-text optimisée
    - Indexation pour performance
    - Relations entre tables
    - Triggers pour mise à jour automatique
*/

-- Table base de connaissances mécanique automobile
CREATE TABLE IF NOT EXISTS automotive_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'moteur_thermique', 'moteur_electrique', 'transmission', 'freinage',
    'suspension', 'direction', 'climatisation', 'electronique',
    'diagnostic', 'hybride', 'hydrogene', 'gpl', 'ethanol', 'adas'
  )),
  subcategory TEXT,
  content TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 1,
  vehicle_types TEXT[] DEFAULT '{}', -- thermique, electrique, hybride, etc.
  brands TEXT[] DEFAULT '{}', -- Mercedes, BMW, Peugeot, etc.
  is_premium BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
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
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 1,
  duration_minutes INTEGER DEFAULT 60,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table codes de diagnostic
CREATE TABLE IF NOT EXISTS diagnostic_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
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
  estimated_time_hours DECIMAL(4,2),
  estimated_cost_euros INTEGER,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  brands TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table systèmes véhicules
CREATE TABLE IF NOT EXISTS vehicle_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  components JSONB DEFAULT '[]',
  operation_principle TEXT,
  maintenance_intervals JSONB DEFAULT '{}',
  common_failures TEXT[] DEFAULT '{}',
  safety_precautions TEXT[] DEFAULT '{}',
  evolution_trends TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table procédures de maintenance
CREATE TABLE IF NOT EXISTS maintenance_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_name TEXT NOT NULL,
  system_id UUID REFERENCES vehicle_systems(id),
  steps JSONB NOT NULL DEFAULT '[]',
  tools_required TEXT[] DEFAULT '{}',
  safety_warnings TEXT[] DEFAULT '{}',
  estimated_duration_minutes INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  cost_estimate_euros INTEGER,
  frequency_km INTEGER,
  frequency_months INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table conversations chat
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  bot_type TEXT CHECK (bot_type IN ('general', 'automotive', 'education', 'diagnostic')) DEFAULT 'general',
  messages JSONB NOT NULL DEFAULT '[]',
  context JSONB DEFAULT '{}',
  satisfaction_score INTEGER CHECK (satisfaction_score BETWEEN 1 AND 5),
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table progression utilisateurs
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  module_type TEXT NOT NULL CHECK (module_type IN ('automotive', 'general_education')),
  module_id UUID,
  progress_percentage INTEGER CHECK (progress_percentage BETWEEN 0 AND 100) DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table modules d'apprentissage
CREATE TABLE IF NOT EXISTS learning_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('automotive', 'general_education')) NOT NULL,
  category TEXT NOT NULL,
  content_ids UUID[] DEFAULT '{}',
  prerequisites UUID[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  estimated_duration_hours INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE automotive_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access for knowledge base" ON automotive_knowledge
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for general education" ON general_education
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for diagnostic codes" ON diagnostic_codes
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for vehicle systems" ON vehicle_systems
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for maintenance procedures" ON maintenance_procedures
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read access for learning modules" ON learning_modules
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Users can manage their own conversations" ON chat_conversations
  FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own progress" ON user_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Indexes pour performance
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_category ON automotive_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_keywords ON automotive_knowledge USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_automotive_knowledge_search ON automotive_knowledge USING GIN(to_tsvector('french', title || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_general_education_subject ON general_education(subject, level);
CREATE INDEX IF NOT EXISTS idx_general_education_search ON general_education USING GIN(to_tsvector('french', title || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_diagnostic_codes_code ON diagnostic_codes(code);
CREATE INDEX IF NOT EXISTS idx_diagnostic_codes_system ON diagnostic_codes(system_type);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON chat_conversations(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_module ON user_progress(user_id, module_type);