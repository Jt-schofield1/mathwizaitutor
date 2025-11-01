/**
 * Type definitions for MathWiz Academy
 */

// User types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gradeLevel: number;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserProfile extends User {
  xp: number;
  level: number;
  streak: number;
  totalProblemsCompleted: number;
  correctAnswers: number; // NEW: Track correct answers for accuracy calculation
  accuracyRate: number;
  achievements: Achievement[];
  skills: SkillMastery[];
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  completedLessons?: CompletedLesson[];
  completedProblems?: string[]; // Problem IDs
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  animationsEnabled: boolean;
  characterAvatar: string;
  wandStyle: string;
}

// Skill & Mastery types
export interface SkillMastery {
  skillId: string;
  skillName: string;
  category: MathCategory;
  masteryLevel: number; // 0-1 (BKT probability)
  practiceCount: number;
  lastPracticed: Date;
  p_known: number; // Probability student knows the skill
  p_learn: number; // Probability of learning
  p_guess: number; // Probability of guessing correctly
  p_slip: number; // Probability of making a mistake despite knowing
}

export type MathCategory = 
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'fractions'
  | 'decimals'
  | 'geometry'
  | 'measurement'
  | 'time'
  | 'money'
  | 'patterns'
  | 'word_problems';

// Problem types
export interface Problem {
  id: string;
  question: string;
  answer: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: MathCategory;
  gradeLevel: number;
  skills: string[]; // Skill IDs required
  hints: Hint[];
  steps?: Step[];
  visualAid?: string; // URL to image or diagram
  xpReward: number;
}

export interface Hint {
  order: number;
  content: string;
  cost: number; // XP cost for hint
}

export interface Step {
  order: number;
  instruction: string;
  expectedAnswer?: string;
  explanation?: string;
}

// Session types
export interface PracticeSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  problems: ProblemAttempt[];
  totalXPEarned: number;
  accuracy: number;
  mode: 'practice' | 'learn' | 'homework' | 'quiz';
}

export interface ProblemAttempt {
  problemId: string;
  problem: Problem;
  userAnswer: string;
  correct: boolean;
  timeSpent: number; // seconds
  hintsUsed: number;
  attempts: number;
  xpEarned: number;
  timestamp: Date;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'practice' | 'mastery' | 'social' | 'special';
  xpReward: number;
  unlockedAt: Date;
  progress: number; // 0-100
  maxProgress: number;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: MathCategory;
  gradeLevel: number;
  order: number;
  content: LessonContent[];
  quiz: Problem[];
  estimatedMinutes: number;
  prerequisiteSkills: string[];
}

export interface CompletedLesson {
  lessonId: string;
  completedAt: Date;
  score?: number;
  timeSpent?: number;
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'interactive' | 'example';
  content: string;
  order: number;
}

// AI Integration types
export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface TutorConversation {
  id: string;
  userId: string;
  messages: ClaudeMessage[];
  context: {
    currentProblem?: Problem;
    userLevel: number;
    recentErrors: string[];
  };
  startedAt: Date;
  lastMessageAt: Date;
}

// OATutor types
export interface OATutorProblem {
  id: string;
  problem_text: string;
  scaffold: Scaffold[];
  skills: string[];
  difficulty: number;
}

export interface Scaffold {
  step_id: string;
  step_text: string;
  hints: string[];
  correctAnswer: string;
  variabilization?: Record<string, any>;
}

// MAmmoTH types
export interface MAmmoTHRequest {
  problem: string;
  student_answer: string;
  grade_level: number;
}

export interface MAmmoTHResponse {
  is_correct: boolean;
  confidence: number;
  explanation: string;
  step_by_step: string[];
  common_mistake?: string;
  suggestion?: string;
}

// Firestore collection types
export interface FirestoreCollections {
  users: UserProfile;
  sessions: PracticeSession;
  problems: Problem;
  lessons: Lesson;
  achievements: Achievement;
  conversations: TutorConversation;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component prop types
export interface WizardTheme {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}

