'use client';

import { motion } from "motion/react";
import { useEffect, useState, type ComponentProps } from "react";

type GradientDotsProps = ComponentProps<typeof motion.div> & {
  dotSize?: number;
  spacing?: number;
  duration?: number;
  colorCycleDuration?: number;
  backgroundColor?: string;
};

export function GradientDots({
  dotSize = 8,
  spacing = 10,
  duration = 30,
  colorCycleDuration = 6,
  backgroundColor = "var(--background)",
  className,
  ...props
}: GradientDotsProps) {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const hexSpacing = spacing * 1.732;
  const restingBackgroundPosition = `
    0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
    0% 0%,
    0% 0%,
    0% 0%,
    0% 0px
  `;
  const shouldAnimate = isPageVisible;

  useEffect(() => {
    const root = document.documentElement;

    const syncPageVisibility = () => {
      const pageIsVisible = document.visibilityState === "visible";
      setIsPageVisible(pageIsVisible);
      root.dataset.pageHidden = pageIsVisible ? "false" : "true";
    };

    syncPageVisibility();
    document.addEventListener("visibilitychange", syncPageVisibility);

    return () => {
      document.removeEventListener("visibilitychange", syncPageVisibility);
      delete root.dataset.pageHidden;
    };
  }, []);

  return (
    <motion.div
      className={`absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, #f00, transparent 60%),
          radial-gradient(circle at 50% 50%, #ff0, transparent 60%),
          radial-gradient(circle at 50% 50%, #0f0, transparent 60%),
          radial-gradient(ellipse at 50% 50%, #00f, transparent 60%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
        backgroundPosition: restingBackgroundPosition,
      }}
      animate={
        shouldAnimate
          ? {
              backgroundPosition: [
                `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
                `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%`,
              ],
              filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
            }
          : {
              backgroundPosition: restingBackgroundPosition,
              filter: "hue-rotate(0deg)",
            }
      }
      transition={
        shouldAnimate
          ? {
              backgroundPosition: {
                duration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
              filter: {
                duration: colorCycleDuration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            }
          : { duration: 0 }
      }
      {...props}
    />
  );
}
