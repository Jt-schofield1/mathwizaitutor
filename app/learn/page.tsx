/**
 * Learn Mode - Dynamic Lesson Progression with Completion Tracking
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/lib/store';
import { updateProfile } from '@/lib/kid-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Check, Lock, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import type { CompletedLesson } from '@/types';
import { CURRICULUM_BY_GRADE } from '@/lib/curriculum-data';

interface LessonData {
  id: string;
  title: string;
  category: string;
  duration: number;
  icon: string;
  order: number;
  prerequisite?: string;
  description: string;
}

// Map category to icon
function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    counting: '🔢',
    geometry: '📐',
    comparison: '⚖️',
    addition: '➕',
    subtraction: '➖',
    number_sense: '🧮',
    measurement: '📏',
    multiplication: '✖️',
    division: '➗',
    time: '🕐',
    money: '💰',
    fractions: '½',
    decimals: '📊',
    ratios: '📈',
    percentages: '💯',
    integers: '🔄',
    algebra: '🔢',
    exponents: '²',
    notation: '🔬',
    functions: '📉',
    trigonometry: '📐',
    sequences: '🔢',
    vectors: '➡️',
    statistics: '📊',
    probability: '🎲',
    calculus: '∫',
    word_problems: '📖',
    default: '✨',
  };
  
  return iconMap[category] || iconMap.default;
}

// Get estimated duration based on grade level
function getEstimatedDuration(gradeLevel: number): number {
  if (gradeLevel <= 2) return 15;
  if (gradeLevel <= 5) return 20;
  if (gradeLevel <= 8) return 25;
  return 30; // High school
}

// Dynamic lesson generator based on REAL curriculum data
function generateLessonsForGrade(gradeLevel: number): LessonData[] {
  const curriculumTopics = CURRICULUM_BY_GRADE[gradeLevel] || CURRICULUM_BY_GRADE[1];
  
  return curriculumTopics.map((topic, index) => ({
    id: topic.id,
    title: topic.name,
    category: topic.category,
    duration: getEstimatedDuration(gradeLevel),
    icon: getCategoryIcon(topic.category),
    order: index + 1,
    prerequisite: index > 0 ? curriculumTopics[index - 1].id : undefined,
    description: topic.description,
  }));
}

export default function LearnPage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [completingLesson, setCompletingLesson] = useState(false);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  const lessons = generateLessonsForGrade(user.gradeLevel);
  const completedLessonIds = (user.completedLessons || []).map(cl => cl.lessonId);
  
  // Calculate progress
  const completedCount = completedLessonIds.length;
  const totalCount = lessons.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const isLessonUnlocked = (lesson: LessonData) => {
    if (!lesson.prerequisite) return true;
    return completedLessonIds.includes(lesson.prerequisite);
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessonIds.includes(lessonId);
  };

  const handleCompleteLesson = async () => {
    if (!selectedLesson || !user) return;
    
    setCompletingLesson(true);

    // Award XP
    const xpEarned = 100;
    const newXP = user.xp + xpEarned;
    const newLevel = Math.floor(newXP / 1000) + 1;

    // Add to completed lessons
    const completedLesson: CompletedLesson = {
      lessonId: selectedLesson,
      completedAt: new Date(),
      score: 100,
      timeSpent: lessonStep * 2, // Rough estimate
    };

    const updatedCompletedLessons = [...(user.completedLessons || []), completedLesson];

    // Update profile
    const updated = await updateProfile(user.uid, {
      xp: newXP,
      level: newLevel,
      completedLessons: updatedCompletedLessons as any,
    });

    if (updated) {
      setUser(updated);
    }

    setCompletingLesson(false);
    setSelectedLesson(null);
    setLessonStep(0);
  };

  const currentLesson = lessons.find(l => l.id === selectedLesson);

  if (selectedLesson && currentLesson) {
    return (
      <div className="min-h-screen">
        <header className="bg-gradient-to-r from-wizard-purple-800 via-wizard-purple-700 to-wizard-purple-800 text-white px-6 py-4 shadow-2xl border-b-4 border-wizard-gold-500">
          <div className="container mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedLesson(null)}
                className="text-white hover:bg-wizard-purple-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">{currentLesson.icon}</span>
                  {currentLesson.title}
                </h1>
                <p className="text-wizard-purple-200 text-sm">{currentLesson.duration} minutes • {currentLesson.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-wizard-gold-500 text-wizard-purple-900">
                Step {lessonStep + 1}/4
              </Badge>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-wizard-purple-700">
                  Exit
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-6 py-8">
          <Progress value={((lessonStep + 1) / 4) * 100} className="mb-8 h-3" />
          
          <AnimatePresence mode="wait">
            <LessonContent key={lessonStep} lessonData={currentLesson} step={lessonStep} />
          </AnimatePresence>
          
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setLessonStep(Math.max(0, lessonStep - 1))}
              disabled={lessonStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {lessonStep < 3 ? (
              <Button
                onClick={() => setLessonStep(lessonStep + 1)}
                size="lg"
              >
                Next Step
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleCompleteLesson}
                disabled={completingLesson}
              >
                {completingLesson ? 'Saving Progress...' : 'Complete Lesson'}
                <Trophy className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-wizard-purple-800 via-wizard-purple-700 to-wizard-purple-800 text-white px-6 py-4 shadow-2xl border-b-4 border-wizard-gold-500">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icons/spellbook.svg" alt="Learn" width={40} height={40} unoptimized />
            <div>
              <h1 className="text-2xl font-bold">Learn Mode</h1>
              <p className="text-wizard-purple-200 text-sm">Master new skills step-by-step</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-wizard-purple-700">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 border-4 border-wizard-gold-400 bg-gradient-to-br from-wizard-purple-50 to-wizard-gold-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-wizard-purple-800 flex items-center gap-2">
                  <Star className="w-6 h-6 text-wizard-gold-500 fill-wizard-gold-500" />
                  Your Progress
                </h2>
                <p className="text-wizard-purple-600">Grade {user.gradeLevel === 0 ? 'K' : user.gradeLevel} Learning Journey</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-wizard-purple-800">{progressPercent}%</div>
                <p className="text-sm text-wizard-purple-600">{completedCount}/{totalCount} Complete</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-4" />
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isUnlocked = isLessonUnlocked(lesson);
            const isCompleted = isLessonCompleted(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  hover={isUnlocked} 
                  className={`h-full cursor-pointer border-4 transition-all ${
                    isCompleted 
                      ? 'border-green-500 bg-green-50' 
                      : isUnlocked 
                        ? 'border-wizard-purple-300 hover:border-wizard-purple-500 hover:shadow-xl' 
                        : 'border-gray-300 bg-gray-50 opacity-60'
                  }`}
                  onClick={() => isUnlocked && setSelectedLesson(lesson.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={isCompleted ? 'default' : 'outline'} className={isCompleted ? 'bg-green-600' : ''}>
                        {isCompleted ? (
                          <><Check className="w-3 h-3 mr-1" /> Complete</>
                        ) : isUnlocked ? (
                          lesson.category
                        ) : (
                          <><Lock className="w-3 h-3 mr-1" /> Locked</>
                        )}
                      </Badge>
                      <span className="text-3xl">{lesson.icon}</span>
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {lesson.title}
                      {isCompleted && <Trophy className="w-5 h-5 text-wizard-gold-500" />}
                    </CardTitle>
                    <CardDescription>
                      {isCompleted 
                        ? '✅ You\'ve mastered this lesson!' 
                        : isUnlocked 
                          ? `${lesson.duration} min • Interactive lesson`
                          : 'Complete previous lessons to unlock'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isCompleted ? (
                      <Button className="w-full" variant="outline" disabled>
                        <Check className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    ) : isUnlocked ? (
                      <Button className="w-full" variant="default">
                        Start Lesson
                        <Sparkles className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LessonContent({ lessonData, step }: { lessonData: LessonData; step: number }) {
  // Generate topic-specific content based on actual curriculum
  const getLessonContent = () => {
    const category = lessonData.category.toLowerCase();
    const title = lessonData.title.toLowerCase();
    
    // CALCULUS
    if (category.includes('calculus') || title.includes('limit') || title.includes('derivative') || title.includes('integral')) {
      if (title.includes('limit')) {
        return {
          intro: "Limits help us understand what happens to a function as we approach a specific value!",
          concepts: [
            { title: "What is a Limit?", desc: "A limit describes the value a function approaches as the input gets closer to a certain number. Written as lim(x→a) f(x)." },
            { title: "Direct Substitution", desc: "Try plugging in the value directly. If it works, that's your limit!" },
            { title: "Indeterminate Forms", desc: "If you get 0/0, you need to use algebra to simplify first (factoring, rationalizing, etc.)." }
          ],
          example: { problem: "lim(x→2) (x² - 4)/(x - 2)", step1: "Factor: (x-2)(x+2)/(x-2)", step2: "Cancel: x + 2", answer: "4" },
        };
      } else if (title.includes('derivative')) {
        return {
          intro: "Derivatives measure how fast a function is changing at any point!",
          concepts: [
            { title: "What is a Derivative?", desc: "The derivative f'(x) tells us the rate of change or slope of f(x) at any point. It's like finding the speedometer reading!" },
            { title: "Power Rule", desc: "For f(x) = xⁿ, the derivative is f'(x) = n·xⁿ⁻¹. Example: d/dx[x³] = 3x²" },
            { title: "Basic Rules", desc: "Sum rule: (f+g)' = f' + g'. Product rule: (fg)' = f'g + fg'. Chain rule for compositions." }
          ],
          example: { problem: "Find d/dx[3x² + 5x - 2]", step1: "Apply power rule to each term", step2: "3(2x) + 5(1) + 0", answer: "6x + 5" },
        };
      } else {
        return {
          intro: "Integrals let us find areas under curves and reverse the differentiation process!",
          concepts: [
            { title: "What is an Integral?", desc: "Integration is the reverse of differentiation. ∫f(x)dx finds the antiderivative." },
            { title: "Power Rule for Integration", desc: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C. Don't forget the constant C!" },
            { title: "Definite Integrals", desc: "∫[a to b] f(x)dx gives the area under the curve from a to b." }
          ],
          example: { problem: "∫(2x + 3)dx", step1: "Integrate each term", step2: "2(x²/2) + 3x + C", answer: "x² + 3x + C" },
        };
      }
    }
    
    // STATISTICS & PROBABILITY
    if (category.includes('statistics') || category.includes('probability')) {
      if (title.includes('probability')) {
        return {
          intro: "Probability helps us measure how likely something is to happen!",
          concepts: [
            { title: "What is Probability?", desc: "Probability is a number from 0 to 1 that tells us how likely an event is. P(event) = (favorable outcomes)/(total outcomes)." },
            { title: "Basic Probability Rules", desc: "P(A or B) = P(A) + P(B) - P(A and B). For independent events: P(A and B) = P(A) × P(B)." },
            { title: "Complementary Events", desc: "P(not A) = 1 - P(A). The sum of all probabilities equals 1." }
          ],
          example: { problem: "Rolling a 3 or higher on a die", step1: "Favorable: {3,4,5,6} = 4 outcomes", step2: "Total outcomes = 6", answer: "P = 4/6 = 2/3" },
        };
      } else {
        return {
          intro: "Statistics helps us analyze data and find patterns in numbers!",
          concepts: [
            { title: "Measures of Center", desc: "Mean (average), median (middle value), mode (most common). Each tells us something different about the data." },
            { title: "Spread and Variability", desc: "Range, variance, and standard deviation measure how spread out the data is." },
            { title: "Normal Distribution", desc: "Many real-world data sets follow a bell curve. About 68% of data falls within 1 standard deviation of the mean." }
          ],
          example: { problem: "Mean of {2, 4, 6, 8, 10}", step1: "Sum: 2+4+6+8+10 = 30", step2: "Divide by count: 30÷5", answer: "Mean = 6" },
        };
      }
    }
    
    // ALGEBRA & FUNCTIONS
    if (category.includes('algebra') || category.includes('functions')) {
      if (title.includes('quadratic')) {
        return {
          intro: "Quadratic equations have an x² term and create parabola shapes when graphed!",
          concepts: [
            { title: "What is a Quadratic?", desc: "A quadratic equation has the form ax² + bx + c = 0. The graph is always a U-shaped parabola." },
            { title: "Solving Methods", desc: "Factor if possible, use completing the square, or apply the quadratic formula: x = [-b ± √(b²-4ac)]/(2a)." },
            { title: "The Discriminant", desc: "b² - 4ac tells us how many solutions: positive = 2 real, zero = 1 real, negative = 2 complex." }
          ],
          example: { problem: "Solve x² - 5x + 6 = 0", step1: "Factor: (x-2)(x-3) = 0", step2: "Set each factor = 0", answer: "x = 2 or x = 3" },
        };
      } else if (title.includes('exponential') || title.includes('logarithm')) {
        return {
          intro: "Exponential and logarithmic functions are inverses of each other!",
          concepts: [
            { title: "Exponential Growth", desc: "f(x) = aˣ grows very fast. Used for population growth, compound interest, and radioactive decay." },
            { title: "Logarithms", desc: "log_a(x) asks 'what power gives us x?' If aʸ = x, then log_a(x) = y." },
            { title: "Properties of Logs", desc: "log(ab) = log(a) + log(b), log(a/b) = log(a) - log(b), log(aⁿ) = n·log(a)" }
          ],
          example: { problem: "Solve 2ˣ = 16", step1: "Rewrite 16 as 2⁴", step2: "2ˣ = 2⁴", answer: "x = 4" },
        };
      } else {
        return {
          intro: "Algebra uses letters to represent numbers and helps us solve for unknowns!",
          concepts: [
            { title: "Variables and Expressions", desc: "Letters like x and y represent unknown numbers. An expression combines numbers and variables." },
            { title: "Solving Equations", desc: "Use inverse operations to isolate the variable. Whatever you do to one side, do to the other!" },
            { title: "Checking Your Answer", desc: "Substitute your solution back into the original equation to verify it works." }
          ],
          example: { problem: "Solve 3x + 5 = 20", step1: "Subtract 5: 3x = 15", step2: "Divide by 3", answer: "x = 5" },
        };
      }
    }
    
    // TRIGONOMETRY
    if (category.includes('trigonometry') || title.includes('trig')) {
      return {
        intro: "Trigonometry studies relationships between angles and sides of triangles!",
        concepts: [
          { title: "The Three Ratios", desc: "In a right triangle: sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent" },
          { title: "SOHCAHTOA", desc: "Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent" },
          { title: "Special Angles", desc: "Memorize values for 30°, 45°, 60°. They appear everywhere in trig!" }
        ],
        example: { problem: "Find sin(30°)", step1: "Use the 30-60-90 triangle", step2: "Opposite = 1, Hypotenuse = 2", answer: "sin(30°) = 1/2" },
      };
    }
    
    // GEOMETRY
    if (category.includes('geometry')) {
      if (title.includes('circle')) {
        return {
          intro: "Circles have unique properties with angles, arcs, and chords!",
          concepts: [
            { title: "Circle Basics", desc: "Circumference = 2πr, Area = πr². A radius connects center to edge, diameter = 2r." },
            { title: "Angles in Circles", desc: "Central angle equals its intercepted arc. Inscribed angle is half the intercepted arc." },
            { title: "Tangent Lines", desc: "A tangent touches the circle at exactly one point and is perpendicular to the radius at that point." }
          ],
          example: { problem: "Find area with r = 5", step1: "Formula: A = πr²", step2: "A = π(5²) = 25π", answer: "25π ≈ 78.5" },
        };
      } else if (title.includes('triangle')) {
        return {
          intro: "Triangles are the building blocks of geometry!",
          concepts: [
            { title: "Types of Triangles", desc: "Equilateral (all sides equal), Isosceles (2 sides equal), Scalene (no sides equal). Also: acute, right, obtuse." },
            { title: "Triangle Sum Theorem", desc: "The sum of angles in any triangle is always 180°." },
            { title: "Pythagorean Theorem", desc: "In a right triangle: a² + b² = c², where c is the hypotenuse." }
          ],
          example: { problem: "Find missing angle: 50° + 60° + ?", step1: "Sum must equal 180°", step2: "180 - 50 - 60", answer: "70°" },
        };
      } else {
        return {
          intro: "Geometry is the study of shapes, sizes, and spaces!",
          concepts: [
            { title: "What is Geometry?", desc: "Geometry helps us understand shapes and their properties, like how many sides or corners they have." },
            { title: "Basic Shapes", desc: "Circles are round, squares have 4 equal sides, triangles have 3 sides, and rectangles have 4 sides with opposite sides equal." },
            { title: "Using Geometry", desc: "We see geometry everywhere - in buildings, art, nature, and everyday objects!" }
          ],
          example: { problem: "Find sides", step1: "Look at the shape", step2: "Count each side carefully", answer: "4 sides (square)" },
        };
      }
    }
    
    // FRACTIONS, DECIMALS, RATIOS
    if (category.includes('frac')) {
      return {
        intro: "Fractions represent parts of a whole, like slices of pizza!",
        concepts: [
          { title: "What is a Fraction?", desc: "A fraction shows parts of a whole. The bottom number tells how many equal parts, the top shows how many we have." },
          { title: "Operations with Fractions", desc: "To add/subtract: find common denominator. To multiply: multiply across. To divide: flip and multiply!" },
          { title: "Simplifying", desc: "Divide numerator and denominator by their GCF. 6/8 = 3/4 (divided by 2)." }
        ],
        example: { problem: "1/2 + 1/4", step1: "Find common denominator (4)", step2: "2/4 + 1/4 = 3/4", answer: "3/4" },
      };
    }
    
    if (category.includes('decimal')) {
      return {
        intro: "Decimals are another way to write fractions using place value!",
        concepts: [
          { title: "Place Value", desc: "Each digit after the decimal point has a value: tenths, hundredths, thousandths, etc." },
          { title: "Operations", desc: "Line up the decimal points when adding/subtracting. For multiplication, count total decimal places." },
          { title: "Converting", desc: "Decimals and fractions are related: 0.5 = 1/2, 0.25 = 1/4, 0.75 = 3/4" }
        ],
        example: { problem: "2.5 + 1.75", step1: "Line up decimals: 2.50 + 1.75", step2: "Add: 4.25", answer: "4.25" },
      };
    }
    
    if (category.includes('ratio') || category.includes('percent')) {
      return {
        intro: "Ratios and percentages help us compare quantities!",
        concepts: [
          { title: "What is a Ratio?", desc: "A ratio compares two quantities. Can be written as a:b, a/b, or 'a to b'." },
          { title: "Proportions", desc: "When two ratios are equal, it's a proportion: a/b = c/d. Cross multiply to solve!" },
          { title: "Percentages", desc: "Percent means 'out of 100'. 50% = 50/100 = 0.5 = 1/2" }
        ],
        example: { problem: "What is 20% of 80?", step1: "Convert: 20% = 0.20", step2: "Multiply: 0.20 × 80", answer: "16" },
      };
    }
    
    // ELEMENTARY TOPICS
    if (category.includes('add')) {
      return {
        intro: "Addition means putting numbers together to find the total!",
        concepts: [
          { title: "What is Addition?", desc: "When we add, we combine two or more numbers to find how many we have in total. The '+' symbol means 'add'." },
          { title: "How to Add", desc: "Start with the first number, then count up by the second number. You can use your fingers, count objects, or draw pictures!" },
          { title: "Check Your Work", desc: "Make sure your answer is bigger than both numbers you added together (unless one is zero)." }
        ],
        example: { problem: "5 + 3", step1: "Start with 5", step2: "Count up 3 more: 6, 7, 8", answer: "8" },
      };
    } else if (category.includes('sub')) {
      return {
        intro: "Subtraction means taking away or finding the difference between numbers!",
        concepts: [
          { title: "What is Subtraction?", desc: "When we subtract, we take away one number from another. The '-' symbol means 'subtract' or 'take away'." },
          { title: "How to Subtract", desc: "Start with the larger number, then count backwards by the smaller number. You can cross out objects or count backwards!" },
          { title: "Check Your Work", desc: "Your answer should be smaller than the number you started with." }
        ],
        example: { problem: "8 - 3", step1: "Start with 8", step2: "Count back 3: 7, 6, 5", answer: "5" },
      };
    } else if (category.includes('mult')) {
      return {
        intro: "Multiplication is a fast way to add the same number multiple times!",
        concepts: [
          { title: "What is Multiplication?", desc: "Multiplication is repeated addition. 3 × 4 means 'three groups of 4' or '4 + 4 + 4'." },
          { title: "How to Multiply", desc: "Think of it as groups! Draw groups of objects, use skip counting, or memorize your times tables." },
          { title: "The Order Doesn't Matter", desc: "3 × 4 is the same as 4 × 3. This makes multiplication easier!" }
        ],
        example: { problem: "3 × 4", step1: "Think: 3 groups of 4", step2: "Add: 4 + 4 + 4 = 12", answer: "12" },
      };
    } else if (category.includes('div')) {
      return {
        intro: "Division is splitting a number into equal groups!",
        concepts: [
          { title: "What is Division?", desc: "Division splits a total into equal parts. 12 ÷ 3 asks 'how many groups of 3 can we make from 12?'" },
          { title: "How to Divide", desc: "Think of sharing equally. If you have 12 cookies for 3 friends, each gets 4 cookies!" },
          { title: "Division and Multiplication", desc: "Division is the opposite of multiplication. If 3 × 4 = 12, then 12 ÷ 3 = 4." }
        ],
        example: { problem: "12 ÷ 3", step1: "How many groups of 3 in 12?", step2: "3, 6, 9, 12 = 4 groups", answer: "4" },
      };
    } else if (category.includes('time')) {
      return {
        intro: "Learning to tell time helps us know when things happen!",
        concepts: [
          { title: "Reading a Clock", desc: "The short hand shows hours, the long hand shows minutes. Each number on the clock represents 5 minutes." },
          { title: "Hours and Minutes", desc: "There are 60 minutes in 1 hour. Half past means 30 minutes." },
          { title: "Practice Daily", desc: "Look at clocks throughout the day to practice!" }
        ],
        example: { problem: "What time?", step1: "Short hand points to 3", step2: "Long hand points to 12", answer: "3:00 (3 o'clock)" },
      };
    } else if (category.includes('money')) {
      return {
        intro: "Learning about money helps us count coins and bills!",
        concepts: [
          { title: "Coin Values", desc: "Penny = 1¢, Nickel = 5¢, Dime = 10¢, Quarter = 25¢. Remember these values!" },
          { title: "Counting Money", desc: "Start with the largest coins first, then add the smaller ones." },
          { title: "Making Change", desc: "When you subtract money, you're finding the change!" }
        ],
        example: { problem: "2 quarters + 1 dime", step1: "2 quarters = 50¢", step2: "Add 1 dime = 50¢ + 10¢", answer: "60¢" },
      };
    } else if (category.includes('count')) {
      return {
        intro: "Counting is the foundation of all mathematics!",
        concepts: [
          { title: "Counting Forward", desc: "Count up: 1, 2, 3, 4, 5... Each number is one more than the one before." },
          { title: "Counting Backward", desc: "Count down: 10, 9, 8, 7... Each number is one less." },
          { title: "Skip Counting", desc: "Count by 2s, 5s, or 10s to count faster: 2, 4, 6, 8..." }
        ],
        example: { problem: "Count to 10", step1: "Start at 1", step2: "Say each number in order", answer: "1,2,3,4,5,6,7,8,9,10" },
      };
    } else if (category.includes('pattern')) {
      return {
        intro: "Patterns help us predict what comes next!",
        concepts: [
          { title: "What is a Pattern?", desc: "A pattern is something that repeats in a predictable way." },
          { title: "Finding Patterns", desc: "Look for what repeats: colors, shapes, numbers, or actions!" },
          { title: "Continuing Patterns", desc: "Once you know the pattern, you can figure out what comes next." }
        ],
        example: { problem: "🔴🔵🔴🔵?", step1: "Pattern: red, blue repeats", step2: "Next should be red", answer: "🔴" },
      };
    } else {
      // Default for word problems or other topics
      return {
        intro: `Let's master ${lessonData.title} together!`,
        concepts: [
          { title: "Read Carefully", desc: "Read the problem slowly and understand what it's asking." },
          { title: "Find the Numbers", desc: "Look for all the important numbers and information." },
          { title: "Choose the Right Operation", desc: "Decide if you need to add, subtract, multiply, or divide." }
        ],
        example: { problem: "Example", step1: "Identify what you know", step2: "Solve step by step", answer: "Check your work!" },
      };
    }
  };

  const topicContent = getLessonContent();
  
  const content = [
    {
      title: '📖 Introduction',
      body: (
        <div className="space-y-4">
          <p className="text-lg text-wizard-purple-700">
            Welcome, young wizard! Today we're learning about <strong>{lessonData.title}</strong>.
          </p>
          <p className="text-xl font-semibold text-wizard-purple-800 my-4">
            {lessonData.icon} {topicContent.intro}
          </p>
          <div className="bg-wizard-gold-50 border-2 border-wizard-gold-300 p-6 rounded-lg">
            <h3 className="font-semibold text-wizard-purple-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-wizard-gold-600" />
              What You'll Learn Today
            </h3>
            <ul className="list-disc list-inside space-y-2 text-wizard-purple-700">
              {topicContent.concepts.map((concept, i) => (
                <li key={i}><strong>{concept.title}</strong></li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '🎓 Learn the Concept',
      body: (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-wizard-purple-800 mb-4">{lessonData.icon} Understanding {lessonData.title}</h3>
          <p className="text-lg text-wizard-purple-700 mb-6">
            {topicContent.intro}
          </p>
          <div className="space-y-3">
            {topicContent.concepts.map((concept, index) => (
              <div key={index} className="bg-wizard-parchment-100 p-5 rounded-lg border-2 border-wizard-parchment-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-wizard-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-wizard-purple-800 text-lg">{concept.title}</h4>
                </div>
                <p className="text-wizard-purple-600 pl-13 text-base">{concept.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-wizard-gold-50 border-2 border-wizard-gold-400 rounded-lg">
            <p className="text-wizard-purple-700">
              💡 <strong>Pro Tip:</strong> Practice makes perfect! The more you work with {lessonData.category}, the easier it becomes!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '💡 Examples',
      body: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-wizard-purple-800">Let's See It in Action!</h3>
          <Card className="bg-gradient-to-br from-wizard-purple-50 to-wizard-gold-50 border-4 border-wizard-purple-300">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-wizard-purple-800 mb-3">{topicContent.example.problem}</div>
                <p className="text-wizard-purple-600 text-lg">Let's solve this together, step by step!</p>
              </div>
              <div className="space-y-4 text-left bg-white p-6 rounded-lg shadow-inner">
                <div className="flex items-start gap-3 p-3 bg-wizard-purple-50 rounded-lg">
                  <span className="text-3xl">✨</span>
                  <div>
                    <p className="font-bold text-wizard-purple-800 mb-1">Step 1:</p>
                    <p className="text-wizard-purple-700 text-lg">{topicContent.example.step1}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-wizard-purple-50 rounded-lg">
                  <span className="text-3xl">✨</span>
                  <div>
                    <p className="font-bold text-wizard-purple-800 mb-1">Step 2:</p>
                    <p className="text-wizard-purple-700 text-lg">{topicContent.example.step2}</p>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-wizard-gold-100 to-wizard-gold-200 rounded-lg border-4 border-wizard-gold-500 shadow-lg">
                  <p className="text-center text-xl mb-2"><strong className="text-wizard-purple-800">Answer:</strong></p>
                  <p className="text-center text-wizard-gold-900 font-bold text-4xl">{topicContent.example.answer} ✓</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-wizard-purple-600 text-sm">
                  See how we solved it step by step? You can do this too!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: '🎯 Practice',
      body: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-wizard-purple-800">You're Ready to Try!</h3>
          <p className="text-wizard-purple-700">
            Practice makes perfect! Try solving problems on your own now.
          </p>
          <Card className="bg-white border-4 border-wizard-purple-400">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-xl text-wizard-purple-700 mb-4">
                  Great job completing this lesson! 🎉
                </p>
                <p className="text-wizard-purple-600">
                  Click "Complete Lesson" to earn your XP and unlock the next adventure!
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-sm text-wizard-purple-600">+100 XP</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-sm text-wizard-purple-600">Achievement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔓</div>
                  <p className="text-sm text-wizard-purple-600">Next Lesson</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-4 border-wizard-purple-400">
        <CardHeader className="bg-gradient-to-r from-wizard-purple-100 to-wizard-gold-100">
          <CardTitle className="text-2xl">{content[step].title}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {content[step].body}
        </CardContent>
      </Card>
    </motion.div>
  );
}
