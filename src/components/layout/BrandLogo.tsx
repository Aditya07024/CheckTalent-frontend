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
 * evidence checkmark indicator in warm terracotta, coral, and gold.
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
        className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-[0_4px_14px_rgba(234,88,12,0.34)]"
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
            stroke="#FFFFFF"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right code bracket */}
          <path
            d="M16.5 6.5L20.75 12L16.5 17.5"
            stroke="#FFFFFF"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center verified evidence check marker */}
          <path
            d="M9.25 12.4L11.2 14.35L15.1 9.65"
            stroke="#FDE68A"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
      </span>

      {showWordmark && (
        <span className="flex flex-col">
          <span className="text-[15px] font-bold tracking-tight text-ink leading-none">
            {PRODUCT_METADATA.name}
          </span>
          {subtitle && (
            <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700 leading-none">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
