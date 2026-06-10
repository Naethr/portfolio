"use client";

import { GooeyText } from "@/components/ui/gooey-text-morphing";

type HeroGooeyTextProps = {
  texts: string[];
};

export function HeroGooeyText({ texts }: HeroGooeyTextProps) {
  return (
    <div className="relative flex min-h-[clamp(3.9rem,7.4vw,5.45rem)] min-w-[14ch] max-w-full items-center justify-center overflow-visible px-[0.34em] py-[0.22em] sm:min-h-[clamp(4.15rem,6.8vw,5.75rem)] sm:px-[0.42em] sm:py-[0.28em]">
      <GooeyText
        texts={texts}
        morphTime={1.08}
        cooldownTime={1.62}
        className="w-full overflow-visible px-[0.12em] py-[0.16em]"
        textClassName="bg-[linear-gradient(180deg,#7cb0ff_0%,#4389ff_46%,#b7d2ff_100%)] bg-clip-text text-[clamp(1.9rem,4.8vw,3.7rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-transparent antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]"
      />
    </div>
  );
}
