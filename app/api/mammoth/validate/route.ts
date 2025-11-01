/**
 * MAmmoTH API Mock - Answer Validation
 * Math reasoning model for validating answers and providing explanations
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { problem, studentAnswer, correctAnswer, gradeLevel } = await request.json();

    if (!problem || studentAnswer === undefined || !correctAnswer) {
      return NextResponse.json(
        { error: 'Problem, studentAnswer, and correctAnswer are required' },
        { status: 400 }
      );
    }

    // Normalize answers for comparison
    const normalizedStudent = String(studentAnswer).trim().toLowerCase();
    const normalizedCorrect = String(correctAnswer).trim().toLowerCase();
    
    const isCorrect = normalizedStudent === normalizedCorrect;

    // Generate detailed explanation
    const explanation = isCorrect
      ? `Excellent work! Your answer of ${studentAnswer} is correct! 🎉`
      : `Not quite. You answered ${studentAnswer}, but the correct answer is ${correctAnswer}.`;

    // Generate step-by-step reasoning (mock implementation)
    const stepByStep = generateStepByStep(problem, correctAnswer, isCorrect);

    // Identify common mistakes if incorrect
    const commonMistake = !isCorrect ? identifyCommonMistake(problem, studentAnswer, correctAnswer) : undefined;

    return NextResponse.json({
      success: true,
      is_correct: isCorrect,
      confidence: isCorrect ? 0.95 : 0.90,
      explanation,
      step_by_step: stepByStep,
      common_mistake: commonMistake,
      suggestion: !isCorrect ? "Try working through the problem step by step. Would you like a hint?" : "Great job! Ready for the next challenge?"
    });

  } catch (error: any) {
    console.error('MAmmoTH API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to validate answer' },
      { status: 500 }
    );
  }
}

function generateStepByStep(problem: string, answer: string, correct: boolean): string[] {
  // Mock step-by-step generation
  return [
    "Step 1: Read the problem carefully and identify what we need to find",
    "Step 2: Identify the numbers and operation needed",
    "Step 3: Perform the calculation",
    `Step 4: Check: The answer is ${answer}`
  ];
}

function identifyCommonMistake(problem: string, studentAnswer: string, correctAnswer: string): string {
  const mistakes = [
    "It looks like there might have been a small calculation error",
    "Double-check your addition/subtraction",
    "Make sure to carry over correctly",
    "Remember to line up the numbers properly",
    "Check if you used the right operation"
  ];
  
  return mistakes[Math.floor(Math.random() * mistakes.length)];
}

