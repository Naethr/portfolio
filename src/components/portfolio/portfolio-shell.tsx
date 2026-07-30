'use client';

import { useEffect, useState } from "react";

import {
  translations,
  type Language,
} from "@/data/translations";

import { GradientDots } from "../ui/gradient-dots";
import { PortfolioPage } from "./portfolio-page";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function PortfolioShell() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const copy = translations[language];

  useEffect(() => {
    const initialTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const syncFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    applyTheme(initialTheme);

    return () => {
      window.cancelAnimationFrame(syncFrame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "fr" ? "en" : "fr"));
  }

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // The visual toggle should still work when storage is unavailable.
      }

      return nextTheme;
    });
  }

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="theme-main-glow absolute left-1/2 top-0 h-full min-h-[60rem] w-[min(92vw,72rem)] -translate-x-1/2 opacity-70 blur-3xl" />
        <div className="absolute inset-x-[-12%] inset-y-0 sm:inset-x-[-4%]">
          <GradientDots
            dotSize={10}
            spacing={12}
            duration={22}
            colorCycleDuration={10}
            className="opacity-28 [mask-image:linear-gradient(180deg,black_0%,black_82%,transparent_100%)]"
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader
          copy={copy.header}
          links={copy.navigationLinks}
          mobileCopy={copy.mobileNav}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <PortfolioPage copy={copy} />
        <SiteFooter copy={copy.footer} />
      </div>
    </div>
  );
}
