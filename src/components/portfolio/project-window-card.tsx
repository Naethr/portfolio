import Image from "next/image";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";

import type { Project } from "@/data/portfolio";
import type { PortfolioTranslations } from "@/data/translations";

type ProjectWindowCardProps = {
  project: Project;
  copy: PortfolioTranslations["projectCard"];
  isActive?: boolean;
};

const projectScreenshots: Partial<
  Record<string, { src: string; width: number; height: number }>
> = {
  "sokwak.com": {
    src: "/images/sokwak.png",
    width: 1004,
    height: 679,
  },
  questonaut: {
    src: "/images/questonaut.png",
    width: 1345,
    height: 940,
  },
};

function browserPath(slug: string) {
  return `theovillalba.dev/projects/${slug}`;
}

export function ProjectWindowCard({
  project,
  copy,
  isActive = true,
}: ProjectWindowCardProps) {
  const screenshot = projectScreenshots[project.slug];

  return (
    <article className="theme-frame project-window-card rounded-[1.55rem] border p-1.5 md:rounded-[1.9rem] md:p-2">
      <div
        className={`theme-panel project-window relative overflow-hidden rounded-[1.2rem] border md:rounded-[1.45rem]${isActive ? "" : " project-window-inactive"}`}
      >
        <div
          aria-hidden="true"
          className="theme-window-sheen project-window-sheen absolute inset-x-[20%] top-0 h-full opacity-75"
        />

        <div className="relative z-10 border-b border-[var(--border-soft)] px-3 py-2.5 md:px-5 md:py-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f7c] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffcc66] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#45d483] md:h-3 md:w-3" />
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 md:gap-2">
              <span className="theme-pill rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] md:px-3 md:py-1 md:text-[0.68rem] md:tracking-[0.24em]">
                {project.status}
              </span>
              <div className="theme-inset flex min-w-0 flex-1 items-center gap-1.5 rounded-full border px-2.5 py-1 md:gap-2 md:px-3 md:py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(67,137,255,0.8)] md:h-2 md:w-2" />
                <span className="theme-text-muted truncate font-mono text-[0.62rem] md:text-[0.68rem]">
                  {browserPath(project.slug)}
                </span>
              </div>
            </div>

            <span className="theme-text-subtle font-mono text-[0.68rem] md:text-xs">{project.year}</span>
          </div>
        </div>

        <div className="relative z-10 grid gap-4 p-3.5 md:gap-6 md:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-8">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="theme-accent-control rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] md:px-3 md:py-1 md:text-[0.66rem] md:tracking-[0.22em]">
                {copy.projectLabel}
              </span>
            </div>

            <div className="mt-4 space-y-2.5 md:mt-6 md:space-y-4">
              <h3 className="theme-text-primary max-w-[15ch] text-[clamp(1.55rem,9vw,2.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] md:text-[clamp(2rem,4vw,3rem)] md:leading-[0.94] md:tracking-[-0.07em]">
                {project.name}
              </h3>
              <p className="theme-text-secondary max-w-[62ch] text-[0.82rem] leading-6 md:text-base md:leading-8">
                {project.description}
              </p>
            </div>

            {screenshot ? (
              <div className="mx-auto mt-4 flex w-fit max-w-[14rem] justify-center overflow-hidden rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] md:mt-6 md:max-w-[18rem] md:rounded-[1.2rem]">
                <Image
                  src={screenshot.src}
                  alt={copy.screenshots[project.slug] ?? project.name}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(min-width: 768px) 288px, 224px"
                  className="block h-auto max-h-[130px] w-auto max-w-full object-contain md:max-h-[180px]"
                />
              </div>
            ) : project.slug !== "portfolio" ? (
              <div className="mt-4 flex min-h-20 items-center justify-center rounded-[1rem] border border-dashed border-[var(--border)] bg-[var(--surface-inset)] p-4 md:mt-6 md:min-h-28 md:rounded-[1.2rem] md:p-5">
                <p className="theme-text-subtle font-mono text-[0.6rem] uppercase tracking-[0.18em] md:text-[0.66rem] md:tracking-[0.22em]">
                  {copy.illustrationPending}
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-2 text-[0.82rem] font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-control)] hover:text-[var(--text-primary)] md:gap-2 md:px-4 md:py-2.5 md:text-sm"
              >
                GitHub
                <GitBranch size={16} weight="regular" />
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-accent-control inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.82rem] font-medium transition-colors duration-300 md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                >
                  {copy.liveContext}
                  <ArrowUpRight size={16} weight="regular" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="theme-panel-elevated self-start rounded-[1rem] border p-3 md:rounded-[1.25rem] md:p-5">
            <div className="flex items-start justify-between gap-2 md:gap-4">
              <div>
                <p className="theme-text-subtle font-mono text-[0.6rem] uppercase tracking-[0.18em] md:text-[0.68rem] md:tracking-[0.24em]">
                  {copy.stackUsed}
                </p>

              </div>
              <span className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-inset)] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--text-subtle)] md:px-3 md:py-1 md:text-[0.66rem] md:tracking-[0.22em]">
                {project.slug}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:grid md:gap-2.5">
              {project.technologies.map((technology, index) => (
                <div
                  key={technology}
                  className="flex items-center gap-1.5 rounded-[0.75rem] border border-[var(--border-soft)] bg-[var(--surface-inset)] px-2 py-1 md:justify-between md:gap-3 md:rounded-[1rem] md:px-4 md:py-3"
                >
                  <span className="theme-text-subtle font-mono text-[0.58rem] uppercase tracking-[0.14em] md:text-[0.7rem] md:tracking-[0.2em]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="theme-text-secondary text-[0.78rem] font-medium leading-tight md:text-sm">
                    {technology}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-[0.85rem] border border-[var(--border-soft)] bg-[var(--accent-softer)] px-3 py-3 md:mt-5 md:rounded-[1rem] md:px-4 md:py-4">
              <p className="theme-text-subtle font-mono text-[0.6rem] uppercase tracking-[0.18em] md:text-[0.66rem] md:tracking-[0.22em]">
                {copy.intention}
              </p>
              <p className="theme-text-secondary mt-1.5 text-[0.82rem] leading-5 md:mt-2 md:text-sm md:leading-6">
                {project.intention ?? copy.defaultIntention}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
