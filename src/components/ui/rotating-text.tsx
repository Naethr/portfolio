'use client';

import {
  AnimatePresence,
  motion,
  type Transition,
} from "motion/react";
import {
  forwardRef,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useState,
} from "react";

import "./rotating-text.css";

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type RotatingTextProps = {
  texts: string[];
  rotationInterval?: number;
  initial?: Record<string, string | number>;
  animate?: Record<string, string | number>;
  exit?: Record<string, string | number>;
  animatePresenceMode?: "sync" | "wait" | "popLayout";
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  viewportClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
};

export type RotatingTextHandle = {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
};

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
  function RotatingText(props, ref) {
    const {
      texts,
      transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
      initial = { y: "18%", opacity: 0, filter: "blur(8px)" },
      animate = { y: "0%", opacity: 1, filter: "blur(0px)" },
      exit = { y: "-18%", opacity: 0, filter: "blur(8px)" },
      animatePresenceMode = "sync",
      animatePresenceInitial = false,
      rotationInterval = 2400,
      loop = true,
      auto = true,
      splitBy = "words",
      onNext,
      mainClassName,
      viewportClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const totalTexts = texts.length;
    const currentText = texts[currentTextIndex] ?? "";
    const longestText = texts.reduce((longest, text) => {
      return text.length > longest.length ? text : longest;
    }, texts[0] ?? "");
    const segments =
      splitBy === "lines"
        ? currentText.split("\n")
        : splitBy === "words"
          ? currentText.split(" ")
          : splitBy === "characters"
            ? Array.from(currentText)
            : currentText.split(splitBy);

    const updateIndex = useEffectEvent((updater: (index: number) => number) => {
      setCurrentTextIndex((previousIndex) => {
        const nextIndex = updater(previousIndex);

        if (nextIndex !== previousIndex) {
          onNext?.(nextIndex);
        }

        return nextIndex;
      });
    });

    const next = () => {
      updateIndex((previousIndex) => {
        if (previousIndex >= totalTexts - 1) {
          return loop ? 0 : previousIndex;
        }

        return previousIndex + 1;
      });
    };

    const previous = () => {
      updateIndex((previousIndex) => {
        if (previousIndex <= 0) {
          return loop ? totalTexts - 1 : previousIndex;
        }

        return previousIndex - 1;
      });
    };

    const jumpTo = (index: number) => {
      updateIndex(() => Math.max(0, Math.min(index, totalTexts - 1)));
    };

    const reset = () => {
      updateIndex(() => 0);
    };

    const rotateToNext = useEffectEvent(() => {
      next();
    });

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [jumpTo, next, previous, reset],
    );

    useEffect(() => {
      if (!auto || totalTexts <= 1) return undefined;

      const intervalId = window.setInterval(() => {
        rotateToNext();
      }, rotationInterval);

      return () => window.clearInterval(intervalId);
    }, [auto, rotateToNext, rotationInterval, totalTexts]);

    useEffect(() => {
      if (currentTextIndex < totalTexts) return;

      setCurrentTextIndex(Math.max(0, totalTexts - 1));
    }, [currentTextIndex, totalTexts]);

    return (
      <motion.span
        className={cn("text-rotate", mainClassName)}
        {...rest}
      >
        <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
        <span
          className={cn("text-rotate-viewport", viewportClassName)}
          aria-hidden="true"
        >
          <span className="text-rotate-measure">{longestText}</span>
          <AnimatePresence
            mode={animatePresenceMode}
            initial={animatePresenceInitial}
          >
            <motion.span
              key={`${currentTextIndex}-${currentText}`}
              className={cn(
                splitBy === "lines" ? "text-rotate-lines" : "text-rotate-track",
                splitLevelClassName,
              )}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
            >
              {segments.map((segment, index) => (
                <span
                  key={`${segment}-${index}`}
                  className={cn(
                    splitBy === "lines" ? "text-rotate-line" : "text-rotate-word",
                    elementLevelClassName,
                  )}
                >
                  {segment}
                  {splitBy === "words" && index < segments.length - 1 ? (
                    <span className="text-rotate-space"> </span>
                  ) : null}
                </span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    );
  },
);

export default RotatingText;
