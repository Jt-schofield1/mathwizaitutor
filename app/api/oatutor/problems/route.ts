/**
 * OATutor Integration - Dynamic Curriculum-Aligned Problems
 * Generates problems based on real curriculum standards K-12
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateProblems } from '@/lib/problem-generator';

export async function POST(request: NextRequest) {
  try {
    const { gradeLevel, category, topicId, skillLevels, count = 5, difficulty } = await request.json();

    if (gradeLevel === undefined || gradeLevel === null) {
      return NextResponse.json(
        { error: 'Grade level is required' },
        { status: 400 }
      );
    }

    // Generate dynamic problems based on curriculum
    const problems = generateProblems({
      gradeLevel,
      topicId,
      count,
      difficulty,
    });

    // Filter by category if specified
    let filteredProblems = problems;
    if (category) {
      filteredProblems = problems.filter(p => p.category === category);
    }

    // Adaptive difficulty adjustment based on skill levels
    if (skillLevels && Object.keys(skillLevels).length > 0) {
      const avgMastery = Object.values(skillLevels).reduce((sum: number, val: any) => sum + val, 0) / Object.keys(skillLevels).length;
      
      // Adjust difficulty based on mastery
      if (avgMastery < 0.3) {
        // Struggling - give easier problems
        filteredProblems = filteredProblems.filter(p => p.difficulty <= 2);
      } else if (avgMastery < 0.6) {
        // Learning - mix of medium problems
        filteredProblems = filteredProblems.filter(p => p.difficulty >= 2 && p.difficulty <= 3);
      } else if (avgMastery < 0.85) {
        // Progressing - challenging problems
        filteredProblems = filteredProblems.filter(p => p.difficulty >= 3);
      } else {
        // Mastered - hardest problems
        filteredProblems = filteredProblems.filter(p => p.difficulty >= 4);
      }
    }

    // If we filtered too much, regenerate
    if (filteredProblems.length < count) {
      const additionalProblems = generateProblems({
        gradeLevel,
        topicId,
        count: count - filteredProblems.length,
        difficulty,
      });
      filteredProblems = [...filteredProblems, ...additionalProblems];
    }

    return NextResponse.json({
      success: true,
      problems: filteredProblems.slice(0, count),
      total: filteredProblems.length,
      gradeLevel,
      adaptive: !!skillLevels,
    });

  } catch (error: any) {
    console.error('OATutor API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate problems' },
      { status: 500 }
    );
  }
}
