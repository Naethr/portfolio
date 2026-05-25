'use client';

import { useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
  ImageSquare,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

import {
  projects,
  rotatingTechnologies,
  skillGroups,
  socialLinks,
} from "@/data/portfolio";

import { GradientDots } from "../ui/gradient-dots";
import { SectionReveal } from "../ui/section-reveal";
import { HeroGooeyText } from "./hero-gooey-text";
import { ProjectWindowCard } from "./project-window-card";
import { SectionHeading } from "./section-heading";

const aboutPhoto = {
  src: null as string | null,
  alt: "Portrait de Théo Villalba",
};

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
      className="relative flex min-h-[calc(100dvh-5rem)] items-center py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[8%] h-[28rem] w-[min(92vw,72rem)] -translate-x-1/2 bg-[rgba(7,11,22,0.52)] opacity-70 blur-3xl" />
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

      <div className="w-full">
        <div className="relative px-2 py-12 sm:px-4 sm:py-14 lg:px-8 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-[18%] top-0 h-full bg-[radial-gradient(circle_at_center,rgba(67,137,255,0.13),transparent_68%)]"
          />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(67,137,255,0.85)]" />
                Portfolio
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl font-tech text-[clamp(3rem,6vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
                  Théo VILLALBA
                </h1>
                <p className="max-w-2xl font-display text-[clamp(1.1rem,2.1vw,1.4rem)] font-medium leading-[1.08] tracking-[-0.04em] text-slate-300">
                  Développeur Web Fullstack
                </p>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="rotating-shell max-w-full px-3 py-3 sm:px-4 sm:py-4">
                  <HeroGooeyText texts={rotatingTechnologies} />
                </div>
                <p className="max-w-[54ch] text-sm leading-7 text-slate-300 sm:text-base">
                  Développeur fullstack passionné
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  return (
    <section id="profil" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="À propos"
          title="Un développeur qui cherche la clarté avant l'effet."
          description="J'aime les produits lisibles, les décisions techniques défendables et les interfaces qui inspirent confiance dès le premier écran."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.96fr)_minmax(320px,0.82fr)] lg:items-stretch">
          <div className={frame()}>
            <div className={panel("flex h-full flex-col justify-between gap-8 p-6 sm:p-8")}>
              <div className="space-y-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                  Approche
                </p>
                <p className="max-w-[18ch] text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-white">
                  Concevoir juste. Construire proprement. Livrer sans bruit.
                </p>
                <p className="max-w-[62ch] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  Je travaille surtout sur des interfaces web où la perception de qualité compte autant que la structure interne.
                  Mon objectif n&apos;est pas d&apos;empiler des outils, mais de prendre des décisions simples, robustes et tenables dans le temps.
                </p>
                <p className="max-w-[62ch] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                  Je privilégie les stacks réduites, un frontend net, des composants compréhensibles et une exécution qui reste crédible quand le produit grandit.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.035] px-4 py-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                    Produit
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    MVP lisible, scope cadré et priorités claires.
                  </p>
                </div>
                <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.035] px-4 py-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                    Frontend
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Hiérarchie forte, transitions nettes, responsive propre.
                  </p>
                </div>
                <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.035] px-4 py-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                    Code
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Base maintenable, structure claire et dette contrôlée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className={frame("h-full")}
          >
            <div className={panel("about-photo-shell relative flex h-full min-h-[24rem] items-end overflow-hidden p-5 sm:min-h-[30rem] sm:p-6")}>
              <div
                aria-hidden="true"
                className="absolute inset-x-[14%] top-[10%] h-28 rounded-full bg-[radial-gradient(circle,rgba(67,137,255,0.28),transparent_72%)] blur-3xl"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
              <div className="absolute inset-[1.1rem] rounded-[1.4rem] border border-white/8" />

              <div className="relative z-10 flex h-full w-full flex-col justify-between rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,14,24,0.88),rgba(6,8,16,0.98))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
                      Portrait
                    </p>
                    <p className="mt-3 max-w-[20ch] text-lg font-medium leading-7 tracking-[-0.04em] text-white">
                      Placeholder prêt à être remplacé par une photo réelle.
                    </p>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-[var(--accent)] shadow-[0_0_28px_-18px_rgba(67,137,255,0.95)]">
                    <ImageSquare size={22} weight="regular" />
                  </span>
                </div>

                {aboutPhoto.src ? (
                  <div className="relative mt-8 flex flex-1 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/24">
                    <Image
                      src={aboutPhoto.src}
                      alt={aboutPhoto.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 32rem"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative mt-8 flex flex-1 items-end justify-center overflow-hidden rounded-[1.35rem] border border-dashed border-white/12 bg-[radial-gradient(circle_at_top,rgba(67,137,255,0.12),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-6 pt-10">
                    <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_bottom,rgba(67,137,255,0.18),transparent_72%)]" />
                    <div className="relative flex w-full max-w-[18rem] flex-col items-center">
                      <div className="h-16 w-16 rounded-full border border-white/12 bg-white/[0.05]" />
                      <div className="mt-4 h-[17rem] w-full rounded-t-[7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm leading-6 text-slate-400">
                    Remplacement futur : injecter votre image dans ce bloc sans modifier la structure.
                  </p>
                  <span className="rounded-full border border-white/10 bg-black/22 px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-slate-500">
                    Fade + slide + glow subtil
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
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

function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const canNavigate = projects.length > 1;
  const previousProjectIndex =
    (activeProjectIndex - 1 + projects.length) % projects.length;
  const nextProjectIndex = (activeProjectIndex + 1) % projects.length;

  function showPreviousProject() {
    setActiveProjectIndex(previousProjectIndex);
  }

  function showNextProject() {
    setActiveProjectIndex(nextProjectIndex);
  }

  return (
    <section id="projets" className="py-20 sm:py-24">
      <SectionReveal className="space-y-10">
        <SectionHeading
          eyebrow="Projets"
          title="Quelques réalisations où design et ingénierie avancent ensemble."
          description="Chaque projet cherche un équilibre net entre lisibilité, performances, structure technique et sensation premium."
        />

        <div className="group/project-carousel relative mx-auto max-w-6xl overflow-hidden py-3 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-8 left-0 z-10 w-16 bg-gradient-to-r from-[#050816] to-transparent sm:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-8 right-0 z-10 w-16 bg-gradient-to-l from-[#050816] to-transparent sm:w-24"
          />

          <div className="relative mx-auto flex min-h-[42rem] items-center justify-center sm:min-h-[38rem] lg:min-h-[34rem]">
            {canNavigate ? (
              <>
                <motion.div
                  key={`previous-${projects[previousProjectIndex].slug}`}
                  aria-hidden="true"
                  initial={{ opacity: 0, x: "-28%", scale: 0.82 }}
                  animate={{ opacity: 0.38, x: "-68%", scale: 0.86 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute z-0 w-[82%] max-w-[52rem] blur-[1px] sm:w-[70%] lg:w-[58%]"
                >
                  <ProjectWindowCard project={projects[previousProjectIndex]} />
                </motion.div>

                <motion.div
                  key={`next-${projects[nextProjectIndex].slug}`}
                  aria-hidden="true"
                  initial={{ opacity: 0, x: "28%", scale: 0.82 }}
                  animate={{ opacity: 0.38, x: "68%", scale: 0.86 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute z-0 w-[82%] max-w-[52rem] blur-[1px] sm:w-[70%] lg:w-[58%]"
                >
                  <ProjectWindowCard project={projects[nextProjectIndex]} />
                </motion.div>
              </>
            ) : null}

            <motion.div
              key={projects[activeProjectIndex].slug}
              initial={{ opacity: 0, x: 28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 w-full max-w-[58rem]"
            >
              <ProjectWindowCard project={projects[activeProjectIndex]} />
            </motion.div>
          </div>

          {canNavigate ? (
            <div className="pointer-events-none absolute inset-x-2 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between sm:inset-x-4">
              <button
                type="button"
                aria-label="Projet précédent"
                onClick={showPreviousProject}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-slate-200 opacity-100 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md transition duration-300 hover:border-white/18 hover:bg-white/10 hover:text-white active:scale-95 sm:h-11 sm:w-11 sm:opacity-0 sm:group-hover/project-carousel:opacity-100 sm:group-focus-within/project-carousel:opacity-100"
              >
                <CaretLeft size={18} weight="regular" />
              </button>
              <button
                type="button"
                aria-label="Projet suivant"
                onClick={showNextProject}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-slate-200 opacity-100 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md transition duration-300 hover:border-white/18 hover:bg-white/10 hover:text-white active:scale-95 sm:h-11 sm:w-11 sm:opacity-0 sm:group-hover/project-carousel:opacity-100 sm:group-focus-within/project-carousel:opacity-100"
              >
                <CaretRight size={18} weight="regular" />
              </button>
            </div>
          ) : null}
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
        <ProjectsSection />
        <StackSection />
        <ProfileSection />
        <ContactSection />
      </div>
    </main>
  );
}
