/**
 * Topic-Specific Problem Generators
 * Generates problems for each math topic with adaptive difficulty
 */

import type { Problem } from '@/types';
import { getDifficultyMultiplier } from './math-topics';

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

interface GeneratorParams {
  gradeLevel: number;
  difficulty: number; // 1-5
  setsCompleted: number; // For progressive difficulty
}

/**
 * COUNTING & NUMBERS (K-1)
 */
export function generateCountingProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  const maxNum = Math.min(10 + Math.floor(diffMulti * 10), 100);
  
  const num = randInt(1, maxNum);
  const operations = [
    { q: `Count: How many stars are there? ${'⭐'.repeat(num)}`, a: String(num) },
    { q: `What number comes after ${num}?`, a: String(num + 1) },
    { q: `What number comes before ${num}?`, a: String(num - 1) },
  ];
  
  const problem = operations[randInt(0, operations.length - 1)];
  
  return {
    id: `counting_${Date.now()}_${Math.random()}`,
    question: problem.q,
    answer: problem.a,
    difficulty: 1,
    category: 'addition',
    gradeLevel,
    skills: ['counting', 'number_recognition'],
    hints: [
      { order: 1, content: 'Count carefully, one at a time!', cost: 3 },
      { order: 2, content: 'Use your fingers to help count!', cost: 5 },
    ],
    xpReward: 15,
  };
}

/**
 * MONEY COUNTING (Grades 2-3)
 */
export function generateMoneyProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const maxDollars = Math.floor(5 * diffMulti);
  const maxCoins = Math.floor(8 * diffMulti);
  
  const dollars = randInt(0, maxDollars);
  const quarters = randInt(0, Math.min(maxCoins, 3));
  const dimes = randInt(0, Math.min(maxCoins - quarters, 5));
  const nickels = randInt(0, Math.min(maxCoins - quarters - dimes, 4));
  const pennies = randInt(0, Math.min(maxCoins - quarters - dimes - nickels, 10));
  
  const totalCents = dollars * 100 + quarters * 25 + dimes * 10 + nickels * 5 + pennies;
  const totalDollars = (totalCents / 100).toFixed(2);
  
  let question = 'How much money do you have?\n';
  if (dollars > 0) question += `${dollars} dollar${dollars > 1 ? 's' : ''}\n`;
  if (quarters > 0) question += `${quarters} quarter${quarters > 1 ? 's' : ''} (25¢ each)\n`;
  if (dimes > 0) question += `${dimes} dime${dimes > 1 ? 's' : ''} (10¢ each)\n`;
  if (nickels > 0) question += `${nickels} nickel${nickels > 1 ? 's' : ''} (5¢ each)\n`;
  if (pennies > 0) question += `${pennies} penn${pennies > 1 ? 'ies' : 'y'} (1¢ each)`;
  
  return {
    id: `money_${Date.now()}_${Math.random()}`,
    question,
    answer: `$${totalDollars}`,
    difficulty: Math.min(2 + Math.floor(diffMulti), 4) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['money', 'addition', 'decimals'],
    hints: [
      { order: 1, content: 'Start by adding the dollars, then count the coins!', cost: 5 },
      { order: 2, content: `Quarters=25¢, Dimes=10¢, Nickels=5¢, Pennies=1¢`, cost: 8 },
      { order: 3, content: `Total cents = ${totalCents}¢ = $${totalDollars}`, cost: 12 },
    ],
    xpReward: 30 + Math.floor(setsCompleted * 3),
  };
}

/**
 * TELLING TIME (Grades 2-3)
 */
export function generateTimeProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const hour = randInt(1, 12);
  const minute = diffMulti < 1.5 ? [0, 15, 30, 45][randInt(0, 3)] : randInt(0, 59);
  
  const problems = [
    {
      q: `What time is it when the clock shows ${hour}:${minute.toString().padStart(2, '0')}?`,
      a: `${hour}:${minute.toString().padStart(2, '0')}`,
    },
    {
      q: `If it's ${hour}:00 now, what time will it be in ${randInt(1, 3)} hour(s)?`,
      a: `${((hour + randInt(1, 3) - 1) % 12) + 1}:00`,
    },
  ];
  
  const problem = problems[randInt(0, problems.length - 1)];
  
  return {
    id: `time_${Date.now()}_${Math.random()}`,
    question: problem.q,
    answer: problem.a,
    difficulty: Math.min(2 + Math.floor(diffMulti), 4) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['telling_time', 'time_intervals'],
    hints: [
      { order: 1, content: 'The short hand shows hours, the long hand shows minutes', cost: 5 },
      { order: 2, content: 'Remember: 60 minutes = 1 hour', cost: 8 },
    ],
    xpReward: 25 + Math.floor(setsCompleted * 2),
  };
}

/**
 * PERCENTAGES (Grades 5-8)
 */
export function generatePercentageProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const basePrice = randInt(10, 100) * diffMulti;
  const percent = [10, 15, 20, 25, 30, 50][randInt(0, 5)];
  const discount = (basePrice * percent) / 100;
  const finalPrice = basePrice - discount;
  
  const problemTypes = [
    {
      q: `A shirt costs $${basePrice.toFixed(2)}. It's on sale for ${percent}% off. What is the sale price?`,
      a: `$${finalPrice.toFixed(2)}`,
      hint: `First find ${percent}% of $${basePrice.toFixed(2)}, then subtract from original price`,
    },
    {
      q: `What is ${percent}% of ${Math.floor(basePrice)}?`,
      a: discount.toFixed(2),
      hint: `Multiply ${Math.floor(basePrice)} × 0.${percent} (or ${Math.floor(basePrice)} × ${percent}/100)`,
    },
    {
      q: `A restaurant bill is $${basePrice.toFixed(2)}. You want to tip ${percent}%. How much is the tip?`,
      a: `$${discount.toFixed(2)}`,
      hint: `Tip = ${percent}% of $${basePrice.toFixed(2)}`,
    },
  ];
  
  const problem = problemTypes[randInt(0, problemTypes.length - 1)];
  
  return {
    id: `percentage_${Date.now()}_${Math.random()}`,
    question: problem.q,
    answer: problem.a,
    difficulty: Math.min(3 + Math.floor(diffMulti), 5) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['percentages', 'decimals', 'multiplication'],
    hints: [
      { order: 1, content: problem.hint, cost: 8 },
      { order: 2, content: `Convert ${percent}% to decimal: ${percent / 100}`, cost: 12 },
    ],
    xpReward: 35 + Math.floor(setsCompleted * 4),
  };
}

/**
 * SIMPLE INTEREST (Grades 9-12)
 */
export function generateSimpleInterestProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const principal = randInt(500, 5000) * diffMulti;
  const rate = [2, 3, 4, 5, 6, 7.5, 10][randInt(0, 6)];
  const time = randInt(1, 5);
  
  const interest = (principal * rate * time) / 100;
  const total = principal + interest;
  
  return {
    id: `simple_interest_${Date.now()}_${Math.random()}`,
    question: `You deposit $${principal.toFixed(2)} in a savings account with ${rate}% simple interest per year. How much interest will you earn after ${time} year(s)?`,
    answer: `$${interest.toFixed(2)}`,
    difficulty: Math.min(4 + Math.floor(diffMulti), 5) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['simple_interest', 'percentages', 'personal_finance'],
    hints: [
      { order: 1, content: 'Formula: Interest = Principal × Rate × Time', cost: 10 },
      { order: 2, content: `I = $${principal.toFixed(2)} × ${rate/100} × ${time}`, cost: 15 },
      { order: 3, content: `Interest = $${interest.toFixed(2)}, Total = $${total.toFixed(2)}`, cost: 20 },
    ],
    xpReward: 50 + Math.floor(setsCompleted * 5),
  };
}

/**
 * COMPOUND INTEREST (Grades 10-12)
 */
export function generateCompoundInterestProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const principal = randInt(1000, 10000);
  const rate = [3, 4, 5, 6, 7, 8][randInt(0, 5)];
  const time = randInt(2, 10);
  
  const amount = principal * Math.pow(1 + rate / 100, time);
  const interest = amount - principal;
  
  return {
    id: `compound_interest_${Date.now()}_${Math.random()}`,
    question: `You invest $${principal.toFixed(2)} at ${rate}% annual compound interest. What will your investment be worth after ${time} years?`,
    answer: `$${amount.toFixed(2)}`,
    difficulty: 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['compound_interest', 'exponents', 'personal_finance'],
    hints: [
      { order: 1, content: 'Formula: A = P(1 + r)^t', cost: 12 },
      { order: 2, content: `A = $${principal} × (1.${rate.toString().padStart(2, '0')})^${time}`, cost: 18 },
      { order: 3, content: `Total = $${amount.toFixed(2)}, Interest earned = $${interest.toFixed(2)}`, cost: 25 },
    ],
    xpReward: 60 + Math.floor(setsCompleted * 6),
  };
}

/**
 * TAX CALCULATIONS (Grades 11-12)
 */
export function generateTaxProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  const diffMulti = getDifficultyMultiplier(setsCompleted);
  
  const problemTypes = [
    // Sales Tax
    () => {
      const price = randInt(20, 200) * diffMulti;
      const taxRate = [5, 6, 7, 8, 9, 10][randInt(0, 5)];
      const tax = (price * taxRate) / 100;
      const total = price + tax;
      
      return {
        q: `You buy something for $${price.toFixed(2)}. Sales tax is ${taxRate}%. What is the total with tax?`,
        a: `$${total.toFixed(2)}`,
        hint: `Tax = $${price.toFixed(2)} × ${taxRate}% = $${tax.toFixed(2)}. Total = $${total.toFixed(2)}`,
      };
    },
    // Income Tax
    () => {
      const income = randInt(30000, 80000);
      const taxRate = [10, 12, 15, 22][randInt(0, 3)];
      const tax = (income * taxRate) / 100;
      const takeHome = income - tax;
      
      return {
        q: `Your annual income is $${income.toLocaleString()}. You pay ${taxRate}% income tax. How much tax do you owe?`,
        a: `$${tax.toFixed(2)}`,
        hint: `Tax = $${income.toLocaleString()} × ${taxRate}% = $${tax.toLocaleString()}`,
      };
    },
  ];
  
  const generator = problemTypes[randInt(0, problemTypes.length - 1)];
  const problem = generator();
  
  return {
    id: `tax_${Date.now()}_${Math.random()}`,
    question: problem.q,
    answer: problem.a,
    difficulty: Math.min(4 + Math.floor(diffMulti), 5) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['taxes', 'percentages', 'personal_finance'],
    hints: [
      { order: 1, content: problem.hint, cost: 12 },
      { order: 2, content: 'Tax = Price × Tax Rate (as decimal)', cost: 18 },
    ],
    xpReward: 55 + Math.floor(setsCompleted * 5),
  };
}

/**
 * BUDGETING (Grades 10-12)
 */
export function generateBudgetingProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  
  const monthlyIncome = randInt(2000, 5000);
  const rent = Math.floor(monthlyIncome * 0.3);
  const utilities = randInt(100, 200);
  const food = randInt(300, 500);
  const transportation = randInt(150, 300);
  
  const totalExpenses = rent + utilities + food + transportation;
  const remaining = monthlyIncome - totalExpenses;
  
  return {
    id: `budgeting_${Date.now()}_${Math.random()}`,
    question: `Your monthly income is $${monthlyIncome.toLocaleString()}. Expenses: Rent $${rent}, Utilities $${utilities}, Food $${food}, Transportation $${transportation}. How much money is left for savings?`,
    answer: `$${remaining}`,
    difficulty: Math.min(3 + Math.floor(getDifficultyMultiplier(setsCompleted)), 5) as 1 | 2 | 3 | 4 | 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['budgeting', 'addition', 'subtraction', 'personal_finance'],
    hints: [
      { order: 1, content: 'Add all expenses first', cost: 8 },
      { order: 2, content: `Total expenses = $${totalExpenses}`, cost: 12 },
      { order: 3, content: `Remaining = $${monthlyIncome} - $${totalExpenses} = $${remaining}`, cost: 18 },
    ],
    xpReward: 45 + Math.floor(setsCompleted * 4),
  };
}

/**
 * LOANS & MORTGAGES (Grades 11-12)
 */
export function generateLoanProblem(params: GeneratorParams): Problem {
  const { gradeLevel, setsCompleted } = params;
  
  const loanAmount = randInt(10000, 30000);
  const interestRate = [3, 4, 5, 6, 7][randInt(0, 4)];
  const years = [2, 3, 4, 5][randInt(0, 3)];
  
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                         (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loanAmount;
  
  return {
    id: `loan_${Date.now()}_${Math.random()}`,
    question: `You take out a $${loanAmount.toLocaleString()} car loan at ${interestRate}% annual interest for ${years} years. What is your approximate monthly payment? (Use simplified calculation: divide total by months)`,
    answer: `$${((loanAmount + totalInterest) / numPayments).toFixed(2)}`,
    difficulty: 5,
    category: 'word_problems',
    gradeLevel,
    skills: ['loans', 'interest', 'personal_finance'],
    hints: [
      { order: 1, content: `Total interest ≈ $${totalInterest.toFixed(2)}`, cost: 15 },
      { order: 2, content: `Total to pay = Loan + Interest = $${totalPaid.toFixed(2)}`, cost: 20 },
      { order: 3, content: `Monthly payment = Total ÷ ${numPayments} months`, cost: 25 },
    ],
    xpReward: 65 + Math.floor(setsCompleted * 6),
  };
}

/**
 * Master generator that routes to topic-specific generators
 */
export function generateTopicProblem(
  topicId: string,
  params: GeneratorParams
): Problem | null {
  const generators: Record<string, (params: GeneratorParams) => Problem> = {
    counting: generateCountingProblem,
    money_counting: generateMoneyProblem,
    telling_time: generateTimeProblem,
    percentages: generatePercentageProblem,
    simple_interest: generateSimpleInterestProblem,
    compound_interest: generateCompoundInterestProblem,
    taxes: generateTaxProblem,
    budgeting: generateBudgetingProblem,
    loans_mortgages: generateLoanProblem,
  };
  
  const generator = generators[topicId];
  return generator ? generator(params) : null;
}
