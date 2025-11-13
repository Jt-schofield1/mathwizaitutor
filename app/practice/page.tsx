/**
 * Practice Mode - Adaptive Problem Solving with Completion Tracking
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WandAnimation } from '@/components/wizard/wand-animation';
import { XPGain } from '@/components/wizard/xp-gain';
import { AchievementUnlock } from '@/components/wizard/achievement-unlock';
import { useAuthStore } from '@/lib/store';
import { updateProfile } from '@/lib/kid-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, ChevronLeft, Sparkles, Check, X, Star, Trophy, Loader2, BookOpen, ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Problem, Achievement } from '@/types';
import { getTopicsForGrade, type MathTopic, getDifficultyMultiplier } from '@/lib/math-topics';
import { generateTopicProblem } from '@/lib/topic-problem-generators';

  // Generate practice problems dynamically based on grade level
// WITH progressive difficulty - gets harder as student practices
// ENSURES VARIETY - uses random seed to prevent repetition
function generateProblemsForGrade(gradeLevel: number, count: number = 10, setsCompleted: number = 0): Problem[] {
  const problems: Problem[] = [];
  
  // Calculate difficulty multiplier based on sets completed
  const setMultiplier = getDifficultyMultiplier(setsCompleted);
  
  // Use unique seed for variety - combines timestamp + random + set number
  const varietySeed = Date.now() + Math.random() * 1000 + setsCompleted * 100;
  
  for (let i = 0; i < count; i++) {
    // Unique problem ID ensures no repetition tracking
    const problemId = `practice_${gradeLevel}_${varietySeed}_${i}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Progressive difficulty WITHIN the set: Q1 easier than Q10
    const questionMultiplier = 1.0 + (i * 0.05); // Increases by 5% per question
    const totalMultiplier = setMultiplier * questionMultiplier;
    
    if (gradeLevel === 0) {
      // Kindergarten - numbers scale with difficulty
      const maxNum = Math.min(5 + Math.floor(totalMultiplier * 3), 20);
      const num1 = Math.floor(Math.random() * maxNum) + 1;
      const num2 = Math.floor(Math.random() * Math.max(1, Math.floor(maxNum / 2))) + 1;
      problems.push({
        id: problemId,
        question: `${num1} + ${num2} = ?`,
        answer: String(num1 + num2),
        difficulty: 1,
        category: 'addition',
        gradeLevel: 0,
        skills: ['counting', 'addition'],
        hints: [
          { order: 1, content: `Start with ${num1} and count up ${num2} more!`, cost: 5 },
          { order: 2, content: `Use your fingers to help count!`, cost: 10 },
        ],
        xpReward: 20,
      });
    } else if (gradeLevel === 1) {
      // Grade 1 - scale with difficulty  
      const maxNum = Math.min(10 + Math.floor(totalMultiplier * 10), 50);
      const operations = ['add', 'subtract'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      const num1 = Math.floor(Math.random() * maxNum) + 1;
      const num2 = Math.floor(Math.random() * (op === 'subtract' ? num1 : maxNum)) + 1;
      
      if (op === 'add') {
        problems.push({
          id: problemId,
          question: `${num1} + ${num2} = ?`,
          answer: String(num1 + num2),
          difficulty: 1,
          category: 'addition',
          gradeLevel: 1,
          skills: ['addition'],
          hints: [
            { order: 1, content: `Start at ${num1} and count up!`, cost: 5 },
            { order: 2, content: `${num1} + ${num2} is the same as counting ${num2} more from ${num1}`, cost: 10 },
          ],
          xpReward: 25,
        });
      } else {
        problems.push({
          id: problemId,
          question: `${num1} - ${num2} = ?`,
          answer: String(num1 - num2),
          difficulty: 1,
          category: 'subtraction',
          gradeLevel: 1,
          skills: ['subtraction'],
          hints: [
            { order: 1, content: `Start at ${num1} and count back!`, cost: 5 },
            { order: 2, content: `${num1} take away ${num2} means count backwards ${num2} times`, cost: 10 },
          ],
          xpReward: 25,
        });
      }
    } else {
      // Grades 2+ - scale dramatically with difficulty
      const baseRange = 10 * gradeLevel;
      const maxNum = Math.min(baseRange + Math.floor(totalMultiplier * baseRange), 1000);
      const operations = ['add', 'subtract', 'multiply'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      
      const num1 = Math.floor(Math.random() * maxNum) + 1;
      const num2 = Math.floor(Math.random() * (op === 'multiply' ? Math.min(maxNum / 2, 25) : maxNum)) + 1;
      
      if (op === 'add') {
        problems.push({
          id: problemId,
          question: `${num1} + ${num2} = ?`,
          answer: String(num1 + num2),
          difficulty: Math.min(gradeLevel, 3) as 1 | 2 | 3 | 4 | 5,
          category: 'addition',
          gradeLevel,
          skills: ['addition'],
          hints: [
            { order: 1, content: `Try breaking the numbers into tens and ones!`, cost: 10 },
            { order: 2, content: `Add the ones first, then the tens`, cost: 15 },
          ],
          xpReward: 30 + (gradeLevel * 5),
        });
      } else if (op === 'subtract') {
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        problems.push({
          id: problemId,
          question: `${larger} - ${smaller} = ?`,
          answer: String(larger - smaller),
          difficulty: Math.min(gradeLevel, 3) as 1 | 2 | 3 | 4 | 5,
          category: 'subtraction',
          gradeLevel,
          skills: ['subtraction'],
          hints: [
            { order: 1, content: `Count backwards from ${larger}!`, cost: 10 },
            { order: 2, content: `Break it into tens and ones to make it easier`, cost: 15 },
          ],
          xpReward: 30 + (gradeLevel * 5),
        });
      } else {
        const maxMultiply = Math.min(12 + Math.floor(totalMultiplier * 5), 25);
        const small1 = Math.floor(Math.random() * maxMultiply) + 1;
        const small2 = Math.floor(Math.random() * maxMultiply) + 1;
        problems.push({
          id: problemId,
          question: `${small1} × ${small2} = ?`,
          answer: String(small1 * small2),
          difficulty: Math.min(gradeLevel, 4) as 1 | 2 | 3 | 4 | 5,
          category: 'multiplication',
          gradeLevel,
          skills: ['multiplication'],
          hints: [
            { order: 1, content: `Think: ${small1} groups of ${small2}`, cost: 10 },
            { order: 2, content: `You can add ${small2}, ${small1} times!`, cost: 15 },
          ],
          xpReward: 40 + (gradeLevel * 5),
        });
      }
    }
  }
  
  return problems;
}

export default function PracticePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  // Topic selection state
  const [showTopicSelector, setShowTopicSelector] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [availableTopics, setAvailableTopics] = useState<MathTopic[]>([]);
  const [setsCompleted, setSetsCompleted] = useState(0); // Track every 10 questions
  
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: '',
  });
  const [showWandAnimation, setShowWandAnimation] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [aiHint, setAiHint] = useState<string>('');
  const [fetchingHint, setFetchingHint] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [isCheckingAchievements, setIsCheckingAchievements] = useState(false);
  const [attemptsOnCurrentProblem, setAttemptsOnCurrentProblem] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [showVisualHint, setShowVisualHint] = useState(false);

  // Load available topics when user changes
  useEffect(() => {
    if (user) {
      const topics = getTopicsForGrade(user.gradeLevel);
      setAvailableTopics(topics);
    }
  }, [user?.gradeLevel]);

  // Only fetch problems on initial mount or when user ID changes
  // Don't refetch when user properties (XP, level, etc.) change
  useEffect(() => {
    if (user && selectedTopic) {
      fetchProblemsForTopic();
    } else if (user && !showTopicSelector) {
      fetchProblemsFromAPI();
    }
  }, [user?.uid, selectedTopic]); // Changed from [user] to [user?.uid]

  const fetchProblemsForTopic = async () => {
    if (!user || !selectedTopic) return;
    
    setLoading(true);
    const newProblems: Problem[] = [];
    
    // Generate 10 problems for selected topic with progressive difficulty
    for (let i = 0; i < 10; i++) {
      const problem = generateTopicProblem(selectedTopic.id, {
        gradeLevel: user.gradeLevel,
        difficulty: Math.min(1 + setsCompleted, 5),
        setsCompleted,
      });
      
      if (problem) {
        newProblems.push(problem);
      } else {
        // Fallback to regular problems if topic generator doesn't exist yet
        const fallbackProblems = generateProblemsForGrade(user.gradeLevel, 1, setsCompleted);
        if (fallbackProblems.length > 0) {
          newProblems.push(fallbackProblems[0]);
        }
      }
    }
    
    setProblems(newProblems);
    setCurrentIndex(0);
    setLoading(false);
  };

  const fetchProblemsFromAPI = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/oatutor/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeLevel: user.gradeLevel,
          skillLevels: user.skills?.reduce((acc, skill) => ({
            ...acc,
            [skill.skillId]: skill.masteryLevel
          }), {}),
          count: 10,
        }),
      });
      
      const data = await response.json();
      
      if (data.success && data.problems.length > 0) {
        setProblems(data.problems);
      } else {
        // Fallback to local generation WITH progressive difficulty
        const newProblems = generateProblemsForGrade(user.gradeLevel, 10, setsCompleted);
        setProblems(newProblems);
      }
    } catch (error) {
      console.error('Failed to fetch problems from API:', error);
      // Fallback to local generation WITH progressive difficulty
      const newProblems = generateProblemsForGrade(user.gradeLevel, 10, setsCompleted);
      setProblems(newProblems);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  const currentProblem = problems[currentIndex];
  const progressPercent = ((currentIndex) / problems.length) * 100;
  const sessionAccuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  const handleSubmit = async () => {
    if (!currentProblem || !userAnswer.trim()) return;

    setLoading(true);
    setAttemptsOnCurrentProblem(attemptsOnCurrentProblem + 1);

    try {
      // Validate answer with AI for personalized feedback
      const response = await fetch('/api/ai/validate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: currentProblem.question,
          studentAnswer: userAnswer,
          correctAnswer: currentProblem.answer,
          gradeLevel: user?.gradeLevel || 1,
        }),
      });

      const data = await response.json();
      const isCorrect = data.isCorrect;
      const aiFeedback = data.feedback;
      
      // Track wrong attempts for better hints
      if (!isCorrect) {
        setPreviousAttempts([...previousAttempts, userAnswer]);
        
        // RETRY SYSTEM: Give them 2 chances before moving on
        if (attemptsOnCurrentProblem < 2) {
          setFeedback({
            show: true,
            correct: false,
            message: `${aiFeedback || 'Not quite right.'} 💪 Try again! You've got this!`,
          });
          setUserAnswer(''); // Clear input for retry
          setLoading(false);
          return; // Don't move to next question yet
        }
      }
      
      // Update session stats
      setSessionStats({
        correct: sessionStats.correct + (isCorrect ? 1 : 0),
        total: sessionStats.total + 1,
      });

      // Generate encouraging messages based on performance
      let encouragementMessage = '';
      if (isCorrect) {
        if (attemptsOnCurrentProblem === 1 && hintIndex === 0) {
          encouragementMessage = '✨ Perfect! First try with no hints - you\'re a star! ⭐';
        } else if (attemptsOnCurrentProblem === 1) {
          encouragementMessage = '🎉 Great job! You got it!';
        } else {
          encouragementMessage = '👏 Nice work! You stuck with it and figured it out!';
        }
      } else {
        encouragementMessage = `The answer is ${currentProblem.answer}. Let me show you how to solve it! 📚`;
      }
      
      // Show AI-powered feedback with encouragement
      setFeedback({
        show: true,
        correct: isCorrect,
        message: aiFeedback || encouragementMessage,
      });
      
      // If wrong after 2 attempts, generate explanation
      if (!isCorrect && attemptsOnCurrentProblem >= 2) {
        await generateExplanation();
      }

    // Calculate accuracy rate for EVERY answer (correct or incorrect)
    const newCorrectAnswers = user.correctAnswers + (isCorrect ? 1 : 0);
    const newTotalProblems = user.totalProblemsCompleted + 1;
    const newAccuracyRate = Math.round((newCorrectAnswers / newTotalProblems) * 100);

    if (isCorrect) {
      // Award XP
      const xpEarned = currentProblem.xpReward - (hintIndex * 5);
      const newXP = user.xp + xpEarned;
      const newLevel = Math.floor(newXP / 600) + 1;
      
      // Add to completed problems list
      const completedProblemIds = [...(user.completedProblems || []), currentProblem.id];

      // Update profile with accuracy tracking
      const updated = await updateProfile(user.uid, {
        xp: newXP,
        level: newLevel,
        totalProblemsCompleted: newTotalProblems,
        correctAnswers: newCorrectAnswers,
        accuracyRate: newAccuracyRate,
        completedProblems: completedProblemIds as any,
      });

      if (updated) {
        setUser(updated);
        
        // Wait a moment for Supabase to fully save, then check for achievements
        await new Promise(resolve => setTimeout(resolve, 200));
        await checkForAchievements(updated);
      }

      // Show animations
      setShowWandAnimation(true);
      setXpGained(xpEarned);
      
      setTimeout(() => {
        setShowXPGain(true);
        setShowWandAnimation(false);
      }, 800);

      setTimeout(() => {
        setShowXPGain(false);
      }, 2500);
    } else {
      // Even if incorrect, update accuracy stats
      const updated = await updateProfile(user.uid, {
        totalProblemsCompleted: newTotalProblems,
        correctAnswers: newCorrectAnswers,
        accuracyRate: newAccuracyRate,
      });

      if (updated) {
        setUser(updated);
      }
    }
    } catch (error) {
      console.error('Error validating answer:', error);
      // Fallback to simple validation
      const isCorrect = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();
      
      // Calculate accuracy rate for fallback validation too
      const newCorrectAnswers = user.correctAnswers + (isCorrect ? 1 : 0);
      const newTotalProblems = user.totalProblemsCompleted + 1;
      const newAccuracyRate = Math.round((newCorrectAnswers / newTotalProblems) * 100);
      
      // Update session stats
      setSessionStats({
        correct: sessionStats.correct + (isCorrect ? 1 : 0),
        total: sessionStats.total + 1,
      });
      
      setFeedback({
        show: true,
        correct: isCorrect,
        message: isCorrect 
          ? `🎉 Correct! The answer is ${currentProblem.answer}!`
          : `Not quite! The correct answer is ${currentProblem.answer}. Let's try another one!`,
      });
      
      // Update profile even in fallback mode to maintain consistent accuracy tracking
      try {
        if (isCorrect) {
          const xpEarned = currentProblem.xpReward - (hintIndex * 5);
          const newXP = user.xp + xpEarned;
          const newLevel = Math.floor(newXP / 600) + 1;
          const completedProblemIds = [...(user.completedProblems || []), currentProblem.id];
          
          const updated = await updateProfile(user.uid, {
            xp: newXP,
            level: newLevel,
            totalProblemsCompleted: newTotalProblems,
            correctAnswers: newCorrectAnswers,
            accuracyRate: newAccuracyRate,
            completedProblems: completedProblemIds as any,
          });
          
          if (updated) {
            setUser(updated);
            await checkForAchievements(updated);
          }
        } else {
          // Even for incorrect answers, update accuracy stats
          const updated = await updateProfile(user.uid, {
            totalProblemsCompleted: newTotalProblems,
            correctAnswers: newCorrectAnswers,
            accuracyRate: newAccuracyRate,
          });
          
          if (updated) {
            setUser(updated);
          }
        }
      } catch (profileError) {
        console.error('Failed to update profile in fallback:', profileError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    // Reset all state first to prevent double rendering
    setFeedback({ show: false, correct: false, message: '' });
    setUserAnswer('');
    setShowHint(false);
    setHintIndex(0);
    setAiHint('');
    setPreviousAttempts([]); // Clear previous attempts for new question
    setShowWandAnimation(false);
    setShowXPGain(false);
    setUnlockedAchievements([]); // Clear achievements
    setIsCheckingAchievements(false); // Reset achievement check flag
    setAttemptsOnCurrentProblem(0); // Reset attempts counter
    setShowExplanation(false); // Hide explanation
    setExplanation(''); // Clear explanation
    setShowVisualHint(false); // Hide visual hint
    
    // Small delay to ensure state clears
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed a set of 10! Increase difficulty
      setSetsCompleted(setsCompleted + 1);
      
      // Fetch new problems (will be harder now)
      if (selectedTopic) {
        await fetchProblemsForTopic();
      } else {
        await fetchProblemsFromAPI();
      }
      setCurrentIndex(0);
    }
  };

  // Generate visual representation for young kids
  const renderVisualHint = () => {
    if (!currentProblem || user.gradeLevel > 2) return null;
    
    const question = currentProblem.question;
    const addMatch = question.match(/(\d+)\s*\+\s*(\d+)/);
    const subMatch = question.match(/(\d+)\s*-\s*(\d+)/);
    
    if (addMatch) {
      const num1 = parseInt(addMatch[1]);
      const num2 = parseInt(addMatch[2]);
      if (num1 <= 20 && num2 <= 20) {
        return (
          <div className="flex flex-col items-center gap-4 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="text-lg font-semibold text-purple-700">Visual Helper:</div>
            <div className="flex gap-4 items-center flex-wrap justify-center">
              <div className="text-4xl">{' 🟣 '.repeat(num1)}</div>
              <div className="text-2xl font-bold">+</div>
              <div className="text-4xl">{' 🟢 '.repeat(num2)}</div>
            </div>
            <div className="text-sm text-purple-600">Count all the circles!</div>
          </div>
        );
      }
    }
    
    if (subMatch) {
      const num1 = parseInt(subMatch[1]);
      const num2 = parseInt(subMatch[2]);
      if (num1 <= 20 && num2 <= num1) {
        return (
          <div className="flex flex-col items-center gap-4 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="text-lg font-semibold text-blue-700">Visual Helper:</div>
            <div className="flex gap-2 items-center flex-wrap justify-center">
              {Array.from({ length: num1 }).map((_, i) => (
                <span key={i} className={`text-3xl ${i < num2 ? 'opacity-30 line-through' : ''}`}>
                  🟣
                </span>
              ))}
            </div>
            <div className="text-sm text-blue-600">Cross out {num2}, count what's left!</div>
          </div>
        );
      }
    }
    
    return null;
  };

  const generateExplanation = async () => {
    if (!currentProblem) return;
    
    try {
      const groqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!groqKey || groqKey === 'demo_key') {
        // Fallback if no API key
        setExplanation(`Here's how to solve it:\n\n1. Look at the problem: ${currentProblem.question}\n2. The correct answer is ${currentProblem.answer}\n3. Think about the steps that lead to this answer!`);
        setShowExplanation(true);
        return;
      }
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a patient math teacher explaining how to solve a problem step-by-step for a ${user?.gradeLevel || 1}th grader. Break it down into clear steps with reasoning. Use simple language and emojis to keep it friendly. Number the steps.`,
            },
            {
              role: 'user',
              content: `Explain how to solve this step-by-step:\n\n${currentProblem.question}\n\nCorrect answer: ${currentProblem.answer}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setExplanation(data.choices[0].message.content);
        setShowExplanation(true);
      }
    } catch (error) {
      console.error('Failed to generate explanation:', error);
      // Fallback explanation
      setExplanation(`Here's how to solve it:\n\n1. Look at the problem: ${currentProblem.question}\n2. The correct answer is ${currentProblem.answer}\n3. Try to understand the steps that lead to this answer!`);
      setShowExplanation(true);
    }
  };

  const checkForAchievements = async (userProfile: typeof user) => {
    if (!userProfile) return;
    
    // Prevent duplicate checks
    if (isCheckingAchievements) {
      console.log('Achievement check already in progress, skipping...');
      return;
    }

    setIsCheckingAchievements(true);

    try {
      console.log('Checking achievements for user:', userProfile.uid);
      console.log('Current achievements:', userProfile.achievements?.map(a => a.id));
      
      const response = await fetch('/api/achievements/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userProfile.uid,
          userProfile,
        }),
      });

      const data = await response.json();

      console.log('Achievement check response:', data);

      if (data.success && data.newAchievements.length > 0) {
        console.log('New achievements unlocked:', data.newAchievements.map((a: any) => a.id));
        
        // IMPORTANT: Update user state FIRST before showing animations
        if (data.updatedProfile) {
          setUser(data.updatedProfile);
          console.log('Updated user with new achievements:', data.updatedProfile.achievements?.map((a: any) => a.id));
        }
        
        // Then show achievement unlock animation
        setUnlockedAchievements(data.newAchievements);
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    } finally {
      // Reset the flag immediately - no delay needed
      setIsCheckingAchievements(false);
    }
  };

  const handleHint = async () => {
    if (!currentProblem) return;
    
    setFetchingHint(true);
    
    try {
      // Get AI-powered hint with context of previous attempts
      const response = await fetch('/api/ai/get-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: currentProblem.question,
          gradeLevel: user?.gradeLevel || 1,
          hintLevel: hintIndex + 1,
          previousAttempts: previousAttempts,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setAiHint(data.hint);
        setShowHint(true);
        setHintIndex(hintIndex + 1);
      } else {
        // Fallback to static hint
        if (hintIndex < currentProblem.hints.length) {
          setShowHint(true);
          setHintIndex(hintIndex + 1);
        }
      }
    } catch (error) {
      console.error('Failed to get AI hint:', error);
      // Fallback to static hint
      if (hintIndex < currentProblem.hints.length) {
        setShowHint(true);
        setHintIndex(hintIndex + 1);
      }
    } finally {
      setFetchingHint(false);
    }
  };

  // Topic Selector Screen
  if (showTopicSelector && availableTopics.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-wizard-purple-50 to-wizard-gold-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center text-wizard-purple-600 hover:text-wizard-purple-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-wizard-purple-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Choose Your Practice Topic
              </CardTitle>
              <CardDescription className="text-lg">
                Select a topic to practice, or choose "Mixed Practice" for all topics. Questions get harder as you progress!
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Mixed Practice Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-4 border-wizard-gold-400 bg-gradient-to-br from-wizard-gold-50 to-wizard-purple-50"
                onClick={() => {
                  setSelectedTopic(null);
                  setShowTopicSelector(false);
                }}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-wizard-purple-800 mb-2">Mixed Practice</h3>
                  <p className="text-sm text-wizard-purple-600">All topics for your grade level</p>
                  <Badge className="mt-3 bg-wizard-gold-500">Recommended</Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Topic Options */}
            {availableTopics.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-wizard-purple-200 hover:border-wizard-purple-400"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setShowTopicSelector(false);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{topic.icon}</div>
                    <h3 className="text-xl font-bold text-wizard-purple-800 mb-2">{topic.name}</h3>
                    <p className="text-sm text-wizard-purple-600 mb-2">{topic.description}</p>
                    {topic.realWorldContext && (
                      <Badge variant="outline" className="text-xs">
                        Real-world: {topic.realWorldContext}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <p className="text-center text-wizard-purple-600">Loading magical problems...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Animations */}
      <AnimatePresence>
        {showWandAnimation && <WandAnimation show={showWandAnimation} onComplete={() => setShowWandAnimation(false)} />}
        {showXPGain && <XPGain xp={xpGained} show={showXPGain} />}
        {unlockedAchievements.length > 0 && (
          <AchievementUnlock 
            achievements={unlockedAchievements}
            onComplete={() => {
              console.log('Achievement animation complete, clearing state');
              setUnlockedAchievements([]);
              setIsCheckingAchievements(false); // Extra safety: ensure flag is reset
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-gradient-to-r from-wizard-purple-800 via-wizard-purple-700 to-wizard-purple-800 text-white px-6 py-4 shadow-2xl border-b-4 border-wizard-gold-500">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icons/crystal.svg" alt="Practice" width={40} height={40} unoptimized />
            <div>
              <h1 className="text-2xl font-bold">Practice Mode</h1>
              <p className="text-wizard-purple-200 text-sm">Adaptive problem solving</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-wizard-purple-200">Session Accuracy</div>
              <div className="text-xl font-bold">{sessionAccuracy}%</div>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-wizard-purple-700">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-wizard-purple-700">
              Problem {currentIndex + 1} of {problems.length}
            </span>
            <Badge className="bg-wizard-gold-500 text-wizard-purple-900">
              <Star className="w-3 h-3 mr-1" />
              {currentProblem.xpReward} XP
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </div>

        {/* Problem Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-4 border-wizard-purple-400 mb-6">
            <CardHeader className="bg-gradient-to-r from-wizard-purple-100 to-wizard-gold-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold text-wizard-purple-800">
                  {currentProblem.question}
                </CardTitle>
                <Badge variant="outline" className="text-lg">
                  {currentProblem.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Answer Input */}
                <div>
                  <label className="block text-sm font-semibold text-wizard-purple-700 mb-2">
                    Your Answer:
                  </label>
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !feedback.show && handleSubmit()}
                    placeholder="Type your answer here..."
                    className="text-2xl h-16 text-center font-bold border-4 border-wizard-purple-300 focus:border-wizard-purple-600"
                    disabled={feedback.show}
                    autoFocus
                  />
                </div>

                {/* Visual Helper for Young Kids */}
                {!feedback.show && user.gradeLevel <= 2 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowVisualHint(!showVisualHint)}
                    className="w-full bg-purple-50 hover:bg-purple-100 border-purple-300"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    {showVisualHint ? 'Hide' : 'Show'} Visual Helper 🎨
                  </Button>
                )}
                
                {/* Visual Hint Display */}
                {showVisualHint && renderVisualHint()}

                {/* AI-Powered Hint Button */}
                {!feedback.show && hintIndex < 3 && (
                  <Button
                    variant="outline"
                    onClick={handleHint}
                    className="w-full"
                    disabled={fetchingHint}
                  >
                    {fetchingHint ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Getting AI Hint...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Get AI Hint (-5 XP)
                      </>
                    )}
                  </Button>
                )}

                {/* AI Hint Display */}
                {showHint && (aiHint || (hintIndex > 0 && currentProblem.hints[hintIndex - 1])) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-wizard-gold-50 border-2 border-wizard-gold-400 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-wizard-gold-600" />
                      <span className="font-semibold text-wizard-purple-800">AI Hint #{hintIndex}:</span>
                    </div>
                    <p className="text-wizard-purple-700">
                      {aiHint || currentProblem.hints[hintIndex - 1]?.content}
                    </p>
                  </motion.div>
                )}
                
                {/* Step-by-Step Explanation (shown after 2 wrong attempts) */}
                {showExplanation && explanation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-50 border-4 border-blue-400 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <span className="font-bold text-xl text-blue-800">How to Solve This:</span>
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {explanation}
                    </div>
                    <p className="mt-4 text-sm text-blue-600 font-semibold">
                      💡 Study this carefully! You might see similar problems later.
                    </p>
                  </motion.div>
                )}

                {/* Feedback */}
                {feedback.show && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-lg border-4 ${
                      feedback.correct
                        ? 'bg-green-50 border-green-500'
                        : 'bg-orange-50 border-orange-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {feedback.correct ? (
                        <Check className="w-8 h-8 text-green-600" />
                      ) : (
                        <X className="w-8 h-8 text-orange-600" />
                      )}
                      <p className={`text-xl font-bold ${
                        feedback.correct ? 'text-green-700' : 'text-orange-700'
                      }`}>
                        {feedback.message}
                      </p>
                    </div>
                    {feedback.correct && (
                      <p className="text-green-600 mt-2">
                        Amazing work! You earned {xpGained} XP! ⭐
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!feedback.show ? (
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="w-full text-lg"
                      disabled={!userAnswer.trim()}
                    >
                      Submit Answer
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="w-full text-lg"
                      variant="secondary"
                    >
                      {currentIndex < problems.length - 1 ? 'Next Problem' : 'Generate New Problems'}
                      <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Session Stats */}
        <Card className="border-2 border-wizard-purple-300 bg-gradient-to-r from-wizard-purple-50 to-wizard-gold-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-wizard-purple-800">{sessionStats.correct}</div>
                <div className="text-xs text-wizard-purple-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wizard-purple-800">{sessionStats.total}</div>
                <div className="text-xs text-wizard-purple-600">Attempted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wizard-purple-800">{user.totalProblemsCompleted}</div>
                <div className="text-xs text-wizard-purple-600">Total Solved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
