/**
 * Comprehensive Curriculum Data - K-12 Math Standards
 * Based on Common Core and Advanced Placement standards
 */

export interface CurriculumTopic {
  id: string;
  name: string;
  category: string;
  gradeLevel: number;
  description: string;
  skills: string[];
  prerequisites?: string[];
}

export const CURRICULUM_BY_GRADE: Record<number, CurriculumTopic[]> = {
  0: [ // Kindergarten
    { id: 'k_counting', name: 'Counting 1-20', category: 'counting', gradeLevel: 0, description: 'Count objects and recognize numbers', skills: ['counting', 'number_recognition'] },
    { id: 'k_shapes', name: 'Basic Shapes', category: 'geometry', gradeLevel: 0, description: 'Identify circles, squares, triangles', skills: ['shape_recognition'] },
    { id: 'k_comparison', name: 'Comparing Numbers', category: 'comparison', gradeLevel: 0, description: 'More, less, same', skills: ['comparison'] },
    { id: 'k_addition', name: 'Adding to 10', category: 'addition', gradeLevel: 0, description: 'Simple addition with objects', skills: ['basic_addition'] },
  ],
  
  1: [ // Grade 1
    { id: '1_addition', name: 'Addition Facts to 20', category: 'addition', gradeLevel: 1, description: 'Master basic addition', skills: ['single_digit_addition'] },
    { id: '1_subtraction', name: 'Subtraction Facts to 20', category: 'subtraction', gradeLevel: 1, description: 'Master basic subtraction', skills: ['single_digit_subtraction'] },
    { id: '1_place_value', name: 'Place Value (Tens & Ones)', category: 'number_sense', gradeLevel: 1, description: 'Understand tens and ones', skills: ['place_value'] },
    { id: '1_measurement', name: 'Measuring Length', category: 'measurement', gradeLevel: 1, description: 'Compare and measure lengths', skills: ['measurement'] },
  ],
  
  2: [ // Grade 2
    { id: '2_addition', name: 'Two-Digit Addition', category: 'addition', gradeLevel: 2, description: 'Add two-digit numbers with regrouping', skills: ['two_digit_addition', 'regrouping'] },
    { id: '2_subtraction', name: 'Two-Digit Subtraction', category: 'subtraction', gradeLevel: 2, description: 'Subtract with borrowing', skills: ['two_digit_subtraction', 'borrowing'] },
    { id: '2_multiplication', name: 'Introduction to Multiplication', category: 'multiplication', gradeLevel: 2, description: 'Repeated addition and arrays', skills: ['multiplication_concept'] },
    { id: '2_time', name: 'Telling Time', category: 'time', gradeLevel: 2, description: 'Read clocks to the nearest 5 minutes', skills: ['time'] },
    { id: '2_money', name: 'Counting Money', category: 'money', gradeLevel: 2, description: 'Count coins and bills', skills: ['money'] },
  ],
  
  3: [ // Grade 3
    { id: '3_multiplication', name: 'Multiplication Facts', category: 'multiplication', gradeLevel: 3, description: 'Multiply within 100', skills: ['multiplication_facts'] },
    { id: '3_division', name: 'Division Facts', category: 'division', gradeLevel: 3, description: 'Divide within 100', skills: ['division_facts'] },
    { id: '3_fractions', name: 'Understanding Fractions', category: 'fractions', gradeLevel: 3, description: 'Represent fractions on number line', skills: ['fraction_basics'] },
    { id: '3_area', name: 'Area and Perimeter', category: 'geometry', gradeLevel: 3, description: 'Find area and perimeter of rectangles', skills: ['area', 'perimeter'] },
  ],
  
  4: [ // Grade 4
    { id: '4_multi_digit', name: 'Multi-Digit Multiplication', category: 'multiplication', gradeLevel: 4, description: 'Multiply up to 4 digits by 1 digit', skills: ['multi_digit_multiplication'] },
    { id: '4_division', name: 'Multi-Digit Division', category: 'division', gradeLevel: 4, description: 'Divide up to 4 digits by 1 digit', skills: ['multi_digit_division'] },
    { id: '4_fractions', name: 'Fraction Operations', category: 'fractions', gradeLevel: 4, description: 'Add and subtract fractions', skills: ['fraction_operations'] },
    { id: '4_decimals', name: 'Decimal Numbers', category: 'decimals', gradeLevel: 4, description: 'Understand and compare decimals', skills: ['decimals'] },
  ],
  
  5: [ // Grade 5
    { id: '5_decimals', name: 'Decimal Operations', category: 'decimals', gradeLevel: 5, description: 'Add, subtract, multiply, divide decimals', skills: ['decimal_operations'] },
    { id: '5_fractions', name: 'Multiplying Fractions', category: 'fractions', gradeLevel: 5, description: 'Multiply and divide fractions', skills: ['fraction_multiplication'] },
    { id: '5_volume', name: 'Volume of Shapes', category: 'geometry', gradeLevel: 5, description: 'Calculate volume of rectangular prisms', skills: ['volume'] },
    { id: '5_coordinate', name: 'Coordinate Plane', category: 'geometry', gradeLevel: 5, description: 'Plot points on coordinate plane', skills: ['coordinates'] },
  ],
  
  6: [ // Grade 6
    { id: '6_ratios', name: 'Ratios and Rates', category: 'ratios', gradeLevel: 6, description: 'Understand ratio concepts', skills: ['ratios', 'rates'] },
    { id: '6_percentages', name: 'Percentages', category: 'percentages', gradeLevel: 6, description: 'Calculate percentages', skills: ['percentages'] },
    { id: '6_integers', name: 'Integer Operations', category: 'integers', gradeLevel: 6, description: 'Work with negative numbers', skills: ['integers'] },
    { id: '6_expressions', name: 'Algebraic Expressions', category: 'algebra', gradeLevel: 6, description: 'Write and evaluate expressions', skills: ['expressions'] },
    { id: '6_equations', name: 'Solving Equations', category: 'algebra', gradeLevel: 6, description: 'Solve one-step equations', skills: ['equations'] },
  ],
  
  7: [ // Grade 7
    { id: '7_proportions', name: 'Proportional Relationships', category: 'ratios', gradeLevel: 7, description: 'Work with proportions', skills: ['proportions'] },
    { id: '7_integers', name: 'Operations with Integers', category: 'integers', gradeLevel: 7, description: 'All operations with integers', skills: ['integer_operations'] },
    { id: '7_equations', name: 'Multi-Step Equations', category: 'algebra', gradeLevel: 7, description: 'Solve multi-step equations', skills: ['multi_step_equations'] },
    { id: '7_geometry', name: 'Geometry Problems', category: 'geometry', gradeLevel: 7, description: 'Angle relationships, area, volume', skills: ['geometry'] },
  ],
  
  8: [ // Grade 8
    { id: '8_exponents', name: 'Exponents and Roots', category: 'exponents', gradeLevel: 8, description: 'Work with powers and roots', skills: ['exponents', 'roots'] },
    { id: '8_scientific', name: 'Scientific Notation', category: 'notation', gradeLevel: 8, description: 'Express numbers in scientific notation', skills: ['scientific_notation'] },
    { id: '8_linear', name: 'Linear Equations', category: 'algebra', gradeLevel: 8, description: 'Graph and solve linear equations', skills: ['linear_equations'] },
    { id: '8_functions', name: 'Functions', category: 'functions', gradeLevel: 8, description: 'Understand function concepts', skills: ['functions'] },
    { id: '8_pythagoras', name: 'Pythagorean Theorem', category: 'geometry', gradeLevel: 8, description: 'Apply Pythagorean theorem', skills: ['pythagorean_theorem'] },
  ],
  
  9: [ // Algebra I
    { id: '9_polynomials', name: 'Polynomials', category: 'algebra', gradeLevel: 9, description: 'Add, subtract, multiply polynomials', skills: ['polynomials'] },
    { id: '9_factoring', name: 'Factoring', category: 'algebra', gradeLevel: 9, description: 'Factor expressions and solve equations', skills: ['factoring'] },
    { id: '9_quadratics', name: 'Quadratic Equations', category: 'algebra', gradeLevel: 9, description: 'Solve quadratic equations', skills: ['quadratics'] },
    { id: '9_exponential', name: 'Exponential Functions', category: 'functions', gradeLevel: 9, description: 'Graph exponential functions', skills: ['exponential_functions'] },
    { id: '9_systems', name: 'Systems of Equations', category: 'algebra', gradeLevel: 9, description: 'Solve systems of linear equations', skills: ['systems'] },
  ],
  
  10: [ // Geometry
    { id: '10_triangles', name: 'Triangle Properties', category: 'geometry', gradeLevel: 10, description: 'Congruence, similarity, trigonometry', skills: ['triangles', 'trigonometry'] },
    { id: '10_circles', name: 'Circle Geometry', category: 'geometry', gradeLevel: 10, description: 'Angles, arcs, sectors', skills: ['circles'] },
    { id: '10_transformations', name: 'Transformations', category: 'geometry', gradeLevel: 10, description: 'Translations, rotations, reflections', skills: ['transformations'] },
    { id: '10_trig', name: 'Trigonometry', category: 'trigonometry', gradeLevel: 10, description: 'Sin, cos, tan and applications', skills: ['trigonometry'] },
    { id: '10_proofs', name: 'Geometric Proofs', category: 'geometry', gradeLevel: 10, description: 'Write formal proofs', skills: ['proofs'] },
  ],
  
  11: [ // Algebra II + Pre-Calculus
    { id: '11_rational', name: 'Rational Functions', category: 'functions', gradeLevel: 11, description: 'Graph and analyze rational functions', skills: ['rational_functions'] },
    { id: '11_logarithms', name: 'Logarithmic Functions', category: 'functions', gradeLevel: 11, description: 'Properties of logarithms', skills: ['logarithms'] },
    { id: '11_sequences', name: 'Sequences and Series', category: 'sequences', gradeLevel: 11, description: 'Arithmetic and geometric sequences', skills: ['sequences'] },
    { id: '11_trig_advanced', name: 'Advanced Trigonometry', category: 'trigonometry', gradeLevel: 11, description: 'Identities, equations, graphs', skills: ['advanced_trig'] },
    { id: '11_vectors', name: 'Vectors', category: 'vectors', gradeLevel: 11, description: 'Vector operations and applications', skills: ['vectors'] },
    { id: '11_statistics', name: 'Statistics Fundamentals', category: 'statistics', gradeLevel: 11, description: 'Mean, median, mode, standard deviation', skills: ['statistics'] },
    { id: '11_probability', name: 'Probability', category: 'probability', gradeLevel: 11, description: 'Calculate probabilities', skills: ['probability'] },
  ],
  
  12: [ // Calculus + Advanced Statistics
    { id: '12_limits', name: 'Limits and Continuity', category: 'calculus', gradeLevel: 12, description: 'Find limits and analyze continuity', skills: ['limits'] },
    { id: '12_derivatives', name: 'Derivatives', category: 'calculus', gradeLevel: 12, description: 'Rules of differentiation', skills: ['derivatives'] },
    { id: '12_applications', name: 'Applications of Derivatives', category: 'calculus', gradeLevel: 12, description: 'Optimization, related rates', skills: ['derivative_applications'] },
    { id: '12_integrals', name: 'Integrals', category: 'calculus', gradeLevel: 12, description: 'Definite and indefinite integrals', skills: ['integrals'] },
    { id: '12_integral_apps', name: 'Applications of Integrals', category: 'calculus', gradeLevel: 12, description: 'Area, volume, work', skills: ['integral_applications'] },
    { id: '12_statistics', name: 'Advanced Statistics', category: 'statistics', gradeLevel: 12, description: 'Hypothesis testing, confidence intervals', skills: ['advanced_statistics'] },
    { id: '12_distributions', name: 'Probability Distributions', category: 'statistics', gradeLevel: 12, description: 'Normal, binomial distributions', skills: ['distributions'] },
  ],
};

// Problem templates for each topic
export interface ProblemTemplate {
  topicId: string;
  templates: {
    question: string;
    answerFormat: string;
    difficulty: number;
    hints: string[];
  }[];
}

export const PROBLEM_TEMPLATES: Record<string, ProblemTemplate> = {
  // Kindergarten
  k_counting: {
    topicId: 'k_counting',
    templates: [
      { question: 'Count the stars: {{objects}}', answerFormat: 'number', difficulty: 1, hints: ['Point to each star as you count!'] },
      { question: 'What number comes after {{n}}?', answerFormat: 'number', difficulty: 1, hints: ['Count up from {{n}}'] },
    ]
  },
  
  // High School Calculus
  '12_limits': {
    topicId: '12_limits',
    templates: [
      { question: 'Find lim(x→{{a}}) (x² - {{b}})', answerFormat: 'expression', difficulty: 5, hints: ['Substitute x = {{a}} directly', 'Simplify the expression first'] },
      { question: 'Evaluate lim(x→{{a}}) (x - {{a}})/(x² - {{a²}})', answerFormat: 'expression', difficulty: 5, hints: ['Factor the denominator', 'Cancel common factors', 'Then substitute'] },
    ]
  },
  
  '12_derivatives': {
    topicId: '12_derivatives',
    templates: [
      { question: 'Find d/dx[{{a}}x² + {{b}}x + {{c}}]', answerFormat: 'expression', difficulty: 5, hints: ['Use power rule: d/dx[xⁿ] = nxⁿ⁻¹', 'Derivative of constant is 0'] },
      { question: 'Find d/dx[sin({{a}}x)]', answerFormat: 'expression', difficulty: 5, hints: ['Remember: d/dx[sin(x)] = cos(x)', 'Use chain rule for the coefficient'] },
      { question: 'Find d/dx[e^({{a}}x)]', answerFormat: 'expression', difficulty: 5, hints: ['d/dx[eˣ] = eˣ', 'Use chain rule'] },
    ]
  },
  
  '12_integrals': {
    topicId: '12_integrals',
    templates: [
      { question: '∫({{a}}x + {{b}}) dx', answerFormat: 'expression', difficulty: 5, hints: ['∫xⁿ dx = xⁿ⁺¹/(n+1) + C', 'Integrate each term separately'] },
      { question: '∫₀^{{b}} {{a}}x² dx', answerFormat: 'number', difficulty: 5, hints: ['Find the antiderivative first', 'Use fundamental theorem: F(b) - F(a)'] },
    ]
  },
  
  '12_statistics': {
    topicId: '12_statistics',
    templates: [
      { question: 'A sample has mean {{mean}} and standard deviation {{sd}}. Find the 95% confidence interval for n={{n}}.', answerFormat: 'interval', difficulty: 5, hints: ['CI = mean ± (z * sd/√n)', 'For 95%, z = 1.96'] },
      { question: 'Test H₀: μ = {{mu0}} vs H₁: μ > {{mu0}} with x̄ = {{xbar}}, s = {{s}}, n = {{n}}. Find the p-value.', answerFormat: 'number', difficulty: 5, hints: ['Calculate t = (x̄ - μ₀)/(s/√n)', 'Find p-value from t-distribution'] },
    ]
  },
};

export function getTopicsForGrade(gradeLevel: number): CurriculumTopic[] {
  return CURRICULUM_BY_GRADE[gradeLevel] || [];
}

export function getAllGradeLevels(): number[] {
  return Object.keys(CURRICULUM_BY_GRADE).map(Number).sort((a, b) => a - b);
}

