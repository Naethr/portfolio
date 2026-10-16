"use client";

import Image from "next/image";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/portfolio";
import type { Language, PortfolioTranslations } from "@/data/translations";

type ProjectCardProps = {
  project: Project;
  copy: PortfolioTranslations["projectShowcase"];
  language: Language;
  number: number;
};

function ProjectVisual({ project, label }: { project: Project; label: string }) {
  return (
    <div className={`project-visual project-visual-${project.placeholder ?? "portfolio"}`}>
      <div aria-hidden="true" className="project-visual-art">
        {project.placeholder === "code" ? (
          <div className="project-code-glyph"><span>{"{"}</span><i /><span>{"}"}</span></div>
        ) : project.placeholder === "editorial" ? (
          <div className="project-editorial-mark"><span /><span /><span /></div>
        ) : (
          <div className="project-portfolio-mark"><span /><span /></div>
        )}
      </div>
      <span className="project-visual-name">{project.name}</span>
      <span className="project-visual-note">{label}</span>
    </div>
  );
}

export function ProjectCard({ project, copy, language, number }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const titleId = `project-${project.slug}-title`;
  const media = project.screenshot ? (
    <Image
      src={project.screenshot.src}
      alt={project.screenshot.alt[language]}
      width={project.screenshot.width}
      height={project.screenshot.height}
      sizes="(min-width: 1100px) 380px, (min-width: 680px) 48vw, 100vw"
      className="project-media-image"
    />
  ) : (
    <ProjectVisual project={project} label={copy.visualPendingLabel} />
  );

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={titleId}
      className="project-card group relative flex min-w-0 flex-col overflow-hidden border"
    >
      <span aria-hidden="true" className="project-card-corner" />
      {project.screenshot ? (
        <a
          href={project.screenshot.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.openScreenshotLabel} : ${project.name}`}
          className="project-media project-media-link relative block overflow-hidden"
        >
          {media}
          <span aria-hidden="true" className="project-media-open"><ArrowUpRight size={17} /></span>
        </a>
      ) : (
        <div className="project-media relative overflow-hidden">{media}</div>
      )}
      <div className="project-card-body flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
        <p className="project-index text-[0.64rem] font-semibold uppercase tracking-[0.2em]">
          {copy.projectLabel} / {String(number).padStart(2, "0")}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 id={titleId} className="project-card-title text-[clamp(1.7rem,2.2vw,2.05rem)] leading-[1.12]">
            {project.name}
          </h3>
          <span className="project-category rounded-full border px-2.5 py-1 text-[0.66rem] font-medium leading-tight">
            {project.category[language]}
          </span>
        </div>
        <p className="project-description mt-4 text-sm leading-[1.65]">{project.description[language]}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={copy.technologyLabel}>
          {project.technologies.map((technology) => (
            <li key={technology} className="project-tech rounded-full border px-2.5 py-1 text-[0.68rem] font-medium leading-tight">
              {technology}
            </li>
          ))}
        </ul>
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.liveUrl && (
              <a className="project-action inline-flex min-h-11 items-center gap-2 rounded-[0.2rem] border px-3.5 py-2 text-xs font-semibold" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {copy.liveLinkLabel}<ArrowUpRight aria-hidden="true" size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a className="project-action inline-flex min-h-11 items-center gap-2 rounded-[0.2rem] border px-3.5 py-2 text-xs font-semibold" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                {copy.codeLinkLabel}<GitBranch aria-hidden="true" size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
