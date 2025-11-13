/**
 * Achievement Unlock Animation
 * Shows a celebration when an achievement is unlocked
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Achievement } from '@/types';

interface AchievementUnlockProps {
  achievements: Achievement[];
  onComplete: () => void;
}

export function AchievementUnlock({ achievements, onComplete }: AchievementUnlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);

  // Safety: Auto-clear after 10 seconds regardless of user interaction
  // Prevents infinite loops on older iOS/Safari where callbacks might not fire
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      console.log('Achievement auto-clear safety timeout triggered');
      setShow(false);
      onComplete();
    }, 10000);
    
    return () => clearTimeout(safetyTimer);
  }, []);

  useEffect(() => {
    if (currentIndex >= achievements.length) {
      const timer = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, achievements.length]); // Removed onComplete from deps for Safari compatibility

  if (!show || achievements.length === 0) return null;

  const current = achievements[currentIndex];
  if (!current) return null;

  const handleNext = () => {
    if (currentIndex < achievements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShow(false);
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
          onClick={handleNext}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: -50 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sparkle effects */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 100,
                  y: Math.sin((i / 12) * Math.PI * 2) * 100,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 + i * 0.05,
                  ease: 'easeOut',
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Sparkles className="w-6 h-6 text-wizard-gold-400" />
              </motion.div>
            ))}

            <Card className="w-full max-w-md border-4 border-wizard-gold-500 shadow-2xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-wizard-purple-100 via-wizard-gold-50 to-wizard-purple-100 opacity-50" />

                {/* Close button */}
                <button
                  onClick={handleNext}
                  className="absolute top-4 right-4 text-wizard-purple-500 hover:text-wizard-purple-700 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Trophy animation */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10"
                >
                  <Trophy className="w-20 h-20 text-wizard-gold-500 mx-auto mb-4" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <h2 className="text-2xl font-bold text-wizard-purple-800 mb-2">
                    Achievement Unlocked!
                  </h2>

                  <div className="text-6xl my-4">{current.icon}</div>

                  <h3 className="text-3xl font-bold text-wizard-gold-700 mb-2">
                    {current.name}
                  </h3>

                  <p className="text-wizard-purple-600 mb-4">
                    {current.description}
                  </p>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="inline-flex items-center gap-2 bg-wizard-gold-100 border-2 border-wizard-gold-400 rounded-full px-6 py-3"
                  >
                    <Sparkles className="w-5 h-5 text-wizard-gold-600" />
                    <span className="text-xl font-bold text-wizard-gold-700">
                      +{current.xpReward} XP
                    </span>
                  </motion.div>

                  {achievements.length > 1 && (
                    <p className="text-sm text-wizard-purple-500 mt-4">
                      {currentIndex + 1} of {achievements.length} achievements
                    </p>
                  )}

                  <button
                    onClick={handleNext}
                    className="mt-6 px-8 py-3 bg-wizard-purple-600 text-white rounded-full font-semibold hover:bg-wizard-purple-700 transition-colors"
                  >
                    {currentIndex < achievements.length - 1 ? 'Next' : 'Awesome!'}
                  </button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
