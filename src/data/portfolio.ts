export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  category: { fr: string; en: string };
  description: { fr: string; en: string };
  technologies: string[];
  screenshot?: { src: string; width: number; height: number; alt: { fr: string; en: string } };
  placeholder?: "portfolio" | "code" | "editorial";
  githubUrl?: string;
  liveUrl?: string;
  comingSoon?: boolean;
};

export const navigationLinks: ProjectLink[] = [
  { label: "Projets", href: "#projets" },
  { label: "Stack", href: "#stack" },
  { label: "À propos", href: "#profil" },
  { label: "Mon parcours", href: "#parcours" },
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
    description: "Architecture pragmatique, API propres et logique métier claire.",
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
    slug: "questonaut",
    name: "Questonaut",
    category: { fr: "Suivi d’habitudes", en: "Habit tracker" },
    description: {
      fr: "Un tracker d’habitudes gamifié pour rendre ludique le fait de se tenir à ses objectifs quotidiens.",
      en: "A gamified habit tracker that makes sticking to daily goals more engaging.",
    },
    technologies: ["Ruby on Rails", "Hotwire", "Stimulus", "JavaScript"],
    screenshot: {
      src: "/images/questonaut.png",
      width: 1345,
      height: 940,
      alt: {
        fr: "Tableau de bord de Questonaut avec missions, progression et badges",
        en: "Questonaut dashboard with missions, progress and badges",
      },
    },
    githubUrl: "https://github.com/Naethr/questonaut_habit_tracker_app",
  },
  {
    slug: "sokwak.com",
    name: "Sokwak AI",
    category: { fr: "Application pédagogique", en: "Learning application" },
    description: {
      fr: "Prototype d’interface pour un assistant pédagogique visant à guider le raisonnement plutôt qu’à fournir la solution.",
      en: "Prototype interface for a learning assistant intended to guide reasoning rather than provide answers.",
    },
    technologies: ["Express.js", "React", "Next.js", "TypeScript"],
    screenshot: {
      src: "/images/sokwak.png",
      width: 1004,
      height: 679,
      alt: {
        fr: "Interface de saisie du prototype Sokwak AI, avec indication qu’un modèle sera disponible ultérieurement",
        en: "Sokwak AI prototype input screen, noting that a model will be available later",
      },
    },
    comingSoon: true,
  },
  {
    slug: "portfolio-l-huguin",
    name: "Portfolio L. Huguin",
    category: { fr: "Site vitrine / Portfolio", en: "Showcase / Portfolio" },
    description: {
      fr: "Portfolio personnel destiné à présenter des projets de graphisme et de communication, avec une gestion des contenus via une interface d’administration.",
      en: "Personal portfolio showcasing graphic design and communication projects, with content management through an administration interface.",
    },
    technologies: ["Ruby on Rails", "ActiveRecord", "PostgreSQL", "React"],
    screenshot: {
      src: "/images/portfolio_lh.png",
      width: 1432,
      height: 891,
      alt: {
        fr: "Capture du portfolio de L. Huguin",
        en: "Screenshot of L. Huguin's portfolio",
      },
    },
    comingSoon: true,
  },
  {
    slug: "snipstack",
    name: "SnipStack",
    category: { fr: "Outil de développement", en: "Developer tool" },
    description: {
      fr: "Application de gestion de snippets permettant d’organiser et de retrouver des extraits de code.",
      en: "Application for managing code snippets, designed to organize and retrieve reusable code.",
    },
    technologies: ["Ruby on Rails", "React", "TypeScript", "Vite"],
    screenshot: {
      src: "/images/snipstack.png",
      width: 1409,
      height: 941,
      alt: {
        fr: "Capture de l’application SnipStack",
        en: "Screenshot of the SnipStack application",
      },
    },
    githubUrl: "https://github.com/Naethr/SnipStack",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    category: { fr: "Portfolio personnel", en: "Personal portfolio" },
    description: {
      fr: "Le portfolio que vous consultez actuellement.",
      en: "The portfolio you are currently browsing.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    placeholder: "portfolio",
    githubUrl: "https://github.com/Naethr/portfolio",
  },
];

export const socialLinks: ProjectLink[] = [
  { label: "GitHub", href: "https://github.com/Naethr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/th%C3%A9o-villalba-52a7343a3/" },
  { label: "Email", href: "mailto:theovbpro@gmail.com" },
];
