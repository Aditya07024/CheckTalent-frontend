import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a section anchor on the page while respecting
 * prefers-reduced-motion and moving focus when appropriate.
 */
export function scrollToSection(href: string, options?: { preselectRole?: string; selectCategory?: string }) {
  if (typeof window === "undefined") return;

  if (options?.preselectRole) {
    window.dispatchEvent(
      new CustomEvent("pos:select-role", { detail: { role: options.preselectRole } })
    );
  }

  if (options?.selectCategory) {
    window.dispatchEvent(
      new CustomEvent("pos:select-category", {
        detail: { categoryId: options.selectCategory },
      })
    );
  }

  const targetId = href.replace(/^#/, "");
  const element = document.getElementById(targetId);
  if (!element) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navbarOffset = 80;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - navbarOffset);

  window.scrollTo({
    top: offsetPosition,
    behavior: prefersReduced ? "auto" : "smooth",
  });
}
