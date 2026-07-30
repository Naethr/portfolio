'use client';

import { ArrowUpRight, MoonIcon, SunIcon } from "@phosphor-icons/react";

import type { ProjectLink } from "@/data/portfolio";
import type { PortfolioTranslations } from "@/data/translations";

import { MobileNav } from "./mobile-nav";

type SiteHeaderProps = {
  copy: PortfolioTranslations["header"];
  links: ProjectLink[];
  mobileCopy: PortfolioTranslations["mobileNav"];
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  theme: "dark" | "light";
};

export function SiteHeader({
  copy,
  links,
  mobileCopy,
  onToggleLanguage,
  onToggleTheme,
  theme,
}: SiteHeaderProps) {
  const ThemeIcon = theme === "dark" ? SunIcon : MoonIcon;
  const themeSwitchAriaLabel =
    theme === "dark"
      ? copy.themeSwitchToLightAriaLabel
      : copy.themeSwitchToDarkAriaLabel;

  return (
    <header className="sticky top-0 z-30 bg-transparent backdrop-blur-none">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
        <div className="theme-nav flex w-full items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl">
          <a
            href="#top"
            className="theme-text-primary inline-flex items-center gap-3 text-sm font-medium tracking-[-0.02em]"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(67,137,255,0.95)]" />
            Théo Villalba
          </a>
          <nav aria-label={copy.navigationLabel} className="hidden md:block">
            <ul className="theme-text-muted flex items-center gap-7 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-[var(--text-primary)]"
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
              className="theme-accent-control group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300"
            >
              {copy.contactLabel}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-control-strong)] transition-colors duration-300 group-hover:bg-[var(--surface-control-hover)]">
                <ArrowUpRight size={14} weight="regular" />
              </span>
            </a>
            <button
              type="button"
              aria-label={copy.languageSwitchAriaLabel}
              onClick={onToggleLanguage}
              className="theme-control inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]"
            >
              {copy.languageSwitchText}
            </button>
            <button
              type="button"
              aria-label={themeSwitchAriaLabel}
              onClick={onToggleTheme}
              className="theme-control inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]"
            >
              <ThemeIcon size={17} weight="regular" />
            </button>
          </div>
          <MobileNav
            copy={mobileCopy}
            links={links}
            languageSwitchAriaLabel={copy.languageSwitchAriaLabel}
            languageSwitchText={copy.languageSwitchText}
            onToggleLanguage={onToggleLanguage}
            onToggleTheme={onToggleTheme}
            theme={theme}
            themeSwitchAriaLabel={themeSwitchAriaLabel}
          />
        </div>
      </div>
    </header>
  );
}
