'use client';

import { List, MoonIcon, SunIcon, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ProjectLink } from "@/data/portfolio";
import type { PortfolioTranslations } from "@/data/translations";

type MobileNavProps = {
  copy: PortfolioTranslations["mobileNav"];
  links: ProjectLink[];
  languageSwitchAriaLabel: string;
  languageSwitchText: string;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  theme: "dark" | "light";
  themeSwitchAriaLabel: string;
};

export function MobileNav({
  copy,
  links,
  languageSwitchAriaLabel,
  languageSwitchText,
  onToggleLanguage,
  onToggleTheme,
  theme,
  themeSwitchAriaLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldRestoreFocusRef = useRef(false);

  useEffect(() => {
    const shell = buttonRef.current?.closest(".site-shell");
    setPortalTarget(shell instanceof HTMLElement ? shell : document.body);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (shouldRestoreFocusRef.current) {
        buttonRef.current?.focus();
        shouldRestoreFocusRef.current = false;
      }

      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      shouldRestoreFocusRef.current = true;
      setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeMenu(restoreFocus = false) {
    shouldRestoreFocusRef.current = restoreFocus;
    setOpen(false);
  }

  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <div className="relative md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? copy.closeLabel : copy.openLabel}
        onClick={() => setOpen((value) => !value)}
        className="theme-control-strong relative z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
      >
        {open ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
      </button>
      {portalTarget
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  id="mobile-navigation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => closeMenu(true)}
                  className="theme-mobile-overlay fixed inset-0 z-20 px-6 pb-10 pt-28 backdrop-blur-xl"
                >
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label={copy.closeLabel}
                    onClick={() => closeMenu(true)}
                    className="theme-mobile-close fixed right-4 top-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                  >
                    <X size={20} weight="regular" />
                  </button>
                  <nav
                    aria-label={copy.navigationLabel}
                    onClick={(event) => event.stopPropagation()}
                    className="mx-auto flex h-full max-w-md flex-col"
                  >
                    <div className="flex flex-1 flex-col justify-center gap-4">
                      {links.map((link, index) => (
                        <motion.a
                          key={link.href}
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={link.href}
                          onClick={() => closeMenu()}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="theme-text-primary border-b border-[var(--border-soft)] pb-4 text-3xl font-medium tracking-[-0.05em]"
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                    <div className="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-3">
                      <button
                        type="button"
                        aria-label={languageSwitchAriaLabel}
                        onClick={onToggleLanguage}
                        className="theme-control inline-flex h-12 min-w-12 items-center justify-center rounded-full border px-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)] active:scale-[0.98]"
                      >
                        {languageSwitchText}
                      </button>
                      <button
                        type="button"
                        aria-label={themeSwitchAriaLabel}
                        onClick={onToggleTheme}
                        className="theme-control inline-flex h-12 w-12 items-center justify-center rounded-full border transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)] active:scale-[0.98]"
                      >
                        <ThemeIcon size={18} weight="regular" />
                      </button>
                      <a
                        href="#contact"
                        onClick={() => closeMenu()}
                        className="theme-accent-control inline-flex min-w-0 items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                      >
                        {copy.contactLabel}
                      </a>
                    </div>
                  </nav>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            portalTarget,
          )
        : null}
    </div>
  );
}
