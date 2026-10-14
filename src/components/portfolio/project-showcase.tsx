"use client";

import Image from "next/image";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/portfolio";
import type { PortfolioTranslations } from "@/data/translations";

type ShowcaseCopy = PortfolioTranslations["projectShowcase"];

type Screenshot = {
  src: string;
  width: number;
  height: number;
};

type ProjectShowcaseProps = {
  project: Project;
  copy: ShowcaseCopy;
  number: number;
  screenshot: Screenshot;
  reverse?: boolean;
};

function caseNumber(number: number) {
  return number.toString().padStart(3, "0");
}

function revealProps(reducedMotion: boolean | null) {
  return {
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: reducedMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function ProjectShowcase({
  project,
  copy,
  number,
  screenshot,
  reverse = false,
}: ProjectShowcaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      {...revealProps(reducedMotion)}
      aria-labelledby={`project-${number}-title`}
      className={`project-case group relative grid min-w-0 items-center gap-8 overflow-hidden rounded-[1.25rem] border p-5 sm:gap-10 sm:p-8 lg:gap-12 lg:p-10 ${reverse ? "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]" : "lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"}`}
    >
      <div className={`relative z-10 min-w-0 ${reverse ? "lg:order-2" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          <span className="project-index">{copy.caseStudyLabel} / {caseNumber(number)}</span>
          <span className="project-meta">{project.year} · {project.status}</span>
        </div>

        <h3
          id={`project-${number}-title`}
          className="theme-text-primary mt-7 max-w-[16ch] text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.08] [overflow-wrap:anywhere]"
        >
          {project.name}
        </h3>
        <p className="theme-text-secondary mt-5 max-w-[54ch] text-base leading-relaxed sm:text-lg">
          {project.description}
        </p>

        <div className="mt-8">
          <p className="project-index text-[0.65rem] font-semibold uppercase tracking-[0.19em]">
            {copy.technologyLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={copy.technologyLabel}>
            {project.technologies.map((technology) => (
              <li key={technology} className="project-tech rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm">
                {technology}
              </li>
            ))}
          </ul>
        </div>

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.codeLinkLabel} : ${project.name}`}
            className="project-code-link mt-8 inline-flex min-h-11 items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors duration-200"
          >
            {copy.codeLinkLabel}
            <GitBranch aria-hidden="true" size={18} weight="regular" />
          </a>
        ) : null}
      </div>

      <a
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${copy.openScreenshotLabel} : ${project.name}`}
        className={`project-shot relative block min-w-0 overflow-hidden rounded-[0.95rem] border p-2 sm:p-3 ${reverse ? "lg:order-1" : ""}`}
      >
        <div className="project-shot-bar mb-2 flex items-center justify-between gap-3 border-b px-1 pb-2 sm:mb-3 sm:pb-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="project-window-dot h-1.5 w-1.5 rounded-full" />
            <span className="project-window-dot h-1.5 w-1.5 rounded-full" />
            <span className="project-window-dot h-1.5 w-1.5 rounded-full" />
          </span>
          <span className="project-meta min-w-0 truncate text-[0.62rem] font-semibold uppercase tracking-[0.13em]">
            {project.name}
          </span>
        </div>
        <div className="overflow-hidden rounded-[0.55rem]">
          <Image
            src={screenshot.src}
            alt={copy.screenshots[project.slug] ?? project.name}
            width={screenshot.width}
            height={screenshot.height}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 53vw, (min-width: 640px) 88vw, 92vw"
            className="project-shot-image block h-auto w-full"
          />
        </div>
        <span className="project-shot-caption mt-3 flex items-center justify-end gap-2 text-xs font-medium sm:text-sm">
          {copy.openScreenshotLabel}
          <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
        </span>
      </a>
    </motion.article>
  );
}

export function ProjectSummary({
  project,
  copy,
  number,
}: {
  project: Project;
  copy: ShowcaseCopy;
  number: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      {...revealProps(reducedMotion)}
      aria-labelledby={`project-${number}-title`}
      className="project-case project-case-compact relative grid min-w-0 gap-7 rounded-[1.25rem] border p-5 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12"
    >
      <div className="min-w-0">
        <p className="project-index text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          {copy.projectLabel} / {caseNumber(number)}
          <span className="project-meta ml-4">{project.year} · {project.status}</span>
        </p>
        <h3 id={`project-${number}-title`} className="theme-text-primary mt-5 text-[clamp(1.85rem,3vw,2.8rem)] font-normal leading-tight">
          {project.name}
        </h3>
        <p className="theme-text-secondary mt-3 max-w-[55ch] text-sm leading-relaxed sm:text-base">
          {project.description}
        </p>
      </div>
      <div className="flex min-w-0 flex-col items-start justify-between gap-6">
        <ul className="flex flex-wrap gap-2" aria-label={copy.technologyLabel}>
          {project.technologies.map((technology) => (
            <li key={technology} className="project-tech rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm">
              {technology}
            </li>
          ))}
        </ul>
        <p className="project-image-note w-full rounded-[0.7rem] border border-dashed px-4 py-3 text-sm">
          {copy.noScreenshotLabel}
        </p>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.codeLinkLabel} : ${project.name}`}
            className="project-code-link inline-flex min-h-11 items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors duration-200"
          >
            {copy.codeLinkLabel}
            <GitBranch aria-hidden="true" size={18} weight="regular" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
