'use client';

import RotatingText from "@/components/ui/rotating-text";

type HeroRotatingTextProps = {
  texts: string[];
};

export function HeroRotatingText({ texts }: HeroRotatingTextProps) {
  return (
    <RotatingText
      texts={texts}
      splitBy="words"
      mainClassName="min-h-[1.12em] text-[clamp(1.9rem,4.8vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--accent)]"
      viewportClassName="px-[0.02em] py-[0.08em]"
      initial={{ y: "20%", opacity: 0, filter: "blur(10px)" }}
      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
      exit={{ y: "-20%", opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      rotationInterval={2400}
    />
  );
}
