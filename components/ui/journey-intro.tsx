"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { assetPath } from "@/lib/asset-path";

const routeNodes = [
  { cx: 178, cy: 650 },
  { cx: 506, cy: 540 },
  { cx: 824, cy: 320 },
  { cx: 1250, cy: 210 },
];

export function JourneyIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const { completeIntro, content } = usePortfolio();

  const finishIntro = useCallback(() => {
    setIsVisible(false);
    completeIntro();
  }, [completeIntro]);

  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = "hidden";
    const dismissTimer = window.setTimeout(finishIntro, shouldReduceMotion ? 2000 : 3600);
    return () => {
      window.clearTimeout(dismissTimer);
      document.body.style.overflow = "";
    };
  }, [finishIntro, isVisible, shouldReduceMotion]);

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = "";
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") finishIntro();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finishIntro, isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="journey-intro"
          initial={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "-4%", scale: 1.025, filter: "blur(10px)" }
          }
          transition={{
            duration: shouldReduceMotion ? 0.18 : 0.82,
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-label={content.intro.label}
          role="status"
        >
          <div className="journey-intro-atmosphere" aria-hidden="true" />

          <svg
            className="journey-intro-map"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g className="journey-intro-contours">
              <path d="M-120 210C170 42 344 88 526 224S888 412 1116 214s382-118 494-14" />
              <path d="M-160 286C154 92 348 142 522 278S884 458 1140 264s370-108 486-12" />
              <path d="M-184 678C82 514 328 542 494 674s402 176 646-12 392-74 494 26" />
              <path d="M-202 748C92 572 302 604 482 730s406 158 670-20 370-56 486 30" />
              <ellipse cx="1040" cy="450" rx="226" ry="318" />
              <ellipse cx="1040" cy="450" rx="286" ry="382" />
            </g>

            <motion.path
              className="journey-intro-route"
              d="M178 650C334 694 388 552 506 540S682 430 824 320s278 36 426-110"
              pathLength="1"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.32,
                duration: shouldReduceMotion ? 0.1 : 2.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {routeNodes.map((node, index) => (
              <motion.g
                key={`${node.cx}-${node.cy}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.58 + index * 0.42,
                  duration: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              >
                <circle className="journey-intro-node-halo" cx={node.cx} cy={node.cy} r="18" />
                <circle className="journey-intro-node" cx={node.cx} cy={node.cy} r="5" />
              </motion.g>
            ))}
          </svg>

          <div className="journey-intro-layout">
            <section className="journey-intro-copy">
              <div className="journey-intro-brand">
                <Image src={assetPath("/assets/logo-kampus/LOGO-UNP-Kediri.png")} alt="" width={48} height={48} priority />
                <span>
                  <strong>{content.brand.title}</strong>
                  <small>{content.brand.subtitle}</small>
                </span>
              </div>
              <motion.p
                className="journey-intro-kicker"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.16, duration: 0.5 }}
              >
                {content.intro.label}
              </motion.p>

              <div className="journey-intro-title">
                {content.intro.title.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: "0.72em", filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.36 + index * 0.14,
                      duration: shouldReduceMotion ? 0.12 : 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <div className="journey-intro-steps">
                {content.intro.steps.map((step, index) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1.05 + index * 0.2 }}
                  >
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {step}
                  </motion.span>
                ))}
              </div>
              <motion.button
                type="button"
                className="journey-intro-enter focus-ring"
                onClick={finishIntro}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 1.55, duration: .45 }}
              >
                <span>{content.intro.enterLabel}</span>
                <span aria-hidden="true">↗</span>
              </motion.button>
            </section>

            <motion.aside
              className="journey-identity-scan"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.72,
                duration: shouldReduceMotion ? 0.12 : 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-hidden="true"
            >
              <div className="journey-scan-beam" />
              <div className="journey-scan-head">
                <span>{content.intro.scanLabel}</span>
                <span className="journey-scan-signal">{content.intro.status}</span>
              </div>
              <dl>
                {content.intro.scanRows.map((row, index) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1.08 + index * 0.2 }}
                  >
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </motion.div>
                ))}
              </dl>
              <motion.div
                className="journey-scan-ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 1.82 }}
              >
                <span /> {content.intro.status}
              </motion.div>
            </motion.aside>
          </div>

          <div className="journey-intro-progress" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.18,
                duration: shouldReduceMotion ? 0.1 : 2.85,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
