/**
 * Badge component for achievements and labels
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-wizard-purple-300 bg-wizard-purple-100 text-wizard-purple-800",
        gold: "border-wizard-gold-400 bg-wizard-gold-100 text-wizard-gold-900",
        success: "border-green-300 bg-green-100 text-green-800",
        warning: "border-yellow-300 bg-yellow-100 text-yellow-800",
        error: "border-red-300 bg-red-100 text-red-800",
        outline: "border-wizard-purple-400 text-wizard-purple-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

