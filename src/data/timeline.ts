/** Chronological milestones; translations share dates, identities and technology choices. */
type Localized = { fr: string; en: string };

export type TimelineTechnology =
  | "html" | "css" | "ruby" | "github" | "vercel" | "vscode"
  | "rails" | "react" | "nextjs" | "javascript"
  | "typescript" | "node" | "express" | "openai";

export type TimelineMilestone = {
  id: string;
  period: string;
  title: string;
  description: string;
  hidePeriod?: boolean;
  technologies?: TimelineTechnology[];
  resources?: { label: string; href: string }[];
};

type MilestoneSource = Omit<TimelineMilestone, "period" | "title" | "description" | "resources"> & {
  period: Localized;
  title: Localized;
  description: Localized;
  resources?: { label: Localized; href: string }[];
};

const milestones: MilestoneSource[] = [
  {
    id: "career-shift",
    period: { fr: "Août 2025", en: "August 2025" },
    title: { fr: "Reconversion vers le dev web", en: "Career shift into web development" },
    description: { fr: "Le début de mon parcours dans le développement web.", en: "The beginning of my journey into web development." },
  },
  {
    // Combines the learning path and its HTML/CSS fundamentals.
    id: "freecodecamp-responsive-web-design",
    period: { fr: "Septembre 2025", en: "September 2025" },
    title: { fr: "Les fondations du web", en: "Web foundations" },
    description: { fr: "Parcours Responsive Web Design de FreeCodeCamp : HTML, CSS, mise en page et fondamentaux du web.", en: "FreeCodeCamp’s Responsive Web Design path: HTML, CSS, layout and web fundamentals." },
    technologies: ["html", "css"],
  },
  {
    // Retains THP, Ruby proficiency and the tooling milestone from the original timeline.
    id: "thp-start",
    period: { fr: "Janvier – Avril 2026", en: "January – April 2026" },
    title: { fr: "Début Formation THP", en: "Start of THP training" },
    description: { fr: "Début de formation en développement web. Maîtrise de Ruby, scripts et POO ; pratique de GitHub, Vercel et VS Code.", en: "Started intensive web development training. Ruby proficiency, scripts and OOP; practice with GitHub, Vercel and VS Code." },
    technologies: ["ruby", "github", "vercel", "vscode"],
  },
  {
    id: "rails-sql",
    hidePeriod: true,
    period: { fr: "Janvier – Avril 2026", en: "January – April 2026" },
    title: { fr: "Ruby on Rails / SQL", en: "Ruby on Rails / SQL" },
    description: { fr: "MVC, CRUD et bases de données. Développement avec Ruby on Rails et Hotwire.", en: "MVC, CRUD and databases. Development with Ruby on Rails and Hotwire." },
    technologies: ["rails"],
  },
  {
    id: "react-next",
    period: { fr: "Avril 2026", en: "April 2026" },
    title: { fr: "React / Next.js", en: "React / Next.js" },
    description: { fr: "Interfaces par composants, JavaScript et TypeScript.", en: "Component-based interfaces, JavaScript and TypeScript." },
    technologies: ["react", "nextjs", "javascript", "typescript"],
  },
  {
    id: "backend-certification",
    hidePeriod: true,
    period: { fr: "Avril 2026", en: "April 2026" },
    title: { fr: "Certification Backend", en: "Backend certification" },
    description: { fr: "Obtenue à mi-parcours de la formation The Hacking Project.", en: "Completed halfway through The Hacking Project training." },
  },
  {
    id: "ai-project",
    hidePeriod: true,
    period: { fr: "Avril – Mai 2026", en: "April – May 2026" },
    title: { fr: "Sokwak AI", en: "Sokwak AI" },
    description: { fr: "Prototype d’assistant pédagogique : intégration d’une API OpenAI moderne et backend JavaScript avec Node.js et Express.js.", en: "Learning assistant prototype: integration of a modern OpenAI API and a JavaScript backend with Node.js and Express.js." },
    technologies: ["node", "express", "react", "nextjs", "typescript", "openai"],
  },
  {
    id: "thp-internship",
    period: { fr: "Juillet – Août 2026", en: "July – August 2026" },
    title: { fr: "Stage THP — Développeur Full-Stack", en: "THP internship — Full-Stack Developer" },
    description: { fr: "Refonte complète d’un site web en peer programming, de la conception à l’implémentation, dans le cadre de The Hacking Project.", en: "Full website redesign carried out through pair programming, from design to implementation, as part of The Hacking Project." },
  },
  {
    id: "thp-completion-certification",
    period: { fr: "Septembre 2026", en: "September 2026" },
    title: { fr: "Certification — Fin du parcours THP", en: "Certification — Completion of the THP programme" },
    description: { fr: "Fin du parcours de formation The Hacking Project.", en: "Completion of The Hacking Project training programme." },
  },
];

export function getTimelineItems(language: "fr" | "en"): TimelineMilestone[] {
  return milestones.map((item) => ({
    id: item.id,
    period: item.period[language],
    title: item.title[language],
    description: item.description[language],
    hidePeriod: item.hidePeriod,
    technologies: item.technologies,
    resources: item.resources?.map((resource) => ({ label: resource.label[language], href: resource.href })),
  }));
}
