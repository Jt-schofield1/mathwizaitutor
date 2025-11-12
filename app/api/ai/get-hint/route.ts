/**
 * AI-Powered Hints - Generate personalized hints based on the specific problem
 * Adapts to student's grade level and learning needs
 */

import { NextRequest, NextResponse } from 'next/server';

// Grade-specific hint guidance
function getGradeSpecificGuidance(grade: number): string {
  if (grade === 0) {
    return 'Use very simple language. Suggest counting on fingers, drawing pictures, or using objects. Keep everything visual and concrete.';
  } else if (grade <= 2) {
    return 'Use simple words. Suggest counting strategies, number lines, or drawing groups. Make it hands-on and visual.';
  } else if (grade <= 5) {
    return 'Explain strategies like breaking numbers apart, using arrays for multiplication, or visualizing fractions as parts of a whole. Reference methods they learn in class.';
  } else if (grade <= 8) {
    return 'Help them identify the mathematical concept (ratios, proportions, equations). Guide them to set up the problem correctly before solving. Use proper mathematical terminology.';
  } else if (grade <= 10) {
    return 'Focus on algebraic thinking, graphing strategies, geometric properties, or trigonometric identities. Help them see the underlying pattern or theorem.';
  } else {
    return 'Guide them through calculus concepts (derivatives, integrals, limits), statistical analysis, or advanced algebra. Help them identify which rule or theorem applies. Use proper mathematical notation.';
  }
}

export async function POST(request: NextRequest) {
  try {
    const { problem, gradeLevel, previousAttempts, hintLevel } = await request.json();

    const parsedGradeLevel =
      typeof gradeLevel === 'number'
        ? gradeLevel
        : typeof gradeLevel === 'string'
        ? Number.parseInt(gradeLevel, 10)
        : NaN;
    const safeGradeLevel = Number.isFinite(parsedGradeLevel) ? parsedGradeLevel : 0;

    const parsedHintLevel =
      typeof hintLevel === 'number'
        ? hintLevel
        : typeof hintLevel === 'string'
        ? Number.parseInt(hintLevel, 10)
        : NaN;
    const safeHintLevel = Math.min(Math.max(Number.isFinite(parsedHintLevel) ? parsedHintLevel : 1, 1), 3);

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem is required' },
        { status: 400 }
      );
    }

    // Use Groq AI for intelligent, adaptive hints
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'demo_key') {
      try {
        const contextInfo = previousAttempts && previousAttempts.length > 0
          ? `The student has already tried: ${previousAttempts.join(', ')}`
          : 'This is their first attempt.';

        const gradeSpecificGuidance = getGradeSpecificGuidance(safeGradeLevel);

        const hintLevelInfo = safeHintLevel === 1
          ? `HINT LEVEL 1: Ask a leading question that points them to the first step or concept they need. Help them identify WHAT to do first. Use the Socratic method - ask "What do you notice about...?" or "What operation should we use when...?" ${gradeSpecificGuidance}`
          : safeHintLevel === 2
          ? `HINT LEVEL 2: Guide them through the approach step-by-step, but using questions. "First, we should... Then what happens when...?" Show them the METHOD but let them do the calculation. ${gradeSpecificGuidance}`
          : `HINT LEVEL 3: Break down the EXACT steps they need to take, but still let them complete the final answer. "Step 1: Do X which gives you Y. Step 2: Then take Y and... Now YOU finish the last step!" ${gradeSpecificGuidance}`;

          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [
                {
                  role: 'system',
                  content: `You are an expert math tutor for a ${safeGradeLevel}th grade student. Your job is to help them discover the answer through guided questions and strategic hints.

${hintLevelInfo}

TEACHING PRINCIPLES:
- Use the Socratic method: ask questions that lead to discovery
- Break complex problems into smaller, manageable steps
- Point to relevant concepts they should remember ("Remember when we learned about...")
- Use age-appropriate examples and language
- Be encouraging and build confidence
- NEVER give the final answer directly

Keep hints concise (2-3 sentences max), warm, and use 1-2 emojis to keep it friendly.`
                },
                {
                  role: 'user',
                  content: `Problem: ${problem}
${contextInfo}

Provide educational hint #${safeHintLevel} that helps them learn:`
                }
              ],
              temperature: 0.8,
              max_tokens: 200,
            }),
          });

          if (groqResponse.ok) {
            const data = await groqResponse.json();
            const hint = data.choices[0].message.content;

            return NextResponse.json({
              success: true,
              hint,
              hintLevel: safeHintLevel,
              usingAI: true,
            });
          }
        } catch (error) {
          console.log('Groq AI not available, using fallback hints');
        }
      }

      // Fallback hints with educational scaffolding
      const fallbackHints = [
        `💡 Let's start at the beginning: What operation do you think this problem is asking you to do? Look at the words and numbers carefully.`,
        `🤔 Good effort! Let's break this down step by step. First, identify the numbers you're working with. Then, what mathematical operation connects them?`,
        `✨ You're almost there! Think about what you already know about this type of problem. What's the first calculation you need to make? Try working through it piece by piece.`,
      ];

      const hint = fallbackHints[Math.min(safeHintLevel - 1, fallbackHints.length - 1)];

      return NextResponse.json({
        success: true,
        hint,
        hintLevel: safeHintLevel,
        usingAI: false,
      });

  } catch (error: any) {
    console.error('Hint API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate hint' },
      { status: 500 }
    );
  }
}

