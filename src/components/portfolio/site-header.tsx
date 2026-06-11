'use client';

import { ArrowUpRight } from "@phosphor-icons/react";

import type { ProjectLink } from "@/data/portfolio";
import type { PortfolioTranslations } from "@/data/translations";

import { MobileNav } from "./mobile-nav";

type SiteHeaderProps = {
  copy: PortfolioTranslations["header"];
  links: ProjectLink[];
  mobileCopy: PortfolioTranslations["mobileNav"];
  onToggleLanguage: () => void;
};

export function SiteHeader({
  copy,
  links,
  mobileCopy,
  onToggleLanguage,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-[rgba(8,12,20,0.82)] px-4 py-3 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <a
            href="#top"
            className="inline-flex items-center gap-3 text-sm font-medium tracking-[-0.02em] text-white"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(67,137,255,0.95)]" />
            Théo Villalba
          </a>
          <nav aria-label={copy.navigationLabel} className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-slate-400">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.12)] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[rgba(67,137,255,0.18)]"
            >
              {copy.contactLabel}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/6 transition-colors duration-300 group-hover:bg-white/10">
                <ArrowUpRight size={14} weight="regular" />
              </span>
            </a>
            <button
              type="button"
              aria-label={copy.languageSwitchAriaLabel}
              onClick={onToggleLanguage}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200 transition-colors duration-300 hover:border-white/18 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]"
            >
              {copy.languageSwitchText}
            </button>
          </div>
          <MobileNav
            copy={mobileCopy}
            links={links}
            languageSwitchAriaLabel={copy.languageSwitchAriaLabel}
            languageSwitchText={copy.languageSwitchText}
            onToggleLanguage={onToggleLanguage}
          />
        </div>
      </div>
    </header>
  );
}
