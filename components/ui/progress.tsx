/**
 * Wizard-themed Progress Bar component (XP/Spellbook Progress)
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: "default" | "xp" | "spell";
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showLabel = false, variant = "default", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const variantStyles = {
      default: "bg-wizard-purple-600",
      xp: "bg-gradient-to-r from-wizard-purple-500 via-wizard-purple-600 to-wizard-purple-700",
      spell: "bg-gradient-to-r from-wizard-gold-400 via-wizard-gold-500 to-wizard-gold-600",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-wizard-purple-100 border-2 border-wizard-purple-200",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out relative",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s linear infinite'
               }} 
          />
        </div>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-wizard-purple-900">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };

