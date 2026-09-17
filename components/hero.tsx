"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDownRight, BookOpen, MapPin } from "lucide-react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { assetPath } from "@/lib/asset-path";
import { useRef } from "react";

export function Hero() {
  const { content, introComplete } = usePortfolio();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.18, margin: "-8% 0px -12% 0px" });
  const ready = Boolean(reduceMotion) || (introComplete && heroInView);
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: .65, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  const accessibleHeading = [content.hero.heading.leading, content.hero.heading.accent, content.hero.heading.trailing].filter(Boolean).join(" ");

  return (
    <section ref={heroRef} id="hero" data-journey="00" className="hero-section journey-section journey-hero scroll-mt-24">
      <span className="journey-index" aria-hidden="true">00</span>
      <div className="section-shell hero-layout">
        <div className="hero-copy">
          <motion.p {...enter(.04)} className="hero-kicker">{content.hero.badge}</motion.p>
          <motion.h1 {...enter(.12)} className="hero-title" aria-label={accessibleHeading}>
            <span>{content.hero.heading.leading}</span>
            <em>{content.hero.heading.accent}</em>
            <span>{content.hero.heading.trailing}</span>
          </motion.h1>
          <motion.p {...enter(.2)} className="hero-summary">{content.hero.description}</motion.p>
          <motion.div {...enter(.28)} className="hero-actions">
            <a href="#refleksi" className="tactical-button tactical-button-primary focus-ring">
              {content.hero.primaryCta}<ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a href="#mata-kuliah" className="tactical-button focus-ring">
              <BookOpen size={16} aria-hidden="true" />{content.hero.secondaryCta}
            </a>
          </motion.div>
          <motion.div {...enter(.36)} className="hero-notes">
            <span><MapPin size={14} aria-hidden="true" />{content.hero.location}</span>
            <span>{content.hero.role}</span>
            <span>{content.hero.year}</span>
          </motion.div>
        </div>

        <motion.aside {...enter(.16)} className="profile-dossier" aria-label={content.hero.profileLabel}>
          <div className="profile-dossier-head">
            <span>{content.hero.profileLabel}</span>
            <span>{content.hero.year}</span>
          </div>
          <div className="profile-dossier-photo">
            <Image
              src={assetPath("/assets/profile/profile-1.jpeg")}
              alt={content.hero.profileAlt}
              fill
              priority
              quality={82}
              sizes="(max-width: 767px) 88vw, (max-width: 1024px) 42vw, 25rem"
              className="object-cover object-[50%_34%]"
            />
            <span className="profile-dossier-index">{content.hero.year}</span>
            <div className="profile-dossier-caption">
              <strong>{content.hero.profileName}</strong>
              <span>{content.hero.role}</span>
            </div>
          </div>
          <div className="profile-dossier-meta">
            <div>
              <span>{content.hero.focusOneLabel}</span>
              <strong>{content.hero.focusOne}</strong>
            </div>
            <div>
              <span>{content.hero.focusTwoLabel}</span>
              <strong>{content.hero.focusTwo}</strong>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
