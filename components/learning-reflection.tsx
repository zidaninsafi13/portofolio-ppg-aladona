"use client";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";

export function LearningReflection() {
  const { content } = usePortfolio();

  return (
    <section id="refleksi" data-journey="02" className="field-section section-pad journey-section journey-reflection scroll-mt-24">
      <span className="journey-index" aria-hidden="true">02</span>
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <MotionSection>
            <div className="lg:sticky lg:top-28"><SectionHeader eyebrow={content.learning.eyebrow} heading={content.learning.heading} description={content.learning.intro} index="02" /></div>
          </MotionSection>
          <div className="reflection-essay-list">
            {content.learning.paragraphs.map((paragraph, index) => (
              <MotionSection key={paragraph.label} variant="card" order={index} delay={index * .08}>
                <article className={`reflection-essay-item ${index === 1 ? "reflection-gold" : index === 2 ? "reflection-violet" : index === 3 ? "reflection-green" : ""}`}>
                  <div className="reflection-essay-heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{paragraph.label}</h3>
                  </div>
                  <p>{paragraph.text}</p>
                </article>
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
