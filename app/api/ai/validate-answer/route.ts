/**
 * AI Answer Validation - Uses Groq to validate answers with detailed feedback
 * This provides personalized explanations for both correct and incorrect answers
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { problem, studentAnswer, correctAnswer, gradeLevel } = await request.json();

    if (!problem || !studentAnswer) {
      return NextResponse.json(
        { error: 'Problem and student answer are required' },
        { status: 400 }
      );
    }

    // Use Groq AI for intelligent validation
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'demo_key') {
      try {
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
                content: `You are a patient math tutor for a ${gradeLevel}th grade student. Evaluate their answer and provide encouragement and guidance.

If correct: Celebrate their success and explain why it's correct briefly.
If incorrect: Gently point out the error and guide them toward the right answer WITHOUT giving it away. Help them understand their mistake.

Keep responses warm, encouraging, and age-appropriate. Use emojis sparingly.`
              },
              {
                role: 'user',
                content: `Problem: ${problem}
Student's Answer: ${studentAnswer}
Correct Answer: ${correctAnswer}

Is the student's answer correct? Provide encouraging feedback.`
              }
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const feedback = data.choices[0].message.content;
          
          // Determine if correct using exact string comparison first
          // AI feedback is for explanation only, not for correctness determination
          const normalizedStudent = String(studentAnswer).trim().toLowerCase();
          const normalizedCorrect = String(correctAnswer).trim().toLowerCase();
          
          // Try numeric comparison for math answers
          const studentNum = parseFloat(normalizedStudent);
          const correctNum = parseFloat(normalizedCorrect);
          const isNumericMatch = !isNaN(studentNum) && !isNaN(correctNum) && 
                                Math.abs(studentNum - correctNum) < 0.001;
          
          const isCorrect = normalizedStudent === normalizedCorrect || isNumericMatch;

          return NextResponse.json({
            success: true,
            isCorrect,
            feedback,
            usingAI: true,
          });
        }
      } catch (error) {
        console.log('Groq AI not available, using fallback validation');
      }
    }

    // Fallback validation
    const normalizedStudent = String(studentAnswer).trim().toLowerCase();
    const normalizedCorrect = String(correctAnswer).trim().toLowerCase();
    const isCorrect = normalizedStudent === normalizedCorrect;

    const feedback = isCorrect
      ? `🎉 Excellent work! ${correctAnswer} is correct! You're really getting the hang of this!`
      : `Not quite! The answer is ${correctAnswer}. Let's look at this problem again - what step might you have missed?`;

    return NextResponse.json({
      success: true,
      isCorrect,
      feedback,
      usingAI: false,
    });

  } catch (error: any) {
    console.error('Validation API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to validate answer' },
      { status: 500 }
    );
  }
}

