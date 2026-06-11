'use client';

import { useEffect, useState } from "react";

import {
  translations,
  type Language,
} from "@/data/translations";

import { PortfolioPage } from "./portfolio-page";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PortfolioShell() {
  const [language, setLanguage] = useState<Language>("fr");
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "fr" ? "en" : "fr"));
  }

  return (
    <>
      <SiteHeader
        copy={copy.header}
        links={copy.navigationLinks}
        mobileCopy={copy.mobileNav}
        onToggleLanguage={toggleLanguage}
      />
      <PortfolioPage copy={copy} />
      <SiteFooter copy={copy.footer} />
    </>
  );
}
