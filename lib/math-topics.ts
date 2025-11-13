/**
 * Grade-Level Math Topics Configuration
 * Comprehensive topic mapping for K-12 with real-world applications
 */

export interface MathTopic {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradeRange: [number, number]; // [min, max]
  category: 'arithmetic' | 'geometry' | 'algebra' | 'finance' | 'measurement' | 'data' | 'advanced';
  realWorldContext?: string;
}

export const MATH_TOPICS: MathTopic[] = [
  // ===== KINDERGARTEN - GRADE 2 =====
  {
    id: 'counting',
    name: 'Counting & Numbers',
    description: 'Practice counting objects and recognizing numbers',
    icon: '🔢',
    gradeRange: [0, 1],
    category: 'arithmetic',
  },
  {
    id: 'basic_shapes',
    name: 'Shapes & Patterns',
    description: 'Learn about circles, squares, triangles, and patterns',
    icon: '🔷',
    gradeRange: [0, 2],
    category: 'geometry',
  },
  {
    id: 'simple_addition',
    name: 'Simple Addition',
    description: 'Add small numbers (0-20)',
    icon: '➕',
    gradeRange: [0, 2],
    category: 'arithmetic',
  },
  {
    id: 'simple_subtraction',
    name: 'Simple Subtraction',
    description: 'Subtract small numbers (0-20)',
    icon: '➖',
    gradeRange: [1, 2],
    category: 'arithmetic',
  },
  {
    id: 'comparing_numbers',
    name: 'Comparing Numbers',
    description: 'Greater than, less than, equal to',
    icon: '⚖️',
    gradeRange: [0, 2],
    category: 'arithmetic',
  },
  {
    id: 'skip_counting',
    name: 'Skip Counting',
    description: 'Count by 2s, 5s, and 10s',
    icon: '👣',
    gradeRange: [1, 2],
    category: 'arithmetic',
  },
  {
    id: 'place_value',
    name: 'Place Value',
    description: 'Understand ones, tens, and hundreds',
    icon: '💯',
    gradeRange: [1, 3],
    category: 'arithmetic',
  },

  // ===== GRADES 2-3 =====
  {
    id: 'money_counting',
    name: 'Counting Money',
    description: 'Count coins and dollars, make change',
    icon: '💰',
    gradeRange: [2, 3],
    category: 'finance',
    realWorldContext: 'shopping and allowance',
  },
  {
    id: 'telling_time',
    name: 'Telling Time',
    description: 'Read clocks and calculate time intervals',
    icon: '🕐',
    gradeRange: [2, 3],
    category: 'measurement',
    realWorldContext: 'daily schedules',
  },
  {
    id: 'measurement',
    name: 'Measurement',
    description: 'Length, weight, capacity with standard units',
    icon: '📏',
    gradeRange: [2, 4],
    category: 'measurement',
  },
  {
    id: 'two_digit_operations',
    name: 'Two-Digit Math',
    description: 'Add and subtract two-digit numbers',
    icon: '🔢',
    gradeRange: [2, 3],
    category: 'arithmetic',
  },

  // ===== GRADES 3-5 =====
  {
    id: 'multiplication',
    name: 'Multiplication',
    description: 'Times tables and multi-digit multiplication',
    icon: '✖️',
    gradeRange: [3, 5],
    category: 'arithmetic',
  },
  {
    id: 'division',
    name: 'Division',
    description: 'Division facts and long division',
    icon: '➗',
    gradeRange: [3, 5],
    category: 'arithmetic',
  },
  {
    id: 'fractions',
    name: 'Fractions',
    description: 'Understanding and operating with fractions',
    icon: '½',
    gradeRange: [3, 6],
    category: 'arithmetic',
  },
  {
    id: 'decimals',
    name: 'Decimals',
    description: 'Decimal operations and place value',
    icon: '0.5',
    gradeRange: [4, 6],
    category: 'arithmetic',
  },
  {
    id: 'area_perimeter',
    name: 'Area & Perimeter',
    description: 'Calculate area and perimeter of shapes',
    icon: '📐',
    gradeRange: [3, 5],
    category: 'geometry',
  },
  {
    id: 'mixed_operations',
    name: 'Mixed Operations',
    description: 'Practice all four operations together',
    icon: '🔄',
    gradeRange: [4, 6],
    category: 'arithmetic',
  },
  {
    id: 'long_division',
    name: 'Long Division',
    description: 'Multi-digit division with remainders',
    icon: '➗',
    gradeRange: [4, 5],
    category: 'arithmetic',
  },
  {
    id: 'factors_multiples',
    name: 'Factors & Multiples',
    description: 'Prime numbers, GCF, and LCM',
    icon: '🔢',
    gradeRange: [4, 6],
    category: 'arithmetic',
  },
  {
    id: 'comparing_fractions',
    name: 'Comparing Fractions',
    description: 'Compare and order fractions',
    icon: '⚖️',
    gradeRange: [4, 5],
    category: 'arithmetic',
  },
  {
    id: 'volume',
    name: 'Volume',
    description: 'Calculate volume of 3D shapes',
    icon: '📦',
    gradeRange: [5, 8],
    category: 'geometry',
  },
  {
    id: 'order_of_operations',
    name: 'Order of Operations',
    description: 'PEMDAS/BODMAS practice',
    icon: '🎯',
    gradeRange: [5, 7],
    category: 'arithmetic',
  },
  {
    id: 'word_problems',
    name: 'Word Problems',
    description: 'Real-world math story problems',
    icon: '📖',
    gradeRange: [2, 12],
    category: 'arithmetic',
  },

  // ===== GRADES 6-8 (Middle School) =====
  {
    id: 'percentages',
    name: 'Percentages',
    description: 'Calculate percentages, discounts, and tips',
    icon: '%',
    gradeRange: [5, 8],
    category: 'arithmetic',
    realWorldContext: 'shopping discounts and tips',
  },
  {
    id: 'ratios_proportions',
    name: 'Ratios & Proportions',
    description: 'Solve ratio and proportion problems',
    icon: '⚖️',
    gradeRange: [6, 8],
    category: 'arithmetic',
  },
  {
    id: 'integers',
    name: 'Integers',
    description: 'Operations with positive and negative numbers',
    icon: '➖➕',
    gradeRange: [6, 8],
    category: 'arithmetic',
  },
  {
    id: 'algebraic_expressions',
    name: 'Algebraic Expressions',
    description: 'Simplifying and evaluating expressions',
    icon: '📝',
    gradeRange: [7, 8],
    category: 'algebra',
  },
  {
    id: 'solving_equations',
    name: 'Solving Equations',
    description: 'One and two-step equations',
    icon: '⚖️',
    gradeRange: [7, 9],
    category: 'algebra',
  },
  {
    id: 'inequalities',
    name: 'Inequalities',
    description: 'Solving and graphing inequalities',
    icon: '><',
    gradeRange: [7, 9],
    category: 'algebra',
  },
  {
    id: 'coordinate_geometry',
    name: 'Coordinate Plane',
    description: 'Plotting points and graphing lines',
    icon: '📈',
    gradeRange: [6, 9],
    category: 'geometry',
  },
  {
    id: 'statistics_basics',
    name: 'Statistics Basics',
    description: 'Mean, median, mode, and data interpretation',
    icon: '📊',
    gradeRange: [6, 9],
    category: 'data',
  },

  // ===== GRADES 9-10 (High School) =====
  {
    id: 'linear_equations',
    name: 'Linear Equations',
    description: 'Solve and graph linear equations',
    icon: '📉',
    gradeRange: [8, 10],
    category: 'algebra',
  },
  {
    id: 'systems_of_equations',
    name: 'Systems of Equations',
    description: 'Solving two equations simultaneously',
    icon: '🔗',
    gradeRange: [9, 10],
    category: 'algebra',
  },
  {
    id: 'quadratic_equations',
    name: 'Quadratic Equations',
    description: 'Factoring and solving quadratics',
    icon: '𝑥²',
    gradeRange: [9, 11],
    category: 'algebra',
  },
  {
    id: 'polynomials',
    name: 'Polynomials',
    description: 'Operations with polynomials',
    icon: '🔢',
    gradeRange: [9, 11],
    category: 'algebra',
  },
  {
    id: 'rational_expressions',
    name: 'Rational Expressions',
    description: 'Simplifying and solving rational expressions',
    icon: '⊘',
    gradeRange: [10, 11],
    category: 'algebra',
  },
  {
    id: 'geometry_proofs',
    name: 'Geometry & Proofs',
    description: 'Triangles, circles, and geometric proofs',
    icon: '△',
    gradeRange: [9, 11],
    category: 'geometry',
  },
  {
    id: 'exponents',
    name: 'Exponents & Radicals',
    description: 'Powers, roots, and exponential growth',
    icon: '²',
    gradeRange: [8, 11],
    category: 'algebra',
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Calculate odds and probability events',
    icon: '🎲',
    gradeRange: [7, 12],
    category: 'data',
  },

  // ===== GRADES 11-12 (Advanced & Real-World) =====
  {
    id: 'simple_interest',
    name: 'Simple Interest',
    description: 'Calculate interest on loans and savings',
    icon: '💵',
    gradeRange: [9, 12],
    category: 'finance',
    realWorldContext: 'savings accounts and loans',
  },
  {
    id: 'compound_interest',
    name: 'Compound Interest',
    description: 'Understanding compound interest and investments',
    icon: '📈',
    gradeRange: [10, 12],
    category: 'finance',
    realWorldContext: 'investing and retirement savings',
  },
  {
    id: 'budgeting',
    name: 'Budgeting & Expenses',
    description: 'Create budgets and manage expenses',
    icon: '💳',
    gradeRange: [10, 12],
    category: 'finance',
    realWorldContext: 'personal finance and monthly bills',
  },
  {
    id: 'taxes',
    name: 'Tax Calculations',
    description: 'Calculate sales tax, income tax, and deductions',
    icon: '🧾',
    gradeRange: [11, 12],
    category: 'finance',
    realWorldContext: 'filing taxes and understanding paychecks',
  },
  {
    id: 'loans_mortgages',
    name: 'Loans & Mortgages',
    description: 'Calculate loan payments and total interest',
    icon: '🏠',
    gradeRange: [11, 12],
    category: 'finance',
    realWorldContext: 'buying a car or home',
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    description: 'Sine, cosine, tangent, and applications',
    icon: '📐',
    gradeRange: [10, 12],
    category: 'advanced',
  },
  {
    id: 'functions',
    name: 'Functions',
    description: 'Function notation and transformations',
    icon: 'f(x)',
    gradeRange: [9, 12],
    category: 'algebra',
  },
  {
    id: 'statistics_advanced',
    name: 'Advanced Statistics',
    description: 'Standard deviation, distributions, hypothesis testing',
    icon: '📊',
    gradeRange: [11, 12],
    category: 'data',
  },
  {
    id: 'calculus_basics',
    name: 'Calculus Basics',
    description: 'Limits, derivatives, and integrals',
    icon: '∫',
    gradeRange: [11, 12],
    category: 'advanced',
  },
];

/**
 * Get topics available for a specific grade level
 */
export function getTopicsForGrade(gradeLevel: number): MathTopic[] {
  return MATH_TOPICS.filter(
    (topic) => gradeLevel >= topic.gradeRange[0] && gradeLevel <= topic.gradeRange[1]
  );
}

/**
 * Get topic by ID
 */
export function getTopicById(id: string): MathTopic | undefined {
  return MATH_TOPICS.find((topic) => topic.id === id);
}

/**
 * Calculate difficulty multiplier based on sets completed
 * Every 10 questions = 1 set, difficulty increases
 */
export function getDifficultyMultiplier(setsCompleted: number): number {
  // Starts at 1.0, increases by 0.15 per set, caps at 2.5x
  return Math.min(1.0 + (setsCompleted * 0.15), 2.5);
}
