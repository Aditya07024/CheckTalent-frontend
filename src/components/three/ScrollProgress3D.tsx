"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Fixed top 3D solar laser progress bar + floating HUD widget.
 * Uses direct DOM width updates to eliminate re-renders on scroll.
 */
export function ScrollProgress3D() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const max = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
          if (barRef.current) {
            barRef.current.style.width = `${pct}%`;
          }

          const shouldBeVisible = window.scrollY > 360;
          if (shouldBeVisible !== visibleRef.current) {
            visibleRef.current = shouldBeVisible;
            setVisible(shouldBeVisible);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-amber-100/50"
      >
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-[0_0_12px_rgba(234,88,12,0.65)]"
          style={{ width: "0%" }}
        />
      </div>

      <div
        className={cn(
          "fixed bottom-5 right-5 z-40 flex items-center gap-2 transition-all duration-300",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <button
          type="button"
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_6px_20px_rgba(234,88,12,0.32)] transition-all hover:shadow-[0_8px_26px_rgba(234,88,12,0.45)] hover:-translate-y-0.5 active:scale-95"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
