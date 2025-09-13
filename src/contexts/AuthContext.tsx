import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, UserProfile, StudentProfile, TeacherProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  studentProfile: StudentProfile | null;
  teacherProfile: TeacherProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  updateStudentProfile: (updates: Partial<StudentProfile>) => Promise<{ error: any }>;
}

interface SignUpData {
  fullName: string;
  role: 'student' | 'teacher';
  // Student specific
  grade?: string;
  school: string;
  state: string;
  // Teacher specific
  subject?: string;
  experienceYears?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUserProfile(null);
          setStudentProfile(null);
          setTeacherProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setUserProfile(profile);

      // Load role-specific profile
      if (profile.role === 'student') {
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('id', userId)
          .single();

        if (studentError && studentError.code !== 'PGRST116') {
          console.error('Error loading student profile:', studentError);
        } else {
          setStudentProfile(studentData);
        }
      } else if (profile.role === 'teacher') {
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .select('*')
          .eq('id', userId)
          .single();

        if (teacherError && teacherError.code !== 'PGRST116') {
          console.error('Error loading teacher profile:', teacherError);
        } else {
          setTeacherProfile(teacherData);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            role: userData.role,
          },
        },
      });

      if (error) return { error };

      // Create role-specific profile
      if (data.user && userData.role === 'student') {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            id: data.user.id,
            grade: userData.grade!,
            school: userData.school,
            state: userData.state,
          });

        if (studentError) {
          console.error('Error creating student profile:', studentError);
        }
      } else if (data.user && userData.role === 'teacher') {
        const { error: teacherError } = await supabase
          .from('teachers')
          .insert({
            id: data.user.id,
            school: userData.school,
            subject: userData.subject,
            experience_years: userData.experienceYears || 0,
          });

        if (teacherError) {
          console.error('Error creating teacher profile:', teacherError);
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  const updateStudentProfile = async (updates: Partial<StudentProfile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setStudentProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  const value = {
    user,
    session,
    userProfile,
    studentProfile,
    teacherProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateStudentProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};