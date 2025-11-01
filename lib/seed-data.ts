/**
 * Seed Data for MathWiz Academy
 * Grade 1-2 Math Topics, Lessons, and Sample Problems
 */

import type { Problem, Lesson } from '@/types';

// Grade 1 Problems
export const GRADE_1_PROBLEMS: Problem[] = [
  // Addition
  {
    id: 'g1_add_1',
    question: 'You have 2 magic crystals and find 3 more. How many crystals do you have?',
    answer: '5',
    difficulty: 1,
    category: 'addition',
    gradeLevel: 1,
    skills: ['single_digit_addition'],
    hints: [
      { order: 1, content: 'Start with 2 and count up: 3, 4, 5', cost: 5 },
    ],
    xpReward: 50,
  },
  {
    id: 'g1_add_2',
    question: '4 + 4 = ?',
    answer: '8',
    difficulty: 1,
    category: 'addition',
    gradeLevel: 1,
    skills: ['single_digit_addition'],
    hints: [
      { order: 1, content: 'Think of 4 fingers on each hand. How many total?', cost: 5 },
    ],
    xpReward: 50,
  },
  {
    id: 'g1_add_3',
    question: '6 + 3 = ?',
    answer: '9',
    difficulty: 1,
    category: 'addition',
    gradeLevel: 1,
    skills: ['single_digit_addition'],
    hints: [
      { order: 1, content: 'Start at 6 and count up 3 times: 7, 8, 9', cost: 5 },
    ],
    xpReward: 50,
  },
  
  // Subtraction
  {
    id: 'g1_sub_1',
    question: 'There are 7 wizards. 2 go home. How many wizards are left?',
    answer: '5',
    difficulty: 1,
    category: 'subtraction',
    gradeLevel: 1,
    skills: ['single_digit_subtraction'],
    hints: [
      { order: 1, content: 'Start with 7 and count backwards 2 times', cost: 5 },
    ],
    xpReward: 50,
  },
  {
    id: 'g1_sub_2',
    question: '9 - 4 = ?',
    answer: '5',
    difficulty: 1,
    category: 'subtraction',
    gradeLevel: 1,
    skills: ['single_digit_subtraction'],
    hints: [
      { order: 1, content: 'Count down from 9: 8, 7, 6, 5', cost: 5 },
    ],
    xpReward: 50,
  },

  // Shapes
  {
    id: 'g1_shape_1',
    question: 'How many sides does a triangle have?',
    answer: '3',
    difficulty: 1,
    category: 'geometry',
    gradeLevel: 1,
    skills: ['basic_shapes'],
    hints: [
      { order: 1, content: 'A triangle has three corners and three sides', cost: 5 },
    ],
    xpReward: 40,
  },
];

// Grade 2 Problems
export const GRADE_2_PROBLEMS: Problem[] = [
  // Two-digit Addition
  {
    id: 'g2_add_1',
    question: 'A wizard has 14 spell books and buys 12 more. How many spell books does the wizard have now?',
    answer: '26',
    difficulty: 2,
    category: 'addition',
    gradeLevel: 2,
    skills: ['two_digit_addition'],
    hints: [
      { order: 1, content: 'Add the ones first: 4 + 2 = 6. Then add the tens: 10 + 10 = 20. Total: 26', cost: 10 },
    ],
    xpReward: 75,
  },
  {
    id: 'g2_add_2',
    question: '35 + 27 = ?',
    answer: '62',
    difficulty: 2,
    category: 'addition',
    gradeLevel: 2,
    skills: ['two_digit_addition', 'carrying'],
    hints: [
      { order: 1, content: 'Add ones: 5 + 7 = 12 (write 2, carry 1)', cost: 10 },
      { order: 2, content: 'Add tens: 3 + 2 = 5, plus carried 1 = 6. Answer: 62', cost: 15 },
    ],
    xpReward: 75,
  },

  // Two-digit Subtraction
  {
    id: 'g2_sub_1',
    question: 'There are 48 magical potions. A wizard uses 23. How many potions are left?',
    answer: '25',
    difficulty: 2,
    category: 'subtraction',
    gradeLevel: 2,
    skills: ['two_digit_subtraction'],
    hints: [
      { order: 1, content: 'Subtract ones: 8 - 3 = 5. Subtract tens: 4 - 2 = 2. Answer: 25', cost: 10 },
    ],
    xpReward: 75,
  },
  {
    id: 'g2_sub_2',
    question: '52 - 18 = ?',
    answer: '34',
    difficulty: 2,
    category: 'subtraction',
    gradeLevel: 2,
    skills: ['two_digit_subtraction', 'borrowing'],
    hints: [
      { order: 1, content: 'You need to borrow! Change 52 to 4 tens and 12 ones', cost: 10 },
      { order: 2, content: 'Now: 12 - 8 = 4, and 4 - 1 = 3. Answer: 34', cost: 15 },
    ],
    xpReward: 75,
  },

  // Time
  {
    id: 'g2_time_1',
    question: 'What time is it when the clock shows 3:00?',
    answer: '3:00',
    difficulty: 2,
    category: 'time',
    gradeLevel: 2,
    skills: ['telling_time'],
    hints: [
      { order: 1, content: 'When the big hand is on 12 and small hand is on 3, it\'s 3:00', cost: 10 },
    ],
    xpReward: 60,
  },

  // Word Problems
  {
    id: 'g2_word_1',
    question: 'A wizard has 15 wands in one box and 20 wands in another box. How many wands in total?',
    answer: '35',
    difficulty: 2,
    category: 'word_problems',
    gradeLevel: 2,
    skills: ['two_digit_addition', 'word_problems'],
    hints: [
      { order: 1, content: 'This is an addition problem! Add 15 + 20', cost: 10 },
      { order: 2, content: '15 + 20 = 35 wands', cost: 15 },
    ],
    xpReward: 80,
  },
];

// Lessons
export const GRADE_1_LESSONS: Lesson[] = [
  {
    id: 'g1_lesson_add_basics',
    title: 'Introduction to Addition',
    description: 'Learn how to add single-digit numbers using magical counting',
    category: 'addition',
    gradeLevel: 1,
    order: 1,
    content: [
      {
        type: 'text',
        content: 'Addition is like combining magical items! When you add, you put things together to find out how many you have in total.',
        order: 1,
      },
      {
        type: 'example',
        content: 'If you have 2 magic stones and find 3 more, you now have 2 + 3 = 5 stones!',
        order: 2,
      },
    ],
    quiz: [GRADE_1_PROBLEMS[0], GRADE_1_PROBLEMS[1]],
    estimatedMinutes: 15,
    prerequisiteSkills: [],
  },
  {
    id: 'g1_lesson_sub_basics',
    title: 'Introduction to Subtraction',
    description: 'Learn how to subtract single-digit numbers',
    category: 'subtraction',
    gradeLevel: 1,
    order: 2,
    content: [
      {
        type: 'text',
        content: 'Subtraction is like taking away items. When you subtract, you start with a number and remove some to see how many are left.',
        order: 1,
      },
    ],
    quiz: [GRADE_1_PROBLEMS[3], GRADE_1_PROBLEMS[4]],
    estimatedMinutes: 15,
    prerequisiteSkills: ['single_digit_addition'],
  },
];

export const GRADE_2_LESSONS: Lesson[] = [
  {
    id: 'g2_lesson_add_twodigit',
    title: 'Two-Digit Addition',
    description: 'Master adding larger numbers with and without carrying',
    category: 'addition',
    gradeLevel: 2,
    order: 1,
    content: [
      {
        type: 'text',
        content: 'When adding two-digit numbers, we add the ones place first, then the tens place!',
        order: 1,
      },
      {
        type: 'example',
        content: 'For 23 + 14: Add ones (3+4=7), then tens (2+1=3). Answer: 37',
        order: 2,
      },
    ],
    quiz: [GRADE_2_PROBLEMS[0], GRADE_2_PROBLEMS[1]],
    estimatedMinutes: 20,
    prerequisiteSkills: ['single_digit_addition'],
  },
];

// Achievement definitions
export const ACHIEVEMENTS = [
  {
    id: 'first_problem',
    name: 'First Spell Cast',
    description: 'Solve your first problem',
    icon: '🎯',
    category: 'practice',
    xpReward: 50,
    maxProgress: 1,
  },
  {
    id: 'streak_3',
    name: '3-Day Streak',
    description: 'Practice for 3 days in a row',
    icon: '🔥',
    category: 'practice',
    xpReward: 100,
    maxProgress: 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Practice for 7 days in a row',
    icon: '⚡',
    category: 'practice',
    xpReward: 250,
    maxProgress: 7,
  },
  {
    id: 'level_5',
    name: 'Apprentice Wizard',
    description: 'Reach Level 5',
    icon: '⭐',
    category: 'mastery',
    xpReward: 200,
    maxProgress: 1,
  },
  {
    id: 'level_10',
    name: 'Master Wizard',
    description: 'Reach Level 10',
    icon: '🌟',
    category: 'mastery',
    xpReward: 500,
    maxProgress: 1,
  },
  {
    id: 'perfect_quiz',
    name: 'Perfect Score',
    description: 'Get 100% on a practice session',
    icon: '💯',
    category: 'practice',
    xpReward: 150,
    maxProgress: 1,
  },
];

