export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  status: "En ligne" | "En cours" | "Privé";
  year: string;
  metric: string;
};

export const navigationLinks: ProjectLink[] = [
  { label: "Projets", href: "#projets" },
  { label: "Stack", href: "#stack" },
  { label: "À propos", href: "#profil" },
  { label: "Contact", href: "#contact" },
];

export const rotatingTechnologies = [
  "Ruby on Rails",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "NestJS",
  "Tailwind CSS",
];

export const skillGroups = [
  {
    title: "Front",
    description: "Interfaces rapides, lisibles et pensées pour durer.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Back",
    description: "Architecture pragmatique, APIs propres et logique métier claire.",
    items: ["Ruby on Rails", "Node.js", "Express.js", "PostgreSQL", "REST API"],
  },
  {
    title: "Qualité",
    description: "Des livraisons stables avec une vraie attention au détail.",
    items: ["Performance", "Accessibilité", "SEO", "UI systems", "Code review"],
  },
];

export const projects: Project[] = [
  {
    slug: "composable-commerce",
    name: "Plateforme e-commerce composable",
    description:
      "Refonte d'une expérience d'achat orientée vitesse, lisibilité produit et composants réutilisables côté front.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/theovillalba",
    liveUrl: "#contact",
    status: "En ligne",
    year: "2026",
    metric: "Architecture pensée Core Web Vitals et conversion.",
  },
  {
    slug: "ops-dashboard",
    name: "Dashboard ops pour équipe produit",
    description:
      "Interface de suivi releases, incidents et métriques internes avec une navigation rapide et un design orienté signal.",
    technologies: ["React", "Express.js", "PostgreSQL", "Motion"],
    githubUrl: "https://github.com/theovillalba",
    status: "En cours",
    year: "2025",
    metric: "UI dense mais respirante, optimisée pour la prise de décision.",
  },
  {
    slug: "editorial-headless-core",
    name: "Socle éditorial headless",
    description:
      "Base technique pour publier vite, maintenir simplement et faire évoluer un produit contenu sans dette visuelle.",
    technologies: ["Ruby on Rails", "Next.js", "SEO", "CMS headless"],
    githubUrl: "https://github.com/theovillalba",
    status: "Privé",
    year: "2025",
    metric: "Sections modulaires, rendering propre et workflow éditorial cadré.",
  },
];

export const socialLinks: ProjectLink[] = [
  { label: "GitHub", href: "https://github.com/theovillalba" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Email", href: "mailto:hello@theovillalba.dev" },
];
