/**
 * Onboarding Flow - Dynamic Grade-Appropriate Placement Quiz
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { updateProfile } from '@/lib/kid-auth';
import { useAuthStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, BookOpen, Trophy, ChevronRight, Loader2 } from 'lucide-react';
import { getGradeDisplay } from '@/lib/utils';
import type { SkillMastery } from '@/types';

interface PlacementQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  skill: string;
  difficulty: number;
}

// Generate grade-appropriate questions dynamically
function generatePlacementQuestions(gradeLevel: number): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];
  
  if (gradeLevel === 0) {
    // Kindergarten
    questions.push(
      { id: 1, question: 'Count the stars: ⭐⭐⭐', options: ['2', '3', '4', '5'], correct: '3', skill: 'counting', difficulty: 1 },
      { id: 2, question: 'What comes after 4? 3, 4, __', options: ['5', '6', '3', '7'], correct: '5', skill: 'counting', difficulty: 1 },
      { id: 3, question: '2 + 1 = ?', options: ['2', '3', '4', '1'], correct: '3', skill: 'addition', difficulty: 1 },
      { id: 4, question: 'Which is bigger: 5 or 3?', options: ['5', '3', 'Same', 'Neither'], correct: '5', skill: 'comparison', difficulty: 1 },
      { id: 5, question: '4 - 1 = ?', options: ['2', '3', '4', '5'], correct: '3', skill: 'subtraction', difficulty: 1 },
    );
  } else if (gradeLevel === 1) {
    // Grade 1
    questions.push(
      { id: 1, question: '7 + 5 = ?', options: ['11', '12', '13', '14'], correct: '12', skill: 'addition', difficulty: 1 },
      { id: 2, question: '13 - 6 = ?', options: ['6', '7', '8', '9'], correct: '7', skill: 'subtraction', difficulty: 1 },
      { id: 3, question: '8 + 9 = ?', options: ['16', '17', '18', '19'], correct: '17', skill: 'addition', difficulty: 2 },
      { id: 4, question: '15 - 7 = ?', options: ['7', '8', '9', '10'], correct: '8', skill: 'subtraction', difficulty: 2 },
      { id: 5, question: '9 + 8 = ?', options: ['15', '16', '17', '18'], correct: '17', skill: 'addition', difficulty: 2 },
    );
  } else if (gradeLevel === 2) {
    // Grade 2
    questions.push(
      { id: 1, question: '25 + 18 = ?', options: ['42', '43', '44', '45'], correct: '43', skill: 'addition', difficulty: 2 },
      { id: 2, question: '34 - 17 = ?', options: ['15', '16', '17', '18'], correct: '17', skill: 'subtraction', difficulty: 2 },
      { id: 3, question: '5 × 3 = ?', options: ['12', '13', '14', '15'], correct: '15', skill: 'multiplication', difficulty: 2 },
      { id: 4, question: '48 + 25 = ?', options: ['71', '72', '73', '74'], correct: '73', skill: 'addition', difficulty: 2 },
      { id: 5, question: '10 ÷ 2 = ?', options: ['3', '4', '5', '6'], correct: '5', skill: 'division', difficulty: 2 },
    );
  } else if (gradeLevel >= 3 && gradeLevel <= 5) {
    // Grades 3-5
    questions.push(
      { id: 1, question: '45 × 7 = ?', options: ['305', '315', '325', '335'], correct: '315', skill: 'multiplication', difficulty: 3 },
      { id: 2, question: '144 ÷ 12 = ?', options: ['10', '11', '12', '13'], correct: '12', skill: 'division', difficulty: 3 },
      { id: 3, question: 'What is 1/2 + 1/4?', options: ['1/6', '2/6', '3/4', '1/3'], correct: '3/4', skill: 'fractions', difficulty: 3 },
      { id: 4, question: '25% of 80 = ?', options: ['15', '20', '25', '30'], correct: '20', skill: 'percentages', difficulty: 3 },
      { id: 5, question: '(-5) + 12 = ?', options: ['7', '17', '-7', '-17'], correct: '7', skill: 'integers', difficulty: 3 },
    );
  } else if (gradeLevel >= 6 && gradeLevel <= 8) {
    // Grades 6-8 (Middle School)
    questions.push(
      { id: 1, question: 'Solve for x: 2x + 5 = 15', options: ['3', '4', '5', '6'], correct: '5', skill: 'algebra', difficulty: 4 },
      { id: 2, question: 'What is 0.75 as a fraction?', options: ['1/4', '2/3', '3/4', '4/5'], correct: '3/4', skill: 'fractions', difficulty: 4 },
      { id: 3, question: '(-3)² = ?', options: ['-9', '9', '-6', '6'], correct: '9', skill: 'exponents', difficulty: 4 },
      { id: 4, question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: '30', skill: 'percentages', difficulty: 4 },
      { id: 5, question: 'Simplify: 3(x + 4)', options: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'], correct: '3x + 12', skill: 'algebra', difficulty: 4 },
    );
  } else {
    // Grades 9-12 (High School)
    questions.push(
      { id: 1, question: 'Solve: x² - 5x + 6 = 0', options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 2, -3'], correct: 'x = 2, 3', skill: 'quadratics', difficulty: 5 },
      { id: 2, question: 'What is sin(30°)?', options: ['1/2', '√3/2', '1', '0'], correct: '1/2', skill: 'trigonometry', difficulty: 5 },
      { id: 3, question: 'Simplify: (x³)² ÷ x⁴', options: ['x', 'x²', 'x³', 'x⁴'], correct: 'x²', skill: 'exponents', difficulty: 5 },
      { id: 4, question: 'If f(x) = 2x + 3, what is f(5)?', options: ['10', '11', '12', '13'], correct: '13', skill: 'functions', difficulty: 5 },
      { id: 5, question: 'What is the slope of y = 3x - 7?', options: ['3', '-7', '7', '-3'], correct: '3', skill: 'linear equations', difficulty: 5 },
    );
  }
  
  return questions;
}

export default function OnboardingPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [step, setStep] = useState<'welcome' | 'grade' | 'quiz' | 'complete'>('welcome');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [placementQuestions, setPlacementQuestions] = useState<PlacementQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);

  const currentQuestion = placementQuestions[quizIndex];
  const progress = placementQuestions.length > 0 ? ((quizIndex + 1) / placementQuestions.length) * 100 : 0;

  const handleGradeSelect = async () => {
    if (selectedGrade === null) return;
    
    setFetchingQuestions(true);
    
    try {
      // Fetch dynamic questions from OATutor API
      const response = await fetch('/api/oatutor/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeLevel: selectedGrade,
          count: 5,
        }),
      });
      
      const data = await response.json();
      
      if (data.success && data.problems.length > 0) {
        // Convert problems to quiz format with multiple choice
        const quizQuestions: PlacementQuestion[] = data.problems.map((problem: any, index: number) => {
          let correctAnswer = problem.answer;
          
          // Special handling for problems with stars or objects (counting)
          if (problem.question.includes('⭐') || problem.question.includes('Count')) {
            const starCount = (problem.question.match(/⭐/g) || []).length;
            if (starCount > 0) {
              correctAnswer = String(starCount);
            }
          }
          
          // Generate plausible wrong answers
          let options: string[] = [];
          
          if (correctAnswer !== '?' && correctAnswer !== 'use AI for validation' && !isNaN(Number(correctAnswer))) {
            // For numerical answers, create nearby values
            const num = Number(correctAnswer);
            const variants = new Set<string>();
            variants.add(correctAnswer);
            
            // Add nearby numbers (avoiding negatives for kindergarten)
            const minVal = selectedGrade === 0 ? 1 : Math.max(0, num - 3);
            const maxVal = num + 3;
            
            while (variants.size < 4) {
              const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
              if (randomNum !== num) {
                variants.add(String(randomNum));
              }
            }
            
            options = Array.from(variants);
          } else if (correctAnswer !== '?' && correctAnswer !== 'use AI for validation') {
            // For non-numerical answers that are valid
            options = [correctAnswer, 'Option B', 'Option C', 'Option D'];
          } else {
            // For problems that need AI validation, try to extract a number from the question
            const numberMatch = problem.question.match(/\d+/g);
            if (numberMatch && numberMatch.length >= 2) {
              // Math operation detected, try to calculate
              const nums = numberMatch.map(Number);
              if (problem.question.includes('+')) {
                correctAnswer = String(nums[0] + nums[1]);
              } else if (problem.question.includes('-')) {
                correctAnswer = String(Math.max(0, nums[0] - nums[1]));
              } else if (problem.question.includes('×') || problem.question.includes('*')) {
                correctAnswer = String(nums[0] * nums[1]);
              } else if (problem.question.includes('÷') || problem.question.includes('/')) {
                correctAnswer = String(Math.floor(nums[0] / nums[1]));
              }
              
              // Generate options around this answer
              const num = Number(correctAnswer);
              options = [
                correctAnswer,
                String(num - 1),
                String(num + 1),
                String(num + 2),
              ];
            } else {
              // Last resort: generic options
              options = ['7', '8', '9', '10']; // Reasonable defaults for kindergarten
              correctAnswer = options[0];
            }
          }
          
          // Shuffle options but ensure we have 4 unique options
          const uniqueOptions = Array.from(new Set(options)).slice(0, 4);
          while (uniqueOptions.length < 4) {
            uniqueOptions.push(String(uniqueOptions.length + 1));
          }
          
          const shuffled = uniqueOptions.sort(() => Math.random() - 0.5);
          
          // Ensure correct answer is in the options
          if (!shuffled.includes(correctAnswer)) {
            shuffled[0] = correctAnswer;
          }
          
          return {
            id: index + 1,
            question: problem.question,
            options: shuffled,
            correct: correctAnswer,
            skill: problem.category,
            difficulty: problem.difficulty,
          };
        });
        
        setPlacementQuestions(quizQuestions);
      } else {
        // Fallback to static questions if API fails
        const questions = generatePlacementQuestions(selectedGrade);
        setPlacementQuestions(questions);
      }
    } catch (error) {
      console.error('Failed to fetch placement questions:', error);
      // Fallback to static questions
      const questions = generatePlacementQuestions(selectedGrade);
      setPlacementQuestions(questions);
    } finally {
      setFetchingQuestions(false);
      setStep('quiz');
    }
  };

  const handleAnswerSubmit = () => {
    setAnswers([...answers, selectedAnswer]);
    
    if (quizIndex < placementQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer('');
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    if (selectedGrade === null) return;
    
    setLoading(true);
    
    // Calculate initial skill levels based on quiz results
    const correctCount = answers.filter((answer, index) => 
      answer === placementQuestions[index].correct
    ).length;
    
    const initialMastery = correctCount / placementQuestions.length;
    
    // Initialize skills based on grade level
    // Only set mastery for skills actually practiced in placement test
    const initialSkills: SkillMastery[] = [
      // Addition: Tested in placement, so we can estimate mastery
      { skillId: 'addition', skillName: 'Addition', category: 'addition', masteryLevel: initialMastery, practiceCount: answers.length, p_known: initialMastery, p_learn: 0.3, p_guess: 0.25, p_slip: 0.1, lastPracticed: new Date() },
      // Other skills: Not tested yet, so start at 0% mastery
      { skillId: 'subtraction', skillName: 'Subtraction', category: 'subtraction', masteryLevel: 0, practiceCount: 0, p_known: 0, p_learn: 0.3, p_guess: 0.25, p_slip: 0.1, lastPracticed: new Date() },
    ];
    
    if (selectedGrade >= 2) {
      initialSkills.push(
        // Multiplication/Division: Not tested, start at 0%
        { skillId: 'multiplication', skillName: 'Multiplication', category: 'multiplication', masteryLevel: 0, practiceCount: 0, p_known: 0, p_learn: 0.3, p_guess: 0.25, p_slip: 0.1, lastPracticed: new Date() },
        { skillId: 'division', skillName: 'Division', category: 'division', masteryLevel: 0, practiceCount: 0, p_known: 0, p_learn: 0.3, p_guess: 0.25, p_slip: 0.1, lastPracticed: new Date() },
      );
    }
    
    if (user) {
      const updated = await updateProfile(user.uid, {
        gradeLevel: selectedGrade,
        onboardingCompleted: true,
        skills: initialSkills,
        xp: 100, // Welcome bonus!
      });
      
      if (updated) {
        setUser(updated);
      }
    }
    
    setStep('complete');
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-wizard-purple-50 to-wizard-gold-50">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-4 border-wizard-purple-400">
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-block mx-auto mb-4"
                  >
                    <Sparkles className="w-20 h-20 text-wizard-gold-500 mx-auto" />
                  </motion.div>
                  <CardTitle className="text-4xl text-wizard-purple-800">
                    Welcome to MathWiz Academy! 🧙‍♂️
                  </CardTitle>
                  <CardDescription className="text-lg mt-4">
                    Let's set up your magical math journey!
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button onClick={() => setStep('grade')} size="lg" className="text-lg px-8">
                    Start Your Adventure
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'grade' && (
            <motion.div
              key="grade"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-4 border-wizard-purple-400">
                <CardHeader>
                  <CardTitle className="text-3xl text-wizard-purple-800 flex items-center gap-2">
                    <BookOpen className="w-8 h-8" />
                    Select Your Grade Level
                  </CardTitle>
                  <CardDescription className="text-base">
                    Choose your current grade so we can tailor the lessons just for you!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                    {/* Kindergarten */}
                    <button
                      onClick={() => setSelectedGrade(0)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedGrade === 0
                          ? 'border-wizard-purple-600 bg-wizard-purple-100 shadow-lg scale-105'
                          : 'border-wizard-parchment-300 bg-white hover:border-wizard-purple-400'
                      }`}
                    >
                      <div className="text-2xl font-bold text-wizard-purple-700">K</div>
                      <div className="text-xs text-wizard-purple-600">Kinder</div>
                    </button>
                    
                    {/* Grades 1-12 */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedGrade === grade
                            ? 'border-wizard-purple-600 bg-wizard-purple-100 shadow-lg scale-105'
                            : 'border-wizard-parchment-300 bg-white hover:border-wizard-purple-400'
                        }`}
                      >
                        <div className="text-2xl font-bold text-wizard-purple-700">{grade}</div>
                        <div className="text-xs text-wizard-purple-600">Grade</div>
                      </button>
                    ))}
                  </div>
                  
                  <Button onClick={handleGradeSelect} size="lg" className="w-full" disabled={selectedGrade === null || fetchingQuestions}>
                    {fetchingQuestions ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Loading Quiz...
                      </>
                    ) : (
                      <>
                        Continue to Placement Quiz
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'quiz' && currentQuestion && (
            <motion.div
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-4 border-wizard-purple-400">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-lg px-4 py-1">
                      Question {quizIndex + 1} of {placementQuestions.length}
                    </Badge>
                    <Badge className="bg-wizard-gold-500 text-wizard-purple-900 text-lg px-4 py-1">
                      Placement Quiz
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-3 mb-6" />
                  <CardTitle className="text-3xl text-wizard-purple-800">
                    {currentQuestion.question}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Choose the correct answer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAnswer(option)}
                        className={`p-6 rounded-xl border-4 text-2xl font-bold transition-all ${
                          selectedAnswer === option
                            ? 'border-wizard-purple-600 bg-wizard-purple-100 shadow-xl'
                            : 'border-wizard-parchment-300 bg-white hover:border-wizard-purple-400 hover:shadow-lg'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleAnswerSubmit}
                    size="lg"
                    className="w-full text-lg"
                    disabled={!selectedAnswer}
                  >
                    {quizIndex < placementQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-4 border-wizard-gold-500 bg-gradient-to-br from-wizard-purple-50 to-wizard-gold-50">
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1 }}
                    className="inline-block mx-auto mb-4"
                  >
                    <Trophy className="w-24 h-24 text-wizard-gold-500 mx-auto" />
                  </motion.div>
                  <CardTitle className="text-4xl text-wizard-purple-800">
                    Welcome to Your Magic Journey! 🎉
                  </CardTitle>
                  <CardDescription className="text-lg mt-4">
                    You've earned your first 100 XP! Let's start learning!
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-8 mt-6">
                    <div className="text-center">
                      <Star className="w-12 h-12 text-wizard-gold-500 mx-auto mb-2 fill-wizard-gold-500" />
                      <div className="text-2xl font-bold text-wizard-purple-800">+100 XP</div>
                      <div className="text-sm text-wizard-purple-600">Welcome Bonus</div>
                    </div>
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 text-wizard-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-wizard-purple-800">Level 1</div>
                      <div className="text-sm text-wizard-purple-600">Starting Your Journey</div>
                    </div>
                  </div>
                  {loading && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-wizard-purple-600">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Redirecting to your dashboard...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
