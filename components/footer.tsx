"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { MotionSection } from "@/components/ui/motion-section";
import { assetPath } from "@/lib/asset-path";

export function Footer() {
  const { content } = usePortfolio();

  return (
    <footer className="field-section relative z-10 overflow-hidden bg-section py-10 sm:py-12">
      <div className="section-shell">
        <MotionSection>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="font-display text-2xl italic leading-[1.1] tracking-[-.015em] text-foreground sm:text-3xl lg:text-4xl"><span aria-hidden="true">&quot;</span>{content.footer.quote}<span aria-hidden="true">&quot;</span></p>
              <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[.14em] text-accent">- {content.footer.author}</p>
            </div>
            <a href="#hero" className="focus-ring inline-flex size-12 items-center justify-center border border-border-strong text-foreground transition-[transform,border-color] hover:-translate-y-1 hover:border-gold" aria-label={content.footer.backToTop}><ArrowUp size={18} aria-hidden="true" /></a>
          </div>
          <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><span className="footer-mark"><Image src={assetPath("/assets/favicon/favicon.jpeg")} alt={content.brand.title} width={36} height={36} /></span><p className="font-mono text-[.58rem] uppercase tracking-[.13em] text-muted">{content.footer.closing}</p></div>
            <p className="font-mono text-[.58rem] uppercase tracking-[.13em] text-muted">{content.footer.copyright}</p>
          </div>
        </MotionSection>
      </div>
    </footer>
  );
}
