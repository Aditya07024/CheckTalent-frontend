import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-lime-border bg-lime-dim text-lime",
        violet:
          "border-violet-border bg-violet-dim text-violet",
        neutral:
          "border-hairline bg-canvas-elevated text-ink-secondary",
        amber:
          "border-amber-400/30 bg-amber-400/10 text-amber-300",
        muted:
          "border-hairline bg-canvas-secondary text-ink-muted",
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
