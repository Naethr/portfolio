import Image from "next/image";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";

import type { Project } from "@/data/portfolio";

type ProjectWindowCardProps = {
  project: Project;
};

const projectScreenshots: Partial<
  Record<string, { src: string; alt: string; width: number; height: number }>
> = {
  "sokwak.com": {
    src: "/images/sokwak.png",
    alt: "Capture d’écran du projet Sokwak",
    width: 1004,
    height: 679,
  },
  questonaut: {
    src: "/images/questonaut.png",
    alt: "Capture d’écran du projet Questonaut",
    width: 1345,
    height: 940,
  },
};

function browserPath(slug: string) {
  return `theovillalba.dev/projects/${slug}`;
}

export function ProjectWindowCard({ project }: ProjectWindowCardProps) {
  const screenshot = projectScreenshots[project.slug];

  return (
    <article className="project-window-card rounded-[1.55rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-1.5 shadow-[0_28px_90px_-56px_rgba(0,0,0,0.96)] md:rounded-[1.9rem] md:p-2">
      <div className="project-window relative overflow-hidden rounded-[1.2rem] border border-white/7 bg-[linear-gradient(180deg,rgba(7,10,18,0.96),rgba(5,7,14,0.98))] md:rounded-[1.45rem]">
        <div
          aria-hidden="true"
          className="project-window-sheen absolute inset-x-[20%] top-0 h-full bg-[radial-gradient(circle_at_top,rgba(67,137,255,0.18),transparent_62%)] opacity-75"
        />

        <div className="relative z-10 border-b border-white/8 px-3 py-2.5 md:px-5 md:py-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f7c] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffcc66] md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#45d483] md:h-3 md:w-3" />
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 md:gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-400 md:px-3 md:py-1 md:text-[0.68rem] md:tracking-[0.24em]">
                {project.status}
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-white/10 bg-black/22 px-2.5 py-1 md:gap-2 md:px-3 md:py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(67,137,255,0.8)] md:h-2 md:w-2" />
                <span className="truncate font-mono text-[0.62rem] text-slate-400 md:text-[0.68rem]">
                  {browserPath(project.slug)}
                </span>
              </div>
            </div>

            <span className="font-mono text-[0.68rem] text-slate-500 md:text-xs">{project.year}</span>
          </div>
        </div>

        <div className="relative z-10 grid gap-4 p-3.5 md:gap-6 md:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-8">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[rgba(67,137,255,0.2)] bg-[rgba(67,137,255,0.1)] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-300 md:px-3 md:py-1 md:text-[0.66rem] md:tracking-[0.22em]">
                Projet
              </span>
            </div>

            <div className="mt-4 space-y-2.5 md:mt-6 md:space-y-4">
              <h3 className="max-w-[15ch] text-[clamp(1.55rem,9vw,2.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white md:text-[clamp(2rem,4vw,3rem)] md:leading-[0.94] md:tracking-[-0.07em]">
                {project.name}
              </h3>
              <p className="max-w-[62ch] text-[0.82rem] leading-6 text-slate-300 md:text-base md:leading-8">
                {project.description}
              </p>
            </div>

            {screenshot ? (
              <div className="mx-auto mt-4 flex w-fit max-w-[14rem] justify-center overflow-hidden rounded-[1rem] border border-white/8 bg-white/[0.025] md:mt-6 md:max-w-[18rem] md:rounded-[1.2rem]">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="block h-auto max-h-[130px] w-auto max-w-full object-contain md:max-h-[180px]"
                />
              </div>
            ) : project.slug !== "portfolio" ? (
              <div className="mt-4 flex min-h-20 items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-black/22 p-4 md:mt-6 md:min-h-28 md:rounded-[1.2rem] md:p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-500 md:text-[0.66rem] md:tracking-[0.22em]">
                  Illustration à venir
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-[0.82rem] font-medium text-slate-100 transition-colors duration-300 hover:border-white/18 hover:bg-white/6 md:gap-2 md:px-4 md:py-2.5 md:text-sm"
              >
                GitHub
                <GitBranch size={16} weight="regular" />
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.12)] px-3 py-2 text-[0.82rem] font-medium text-white transition-colors duration-300 hover:bg-[rgba(67,137,255,0.18)] md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                >
                  Voir le contexte
                  <ArrowUpRight size={16} weight="regular" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="self-start rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-3 md:rounded-[1.25rem] md:p-5">
            <div className="flex items-start justify-between gap-2 md:gap-4">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-500 md:text-[0.68rem] md:tracking-[0.24em]">
                  Stack utilisée
                </p>

              </div>
              <span className="rounded-full border border-white/8 bg-black/22 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate-500 md:px-3 md:py-1 md:text-[0.66rem] md:tracking-[0.22em]">
                {project.slug}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:grid md:gap-2.5">
              {project.technologies.map((technology, index) => (
                <div
                  key={technology}
                  className="flex items-center gap-1.5 rounded-[0.75rem] border border-white/8 bg-black/24 px-2 py-1 md:justify-between md:gap-3 md:rounded-[1rem] md:px-4 md:py-3"
                >
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-500 md:text-[0.7rem] md:tracking-[0.2em]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[0.78rem] font-medium leading-tight text-slate-200 md:text-sm">
                    {technology}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-[0.85rem] border border-white/8 bg-[rgba(67,137,255,0.08)] px-3 py-3 md:mt-5 md:rounded-[1rem] md:px-4 md:py-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-500 md:text-[0.66rem] md:tracking-[0.22em]">
                Intention
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-5 text-slate-200 md:mt-2 md:text-sm md:leading-6">
                {project.intention ??
                  "Une fenêtre claire, lisible et extensible pour ajouter d’autres projets sans revoir la structure."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
