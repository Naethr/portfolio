'use client';

import { useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  BookOpenIcon,
  CaretLeft,
  CaretRight,
  CertificateIcon,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import {
  siCss,
  siExpress,
  siGithub,
  siHtml5,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenaigym,
  siReact,
  siRuby,
  siRubyonrails,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

import {
  projects,
  rotatingTechnologies,
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

type TimelineAccent = "foundation" | "stack";
type TimelineTone = "teal" | "blue";
type TimelineFallbackIcon = typeof CertificateIcon;
type TimelineSimpleIconId =
  | "css"
  | "express"
  | "github"
  | "html"
  | "nestjs"
  | "next"
  | "node"
  | "openaigym"
  | "rails"
  | "react"
  | "ruby"
  | "vercel";

type TimelineLogo =
  | { type: "simple"; id: TimelineSimpleIconId }
  | { type: "fallback"; label: string; icon?: TimelineFallbackIcon };

const techIcons: Record<
  TimelineSimpleIconId,
  {
    icon: SimpleIcon;
    label: string;
  }
> = {
  css: { icon: siCss, label: "CSS" },
  express: { icon: siExpress, label: "Express.js" },
  github: { icon: siGithub, label: "GitHub" },
  html: { icon: siHtml5, label: "HTML5" },
  nestjs: { icon: siNestjs, label: "NestJS" },
  next: { icon: siNextdotjs, label: "Next.js" },
  node: { icon: siNodedotjs, label: "Node.js" },
  openaigym: { icon: siOpenaigym, label: "OpenAI Gym" },
  rails: { icon: siRubyonrails, label: "Ruby on Rails" },
  react: { icon: siReact, label: "React" },
  ruby: { icon: siRuby, label: "Ruby" },
  vercel: { icon: siVercel, label: "Vercel" },
};

type TimelineDateItem = {
  id: string;
  type: "date";
  label: string;
  accent: TimelineAccent;
};

type TimelineEventItem = {
  id: string;
  type: "event";
  title: string;
  emphasizedText?: string;
  detail?: string;
  logos?: TimelineLogo[];
  accent: TimelineAccent;
};

type TimelineItem = TimelineDateItem | TimelineEventItem;

const timelineAccentStyles: Record<
  TimelineAccent,
  {
    date: string;
  }
> = {
  foundation: {
    date:
      "border-[rgba(45,212,191,0.46)] bg-[#061816] text-[#99f6e4]",
  },
  stack: {
    date:
      "border-[rgba(45,212,191,0.46)] bg-[#061816] text-[#99f6e4]",
  },
};

const timelineToneStyles: Record<
  TimelineTone,
  {
    button: string;
    activeButton: string;
    detail: string;
    connector: string;
  }
> = {
  teal: {
    button:
      "border-[rgba(139,92,246,0.34)] bg-[rgba(139,92,246,0.085)] hover:border-[rgba(139,92,246,0.54)] hover:bg-[rgba(139,92,246,0.13)]",
    activeButton:
      "border-[rgba(139,92,246,0.64)] bg-[rgba(139,92,246,0.13)] shadow-[0_24px_60px_-44px_rgba(139,92,246,0.76)]",
    detail: "border-[rgba(139,92,246,0.34)] bg-[rgba(139,92,246,0.075)]",
    connector: "bg-[rgba(139,92,246,0.56)]",
  },
  blue: {
    button:
      "border-[rgba(67,137,255,0.34)] bg-[rgba(67,137,255,0.095)] hover:border-[rgba(67,137,255,0.56)] hover:bg-[rgba(67,137,255,0.145)]",
    activeButton:
      "border-[rgba(67,137,255,0.68)] bg-[rgba(67,137,255,0.15)] shadow-[0_24px_60px_-44px_rgba(67,137,255,0.88)]",
    detail: "border-[rgba(67,137,255,0.34)] bg-[rgba(67,137,255,0.085)]",
    connector: "bg-[rgba(67,137,255,0.6)]",
  },
};

const timelineLineStyles = {
  line: "bg-[rgba(45,212,191,0.58)]",
  point:
    "border-[rgba(45,212,191,0.84)] bg-[#0b1220] shadow-[0_0_0_6px_rgba(45,212,191,0.1),0_0_22px_rgba(45,212,191,0.42)]",
};

const timelineItems: TimelineItem[] = [
  {
    id: "ai-project",
    type: "event",
    title: "Projet IA",
    detail: "Projet Sokwak AI · intégration d’une API OpenAI moderne",
    logos: [{ type: "simple", id: "openaigym" }],
    accent: "stack",
  },
  {
    id: "node-js",
    type: "event",
    title: "Node.js",
    detail: "Express.js · NestJS · backend JavaScript",
    logos: [
      { type: "simple", id: "node" },
      { type: "simple", id: "express" },
      { type: "simple", id: "nestjs" },
    ],
    accent: "stack",
  },
  {
    id: "backend-certification",
    type: "event",
    title: "Certification backend",
    detail: "Obtenue à mi-parcours THP",
    logos: [{ type: "fallback", label: "Certification", icon: CertificateIcon }],
    accent: "stack",
  },
  {
    id: "date-april-2026",
    type: "date",
    label: "Avril 2026",
    accent: "stack",
  },
  {
    id: "react-next",
    type: "event",
    title: "React / Next.js",
    detail: "Composants · JavaScript · TypeScript",
    logos: [
      { type: "simple", id: "react" },
      { type: "simple", id: "next" },
    ],
    accent: "stack",
  },
  {
    id: "rails-sql",
    type: "event",
    title: "Ruby on Rails / SQL",
    detail: "MVC · CRUD · base de données · Hotwire",
    logos: [{ type: "simple", id: "rails" }],
    accent: "stack",
  },
  {
    id: "tools-mastery",
    type: "event",
    title: "Maîtrise d’outils",
    detail: "GitHub · Vercel · VS Code",
    logos: [
      { type: "simple", id: "github" },
      { type: "simple", id: "vercel" },
    ],
    accent: "foundation",
  },
  {
    id: "ruby",
    type: "event",
    title: "Ruby",
    detail: "Niveau : maîtrise · scripts · POO",
    logos: [{ type: "simple", id: "ruby" }],
    accent: "foundation",
  },
  {
    id: "thp-start",
    type: "event",
    title: "Début de formation THP",
    detail: "Formation intensive de Dev Web",
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  {
    id: "date-january-2026",
    type: "date",
    label: "Janvier 2026",
    accent: "foundation",
  },
  {
    id: "ruby-fundamentals",
    type: "event",
    title: "Fondamentaux Ruby",
    logos: [{ type: "simple", id: "ruby" }],
    accent: "foundation",
  },
  {
    id: "end-responsive-web-design",
    type: "event",
    title: "Fin du parcours Responsive Web Design",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  {
    id: "date-november-2025",
    type: "date",
    label: "Novembre 2025",
    accent: "foundation",
  },
  {
    id: "html-css-fundamentals",
    type: "event",
    title: "Fondamentaux HTML/CSS",
    detail: "Mise en page, fondamentaux du web, responsive design",
    logos: [
      { type: "simple", id: "html" },
      { type: "simple", id: "css" },
    ],
    accent: "foundation",
  },
  {
    id: "freecodecamp-responsive-web-design",
    type: "event",
    title: "Parcours Responsive Web Design",
    emphasizedText: "Responsive Web Design",
    detail: "FreeCodeCamp",
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  {
    id: "date-september-2025",
    type: "date",
    label: "Septembre 2025",
    accent: "foundation",
  },
  {
    id: "career-shift",
    type: "event",
    title: "Reconversion vers le dev web",
    logos: [{ type: "fallback", label: "</>" }],
    accent: "foundation",
  },
  {
    id: "date-august-2025",
    type: "date",
    label: "Août 2025",
    accent: "foundation",
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

function isTimelineEvent(item: TimelineItem): item is TimelineEventItem {
  return item.type === "event";
}

type TimelineRenderItem =
  | { item: TimelineDateItem; eventIndex: null }
  | { item: TimelineEventItem; eventIndex: number };

const timelineRenderItems = timelineItems.reduce<TimelineRenderItem[]>(
  (items, item) => {
    if (!isTimelineEvent(item)) {
      return [...items, { item, eventIndex: null }];
    }

    const eventIndex = items.reduce(
      (count, entry) => count + (isTimelineEvent(entry.item) ? 1 : 0),
      0,
    );

    return [...items, { item, eventIndex }];
  },
  [],
);

function TimelineDateMarker({ item }: { item: TimelineDateItem }) {
  const accent = timelineAccentStyles[item.accent];

  return (
    <li className="relative grid grid-cols-[2.75rem_0.75rem_minmax(0,1fr)] py-1 lg:grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)] lg:py-2">
      <span
        className={[
          "relative z-20 col-span-3 col-start-1 w-fit max-w-full justify-self-start rounded-[0.65rem] border px-2.5 py-1.5 text-center font-mono text-[0.52rem] uppercase leading-tight tracking-[0.08em] shadow-[0_0_24px_-16px_rgba(45,212,191,0.9)] lg:col-span-1 lg:col-start-2 lg:min-w-[6.75rem] lg:justify-self-center lg:text-[0.58rem] lg:leading-none lg:tracking-[0.12em]",
          accent.date,
        ].join(" ")}
      >
        {item.label}
      </span>
    </li>
  );
}

function TechIcon({
  logo,
  tone,
}: {
  logo: TimelineLogo;
  tone: TimelineTone;
}) {
  const styles = timelineToneStyles[tone];
  const label = logo.type === "simple" ? techIcons[logo.id].label : logo.label;
  const Icon = logo.type === "fallback" ? logo.icon : undefined;

  return (
    <span
      className={[
        "inline-flex h-7 min-w-7 items-center justify-center rounded-[0.55rem] border px-1.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[-0.02em] text-slate-100 transition duration-300",
        styles.detail,
      ].join(" ")}
      title={label}
      aria-label={label}
    >
      {logo.type === "simple" ? (
        <span
          className="inline-flex [&_path]:fill-current [&_svg]:h-[1rem] [&_svg]:w-[1rem] [&_svg]:fill-current"
          dangerouslySetInnerHTML={{ __html: techIcons[logo.id].icon.svg }}
        />
      ) : Icon ? (
        <Icon size={15} weight="duotone" />
      ) : (
        logo.label
      )}
    </span>
  );
}

function TimelineTitle({ item }: { item: TimelineEventItem }) {
  if (!item.emphasizedText || !item.title.includes(item.emphasizedText)) {
    return item.title;
  }

  const [before, after] = item.title.split(item.emphasizedText);

  return (
    <>
      {before}
      <em>{item.emphasizedText}</em>
      {after}
    </>
  );
}

function TimelineStep({
  item,
  index,
  eventIndex,
}: {
  item: TimelineEventItem;
  index: number;
  eventIndex: number;
}) {
  const tone: TimelineTone = eventIndex % 2 === 0 ? "teal" : "blue";
  const toneStyles = timelineToneStyles[tone];
  const isLeft = eventIndex % 2 === 0;
  const hasDetail = Boolean(item.detail);
  const hasLogos = Boolean(item.logos?.length);
  const cardClassName = [
    "group/timeline-card h-auto w-full max-w-full rounded-[0.85rem] border px-3 py-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-fit lg:min-w-[13rem] lg:max-w-[22rem]",
    "cursor-default",
    toneStyles.button,
    hasDetail ? toneStyles.activeButton : "",
  ].join(" ");
  const cardContent = (
    <span className="flex items-start gap-2.5">
      {hasLogos ? (
        <span className="flex max-w-[5.5rem] shrink-0 flex-wrap gap-1.5 pt-0.5 sm:max-w-[7.5rem]">
          {item.logos?.map((logo) => (
            <TechIcon
              key={`${item.id}-${logo.type === "simple" ? logo.id : logo.label}`}
              logo={logo}
              tone={tone}
            />
          ))}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-5 tracking-[-0.025em] text-white text-balance">
          <TimelineTitle item={item} />
        </span>
        {item.detail ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block border-t border-white/8 pt-2 text-xs leading-5 text-slate-300"
          >
            {item.detail}
          </motion.span>
        ) : null}
      </span>
    </span>
  );

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.035, 0.14),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-[2.75rem_0.75rem_minmax(0,1fr)] items-start py-1 lg:grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)] lg:py-2"
    >
      <span
        aria-hidden="true"
        className={[
          "z-10 col-start-1 row-start-1 mt-3.5 h-3 w-3 justify-self-center rounded-full border transition duration-300 lg:col-start-2",
          timelineLineStyles.point,
        ].join(" ")}
      />
      <span
        aria-hidden="true"
        className={[
          "col-start-2 row-start-1 mt-[1.12rem] h-px w-full lg:hidden",
          toneStyles.connector,
        ].join(" ")}
      />
      <div
        className={[
          "col-start-3 row-start-1 min-w-0",
          isLeft
            ? "lg:col-start-1 lg:justify-self-end"
            : "lg:col-start-3 lg:justify-self-start",
        ].join(" ")}
      >
        <div className="flex min-w-0 items-start">
          {isLeft ? null : (
            <span
              aria-hidden="true"
              className={[
                "mt-[1.12rem] hidden h-px w-6 shrink-0 lg:block",
                toneStyles.connector,
              ].join(" ")}
            />
          )}
          <motion.article layout className={cardClassName}>
            {cardContent}
          </motion.article>
          {isLeft ? (
            <span
              aria-hidden="true"
              className={[
                "mt-[1.12rem] hidden h-px w-6 shrink-0 lg:block",
                toneStyles.connector,
              ].join(" ")}
            />
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}

function AboutIntro() {
  return (
    <div className="mb-14 grid gap-6 p-5 sm:mb-16 sm:p-7 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center lg:p-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="max-w-3xl space-y-5">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-300">
          À propos
        </span>
        <h2 className="text-[clamp(2.35rem,5vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white text-balance">
          Derrière l’écran
        </h2>

        <div className="max-w-[62ch] space-y-3 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          <p>
            Je suis Théo, développeur full-stack junior passionné par le
            développement web et les nouvelles technologies.
          </p>
          <p>
            Après une reconversion récente, je construis des applications web
            modernes, maintenables et orientées produit, avec une attention
            portée à la clarté du code, à l’expérience utilisateur et à la
            simplicité des solutions.
          </p>
          <p>
            J’aime transformer une idée en produit concret, apprendre vite,
            itérer proprement et créer des projets utiles.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{ y: -3, scale: 1.006 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-[999px] border border-white/10 bg-black/24 shadow-[0_22px_62px_-46px_rgba(67,137,255,0.52)] transition-shadow duration-500 hover:shadow-[0_26px_70px_-50px_rgba(67,137,255,0.68)] sm:max-w-[17rem] lg:mr-0"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 rounded-[999px] bg-[linear-gradient(180deg,rgba(5,7,14,0),rgba(5,7,14,0.26))] transition-opacity duration-500 group-hover:opacity-80"
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
    <section id="profil" className="relative py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-7rem] h-[calc(100%+14rem)] w-screen -translate-x-1/2 bg-[#050816]/80 [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_82%,transparent_100%)]"
      />
      <SectionReveal>
        <div className="relative p-4 sm:p-5 lg:p-6">
          <div className="relative space-y-5">
            <AboutIntro />

            <div id="parcours" className="scroll-mt-28 p-5 sm:p-7 lg:p-8">
              <div className="mb-8 flex items-end justify-between gap-4 sm:mb-9">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-300">
                    Parcours
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-white sm:text-3xl">
                    Mon parcours de développeur
                  </h3>
                </div>
              </div>

              <div className="relative min-w-0 overflow-x-clip py-1">
                <div
                  aria-hidden="true"
                  className={[
                    "absolute bottom-2 left-[1.375rem] top-2 w-px lg:left-1/2 lg:-translate-x-1/2",
                    timelineLineStyles.line,
                  ].join(" ")}
                />
                <ol className="relative space-y-6 lg:space-y-9">
                  {timelineRenderItems.map(({ item, eventIndex }, index) =>
                    isTimelineEvent(item) ? (
                      <TimelineStep
                        key={item.id}
                        item={item}
                        index={index}
                        eventIndex={eventIndex ?? 0}
                      />
                    ) : (
                      <TimelineDateMarker key={item.id} item={item} />
                    ),
                  )}
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
          title="Quelques projets réalisés seul ou en équipe."
          description="Chacun m’a permis de travailler un aspect concret du développement web : interface, logique métier, architecture ou performance."
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
        <div className="relative overflow-hidden rounded-[1.55rem] border border-[rgba(139,92,246,0.42)] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.22),transparent_42%),linear-gradient(180deg,rgba(12,10,24,0.94),rgba(5,7,14,0.98))] px-6 py-12 text-center shadow-[0_0_70px_-36px_rgba(139,92,246,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.82),transparent)]"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <h2 className="max-w-3xl text-balance text-center text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Une idée, une question, ou simplement envie d’échanger ?
            </h2>

            <p className="max-w-2xl text-center text-base leading-8 text-slate-300 sm:text-lg">
              Je suis disponible pour tous vos projets, ainsi que vos
              opportunités et discussions autour du développement web.
            </p>

            <a
              href="mailto:theovbpro@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full border border-[rgba(167,139,250,0.52)] bg-[rgba(139,92,246,0.18)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_0_34px_-16px_rgba(139,92,246,0.92)] transition duration-300 hover:border-[rgba(196,181,253,0.72)] hover:bg-[rgba(139,92,246,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 active:scale-[0.98] sm:w-auto"
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
