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
    <header className="site-header theme-nav sticky top-0 z-30">
      <div className="site-header-inner mx-auto flex min-h-[4.5rem] items-center justify-between gap-4 lg:min-h-[5.5rem]">
          <a
            href="#top"
            className="theme-text-primary inline-flex shrink-0 items-center gap-2 font-display text-[1.35rem] font-normal uppercase tracking-[0.04em] sm:text-[1.6rem]"
          >
            Théo
          </a>
          <nav aria-label={copy.navigationLabel} className="hidden lg:block">
            <ul className="theme-text-muted flex items-center gap-5 text-[0.82rem] xl:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="site-nav-link relative inline-flex min-h-11 items-center transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-1.5 lg:flex">
            <a
              href="#contact"
              className="theme-accent-control group inline-flex min-h-11 items-center gap-3 rounded-[0.2rem] border px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              {copy.contactLabel}
              <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
            </a>
            <button
              type="button"
              aria-label={copy.languageSwitchAriaLabel}
              onClick={onToggleLanguage}
              className="theme-control inline-flex h-11 min-w-11 items-center justify-center rounded-[0.2rem] border px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200"
            >
              {copy.languageSwitchText}
            </button>
            <button
              type="button"
              aria-label={themeSwitchAriaLabel}
              onClick={onToggleTheme}
              className="theme-control inline-flex h-11 w-11 items-center justify-center rounded-[0.2rem] border transition-colors duration-200"
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
    </header>
  );
}
