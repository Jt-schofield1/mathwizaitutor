/**
 * AI Concept Explanation - Personalized explanations adapted to student's level
 * Helps students understand WHY, not just HOW
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { concept, gradeLevel, studentQuestion, context } = await request.json();

    if (!concept) {
      return NextResponse.json(
        { error: 'Concept is required' },
        { status: 400 }
      );
    }

    // Use Groq AI for personalized, adaptive explanations
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'demo_key') {
      try {
        const studentContext = studentQuestion 
          ? `The student specifically asked: "${studentQuestion}"`
          : `The student wants to understand: ${concept}`;

        const additionalContext = context 
          ? `Additional context: ${context}`
          : '';

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
                content: `You are Professor Mathwiz, a friendly wizard tutor at MathWiz Academy teaching a ${gradeLevel}th grade student.

Explain math concepts in a way that:
1. Is age-appropriate and easy to understand
2. Uses real-world examples they can relate to
3. Builds on concepts they already know
4. Encourages them and builds confidence
5. Uses wizard/magic themes when appropriate

Keep explanations concise (2-3 short paragraphs), warm, and engaging. Use emojis sparingly.`
              },
              {
                role: 'user',
                content: `${studentContext}

${additionalContext}

Please explain this concept clearly:`
              }
            ],
            temperature: 0.7,
            max_tokens: 400,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const explanation = data.choices[0].message.content;

          return NextResponse.json({
            success: true,
            explanation,
            concept,
            usingAI: true,
          });
        }
      } catch (error) {
        console.log('Groq AI not available, using fallback explanation');
      }
    }

    // Fallback explanation
    const explanation = `Let's understand ${concept}! 

This is an important concept in mathematics. Think of it like building blocks - once you understand this, many other concepts become easier.

Try practicing with some examples, and don't hesitate to ask for help if you get stuck. Remember, every expert was once a beginner! ✨`;

    return NextResponse.json({
      success: true,
      explanation,
      concept,
      usingAI: false,
    });

  } catch (error: any) {
    console.error('Explain API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to explain concept' },
      { status: 500 }
    );
  }
}

