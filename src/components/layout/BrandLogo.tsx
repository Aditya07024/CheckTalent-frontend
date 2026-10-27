import React from "react";
import { cn } from "@/lib/utils";
import { PRODUCT_METADATA } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
  subtitle?: string;
}

/**
 * Custom geometric SVG mark combining code brackets with a verified
 * evidence checkmark indicator. Avoids generic AI brain tropes.
 */
export function BrandLogo({
  className,
  showWordmark = true,
  subtitle,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span
        aria-hidden="true"
        className="relative flex h-8 w-8 items-center justify-center rounded-md border border-[#0B0F17]/15 bg-[#0B0F17] shadow-[0_2px_6px_rgba(15,23,42,0.14)]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[18px] w-[18px]"
        >
          {/* Left code bracket */}
          <path
            d="M7.5 6.5L3.25 12L7.5 17.5"
            stroke="#F8F9FB"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right code bracket */}
          <path
            d="M16.5 6.5L20.75 12L16.5 17.5"
            stroke="#F8F9FB"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center verified evidence check marker */}
          <path
            d="M9.25 12.4L11.2 14.35L15.1 9.65"
            stroke="#C5FF4A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-lime-bright ring-2 ring-canvas" />
      </span>

      {showWordmark && (
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold tracking-tight text-ink leading-none">
            {PRODUCT_METADATA.name}
          </span>
          {subtitle && (
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted leading-none">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
