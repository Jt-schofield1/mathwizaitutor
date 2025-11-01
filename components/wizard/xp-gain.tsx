/**
 * Floating XP gain notification
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface XPGainProps {
  xp: number;
  show: boolean;
}

export function XPGain({ xp, show }: XPGainProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -50, scale: 1.2 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-wizard-gold-400 to-wizard-gold-600 text-wizard-purple-900 px-6 py-3 rounded-full shadow-2xl border-2 border-wizard-gold-700 flex items-center gap-2">
            <Plus className="w-6 h-6 font-bold" />
            <span className="text-2xl font-bold">{xp} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

