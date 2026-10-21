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
    const params = new URLSearchParams(window.location.search);
    const requestedLanguage = params.get("lang");
    let savedLanguage: string | null = null;
    try {
      savedLanguage = window.localStorage.getItem("portfolio-language");
    } catch {
      // Language navigation still works without browser storage.
    }
    const initialLanguage = requestedLanguage === "en" || requestedLanguage === "fr"
      ? requestedLanguage
      : savedLanguage === "en" ? "en" : "fr";
    const languageFrame = window.requestAnimationFrame(() => setLanguage(initialLanguage));
    return () => window.cancelAnimationFrame(languageFrame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => {
      const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
      try {
        window.localStorage.setItem("portfolio-language", nextLanguage);
      } catch {
        // The switch works for this visit even without browser storage.
      }
      return nextLanguage;
    });
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
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader
          copy={copy.header}
          links={copy.navigationLinks}
          mobileCopy={copy.mobileNav}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <PortfolioPage copy={copy} language={language} />
        <SiteFooter copy={copy.footer} />
      </div>
    </div>
  );
}
