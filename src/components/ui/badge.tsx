import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-orange-300 bg-orange-50 text-orange-800",
        violet:
          "border-red-300 bg-red-50 text-red-800",
        neutral:
          "border-amber-300 bg-amber-50 text-amber-900",
        amber:
          "border-yellow-400/80 bg-yellow-50 text-yellow-900",
        muted:
          "border-stone-300 bg-stone-100 text-stone-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
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
