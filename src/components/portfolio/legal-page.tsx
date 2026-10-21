"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { translations, type Language } from "@/data/translations";
import { SiteFooter } from "./site-footer";

type PageKind = "notice" | "privacy";
type Section = { heading: string; paragraphs: string[] };

const email = "theovbpro@gmail.com";

const content: Record<Language, Record<PageKind, { title: string; intro: string; sections: Section[] }>> = {
  fr: {
    notice: {
      title: "Mentions légales",
      intro: "Informations relatives à ce portfolio personnel non commercial.",
      sections: [
        {
          heading: "Éditeur et publication",
          paragraphs: [
            "Théo VILLALBA, éditeur et directeur de la publication de ce site personnel.",
            "Contact : theovbpro@gmail.com",
          ],
        },
        {
          heading: "Hébergement",
          paragraphs: [
            "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.",
            "Site de l’hébergeur : vercel.com",
          ],
        },
        {
          heading: "Contenus et droits",
          paragraphs: [
            "Ce portfolio présente des projets et réalisations personnels. Les contenus, marques, logos, bibliothèques, polices et autres ressources de tiers restent soumis aux droits et licences de leurs titulaires respectifs.",
          ],
        },
      ],
    },
    privacy: {
      title: "Confidentialité",
      intro: "Cette page explique comment les données personnelles peuvent être traitées dans le cadre de ce portfolio, édité par Théo VILLALBA.",
      sections: [
        {
          heading: "Contact par email",
          paragraphs: [
            "Ce site n’a pas de formulaire. Si vous choisissez de m’écrire depuis votre messagerie, je peux recevoir votre adresse email, votre nom ou signature, le contenu du message et les informations que vous décidez d’y inclure.",
            "J’utilise ces données pour lire votre message, y répondre et suivre l’échange. Ce traitement peut reposer sur mon intérêt légitime à répondre aux demandes que vous m’adressez spontanément. Aucun compte utilisateur ni base de données applicative n’est créé.",
          ],
        },
        {
          heading: "Conservation et destinataires",
          paragraphs: [
            "Les échanges par email sont conservés le temps nécessaire pour répondre à vos messages, en assurer le suivi et garder une trace utile de nos échanges.",
            "Certaines correspondances peuvent être conservées plus longtemps lorsque leur nature le justifie, notamment pour préserver mes droits, dans le respect des durées applicables.",
            "Les messages sont conservés dans ma messagerie électronique et peuvent être stockés par le fournisseur de ce service. Je suis le destinataire des messages qui me sont adressés.",
          ],
        },
        {
          heading: "Hébergement et données techniques",
          paragraphs: [
            "Le site est hébergé par Vercel. Les requêtes nécessaires à son affichage peuvent impliquer des données techniques, notamment l’adresse IP, le navigateur, la page demandée et des journaux utilisés pour l’exploitation et la sécurité de l’hébergement. Vercel intervient pour ces traitements techniques ; leur localisation et d’éventuels transferts hors de l’Union européenne dépendent des services et réglages d’hébergement.",
          ],
        },
        {
          heading: "Préférences et traceurs",
          paragraphs: [
            "Le navigateur conserve localement vos choix de thème et de langue pour les retrouver lors de votre visite. Le site ne dépose pas de cookie à cette fin. Aucun outil de mesure d’audience ou de performance n’est intégré au site.",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            "Lorsque le RGPD s’applique, vous pouvez demander l’accès à vos données, leur rectification, leur effacement ou la limitation du traitement, et vous opposer au traitement lorsque ce droit s’applique. Selon les circonstances, d’autres droits peuvent s’exercer. Écrivez à theovbpro@gmail.com. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).",
          ],
        },
      ],
    },
  },
  en: {
    notice: {
      title: "Legal Notice",
      intro: "Information about this non-commercial personal portfolio.",
      sections: [
        {
          heading: "Publisher",
          paragraphs: [
            "Théo VILLALBA, editor and publication director of this personal website.",
            "Contact: theovbpro@gmail.com",
          ],
        },
        {
          heading: "Hosting",
          paragraphs: [
            "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States.",
            "Host website: vercel.com",
          ],
        },
        {
          heading: "Content and rights",
          paragraphs: [
            "This portfolio presents personal projects and work. Third-party content, trademarks, logos, libraries, fonts and other resources remain subject to their respective owners’ rights and licences.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro: "This page explains how personal data may be processed in connection with this portfolio, published by Théo VILLALBA.",
      sections: [
        {
          heading: "Email contact",
          paragraphs: [
            "This website has no contact form. If you choose to write from your email application, I may receive your email address, name or signature, message and anything else you decide to include.",
            "I use this information to read and reply to your message and follow up on the exchange. This processing may be based on my legitimate interest in answering messages you send voluntarily. No user account or application database is created.",
          ],
        },
        {
          heading: "Retention and recipients",
          paragraphs: [
            "Email exchanges are kept for as long as needed to reply to your messages, follow up on them and retain a useful record of our exchanges.",
            "Some correspondence may be kept longer when its nature justifies it, particularly to protect my rights, in accordance with applicable retention periods.",
            "Messages are kept in my email account and may be stored by the provider of that service. I receive the messages addressed to me.",
          ],
        },
        {
          heading: "Hosting and technical data",
          paragraphs: [
            "The website is hosted by Vercel. Requests needed to display it may involve technical data, including IP address, browser, requested page and logs used to operate and secure the hosting service. Vercel handles these technical processes; their location and any transfers outside the European Union depend on the hosting services and settings.",
          ],
        },
        {
          heading: "Preferences and trackers",
          paragraphs: [
            "Your browser stores your theme and language choices locally so they remain available on future visits. The site does not set a cookie for this. No audience analytics or performance measurement tool is integrated into the site.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Where the GDPR applies, you can request access to, correction or deletion of your data, restriction of processing, and object when that right applies. Other rights may apply depending on the circumstances. Write to theovbpro@gmail.com. You may also lodge a complaint with the French data protection authority, the CNIL (cnil.fr).",
          ],
        },
      ],
    },
  },
};

const paths: Record<Language, Record<PageKind, string>> = {
  fr: { notice: "/mentions-legales", privacy: "/confidentialite" },
  en: { notice: "/en/legal-notice", privacy: "/en/privacy-policy" },
};

function renderParagraph(paragraph: string) {
  const parts = paragraph.split(/(theovbpro@gmail\.com|vercel\.com|cnil\.fr)/g);
  return parts.map((part, index) => {
    const href = part === email ? `mailto:${email}` : part === "vercel.com" || part === "cnil.fr" ? `https://${part}` : null;
    return href ? <a key={`${part}-${index}`} href={href} className="legal-link">{part}</a> : part;
  });
}

export function LegalPage({ language, kind }: { language: Language; kind: PageKind }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const page = content[language][kind];
  const otherLanguage = language === "fr" ? "en" : "fr";
  const home = language === "fr" ? "/?lang=fr" : "/?lang=en";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    });
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // Route-based language selection still works without browser storage.
    }
    return () => window.cancelAnimationFrame(frame);
  }, [language]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem("portfolio-theme", next);
    } catch {
      // The selected theme remains active for this visit.
    }
  }

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="legal-header mx-auto flex w-full max-w-[1380px] flex-wrap items-center justify-between gap-3 border-b border-[var(--border-soft)] px-4 py-5 sm:px-6 lg:px-8">
        <Link href={home} className="theme-text-primary inline-flex min-h-11 items-center font-display text-2xl uppercase tracking-[0.04em]">Théo</Link>
        <nav aria-label={language === "fr" ? "Navigation des pages légales" : "Legal page navigation"} className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
          <Link href={home} className="legal-control">{language === "fr" ? "Retour au portfolio" : "Back to portfolio"}</Link>
          <Link href={paths[otherLanguage][kind]} hrefLang={otherLanguage} lang={otherLanguage} className="legal-control" aria-label={language === "fr" ? "Voir cette page en anglais" : "View this page in French"}>{otherLanguage.toUpperCase()}</Link>
          <button type="button" onClick={toggleTheme} className="legal-control" aria-label={theme === "dark" ? language === "fr" ? "Passer au thème clair" : "Switch to light theme" : language === "fr" ? "Passer au thème sombre" : "Switch to dark theme"}>{theme === "dark" ? language === "fr" ? "Clair" : "Light" : language === "fr" ? "Sombre" : "Dark"}</button>
        </nav>
      </header>
      <main id="content" className="legal-main mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <p className="legal-kicker">{language === "fr" ? "Informations du site" : "Website information"}</p>
        <h1 className="theme-text-primary mt-4 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.08]">{page.title}</h1>
        <p className="theme-text-secondary mt-5 max-w-[62ch] text-base leading-8">{page.intro}</p>
        <div className="mt-12 border-t border-[var(--border-soft)]">
          {page.sections.map((section) => (
            <section key={section.heading} className="border-b border-[var(--border-soft)] py-8 sm:py-10">
              <h2 className="theme-text-primary text-2xl sm:text-[1.7rem]">{section.heading}</h2>
              <div className="theme-text-secondary mt-4 space-y-4 text-[0.95rem] leading-8 sm:text-base">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{renderParagraph(paragraph)}</p>)}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter copy={translations[language].footer} />
    </div>
  );
}
