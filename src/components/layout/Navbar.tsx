"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, LockKeyhole, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_NAV_ITEMS } from "@/data/navigation";
import { SECTION_IDS } from "@/lib/constants";
import { cn, scrollToSection } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href);
  };

  const handleEarlyAccessClick = () => {
    setMobileMenuOpen(false);
    setSignInModalOpen(false);
    scrollToSection(`#${SECTION_IDS.earlyAccess}`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled
            ? "border-b border-orange-200/70 bg-[#FAF7F2]/90 backdrop-blur-md shadow-[0_6px_24px_rgba(217,72,30,0.07)]"
            : "border-b border-stone-200/70 bg-[#FAF7F2]/80 backdrop-blur-sm"
        )}
      >
        {/* Top Warm Solar Accent Line (Yellow -> Amber -> Orange -> Red) */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full bg-gradient-to-r from-yellow-400 via-amber-500 via-orange-500 to-red-600"
        />
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Left: Product Logo & Name */}
          <a
            href={`#${SECTION_IDS.hero}`}
            onClick={(e) => handleNavClick(e, `#${SECTION_IDS.hero}`)}
            className="rounded-md py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            aria-label="CheckTalent — Return to top"
          >
            <BrandLogo />
          </a>

          {/* Center Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1 rounded-full border border-orange-200/85 bg-gradient-to-r from-yellow-50/90 via-white to-orange-50/90 px-2 py-1 shadow-sm"
          >
            {PRIMARY_NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-ink-secondary transition-colors hover:bg-orange-500/10 hover:text-orange-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSignInModalOpen(true)}
              className="text-[13px]"
            >
              Sign In
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleEarlyAccessClick}
              className="text-[13px]"
            >
              Get Early Access
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              type="button"
              size="sm"
              onClick={handleEarlyAccessClick}
              className="hidden sm:inline-flex text-xs"
            >
              Get Early Access
            </Button>
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-canvas-secondary text-ink transition-colors hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="border-t border-hairline bg-canvas-secondary px-5 py-5 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-canvas-elevated hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[11px] text-ink-muted">JUMP</span>
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2.5 border-t border-hairline pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInModalOpen(true);
                }}
                className="w-full justify-center"
              >
                Sign In
              </Button>
              <Button
                type="button"
                onClick={handleEarlyAccessClick}
                className="w-full justify-center"
              >
                Get Early Access
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Pre-Release Sign-In Notice Dialog */}
      <Dialog open={signInModalOpen} onOpenChange={setSignInModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="default">PRE-RELEASE ACCESS</Badge>
            </div>
            <DialogTitle className="flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-lime" />
              Workspace Sign-In
            </DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              CheckTalent is currently in pre-release development. Account
              authentication for Candidate Proof Workspaces and Recruiter Review
              Portals will open incrementally to early-access cohorts.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-md border border-hairline bg-canvas p-3.5 font-mono text-xs text-ink-secondary">
            <p className="text-ink">Want workspace access when cohorts open?</p>
            <p className="mt-1 text-ink-muted">
              Register your role in the early-access section below, or explore
              the interactive Proof Card and 38-feature specification right on
              this page.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setSignInModalOpen(false)}
            >
              Continue Exploring
            </Button>
            <Button type="button" onClick={handleEarlyAccessClick}>
              Join Early Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
