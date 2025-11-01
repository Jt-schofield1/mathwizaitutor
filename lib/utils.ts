import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format XP with commas
 */
export function formatXP(xp: number): string {
  return new Intl.NumberFormat('en-US').format(xp);
}

/**
 * Calculate level from XP (every 1000 XP = 1 level)
 */
export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

/**
 * Calculate XP needed for next level
 */
export function xpToNextLevel(xp: number): { current: number; required: number; percentage: number } {
  const currentLevelXP = xp % 1000;
  const required = 1000;
  const percentage = (currentLevelXP / required) * 100;
  
  return {
    current: currentLevelXP,
    required,
    percentage
  };
}

/**
 * Format time duration (seconds to readable format)
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

/**
 * Generate a random wizard name
 */
export function generateWizardName(): string {
  const prefixes = ['Mystical', 'Arcane', 'Wise', 'Grand', 'Elder', 'Young'];
  const suffixes = ['Starweaver', 'Spellcaster', 'Mathwiz', 'Numbermancer', 'Calculon', 'Algebro'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${suffix}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get grade display name (K-12)
 */
export function getGradeDisplay(grade: number): string {
  if (grade === 0) return 'Kindergarten';
  
  const gradeNames: Record<number, string> = {
    1: '1st Grade',
    2: '2nd Grade',
    3: '3rd Grade',
    4: '4th Grade',
    5: '5th Grade',
    6: '6th Grade',
    7: '7th Grade',
    8: '8th Grade',
    9: '9th Grade',
    10: '10th Grade',
    11: '11th Grade',
    12: '12th Grade',
  };
  return gradeNames[grade] || `Grade ${grade}`;
}

/**
 * Get achievement badge emoji
 */
export function getAchievementBadge(type: string): string {
  const badges: Record<string, string> = {
    'first_problem': '🎯',
    'streak_3': '🔥',
    'streak_7': '⚡',
    'level_5': '⭐',
    'level_10': '🌟',
    'perfect_quiz': '💯',
    'speed_demon': '⚡',
    'night_owl': '🦉',
    'early_bird': '🐦',
    'helper': '🤝',
  };
  return badges[type] || '🏆';
}

