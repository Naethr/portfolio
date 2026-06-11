import {
  navigationLinks,
  projects,
  socialLinks,
  type Project,
  type ProjectLink,
} from "./portfolio";

export type Language = "fr" | "en";

type TimelineTextItem =
  | {
      id: string;
      type: "date";
      label: string;
    }
  | {
      id: string;
      type: "event";
      title: string;
      emphasizedText?: string;
      detail?: string;
      fallbackLabel?: string;
    };

type SkillCategory = "frontend" | "backend" | "database" | "tools" | "ai";

type SkillCopy = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  related: string[];
};

type StackCategoryCopy = {
  label: string;
  accent: string;
  soft: string;
};

export type PortfolioTranslations = {
  header: {
    navigationLabel: string;
    contactLabel: string;
    languageSwitchAriaLabel: string;
    languageSwitchText: string;
  };
  mobileNav: {
    openLabel: string;
    closeLabel: string;
    navigationLabel: string;
    contactLabel: string;
  };
  navigationLinks: ProjectLink[];
  hero: {
    eyebrow: string;
    role: string;
    projectsCta: string;
    contactCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: TimelineTextItem[];
  };
  projectsSection: {
    eyebrow: string;
    title: string;
    description: string;
    previousAriaLabel: string;
    nextAriaLabel: string;
  };
  projectCard: {
    projectLabel: string;
    illustrationPending: string;
    liveContext: string;
    stackUsed: string;
    intention: string;
    defaultIntention: string;
    screenshots: Record<string, string>;
  };
  projects: Project[];
  stack: {
    section: {
      eyebrow: string;
      title: string;
      description: string;
    };
    categories: Record<SkillCategory, StackCategoryCopy>;
    detailsLabel: string;
    relatedTechnologiesLabel: string;
    showDetailAriaLabel: string;
    skills: SkillCopy[];
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    rights: string;
    trademarkNotice: string;
    socialLinks: ProjectLink[];
  };
};

const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<Project["slug"], Project>;

const frTimelineItems: TimelineTextItem[] = [
  {
    id: "ai-project",
    type: "event",
    title: "Projet IA",
    detail: "Projet Sokwak AI · intégration d’une API OpenAI moderne",
  },
  {
    id: "node-js",
    type: "event",
    title: "Node.js",
    detail: "Express.js · NestJS · backend JavaScript",
  },
  {
    id: "backend-certification",
    type: "event",
    title: "Certification backend",
    detail: "Obtenue à mi-parcours THP",
    fallbackLabel: "Certification",
  },
  { id: "date-april-2026", type: "date", label: "Avril 2026" },
  {
    id: "react-next",
    type: "event",
    title: "React / Next.js",
    detail: "Composants · JavaScript · TypeScript",
  },
  {
    id: "rails-sql",
    type: "event",
    title: "Ruby on Rails / SQL",
    detail: "MVC · CRUD · base de données · Hotwire",
  },
  {
    id: "tools-mastery",
    type: "event",
    title: "Maîtrise d’outils",
    detail: "GitHub · Vercel · VS Code",
  },
  {
    id: "ruby",
    type: "event",
    title: "Ruby",
    detail: "Niveau : maîtrise · scripts · POO",
  },
  {
    id: "thp-start",
    type: "event",
    title: "Début de formation THP",
    detail: "Formation intensive de Dev Web",
    fallbackLabel: "Apprentissage",
  },
  { id: "date-january-2026", type: "date", label: "Janvier 2026" },
  { id: "ruby-fundamentals", type: "event", title: "Fondamentaux Ruby" },
  {
    id: "end-responsive-web-design",
    type: "event",
    title: "Fin du parcours Responsive Web Design",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    fallbackLabel: "Apprentissage",
  },
  { id: "date-november-2025", type: "date", label: "Novembre 2025" },
  {
    id: "html-css-fundamentals",
    type: "event",
    title: "Fondamentaux HTML/CSS",
    detail: "Mise en page, fondamentaux du web, responsive design",
  },
  {
    id: "freecodecamp-responsive-web-design",
    type: "event",
    title: "Parcours Responsive Web Design",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    fallbackLabel: "Apprentissage",
  },
  { id: "date-september-2025", type: "date", label: "Septembre 2025" },
  {
    id: "career-shift",
    type: "event",
    title: "Reconversion vers le dev web",
  },
  { id: "date-august-2025", type: "date", label: "Août 2025" },
];

const enTimelineItems: TimelineTextItem[] = [
  {
    id: "ai-project",
    type: "event",
    title: "AI project",
    detail: "Sokwak AI project · integration of a modern OpenAI API",
  },
  {
    id: "node-js",
    type: "event",
    title: "Node.js",
    detail: "Express.js · NestJS · JavaScript backend",
  },
  {
    id: "backend-certification",
    type: "event",
    title: "Backend certification",
    detail: "Completed halfway through THP",
    fallbackLabel: "Certification",
  },
  { id: "date-april-2026", type: "date", label: "April 2026" },
  {
    id: "react-next",
    type: "event",
    title: "React / Next.js",
    detail: "Components · JavaScript · TypeScript",
  },
  {
    id: "rails-sql",
    type: "event",
    title: "Ruby on Rails / SQL",
    detail: "MVC · CRUD · database · Hotwire",
  },
  {
    id: "tools-mastery",
    type: "event",
    title: "Tooling fundamentals",
    detail: "GitHub · Vercel · VS Code",
  },
  {
    id: "ruby",
    type: "event",
    title: "Ruby",
    detail: "Level: proficient · scripts · OOP",
  },
  {
    id: "thp-start",
    type: "event",
    title: "Started THP training",
    detail: "Intensive Web Developer training",
    fallbackLabel: "Learning",
  },
  { id: "date-january-2026", type: "date", label: "January 2026" },
  { id: "ruby-fundamentals", type: "event", title: "Ruby fundamentals" },
  {
    id: "end-responsive-web-design",
    type: "event",
    title: "Completed the Responsive Web Design path",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    fallbackLabel: "Learning",
  },
  { id: "date-november-2025", type: "date", label: "November 2025" },
  {
    id: "html-css-fundamentals",
    type: "event",
    title: "HTML/CSS fundamentals",
    detail: "Layout, web fundamentals, responsive design",
  },
  {
    id: "freecodecamp-responsive-web-design",
    type: "event",
    title: "Responsive Web Design path",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    fallbackLabel: "Learning",
  },
  { id: "date-september-2025", type: "date", label: "September 2025" },
  {
    id: "career-shift",
    type: "event",
    title: "Career shift into web development",
  },
  { id: "date-august-2025", type: "date", label: "August 2025" },
];

const frSkills: SkillCopy[] = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    description:
      "Utilisé pour construire des interfaces interactives, pilotées par composants et avec des frontières UI claires.",
    related: ["typescript", "javascript", "vite", "tailwind", "bootstrap", "nextjs"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description:
      "React framework used to build production-ready web applications with routing, rendering and deployment workflows.",
    related: ["react", "javascript", "typescript", "vercel", "bootstrap", "tailwind"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "frontend",
    description:
      "Outillage rapide pour développer des frontends modernes et produire des builds optimisés.",
    related: ["react", "typescript", "javascript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    description:
      "Ajoute de la sûreté de typage et améliore la maintenabilité du code frontend comme backend.",
    related: ["react", "vite", "node", "nextjs"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    description:
      "Langage central des interfaces web dynamiques, de la logique applicative et de l’écosystème Node.js.",
    related: ["react", "node", "vite", "nextjs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    description:
      "Styling utility-first pour concevoir rapidement des interfaces responsive, cohérentes et faciles à ajuster.",
    related: ["react", "rails", "nextjs"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    description:
      "Pratique pour assembler vite des layouts responsive et des patterns UI standards.",
    related: ["react", "rails", "nextjs"],
  },
  {
    id: "hotwire",
    name: "Hotwire",
    category: "frontend",
    description:
      "Frontend framework for building reactive Rails interfaces with minimal JavaScript.",
    related: ["rails"],
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    category: "backend",
    description:
      "Framework backend productif pour créer des applications web structurées et livrer rapidement un MVP solide.",
    related: ["postgresql", "sqlite", "hotwire", "bootstrap", "tailwind"],
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    description:
      "Runtime JavaScript utilisé pour les API, les services backend et l’outillage de développement.",
    related: ["express", "nestjs", "javascript", "typescript"],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    description:
      "Framework minimal pour construire des API REST et de la logique serveur simple à maintenir.",
    related: ["node", "prisma"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "backend",
    description:
      "Framework Node.js structuré pour des architectures backend scalables avec TypeScript.",
    related: ["node", "prisma"],
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "database",
    description:
      "Base relationnelle légère, utile pour le développement local, les prototypes et les petits projets.",
    related: ["prisma", "rails"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    description:
      "Base relationnelle fiable, adaptée aux applications de production et aux données structurées.",
    related: ["prisma", "rails"],
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "database",
    description:
      "ORM type-safe pour modéliser, interroger et maintenir des données relationnelles.",
    related: ["postgresql", "sqlite", "nestjs", "express"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    description:
      "Versioning, collaboration, suivi de projet et base du workflow de livraison.",
    related: ["vercel", "vscode"],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    description:
      "Environnement principal pour écrire, déboguer et naviguer efficacement dans le code.",
    related: ["codex", "ai-workflow", "github"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    description:
      "Plateforme de déploiement pour livrer rapidement le frontend et valider des previews propres.",
    related: ["github", "nextjs"],
  },
  {
    id: "codex",
    name: "Codex",
    category: "ai",
    description:
      "Workflow de développement assisté par IA pour accélérer l’implémentation, l’itération et la revue de code.",
    related: ["vscode", "ai-workflow"],
  },
  {
    id: "ai-workflow",
    name: "Workflow assisté par IA",
    category: "ai",
    description:
      "Méthode de travail moderne où l’IA aide à cadrer, produire, relire et améliorer le code sans remplacer le jugement technique.",
    related: ["codex", "vscode"],
  },
];

const enSkills: SkillCopy[] = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    description:
      "Used to build interactive, component-driven interfaces with clear UI boundaries.",
    related: ["typescript", "javascript", "vite", "tailwind", "bootstrap", "nextjs"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description:
      "React framework used to build production-ready web applications with routing, rendering and deployment workflows.",
    related: ["react", "javascript", "typescript", "vercel", "bootstrap", "tailwind"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "frontend",
    description:
      "Fast tooling for developing modern frontends and producing optimized builds.",
    related: ["react", "typescript", "javascript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    description:
      "Adds type safety and improves maintainability across frontend and backend code.",
    related: ["react", "vite", "node", "nextjs"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    description:
      "Core language for dynamic web interfaces, application logic and the Node.js ecosystem.",
    related: ["react", "node", "vite", "nextjs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    description:
      "Utility-first styling for quickly designing responsive, consistent and easy-to-adjust interfaces.",
    related: ["react", "rails", "nextjs"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    description:
      "Useful for quickly assembling responsive layouts and standard UI patterns.",
    related: ["react", "rails", "nextjs"],
  },
  {
    id: "hotwire",
    name: "Hotwire",
    category: "frontend",
    description:
      "Frontend framework for building reactive Rails interfaces with minimal JavaScript.",
    related: ["rails"],
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    category: "backend",
    description:
      "Productive backend framework for building structured web applications and shipping a solid MVP quickly.",
    related: ["postgresql", "sqlite", "hotwire", "bootstrap", "tailwind"],
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    description:
      "JavaScript runtime used for APIs, backend services and development tooling.",
    related: ["express", "nestjs", "javascript", "typescript"],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    description:
      "Minimal framework for building REST APIs and maintainable server-side logic.",
    related: ["node", "prisma"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "backend",
    description:
      "Structured Node.js framework for scalable backend architectures with TypeScript.",
    related: ["node", "prisma"],
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "database",
    description:
      "Lightweight relational database, useful for local development, prototypes and small projects.",
    related: ["prisma", "rails"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    description:
      "Reliable relational database suited to production applications and structured data.",
    related: ["prisma", "rails"],
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "database",
    description:
      "Type-safe ORM for modeling, querying and maintaining relational data.",
    related: ["postgresql", "sqlite", "nestjs", "express"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    description:
      "Version control, collaboration, project tracking and the base of the delivery workflow.",
    related: ["vercel", "vscode"],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    description:
      "Main environment for writing, debugging and navigating code efficiently.",
    related: ["codex", "ai-workflow", "github"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    description:
      "Deployment platform for shipping frontend work quickly and validating clean previews.",
    related: ["github", "nextjs"],
  },
  {
    id: "codex",
    name: "Codex",
    category: "ai",
    description:
      "AI-assisted development workflow for speeding up implementation, iteration and code review.",
    related: ["vscode", "ai-workflow"],
  },
  {
    id: "ai-workflow",
    name: "AI-assisted workflow",
    category: "ai",
    description:
      "Modern working method where AI helps scope, produce, review and improve code without replacing technical judgment.",
    related: ["codex", "vscode"],
  },
];

const categoryColors: Record<SkillCategory, Pick<StackCategoryCopy, "accent" | "soft">> = {
  frontend: {
    accent: "rgba(96,165,250,0.92)",
    soft: "rgba(96,165,250,0.12)",
  },
  backend: {
    accent: "rgba(52,211,153,0.9)",
    soft: "rgba(52,211,153,0.1)",
  },
  database: {
    accent: "rgba(251,191,36,0.92)",
    soft: "rgba(251,191,36,0.1)",
  },
  tools: {
    accent: "rgba(148,163,184,0.95)",
    soft: "rgba(148,163,184,0.1)",
  },
  ai: {
    accent: "rgba(167,139,250,0.92)",
    soft: "rgba(167,139,250,0.1)",
  },
};

export const translations = {
  fr: {
    header: {
      navigationLabel: "Navigation principale",
      contactLabel: "Contact",
      languageSwitchAriaLabel: "Passer le site en anglais",
      languageSwitchText: "EN",
    },
    mobileNav: {
      openLabel: "Ouvrir le menu de navigation",
      closeLabel: "Fermer le menu de navigation",
      navigationLabel: "Navigation mobile",
      contactLabel: "Prendre contact",
    },
    navigationLinks,
    hero: {
      eyebrow: "Portfolio",
      role: "Développeur Web Fullstack",
      projectsCta: "Voir les projets",
      contactCta: "Me contacter",
    },
    about: {
      eyebrow: "À propos",
      title: "Derrière l’écran",
      paragraphs: [
        "Je suis Théo, développeur full-stack passionné par le développement web et les nouvelles technologies.",
        "Après une reconversion récente, je construis des applications web modernes, maintenables et orientées produit, avec une attention portée à la clarté du code, à l’expérience utilisateur et à la simplicité des solutions.",
        "J’aime transformer une idée en produit concret, apprendre vite, itérer proprement et créer des projets utiles.",
      ],
    },
    timeline: {
      eyebrow: "Parcours",
      title: "Mon parcours de développeur",
      items: frTimelineItems,
    },
    projectsSection: {
      eyebrow: "Projets",
      title: "Quelques projets réalisés seul ou en équipe.",
      description:
        "Chacun m’a permis de travailler un aspect concret du développement web : interface, logique métier, architecture ou performance.",
      previousAriaLabel: "Projet précédent",
      nextAriaLabel: "Projet suivant",
    },
    projectCard: {
      projectLabel: "Projet",
      illustrationPending: "Illustration à venir",
      liveContext: "Voir le contexte",
      stackUsed: "Stack utilisée",
      intention: "Intention",
      defaultIntention:
        "Une fenêtre claire, lisible et extensible pour ajouter d’autres projets sans revoir la structure.",
      screenshots: {
        "sokwak.com": "Capture d’écran du projet Sokwak",
        questonaut: "Capture d’écran du projet Questonaut",
      },
    },
    projects,
    stack: {
      section: {
        eyebrow: "Stack",
        title: "Compétences & Stack",
        description:
          "Une vue connectée des technologies que j’utilise pour concevoir, construire et livrer des applications web modernes.",
      },
      categories: {
        frontend: { label: "Frontend", ...categoryColors.frontend },
        backend: { label: "Backend", ...categoryColors.backend },
        database: { label: "Base de données", ...categoryColors.database },
        tools: { label: "Outils & déploiement", ...categoryColors.tools },
        ai: { label: "Workflow IA", ...categoryColors.ai },
      },
      detailsLabel: "Détail actif",
      relatedTechnologiesLabel: "Technologies liées",
      showDetailAriaLabel: "Afficher le détail de",
      skills: frSkills,
    },
    contact: {
      title: "Une idée, une question, ou simplement envie d’échanger ?",
      description:
        "Je suis disponible pour tous vos projets, ainsi que vos opportunités et discussions autour du développement web.",
    },
    footer: {
      rights: "© 2026 Théo Villalba. Tous droits réservés.",
      trademarkNotice:
        "Les marques, logos et noms de produits tiers appartiennent à leurs propriétaires respectifs.",
      socialLinks,
    },
  },
  en: {
    header: {
      navigationLabel: "Main navigation",
      contactLabel: "Contact",
      languageSwitchAriaLabel: "Switch website to French",
      languageSwitchText: "FR",
    },
    mobileNav: {
      openLabel: "Open navigation menu",
      closeLabel: "Close navigation menu",
      navigationLabel: "Mobile navigation",
      contactLabel: "Get in touch",
    },
    navigationLinks: [
      { label: "Projects", href: "#projets" },
      { label: "Stack", href: "#stack" },
      { label: "About", href: "#profil" },
      { label: "My journey", href: "#parcours" },
    ],
    hero: {
      eyebrow: "Portfolio",
      role: "Full-Stack Web Developer",
      projectsCta: "View projects",
      contactCta: "Contact me",
    },
    about: {
      eyebrow: "About",
      title: "Behind the screen",
      paragraphs: [
        "I’m Théo, a full-stack developer passionate about web development and new technologies.",
        "After a recent career change, I build modern, maintainable and product-minded web applications, with attention to code clarity, user experience and simple solutions.",
        "I enjoy turning an idea into a concrete product, learning quickly, iterating cleanly and creating useful projects.",
      ],
    },
    timeline: {
      eyebrow: "Journey",
      title: "My developer journey",
      items: enTimelineItems,
    },
    projectsSection: {
      eyebrow: "Projects",
      title: "A few projects built solo or as part of a team.",
      description:
        "Each one helped me work on a concrete aspect of web development: interface, business logic, architecture or performance.",
      previousAriaLabel: "Previous project",
      nextAriaLabel: "Next project",
    },
    projectCard: {
      projectLabel: "Project",
      illustrationPending: "Illustration coming soon",
      liveContext: "View context",
      stackUsed: "Stack",
      intention: "Intention",
      defaultIntention:
        "A clear, readable and extensible window for adding other projects without reworking the structure.",
      screenshots: {
        "sokwak.com": "Screenshot of the Sokwak project",
        questonaut: "Screenshot of the Questonaut project",
      },
    },
    projects: [
      {
        ...projectBySlug["sokwak.com"],
        description:
          "An AI that doesn’t write the solution for you, but helps you learn how to find it.",
        metric: "An AI app designed to support learning first.",
        intention:
          "Create an AI app that acts like a mentor: it questions, reframes and guides the reasoning until things click.",
      },
      {
        ...projectBySlug.questonaut,
        description:
          "A gamified habit tracker that makes sticking to daily goals more engaging.",
        status: "In progress (MVP complete)",
        metric:
          "Gamified UI with a level system and reward badges to help users stick to their habits.",
        intention:
          "Offer a gamified UI, with a level system and reward badges, to help users keep up with their habits.",
      },
      {
        ...projectBySlug.portfolio,
        description: "The portfolio you are currently browsing.",
        status: "Deployed",
        metric: "A clean and clear interface.",
        intention: "Create a clean, clear interface with modern components.",
      },
    ],
    stack: {
      section: {
        eyebrow: "Stack",
        title: "Skills & Stack",
        description:
          "A connected view of the technologies I use to design, build and ship modern web applications.",
      },
      categories: {
        frontend: { label: "Frontend", ...categoryColors.frontend },
        backend: { label: "Backend", ...categoryColors.backend },
        database: { label: "Database", ...categoryColors.database },
        tools: { label: "Tools & deployment", ...categoryColors.tools },
        ai: { label: "AI workflow", ...categoryColors.ai },
      },
      detailsLabel: "Active detail",
      relatedTechnologiesLabel: "Related technologies",
      showDetailAriaLabel: "Show details for",
      skills: enSkills,
    },
    contact: {
      title: "Have an idea, a question, or just want to talk?",
      description:
        "I’m available for your projects, opportunities, and conversations around web development.",
    },
    footer: {
      rights: "© 2026 Théo Villalba. All rights reserved.",
      trademarkNotice:
        "Third-party trademarks, logos and product names belong to their respective owners.",
      socialLinks,
    },
  },
} satisfies Record<Language, PortfolioTranslations>;
