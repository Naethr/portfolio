import { ArrowUpRight, GitBranch } from "@phosphor-icons/react";

import type { Project } from "@/data/portfolio";

type ProjectWindowCardProps = {
  project: Project;
};

function browserPath(slug: string) {
  return `theovillalba.dev/projects/${slug}`;
}

export function ProjectWindowCard({ project }: ProjectWindowCardProps) {
  return (
    <article className="project-window-card rounded-[1.9rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-2 shadow-[0_28px_90px_-56px_rgba(0,0,0,0.96)]">
      <div className="project-window relative overflow-hidden rounded-[1.45rem] border border-white/7 bg-[linear-gradient(180deg,rgba(7,10,18,0.96),rgba(5,7,14,0.98))]">
        <div
          aria-hidden="true"
          className="project-window-sheen absolute inset-x-[20%] top-0 h-full bg-[radial-gradient(circle_at_top,rgba(67,137,255,0.18),transparent_62%)] opacity-75"
        />

        <div className="relative z-10 border-b border-white/8 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff6f7c]" />
              <span className="h-3 w-3 rounded-full bg-[#ffcc66]" />
              <span className="h-3 w-3 rounded-full bg-[#45d483]" />
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                {project.status}
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/22 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(67,137,255,0.8)]" />
                <span className="truncate font-mono text-[0.68rem] text-slate-400">
                  {browserPath(project.slug)}
                </span>
              </div>
            </div>

            <span className="font-mono text-xs text-slate-500">{project.year}</span>
          </div>
        </div>

        <div className="relative z-10 grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-8">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[rgba(67,137,255,0.2)] bg-[rgba(67,137,255,0.1)] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-slate-300">
                Projet
              </span>
              <span className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-slate-500">
                {project.technologies.length} briques
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="max-w-[15ch] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-white">
                {project.name}
              </h3>
              <p className="max-w-[62ch] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {project.description}
              </p>
            </div>

            <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-black/22 p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                point fort
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200 sm:text-base">
                {project.metric}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-300 hover:border-white/18 hover:bg-white/6"
              >
                GitHub
                <GitBranch size={16} weight="regular" />
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.12)] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[rgba(67,137,255,0.18)]"
                >
                  Voir le contexte
                  <ArrowUpRight size={16} weight="regular" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                  Stack utilisée
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Les briques clés affichées directement dans la fenêtre.
                </p>
              </div>
              <span className="rounded-full border border-white/8 bg-black/22 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-slate-500">
                {project.slug}
              </span>
            </div>

            <div className="mt-5 grid gap-2.5">
              {project.technologies.map((technology, index) => (
                <div
                  key={technology}
                  className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/8 bg-black/24 px-4 py-3"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    {technology}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1rem] border border-white/8 bg-[rgba(67,137,255,0.08)] px-4 py-4">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-slate-500">
                Intention
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Une fenêtre claire, lisible et extensible pour ajouter d&apos;autres projets sans revoir la structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
