/**
 * Achievement System - Gamification for MathWiz Academy
 * Tracks and unlocks achievements based on student progress
 */

import type { Achievement, UserProfile } from '@/types';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'practice' | 'mastery' | 'social' | 'special';
  xpReward: number;
  condition: (user: UserProfile) => boolean;
  progress?: (user: UserProfile) => { current: number; max: number };
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // 🎯 PRACTICE ACHIEVEMENTS
  {
    id: 'first_problem',
    name: 'First Spell Cast',
    description: 'Complete your very first problem!',
    icon: '✨',
    category: 'practice',
    xpReward: 50,
    condition: (user) => (user.totalProblemsCompleted || 0) >= 1,
  },
  {
    id: 'problem_10',
    name: 'Apprentice Wizard',
    description: 'Solve 10 problems',
    icon: '🧙',
    category: 'practice',
    xpReward: 100,
    condition: (user) => (user.totalProblemsCompleted || 0) >= 10,
    progress: (user) => ({ current: user.totalProblemsCompleted || 0, max: 10 }),
  },
  {
    id: 'problem_50',
    name: 'Skilled Sorcerer',
    description: 'Solve 50 problems',
    icon: '🔮',
    category: 'practice',
    xpReward: 250,
    condition: (user) => (user.totalProblemsCompleted || 0) >= 50,
    progress: (user) => ({ current: user.totalProblemsCompleted || 0, max: 50 }),
  },
  {
    id: 'problem_100',
    name: 'Master Mathematician',
    description: 'Solve 100 problems',
    icon: '🌟',
    category: 'practice',
    xpReward: 500,
    condition: (user) => (user.totalProblemsCompleted || 0) >= 100,
    progress: (user) => ({ current: user.totalProblemsCompleted || 0, max: 100 }),
  },
  {
    id: 'problem_500',
    name: 'Grand Wizard',
    description: 'Solve 500 problems - legendary!',
    icon: '👑',
    category: 'practice',
    xpReward: 1000,
    condition: (user) => (user.totalProblemsCompleted || 0) >= 500,
    progress: (user) => ({ current: user.totalProblemsCompleted || 0, max: 500 }),
  },

  // 🔥 STREAK ACHIEVEMENTS
  {
    id: 'streak_3',
    name: 'On Fire!',
    description: 'Practice 3 days in a row',
    icon: '🔥',
    category: 'practice',
    xpReward: 100,
    condition: (user) => (user.streak || 0) >= 3,
    progress: (user) => ({ current: user.streak || 0, max: 3 }),
  },
  {
    id: 'streak_7',
    name: 'Weekly Warrior',
    description: 'Practice 7 days in a row',
    icon: '⚡',
    category: 'practice',
    xpReward: 200,
    condition: (user) => (user.streak || 0) >= 7,
    progress: (user) => ({ current: user.streak || 0, max: 7 }),
  },
  {
    id: 'streak_30',
    name: 'Unstoppable Force',
    description: 'Practice 30 days in a row',
    icon: '💪',
    category: 'practice',
    xpReward: 500,
    condition: (user) => (user.streak || 0) >= 30,
    progress: (user) => ({ current: user.streak || 0, max: 30 }),
  },

  // 📚 MASTERY ACHIEVEMENTS
  {
    id: 'accuracy_80',
    name: 'Sharp Mind',
    description: 'Maintain 80% accuracy',
    icon: '🎯',
    category: 'mastery',
    xpReward: 150,
    condition: (user) => (user.accuracyRate || 0) >= 80 && (user.totalProblemsCompleted || 0) >= 10,
  },
  {
    id: 'accuracy_90',
    name: 'Precision Master',
    description: 'Maintain 90% accuracy',
    icon: '🏆',
    category: 'mastery',
    xpReward: 300,
    condition: (user) => (user.accuracyRate || 0) >= 90 && (user.totalProblemsCompleted || 0) >= 20,
  },
  {
    id: 'accuracy_95',
    name: 'Perfectionist',
    description: 'Maintain 95% accuracy',
    icon: '💎',
    category: 'mastery',
    xpReward: 500,
    condition: (user) => (user.accuracyRate || 0) >= 95 && (user.totalProblemsCompleted || 0) >= 50,
  },

  // 📈 LEVEL ACHIEVEMENTS
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    category: 'mastery',
    xpReward: 100,
    condition: (user) => (user.level || 1) >= 5,
  },
  {
    id: 'level_10',
    name: 'Magic Prodigy',
    description: 'Reach Level 10',
    icon: '🌠',
    category: 'mastery',
    xpReward: 250,
    condition: (user) => (user.level || 1) >= 10,
  },
  {
    id: 'level_20',
    name: 'Legendary Wizard',
    description: 'Reach Level 20',
    icon: '🔱',
    category: 'mastery',
    xpReward: 500,
    condition: (user) => (user.level || 1) >= 20,
  },

  // 🎓 SKILL ACHIEVEMENTS
  {
    id: 'skill_master_1',
    name: 'Skill Specialist',
    description: 'Master your first skill (90%+)',
    icon: '📖',
    category: 'mastery',
    xpReward: 200,
    condition: (user) => (user.skills || []).some(s => s.masteryLevel >= 0.9),
  },
  {
    id: 'skill_master_3',
    name: 'Triple Threat',
    description: 'Master 3 different skills',
    icon: '🎓',
    category: 'mastery',
    xpReward: 400,
    condition: (user) => (user.skills || []).filter(s => s.masteryLevel >= 0.9).length >= 3,
  },
  {
    id: 'skill_master_all',
    name: 'Omniscient',
    description: 'Master all skills in your grade',
    icon: '🧠',
    category: 'mastery',
    xpReward: 1000,
    condition: (user) => {
      const skills = user.skills || [];
      return skills.length >= 5 && skills.every(s => s.masteryLevel >= 0.85);
    },
  },

  // 🎯 SPECIAL ACHIEVEMENTS
  {
    id: 'perfect_session',
    name: 'Flawless Victory',
    description: 'Complete a 10-problem session with 100% accuracy',
    icon: '💯',
    category: 'special',
    xpReward: 300,
    condition: (user) => false, // Tracked separately during sessions
  },
  {
    id: 'speed_demon',
    name: 'Lightning Fast',
    description: 'Solve 10 problems in under 5 minutes',
    icon: '⚡',
    category: 'special',
    xpReward: 250,
    condition: (user) => false, // Tracked separately during sessions
  },
  {
    id: 'night_owl',
    name: 'Midnight Scholar',
    description: 'Practice after 10 PM',
    icon: '🦉',
    category: 'special',
    xpReward: 100,
    condition: (user) => false, // Time-based, checked separately
  },
  {
    id: 'early_bird',
    name: 'Dawn Wizard',
    description: 'Practice before 6 AM',
    icon: '🌅',
    category: 'special',
    xpReward: 100,
    condition: (user) => false, // Time-based, checked separately
  },
  {
    id: 'homework_hero',
    name: 'Homework Hero',
    description: 'Use homework help 10 times',
    icon: '📚',
    category: 'social',
    xpReward: 150,
    condition: (user) => false, // Tracked separately
  },

  // 🏆 MILESTONE ACHIEVEMENTS
  {
    id: 'first_week',
    name: 'Welcome Wizard',
    description: 'Complete your first week!',
    icon: '🎉',
    category: 'special',
    xpReward: 200,
    condition: (user) => {
      const daysSinceCreation = Math.floor(
        (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSinceCreation >= 7 && (user.totalProblemsCompleted || 0) >= 10;
    },
  },
  {
    id: 'grade_complete',
    name: 'Grade Champion',
    description: 'Complete all lessons for your grade',
    icon: '🏅',
    category: 'mastery',
    xpReward: 750,
    condition: (user) => {
      const lessons = user.completedLessons || [];
      // Grade-specific lesson counts
      const requiredLessons: Record<number, number> = {
        0: 4, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5,
        6: 6, 7: 6, 8: 6, 9: 6, 10: 6,
        11: 7, 12: 7
      };
      const required = requiredLessons[user.gradeLevel] || 5;
      return lessons.length >= required;
    },
  },
];

/**
 * Check which achievements a user has unlocked
 */
export function checkAchievements(user: UserProfile): Achievement[] {
  const existingAchievementIds = (user.achievements || []).map(a => a.id);
  const newlyUnlocked: Achievement[] = [];

  for (const def of ACHIEVEMENTS) {
    // Skip if already unlocked
    if (existingAchievementIds.includes(def.id)) continue;

    // Check if condition is met
    if (def.condition(user)) {
      newlyUnlocked.push({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        category: def.category,
        xpReward: def.xpReward,
        unlockedAt: new Date(),
        progress: 100,
        maxProgress: 100,
      });
    }
  }

  return newlyUnlocked;
}

/**
 * Get progress towards achievements
 */
export function getAchievementProgress(user: UserProfile): Array<{
  achievement: AchievementDefinition;
  progress: { current: number; max: number };
  percentage: number;
}> {
  const existingIds = (user.achievements || []).map(a => a.id);
  const inProgress = [];

  for (const def of ACHIEVEMENTS) {
    if (existingIds.includes(def.id)) continue; // Already unlocked
    if (!def.progress) continue; // No progress tracking

    const progress = def.progress(user);
    const percentage = Math.min(100, Math.round((progress.current / progress.max) * 100));

    inProgress.push({
      achievement: def,
      progress,
      percentage,
    });
  }

  // Sort by closest to completion
  return inProgress.sort((a, b) => b.percentage - a.percentage);
}

/**
 * Get next achievement to unlock
 */
export function getNextAchievement(user: UserProfile): {
  achievement: AchievementDefinition;
  progress: { current: number; max: number };
} | null {
  const progressList = getAchievementProgress(user);
  return progressList.length > 0 ? progressList[0] : null;
}

