import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const marcellus = localFont({
  src: "../fonts/Marcellus-Latin.woff2",
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: {
    default: "Théo Villalba | Développeur fullstack",
    template: "%s | Théo Villalba",
  },
  description:
    "Développeur Full Stack. Découvrez mes projets et mon parcours.",
  keywords: [
    "Théo Villalba",
    "Développeur fullstack",
    "Portfolio Next.js",
    "React",
    "Ruby on Rails",
    "Refonte frontend",
  ],
  openGraph: {
    title: "Théo Villalba | Développeur fullstack",
    description:
      "Développeur Full Stack. Découvrez mes projets et mon parcours.",
    type: "website",
    locale: "fr_FR",
    siteName: "Portfolio Théo Villalba",
  },
  twitter: {
    card: "summary_large_image",
    title: "Théo Villalba | Développeur fullstack",
    description:
      "Développeur Full Stack. Découvrez mes projets et mon parcours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1C17",
};

const themeInitScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${manrope.variable} ${marcellus.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full font-sans">
        <a href="#content" className="skip-link">
          Aller au contenu
        </a>
        <div className="site-shell flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
