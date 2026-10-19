import { getTimelineItems, type TimelineMilestone } from "./timeline";

import {
  navigationLinks,
  projects,
  socialLinks,
  type Project,
  type ProjectLink,
} from "./portfolio";

export type Language = "fr" | "en";

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
    themeSwitchToLightAriaLabel: string;
    themeSwitchToDarkAriaLabel: string;
  };
  mobileNav: {
    openLabel: string;
    closeLabel: string;
    navigationLabel: string;
    contactLabel: string;
  };
  navigationLinks: ProjectLink[];
  hero: {
    headline: string;
    role: string;
    introduction: string;
    projectsCta: string;
    contactCta: string;
    waypointsLabel: string;
    waypoints: {
      projects: string;
      skills: string;
      journey: string;
    };
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  timeline: {
    title: string;
    description: string;
    previousLabel: string;
    nextLabel: string;
    pauseLabel: string;
    playLabel: string;
    reducedMotionLabel: string;
    navigationLabel: string;
    interactionHint: string;
    items: TimelineMilestone[];
  };
  projectsSection: {
    title: string;
    description: string;
  };
  projectShowcase: {
    technologyLabel: string;
    codeLinkLabel: string;
    liveLinkLabel: string;
    openScreenshotLabel: string;
    screenshotDialogLabel: string;
    closeScreenshotLabel: string;
    comingSoonLabel: string;
  };
  projects: Project[];
  stack: {
    section: {
      title: string;
      description: string;
    };
    categories: Record<SkillCategory, StackCategoryCopy>;
    relatedTechnologiesLabel: string;
    selectTechnologyAriaLabel: string;
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

const frTimelineItems = getTimelineItems("fr");
const enTimelineItems = getTimelineItems("en");

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
    related: ["react", "nextjs"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    description:
      "Pratique pour assembler vite des layouts responsive et des patterns UI standards.",
    related: ["react", "nextjs"],
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
    related: ["postgresql", "sqlite", "hotwire"],
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
    related: ["codex", "claude", "github"],
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
    related: ["vscode"],
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    description:
      "Assistant IA d’Anthropic pour l’analyse et l’aide au développement.",
    related: ["vscode"],
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
    related: ["react", "nextjs"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    description:
      "Useful for quickly assembling responsive layouts and standard UI patterns.",
    related: ["react", "nextjs"],
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
    related: ["postgresql", "sqlite", "hotwire"],
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
    related: ["codex", "claude", "github"],
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
    related: ["vscode"],
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    description:
      "Anthropic’s AI assistant for analysis and development support.",
    related: ["vscode"],
  },
];

const categoryColors: Record<SkillCategory, Pick<StackCategoryCopy, "accent" | "soft">> = {
  frontend: {
    accent: "var(--skill-frontend)",
    soft: "var(--skill-frontend-soft)",
  },
  backend: {
    accent: "var(--skill-backend)",
    soft: "var(--skill-backend-soft)",
  },
  database: {
    accent: "var(--skill-database)",
    soft: "var(--skill-database-soft)",
  },
  tools: {
    accent: "var(--skill-tools)",
    soft: "var(--skill-tools-soft)",
  },
  ai: {
    accent: "var(--skill-ai)",
    soft: "var(--skill-ai-soft)",
  },
};

export const translations = {
  fr: {
    header: {
      navigationLabel: "Navigation principale",
      contactLabel: "Contact",
      languageSwitchAriaLabel: "Passer le site en anglais",
      languageSwitchText: "EN",
      themeSwitchToLightAriaLabel: "Passer au thème clair",
      themeSwitchToDarkAriaLabel: "Passer au thème sombre",
    },
    mobileNav: {
      openLabel: "Ouvrir le menu de navigation",
      closeLabel: "Fermer le menu de navigation",
      navigationLabel: "Navigation mobile",
      contactLabel: "Prendre contact",
    },
    navigationLinks,
    hero: {
      headline: "Théo Villalba",
      role: "Développeur Fullstack",
      introduction:
        "Je conçois des applications web claires et durables, de l’interface à la logique métier.",
      projectsCta: "Voir les projets",
      contactCta: "Me contacter",
      waypointsLabel: "Accès aux sections",
      waypoints: {
        projects: "Projets sélectionnés",
        skills: "Compétences",
        journey: "Parcours",
      },
    },
    about: {
      title: "Derrière l’écran",
      paragraphs: [
        "Je suis Théo, développeur full-stack passionné par le développement web et les nouvelles technologies.",
        "Après une reconversion récente, je construis des applications web modernes, maintenables et orientées produit, avec une attention portée à la clarté du code, à l’expérience utilisateur et à la simplicité des solutions.",
        "J’aime transformer une idée en produit concret, apprendre vite, itérer proprement et créer des projets utiles.",
      ],
    },
    timeline: {
      title: "Mon parcours",
      description: "Un chemin d’apprentissage, de projets et de pratique.",
      previousLabel: "Étape précédente",
      nextLabel: "Étape suivante",
      pauseLabel: "Suspendre le défilement",
      playLabel: "Reprendre le défilement",
      reducedMotionLabel: "Défilement automatique désactivé : mouvement réduit",
      navigationLabel: "Frise chronologique : utilisez les flèches gauche et droite",
      interactionHint: "Glissez ou utilisez les flèches. Pause au survol et au focus.",
      items: frTimelineItems,
    },
    projectsSection: {
      title: "Mes projets",
      description:
        "Des applications et des sites conçus avec attention, de l’interface à la logique métier.",
    },
    projectShowcase: {
      technologyLabel: "Technologies",
      codeLinkLabel: "Voir sur GitHub",
      liveLinkLabel: "Voir le site",
      openScreenshotLabel: "Ouvrir la capture",
      screenshotDialogLabel: "Capture agrandie",
      closeScreenshotLabel: "Fermer la capture",
      comingSoonLabel: "Lien à venir",
    },
    projects,
    stack: {
      section: {
        title: "Mes compétences",
        description:
          "Une vue connectée des technologies que j’utilise pour concevoir, construire et livrer des applications web modernes.",
      },
      categories: {
        frontend: { label: "Frontend", ...categoryColors.frontend },
        backend: { label: "Backend", ...categoryColors.backend },
        database: { label: "Base de données", ...categoryColors.database },
        tools: { label: "Outils & déploiement", ...categoryColors.tools },
        ai: { label: "Assistants IA", ...categoryColors.ai },
      },
      relatedTechnologiesLabel: "Technologies liées",
      selectTechnologyAriaLabel: "Sélectionner",
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
      themeSwitchToLightAriaLabel: "Switch to light theme",
      themeSwitchToDarkAriaLabel: "Switch to dark theme",
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
      headline: "Théo Villalba",
      role: "Full-Stack Developer",
      introduction:
        "I build clear, lasting web applications, from interface to business logic.",
      projectsCta: "View projects",
      contactCta: "Contact me",
      waypointsLabel: "Section shortcuts",
      waypoints: {
        projects: "Selected projects",
        skills: "Skills",
        journey: "Journey",
      },
    },
    about: {
      title: "Behind the screen",
      paragraphs: [
        "I’m Théo, a full-stack developer passionate about web development and new technologies.",
        "After a recent career change, I build modern, maintainable and product-minded web applications, with attention to code clarity, user experience and simple solutions.",
        "I enjoy turning an idea into a concrete product, learning quickly, iterating cleanly and creating useful projects.",
      ],
    },
    timeline: {
      title: "My journey",
      description: "A path of learning, projects and hands-on practice.",
      previousLabel: "Previous milestone",
      nextLabel: "Next milestone",
      pauseLabel: "Pause scrolling",
      playLabel: "Resume scrolling",
      reducedMotionLabel: "Automatic scrolling disabled: reduced motion",
      navigationLabel: "Timeline: use the left and right arrow keys",
      interactionHint: "Swipe or use the arrows. Pauses on hover and keyboard focus.",
      items: enTimelineItems,
    },
    projectsSection: {
      title: "My projects",
      description:
        "Applications and websites built with care, from interface to business logic.",
    },
    projectShowcase: {
      technologyLabel: "Technologies",
      codeLinkLabel: "View on GitHub",
      liveLinkLabel: "View website",
      openScreenshotLabel: "Open screenshot",
      screenshotDialogLabel: "Enlarged screenshot",
      closeScreenshotLabel: "Close screenshot",
      comingSoonLabel: "Coming soon",
    },
    projects,
    stack: {
      section: {
        title: "My Skills",
        description:
          "A connected view of the technologies I use to design, build and ship modern web applications.",
      },
      categories: {
        frontend: { label: "Frontend", ...categoryColors.frontend },
        backend: { label: "Backend", ...categoryColors.backend },
        database: { label: "Database", ...categoryColors.database },
        tools: { label: "Tools & deployment", ...categoryColors.tools },
        ai: { label: "AI assistants", ...categoryColors.ai },
      },
      relatedTechnologiesLabel: "Related technologies",
      selectTechnologyAriaLabel: "Select",
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
