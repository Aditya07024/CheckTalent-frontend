import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-orange-500 border-b-[4px] border-b-red-800 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-semibold hover:from-amber-400 hover:via-orange-500 hover:to-red-500 shadow-[0_10px_24px_rgba(234,88,12,0.30)] hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-[2px]",
        secondary:
          "bg-white text-ink border border-orange-200 border-b-[3px] border-b-orange-300 hover:border-orange-400 hover:bg-orange-50/60 hover:-translate-y-0.5 active:translate-y-[1px] shadow-sm",
        outline:
          "border border-orange-300 border-b-[3px] border-b-orange-400 bg-white/95 text-ink hover:bg-amber-50/80 hover:border-orange-500 hover:text-orange-950 hover:-translate-y-0.5 active:translate-y-[1px] shadow-sm",
        ghost:
          "text-ink-secondary hover:text-orange-800 hover:bg-orange-50/80",
        limeOutline:
          "border border-orange-300 border-b-[3px] border-b-orange-500 bg-orange-50 text-orange-800 font-semibold hover:bg-orange-100 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-sm",
        xl: "h-12 rounded-lg px-7 text-base",
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
