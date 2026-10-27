"use client";

import React from "react";
import {
  MARQUEE_ROW_ONE,
  MARQUEE_ROW_TWO,
  type MarqueeKeycapSpec,
} from "@/data/three-scene";

const TONE_CARD: Record<MarqueeKeycapSpec["tone"], string> = {
  yellow:
    "border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 via-white to-amber-50 text-amber-950",
  amber:
    "border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-orange-50 text-orange-950",
  orange:
    "border-2 border-orange-400 bg-gradient-to-br from-orange-50 via-white to-red-50/70 text-orange-950",
  red:
    "border-2 border-red-400 bg-gradient-to-br from-red-50 via-white to-orange-50 text-red-950",
};

const TONE_BADGE: Record<MarqueeKeycapSpec["tone"], string> = {
  yellow: "bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-950",
  amber: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
  orange: "bg-gradient-to-br from-orange-500 to-red-600 text-white",
  red: "bg-gradient-to-br from-red-600 to-orange-600 text-white",
};

function KeycapTrack({
  items,
  reverse,
}: {
  items: ReadonlyArray<MarqueeKeycapSpec>;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex w-max gap-3.5 hover:[animation-play-state:paused] ${
        reverse ? "animate-marquee-right" : "animate-marquee-left"
      }`}
      style={{ transform: "rotateX(8deg)" }}
    >
      {[...items, ...items].map((item, idx) => (
        <div
          key={`${item.code}-${idx}`}
          className={`flex items-center gap-3 rounded-xl border px-3.5 py-2 shadow-[0_8px_18px_rgba(217,72,30,0.10)] transition-transform duration-200 hover:-translate-y-1.5 ${TONE_CARD[item.tone]}`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[11px] font-extrabold shadow-sm ${TONE_BADGE[item.tone]}`}
          >
            {item.code}
          </span>
          <div className="pr-1">
            <p className="text-xs font-bold leading-tight">{item.label}</p>
            <p className="font-mono text-[10px] opacity-75">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Full-width 3D Isometric Extruded Keycap Ribbon flowing across the page.
 */
export function PolyglotMarquee3D() {
  return (
    <div
      aria-label="3D Polyglot Verification Stack Ribbon"
      className="relative z-[2] overflow-hidden border-b border-orange-200/80 bg-gradient-to-r from-yellow-100/55 via-amber-50/65 to-orange-100/55 py-6 backdrop-blur-[2px]"
    >
      <div className="space-y-3.5" style={{ perspective: "1100px" }}>
        {/* <KeycapTrack items={MARQUEE_ROW_ONE} /> */}
        <KeycapTrack items={MARQUEE_ROW_TWO} reverse />
      </div>
    </div>
  );
}
