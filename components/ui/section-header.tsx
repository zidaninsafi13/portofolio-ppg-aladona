"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import type { HeadingParts } from "@/lib/portfolio-types";
import { useRef } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  heading: HeadingParts;
  description?: string;
  align?: "left" | "center";
  index?: string;
}

interface HeadingWord {
  value: string;
  accent: boolean;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.7em", filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.045 },
  },
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  index,
}: SectionHeaderProps) {
  const centered = align === "center";
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLSpanElement>(null);
  const headingInView = useInView(headingRef, { once: false, amount: 0.35, margin: "-12% 0px -12% 0px" });
  const words: HeadingWord[] = [
    ...heading.leading.split(/\s+/).map((value) => ({ value, accent: false })),
    ...heading.accent.split(/\s+/).map((value) => ({ value, accent: true })),
    ...heading.trailing.split(/\s+/).map((value) => ({ value, accent: false })),
  ];
  const accessibleHeading = [heading.leading, heading.accent, heading.trailing]
    .filter(Boolean)
    .join(" ");
  const eyebrowLabel = eyebrow.replace(/^\d+\s*\/\s*/, "");

  return (
    <header className={`relative max-w-5xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{index ? `${index} / ${eyebrowLabel}` : eyebrow}</p>
      <h2
        className={`section-heading mt-7 text-foreground ${centered ? "mx-auto" : ""}`}
        aria-label={accessibleHeading}
      >
        <motion.span
          ref={headingRef}
          className="inline"
          aria-hidden="true"
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion || headingInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={`${word.value}-${wordIndex}`}
              className={`mr-[0.22em] inline-block ${word.accent ? "section-heading-accent" : ""}`}
              variants={wordVariants}
            >
              {word.value}
            </motion.span>
          ))}
        </motion.span>
      </h2>
      {description ? (
        <p className={`mt-7 max-w-2xl border-l-2 border-accent pl-5 text-base leading-8 text-muted sm:text-lg ${centered ? "mx-auto border-l-0 pl-0" : ""}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
