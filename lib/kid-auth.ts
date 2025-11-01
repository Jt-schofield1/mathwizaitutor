/**
 * Kid Authentication - Hybrid Local + Cloud
 * Uses Supabase when configured, localStorage as fallback
 */

import type { UserProfile } from '@/types';
import { supabase, getKidProfile, upsertKidProfile, isSupabaseConfigured } from './supabase';

// Pre-defined kids with wizard avatars
export const KIDS = [
  {
    id: 'miles',
    name: 'Miles',
    avatar: '/avatars/wizard1.svg',
    color: 'green',
    emoji: '🔮',
  },
  {
    id: 'robert',
    name: 'Robert',
    avatar: '/avatars/wizard2.svg',
    color: 'blue',
    emoji: '⚡',
  },
];

const STORAGE_KEY = 'mathwiz_profiles';
const CURRENT_USER_KEY = 'mathwiz_current_user';

/**
 * Create new profile
 */
function createNewProfile(kid: typeof KIDS[0]): UserProfile {
  return {
    uid: kid.id,
    email: `${kid.id}@mathwiz.local`,
    displayName: kid.name,
    photoURL: kid.avatar,
    gradeLevel: 0, // 0 = Kindergarten, 1-12 = grades
    xp: 0,
    level: 1,
    streak: 0,
    totalProblemsCompleted: 0,
    accuracyRate: 0,
    achievements: [],
    skills: [],
    preferences: {
      theme: 'auto',
      soundEnabled: true,
      animationsEnabled: true,
      characterAvatar: kid.avatar,
      wandStyle: 'oak',
    },
    onboardingCompleted: false,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };
}

/**
 * Get profile (tries Supabase first, then localStorage)
 */
export async function getProfile(kidId: string): Promise<UserProfile | null> {
  const kid = KIDS.find(k => k.id === kidId);
  if (!kid) return null;

  // Try Supabase first
  if (isSupabaseConfigured()) {
    const profile = await getKidProfile(kidId);
    if (profile) {
      // Cache in localStorage
      saveToLocalStorage(kidId, profile);
      return profile;
    }
  }

  // Fallback to localStorage
  const profiles = getFromLocalStorage();
  if (!profiles[kidId]) {
    const newProfile = createNewProfile(kid);
    profiles[kidId] = newProfile;
    saveAllToLocalStorage(profiles);
    
    // Sync to Supabase if configured
    if (isSupabaseConfigured()) {
      await upsertKidProfile(kidId, newProfile);
    }
    
    return newProfile;
  }

  return profiles[kidId];
}

/**
 * Update profile (syncs to both localStorage and Supabase)
 */
export async function updateProfile(kidId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  const profiles = getFromLocalStorage();
  
  if (!profiles[kidId]) {
    const kid = KIDS.find(k => k.id === kidId);
    if (!kid) return null;
    profiles[kidId] = createNewProfile(kid);
  }

  profiles[kidId] = {
    ...profiles[kidId],
    ...updates,
    lastLoginAt: new Date(),
  };

  // Save to localStorage
  saveAllToLocalStorage(profiles);

  // Sync to Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const synced = await upsertKidProfile(kidId, profiles[kidId]);
      if (synced) {
        return synced;
      }
    } catch (error) {
      console.error('Failed to sync to Supabase, using local profile:', error);
      // Continue with local profile if Supabase fails
    }
  }

  return profiles[kidId];
}

/**
 * Login a kid
 */
export async function loginKid(kidId: string): Promise<UserProfile | null> {
  const profile = await getProfile(kidId);
  if (profile) {
    localStorage.setItem(CURRENT_USER_KEY, kidId);
    
    // Update last login (don't fail login if this fails)
    try {
      await updateProfile(kidId, { lastLoginAt: new Date() });
    } catch (error) {
      console.error('Failed to update last login time:', error);
      // Continue anyway - user can still use the app
    }
    
    return profile;
  }
  return null;
}

/**
 * Logout
 */
export function logoutKid() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

/**
 * Get current kid
 */
export async function getCurrentKid(): Promise<UserProfile | null> {
  if (typeof window === 'undefined') return null;
  
  const currentId = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentId) return null;
  
  return await getProfile(currentId);
}

/**
 * Get all kids with profiles
 */
export async function getAllKids() {
  const promises = KIDS.map(async kid => ({
    ...kid,
    profile: await getProfile(kid.id),
  }));
  
  return await Promise.all(promises);
}

// LocalStorage helpers
function getFromLocalStorage(): Record<string, UserProfile> {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  
  try {
    const profiles = JSON.parse(stored);
    Object.keys(profiles).forEach(key => {
      profiles[key].createdAt = new Date(profiles[key].createdAt);
      profiles[key].lastLoginAt = new Date(profiles[key].lastLoginAt);
      if (profiles[key].skills) {
        profiles[key].skills.forEach((skill: any) => {
          skill.lastPracticed = new Date(skill.lastPracticed);
        });
      }
    });
    return profiles;
  } catch (error) {
    return {};
  }
}

function saveAllToLocalStorage(profiles: Record<string, UserProfile>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function saveToLocalStorage(kidId: string, profile: UserProfile) {
  const profiles = getFromLocalStorage();
  profiles[kidId] = profile;
  saveAllToLocalStorage(profiles);
}

