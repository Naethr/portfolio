'use client';

import Image from "next/image";

import {
  ArrowRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";
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

function AboutIntro({ copy }: { copy: PortfolioTranslations["about"] }) {
  return (
    <div className="about-layout">
      <div className="about-copy">
        <h2 className="about-title font-display">
          {copy.title}
        </h2>

        <div className="about-prose">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="about-portrait">
        <Image
          src={aboutPhoto.src}
          alt={aboutPhoto.alt}
          fill
          sizes="(max-width: 767px) 144px, (max-width: 1023px) 192px, 256px"
          className="object-cover object-center"
        />
      </div>
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
        <div className="hero-copy relative z-10 max-w-[48rem]">
          <h1 className="hero-enter hero-enter-title font-display text-[clamp(2.55rem,5.7vw,5.8rem)] font-normal leading-[1.03] tracking-[-0.04em] [overflow-wrap:anywhere]">
            {copy.headline}
          </h1>
          <p className="hero-enter hero-role mt-4 text-[clamp(1.35rem,2.5vw,2.2rem)] font-medium leading-snug">
            {copy.role}
          </p>
          <div aria-hidden="true" className="hero-heading-rule mt-6 max-w-[27rem] sm:mt-8"><span /></div>

          <p className="hero-enter hero-enter-description mt-7 max-w-[34rem] text-base leading-relaxed sm:mt-8 sm:text-lg">
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
      className="relative"
    >
      <div className="about-scene">
        <div aria-hidden="true" className="about-backdrop pointer-events-none">
          <Image src="/images/about/jade-cartography.webp" alt="" width={960} height={540} sizes="(max-width: 767px) 416px, (max-width: 1023px) 608px, (max-width: 1181px) 65vw, 768px" className="about-cartography" />
        </div>
        <AboutIntro copy={aboutCopy} />
      </div>
      <SectionReveal>
        <TimelineSection copy={timelineCopy} />
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
          <h2 className="theme-text-primary text-[clamp(2.5rem,5vw,4.6rem)] font-normal leading-[1.08] [overflow-wrap:anywhere]">
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
    <section id="contact" aria-labelledby="contact-title" className="contact-section">
      <div aria-hidden="true" className="contact-backdrop">
        <Image src="/images/about/jade-cartography.webp" alt="" width={960} height={540} sizes="(max-width: 767px) 480px, (max-width: 1023px) 650px, 860px" className="contact-cartography" />
      </div>
      <div className="contact-content">
        <h2 id="contact-title" className="contact-title font-display">{copy.title}</h2>
        <p className="contact-description">{copy.description}</p>
        <a
          href="mailto:theovbpro@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-cta"
        >
          <EnvelopeSimple size={19} weight="regular" aria-hidden="true" />
          theovbpro@gmail.com
        </a>
      </div>
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
