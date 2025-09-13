import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  grade: string;
  school: string;
  state: string;
  eco_points: number;
  level: number;
  streak: number;
  completed_lessons: string[];
  completed_challenges: string[];
  earned_badges: any[];
  total_impact_score: number;
  weekly_goal: number;
  monthly_goal: number;
  join_date: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherProfile {
  id: string;
  school: string;
  subject?: string;
  experience_years: number;
  created_at: string;
  updated_at: string;
}