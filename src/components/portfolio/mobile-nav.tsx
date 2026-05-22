'use client';

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import type { ProjectLink } from "@/data/portfolio";

type MobileNavProps = {
  links: ProjectLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white shadow-[0_18px_48px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
      >
        {open ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[rgba(5,8,15,0.96)] px-6 pb-10 pt-28 backdrop-blur-xl"
          >
            <nav aria-label="Navigation mobile" className="mx-auto flex h-full max-w-md flex-col">
              <div className="flex flex-1 flex-col justify-center gap-4">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.14)] px-5 py-3 text-sm font-medium text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              >
                Prendre contact
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
