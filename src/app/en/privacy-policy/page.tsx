import type { Metadata } from "next";
import { LegalPage } from "@/components/portfolio/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Théo VILLALBA’s personal portfolio.",
  openGraph: { locale: "en_US" },
  alternates: { languages: { fr: "/confidentialite", en: "/en/privacy-policy" } },
};

export default function Page() {
  return <LegalPage language="en" kind="privacy" />;
}
