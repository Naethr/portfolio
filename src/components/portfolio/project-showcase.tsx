"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/portfolio";
import type { Language, PortfolioTranslations } from "@/data/translations";

type ProjectCardProps = {
  project: Project;
  copy: PortfolioTranslations["projectShowcase"];
  language: Language;
};

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual-${project.placeholder ?? "portfolio"}`}>
      <div aria-hidden="true" className="project-visual-art">
        <div className="project-portfolio-mark"><span /><span /></div>
      </div>
      <span className="project-visual-name">{project.name}</span>
    </div>
  );
}

function ProjectScreenshot({ project, screenshot, copy, language, reducedMotion }: ProjectCardProps & { screenshot: NonNullable<Project["screenshot"]>; reducedMotion: boolean | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  function closeDialog() {
    const dialog = dialogRef.current;
    if (!dialog?.open || closeTimer.current !== null) return;
    if (reducedMotion) {
      dialog.close();
      return;
    }
    dialog.classList.add("project-lightbox-closing");
    closeTimer.current = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove("project-lightbox-closing");
      closeTimer.current = null;
    }, 160);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${copy.openScreenshotLabel} : ${project.name}`}
        className="project-media project-media-link relative block w-full cursor-pointer overflow-hidden border-0 p-0"
        onClick={() => {
          dialogRef.current?.showModal();
          dialogRef.current?.focus();
        }}
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt[language]}
          width={screenshot.width}
          height={screenshot.height}
          sizes="(min-width: 1100px) 400px, (min-width: 680px) 48vw, 100vw"
          className="project-media-image"
        />
      </button>
      <dialog
        ref={dialogRef}
        tabIndex={-1}
        aria-label={`${copy.screenshotDialogLabel} : ${project.name}`}
        className="project-lightbox"
        onCancel={(event) => { event.preventDefault(); closeDialog(); }}
        onClose={() => {
          if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
          closeTimer.current = null;
          dialogRef.current?.classList.remove("project-lightbox-closing");
          triggerRef.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            dialogRef.current?.focus();
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            closeDialog();
          }
        }}
        onClick={closeDialog}
      >
        <div className="project-lightbox-panel">
          <Image
            src={screenshot.src}
            alt={screenshot.alt[language]}
            width={screenshot.width}
            height={screenshot.height}
            sizes="(min-width: 1200px) 90vw, 100vw"
            className="project-lightbox-image"
            style={{ width: `min(calc(100vw - 2rem), calc((100dvh - 2rem) * ${screenshot.width / screenshot.height}), ${screenshot.width}px)` }}
          />
        </div>
      </dialog>
    </>
  );
}

export function ProjectCard({ project, copy, language }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const titleId = `project-${project.slug}-title`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={titleId}
      className="project-card group relative flex min-w-0 flex-col overflow-hidden border"
    >
      <span aria-hidden="true" className="project-card-corner" />
      {project.screenshot ? (
        <ProjectScreenshot project={project} screenshot={project.screenshot} copy={copy} language={language} reducedMotion={reducedMotion} />
      ) : (
        <div className="project-media relative overflow-hidden"><ProjectVisual project={project} /></div>
      )}
      <div className="project-card-body flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
        {(project.liveUrl || project.githubUrl || project.comingSoon) && (
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
            {project.comingSoon && (
              <button type="button" disabled className="project-action project-action-unavailable inline-flex min-h-11 items-center gap-2 rounded-[0.2rem] border px-3.5 py-2 text-xs font-semibold">
                {copy.comingSoonLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
