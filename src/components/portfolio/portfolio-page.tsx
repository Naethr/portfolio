'use client';

import { useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

import {
  projects,
  rotatingTechnologies,
  socialLinks,
} from "@/data/portfolio";

import { GradientDots } from "../ui/gradient-dots";
import MagicRings from "../ui/magic-rings";
import { SectionReveal } from "../ui/section-reveal";
import { HeroGooeyText } from "./hero-gooey-text";
import { ProjectWindowCard } from "./project-window-card";
import { SectionHeading } from "./section-heading";
import { StackConstellation } from "./stack-constellation";

const aboutPhoto = {
  src: "/images/Portrait.png",
  alt: "Portrait de Théo",
};

const timelineItems = [
  {
    date: "Avril 2026",
    title: "Stack JavaScript moderne",
    description:
      "React, Next.js, TypeScript et Node.js pour construire des interfaces dynamiques et des applications web full-stack.",
  },
  {
    date: "Avril 2026",
    title: "Certification backend & Rails",
    description:
      "Approche full-stack avec Ruby on Rails : MVC, CRUD, bases de données, Hotwire et logique backend structurée.",
  },
  {
    date: "Début 2026",
    title: "Formation intensive THP",
    description:
      "Projets en équipe, pratique quotidienne, Ruby, POO et développement web appliqué.",
  },
  {
    date: "Décembre 2025",
    title: "Premiers pas avec Ruby",
    description:
      "Renforcement de la logique de programmation et des bases backend.",
  },
  {
    date: "Septembre - Novembre 2025",
    title: "Fondamentaux web",
    description:
      "HTML, CSS et responsive design avec le parcours FreeCodeCamp.",
  },
  {
    date: "Août 2025",
    title: "Reconversion vers le web",
    description:
      "Décision de me reconvertir vers le développement web et les nouvelles technologies.",
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

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineItems)[number];
  index: number;
}) {
  const isRight = index % 2 === 1;

  return (
    <li className="relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-3 sm:grid-cols-[5.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,1fr)] lg:gap-4">
      <div
        className={[
          "order-2 lg:order-none",
          isRight ? "lg:col-start-3" : "lg:col-start-1",
        ].join(" ")}
      >
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.42,
            delay: Math.min(index * 0.035, 0.14),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-[1rem] border border-white/8 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition duration-300 hover:border-white/14 hover:bg-white/[0.055]"
        >
          <h3 className="text-base font-semibold leading-6 tracking-[-0.035em] text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {item.description}
          </p>
        </motion.article>
      </div>

      <div className="relative order-1 col-start-1 row-start-1 flex items-start justify-center pt-3 lg:order-none lg:col-start-2">
        <span className="max-w-[4.4rem] rounded-full border border-[rgba(67,137,255,0.28)] bg-[#07101f] px-2 py-1 text-center font-mono text-[0.56rem] uppercase leading-4 tracking-[0.12em] text-slate-300 shadow-[0_0_22px_-14px_rgba(67,137,255,0.95)] sm:max-w-[5rem] lg:max-w-[6.8rem]">
          {item.date}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[2.9rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[rgba(67,137,255,0.6)] bg-[#07101f] shadow-[0_0_0_5px_rgba(67,137,255,0.08),0_0_20px_rgba(67,137,255,0.5)]"
        />
      </div>

      <div
        aria-hidden="true"
        className={[
          "hidden lg:block",
          isRight ? "lg:col-start-1" : "lg:col-start-3",
        ].join(" ")}
      />
    </li>
  );
}

function AboutIntro() {
  return (
    <div className="grid gap-6 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] sm:p-7 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center lg:p-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="max-w-3xl space-y-5">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
          À propos
        </span>
        <h2 className="text-[clamp(2.35rem,5vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white text-balance">
          À propos
        </h2>

        <div className="max-w-[62ch] space-y-3">
          <p className="text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            Je suis Théo, développeur full-stack junior passionné par le
            développement web et les nouvelles technologies.
          </p>
          <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Après une reconversion récente, je construis des applications web
            modernes, maintenables et orientées produit, avec une attention
            portée à la clarté du code, à l&apos;expérience utilisateur et à la
            simplicité des solutions.
          </p>
          <p className="text-sm leading-7 text-slate-400">
            J&apos;aime transformer une idée en produit concret, apprendre vite,
            itérer proprement et créer des projets utiles.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-[999px] border border-white/10 bg-black/24 shadow-[0_24px_70px_-44px_rgba(67,137,255,0.75)] sm:max-w-[17rem] lg:mr-0"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 rounded-[999px] bg-[linear-gradient(180deg,rgba(5,7,14,0),rgba(5,7,14,0.26))]"
        />
        <Image
          src={aboutPhoto.src}
          alt={aboutPhoto.alt}
          fill
          sizes="(max-width: 1024px) 17rem, 18rem"
          className="scale-[1.04] rounded-[999px] object-cover object-center"
        />
      </motion.div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-5rem)] items-center py-24 sm:py-28 lg:py-32"
    >
      <div className="w-full">
        <div className="relative px-2 py-12 sm:px-4 sm:py-14 lg:px-8 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-[18%] top-0 h-full bg-[radial-gradient(circle_at_center,rgba(67,137,255,0.13),transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[calc(100dvh+18rem)] min-h-[56rem] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-85"
          >
            <div className="absolute inset-y-0 left-0 w-full [mask-image:linear-gradient(90deg,black_0%,black_22%,rgba(0,0,0,0.8)_31%,transparent_44%,transparent_56%,rgba(0,0,0,0.8)_69%,black_78%,black_100%)]">
              <MagicRings
                color="#7cb0ff"
                colorTwo="#4389ff"
                ringCount={6}
                speed={1.2}
                attenuation={7.25}
                lineThickness={1.5}
                baseRadius={0.62}
                radiusStep={0.085}
                scaleRate={0.07}
                opacity={0.9}
                blur={0.2}
                noiseAmount={0.03}
                rotation={0}
                ringGap={1.45}
                stretchX={1.9}
                edgeCoverage={0.94}
                fadeIn={0.72}
                fadeOut={1.28}
                followMouse={false}
                mouseInfluence={0.1}
                hoverScale={1.12}
                parallax={0.035}
                clickBurst={false}
              />
            </div>
          </div>

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
    <section id="profil" className="py-20 sm:py-24 lg:py-28">
      <SectionReveal className={frame("overflow-hidden")}>
        <div className={panel("relative overflow-hidden p-4 sm:p-5 lg:p-6")}>
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(67,137,255,0.18),transparent_68%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
          />

          <div className="relative space-y-5">
            <AboutIntro />

            <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:p-7 lg:p-8">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                    Parcours
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-white sm:text-3xl">
                    Progression structurée, étape par étape.
                  </h3>
                </div>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute bottom-3 left-[2.375rem] top-3 w-px bg-gradient-to-b from-[rgba(67,137,255,0.08)] via-[rgba(67,137,255,0.4)] to-white/8 sm:left-[2.75rem] lg:left-1/2"
                />
                <ol className="relative space-y-4">
                  {timelineItems.map((item, index) => (
                    <TimelineItem
                      key={`${item.date}-${item.title}`}
                      item={item}
                      index={index}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function StackSection() {
  return <StackConstellation />;
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
                theovbpro@gmail.com
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
    <main id="content" className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-full min-h-[60rem] w-[min(92vw,72rem)] -translate-x-1/2 bg-[rgba(7,11,22,0.52)] opacity-70 blur-3xl" />
        <div className="absolute inset-x-[-12%] inset-y-0 sm:inset-x-[-4%]">
          <GradientDots
            dotSize={10}
            spacing={12}
            duration={22}
            colorCycleDuration={10}
            className="opacity-28 [mask-image:linear-gradient(180deg,black_0%,black_82%,transparent_100%)]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProjectsSection />
        <StackSection />
        <ProfileSection />
        <ContactSection />
      </div>
    </main>
  );
}
