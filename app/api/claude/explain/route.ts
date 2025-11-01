/**
 * FREE AI - Explain Concept
 * Smart explanations using keyword matching (100% FREE)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { concept, gradeLevel } = await request.json();

    if (!concept) {
      return NextResponse.json(
        { error: 'Concept is required' },
        { status: 400 }
      );
    }

    const conceptLower = concept.toLowerCase();
    let explanation = '';
    let examples: any[] = [];
    let nextSteps: string[] = [];

    // Smart keyword-based explanations
    if (conceptLower.includes('addition') || conceptLower.includes('add')) {
      explanation = `🧙‍♂️ **Welcome to Addition Magic!**

Addition is one of the most powerful spells in mathematics! When we add, we're combining things together to find out how many we have in total.

**The Magic Formula:**
- Start with one number
- Add another number to it
- Count up to find the total!

**Real-World Magic:**
- If you have 3 magic wands and get 2 more, you now have 5 wands!
- 3 + 2 = 5

**Wizard Tips:**
✨ Use your fingers to count
✨ Draw pictures to visualize
✨ Count on from the bigger number`;

      examples = [
        { question: "2 + 3 = ?", answer: "5", explanation: "Start at 2, count up 3 times: 3, 4, 5!" },
        { question: "If you have 4 spell books and get 3 more, how many do you have?", answer: "7", explanation: "4 + 3 = 7 spell books!" }
      ];

      nextSteps = [
        "Practice with numbers under 10",
        "Try word problems",
        "Learn to add two-digit numbers"
      ];
    }
    else if (conceptLower.includes('subtract') || conceptLower.includes('minus')) {
      explanation = `⭐ **Mastering Subtraction Spells!**

Subtraction is the art of taking away! When we subtract, we start with a number and remove some to find what's left.

**The Subtraction Spell:**
- Begin with your starting amount
- Take away the smaller number
- Count backwards to find the answer!

**Real-World Wizardry:**
- You have 8 potions and use 3 of them
- How many are left? 8 - 3 = 5 potions!

**Practice Tips:**
🔮 Count backwards carefully
🔮 Use objects to take away
🔮 Think "what's left over?"`;

      examples = [
        { question: "7 - 2 = ?", answer: "5", explanation: "Start at 7, count back 2: 6, 5!" },
        { question: "You have 9 crystals and give away 4. How many left?", answer: "5", explanation: "9 - 4 = 5 crystals remaining!" }
      ];

      nextSteps = [
        "Practice counting backwards",
        "Solve word problems",
        "Learn about borrowing"
      ];
    }
    else {
      explanation = `Let me explain ${concept} in a way that's perfect for a ${gradeLevel}th grader! ✨\n\n${concept} is like a magical spell in the world of numbers. Think of it as a way to solve puzzles!\n\n**Here's how it works:**\n1. First, we understand what the concept means\n2. Then, we see how to use it\n3. Finally, we practice until we're experts!\n\nLet's explore ${concept} together and make math magical!`;

      examples = [
        { question: "Example 1", answer: "Answer", explanation: "This shows how to use " + concept }
      ];

      nextSteps = [
        "Practice with simple problems",
        "Try different examples",
        "Ask questions if stuck"
      ];
    }

    return NextResponse.json({
      success: true,
      explanation,
      examples,
      nextSteps
    });

  } catch (error: any) {
    console.error('Explain API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate explanation' },
      { status: 500 }
    );
  }
}

