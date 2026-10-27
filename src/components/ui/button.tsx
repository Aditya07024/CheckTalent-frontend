import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative border border-white/25 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-semibold shadow-[0_4px_16px_rgba(234,88,12,0.28)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.40)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        secondary:
          "bg-white/95 text-ink border border-orange-200/80 hover:border-orange-400 hover:bg-orange-50/70 hover:text-orange-950 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-orange-300/85 bg-white/90 text-ink backdrop-blur-sm hover:bg-amber-50/70 hover:border-orange-400 hover:text-orange-950 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        ghost:
          "text-ink-secondary hover:text-orange-900 hover:bg-orange-100/60 rounded-lg active:scale-[0.98]",
        limeOutline:
          "border border-orange-300 bg-orange-50/90 text-orange-900 font-semibold hover:bg-orange-100 hover:border-orange-400 shadow-sm hover:-translate-y-0.5 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8.5 rounded-lg px-3.5 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm",
        xl: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-9 w-9 rounded-lg",
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
