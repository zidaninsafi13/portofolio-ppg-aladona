"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";

export function ExperienceTimeline() {
  const { content } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeItem = content.experience.items[activeIndex];

  return (
    <section id="pengalaman" data-journey="04" className="field-section section-pad journey-section journey-experience scroll-mt-24 bg-section">
      <span className="journey-index" aria-hidden="true">04</span>
      <div className="section-shell">
        <MotionSection><SectionHeader eyebrow={content.experience.eyebrow} heading={content.experience.heading} description={content.experience.description} index="04" /></MotionSection>
        <MotionSection variant="panel" delay={.08} className="mt-10">
          <div className="experience-flow">
            <div className="experience-tabs" role="tablist" aria-label={content.experience.eyebrow}>
              {content.experience.items.map((item, index) => {
                const active = index === activeIndex;
                return <button key={item.index} type="button" role="tab" aria-selected={active} aria-controls="experience-panel" onClick={() => setActiveIndex(index)} className={`focus-ring ${active ? "is-active" : ""}`}>
                  <span>{item.index}</span>{item.title}<ArrowRight size={15} aria-hidden="true" />
                </button>;
              })}
            </div>
            <div id="experience-panel" role="tabpanel" className="experience-story">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article key={`${activeIndex}-${activeItem.title}`} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : .3 }}>
                  <p className="experience-counter">{activeItem.index} / {String(content.experience.items.length).padStart(2, "0")}</p>
                  <h3>{activeItem.title}</h3>
                  <p className="experience-description">{activeItem.description}</p>
                  <blockquote><Quote size={18} aria-hidden="true" /><span>{content.experience.evidenceLabel}</span><p>{activeItem.evidence}</p></blockquote>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
