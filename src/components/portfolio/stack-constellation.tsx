'use client';

import { useState } from "react";

import { SectionReveal } from "../ui/section-reveal";
import { SectionHeading } from "./section-heading";

function frame(className?: string) {
  return [
    "rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-2 shadow-[0_28px_90px_-56px_rgba(0,0,0,0.96)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function panel(className?: string) {
  return [
    "rounded-[1.55rem] border border-white/7 bg-[linear-gradient(180deg,rgba(7,10,18,0.96),rgba(5,7,14,0.98))]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type SkillCategory = "frontend" | "backend" | "database" | "tools" | "ai";

type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  related: string[];
};

const skillCategories: Record<
  SkillCategory,
  { label: string; accent: string; soft: string }
> = {
  frontend: {
    label: "Frontend",
    accent: "rgba(96,165,250,0.92)",
    soft: "rgba(96,165,250,0.12)",
  },
  backend: {
    label: "Backend",
    accent: "rgba(52,211,153,0.9)",
    soft: "rgba(52,211,153,0.1)",
  },
  database: {
    label: "Base de données",
    accent: "rgba(251,191,36,0.92)",
    soft: "rgba(251,191,36,0.1)",
  },
  tools: {
    label: "Outils & déploiement",
    accent: "rgba(148,163,184,0.95)",
    soft: "rgba(148,163,184,0.1)",
  },
  ai: {
    label: "Workflow IA",
    accent: "rgba(167,139,250,0.92)",
    soft: "rgba(167,139,250,0.1)",
  },
};

const skillCategoryOrder: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "tools",
  "ai",
];

const constellationSkills: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    description:
      "Utilisé pour construire des interfaces interactives, pilotées par composants et avec des frontières UI claires.",
    related: [
      "typescript",
      "javascript",
      "vite",
      "tailwind",
      "bootstrap",
      "nextjs",
    ],
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
      "Langage central des interfaces web dynamiques, de la logique applicative et de l'écosystème Node.js.",
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
      "Runtime JavaScript utilisé pour les APIs, les services backend et l'outillage de développement.",
    related: ["express", "nestjs", "javascript", "typescript"],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    description:
      "Framework minimal pour construire des APIs REST et de la logique serveur simple à maintenir.",
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
      "Workflow de développement assisté par IA pour accélérer l'implémentation, l'itération et la revue de code.",
    related: ["vscode", "ai-workflow"],
  },
  {
    id: "ai-workflow",
    name: "Workflow assisté par IA",
    category: "ai",
    description:
      "Méthode de travail moderne où l'IA aide à cadrer, produire, relire et améliorer le code sans remplacer le jugement technique.",
    related: ["codex", "vscode"],
  },
];

const skillPositions: Record<string, { x: number; y: number }> = {
  react: { x: 31, y: 28 },
  nextjs: { x: 23, y: 55 },
  vite: { x: 18, y: 18 },
  typescript: { x: 43, y: 20 },
  javascript: { x: 30, y: 45 },
  tailwind: { x: 15, y: 38 },
  bootstrap: { x: 47, y: 42 },
  hotwire: { x: 53, y: 34 },
  rails: { x: 68, y: 28 },
  node: { x: 72, y: 44 },
  express: { x: 84, y: 57 },
  nestjs: { x: 61, y: 57 },
  sqlite: { x: 54, y: 79 },
  postgresql: { x: 74, y: 78 },
  prisma: { x: 64, y: 68 },
  github: { x: 30, y: 72 },
  vscode: { x: 15, y: 65 },
  vercel: { x: 43, y: 62 },
  codex: { x: 39, y: 84 },
  "ai-workflow": { x: 19, y: 86 },
};

const skillById = new Map(constellationSkills.map((skill) => [skill.id, skill]));

const constellationEdges = constellationSkills.flatMap((skill) =>
  skill.related
    .filter((relatedId) => skillPositions[relatedId])
    .filter((relatedId) => skill.id < relatedId)
    .map((relatedId) => ({ from: skill.id, to: relatedId })),
);

function getRelatedSkills(skill: Skill) {
  return skill.related
    .map((skillId) => skillById.get(skillId))
    .filter((relatedSkill): relatedSkill is Skill => Boolean(relatedSkill));
}

function SkillDetailsPanel({ skill }: { skill: Skill }) {
  const relatedSkills = getRelatedSkills(skill);
  const category = skillCategories[skill.category];

  return (
    <aside className={frame("h-full")}>
      <div className={panel("flex h-full flex-col justify-between gap-8 p-6 sm:p-7")}>
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                Détail actif
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.055em] text-white">
                {skill.name}
              </h3>
            </div>
            <span
              className="rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em]"
              style={{
                borderColor: category.accent,
                backgroundColor: category.soft,
                color: category.accent,
              }}
            >
              {category.label}
            </span>
          </div>

          <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {skill.description}
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
            Technologies liées
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedSkills.map((relatedSkill) => (
              <span
                key={relatedSkill.id}
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-200"
              >
                {relatedSkill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SkillNode({
  skill,
  isActive,
  isRelated,
  onSelect,
}: {
  skill: Skill;
  isActive: boolean;
  isRelated: boolean;
  onSelect: (skillId: string) => void;
}) {
  const position = skillPositions[skill.id];
  const category = skillCategories[skill.category];

  return (
    <button
      type="button"
      aria-label={`Afficher le détail de ${skill.name}`}
      aria-pressed={isActive}
      onClick={() => onSelect(skill.id)}
      onFocus={() => onSelect(skill.id)}
      onMouseEnter={() => onSelect(skill.id)}
      className={[
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-left font-mono text-[0.72rem] text-slate-200 shadow-[0_18px_46px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]",
        isActive
          ? "scale-105 border-white/30 bg-white/[0.12] text-white"
          : isRelated
            ? "border-white/20 bg-white/[0.075] text-slate-100"
            : "border-white/10 bg-black/24 text-slate-400 hover:border-white/18 hover:bg-white/[0.055]",
      ].join(" ")}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_currentColor]"
        style={{ backgroundColor: category.accent, color: category.accent }}
      />
      <span className="whitespace-nowrap">{skill.name}</span>
    </button>
  );
}

function MobileSkillGrid({
  activeSkillId,
  onSelect,
}: {
  activeSkillId: string;
  onSelect: (skillId: string) => void;
}) {
  return (
    <div className="grid gap-4 lg:hidden">
      {skillCategoryOrder.map((categoryId) => {
        const category = skillCategories[categoryId];
        const categorySkills = constellationSkills.filter(
          (skill) => skill.category === categoryId,
        );

        return (
          <article key={categoryId} className={frame()}>
            <div className={panel("p-5")}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_currentColor]"
                  style={{ backgroundColor: category.accent, color: category.accent }}
                />
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                  {category.label}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {categorySkills.map((skill) => {
                  const isActive = skill.id === activeSkillId;

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      aria-label={`Afficher le détail de ${skill.name}`}
                      aria-pressed={isActive}
                      onClick={() => onSelect(skill.id)}
                      className={[
                        "rounded-full border px-3 py-2 text-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]",
                        isActive
                          ? "border-white/30 bg-white/[0.12] text-white"
                          : "border-white/10 bg-white/[0.035] text-slate-300",
                      ].join(" ")}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function StackConstellation() {
  const [activeSkillId, setActiveSkillId] = useState("react");
  const activeSkill = skillById.get(activeSkillId) ?? constellationSkills[0];
  const activeRelatedIds = new Set(activeSkill.related);

  return (
    <section id="stack" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="Stack"
          title="Compétences & Stack"
          description="Une vue connectée des technologies que j'utilise pour concevoir, construire et livrer des applications web modernes."
        />

        <div className="hidden gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.38fr)] lg:items-stretch">
          <div className={frame()}>
            <div className={panel("relative min-h-[42rem] overflow-hidden p-6")}>
              <div
                aria-hidden="true"
                className="absolute inset-x-[16%] top-[10%] h-48 rounded-full bg-[radial-gradient(circle,rgba(67,137,255,0.16),transparent_68%)] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-[1.3rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_34%),radial-gradient(circle_at_72%_38%,rgba(52,211,153,0.08),transparent_28%),radial-gradient(circle_at_32%_82%,rgba(167,139,250,0.1),transparent_26%)]"
              />

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {constellationEdges.map((edge) => {
                  const from = skillPositions[edge.from];
                  const to = skillPositions[edge.to];
                  const isActiveEdge =
                    edge.from === activeSkill.id || edge.to === activeSkill.id;
                  const isRelatedEdge =
                    activeRelatedIds.has(edge.from) && activeRelatedIds.has(edge.to);

                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className="transition duration-300"
                      stroke={
                        isActiveEdge || isRelatedEdge
                          ? "rgba(148,190,255,0.72)"
                          : "rgba(255,255,255,0.11)"
                      }
                      strokeWidth={isActiveEdge ? 0.42 : 0.2}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              {constellationSkills.map((skill) => (
                <SkillNode
                  key={skill.id}
                  skill={skill}
                  isActive={skill.id === activeSkill.id}
                  isRelated={activeRelatedIds.has(skill.id)}
                  onSelect={setActiveSkillId}
                />
              ))}

              <div className="absolute bottom-8 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 sm:px-4">
                {skillCategoryOrder.map((categoryId) => {
                  const category = skillCategories[categoryId];

                  return (
                    <span
                      key={categoryId}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/22 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      {category.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <SkillDetailsPanel skill={activeSkill} />
        </div>

        <div className="space-y-4 lg:hidden">
          <MobileSkillGrid
            activeSkillId={activeSkill.id}
            onSelect={setActiveSkillId}
          />
          <SkillDetailsPanel skill={activeSkill} />
        </div>
      </SectionReveal>
    </section>
  );
}
