"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

interface MotionSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  order?: number;
  variant?: "section" | "card" | "panel";
}

export function MotionSection({
  children,
  delay = 0,
  order,
  variant = "section",
  className,
  ...props
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.16, margin: "-8% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const visibleState =
    variant === "panel"
      ? { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }
      : variant === "card"
        ? { opacity: 1, x: 0, y: 0, scale: 1, rotateZ: 0, filter: "blur(0px)" }
        : { opacity: 1, y: 0 };
  const hiddenState =
    variant === "panel"
      ? { opacity: 0, y: 28, scale: .985, clipPath: "inset(0 0 12% 0)" }
      : variant === "card"
        ? { opacity: 0, x: 24, y: 18, scale: .97, rotateZ: .5, filter: "blur(4px)" }
        : { opacity: 0, y: 28 };
  const isVisible = Boolean(reduceMotion) || inView;

  return (
    <motion.div
      {...props}
      ref={ref}
      className={`motion-reveal-group motion-${variant}-reveal ${className ?? ""}`}
      data-order={order}
      data-motion-variant={variant}
      initial={reduceMotion ? false : hiddenState}
      animate={isVisible ? visibleState : hiddenState}
      transition={{
        duration: variant === "card" ? 0.84 : variant === "panel" ? 0.8 : 0.68,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
