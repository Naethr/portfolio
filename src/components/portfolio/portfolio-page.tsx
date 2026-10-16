'use client';

import Image from "next/image";

import {
  ArrowRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

import type { Language, PortfolioTranslations } from "@/data/translations";

import { SectionReveal } from "../ui/section-reveal";
import { HeroOrbit } from "./hero-orbit";
import { ProjectCard } from "./project-showcase";
import { StackConstellation } from "./stack-constellation";
import { TimelineSection } from "./timeline-section";

const aboutPhoto = {
  src: "/images/Portrait.png",
  alt: "Portrait de Théo",
};

function frame(className?: string) {
  return [
    "theme-frame rounded-[2rem] border p-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function AboutIntro({ copy }: { copy: PortfolioTranslations["about"] }) {
  return (
    <div className="mb-14 grid gap-6 p-5 sm:mb-16 sm:p-7 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center lg:p-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="max-w-3xl space-y-5">
        <span className="theme-pill inline-flex rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em]">
          {copy.eyebrow}
        </span>
        <h2 className="theme-text-primary text-[clamp(2.35rem,5vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-balance">
          {copy.title}
        </h2>

        <div className="theme-text-secondary max-w-[62ch] space-y-3 text-sm leading-7 sm:text-base sm:leading-8">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{ y: -3, scale: 1.006 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="theme-photo-shell group relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-[999px] border shadow-[0_22px_62px_-46px_rgba(127,169,155,0.52)] transition-shadow duration-500 hover:shadow-[0_26px_70px_-50px_rgba(127,169,155,0.68)] sm:max-w-[17rem] lg:mr-0"
      >
        <div
          aria-hidden="true"
          className="theme-photo-overlay absolute inset-0 z-10 rounded-[999px] transition-opacity duration-500 group-hover:opacity-80"
        />
        <Image
          src={aboutPhoto.src}
          alt={aboutPhoto.alt}
          fill
          sizes="(max-width: 1024px) 17rem, 18rem"
          className="scale-[1.04] rounded-[999px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        />
      </motion.div>
    </div>
  );
}

function HeroSection({ copy }: { copy: PortfolioTranslations["hero"] }) {
  return (
    <section id="top" className="hero-section relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10">
        <Image src="/images/hero/jade-cartography-organic.webp" alt="" width={700} height={810} className="hero-cartography" />
        <Image src="/images/hero/astral-corner.webp" alt="" width={470} height={360} className="hero-astral-corner" />
        <Image src="/images/hero/planet-jade.webp" alt="" width={220} height={220} className="hero-planet hero-planet-upper" priority />
        <Image src="/images/hero/planet-small.webp" alt="" width={132} height={132} className="hero-planet hero-planet-lower" priority />
      </div>
      <div className="hero-inner">
      <div className="hero-content relative grid items-center gap-8 pb-12 sm:gap-10 sm:pb-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-4 lg:pb-14">
        <div className="relative z-10 max-w-[48rem]">
          <p className="hero-enter hero-kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span>{copy.role}</span>
            <span aria-hidden="true" className="hero-kicker-divider h-px w-7" />
            <span>Théo Villalba</span>
          </p>

          <h1 className="hero-enter hero-enter-title mt-8 max-w-[16ch] font-display text-[clamp(2.55rem,5.7vw,5.8rem)] font-normal leading-[1.03] tracking-[-0.04em] [overflow-wrap:anywhere] sm:mt-10 xl:max-w-none">
            <span className="hero-title-lead">{copy.headline.lead} </span>
            <span>{copy.headline.ending}</span>
          </h1>
          <div aria-hidden="true" className="hero-heading-rule mt-6 max-w-[27rem] sm:mt-8"><span /></div>

          <p className="hero-enter hero-enter-description mt-7 max-w-[34rem] text-base leading-relaxed sm:mt-8 sm:text-lg">
            <span className="mb-1 block font-medium text-[var(--hero-heading)]">Ruby on Rails · React · TypeScript</span>
            {copy.introduction}
          </p>

          <div className="hero-enter hero-enter-actions mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projets"
              className="hero-primary-link inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[0.2rem] border px-6 py-3 text-sm font-semibold transition-colors duration-200 sm:w-auto"
            >
              {copy.projectsCta}
              <ArrowRight aria-hidden="true" size={18} weight="regular" />
            </a>
            <a
              href="#contact"
              className="hero-secondary-link inline-flex min-h-12 w-full items-center justify-center rounded-[0.2rem] border px-6 py-3 text-sm font-medium transition-colors duration-200 sm:w-auto"
            >
              {copy.contactCta}
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="hero-art relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-none">
          <HeroOrbit />
        </div>
      </div>
      </div>
    </section>
  );
}

function ProfileSection({
  aboutCopy,
  timelineCopy,
}: {
  aboutCopy: PortfolioTranslations["about"];
  timelineCopy: PortfolioTranslations["timeline"];
}) {
  return (
    <section
      id="profil"
      className="relative pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="theme-section-band pointer-events-none absolute left-1/2 top-[-7rem] h-[calc(100%+14rem)] w-screen -translate-x-1/2 [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_82%,transparent_100%)]"
      />
      <SectionReveal>
        <div className="relative p-4 sm:p-5 lg:p-6">
          <div className="relative space-y-5">
            <AboutIntro copy={aboutCopy} />
            <TimelineSection copy={timelineCopy} />
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function StackSection({ copy }: { copy: PortfolioTranslations["stack"] }) {
  return <StackConstellation copy={copy} />;
}

function ProjectsSection({
  copy,
  projectShowcaseCopy,
  projects,
  language,
}: {
  copy: PortfolioTranslations["projectsSection"];
  projectShowcaseCopy: PortfolioTranslations["projectShowcase"];
  projects: PortfolioTranslations["projects"];
  language: Language;
}) {
  return (
    <section id="projets" className="projects-section relative isolate py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="projects-backdrop pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
        <div className="projects-mist" />
        <div className="projects-haze" />
        <div className="projects-lower-mist" />
      </div>

      <div className="relative z-10">
        <div className="max-w-3xl">
          <p className="project-index text-xs font-semibold uppercase tracking-[0.2em]">02 / {copy.eyebrow}</p>
          <h2 className="theme-text-primary mt-5 text-[clamp(2.5rem,5vw,4.6rem)] font-normal leading-[1.08] [overflow-wrap:anywhere]">
            {copy.title}
          </h2>
          <p className="theme-text-secondary mt-5 max-w-[60ch] text-base leading-relaxed sm:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="project-grid mt-12 grid gap-5 sm:mt-14 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              copy={projectShowcaseCopy}
              language={language}
              number={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ copy }: { copy: PortfolioTranslations["contact"] }) {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <SectionReveal className={frame()}>
        <div className="theme-contact-panel relative overflow-hidden rounded-[1.55rem] border px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(189,166,122,0.82),transparent)]"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <h2 className="theme-text-primary max-w-3xl text-balance text-center text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {copy.title}
            </h2>

            <p className="theme-text-secondary max-w-2xl text-center text-base leading-8 sm:text-lg">
              {copy.description}
            </p>

            <a
              href="mailto:theovbpro@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-contact-cta inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full border px-6 py-3.5 text-center text-sm font-semibold transition duration-300 hover:border-[rgba(189,166,122,0.72)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] active:scale-[0.98] sm:w-auto"
            >
              <EnvelopeSimple size={18} weight="regular" />
              theovbpro@gmail.com
            </a>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

export function PortfolioPage({ copy, language }: { copy: PortfolioTranslations; language: Language }) {
  return (
    <main id="content" className="relative flex-1 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <HeroSection copy={copy.hero} />
        <ProjectsSection
          copy={copy.projectsSection}
          projectShowcaseCopy={copy.projectShowcase}
          projects={copy.projects}
          language={language}
        />
        <StackSection copy={copy.stack} />
        <ProfileSection
          aboutCopy={copy.about}
          timelineCopy={copy.timeline}
        />
        <ContactSection copy={copy.contact} />
      </div>
    </main>
  );
}
