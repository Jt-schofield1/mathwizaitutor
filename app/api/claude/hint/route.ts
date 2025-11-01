/**
 * FREE Hints - Smart contextual hints (100% FREE)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { problem, hintLevel } = await request.json();

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem is required' },
        { status: 400 }
      );
    }

    const problemLower = problem.toLowerCase();
    let hints: string[] = [];
    
    // Generate smart hints based on problem type
    if (problemLower.includes('+') || problemLower.includes('add')) {
      hints = [
        "🔮 Look at the two numbers you're adding. Which one is bigger? Start counting from there!",
        "✨ Try using your fingers! Count the first number, then count up for the second number.",
        "🪄 Break it down: If you're adding 7 + 5, you can think of it as 7 + 3 + 2 = 10 + 2 = 12!"
      ];
    }
    else if (problemLower.includes('-') || problemLower.includes('subtract') || problemLower.includes('take away')) {
      hints = [
        "🔮 Start with the bigger number and count backwards!",
        "✨ You can use objects to help. Start with the first number of items, then remove the second number.",
        "🪄 Think of it as 'what do I need to add to the smaller number to get the bigger number?'"
      ];
    }
    else if (problemLower.includes('×') || problemLower.includes('*') || problemLower.includes('times') || problemLower.includes('multiply')) {
      hints = [
        "🔮 Multiplication is like repeated addition! If you have 3 × 4, that's 4 + 4 + 4.",
        "✨ Draw groups! Make 3 circles and put 4 dots in each circle. Count them all!",
        "🪄 Use skip counting: For 3 × 4, count by 4s three times: 4, 8, 12!"
      ];
    }
    else if (problemLower.includes('÷') || problemLower.includes('divide') || problemLower.includes('share')) {
      hints = [
        "🔮 Think about sharing equally! How many groups are you making?",
        "✨ Use counters! If you're dividing 12 by 3, make 3 groups and split 12 items equally.",
        "🪄 Ask yourself: 'How many times does the smaller number fit into the bigger number?'"
      ];
    }
    else if (problemLower.includes('many') || problemLower.includes('total') || problemLower.includes('how')) {
      hints = [
        "🔮 What operation do you need? Look for key words like 'in all', 'left', 'each', or 'share'.",
        "✨ Draw a picture to help visualize the problem!",
        "🪄 Break the problem into steps: What do you know? What do you need to find?"
      ];
    }
    else {
      hints = [
        "🔮 Let's break this down step by step. What information do you have?",
        "✨ Try drawing a picture or using objects to represent the problem.",
        "🪄 Think about what operation might help: adding, subtracting, multiplying, or dividing?"
      ];
    }

    const hint = hints[Math.min(hintLevel - 1, hints.length - 1)] || hints[0];
    
    const encouragements = [
      "You're doing great! Keep thinking like a wizard! 🧙‍♂️",
      "You've got this! Every wizard starts somewhere! ⭐",
      "Keep going, young wizard! You're closer than you think! 🌟",
      "Brilliant effort! Let's figure this out together! ✨"
    ];
    
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

    return NextResponse.json({
      success: true,
      hint,
      encouragement
    });

  } catch (error: any) {
    console.error('Hint API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate hint' },
      { status: 500 }
    );
  }
}

