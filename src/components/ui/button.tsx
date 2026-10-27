import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-lime text-[#08090D] font-semibold hover:bg-lime-hover shadow-[0_0_24px_rgba(197,255,74,0.18)] hover:shadow-[0_0_32px_rgba(197,255,74,0.28)] active:translate-y-[0.5px]",
        secondary:
          "bg-canvas-elevated text-ink border border-hairline hover:border-hairline-strong hover:bg-canvas-hover",
        outline:
          "border border-hairline-strong bg-transparent text-ink hover:bg-canvas-elevated hover:border-lime/40",
        ghost:
          "text-ink-secondary hover:text-ink hover:bg-white/[0.04]",
        limeOutline:
          "border border-lime-border bg-lime-dim text-lime hover:bg-lime/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-sm",
        xl: "h-12 rounded-md px-7 text-base",
        icon: "h-9 w-9",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
