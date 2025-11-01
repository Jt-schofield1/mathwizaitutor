/**
 * Magic Background - Floating sparkles and stars
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

export function MagicBackground() {
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: string;
  }>>([]);
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: string;
  }>>([]);

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    setSparkles(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 'w-3 h-3',
    })));

    setStars(Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 2,
      size: 'w-4 h-4',
    })));

    setMounted(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
      {/* Floating Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className={`absolute ${sparkle.size}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="text-wizard-gold-400" />
        </motion.div>
      ))}

      {/* Floating Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className={`absolute ${star.size}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Star className="text-wizard-purple-400 fill-wizard-purple-400" />
        </motion.div>
      ))}
    </div>
  );
}

