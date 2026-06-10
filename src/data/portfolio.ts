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
  status:
    | "En ligne"
    | "En cours"
    | "Privé"
    | "MVP"
    | "En cours (MVP terminé)"
    | "Déployé";
  year: string;
  metric: string;
  intention?: string;
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
    slug: "sokwak.com",
    name: "Sokwak AI",
    description:
      "Une IA qui n’écrit pas la solution à ta place, mais t’aide à apprendre à la trouver.",
    technologies: ["Express.js", "TypeScript", "React", "Next.js"],
    githubUrl: "https://github.com/Naethr/Rubberduck_AI",
    status: "MVP",
    year: "2026",
    metric: "Une appli IA destinée à aider à l'apprentissage avant tout.",
    intention:
      "Créer une app IA qui agit comme un mentor: il questionne, reformule et guide le raisonnement jusqu'au déclic.",
  },
  {
    slug: "questonaut",
    name: "Questonaut - Tracker d'habitudes gamifié",
    description:
      "Un tracker d'habitude gamifié pour rendre ludique le fait de se tenir à ses objectifs quotidien.",
    technologies: ["Ruby on Rails", "Hotwire", "Stimulus", "JavaScript"],
    githubUrl: "https://github.com/Naethr/questonaut_habit_tracker_app",
    status: "En cours (MVP terminé)",
    year: "2026",
    metric: "UI gamifiée avec système de niveau et badges de récompenses pour aider à se tenir à ses habitudes.",
    intention:
      "Proposer une UI gamifiée, avec système de niveau et badges de récompenses, pour aider l'utilisateur à se tenir à ses habitudes.",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    description:
      "Le portfolio que vous consultez actuellement.",
    technologies: ["Next.js", "React", "TypeScript"],
    githubUrl: "https://github.com/Naethr/portfolio",
    status: "Déployé",
    year: "2026",
    metric: "Une interface propre et claire.",
    intention: "Créer une interface propre, claire avec des composants modernes",
  },
];

export const socialLinks: ProjectLink[] = [
  { label: "GitHub", href: "https://github.com/Naethr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/th%C3%A9o-villalba-52a7343a3/" },
  { label: "Email", href: "mailto:hello@theovillalba.dev" },
];
