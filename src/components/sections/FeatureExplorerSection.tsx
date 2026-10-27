"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronRight, Layers3 } from "lucide-react";
import {
  FEATURE_CATEGORIES,
  FEATURE_EXPLORER_HEADER,
  PLATFORM_FEATURES,
} from "@/data/features";
import type { FeatureCategoryId } from "@/types/feature";
import { SECTION_IDS } from "@/lib/constants";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { FeaturePreview } from "@/components/product-demo/FeaturePreview";
import { Floating3DCube } from "@/components/three/Floating3DCube";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FeatureExplorerSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<FeatureCategoryId>(
    "repository-intelligence"
  );
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    PLATFORM_FEATURES[0]?.id ?? "github-integration"
  );

  const gridRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  // Listen for cross-section category jumps (e.g., "Explore Recruiter Features" CTA)
  useEffect(() => {
    const handleCategorySelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ categoryId?: FeatureCategoryId }>;
      const targetCat = customEvent.detail?.categoryId;
      if (!targetCat) return;

      const matchingCategory = FEATURE_CATEGORIES.find((c) => c.id === targetCat);
      if (!matchingCategory) return;

      setActiveCategoryId(targetCat);
      const firstFeatureInCat = PLATFORM_FEATURES.find(
        (f) => f.categoryId === targetCat
      );
      if (firstFeatureInCat) {
        setSelectedFeatureId(firstFeatureInCat.id);
      }
    };

    window.addEventListener("pos:select-category", handleCategorySelect);
    return () => {
      window.removeEventListener("pos:select-category", handleCategorySelect);
    };
  }, []);

  const activeCategory =
    FEATURE_CATEGORIES.find((cat) => cat.id === activeCategoryId) ??
    FEATURE_CATEGORIES[0]!;

  const categoryFeatures = PLATFORM_FEATURES.filter(
    (feature) => feature.categoryId === activeCategoryId
  );

  const activeFeature =
    categoryFeatures.find((f) => f.id === selectedFeatureId) ??
    categoryFeatures[0] ??
    PLATFORM_FEATURES[0]!;

  const handleCategoryChange = (categoryId: FeatureCategoryId) => {
    setActiveCategoryId(categoryId);
    const firstFeature = PLATFORM_FEATURES.find((f) => f.categoryId === categoryId);
    if (firstFeature) {
      setSelectedFeatureId(firstFeature.id);
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll("[data-feature-card]");
      gsap.fromTo(
        cards,
        { opacity: 0.25, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.035,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: gridRef, dependencies: [activeCategoryId, prefersReducedMotion] }
  );

  return (
    <section
      id={SECTION_IDS.features}
      className="border-b border-orange-200/70 bg-gradient-to-b from-orange-50/40 via-transparent to-amber-50/45 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              {FEATURE_EXPLORER_HEADER.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
              {FEATURE_EXPLORER_HEADER.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
              {FEATURE_EXPLORER_HEADER.subheading}
            </p>
          </div>

          <div className="flex items-center gap-4 self-start lg:self-end">
            <Floating3DCube label="38" tone="gold" size={44} className="hidden sm:block" />
            <Badge variant="default">
              <Layers3 className="h-3.5 w-3.5" />
              38 MODULES · 6 CATEGORIES
            </Badge>
          </div>
        </div>

        {/* Six Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Platform feature categories"
          className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {FEATURE_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategoryId;
            const count = PLATFORM_FEATURES.filter(
              (f) => f.categoryId === category.id
            ).length;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`category-panel-${category.id}`}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "flex flex-col justify-between rounded-xl border border-b-4 p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                  isSelected
                    ? "border-orange-500 border-b-red-600 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50/70 shadow-[0_10px_28px_rgba(234,88,12,0.16)] -translate-y-1"
                    : "border-orange-200/80 border-b-orange-300 bg-white/95 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-amber-50/45"
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      isSelected ? "text-lime" : "text-ink-muted"
                    )}
                  >
                    {category.code}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[10px]",
                      isSelected
                        ? "bg-lime-dim text-lime"
                        : "bg-canvas-secondary text-ink-muted"
                    )}
                  >
                    {count}
                  </span>
                </div>
                <span className="mt-2 text-sm font-semibold text-ink leading-snug">
                  {category.shortLabel}
                </span>
                <span className="mt-1 font-mono text-[10px] text-ink-muted">
                  {category.featureRangeLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Summary Banner */}
        <div
          id={`category-panel-${activeCategory.id}`}
          role="tabpanel"
          className="mt-6 rounded-xl border border-hairline bg-canvas p-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-lime">
                  {activeCategory.code} · {activeCategory.title.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  — {activeCategory.audienceTag}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-secondary">
                {activeCategory.summary}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs text-ink-muted">
              Showing {categoryFeatures.length} features ({activeCategory.featureRangeLabel})
            </span>
          </div>

          {/* Two-Column Explorer Workspace: Left Feature Grid + Right Sticky Inspector */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Category Feature Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6"
            >
              {categoryFeatures.map((feature) => {
                const isSelected = feature.id === activeFeature.id;

                return (
                  <button
                    key={feature.id}
                    type="button"
                    data-feature-card
                    aria-pressed={isSelected}
                    onClick={() => setSelectedFeatureId(feature.id)}
                    className={cn(
                      "group flex flex-col justify-between rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                      isSelected
                        ? "border-orange-500 bg-gradient-to-br from-yellow-50/85 via-white to-orange-50/80 shadow-[0_8px_24px_rgba(234,88,12,0.12)]"
                        : "border-orange-200/70 bg-white hover:border-orange-300 hover:bg-amber-50/40"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-mono text-[11px] font-medium",
                            isSelected ? "text-lime" : "text-ink-muted"
                          )}
                        >
                          {feature.code}
                        </span>
                        {feature.availability !== "core-architecture" && (
                          <span className="rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[9px] uppercase text-ink-muted">
                            Planned
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-sm sm:text-[15px] font-semibold text-ink leading-snug">
                        {feature.name}
                      </h4>

                      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                        {feature.shortSummary}
                      </p>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between border-t border-hairline pt-2.5 font-mono text-[10px]">
                      <span
                        className={cn(
                          isSelected
                            ? "text-lime"
                            : "text-ink-muted group-hover:text-ink-secondary"
                        )}
                      >
                        {isSelected ? "ACTIVE IN INSPECTOR" : "INSPECT MODULE"}
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isSelected
                            ? "translate-x-0.5 text-lime"
                            : "text-ink-muted group-hover:translate-x-0.5 group-hover:text-ink"
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Detailed Feature Preview Panel */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <FeaturePreview
                feature={activeFeature}
                categoryTitle={activeCategory.title}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
