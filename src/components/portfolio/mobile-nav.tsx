'use client';

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ProjectLink } from "@/data/portfolio";

type MobileNavProps = {
  links: ProjectLink[];
};

export function MobileNav({ links }: MobileNavProps) {
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

  return (
    <div className="relative md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white shadow-[0_18px_48px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
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
                  className="fixed inset-0 z-20 bg-[#050816] px-6 pb-10 pt-28 backdrop-blur-xl"
                >
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Fermer le menu de navigation"
                    onClick={() => closeMenu(true)}
                    className="fixed right-4 top-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(8,12,20,0.92)] text-white shadow-[0_18px_48px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                  >
                    <X size={20} weight="regular" />
                  </button>
                  <nav
                    aria-label="Navigation mobile"
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
                          className="border-b border-white/8 pb-4 text-3xl font-medium tracking-[-0.05em] text-white"
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      onClick={() => closeMenu()}
                      className="inline-flex items-center justify-center rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.14)] px-5 py-3 text-sm font-medium text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                    >
                      Prendre contact
                    </a>
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
