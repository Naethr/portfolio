import type { Metadata } from "next";
import { LegalPage } from "@/components/portfolio/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales du portfolio personnel de Théo VILLALBA.",
  alternates: { languages: { fr: "/mentions-legales", en: "/en/legal-notice" } },
};

export default function Page() {
  return <LegalPage language="fr" kind="notice" />;
}
