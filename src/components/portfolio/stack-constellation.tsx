'use client';

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  siBootstrap,
  siClaude,
  siExpress,
  siGithub,
  siHotwire,
  siJavascript,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRubyonrails,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";

import type { PortfolioTranslations } from "@/data/translations";

import { SectionReveal } from "../ui/section-reveal";

type StackCopy = PortfolioTranslations["stack"];
type Skill = StackCopy["skills"][number];
type Category = Skill["category"];

type Position = { x: number; y: number };

// Percentages refer to the desktop atlas, which has a fixed height and a fluid width.
const positions: Record<string, Position> = {
  vite: { x: 13, y: 26 },
  typescript: { x: 30, y: 29 },
  react: { x: 36, y: 18 },
  tailwind: { x: 20, y: 44 },
  javascript: { x: 34, y: 39 },
  nextjs: { x: 48, y: 36 },
  bootstrap: { x: 11, y: 51 },
  hotwire: { x: 38, y: 53 },
  rails: { x: 65, y: 18 },
  node: { x: 84, y: 25 },
  express: { x: 84, y: 42 },
  nestjs: { x: 70, y: 36 },
  sqlite: { x: 64, y: 63 },
  prisma: { x: 84, y: 77 },
  postgresql: { x: 79, y: 63 },
  github: { x: 15, y: 70 },
  vscode: { x: 29, y: 71 },
  vercel: { x: 44, y: 69 },
  codex: { x: 22, y: 88 },
  claude: { x: 41, y: 86 },
};

const icons: Record<string, { path: string; hex: string }> = {
  react: siReact,
  nextjs: siNextdotjs,
  vite: siVite,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwind: siTailwindcss,
  bootstrap: siBootstrap,
  hotwire: siHotwire,
  rails: siRubyonrails,
  node: siNodedotjs,
  express: siExpress,
  nestjs: siNestjs,
  sqlite: siSqlite,
  postgresql: siPostgresql,
  prisma: siPrisma,
  github: siGithub,
  vercel: siVercel,
  claude: siClaude,
};

const contrastIcons = new Set(["nextjs", "express", "github", "vercel"]);
const adjustedIconColors: Record<string, string> = {
  rails: "var(--constellation-logo-rails)",
  node: "var(--constellation-logo-node)",
  typescript: "var(--constellation-logo-typescript)",
  postgresql: "var(--constellation-logo-postgresql)",
  sqlite: "var(--constellation-logo-sqlite)",
  prisma: "var(--constellation-logo-prisma)",
};

const categoryOrder: Category[] = ["frontend", "backend", "database", "tools", "ai"];
const categoryPositions: Record<Category, Position> = {
  frontend: { x: 7, y: 5 },
  backend: { x: 60, y: 5 },
  database: { x: 61, y: 55 },
  tools: { x: 8, y: 63 },
  ai: { x: 17, y: 79 },
};

function SkillLogo({ skill, className = "" }: { skill: Skill; className?: string }) {
  if (skill.id === "codex") {
    return (
      <span aria-hidden="true" className={`constellation-official-logo ${className}`}>
        <Image src="/images/stack/openai-blossom-light.svg" alt="" width={24} height={24} className="constellation-logo-on-dark" />
        <Image src="/images/stack/openai-blossom-dark.svg" alt="" width={24} height={24} className="constellation-logo-on-light" />
      </span>
    );
  }
  if (skill.id === "vscode") {
    return <Image src="/images/stack/vscode.svg" alt="" aria-hidden="true" width={24} height={24} className={className} />;
  }
  const icon = icons[skill.id];
  if (icon) {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`${className} ${contrastIcons.has(skill.id) ? "constellation-contrast-logo" : ""}`} style={contrastIcons.has(skill.id) ? undefined : { color: adjustedIconColors[skill.id] ?? `#${icon.hex}` }} fill="currentColor">
        <path d={icon.path} />
      </svg>
    );
  }
  return null;
}

function getEdges(skills: Skill[]) {
  const seen = new Set<string>();
  return skills.flatMap((skill) =>
    skill.related.flatMap((relatedId) => {
      if (!positions[skill.id] || !positions[relatedId]) return [];
      const key = [skill.id, relatedId].sort().join("|");
      if (seen.has(key)) return [];
      seen.add(key);
      return [{ from: skill.id, to: relatedId, key }];
    }),
  );
}

function Node({ skill, copy, activeId, relatedIds, relatedNames, onSelect, desktop = false }: {
  skill: Skill;
  copy: StackCopy;
  activeId: string;
  relatedIds: Set<string>;
  relatedNames: string[];
  onSelect: (id: string) => void;
  desktop?: boolean;
}) {
  const active = skill.id === activeId;
  const related = relatedIds.has(skill.id);
  const descriptionId = `constellation-${desktop ? "desktop" : "mobile"}-${skill.id}-related`;
  return (
    <button
      type="button"
      className={`constellation-node ${desktop ? "constellation-node-desktop" : ""} ${active ? "is-active" : related ? "is-related" : ""}`}
      style={{
        "--family-accent": copy.categories[skill.category].accent,
        "--family-soft": copy.categories[skill.category].soft,
        ...(desktop ? { left: `${positions[skill.id].x}%`, top: `${positions[skill.id].y}%` } : {}),
      } as CSSProperties}
      aria-label={`${copy.selectTechnologyAriaLabel} ${skill.name}`}
      aria-describedby={descriptionId}
      aria-pressed={active}
      data-skill-id={skill.id}
      onClick={() => onSelect(skill.id)}
      onFocus={() => onSelect(skill.id)}
      onMouseEnter={desktop ? () => onSelect(skill.id) : undefined}
    >
      <span className="constellation-node-icon"><SkillLogo skill={skill} className="h-5 w-5" /></span>
      <span className="constellation-node-name">{skill.name}</span>
      <span id={descriptionId} className="sr-only">{copy.relatedTechnologiesLabel}: {relatedNames.join(", ")}</span>
    </button>
  );
}

export function StackConstellation({ copy }: { copy: StackCopy }) {
  const [activeId, setActiveId] = useState("react");
  const [mobileCategory, setMobileCategory] = useState<Category>("frontend");
  const categoryRailRef = useRef<HTMLDivElement>(null);
  const optionRailRef = useRef<HTMLDivElement>(null);
  const skills = copy.skills;
  const skillById = new Map(skills.map((skill) => [skill.id, skill]));
  const activeSkill = skillById.get(activeId) ?? skills[0];
  const edges = getEdges(skills);
  const relatedNamesById = new Map(skills.map((skill) => [skill.id, edges.flatMap((edge) => {
    const neighborId = edge.from === skill.id ? edge.to : edge.to === skill.id ? edge.from : null;
    const neighbor = neighborId ? skillById.get(neighborId) : null;
    return neighbor ? [neighbor.name] : [];
  })]));
  const relatedIds = new Set(edges.flatMap((edge) => edge.from === activeSkill.id ? [edge.to] : edge.to === activeSkill.id ? [edge.from] : []));
  const inactiveEdges = edges.filter((edge) => edge.from !== activeSkill.id && edge.to !== activeSkill.id);
  const activeEdges = edges.filter((edge) => edge.from === activeSkill.id || edge.to === activeSkill.id);
  const selectSkill = (id: string) => {
    setActiveId(id);
    const selected = skillById.get(id);
    if (selected) setMobileCategory(selected.category);
  };
  const selectCategory = (category: Category) => {
    setMobileCategory(category);
    const firstSkill = skills.find((skill) => skill.category === category);
    if (firstSkill) setActiveId(firstSkill.id);
  };
  useEffect(() => {
    const revealInRail = (rail: HTMLDivElement | null, item: Element | null | undefined) => {
      if (!rail || !item) return;
      const railRect = rail.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      if (itemRect.left < railRect.left) rail.scrollLeft -= railRect.left - itemRect.left + 4;
      if (itemRect.right > railRect.right) rail.scrollLeft += itemRect.right - railRect.right + 4;
    };
    revealInRail(categoryRailRef.current, categoryRailRef.current?.querySelector(".is-active"));
    revealInRail(optionRailRef.current, optionRailRef.current?.querySelector(".is-active"));
  }, [activeId, mobileCategory]);

  return (
    <section id="stack" className="constellation-section relative isolate py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="constellation-backdrop pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
        <div className="constellation-chart" />
      </div>
      <SectionReveal>
        <div className="relative max-w-3xl">
          <p className="constellation-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">03 / {copy.section.eyebrow}</p>
          <h2 className="constellation-title mt-5 text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.08] [overflow-wrap:anywhere]">{copy.section.title}</h2>
          <p className="constellation-intro mt-5 max-w-[60ch] text-base leading-relaxed sm:text-lg">{copy.section.description}</p>
        </div>

        <div className="constellation-atlas mt-12 hidden min-[1100px]:block" aria-label={copy.section.title}>
          {categoryOrder.map((category) => (
            <span key={category} className={`constellation-group-label constellation-group-${category}`} style={{ left: `${categoryPositions[category].x}%`, top: `${categoryPositions[category].y}%` }}>
              <span className="constellation-group-mark" />{copy.categories[category].label}
            </span>
          ))}
          <svg aria-hidden="true" focusable="false" className="constellation-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
            {inactiveEdges.map((edge) => (
              <line key={edge.key} x1={positions[edge.from].x} y1={positions[edge.from].y} x2={positions[edge.to].x} y2={positions[edge.to].y} />
            ))}
            {activeEdges.map((edge) => (
              <line key={edge.key} x1={positions[edge.from].x} y1={positions[edge.from].y} x2={positions[edge.to].x} y2={positions[edge.to].y} className="is-active" />
            ))}
          </svg>
          {skills.map((skill) => (
            <Node key={skill.id} skill={skill} copy={copy} activeId={activeSkill.id} relatedIds={relatedIds} relatedNames={relatedNamesById.get(skill.id) ?? []} onSelect={selectSkill} desktop />
          ))}
        </div>

        <div className="constellation-mobile mt-10 min-[1100px]:hidden" aria-label={copy.section.title}>
          <div ref={categoryRailRef} className="constellation-mobile-categories" role="group" aria-label={copy.section.title}>
          {categoryOrder.map((category) => (
            <button key={category} type="button" className={`constellation-category-choice constellation-group-${category} ${mobileCategory === category ? "is-active" : ""}`} aria-pressed={mobileCategory === category} aria-controls="constellation-mobile-options" onClick={() => selectCategory(category)}>
              {copy.categories[category].label}
            </button>
          ))}
          </div>
          <div ref={optionRailRef} id="constellation-mobile-options" className="constellation-mobile-options" role="group" aria-label={copy.categories[mobileCategory].label}>
            {skills.filter((skill) => skill.category === mobileCategory).map((skill) => (
              <Node key={skill.id} skill={skill} copy={copy} activeId={activeSkill.id} relatedIds={relatedIds} relatedNames={relatedNamesById.get(skill.id) ?? []} onSelect={selectSkill} />
            ))}
          </div>
        </div>

      </SectionReveal>
    </section>
  );
}
