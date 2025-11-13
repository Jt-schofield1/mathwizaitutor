/**
 * Zustand store for global state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, PracticeSession } from '@/types';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  updateXP: (xpGained: number) => void;
  incrementStreak: () => void;
  clearUser: () => void;
}

interface SessionState {
  currentSession: PracticeSession | null;
  startSession: (mode: 'practice' | 'learn' | 'homework' | 'quiz') => void;
  endSession: () => void;
  addProblemAttempt: (attempt: any) => void;
}

interface UIState {
  sidebarOpen: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  toggleSidebar: () => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => set({ user, loading: false }),
      setLoading: (loading) => set({ loading }),
      updateXP: (xpGained) => set((state) => {
        if (!state.user) return state;
        const newXP = state.user.xp + xpGained;
        const newLevel = Math.floor(newXP / 600) + 1;
        return {
          user: {
            ...state.user,
            xp: newXP,
            level: newLevel,
          }
        };
      }),
      incrementStreak: () => set((state) => {
        if (!state.user) return state;
        return {
          user: {
            ...state.user,
            streak: state.user.streak + 1,
          }
        };
      }),
      clearUser: () => set({ user: null, loading: false }),
    }),
    {
      name: 'mathwiz-auth',
    }
  )
);

// Session Store
export const useSessionStore = create<SessionState>((set) => ({
  currentSession: null,
  startSession: (mode) => set({
    currentSession: {
      id: `session_${Date.now()}`,
      userId: '', // Set from auth
      startTime: new Date(),
      problems: [],
      totalXPEarned: 0,
      accuracy: 0,
      mode,
    }
  }),
  endSession: () => set({ currentSession: null }),
  addProblemAttempt: (attempt) => set((state) => {
    if (!state.currentSession) return state;
    
    const problems = [...state.currentSession.problems, attempt];
    const correctCount = problems.filter(p => p.correct).length;
    const accuracy = (correctCount / problems.length) * 100;
    const totalXPEarned = problems.reduce((sum, p) => sum + p.xpEarned, 0);
    
    return {
      currentSession: {
        ...state.currentSession,
        problems,
        accuracy,
        totalXPEarned,
      }
    };
  }),
}));

// UI Store
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      soundEnabled: true,
      animationsEnabled: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
    }),
    {
      name: 'mathwiz-ui',
    }
  )
);

