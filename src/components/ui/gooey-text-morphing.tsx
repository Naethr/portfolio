"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

const MAX_FRAME_DELTA_SECONDS = 0.1;

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const gooeyText1Ref = React.useRef<HTMLSpanElement>(null);
  const gooeyText2Ref = React.useRef<HTMLSpanElement>(null);
  const crispText1Ref = React.useRef<HTMLSpanElement>(null);
  const crispText2Ref = React.useRef<HTMLSpanElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const filterId = React.useId();

  const safeTexts = React.useMemo(() => {
    return texts.length > 0 ? texts : [""];
  }, [texts]);

  const longestText = React.useMemo(() => {
    return safeTexts.reduce((longest, text) => {
      return text.length > longest.length ? text : longest;
    }, safeTexts[0] ?? "");
  }, [safeTexts]);

  const textLayers = React.useMemo(() => {
    return [
      [gooeyText1Ref, crispText1Ref],
      [gooeyText2Ref, crispText2Ref],
    ] as const;
  }, []);

  React.useEffect(() => {
    const firstText = safeTexts[0] ?? "";
    const secondText = safeTexts[1] ?? firstText;

    const setLayerText = (layerIndex: 0 | 1, value: string) => {
      for (const layerRef of textLayers[layerIndex]) {
        if (layerRef.current) {
          layerRef.current.textContent = value;
        }
      }
    };

    const setLayerStyles = (
      layerIndex: 0 | 1,
      options: { opacity: string; filter: string; crispOpacity?: string },
    ) => {
      const [gooeyRef, crispRef] = textLayers[layerIndex];

      if (gooeyRef.current) {
        gooeyRef.current.style.filter = options.filter;
        gooeyRef.current.style.opacity = options.opacity;
      }

      if (crispRef.current) {
        crispRef.current.style.filter = "none";
        crispRef.current.style.opacity = options.crispOpacity ?? options.opacity;
      }
    };

    setLayerText(0, firstText);
    setLayerStyles(0, { opacity: "100%", crispOpacity: "100%", filter: "blur(0px)" });

    setLayerText(1, secondText);
    setLayerStyles(1, { opacity: "0%", crispOpacity: "0%", filter: "blur(0px)" });

    if (safeTexts.length <= 1) {
      return undefined;
    }

    let currentIndex = 0;
    let visibleLayer: 0 | 1 = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let previousTime = performance.now();

    const getHiddenLayer = (layerIndex: 0 | 1): 0 | 1 => (layerIndex === 0 ? 1 : 0);

    const setMorph = (fraction: number) => {
      const hiddenLayer = getHiddenLayer(visibleLayer);
      const eased = easeInOutCubic(clamp(fraction, 0, 1));
      const remaining = 1 - eased;

      setLayerStyles(hiddenLayer, {
        filter: `blur(${mix(7.5, 0, eased).toFixed(3)}px)`,
        opacity: `${mix(0, 74, Math.pow(eased, 1.08)).toFixed(3)}%`,
        crispOpacity: `${mix(0, 100, Math.pow(eased, 1.2)).toFixed(3)}%`,
      });

      setLayerStyles(visibleLayer, {
        filter: `blur(${mix(0, 5.6, eased).toFixed(3)}px)`,
        opacity: `${mix(82, 0, Math.pow(eased, 1.15)).toFixed(3)}%`,
        crispOpacity: `${Math.pow(remaining, 1.85) * 100}%`,
      });
    };

    const doCooldown = () => {
      morph = 0;
      const hiddenLayer = getHiddenLayer(visibleLayer);
      setLayerStyles(visibleLayer, { filter: "blur(0px)", opacity: "100%", crispOpacity: "100%" });
      setLayerStyles(hiddenLayer, { filter: "blur(0px)", opacity: "0%", crispOpacity: "0%" });
    };

    const doMorph = () => {
      let fraction = morph / morphTime;

      if (fraction > 1) {
        fraction = 1;
      }

      setMorph(fraction);

      if (fraction === 1) {
        currentIndex = (currentIndex + 1) % safeTexts.length;
        visibleLayer = getHiddenLayer(visibleLayer);
        const nextIndex = (currentIndex + 1) % safeTexts.length;
        const hiddenLayer = getHiddenLayer(visibleLayer);

        setLayerText(hiddenLayer, safeTexts[nextIndex] ?? "");
        cooldown = cooldownTime;
        morph = 0;
        doCooldown();
      }
    };

    const animate = (currentTime: number) => {
      frameRef.current = null;

      const delta = clamp(
        (currentTime - previousTime) / 1000,
        0,
        MAX_FRAME_DELTA_SECONDS,
      );
      previousTime = currentTime;

      if (cooldown > 0) {
        cooldown -= delta;
        if (cooldown < 0) {
          morph = -cooldown;
          cooldown = 0;
        }
      } else {
        morph += delta;
      }

      if (cooldown <= 0) {
        doMorph();
      } else {
        doCooldown();
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (frameRef.current !== null) {
        return;
      }

      previousTime = performance.now();
      frameRef.current = window.requestAnimationFrame(animate);
    };

    startAnimation();

    return () => {
      stopAnimation();
    };
  }, [cooldownTime, morphTime, safeTexts, textLayers]);

  return (
    <div className={cn("relative inline-grid place-items-center overflow-visible isolate", className)}>
      <span
        className={cn(
          "pointer-events-none col-start-1 row-start-1 invisible inline-flex items-center justify-center whitespace-pre px-[0.12em] py-[0.18em] text-center text-transparent",
          textClassName,
        )}
      >
        {longestText}
      </span>

      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-45%" y="-60%" width="190%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.72" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 124 -48"
            />
          </filter>
        </defs>
      </svg>

      <div className="col-start-1 row-start-1 inline-grid place-items-center overflow-visible">
        <div
          className="col-start-1 row-start-1 inline-grid place-items-center overflow-visible"
          aria-hidden="true"
          style={{ filter: `url(#${filterId})`, opacity: 0.78 }}
        >
          <span
            ref={gooeyText1Ref}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center justify-center select-none whitespace-pre px-[0.12em] py-[0.18em] text-center antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
              textClassName,
            )}
            style={{ filter: "blur(0px)", opacity: 1 }}
          >
            {safeTexts[0] ?? ""}
          </span>
          <span
            ref={gooeyText2Ref}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center justify-center select-none whitespace-pre px-[0.12em] py-[0.18em] text-center antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
              textClassName,
            )}
            style={{ filter: "blur(0px)", opacity: 0 }}
          >
            {safeTexts[1] ?? safeTexts[0] ?? ""}
          </span>
        </div>

        <div
          className="col-start-1 row-start-1 inline-grid place-items-center overflow-visible"
          style={{ transform: "translateZ(0.001px)" }}
        >
          <span
            ref={crispText1Ref}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center justify-center select-none whitespace-pre px-[0.12em] py-[0.18em] text-center antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
              textClassName,
            )}
            aria-hidden="true"
            style={{ opacity: 1 }}
          >
            {safeTexts[0] ?? ""}
          </span>
          <span
            ref={crispText2Ref}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center justify-center select-none whitespace-pre px-[0.12em] py-[0.18em] text-center antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
              textClassName,
            )}
            style={{ opacity: 0 }}
          >
            {safeTexts[1] ?? safeTexts[0] ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}
