'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react";
import {
  siCss, siExpress, siGithub, siHtml5, siJavascript,
  siNextdotjs, siNodedotjs, siReact, siRuby,
  siRubyonrails, siTypescript, siVercel,
} from "simple-icons";

import type { PortfolioTranslations } from "@/data/translations";
import type { TimelineMilestone, TimelineTechnology } from "@/data/timeline";
import { createTimelineMotion } from "./timeline-motion";
import styles from "./timeline-section.module.css";

type TimelineCopy = PortfolioTranslations["timeline"];
const icons = {
  html: siHtml5, css: siCss, ruby: siRuby, github: siGithub, vercel: siVercel,
  rails: siRubyonrails, react: siReact,
  nextjs: siNextdotjs, javascript: siJavascript, typescript: siTypescript,
  node: siNodedotjs, express: siExpress,
};
const monochrome = new Set(["github", "vercel", "nextjs", "express"]);
const mediaQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(mediaQuery).matches;
const serverReducedMotion = () => true;
function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(mediaQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function TechnologyLogo({ technology }: { technology: TimelineTechnology }) {
  if (technology === "vscode" || technology === "openai") {
    const isOpenAI = technology === "openai";
    return (
      <span className={styles.logo} role="img" aria-label={isOpenAI ? "OpenAI" : "VS Code"} title={isOpenAI ? "OpenAI" : "VS Code"}>
        <Image src={isOpenAI ? "/images/stack/openai-blossom-dark.svg" : "/images/stack/vscode.svg"} alt="" width={21} height={21} className={isOpenAI ? styles.openaiDark : undefined} />
        {isOpenAI && <Image src="/images/stack/openai-blossom-light.svg" alt="" width={21} height={21} className={styles.openaiLight} />}
      </span>
    );
  }
  const icon = icons[technology];
  return (
    <span className={styles.logo} role="img" aria-label={icon.title} title={icon.title} style={{ color: technology === "css" ? "var(--timeline-css)" : monochrome.has(technology) ? "var(--timeline-logo)" : `#${icon.hex}` } as CSSProperties}>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="currentColor"><path d={icon.path} /></svg>
    </span>
  );
}

function Milestone({ item, index, decorative }: { item: TimelineMilestone; index: number; decorative: boolean }) {
  return (
    <li className={styles.milestone}>
      <div className={`${styles.orb} ${index % 3 === 2 ? styles.brassOrb : ""}`} aria-hidden="true">
        <Image src="/images/timeline/jade-sphere.webp" alt="" width={128} height={128} unoptimized draggable={false} />
      </div>
      <p className={styles.period}>{item.hidePeriod ? <><span className={styles.periodDot} aria-hidden="true" /><span className="sr-only">{item.period}</span></> : item.period}</p>
      <h4 className={styles.milestoneTitle}>{item.title}</h4>
      <p className={styles.description}>{item.description}</p>
      {item.technologies?.length ? <div className={styles.logos}>{item.technologies.map((technology) => <TechnologyLogo key={technology} technology={technology} />)}</div> : null}
      {item.resources?.map((resource) => <a key={resource.href} href={resource.href} tabIndex={decorative ? -1 : 0} className={styles.resource}>{resource.label}</a>)}
    </li>
  );
}

export function TimelineSection({ copy }: { copy: TimelineCopy }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const sequence = useRef<HTMLOListElement>(null);
  const controller = useRef<ReturnType<typeof createTimelineMotion> | null>(null);
  const [paused, setPaused] = useState(false);
  const [announced, setAnnounced] = useState<number | null>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, serverReducedMotion);

  useEffect(() => {
    if (!section.current || !viewport.current || !track.current || !sequence.current) return;
    const motion = createTimelineMotion({
      section: section.current, viewport: viewport.current, track: track.current,
      sequence: sequence.current, count: copy.items.length, onNavigate: setAnnounced,
    });
    controller.current = motion;
    return () => { motion.destroy(); controller.current = null; };
  }, [copy.items.length]);

  useEffect(() => { controller.current?.pause(paused); }, [paused, copy.items.length]);
  useEffect(() => { controller.current?.reduce(reduced); }, [reduced, copy.items.length]);

  return (
    <section ref={section} id="parcours" aria-labelledby="timeline-title" className={styles.section}>
      <div aria-hidden="true" className={styles.backdrop}><div className={styles.landscape} /></div>
      <header className={styles.header}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h3 id="timeline-title" className={styles.title}>{copy.title}</h3>
          <p className={styles.intro}>{copy.description}</p>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => controller.current?.navigate(-1)} aria-label={copy.previousLabel} aria-controls="timeline-viewport"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => setPaused((value) => !value)} disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? copy.reducedMotionLabel : paused ? copy.playLabel : copy.pauseLabel} title={reduced ? copy.reducedMotionLabel : paused ? copy.playLabel : copy.pauseLabel}>
            {paused || reduced ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => controller.current?.navigate(1)} aria-label={copy.nextLabel} aria-controls="timeline-viewport"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </header>
      <div ref={viewport} id="timeline-viewport" className={styles.viewport} role="group" aria-label={copy.navigationLabel} tabIndex={0} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          controller.current?.navigate(event.key === "ArrowRight" ? 1 : -1);
        }
        if (event.key === " " && !reduced) { event.preventDefault(); setPaused((value) => !value); }
      }}>
        <div ref={track} className={styles.track}>
          {[0, 1, 2, 3].map((repeat) => (
            <ol key={repeat} ref={repeat === 2 ? sequence : undefined} className={styles.sequence} aria-hidden={repeat !== 2 ? true : undefined} inert={repeat !== 2 ? true : undefined}>
              {copy.items.map((item, index) => <Milestone key={item.id} item={item} index={index} decorative={repeat !== 2} />)}
            </ol>
          ))}
        </div>
      </div>
      <p className={styles.hint}>{reduced ? copy.reducedMotionLabel : copy.interactionHint}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announced !== null && copy.items[announced] ? `${copy.items[announced].period} — ${copy.items[announced].title}` : ""}</p>
    </section>
  );
}
