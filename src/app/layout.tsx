import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Manrope,
  Oxanium,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Théo Villalba | Développeur fullstack",
    template: "%s | Théo Villalba",
  },
  description:
    "Portfolio développeur en français, sombre et premium, centré sur la performance, les interfaces soignées et une architecture fullstack propre.",
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
      "Portfolio développeur sombre et moderne, entre interfaces premium, performance et architecture maintenable.",
    type: "website",
    locale: "fr_FR",
    siteName: "Portfolio Théo Villalba",
  },
  twitter: {
    card: "summary_large_image",
    title: "Théo Villalba | Développeur fullstack",
    description:
      "Portfolio développeur orienté interfaces premium, performance et produits web crédibles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${oxanium.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-sans">
        <a href="#content" className="skip-link">
          Aller au contenu
        </a>
        <div className="site-shell flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
