/**
 * Supabase Client - FREE Database for 4 Kids
 * Works across all devices (iPad, computer, phone)
 */

import { createClient } from '@supabase/supabase-js';
import type { UserProfile } from '@/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Get profile for a kid
 */
export async function getKidProfile(kidId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('kid_id', kidId)
      .maybeSingle();

    // maybeSingle() returns null if no rows, which is fine
    // Only log actual errors (not "no rows" errors)
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Deserialize completed lessons (convert ISO strings back to Date objects)
    const deserializedCompletedLessons = (data.completed_lessons || []).map((lesson: any) => ({
      ...lesson,
      completedAt: lesson.completedAt ? new Date(lesson.completedAt) : new Date()
    }));
    
    // Map database columns to UserProfile
    const userProfile: UserProfile = {
      uid: data.kid_id,
      email: '', // Not used for kids
      displayName: data.display_name,
      photoURL: '', // Avatar handled separately
      gradeLevel: data.grade_level,
      createdAt: data.created_at ? new Date(data.created_at) : new Date(),
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : new Date(),
      xp: data.xp || 0,
      level: data.level || 1,
      completedLessons: deserializedCompletedLessons,
      skills: data.skills || [],
      achievements: data.achievements || [],
      totalProblemsCompleted: data.total_problems_completed || 0,
      correctAnswers: data.correct_answers || 0,
      streak: data.streak || 0,
      accuracyRate: data.accuracy_rate || 0,
      completedProblems: data.completed_problems || [],
      onboardingCompleted: data.onboarding_completed || false,
      preferences: {
        theme: 'auto',
        soundEnabled: true,
        animationsEnabled: true,
        characterAvatar: '',
        wandStyle: 'default',
      },
    };

    return userProfile;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
}

/**
 * Create or update kid profile
 */
export async function upsertKidProfile(kidId: string, profile: Partial<UserProfile>) {
  try {
    // Serialize completed lessons (convert Date objects to ISO strings)
    const serializedCompletedLessons = profile.completedLessons 
      ? profile.completedLessons.map(lesson => ({
          ...lesson,
          completedAt: lesson.completedAt instanceof Date 
            ? lesson.completedAt.toISOString() 
            : lesson.completedAt
        }))
      : undefined;
    
    // Map UserProfile fields to database columns
    const dbProfile: any = {
      kid_id: kidId,
      display_name: profile.displayName,
      grade_level: profile.gradeLevel,
      xp: profile.xp,
      level: profile.level,
      completed_lessons: serializedCompletedLessons,
      skills: profile.skills,
      achievements: profile.achievements,
      total_problems_completed: profile.totalProblemsCompleted,
      correct_answers: profile.correctAnswers,
      streak: profile.streak,
      accuracy_rate: profile.accuracyRate,
      completed_problems: profile.completedProblems,
      onboarding_completed: profile.onboardingCompleted,
      last_login_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Remove undefined values
    Object.keys(dbProfile).forEach(key => {
      if (dbProfile[key] === undefined) {
        delete dbProfile[key];
      }
    });

    console.log('Upserting profile with data:', JSON.stringify(dbProfile, null, 2));
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert(dbProfile)
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Full error:', JSON.stringify(error, null, 2));
      
      // Try to provide helpful error message
      if (error.message.includes('column')) {
        console.error('Missing column in database! Check SUPABASE_SETUP.md');
      }
      
      return null;
    }
    
    console.log('Profile upserted successfully');

    // Map database columns back to UserProfile
    if (data) {
      // Deserialize completed lessons (convert ISO strings back to Date objects)
      const deserializedCompletedLessons = (data.completed_lessons || []).map((lesson: any) => ({
        ...lesson,
        completedAt: lesson.completedAt ? new Date(lesson.completedAt) : new Date()
      }));
      
      const userProfile: UserProfile = {
        uid: data.kid_id,
        email: '',
        displayName: data.display_name,
        photoURL: '',
        gradeLevel: data.grade_level,
        createdAt: data.created_at ? new Date(data.created_at) : profile.createdAt || new Date(),
        lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : new Date(),
        xp: data.xp,
        level: data.level,
        completedLessons: deserializedCompletedLessons,
        skills: data.skills || [],
        achievements: data.achievements || [],
        totalProblemsCompleted: data.total_problems_completed || 0,
        correctAnswers: data.correct_answers || 0,
        streak: data.streak || 0,
        accuracyRate: data.accuracy_rate || 0,
        completedProblems: data.completed_problems || [],
        onboardingCompleted: data.onboarding_completed || false,
        preferences: profile.preferences || {
          theme: 'auto',
          soundEnabled: true,
          animationsEnabled: true,
          characterAvatar: '',
          wandStyle: 'default',
        },
      };
      return userProfile;
    }

    return null;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
}

/**
 * Get all kids profiles
 */
export async function getAllKidProfiles(): Promise<UserProfile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('kid_id');

    if (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map all profiles from database columns to UserProfile
    return data.map(dbProfile => {
      // Deserialize completed lessons (convert ISO strings back to Date objects)
      const deserializedCompletedLessons = (dbProfile.completed_lessons || []).map((lesson: any) => ({
        ...lesson,
        completedAt: lesson.completedAt ? new Date(lesson.completedAt) : new Date()
      }));
      
      return {
        uid: dbProfile.kid_id,
        email: '',
        displayName: dbProfile.display_name,
        photoURL: '',
        gradeLevel: dbProfile.grade_level,
        createdAt: dbProfile.created_at ? new Date(dbProfile.created_at) : new Date(),
        lastLoginAt: dbProfile.last_login_at ? new Date(dbProfile.last_login_at) : new Date(),
        xp: dbProfile.xp || 0,
        level: dbProfile.level || 1,
        completedLessons: deserializedCompletedLessons,
        skills: dbProfile.skills || [],
        achievements: dbProfile.achievements || [],
        totalProblemsCompleted: dbProfile.total_problems_completed || 0,
        correctAnswers: dbProfile.correct_answers || 0,
        streak: dbProfile.streak || 0,
        accuracyRate: dbProfile.accuracy_rate || 0,
        completedProblems: dbProfile.completed_problems || [],
        onboardingCompleted: dbProfile.onboarding_completed || false,
        preferences: {
          theme: 'auto',
          soundEnabled: true,
          animationsEnabled: true,
          characterAvatar: '',
          wandStyle: 'default',
        },
      };
    });
  } catch (error) {
    console.error('Supabase error:', error);
    return [];
  }
}

/**
 * Update XP for a kid
 */
export async function updateKidXP(kidId: string, xpGained: number) {
  try {
    // Get current profile
    const profile = await getKidProfile(kidId);
    if (!profile) return null;

    const newXP = profile.xp + xpGained;
    const newLevel = Math.floor(newXP / 600) + 1;

    return await upsertKidProfile(kidId, {
      xp: newXP,
      level: newLevel,
    });
  } catch (error) {
    console.error('Error updating XP:', error);
    return null;
  }
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return supabaseUrl !== 'https://demo.supabase.co' && supabaseKey !== 'demo_key';
}

