"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Box } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Fixed top 3D solar laser progress bar + floating extruded 3D HUD widget.
 */
export function ScrollProgress3D() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setProgress(Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))));
      setVisible(window.scrollY > 360);
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
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-[0_0_12px_rgba(234,88,12,0.65)] transition-[width] duration-100"
          style={{ width: `${progress}%` }}
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
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-orange-300 border-b-4 border-b-orange-500 bg-white/95 px-3 py-2 font-mono text-[11px] font-bold text-orange-950 shadow-[0_10px_28px_rgba(234,88,12,0.18)] backdrop-blur-md">
          <Box className="h-3.5 w-3.5 text-orange-600" />
          <span>3D SCENE</span>
          <span className="rounded bg-gradient-to-r from-yellow-200 to-orange-200 px-1.5 py-0.5 text-[10px] text-orange-950">
            {progress}%
          </span>
        </div>

        <button
          type="button"
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500 border-b-4 border-b-red-700 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_8px_22px_rgba(234,88,12,0.34)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
