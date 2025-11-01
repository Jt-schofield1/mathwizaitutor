/**
 * Wizard-themed Button component
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-wizard-purple-600 text-white hover:bg-wizard-purple-700 shadow-lg hover:shadow-xl",
        secondary: "bg-wizard-gold-500 text-wizard-purple-900 hover:bg-wizard-gold-600 shadow-lg hover:shadow-xl",
        outline: "border-2 border-wizard-purple-600 text-wizard-purple-700 hover:bg-wizard-purple-50",
        ghost: "hover:bg-wizard-purple-100 text-wizard-purple-700",
        link: "text-wizard-purple-600 underline-offset-4 hover:underline",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg",
        parchment: "bg-wizard-parchment-200 text-wizard-purple-900 hover:bg-wizard-parchment-300 border-2 border-wizard-parchment-400",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-lg px-8 text-lg",
        xl: "h-16 rounded-xl px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

