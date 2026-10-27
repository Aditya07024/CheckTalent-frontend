import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[88px] w-full rounded-md border border-hairline-strong bg-canvas-elevated px-3 py-2 text-sm text-ink placeholder:text-ink-muted transition-colors focus-visible:outline-none focus-visible:border-lime focus-visible:ring-2 focus-visible:ring-lime/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-600/75",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
