'use client';

import { useEffect, useState } from "react";

import {
  translations,
  type Language,
} from "@/data/translations";

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
    <>
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
    </>
  );
}
