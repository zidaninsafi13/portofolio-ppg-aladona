"use client";

import { HeartHandshake, Target, TrendingUp } from "lucide-react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";

const icons = { target: Target, heart: HeartHandshake, growth: TrendingUp };

export function RoadmapSection() {
  const { content } = usePortfolio();

  return (
    <section id="rencana" data-journey="06" className="field-section section-pad journey-section journey-roadmap scroll-mt-24">
      <span className="journey-index" aria-hidden="true">06</span>
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <MotionSection><SectionHeader eyebrow={content.roadmap.eyebrow} heading={content.roadmap.heading} index="06" /></MotionSection>
          <div className="roadmap-list border-t-2 border-accent">
            {content.roadmap.items.map((item, index) => {
              const Icon = icons[item.icon];
              return <MotionSection key={item.index} variant="card" order={index} delay={index * .08}>
                <article className="grid gap-4 border-b border-border py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8">
                  <span className="font-mono text-sm text-gold">{item.index}</span>
                  <div><h3 className="font-display text-3xl italic text-foreground">{item.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-muted">{item.description}</p></div>
                  <Icon size={22} className="text-accent sm:mt-1" aria-hidden="true" />
                </article>
              </MotionSection>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
