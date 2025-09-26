import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour vérifier la connexion à la base de données
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('automotive_knowledge')
      .select('count')
      .limit(1);
    
    return { connected: !error, error };
  } catch (error) {
    return { connected: false, error };
  }
};

// Fonction pour obtenir les statistiques de la base
export const getDatabaseStats = async () => {
  try {
    const [
      { count: automotiveCount },
      { count: educationCount },
      { count: diagnosticCount },
      { count: modulesCount }
    ] = await Promise.all([
      supabase.from('automotive_knowledge').select('*', { count: 'exact', head: true }),
      supabase.from('general_education').select('*', { count: 'exact', head: true }),
      supabase.from('diagnostic_codes').select('*', { count: 'exact', head: true }),
      supabase.from('learning_modules').select('*', { count: 'exact', head: true })
    ]);

    return {
      automotive_articles: automotiveCount || 0,
      education_courses: educationCount || 0,
      diagnostic_codes: diagnosticCount || 0,
      learning_modules: modulesCount || 0,
      total: (automotiveCount || 0) + (educationCount || 0) + (diagnosticCount || 0) + (modulesCount || 0)
    };
  } catch (error) {
    console.error('Erreur stats base:', error);
    return {
      automotive_articles: 0,
      education_courses: 0,
      diagnostic_codes: 0,
      learning_modules: 0,
      total: 0
    };
  }
};

// Types pour la base de données
export interface VehicleSystem {
  id: string;
  system_name: string;
  category: string;
  description: string;
  components: any;
  operation_principle?: string;
  maintenance_intervals: any;
  common_failures: string[];
  safety_precautions: string[];
  evolution_trends?: string;
  created_at: string;
}

export interface MaintenanceProcedure {
  id: string;
  procedure_name: string;
  system_id?: string;
  steps: any[];
  tools_required: string[];
  safety_warnings: string[];
  estimated_duration_minutes?: number;
  difficulty_level?: number;
  cost_estimate_euros?: number;
  frequency_km?: number;
  frequency_months?: number;
  created_at: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  type: string;
  category: string;
  content_ids: string[];
  prerequisites: string[];
  learning_objectives: string[];
  estimated_duration_hours?: number;
  difficulty_level?: number;
  is_active: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id?: string;
  module_type: string;
  module_id?: string;
  progress_percentage: number;
  time_spent_minutes: number;
  exercises_completed: number;
  last_accessed: string;
  created_at: string;
}

export interface AutomotiveKnowledge {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  keywords: string[];
  difficulty_level: number;
  vehicle_types: string[];
  brands: string[];
  is_premium: boolean;
  views_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface GeneralEducation {
  id: string;
  subject: string;
  level: string;
  title: string;
  content: string;
  exercises: any[];
  solutions: any[];
  keywords: string[];
  difficulty_level: number;
  duration_minutes: number;
  is_mandatory: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiagnosticCode {
  id: string;
  code: string;
  system_type: string;
  description: string;
  symptoms: string[];
  possible_causes: string[];
  diagnostic_steps: string[];
  repair_procedures: string[];
  tools_required: string[];
  estimated_time_hours: number;
  estimated_cost_euros: number;
  severity: string;
  brands: string[];
  created_at: string;
}

export interface ChatConversation {
  id: string;
  user_id?: string;
  session_id: string;
  bot_type: string;
  messages: any[];
  context: any;
  satisfaction_score?: number;
  resolved: boolean;
  created_at: string;
  updated_at: string;
}

// Fonctions utilitaires
export const searchVehicleSystems = async (query: string, category?: string) => {
  let queryBuilder = supabase
    .from('vehicle_systems')
    .select('*')
    .ilike('system_name', `%${query}%`);
    
  if (category && category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category);
  }
  
  const { data, error } = await queryBuilder.limit(10);
  return { data, error };
};

export const getMaintenanceProcedures = async (systemId?: string) => {
  let queryBuilder = supabase
    .from('maintenance_procedures')
    .select('*');
    
  if (systemId) {
    queryBuilder = queryBuilder.eq('system_id', systemId);
  }
  
  const { data, error } = await queryBuilder.limit(20);
  return { data, error };
};

export const getTrainingModules = async (type?: string, category?: string) => {
  let queryBuilder = supabase
    .from('training_modules')
    .select('*')
    .eq('is_active', true);
    
  if (type && type !== 'all') {
    queryBuilder = queryBuilder.eq('type', type);
  }
  
  if (category && category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category);
  }
  
  const { data, error } = await queryBuilder.order('created_at', { ascending: false });
  return { data, error };
};

export const getUserProgress = async (userId: string, moduleType?: string) => {
  let queryBuilder = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);
    
  if (moduleType) {
    queryBuilder = queryBuilder.eq('module_type', moduleType);
  }
  
  const { data, error } = await queryBuilder.order('last_accessed', { ascending: false });
  return { data, error };
};

export const updateUserProgress = async (userId: string, moduleId: string, progressData: Partial<UserProgress>) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      ...progressData,
      last_accessed: new Date().toISOString()
    })
    .select()
    .single();
    
  return { data, error };
};

export const searchAutomotiveKnowledge = async (query: string, category?: string) => {
  let queryBuilder = supabase
    .from('automotive_knowledge')
    .select('*')
    .ilike('title', `%${query}%`);
    
  if (category && category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category);
  }
  
  const { data, error } = await queryBuilder.limit(10);
  return { data, error };
};

export const searchGeneralEducation = async (query: string, subject?: string, level?: string) => {
  let queryBuilder = supabase
    .from('general_education')
    .select('*')
    .ilike('title', `%${query}%`);
    
  if (subject && subject !== 'all') {
    queryBuilder = queryBuilder.eq('subject', subject);
  }
  
  if (level && level !== 'all') {
    queryBuilder = queryBuilder.eq('level', level);
  }
  
  const { data, error } = await queryBuilder.limit(10);
  return { data, error };
};

export const getDiagnosticCode = async (code: string) => {
  const { data, error } = await supabase
    .from('diagnostic_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();
    
  return { data, error };
};

export const saveChatConversation = async (conversation: Partial<ChatConversation>) => {
  const { data, error } = await supabase
    .from('chat_conversations')
    .insert(conversation)
    .select()
    .single();
    
  return { data, error };
};

export const updateChatConversation = async (id: string, updates: Partial<ChatConversation>) => {
  const { data, error } = await supabase
    .from('chat_conversations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
};