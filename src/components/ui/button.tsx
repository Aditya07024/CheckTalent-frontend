import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "pos-stamp-button inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 [&_.pos-stamp-inner]:bg-[#FFFBEB] [&_.pos-stamp-inner]:text-[#1C1613] hover:[&_.pos-stamp-inner]:bg-[#FFFFFF]",
        secondary:
          "bg-[#F59E0B] [&_.pos-stamp-inner]:bg-[#FFFFFF] [&_.pos-stamp-inner]:text-[#1C1613] hover:[&_.pos-stamp-inner]:bg-[#FFFBEB]",
        outline:
          "bg-[#EA580C] [&_.pos-stamp-inner]:bg-[#FAF7F2] [&_.pos-stamp-inner]:text-[#1C1613] hover:[&_.pos-stamp-inner]:bg-[#FFFFFF]",
        ghost:
          "bg-transparent shadow-none hover:shadow-none p-0 pb-0 rotate-0 hover:rotate-0 hover:bg-orange-100/50 [&_.pos-stamp-inner]:border-transparent [&_.pos-stamp-inner]:bg-transparent [&_.pos-stamp-inner]:text-ink-secondary hover:[&_.pos-stamp-inner]:text-orange-900 active:translate-y-0",
        limeOutline:
          "bg-[#DC2626] [&_.pos-stamp-inner]:bg-[#FEF3C7] [&_.pos-stamp-inner]:text-[#1C1613] hover:[&_.pos-stamp-inner]:bg-[#FFFFFF]",
      },
      size: {
        default: "[&_.pos-stamp-inner]:h-10 [&_.pos-stamp-inner]:px-4 [&_.pos-stamp-inner]:py-2 text-sm",
        sm: "[&_.pos-stamp-inner]:h-8.5 [&_.pos-stamp-inner]:px-3 [&_.pos-stamp-inner]:py-1 text-xs",
        lg: "[&_.pos-stamp-inner]:h-11 [&_.pos-stamp-inner]:px-6 [&_.pos-stamp-inner]:py-2 text-sm",
        xl: "[&_.pos-stamp-inner]:h-12 [&_.pos-stamp-inner]:px-7 [&_.pos-stamp-inner]:py-2.5 text-base",
        icon: "[&_.pos-stamp-inner]:h-9 [&_.pos-stamp-inner]:w-9 [&_.pos-stamp-inner]:p-0",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="pos-stamp-inner w-full h-full">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
