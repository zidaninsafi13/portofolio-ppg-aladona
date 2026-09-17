"use client";

import { Globe2, GraduationCap } from "lucide-react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";

export function IdentitySection() {
  const { content } = usePortfolio();
  const [context, practice] = content.identity.cards;

  return (
    <section id="identitas" data-journey="01" className="field-section section-pad journey-section journey-identity scroll-mt-24 bg-section">
      <span className="journey-index" aria-hidden="true">01</span>
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <MotionSection>
            <SectionHeader eyebrow={content.identity.eyebrow} heading={content.identity.heading} index="01" />
          </MotionSection>
          <MotionSection variant="panel" delay={.08}>
            <div className="identity-dossier">
              <div className="dossier-row">
                <span className="dossier-label">{context.index}</span>
                <div>
                  <div className="flex items-center gap-3"><Globe2 size={17} className="text-gold" aria-hidden="true" /><h3 className="font-display text-2xl italic text-foreground sm:text-3xl">{context.title}</h3></div>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{context.description}</p>
                </div>
              </div>
              <div className="dossier-row">
                <span className="dossier-label">{practice.index}</span>
                <div>
                  <div className="flex items-center gap-3"><GraduationCap size={17} className="text-gold" aria-hidden="true" /><h3 className="font-display text-2xl italic text-foreground sm:text-3xl">{practice.title}</h3></div>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{practice.description}</p>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
