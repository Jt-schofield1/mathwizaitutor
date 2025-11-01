/**
 * Spellbook Progress Bar with magical theming
 */

'use client';

import { Progress } from '@/components/ui/progress';
import { Book, Sparkles } from 'lucide-react';
import { xpToNextLevel, formatXP } from '@/lib/utils';

interface SpellBookProgressProps {
  xp: number;
  level: number;
  showDetails?: boolean;
}

export function SpellBookProgress({ xp, level, showDetails = true }: SpellBookProgressProps) {
  const { current, required, percentage } = xpToNextLevel(xp);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-wizard-purple-600" />
          <span className="text-sm font-semibold text-wizard-purple-700">
            Level {level} Wizard
          </span>
        </div>
        {showDetails && (
          <div className="flex items-center gap-1 text-xs text-wizard-purple-600">
            <Sparkles className="w-4 h-4" />
            <span>{formatXP(current)} / {formatXP(required)} XP</span>
          </div>
        )}
      </div>
      
      <Progress value={current} max={required} variant="xp" />
      
      {showDetails && (
        <p className="text-xs text-wizard-purple-500 text-center">
          {formatXP(required - current)} XP to Level {level + 1}
        </p>
      )}
    </div>
  );
}

