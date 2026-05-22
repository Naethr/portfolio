'use client';

import {
  ArrowRight,
  ArrowUpRight,
  BracketsAngle,
  EnvelopeSimple,
  FadersHorizontal,
  GitBranch,
  Lightning,
} from "@phosphor-icons/react";

import {
  projects,
  rotatingTechnologies,
  skillGroups,
  socialLinks,
} from "@/data/portfolio";

import { GradientDots } from "../ui/gradient-dots";
import { SectionReveal } from "../ui/section-reveal";
import { HeroRotatingText } from "./hero-rotating-text";
import { SectionHeading } from "./section-heading";

const profilePillars = [
  {
    icon: BracketsAngle,
    title: "Développement utile",
    text: "Construire peu, mais juste. Chaque écran doit servir le produit et rester simple à maintenir.",
  },
  {
    icon: Lightning,
    title: "Expérience fluide",
    text: "Temps de chargement, interactions, transitions et hiérarchie visuelle sont traités comme des sujets de fond.",
  },
  {
    icon: FadersHorizontal,
    title: "Système durable",
    text: "Composants, structure de code et contenu sont pensés pour évoluer sans casser l'ensemble.",
  },
];

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

function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[8%] h-[28rem] w-[min(92vw,72rem)] -translate-x-1/2 rounded-[3rem] border border-white/8 bg-[rgba(7,11,22,0.52)] opacity-70 blur-3xl" />
        <div className="absolute inset-x-[-12%] top-[2%] h-[38rem] sm:inset-x-[-4%]">
          <GradientDots
            dotSize={10}
            spacing={12}
            duration={22}
            colorCycleDuration={10}
            className="opacity-28 [mask-image:radial-gradient(circle_at_center,black_0%,black_45%,transparent_82%)]"
          />
        </div>
      </div>

      <SectionReveal className={frame("w-full")}>
        <div
          className={panel(
            "relative overflow-hidden px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10",
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[40%] bg-[radial-gradient(circle_at_top_right,rgba(67,137,255,0.14),transparent_65%)] lg:block"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(67,137,255,0.85)]" />
                Portfolio
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-[clamp(3rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                  Théo VILLALBA
                </h1>
                <p className="max-w-2xl font-display text-[clamp(1.1rem,2.1vw,1.4rem)] font-medium leading-[1.08] tracking-[-0.04em] text-slate-300">
                  Développeur Web Fullstack
                </p>
              </div>

              <div className="space-y-4">
                <div className="rotating-shell max-w-max px-3 py-2 sm:px-4">
                  <HeroRotatingText texts={rotatingTechnologies} />
                </div>
                <p className="max-w-[54ch] text-sm leading-7 text-slate-300 sm:text-base">
                  Développeur fullstack passionné
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#projets"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.14)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_-28px_rgba(67,137,255,0.55)] transition-colors duration-300 hover:bg-[rgba(67,137,255,0.2)]"
                >
                  Voir les projets
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 transition-colors duration-300 group-hover:bg-white/10">
                    <ArrowRight size={16} weight="regular" />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-3.5 text-sm font-medium text-slate-100 transition-colors duration-300 hover:border-white/18 hover:bg-white/8"
                >
                  Me contacter
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {skillGroups.map((group) => (
                  <article
                    key={group.title}
                    className="rounded-[1.35rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                      {group.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-200">
                      {group.items[0]}
                    </p>
                    <p className="text-sm leading-6 text-slate-400">
                      {group.items[1]}
                    </p>
                  </article>
                ))}
              </div>

              <div className="grid gap-3 rounded-[1.5rem] border border-white/8 bg-black/18 p-5 sm:grid-cols-2">
                {projects.slice(0, 2).map((project) => (
                  <article
                    key={project.name}
                    className="rounded-[1.15rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                        {project.status}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-4 max-w-[16ch] text-base font-medium leading-6 tracking-[-0.04em] text-white">
                      {project.name}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function ProfileSection() {
  return (
    <section id="profil" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="Profil"
          title="Une approche sobre, technique et orientée résultat."
          description="Je conçois des interfaces qui respirent, des bases solides côté code et des parcours qui donnent immédiatement confiance."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className={frame()}>
            <div className={panel("flex h-full flex-col justify-between gap-8 p-6 sm:p-8")}>
              <div className="space-y-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                  Stack
                </p>
                <p className="max-w-[22ch] text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-white">
                  Un socle volontairement concentré.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {skillGroups.flatMap((group) => group.items.slice(0, 2)).map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.1rem] border border-white/8 bg-white/[0.035] px-4 py-3 font-mono text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {profilePillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className={frame()}>
                <div className={panel("flex h-full items-start gap-4 p-5 sm:p-6")}>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-black/26 text-[var(--accent)] shadow-[0_0_24px_-16px_rgba(67,137,255,0.82)]">
                    <Icon size={22} weight="regular" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.045em] text-white">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-[62ch] text-sm leading-7 text-slate-300">
                      {text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="Stack"
          title="Peu d'outils, mais bien choisis."
          description="L'objectif reste toujours le même : livrer vite, garder le contrôle et faire évoluer proprement."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className={frame()}>
              <div className={panel("h-full p-6 sm:p-7")}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                  {group.title}
                </p>
                <p className="mt-6 max-w-[28ch] text-lg leading-8 text-slate-200">
                  {group.description}
                </p>
                <ul className="mt-8 grid gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[1rem] border border-white/8 bg-black/22 px-4 py-3 font-mono text-sm text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

function ProjectPreview({
  technologies,
}: {
  technologies: string[];
}) {
  return (
    <div className="project-preview rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6f7c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffcc66]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#45d483]" />
      </div>
      <div className="mt-5 grid gap-2">
        {technologies.slice(0, 4).map((technology) => (
          <div
            key={technology}
            className="rounded-[0.95rem] border border-white/8 bg-black/24 px-4 py-3"
          >
            <p className="font-mono text-xs text-slate-300">{technology}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projets" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="Projets"
          title="Quelques réalisations où design et ingénierie avancent ensemble."
          description="Chaque projet cherche un équilibre net entre lisibilité, performances, structure technique et sensation premium."
        />

        <div className="grid gap-4">
          {projects.map((project, index) => (
            <article key={project.name} className={frame()}>
              <div
                className={panel(
                  `grid gap-8 p-6 sm:p-7 ${
                    index === 0
                      ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]"
                      : "lg:grid-cols-[minmax(0,0.95fr)_minmax(260px,1.05fr)]"
                  }`,
                )}
              >
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                      {project.status}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className="max-w-[15ch] text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-white">
                      {project.name}
                    </h3>
                    <p className="max-w-[60ch] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-black/24 px-3 py-2 font-mono text-xs text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.35rem] border border-white/8 bg-black/24 p-5">
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

                <div className="flex items-stretch">
                  <ProjectPreview technologies={project.technologies} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <SectionReveal className={frame()}>
        <div className={panel("p-8 sm:p-10 lg:p-12")}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                Contact
              </span>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                Besoin d&apos;une interface plus nette, plus crédible et mieux
                construite ?
              </h2>
              <p className="max-w-[58ch] text-base leading-8 text-slate-300">
                Disponible pour des missions fullstack, des refontes frontend
                et des produits où l&apos;exécution compte autant que
                l&apos;idée.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href="mailto:hello@theovillalba.dev"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(67,137,255,0.28)] bg-[rgba(67,137,255,0.14)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_-28px_rgba(67,137,255,0.55)] transition-colors duration-300 hover:bg-[rgba(67,137,255,0.2)]"
              >
                <EnvelopeSimple size={18} weight="regular" />
                hello@theovillalba.dev
              </a>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors duration-300 hover:border-white/18 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <main id="content" className="flex-1">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProfileSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}
