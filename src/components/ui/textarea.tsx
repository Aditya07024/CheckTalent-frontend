import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[88px] w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted transition-colors focus-visible:outline-none focus-visible:border-lime/60 focus-visible:ring-2 focus-visible:ring-lime/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-400/70",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
