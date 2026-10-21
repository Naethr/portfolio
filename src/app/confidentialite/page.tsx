import type { Metadata } from "next";
import { LegalPage } from "@/components/portfolio/legal-page";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Informations sur la confidentialité du portfolio de Théo VILLALBA.",
  alternates: { languages: { fr: "/confidentialite", en: "/en/privacy-policy" } },
};

export default function Page() {
  return <LegalPage language="fr" kind="privacy" />;
}
