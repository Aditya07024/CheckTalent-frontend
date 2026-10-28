"use client";

import React, { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { FOOTER_LINK_GROUPS } from "@/data/navigation";
import { PRODUCT_METADATA, SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const [activePlaceholder, setActivePlaceholder] = useState<{
    title: string;
    notice: string;
    href: string;
  } | null>(null);

  const handleFooterLink = (
  event: React.MouseEvent<HTMLAnchorElement>,
  link: {
    label: string;
    href: string;
    isPlaceholder?: boolean;
    placeholderNotice?: string;
  }
) => {
  if (link.isPlaceholder && link.placeholderNotice) {
    event.preventDefault();

    setActivePlaceholder({
      title: link.label,
      notice: link.placeholderNotice,
      href: link.href,
    });

    return;
  }

  // Allow legal pages to navigate normally.
  if (link.href === "/privacy" || link.href === "/terms") {
    return;
  }

  // Handle in-page section navigation.
  event.preventDefault();
  scrollToSection(link.href);
};

  return (
    <footer className="relative z-[2] border-t-2 border-orange-200 bg-gradient-to-b from-[#F5EFE6] to-[#EFE5D6] text-ink-secondary">
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"
      />
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={`#${SECTION_IDS.hero}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(`#${SECTION_IDS.hero}`);
              }}
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              <BrandLogo subtitle="Developer Intelligence" />
            </a>

            <p className="font-mono text-xs uppercase tracking-wider text-lime">
              {PRODUCT_METADATA.tagline}
            </p>

            <p className="max-w-sm text-sm leading-relaxed text-ink-secondary">
              {PRODUCT_METADATA.supportingMessage}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded border border-hairline bg-canvas-secondary px-2.5 py-1 font-mono text-[11px] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                EVIDENCE-FIRST · HUMAN-ACCOUNTABLE
              </span>
            </div>
          </div>

          {/* Structured Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.heading} className="space-y-3.5">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-ink">
                  {group.heading}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => {
const isLegalPage = [
  "/privacy",
  "/terms",
  "/contact",
].includes(link.href);

  return (
    <li key={link.label}>
      {isLegalPage ? (
        <Link
          href={link.href}
          className="rounded-sm text-sm text-ink-secondary transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          {link.label}
        </Link>
      ) : (
        <a
          href={link.href}
          onClick={(e) => handleFooterLink(e, link)}
          className="rounded-sm text-sm text-ink-secondary transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          {link.label}
        </a>
      )}
    </li>
  );
})}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Transparency Strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-ink-muted">
            © {PRODUCT_METADATA.copyrightYear} {PRODUCT_METADATA.name}. All rights
            reserved.
          </p>
          <p className="font-mono text-[11px] text-ink-muted">
            Product interface examples on this page use illustrative mock artifacts.
          </p>
        </div>
      </div>

      {/* Placeholder Documentation Notice Modal */}
      <Dialog
        open={Boolean(activePlaceholder)}
        onOpenChange={(open) => {
          if (!open) setActivePlaceholder(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mb-2">
              <Badge variant="neutral">PRE-LAUNCH PLACEHOLDER</Badge>
            </div>
            <DialogTitle>{activePlaceholder?.title}</DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              {activePlaceholder?.notice}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setActivePlaceholder(null)}
            >
              Close
            </Button>
            {activePlaceholder?.href === `#${SECTION_IDS.earlyAccess}` && (
              <Button
                type="button"
                onClick={() => {
                  setActivePlaceholder(null);
                  scrollToSection(`#${SECTION_IDS.earlyAccess}`);
                }}
              >
                Go to Inquiry Form
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
