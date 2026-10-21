import type { Metadata } from "next";
import { LegalPage } from "@/components/portfolio/legal-page";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal information for Théo VILLALBA’s personal portfolio.",
  openGraph: { locale: "en_US" },
  alternates: { languages: { fr: "/mentions-legales", en: "/en/legal-notice" } },
};

export default function Page() {
  return <LegalPage language="en" kind="notice" />;
}
