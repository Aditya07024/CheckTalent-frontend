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
          "bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-semibold hover:from-amber-400 hover:via-orange-500 hover:to-red-500 shadow-[0_8px_24px_rgba(234,88,12,0.30),0_2px_6px_rgba(220,38,38,0.20)] hover:shadow-[0_12px_30px_rgba(234,88,12,0.40)] active:translate-y-[0.5px]",
        secondary:
          "bg-white text-ink border border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 shadow-sm",
        outline:
          "border border-stone-300 bg-white/90 text-ink hover:bg-amber-50/70 hover:border-orange-400 hover:text-orange-950 shadow-sm",
        ghost:
          "text-ink-secondary hover:text-orange-800 hover:bg-orange-50/80",
        limeOutline:
          "border border-orange-300 bg-orange-50 text-orange-800 font-semibold hover:bg-orange-100",
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
