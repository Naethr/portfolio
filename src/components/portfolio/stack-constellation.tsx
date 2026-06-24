'use client';

import { useState } from "react";

import type { PortfolioTranslations } from "@/data/translations";

import { SectionReveal } from "../ui/section-reveal";
import { SectionHeading } from "./section-heading";

function frame(className?: string) {
  return [
    "theme-frame rounded-[2rem] border p-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function panel(className?: string) {
  return [
    "theme-panel rounded-[1.55rem] border",
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

type StackCopy = PortfolioTranslations["stack"];
type SkillById = Map<string, Skill>;

const skillCategoryOrder: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "tools",
  "ai",
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

function getRelatedSkills(skill: Skill, skillById: SkillById) {
  return skill.related
    .map((skillId) => skillById.get(skillId))
    .filter((relatedSkill): relatedSkill is Skill => Boolean(relatedSkill));
}

function SkillDetailsPanel({
  skill,
  skillById,
  copy,
}: {
  skill: Skill;
  skillById: SkillById;
  copy: Pick<
    StackCopy,
    "categories" | "detailsLabel" | "relatedTechnologiesLabel"
  >;
}) {
  const relatedSkills = getRelatedSkills(skill, skillById);
  const category = copy.categories[skill.category];

  return (
    <aside className={frame("h-full min-w-0")}>
      <div className={panel("flex h-full min-w-0 flex-col justify-between gap-7 p-5 sm:gap-8 sm:p-7")}>
        <div className="space-y-5">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="theme-text-subtle font-mono text-[0.68rem] uppercase tracking-[0.24em]">
                {copy.detailsLabel}
              </p>
              <h3 className="theme-text-primary mt-4 text-xl font-semibold tracking-[-0.055em] sm:text-2xl">
                {skill.name}
              </h3>
            </div>
            <span
              className="inline-block w-fit max-w-full break-words rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase leading-4 tracking-[0.2em]"
              style={{
                borderColor: category.accent,
                backgroundColor: category.soft,
                color: category.accent,
              }}
            >
              {category.label}
            </span>
          </div>

          <p className="theme-text-secondary text-sm leading-7 sm:text-base sm:leading-8">
            {skill.description}
          </p>
        </div>

        <div>
          <p className="theme-text-subtle font-mono text-[0.68rem] uppercase tracking-[0.24em]">
            {copy.relatedTechnologiesLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedSkills.map((relatedSkill) => (
              <span
                key={relatedSkill.id}
                className="inline-block max-w-full break-words rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm leading-5 text-[var(--text-secondary)]"
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
  category,
  showDetailAriaLabel,
  onSelect,
}: {
  skill: Skill;
  isActive: boolean;
  isRelated: boolean;
  category: StackCopy["categories"][SkillCategory];
  showDetailAriaLabel: string;
  onSelect: (skillId: string) => void;
}) {
  const position = skillPositions[skill.id];

  return (
    <button
      type="button"
      aria-label={`${showDetailAriaLabel} ${skill.name}`}
      aria-pressed={isActive}
      onClick={() => onSelect(skill.id)}
      onFocus={() => onSelect(skill.id)}
      onMouseEnter={() => onSelect(skill.id)}
      className={[
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-left font-mono text-[0.72rem] shadow-[0_18px_46px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)]",
        isActive
          ? "scale-105 border-[var(--border-strong)] bg-[var(--surface-control-hover)] text-[var(--text-primary)]"
          : isRelated
            ? "border-[var(--border-strong)] bg-[var(--surface-control)] text-[var(--text-primary)]"
            : "border-[var(--border)] bg-[var(--surface-inset)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-control)]",
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

const mobileSkillOrder: Record<SkillCategory, string[]> = {
  backend: ["rails", "node", "express", "nestjs"],
  frontend: [
    "react",
    "nextjs",
    "vite",
    "typescript",
    "javascript",
    "tailwind",
    "bootstrap",
    "hotwire",
  ],
  database: ["postgresql", "sqlite", "prisma"],
  tools: ["github", "vscode", "vercel"],
  ai: ["codex", "ai-workflow"],
};

const mobileCategoryOrder: SkillCategory[] = [
  "backend",
  "frontend",
  "database",
  "tools",
  "ai",
];

function getMobileCategorySkills(
  categoryId: SkillCategory,
  skills: Skill[],
  skillById: SkillById,
) {
  const orderedSkillIds = new Set(mobileSkillOrder[categoryId]);
  const orderedSkills = mobileSkillOrder[categoryId]
    .map((skillId) => skillById.get(skillId))
    .filter((skill): skill is Skill => Boolean(skill));

  const remainingSkills = skills.filter(
    (skill) => skill.category === categoryId && !orderedSkillIds.has(skill.id),
  );

  return [...orderedSkills, ...remainingSkills];
}

function splitMobileSkills(skills: Skill[]) {
  return skills.reduce(
    (columns, skill, index) => {
      columns[index % 2 === 0 ? "left" : "right"].push(skill);
      return columns;
    },
    { left: [] as Skill[], right: [] as Skill[] },
  );
}

function MobileSkillNode({
  skill,
  side,
  isActive,
  isRelated,
  category,
  showDetailAriaLabel,
  onSelect,
}: {
  skill: Skill;
  side: "left" | "right";
  isActive: boolean;
  isRelated: boolean;
  category: StackCopy["categories"][SkillCategory];
  showDetailAriaLabel: string;
  onSelect: (skillId: string) => void;
}) {
  const connectorTone =
    isActive || isRelated ? category.accent : "var(--timeline-muted-connector)";

  return (
    <li
      className={[
        "relative flex",
        side === "left" ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute top-1/2 h-px w-3 -translate-y-1/2",
          side === "left" ? "-right-4" : "-left-4",
        ].join(" ")}
        style={{ backgroundColor: connectorTone }}
      />
      <button
        type="button"
        aria-label={`${showDetailAriaLabel} ${skill.name}`}
        aria-pressed={isActive}
        onClick={() => onSelect(skill.id)}
        onFocus={() => onSelect(skill.id)}
        className={[
          "relative z-10 max-w-full rounded-full border px-3 py-2 text-left text-[0.8rem] leading-5 shadow-[0_16px_42px_-32px_rgba(0,0,0,0.95)] backdrop-blur-md transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(67,137,255,0.72)] active:scale-[0.98] sm:text-sm",
          isActive
            ? "bg-[var(--surface-control-hover)] text-[var(--text-primary)]"
            : isRelated
              ? "bg-[var(--surface-control)] text-[var(--text-primary)]"
              : "border-[var(--border)] bg-[var(--surface-inset)] text-[var(--text-secondary)]",
        ].join(" ")}
        style={{
          borderColor: isActive || isRelated ? category.accent : undefined,
          boxShadow: isActive
            ? `0 0 0 1px ${category.accent}, 0 18px 48px -30px ${category.accent}`
            : undefined,
        }}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full shadow-[0_0_16px_currentColor]"
            style={{ backgroundColor: category.accent, color: category.accent }}
          />
          <span className="min-w-0 break-words">{skill.name}</span>
        </span>
      </button>
    </li>
  );
}

function MobileSkillCluster({
  categoryId,
  activeSkillId,
  activeRelatedIds,
  skills,
  skillById,
  copy,
  onSelect,
}: {
  categoryId: SkillCategory;
  activeSkillId: string;
  activeRelatedIds: Set<string>;
  skills: Skill[];
  skillById: SkillById;
  copy: Pick<StackCopy, "categories" | "showDetailAriaLabel">;
  onSelect: (skillId: string) => void;
}) {
  const category = copy.categories[categoryId];
  const categorySkills = getMobileCategorySkills(categoryId, skills, skillById);
  const columns = splitMobileSkills(categorySkills);

  return (
    <section className="relative min-w-0 py-4 first:pt-0 last:pb-0 sm:py-5">
      <div className="relative z-10 mb-4 flex justify-center">
        <span
          className="max-w-full rounded-full border border-[var(--border)] bg-[var(--stack-label-background)] px-3 py-1.5 text-center font-mono text-[0.62rem] uppercase leading-4 tracking-[0.16em] shadow-[0_0_26px_-18px_currentColor]"
          style={{ color: category.accent }}
        >
          {category.label}
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] sm:gap-x-3">
        <ul className="min-w-0 space-y-2.5">
          {columns.left.map((skill) => (
            <MobileSkillNode
              key={skill.id}
              skill={skill}
              side="left"
              isActive={skill.id === activeSkillId}
              isRelated={activeRelatedIds.has(skill.id)}
              category={copy.categories[skill.category]}
              showDetailAriaLabel={copy.showDetailAriaLabel}
              onSelect={onSelect}
            />
          ))}
        </ul>

        <div className="relative flex justify-center">
          <span
            aria-hidden="true"
            className="mt-3 h-3 w-3 rounded-full border border-[var(--border-strong)] bg-[var(--stack-label-background)] shadow-[0_0_18px_currentColor]"
            style={{ color: category.accent }}
          />
        </div>

        <ul className="mt-8 min-w-0 space-y-2.5">
          {columns.right.map((skill) => (
            <MobileSkillNode
              key={skill.id}
              skill={skill}
              side="right"
              isActive={skill.id === activeSkillId}
              isRelated={activeRelatedIds.has(skill.id)}
              category={copy.categories[skill.category]}
              showDetailAriaLabel={copy.showDetailAriaLabel}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MobileSkillDetails({
  skill,
  skillById,
  copy,
}: {
  skill: Skill;
  skillById: SkillById;
  copy: Pick<
    StackCopy,
    "categories" | "detailsLabel" | "relatedTechnologiesLabel"
  >;
}) {
  const relatedSkills = getRelatedSkills(skill, skillById);
  const category = copy.categories[skill.category];

  return (
    <aside
      aria-live="polite"
      className="relative z-10 mt-6 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-inset-strong)] p-4 backdrop-blur-md"
    >
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="theme-text-subtle font-mono text-[0.62rem] uppercase tracking-[0.2em]">
            {copy.detailsLabel}
          </p>
          <h3 className="theme-text-primary mt-2 break-words text-lg font-semibold tracking-[-0.045em]">
            {skill.name}
          </h3>
        </div>
        <span
          className="w-fit max-w-full break-words rounded-full border px-2.5 py-1 font-mono text-[0.58rem] uppercase leading-4 tracking-[0.16em]"
          style={{
            borderColor: category.accent,
            backgroundColor: category.soft,
            color: category.accent,
          }}
        >
          {category.label}
        </span>
      </div>

      <p className="theme-text-secondary mt-3 text-sm leading-6">{skill.description}</p>

      <div className="mt-4">
        <p className="theme-text-subtle font-mono text-[0.62rem] uppercase tracking-[0.2em]">
          {copy.relatedTechnologiesLabel}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {relatedSkills.map((relatedSkill) => (
            <span
              key={relatedSkill.id}
              className="max-w-full break-words rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-xs leading-5 text-[var(--text-secondary)]"
            >
              {relatedSkill.name}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

function MobileSkillStack({
  activeSkillId,
  activeSkill,
  skills,
  skillById,
  copy,
  onSelect,
}: {
  activeSkillId: string;
  activeSkill: Skill;
  skills: Skill[];
  skillById: SkillById;
  copy: StackCopy;
  onSelect: (skillId: string) => void;
}) {
  const activeRelatedIds = new Set(activeSkill.related);

  return (
    <div className="min-w-0 lg:hidden">
      <div className={frame("min-w-0 overflow-hidden")}>
        <div className={panel("relative min-w-0 overflow-hidden px-3 py-5 sm:px-5 sm:py-6")}>
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] top-6 h-40 rounded-full bg-[radial-gradient(circle,rgba(67,137,255,0.12),transparent_68%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[8%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-8 bottom-36 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(148,190,255,0.34),rgba(255,255,255,0.12),transparent)]"
          />

          <div className="relative z-10 min-w-0">
            {mobileCategoryOrder.map((categoryId) => (
              <MobileSkillCluster
                key={categoryId}
                categoryId={categoryId}
                activeSkillId={activeSkillId}
                activeRelatedIds={activeRelatedIds}
                skills={skills}
                skillById={skillById}
                copy={copy}
                onSelect={onSelect}
              />
            ))}
          </div>

          <MobileSkillDetails
            skill={activeSkill}
            skillById={skillById}
            copy={copy}
          />
        </div>
      </div>
    </div>
  );
}

export function StackConstellation({ copy }: { copy: StackCopy }) {
  const [desktopActiveSkillId, setDesktopActiveSkillId] = useState("react");
  const [mobileActiveSkillId, setMobileActiveSkillId] = useState("rails");
  const skills = copy.skills;
  const skillById = new Map(skills.map((skill) => [skill.id, skill]));
  const constellationEdges = skills.flatMap((skill) =>
    skill.related
      .filter((relatedId) => skillPositions[relatedId])
      .filter((relatedId) => skill.id < relatedId)
      .map((relatedId) => ({ from: skill.id, to: relatedId })),
  );
  const activeSkill = skillById.get(desktopActiveSkillId) ?? skills[0];
  const mobileActiveSkill =
    skillById.get(mobileActiveSkillId) ??
    skillById.get("rails") ??
    skills[0];
  const activeRelatedIds = new Set(activeSkill.related);

  return (
    <section id="stack" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow={copy.section.eyebrow}
          title={copy.section.title}
          description={copy.section.description}
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
                className="absolute inset-6 rounded-[1.3rem] border border-[var(--border-soft)] bg-[linear-gradient(135deg,var(--surface-muted),transparent_34%),radial-gradient(circle_at_72%_38%,rgba(52,211,153,0.08),transparent_28%),radial-gradient(circle_at_32%_82%,rgba(167,139,250,0.1),transparent_26%)]"
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
                          ? "var(--stack-edge-active)"
                          : "var(--stack-edge)"
                      }
                      strokeWidth={isActiveEdge ? 0.42 : 0.2}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              {skills.map((skill) => (
                <SkillNode
                  key={skill.id}
                  skill={skill}
                  isActive={skill.id === activeSkill.id}
                  isRelated={activeRelatedIds.has(skill.id)}
                  category={copy.categories[skill.category]}
                  showDetailAriaLabel={copy.showDetailAriaLabel}
                  onSelect={setDesktopActiveSkillId}
                />
              ))}

              <div className="absolute bottom-8 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 sm:px-4">
                {skillCategoryOrder.map((categoryId) => {
                  const category = copy.categories[categoryId];

                  return (
                    <span
                      key={categoryId}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-inset)] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]"
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

          <SkillDetailsPanel
            skill={activeSkill}
            skillById={skillById}
            copy={copy}
          />
        </div>

        <MobileSkillStack
          activeSkillId={mobileActiveSkill.id}
          activeSkill={mobileActiveSkill}
          skills={skills}
          skillById={skillById}
          copy={copy}
          onSelect={setMobileActiveSkillId}
        />
      </SectionReveal>
    </section>
  );
}
