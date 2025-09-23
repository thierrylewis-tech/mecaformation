import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
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