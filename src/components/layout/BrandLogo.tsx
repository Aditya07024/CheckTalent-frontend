import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PRODUCT_METADATA } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
  subtitle?: string;
  size?: number;
}

/**
 * TalentLens brand logo featuring the 3D resume-with-glasses lens emblem
 * and clear typography.
 */
export function BrandLogo({
  className,
  showWordmark = true,
  subtitle,
  size = 36,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span className="relative flex shrink-0 items-center justify-center">
        <Image
          src="/logo.png"
          alt={`${PRODUCT_METADATA.name} logo`}
          width={size}
          height={size}
          priority
          className="h-9 w-9 object-contain drop-shadow-[0_4px_12px_rgba(234,88,12,0.28)] transition-transform duration-200 hover:scale-105"
        />
      </span>

      {showWordmark && (
        <span className="flex flex-col">
          <span className="kanit-semibold text-[20px] tracking-tight text-ink leading-none">
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
