/**
 * Dynamic Problem Generator
 * Generates math problems based on curriculum standards
 */

import type { Problem } from '@/types';
import { CURRICULUM_BY_GRADE, PROBLEM_TEMPLATES } from './curriculum-data';

interface GenerateOptions {
  gradeLevel: number;
  topicId?: string;
  count?: number;
  difficulty?: number;
}

// Helper to generate random numbers
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to replace template variables
function fillTemplate(template: string, vars: Record<string, any>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  return result;
}

export function generateProblems(options: GenerateOptions): Problem[] {
  const { gradeLevel, topicId, count = 5, difficulty } = options;
  const problems: Problem[] = [];
  
  const topics = CURRICULUM_BY_GRADE[gradeLevel] || [];
  const selectedTopics = topicId 
    ? topics.filter(t => t.id === topicId)
    : topics;
  
  if (selectedTopics.length === 0) {
    // Fallback to basic generation
    return generateFallbackProblems(gradeLevel, count);
  }
  
  for (let i = 0; i < count; i++) {
    const topic = selectedTopics[i % selectedTopics.length];
    const problem = generateProblemForTopic(topic, gradeLevel, difficulty);
    if (problem) {
      problems.push(problem);
    }
  }
  
  return problems;
}

function generateProblemForTopic(
  topic: any,
  gradeLevel: number,
  targetDifficulty?: number
): Problem | null {
  const templates = PROBLEM_TEMPLATES[topic.id];
  
  if (!templates || templates.templates.length === 0) {
    // Generate based on category
    return generateByCategoryAndGrade(topic.category, gradeLevel, targetDifficulty);
  }
  
  const template = templates.templates[randInt(0, templates.templates.length - 1)];
  
  // Generate variables based on grade level
  const vars = generateVariablesForGrade(gradeLevel, topic.category);
  
  const question = fillTemplate(template.question, vars);
  const hints = template.hints.map(h => fillTemplate(h, vars));
  
  return {
    id: `${topic.id}_${Date.now()}_${randInt(1000, 9999)}`,
    question,
    answer: calculateAnswer(question, vars, topic.category),
    difficulty: (targetDifficulty || template.difficulty) as 1 | 2 | 3 | 4 | 5,
    category: topic.category as any,
    gradeLevel,
    skills: topic.skills,
    hints: hints.map((content, i) => ({ order: i + 1, content, cost: 5 * (i + 1) })),
    xpReward: 25 + (gradeLevel * 5),
  };
}

function generateVariablesForGrade(gradeLevel: number, category: string): Record<string, any> {
  const vars: Record<string, any> = {};
  
  if (gradeLevel === 0) {
    vars.n = randInt(1, 10);
    vars.objects = '⭐'.repeat(randInt(1, 5));
    vars.a = randInt(1, 5);
    vars.b = randInt(1, 5);
  } else if (gradeLevel <= 2) {
    vars.a = randInt(1, 20);
    vars.b = randInt(1, 20);
    vars.n = randInt(1, 100);
  } else if (gradeLevel <= 5) {
    vars.a = randInt(5, 50);
    vars.b = randInt(5, 50);
    vars.n = randInt(10, 200);
  } else if (gradeLevel <= 8) {
    vars.a = randInt(10, 100);
    vars.b = randInt(10, 100);
    vars.n = randInt(50, 500);
  } else {
    // High school
    vars.a = randInt(1, 10);
    vars.b = randInt(1, 20);
    vars.c = randInt(-10, 10);
    vars.mean = randInt(50, 100);
    vars.sd = randInt(5, 20);
    vars.n = randInt(30, 100);
    vars.mu0 = randInt(40, 90);
    vars.xbar = randInt(45, 95);
    vars.s = randInt(5, 15);
    vars['a²'] = vars.a * vars.a; // Use string key for superscript character
  }
  
  return vars;
}

function calculateAnswer(question: string, vars: Record<string, any>, category: string): string {
  // Basic answer calculation (simplified - in production would use math parser)
  const { a, b, c } = vars;
  
  if (question.includes(' + ')) {
    const match = question.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) return String(Number(match[1]) + Number(match[2]));
  }
  
  if (question.includes(' - ')) {
    const match = question.match(/(\d+)\s*-\s*(\d+)/);
    if (match) return String(Math.max(0, Number(match[1]) - Number(match[2])));
  }
  
  if (question.includes(' × ') || question.includes(' * ')) {
    const match = question.match(/(\d+)\s*[×*]\s*(\d+)/);
    if (match) return String(Number(match[1]) * Number(match[2]));
  }
  
  if (question.includes(' ÷ ') || question.includes(' / ')) {
    const match = question.match(/(\d+)\s*[÷/]\s*(\d+)/);
    if (match) return String(Math.floor(Number(match[1]) / Number(match[2])));
  }
  
  // For complex problems, return a placeholder that would need AI validation
  return '?';
}

function generateByCategoryAndGrade(
  category: string,
  gradeLevel: number,
  difficulty?: number
): Problem {
  const id = `${category}_${gradeLevel}_${Date.now()}_${randInt(1000, 9999)}`;
  
  // Calculus problems for grades 11-12
  if (gradeLevel >= 11 && category === 'calculus') {
    const problems = [
      {
        question: `Find the derivative: d/dx[${randInt(1, 5)}x² + ${randInt(1, 10)}x + ${randInt(1, 20)}]`,
        answer: 'use AI for validation',
        category: 'calculus',
        hints: [
          'Use the power rule: d/dx[xⁿ] = nxⁿ⁻¹',
          'The derivative of a constant is 0',
          'Differentiate each term separately'
        ]
      },
      {
        question: `Evaluate: ∫(${randInt(1, 5)}x + ${randInt(1, 10)}) dx`,
        answer: 'use AI for validation',
        category: 'calculus',
        hints: [
          '∫xⁿ dx = xⁿ⁺¹/(n+1) + C',
          'Integrate each term separately',
          "Don't forget the constant of integration!"
        ]
      },
      {
        question: `Find lim(x→${randInt(1, 5)}) (x² - ${randInt(1, 10)}x + ${randInt(1, 20)})`,
        answer: 'use AI for validation',
        category: 'calculus',
        hints: [
          'For polynomial limits, direct substitution usually works',
          'Substitute the limit value for x',
          'Simplify the result'
        ]
      }
    ];
    
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id,
      question: problem.question,
      answer: problem.answer,
      difficulty: 5,
      category: 'calculus' as any,
      gradeLevel,
      skills: ['calculus', 'derivatives', 'integrals', 'limits'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 10 * (i + 1) })),
      xpReward: 100 + (gradeLevel * 10),
    };
  }
  
  // Statistics problems for grades 11-12
  if (gradeLevel >= 11 && category === 'statistics') {
    const mean = randInt(50, 100);
    const sd = randInt(5, 20);
    const n = randInt(30, 100);
    
    const problems = [
      {
        question: `A sample of ${n} students has a mean test score of ${mean} with standard deviation ${sd}. Calculate the 95% confidence interval for the population mean.`,
        answer: 'use AI for validation',
        category: 'statistics',
        hints: [
          'Formula: CI = x̄ ± (t * s/√n)',
          'For 95% confidence with large n, use z = 1.96',
          'Calculate the margin of error first'
        ]
      },
      {
        question: `Given data set: [${Array.from({length: 5}, () => randInt(10, 50)).join(', ')}]. Find the mean, median, and standard deviation.`,
        answer: 'use AI for validation',
        category: 'statistics',
        hints: [
          'Mean = sum of all values / count',
          'Median = middle value when sorted',
          'Standard deviation measures spread from the mean'
        ]
      },
      {
        question: `A normal distribution has μ = ${mean} and σ = ${sd}. What is P(X < ${mean + sd})?`,
        answer: 'use AI for validation',
        category: 'statistics',
        hints: [
          'Standardize using z = (x - μ) / σ',
          'Look up the z-score in the standard normal table',
          'z = 1 corresponds to about 84% of the data'
        ]
      }
    ];
    
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id,
      question: problem.question,
      answer: problem.answer,
      difficulty: 5,
      category: 'statistics' as any,
      gradeLevel,
      skills: ['statistics', 'probability', 'data_analysis'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 10 * (i + 1) })),
      xpReward: 100 + (gradeLevel * 10),
    };
  }
  
  // Trig onometry for grades 9-12
  if (gradeLevel >= 9 && category === 'trigonometry') {
    const angle = randInt(0, 90);
    const side1 = randInt(3, 15);
    const side2 = randInt(3, 15);
    const problems = [
      { question: `What is sin(${angle}°)?`, answer: 'use AI for validation', hints: ['Use a calculator or unit circle', 'sin is opposite/hypotenuse'] },
      { question: `In a right triangle, if the opposite side is ${side1} and hypotenuse is ${side2}, find sin(θ).`, answer: `${side1}/${side2}`, hints: ['sin(θ) = opposite/hypotenuse', `sin(θ) = ${side1}/${side2}`] },
      { question: `Simplify: sin²(x) + cos²(x) = ?`, answer: '1', hints: ['This is a fundamental trig identity', 'The answer is always 1'] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: gradeLevel >= 11 ? 5 : 4,
      category: 'trigonometry' as any, gradeLevel, skills: ['trigonometry', 'angles', 'ratios'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 8 * (i + 1) })),
      xpReward: 75 + (gradeLevel * 5),
    };
  }

  // Quadratics for grades 9-10
  if (gradeLevel >= 9 && category === 'quadratics') {
    const a = randInt(1, 3);
    const b = randInt(-10, 10);
    const c = randInt(-10, 10);
    const problems = [
      { question: `Solve for x: x² + ${b}x + ${c} = 0`, answer: 'use AI for validation', hints: ['Use the quadratic formula', 'Or try factoring', 'x = (-b ± √(b²-4ac)) / 2a'] },
      { question: `Factor: x² + ${b}x + ${c}`, answer: 'use AI for validation', hints: ['Find two numbers that multiply to c and add to b', 'Format: (x + a)(x + b)'] },
      { question: `What is the vertex of y = x² + ${b}x + ${c}?`, answer: 'use AI for validation', hints: ['Use x = -b/(2a) to find x-coordinate', 'Then substitute to find y'] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 4,
      category: 'algebra' as any, gradeLevel, skills: ['quadratics', 'factoring', 'solving'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 7 * (i + 1) })),
      xpReward: 60 + (gradeLevel * 5),
    };
  }

  // Algebra for grades 6-10
  if (gradeLevel >= 6 && category === 'algebra') {
    const a = randInt(2, 10);
    const b = randInt(1, 20);
    const c = randInt(1, 30);
    if (gradeLevel >= 9) {
      // High school algebra
      const problems = [
        { question: `Solve: ${a}x + ${b} = ${c}`, answer: String(Math.round(((c - b) / a) * 100) / 100), hints: ['Subtract ${b} from both sides', 'Then divide by ${a}'] },
        { question: `Simplify: ${a}(x + ${b})`, answer: `${a}x + ${a * b}`, hints: ['Distribute ${a} to both terms', `${a} × x = ${a}x`, `${a} × ${b} = ${a * b}`] },
        { question: `If f(x) = ${a}x + ${b}, find f(${randInt(1, 10)})`, answer: 'use AI for validation', hints: ['Substitute the value for x', 'Multiply then add'] },
      ];
      const problem = problems[randInt(0, problems.length - 1)];
      return {
        id, question: problem.question, answer: problem.answer, difficulty: 4,
        category: 'algebra' as any, gradeLevel, skills: ['algebra', 'equations', 'functions'],
        hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 6 * (i + 1) })),
        xpReward: 50 + (gradeLevel * 5),
      };
    } else {
      // Middle school algebra
      const problems = [
        { question: `Solve: ${a}x + ${b} = ${c}`, answer: String(Math.round(((c - b) / a) * 100) / 100), hints: ['Subtract ${b} from both sides', 'Then divide by ${a}'] },
        { question: `Simplify: ${a}x + ${b}x`, answer: `${a + b}x`, hints: ['Combine like terms', `${a}x + ${b}x = ${a + b}x`] },
        { question: `What is ${a}x when x = ${b}?`, answer: String(a * b), hints: ['Substitute ${b} for x', 'Multiply ${a} × ${b}'] },
      ];
      const problem = problems[randInt(0, problems.length - 1)];
      return {
        id, question: problem.question, answer: problem.answer, difficulty: 3,
        category: 'algebra' as any, gradeLevel, skills: ['algebra', 'equations', 'expressions'],
        hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 5 * (i + 1) })),
        xpReward: 40 + (gradeLevel * 5),
      };
    }
  }

  // Geometry for grades 3-10
  if (gradeLevel >= 3 && category === 'geometry') {
    const side1 = randInt(3, 15);
    const side2 = randInt(3, 15);
    const radius = randInt(2, 12);
    if (gradeLevel >= 8) {
      // High school geometry
      const problems = [
        { question: `A right triangle has legs ${side1} and ${side2}. Find the hypotenuse.`, answer: 'use AI for validation', hints: ['Use Pythagorean theorem: a² + b² = c²', `√(${side1}² + ${side2}²)`] },
        { question: `A circle has radius ${radius}. Find the area.`, answer: `${Math.round(Math.PI * radius * radius * 100) / 100}`, hints: ['Area = πr²', `π × ${radius}² ≈ ${Math.round(Math.PI * radius * radius * 100) / 100}`] },
        { question: `What is the distance between points (0,0) and (${side1},${side2})?`, answer: 'use AI for validation', hints: ['Use distance formula', '√((x₂-x₁)² + (y₂-y₁)²)'] },
      ];
      const problem = problems[randInt(0, problems.length - 1)];
      return {
        id, question: problem.question, answer: problem.answer, difficulty: 4,
        category: 'geometry' as any, gradeLevel, skills: ['geometry', 'triangles', 'circles'],
        hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 6 * (i + 1) })),
        xpReward: 50 + (gradeLevel * 5),
      };
    } else {
      // Elementary geometry
      const problems = [
        { question: `A rectangle has length ${side1} and width ${side2}. Find the area.`, answer: String(side1 * side2), hints: ['Area = length × width', `${side1} × ${side2}`] },
        { question: `A rectangle has length ${side1} and width ${side2}. Find the perimeter.`, answer: String(2 * (side1 + side2)), hints: ['Perimeter = 2(length + width)', `2(${side1} + ${side2})`] },
        { question: `A square has side length ${side1}. What is its area?`, answer: String(side1 * side1), hints: ['Area = side²', `${side1}²`] },
      ];
      const problem = problems[randInt(0, problems.length - 1)];
      return {
        id, question: problem.question, answer: problem.answer, difficulty: 2,
        category: 'geometry' as any, gradeLevel, skills: ['geometry', 'area', 'perimeter'],
        hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 4 * (i + 1) })),
        xpReward: 30 + (gradeLevel * 5),
      };
    }
  }

  // Fractions for grades 3-8
  if (gradeLevel >= 3 && gradeLevel <= 8 && category === 'fractions') {
    const num1 = randInt(1, 12);
    const denom1 = randInt(2, 12);
    const num2 = randInt(1, 12);
    const denom2 = denom1; // Same denominator for easier problems
    const problems = [
      { question: `${num1}/${denom1} + ${num2}/${denom2} = ?`, answer: `${num1 + num2}/${denom1}`, hints: ['Same denominator, add numerators', `${num1} + ${num2} = ${num1 + num2}`, `Answer: ${num1 + num2}/${denom1}`] },
      { question: `${Math.max(num1, num2)}/${denom1} - ${Math.min(num1, num2)}/${denom2} = ?`, answer: `${Math.max(num1, num2) - Math.min(num1, num2)}/${denom1}`, hints: ['Same denominator, subtract numerators'] },
      { question: `Simplify: ${num1 * 2}/${denom1 * 2}`, answer: `${num1}/${denom1}`, hints: ['Divide both by the GCF', `Both divisible by 2`] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 3,
      category: 'fractions' as any, gradeLevel, skills: ['fractions', 'operations'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 5 * (i + 1) })),
      xpReward: 35 + (gradeLevel * 5),
    };
  }

  // Decimals for grades 4-8
  if (gradeLevel >= 4 && gradeLevel <= 8 && category === 'decimals') {
    const dec1 = (randInt(10, 99) / 10).toFixed(1);
    const dec2 = (randInt(10, 99) / 10).toFixed(1);
    const problems = [
      { question: `${dec1} + ${dec2} = ?`, answer: String(parseFloat(dec1) + parseFloat(dec2)), hints: ['Line up the decimal points', 'Add like whole numbers'] },
      { question: `${Math.max(parseFloat(dec1), parseFloat(dec2))} - ${Math.min(parseFloat(dec1), parseFloat(dec2))} = ?`, answer: String(Math.max(parseFloat(dec1), parseFloat(dec2)) - Math.min(parseFloat(dec1), parseFloat(dec2))), hints: ['Line up decimals', 'Subtract'] },
      { question: `Convert ${dec1} to a fraction`, answer: 'use AI for validation', hints: ['Count decimal places', `${dec1} = ${parseFloat(dec1) * 10}/10`] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 3,
      category: 'decimals' as any, gradeLevel, skills: ['decimals', 'operations'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 5 * (i + 1) })),
      xpReward: 35 + (gradeLevel * 5),
    };
  }

  // Exponents for grades 6-10
  if (gradeLevel >= 6 && category === 'exponents') {
    const base = randInt(2, 5);
    const exp1 = randInt(2, 4);
    const exp2 = randInt(2, 4);
    const problems = [
      { question: `${base}^${exp1} = ?`, answer: String(Math.pow(base, exp1)), hints: [`Multiply ${base} by itself ${exp1} times`, `${base} × ${base}...`] },
      { question: `Simplify: x^${exp1} × x^${exp2}`, answer: `x^${exp1 + exp2}`, hints: ['Add the exponents', `${exp1} + ${exp2} = ${exp1 + exp2}`] },
      { question: `Simplify: (x^${exp1})^${exp2}`, answer: `x^${exp1 * exp2}`, hints: ['Multiply the exponents', `${exp1} × ${exp2} = ${exp1 * exp2}`] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 4,
      category: 'exponents' as any, gradeLevel, skills: ['exponents', 'powers'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 6 * (i + 1) })),
      xpReward: 40 + (gradeLevel * 5),
    };
  }

  // Integers for grades 6-8
  if (gradeLevel >= 6 && gradeLevel <= 8 && category === 'integers') {
    const int1 = randInt(-20, 20);
    const int2 = randInt(-20, 20);
    const problems = [
      { question: `${int1} + (${int2}) = ?`, answer: String(int1 + int2), hints: ['Same signs: add and keep sign', 'Different signs: subtract and use sign of larger'] },
      { question: `${int1} - (${int2}) = ?`, answer: String(int1 - int2), hints: ['Subtracting is adding the opposite', `${int1} + (${-int2})`] },
      { question: `${int1} × (${int2}) = ?`, answer: String(int1 * int2), hints: ['Same signs = positive', 'Different signs = negative'] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 3,
      category: 'integers' as any, gradeLevel, skills: ['integers', 'operations', 'negative_numbers'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 5 * (i + 1) })),
      xpReward: 35 + (gradeLevel * 5),
    };
  }

  // Division for grades 2-5
  if (gradeLevel >= 2 && gradeLevel <= 5 && category === 'division') {
    const divisor = randInt(2, 12);
    const quotient = randInt(2, 12);
    const dividend = divisor * quotient;
    const problems = [
      { question: `${dividend} ÷ ${divisor} = ?`, answer: String(quotient), hints: ['How many groups of ${divisor}?', `${divisor} × ? = ${dividend}`, `Answer: ${quotient}`] },
      { question: `${dividend} ÷ ${quotient} = ?`, answer: String(divisor), hints: ['Think: ${quotient} groups of what?'] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 2,
      category: 'division' as any, gradeLevel, skills: ['division', 'facts'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 4 * (i + 1) })),
      xpReward: 25 + (gradeLevel * 5),
    };
  }

  // Multiplication for grades 2-5
  if (gradeLevel >= 2 && gradeLevel <= 5 && category === 'multiplication') {
    const problems = [];
    
    if (gradeLevel === 2) {
      // Grade 2: introduction to multiplication (repeated addition, arrays)
      const num1 = randInt(2, 5);
      const num2 = randInt(2, 10);
      problems.push(
        { 
          question: `${num1} × ${num2} = ?`, 
          answer: String(num1 * num2), 
          hints: [`Think: ${num1} groups of ${num2}`, `${num2} + ${num2}...`, 'Count by ${num2}s'] 
        },
        { 
          question: `If you have ${num1} rows of ${num2} apples, how many apples total?`, 
          answer: String(num1 * num2), 
          hints: ['This is an array!', `${num1} rows × ${num2} columns`, 'Multiply them together'] 
        }
      );
    } else if (gradeLevel === 3) {
      // Grade 3: multiplication facts to 10×10
      const num1 = randInt(2, 10);
      const num2 = randInt(2, 10);
      problems.push(
        { 
          question: `${num1} × ${num2} = ?`, 
          answer: String(num1 * num2), 
          hints: ['Do you know this multiplication fact?', `${num1} groups of ${num2}`, 'Use skip counting or a fact family'] 
        }
      );
    } else {
      // Grades 4-5: multi-digit multiplication
      const num1 = randInt(2, 12);
      const num2 = gradeLevel >= 5 ? randInt(10, 25) : randInt(2, 12);
      problems.push(
        { 
          question: `${num1} × ${num2} = ?`, 
          answer: String(num1 * num2), 
          hints: ['Use the standard algorithm', 'Multiply each place value', 'Line up your partial products'] 
        }
      );
    }
    
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, 
      difficulty: gradeLevel === 2 ? 2 : (gradeLevel === 3 ? 2 : 3),
      category: 'multiplication' as any, gradeLevel, 
      skills: ['multiplication', gradeLevel === 2 ? 'repeated_addition' : 'facts'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 4 * (i + 1) })),
      xpReward: 25 + (gradeLevel * 5),
    };
  }

  // Subtraction for grades 1-5
  if (gradeLevel >= 1 && gradeLevel <= 5 && category === 'subtraction') {
    const problems = [];
    
    if (gradeLevel === 1) {
      // Grade 1: subtraction within 20
      const num1 = randInt(5, 20);
      const num2 = randInt(1, num1);
      problems.push({ 
        question: `${num1} - ${num2} = ?`, 
        answer: String(num1 - num2), 
        hints: ['Count backwards', `Start at ${num1}, go back ${num2}`, 'Or think: what plus ${num2} equals ${num1}?'] 
      });
    } else if (gradeLevel === 2) {
      // Grade 2: two-digit subtraction with borrowing
      const num1 = randInt(25, 95);
      const num2 = randInt(10, num1 - 5);
      problems.push({ 
        question: `${num1} - ${num2} = ?`, 
        answer: String(num1 - num2), 
        hints: ['Subtract the ones first', 'Do you need to borrow from the tens?', `${num1} - ${num2} = ?`] 
      });
    } else {
      // Grades 3-5: larger numbers
      const num1 = randInt(50, 500);
      const num2 = randInt(10, num1 - 10);
      problems.push({ 
        question: `${num1} - ${num2} = ?`, 
        answer: String(num1 - num2), 
        hints: ['Line up the place values', 'Subtract from right to left', 'Borrow if needed'] 
      });
    }
    
    const problem = problems[0];
    return {
      id, question: problem.question, answer: problem.answer, 
      difficulty: gradeLevel === 1 ? 1 : (gradeLevel === 2 ? 2 : 3),
      category: 'subtraction' as any, gradeLevel, skills: ['subtraction', gradeLevel >= 2 ? 'borrowing' : 'facts'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 3 * (i + 1) })),
      xpReward: 20 + (gradeLevel * 5),
    };
  }

  // Addition for grades K-5
  if (gradeLevel <= 5 && category === 'addition') {
    const multiplier = gradeLevel === 0 ? 10 : (gradeLevel === 1 ? 20 : (gradeLevel === 2 ? 50 : 100));
    const num1 = randInt(gradeLevel === 0 ? 1 : 2, multiplier);
    const num2 = randInt(gradeLevel === 0 ? 1 : 2, multiplier);
    
    const problems = [];
    
    if (gradeLevel === 0) {
      // Kindergarten: single digit
      problems.push({ 
        question: `${num1} + ${num2} = ?`, 
        answer: String(num1 + num2), 
        hints: ['Count up on your fingers', `Start at ${num1}, count up ${num2} more`] 
      });
    } else if (gradeLevel === 1) {
      // Grade 1: up to 20
      problems.push({ 
        question: `${num1} + ${num2} = ?`, 
        answer: String(num1 + num2), 
        hints: ['Think about making 10 first', `${num1} + ${num2} = ?`] 
      });
    } else if (gradeLevel === 2) {
      // Grade 2: two-digit addition with regrouping
      const a = randInt(15, 85);
      const b = randInt(15, 85);
      problems.push({ 
        question: `${a} + ${b} = ?`, 
        answer: String(a + b), 
        hints: ['Add the ones first, then the tens', `${a} + ${b} - Start with the ones place`, 'Do you need to regroup (carry)?'] 
      });
    } else {
      // Grades 3-5: larger numbers
      problems.push({ 
        question: `${num1} + ${num2} = ?`, 
        answer: String(num1 + num2), 
        hints: ['Line up the place values', 'Add from right to left'] 
      });
    }
    
    const problem = problems[0];
    return {
      id, question: problem.question, answer: problem.answer, 
      difficulty: gradeLevel === 0 ? 1 : (gradeLevel <= 2 ? 2 : 3),
      category: 'addition' as any, gradeLevel, skills: ['addition', gradeLevel >= 2 ? 'regrouping' : 'facts'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 3 * (i + 1) })),
      xpReward: 20 + (gradeLevel * 5),
    };
  }

  // Counting for Kindergarten
  if (gradeLevel === 0 && category === 'counting') {
    const num = randInt(1, 10);
    const objects = '⭐'.repeat(num);
    const problems = [
      { question: `Count the stars: ${objects}`, answer: String(num), hints: ['Point to each star as you count', '1, 2, 3...'] },
      { question: `What number comes after ${num}?`, answer: String(num + 1), hints: [`Count: ${num}, ...`] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 1,
      category: 'counting' as any, gradeLevel, skills: ['counting', 'number_recognition'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 2 * (i + 1) })),
      xpReward: 15,
    };
  }

  // Functions for high school
  if (gradeLevel >= 9 && category === 'functions') {
    const a = randInt(2, 8);
    const b = randInt(1, 15);
    const x = randInt(1, 10);
    const problems = [
      { question: `If f(x) = ${a}x + ${b}, find f(${x})`, answer: String(a * x + b), hints: ['Substitute ${x} for x', `${a}(${x}) + ${b}`, `= ${a * x + b}`] },
      { question: `What is the slope of f(x) = ${a}x + ${b}?`, answer: String(a), hints: ['In y = mx + b, m is the slope', `The coefficient of x is ${a}`] },
      { question: `What is the y-intercept of f(x) = ${a}x + ${b}?`, answer: String(b), hints: ['In y = mx + b, b is the y-intercept', `The constant term is ${b}`] },
    ];
    const problem = problems[randInt(0, problems.length - 1)];
    return {
      id, question: problem.question, answer: problem.answer, difficulty: 4,
      category: 'functions' as any, gradeLevel, skills: ['functions', 'linear_functions'],
      hints: problem.hints.map((content, i) => ({ order: i + 1, content, cost: 6 * (i + 1) })),
      xpReward: 50 + (gradeLevel * 5),
    };
  }

  // If no specific generator found, use very basic fallback
  const multiplier = Math.max(1, gradeLevel);
  const num1 = randInt(1, 10 * multiplier);
  const num2 = randInt(1, 10 * multiplier);
  return {
    id,
    question: `${num1} + ${num2} = ?`,
    answer: String(num1 + num2),
    difficulty: Math.min(5, Math.max(1, Math.floor(gradeLevel / 3))) as 1 | 2 | 3 | 4 | 5,
    category: 'addition' as any,
    gradeLevel,
    skills: ['addition'],
    hints: [
      { order: 1, content: 'Add the two numbers together', cost: 3 },
      { order: 2, content: `${num1} + ${num2}`, cost: 5 }
    ],
    xpReward: 15 + (gradeLevel * 5),
  };
}

function generateFallbackProblems(gradeLevel: number, count: number): Problem[] {
  const problems: Problem[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use the category-based generator which is grade-appropriate
    const categories = getCategoriesForGrade(gradeLevel);
    const category = categories[randInt(0, categories.length - 1)];
    const problem = generateByCategoryAndGrade(category, gradeLevel);
    problems.push(problem);
  }
  
  return problems;
}

function getCategoriesForGrade(gradeLevel: number): string[] {
  // More varied and challenging categories for each grade
  if (gradeLevel === 0) return ['counting', 'addition', 'geometry'];
  if (gradeLevel === 1) return ['addition', 'subtraction', 'geometry'];
  if (gradeLevel === 2) return ['addition', 'subtraction', 'multiplication', 'geometry'];
  if (gradeLevel === 3) return ['multiplication', 'division', 'fractions', 'geometry'];
  if (gradeLevel === 4) return ['multiplication', 'division', 'fractions', 'decimals', 'geometry'];
  if (gradeLevel === 5) return ['fractions', 'decimals', 'division', 'geometry', 'integers'];
  if (gradeLevel === 6) return ['fractions', 'decimals', 'integers', 'algebra', 'geometry'];
  if (gradeLevel === 7) return ['algebra', 'integers', 'geometry', 'fractions'];
  if (gradeLevel === 8) return ['algebra', 'exponents', 'geometry', 'functions'];
  if (gradeLevel === 9) return ['algebra', 'quadratics', 'functions', 'geometry'];
  if (gradeLevel === 10) return ['geometry', 'trigonometry', 'algebra', 'quadratics'];
  if (gradeLevel === 11) return ['trigonometry', 'functions', 'algebra', 'statistics'];
  return ['calculus', 'statistics', 'functions', 'trigonometry'];
}

// OLD FALLBACK - keeping for reference but not used
function OLD_generateFallbackProblems(gradeLevel: number, count: number): Problem[] {
  const problems: Problem[] = [];
  
  for (let i = 0; i < count; i++) {
    const multiplier = Math.max(1, gradeLevel);
    const num1 = randInt(1, 10 * multiplier);
    const num2 = randInt(1, 10 * multiplier);
    
    const operations = [
      {
        question: `${num1} + ${num2} = ?`,
        answer: String(num1 + num2),
        category: 'addition' as any,
      },
      {
        question: `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`,
        answer: String(Math.max(num1, num2) - Math.min(num1, num2)),
        category: 'subtraction' as any,
      },
      {
        question: `${num1} × ${num2} = ?`,
        answer: String(num1 * num2),
        category: 'multiplication' as any,
      },
    ];
    
    const op = operations[randInt(0, operations.length - 1)];
    
    problems.push({
      id: `fallback_${gradeLevel}_${Date.now()}_${i}`,
      question: op.question,
      answer: op.answer,
      difficulty: Math.min(5, Math.max(1, gradeLevel - 1)) as 1 | 2 | 3 | 4 | 5,
      category: op.category,
      gradeLevel,
      skills: [op.category],
      hints: [
        { order: 1, content: 'Take your time and work through it step by step!', cost: 5 },
        { order: 2, content: 'You can use pencil and paper to help!', cost: 10 },
      ],
      xpReward: 25 + (gradeLevel * 5),
    });
  }
  
  return problems;
}

