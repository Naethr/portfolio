'use client';

import { useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  BookOpenIcon,
  CaretDown,
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

import type { Language, PortfolioTranslations } from "@/data/translations";

import { SectionReveal } from "../ui/section-reveal";
import { HeroOrbit } from "./hero-orbit";
import { ProjectCard } from "./project-showcase";
import { StackConstellation } from "./stack-constellation";

const aboutPhoto = {
  src: "/images/Portrait.png",
  alt: "Portrait de Théo",
};

type TimelineAccent = "foundation" | "stack";
type TimelineTone = "brass" | "jade";
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

const TIMELINE_PREVIEW_ITEM_COUNT = 4;

const timelineAccentStyles: Record<
  TimelineAccent,
  {
    date: string;
  }
> = {
  foundation: {
    date:
      "border-[var(--timeline-date-border)] bg-[var(--timeline-date-background)] text-[var(--timeline-date-text)]",
  },
  stack: {
    date:
      "border-[var(--timeline-date-border)] bg-[var(--timeline-date-background)] text-[var(--timeline-date-text)]",
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
  brass: {
    button:
      "border-[rgba(189,166,122,0.34)] bg-[rgba(189,166,122,0.085)] hover:border-[rgba(189,166,122,0.54)] hover:bg-[rgba(189,166,122,0.13)]",
    activeButton:
      "border-[rgba(189,166,122,0.64)] bg-[rgba(189,166,122,0.13)] shadow-[0_24px_60px_-44px_rgba(189,166,122,0.76)]",
    detail: "border-[rgba(189,166,122,0.34)] bg-[rgba(189,166,122,0.075)]",
    connector: "bg-[rgba(189,166,122,0.56)]",
  },
  jade: {
    button:
      "border-[rgba(127,169,155,0.34)] bg-[rgba(127,169,155,0.095)] hover:border-[rgba(127,169,155,0.56)] hover:bg-[rgba(127,169,155,0.145)]",
    activeButton:
      "border-[rgba(127,169,155,0.68)] bg-[rgba(127,169,155,0.15)] shadow-[0_24px_60px_-44px_rgba(127,169,155,0.88)]",
    detail: "border-[rgba(127,169,155,0.34)] bg-[rgba(127,169,155,0.085)]",
    connector: "bg-[rgba(127,169,155,0.6)]",
  },
};

const timelineLineStyles = {
  line: "bg-[rgba(127,169,155,0.58)]",
  point:
    "border-[rgba(127,169,155,0.84)] bg-[var(--timeline-point-background)] shadow-[0_0_0_6px_rgba(127,169,155,0.1),0_0_22px_rgba(127,169,155,0.42)]",
};

const timelineItemMeta: Record<
  string,
  {
    accent: TimelineAccent;
    logos?: TimelineLogo[];
  }
> = {
  "ai-project": {
    logos: [{ type: "simple", id: "openaigym" }],
    accent: "stack",
  },
  "node-js": {
    logos: [
      { type: "simple", id: "node" },
      { type: "simple", id: "express" },
      { type: "simple", id: "nestjs" },
    ],
    accent: "stack",
  },
  "backend-certification": {
    logos: [{ type: "fallback", label: "Certification", icon: CertificateIcon }],
    accent: "stack",
  },
  "date-april-2026": { accent: "stack" },
  "react-next": {
    logos: [
      { type: "simple", id: "react" },
      { type: "simple", id: "next" },
    ],
    accent: "stack",
  },
  "rails-sql": {
    logos: [{ type: "simple", id: "rails" }],
    accent: "stack",
  },
  "tools-mastery": {
    logos: [
      { type: "simple", id: "github" },
      { type: "simple", id: "vercel" },
    ],
    accent: "foundation",
  },
  ruby: {
    logos: [{ type: "simple", id: "ruby" }],
    accent: "foundation",
  },
  "thp-start": {
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  "date-january-2026": { accent: "foundation" },
  "ruby-fundamentals": {
    logos: [{ type: "simple", id: "ruby" }],
    accent: "foundation",
  },
  "end-responsive-web-design": {
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  "date-november-2025": { accent: "foundation" },
  "html-css-fundamentals": {
    logos: [
      { type: "simple", id: "html" },
      { type: "simple", id: "css" },
    ],
    accent: "foundation",
  },
  "freecodecamp-responsive-web-design": {
    logos: [{ type: "fallback", label: "Apprentissage", icon: BookOpenIcon }],
    accent: "foundation",
  },
  "date-september-2025": { accent: "foundation" },
  "career-shift": {
    logos: [{ type: "fallback", label: "</>" }],
    accent: "foundation",
  },
  "date-august-2025": { accent: "foundation" },
};

function frame(className?: string) {
  return [
    "theme-frame rounded-[2rem] border p-2",
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

function buildTimelineItems(
  items: PortfolioTranslations["timeline"]["items"],
): TimelineItem[] {
  return items.map((item) => {
    const meta = timelineItemMeta[item.id];
    const accent = meta?.accent ?? "foundation";

    if (item.type === "date") {
      return {
        id: item.id,
        type: item.type,
        label: item.label,
        accent,
      };
    }

    return {
      id: item.id,
      type: item.type,
      title: item.title,
      emphasizedText: item.emphasizedText,
      detail: item.detail,
      logos: meta?.logos?.map((logo) =>
        logo.type === "fallback" && item.fallbackLabel
          ? { ...logo, label: item.fallbackLabel }
          : logo,
      ),
      accent,
    };
  });
}

function buildTimelineRenderItems(items: TimelineItem[]) {
  return items.reduce<TimelineRenderItem[]>((renderItems, item) => {
    if (!isTimelineEvent(item)) {
      return [...renderItems, { item, eventIndex: null }];
    }

    const eventIndex = renderItems.reduce(
      (count, entry) => count + (isTimelineEvent(entry.item) ? 1 : 0),
      0,
    );

    return [...renderItems, { item, eventIndex }];
  }, []);
}

function renderTimelineItem(
  { item, eventIndex }: TimelineRenderItem,
  index: number,
) {
  return isTimelineEvent(item) ? (
    <TimelineStep
      key={item.id}
      item={item}
      index={index}
      eventIndex={eventIndex ?? 0}
    />
  ) : (
    <TimelineDateMarker key={item.id} item={item} />
  );
}

function TimelineDateMarker({ item }: { item: TimelineDateItem }) {
  const accent = timelineAccentStyles[item.accent];

  return (
    <li className="relative grid grid-cols-[2.75rem_0.75rem_minmax(0,1fr)] py-1 lg:grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)] lg:py-2">
      <span
        className={[
          "relative z-20 col-span-3 col-start-1 w-fit max-w-full justify-self-start rounded-[0.65rem] border px-2.5 py-1.5 text-center font-mono text-[0.52rem] uppercase leading-tight tracking-[0.08em] shadow-[0_0_24px_-16px_rgba(127,169,155,0.9)] lg:col-span-1 lg:col-start-2 lg:min-w-[6.75rem] lg:justify-self-center lg:text-[0.58rem] lg:leading-none lg:tracking-[0.12em]",
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
        "inline-flex h-7 min-w-7 items-center justify-center rounded-[0.55rem] border px-1.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[-0.02em] text-[var(--text-primary)] transition duration-300",
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
  const tone: TimelineTone = eventIndex % 2 === 0 ? "brass" : "jade";
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
        <span className="block text-sm font-semibold leading-5 tracking-[-0.025em] text-[var(--text-primary)] text-balance">
          <TimelineTitle item={item} />
        </span>
        {item.detail ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block border-t border-[var(--border-soft)] pt-2 text-xs leading-5 text-[var(--text-secondary)]"
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

function Timeline({ copy }: { copy: PortfolioTranslations["timeline"] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timelineItems = buildTimelineRenderItems(
    buildTimelineItems(copy.items),
  );
  const previewItems = timelineItems.slice(0, TIMELINE_PREVIEW_ITEM_COUNT);
  const remainingItems = timelineItems.slice(TIMELINE_PREVIEW_ITEM_COUNT);
  const toggleLabel = isExpanded ? copy.collapseLabel : copy.expandLabel;

  return (
    <div id="parcours" className="scroll-mt-28 p-5 sm:p-7 lg:p-8">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-9">
        <div>
          <span className="theme-pill inline-flex rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em]">
            {copy.eyebrow}
          </span>
          <h3 className="theme-text-primary mt-2 text-2xl font-semibold tracking-[-0.055em] sm:text-3xl">
            {copy.title}
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
          {previewItems.map(renderTimelineItem)}
        </ol>
        <div
          id="timeline-full-journey"
          aria-hidden={!isExpanded}
          className={[
            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isExpanded
              ? "grid-rows-[1fr]"
              : "pointer-events-none grid-rows-[0fr]",
          ].join(" ")}
        >
          <div className="min-h-0 overflow-hidden">
            <ol
              start={TIMELINE_PREVIEW_ITEM_COUNT + 1}
              className={[
                "relative space-y-6 pt-6 transition-opacity duration-300 lg:space-y-9 lg:pt-9",
                isExpanded ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              {remainingItems.map((item, index) =>
                renderTimelineItem(
                  item,
                  index + TIMELINE_PREVIEW_ITEM_COUNT,
                ),
              )}
            </ol>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-7 flex justify-center sm:mt-8">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls="timeline-full-journey"
          aria-label={toggleLabel}
          onClick={() => setIsExpanded((current) => !current)}
          className="theme-control group inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-center text-sm font-medium transition duration-300 active:scale-[0.98]"
        >
          <span className={isExpanded ? "sr-only" : undefined}>
            {toggleLabel}
          </span>
          <CaretDown
            aria-hidden="true"
            size={16}
            weight="bold"
            className={[
              "shrink-0 transition-transform duration-300",
              isExpanded ? "rotate-180" : "rotate-0",
            ].join(" ")}
          />
        </button>
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
            <Timeline copy={timelineCopy} />
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
