/**
 * FREE AI Chat - Homework Help
 * Using Groq (100% FREE with generous limits)
 */

import { NextRequest, NextResponse } from 'next/server';

// Grade-specific focus areas
function getGradeFocus(grade: number): string {
  if (grade <= 2) return 'Focus on: counting, basic addition/subtraction, simple word problems with small numbers';
  if (grade <= 5) return 'Focus on: multi-digit operations, fractions, decimals, basic multiplication/division';
  if (grade <= 8) return 'Focus on: ratios, percentages, integers, basic algebra, geometry';
  if (grade <= 10) return 'Focus on: algebra, functions, geometry, trigonometry';
  return 'Focus on: advanced algebra, calculus (limits, derivatives, integrals), statistics, probability';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, gradeLevel, userContext } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    // Enhanced smart mock responses based on keywords
    let response = '';
    
    if (lastMessage.includes('add') || lastMessage.includes('+')) {
      response = `Great question about addition! 🧙‍♂️

Addition is like gathering magical items! When we add, we're putting things together.

Here's how to solve addition problems:
1. **Start with the first number** - This is your starting amount
2. **Count up** - Add the second number by counting forward
3. **Check your answer** - Does it make sense?

**Example**: 5 + 3
- Start at 5
- Count up 3 times: 6, 7, 8
- Answer: 8!

Try breaking your problem into smaller steps. What numbers are you working with? ✨`;
    }
    else if (lastMessage.includes('subtract') || lastMessage.includes('-')) {
      response = `Excellent question about subtraction! ⭐

Subtraction is like using up magical potions! When we subtract, we're taking away.

Here's the magic formula:
1. **Start with the bigger number** - This is what you have
2. **Count backwards** - Take away the smaller number
3. **What's left?** - That's your answer!

**Example**: 8 - 3
- Start at 8
- Count back 3 times: 7, 6, 5
- Answer: 5!

Remember: subtraction is just addition backwards! Can you tell me more about your problem? 🔮`;
    }
    else if (lastMessage.includes('multiply') || lastMessage.includes('×') || lastMessage.includes('times')) {
      response = `Wonderful! Let's talk about multiplication! 🌟

Multiplication is like repeated addition - it's a magical shortcut!

Think of it this way:
- **3 × 4** means "3 groups of 4"
- Or: 4 + 4 + 4 = 12

**Tips for multiplying**:
1. Draw groups to visualize
2. Use skip counting (2, 4, 6, 8...)
3. Remember your times tables!

What multiplication problem are you working on? Let's solve it together! ✨`;
    }
    else if (lastMessage.includes('divide') || lastMessage.includes('÷') || lastMessage.includes('share')) {
      response = `Great thinking about division! 🎯

Division is like sharing equally among friends!

Here's how to think about it:
- **12 ÷ 3** means "Split 12 into 3 equal groups"
- How many in each group? That's your answer!

**Division tricks**:
1. Use counters or draw circles
2. Think: "How many groups of ___ fit into ___?"
3. Check with multiplication!

Tell me about your division problem - what are you trying to share? 🧮`;
    }
    else if (lastMessage.includes('fraction')) {
      response = `Fractions can be fun! Let me help! 🥧

A fraction is a part of a whole, like slicing a pizza!

**Understanding fractions**:
- **Top number (numerator)**: How many pieces you have
- **Bottom number (denominator)**: How many pieces total
- **Example**: 3/4 means 3 out of 4 pieces

**Visual trick**: Draw a circle and divide it!

What fraction problem are you working on? Let's break it down! ✨`;
    }
    else if (lastMessage.includes('word problem')) {
      response = `Word problems are like story-based quests! 📖✨

Here's my magical strategy:

**Step 1**: Read carefully - what's the story?
**Step 2**: Find the numbers - what do you know?
**Step 3**: Find the question - what do you need to find?
**Step 4**: Choose your operation - add, subtract, multiply, or divide?
**Step 5**: Solve and check!

**Key words to look for**:
- "in all" or "total" → probably addition
- "left" or "remain" → probably subtraction
- "each" or "groups of" → probably multiplication
- "share" or "split" → probably division

Can you share your word problem with me? Let's solve it step by step! 🔍`;
    }
    else {
      response = `Great question, young wizard! 🧙‍♂️ Let me help you with that.

When working on math problems, remember these magical steps:

1. **Read carefully** - Understand what you're being asked
2. **Identify what you know** - What numbers do you have?
3. **Find what you need** - What are you solving for?
4. **Choose your strategy** - What operation will help?
5. **Solve step-by-step** - Take your time!
6. **Check your work** - Does your answer make sense?

Can you tell me more about your specific problem? The more details you share, the better I can guide you! 

What type of math are you working on:
- Addition/Subtraction?
- Multiplication/Division?
- Fractions?
- Word problems?
- Something else?

Let me know and I'll help you master it! ✨`;
    }

    // If Groq API key is provided, use real AI
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'demo_key') {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', // Fast and free!
            messages: [
              {
                role: 'system',
                content: `You are Professor Mathwiz, a wise and friendly wizard tutor at MathWiz Academy helping a Grade ${gradeLevel} student (${userContext}).

TEACHING PRINCIPLES:
- Use Socratic method: ask leading questions, never give direct answers
- Be conversational and remember what was discussed earlier in THIS conversation
- Adapt your language and examples to Grade ${gradeLevel} level
- Use wizard/magic themes naturally
- Break down complex problems into steps
- Always acknowledge what the student said before responding
- If they're stuck, offer a hint, not the solution

GRADE ${gradeLevel} FOCUS:
${getGradeFocus(gradeLevel)}

Keep responses natural and conversational (2-4 sentences). Use 1-2 emojis maximum. Remember the conversation context!`
              },
              ...messages.filter((msg: any) => msg.role !== 'system').map((msg: any) => ({
                role: msg.role,
                content: msg.content
              }))
            ],
            temperature: 0.8,
            max_tokens: 400,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          response = data.choices[0].message.content;
        }
      } catch (error) {
        console.log('Groq API not available, using smart mock response');
      }
    }

    return NextResponse.json({
      success: true,
      response,
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}

