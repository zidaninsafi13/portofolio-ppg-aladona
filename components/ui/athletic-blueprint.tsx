"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function AthleticBlueprint() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const routeProgress = useSpring(scrollYProgress, {
    stiffness: 78,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div className="blueprint-backdrop" aria-hidden="true">
      <div className="blueprint-atmosphere" />
      <svg
        className="blueprint-field"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="field-static">
          <path d="M-180 172C80 26 294 64 480 206s354 178 576-14 398-156 566-14" />
          <path d="M-196 236C74 76 302 114 486 252s356 176 588-14 398-142 566-2" />
          <path d="M-210 304C72 134 292 170 480 306s372 172 608-4 388-126 568 8" />
          <path d="M-174 680C96 518 306 554 496 690s366 162 598-20 390-116 556 18" />
          <path d="M-194 744C86 574 314 612 500 746s376 152 612-18 382-104 552 22" />
          <ellipse cx="1110" cy="452" rx="238" ry="326" />
          <ellipse cx="1110" cy="452" rx="296" ry="392" />
          <path d="M118 96C286 172 350 130 432 72" />
          <path d="M1070 824C1192 740 1320 754 1468 846" />
        </g>

        {reduceMotion ? (
          <path
            className="blueprint-route"
            d="M110 742C250 610 360 710 470 570S675 500 720 420S860 255 1010 330S1195 250 1332 126"
            pathLength="1"
          />
        ) : (
          <motion.path
            className="blueprint-route"
            d="M110 742C250 610 360 710 470 570S675 500 720 420S860 255 1010 330S1195 250 1332 126"
            style={{ pathLength: routeProgress }}
          />
        )}

        <g className="field-markers">
          <circle cx="110" cy="742" r="11" />
          <circle cx="470" cy="570" r="11" />
          <circle cx="720" cy="420" r="11" />
          <circle cx="1010" cy="330" r="11" />
          <circle cx="1332" cy="126" r="11" />
        </g>
      </svg>
    </div>
  );
}
