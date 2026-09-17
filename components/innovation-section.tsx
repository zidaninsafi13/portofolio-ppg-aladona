"use client";

import { Lightbulb } from "lucide-react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";

export function InnovationSection() {
  const { content } = usePortfolio();

  return (
    <section id="inovasi" data-journey="05" className="field-section section-pad journey-section journey-innovation scroll-mt-24">
      <span className="journey-index" aria-hidden="true">05</span>
      <div className="section-shell">
        <MotionSection><SectionHeader eyebrow={content.innovation.eyebrow} heading={content.innovation.heading} index="05" /></MotionSection>
        <MotionSection variant="panel" delay={.08} className="mt-10">
          <article className="innovation-essay">
            <div className="innovation-lead">
              <span className="innovation-status"><Lightbulb size={18} aria-hidden="true" />{content.innovation.status}</span>
              <h3>{content.innovation.title}</h3>
              <p>{content.innovation.description}</p>
            </div>
            <ol className="innovation-steps" aria-label={content.innovation.frameworkLabel}>
              {content.innovation.framework.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
            </ol>
            <ol className="innovation-points">
              {content.innovation.points.map((point, index) => (
                <li key={point.title}>
                  <span className="innovation-point-index">0{index + 1}</span>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </li>
              ))}
            </ol>
          </article>
        </MotionSection>
      </div>
    </section>
  );
}
