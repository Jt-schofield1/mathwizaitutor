/**
 * Grade Level Selector - Allows kids to change their grade level
 * Useful when they master their current grade and want to move up!
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, TrendingUp, Star, Sparkles } from 'lucide-react';
import { getGradeDisplay } from '@/lib/utils';

interface GradeLevelSelectorProps {
  currentGrade: number;
  onGradeChange: (newGrade: number) => Promise<void>;
  showTitle?: boolean;
}

const GRADE_LEVELS = [
  { value: 0, label: 'Kindergarten', emoji: '🎨', description: 'Counting, basic addition' },
  { value: 1, label: '1st Grade', emoji: '📚', description: 'Addition, subtraction to 20' },
  { value: 2, label: '2nd Grade', emoji: '✏️', description: 'Two-digit math, place value' },
  { value: 3, label: '3rd Grade', emoji: '📐', description: 'Multiplication, fractions' },
  { value: 4, label: '4th Grade', emoji: '🔢', description: 'Division, decimals' },
  { value: 5, label: '5th Grade', emoji: '📊', description: 'Advanced fractions, geometry' },
  { value: 6, label: '6th Grade', emoji: '🧮', description: 'Ratios, expressions, equations' },
  { value: 7, label: '7th Grade', emoji: '📈', description: 'Algebra, proportions, percentages' },
  { value: 8, label: '8th Grade', emoji: '🔬', description: 'Functions, geometry, exponents' },
  { value: 9, label: '9th Grade', emoji: '🎓', description: 'Algebra I, linear equations' },
  { value: 10, label: '10th Grade', emoji: '📝', description: 'Geometry, proofs, trigonometry' },
  { value: 11, label: '11th Grade', emoji: '🧠', description: 'Algebra II, calculus prep' },
  { value: 12, label: '12th Grade', emoji: '🚀', description: 'Calculus, statistics, AP prep' },
];

export function GradeLevelSelector({ currentGrade, onGradeChange, showTitle = true }: GradeLevelSelectorProps) {
  const [selectedGrade, setSelectedGrade] = useState(currentGrade);
  const [isChanging, setIsChanging] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    if (grade !== currentGrade) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmChange = async () => {
    setIsChanging(true);
    try {
      await onGradeChange(selectedGrade);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Failed to change grade level:', error);
      alert('Failed to change grade level. Please try again!');
    } finally {
      setIsChanging(false);
    }
  };

  const handleCancel = () => {
    setSelectedGrade(currentGrade);
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-wizard-purple-600" />
            <h2 className="text-2xl font-bold text-wizard-purple-800">Choose Your Grade Level</h2>
          </div>
          <p className="text-wizard-purple-600">
            Select the grade level that matches your skills. You can always change it later!
          </p>
        </div>
      )}

      {/* Grade Level Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {GRADE_LEVELS.map((grade) => {
          const isSelected = selectedGrade === grade.value;
          const isCurrent = currentGrade === grade.value;

          return (
            <motion.button
              key={grade.value}
              onClick={() => handleGradeSelect(grade.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-xl border-4 transition-all ${
                isSelected
                  ? 'border-wizard-purple-600 bg-wizard-purple-50 shadow-lg'
                  : 'border-wizard-purple-200 bg-white hover:border-wizard-purple-400'
              }`}
            >
              <div className="text-4xl mb-2">{grade.emoji}</div>
              <div className="font-bold text-wizard-purple-800 text-sm mb-1">
                {grade.label}
              </div>
              <div className="text-xs text-wizard-purple-600 line-clamp-2">
                {grade.description}
              </div>

              {isCurrent && (
                <Badge className="absolute -top-2 -right-2 bg-wizard-gold-500 text-wizard-purple-900">
                  <Star className="w-3 h-3 mr-1" />
                  Current
                </Badge>
              )}

              {isSelected && !isCurrent && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-wizard-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-4 border-wizard-purple-500 bg-gradient-to-br from-wizard-purple-50 to-wizard-gold-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-wizard-purple-800">
                  <TrendingUp className="w-6 h-6" />
                  Change Grade Level?
                </CardTitle>
                <CardDescription>
                  You're about to change from{' '}
                  <span className="font-bold text-wizard-purple-700">
                    {getGradeDisplay(currentGrade)}
                  </span>{' '}
                  to{' '}
                  <span className="font-bold text-wizard-purple-700">
                    {getGradeDisplay(selectedGrade)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-wizard-purple-300">
                    <p className="text-sm text-wizard-purple-700">
                      {selectedGrade > currentGrade ? (
                        <>
                          <strong>Great job!</strong> 🎉 Moving up means you'll get harder problems
                          and learn more advanced math. You can always come back if it's too challenging.
                        </>
                      ) : (
                        <>
                          You'll get problems that match <strong>{getGradeDisplay(selectedGrade)}</strong> level.
                          This is perfect for building a strong foundation!
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleConfirmChange}
                      disabled={isChanging}
                      className="flex-1"
                      size="lg"
                    >
                      {isChanging ? (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Confirm Change
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={isChanging}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

