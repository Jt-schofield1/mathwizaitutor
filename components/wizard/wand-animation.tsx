/**
 * Animated wand that appears on correct answers
 */

'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WandAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

export function WandAnimation({ show, onComplete }: WandAnimationProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <motion.div
        animate={{ 
          rotate: [0, 14, -8, 14, -4, 10, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="relative"
      >
        {/* Wand */}
        <div className="w-32 h-4 bg-gradient-to-r from-wizard-gold-600 to-wizard-gold-800 rounded-full shadow-lg rotate-45" />
        
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos(i * 30 * Math.PI / 180) * 100,
              y: Math.sin(i * 30 * Math.PI / 180) * 100,
            }}
            transition={{ 
              duration: 1,
              delay: 0.3 + (i * 0.05),
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2"
          >
            <Sparkles className="w-6 h-6 text-wizard-gold-400" />
          </motion.div>
        ))}
        
        {/* Center glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1, repeat: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-wizard-gold-300 rounded-full blur-xl"
        />
      </motion.div>
    </motion.div>
  );
}

