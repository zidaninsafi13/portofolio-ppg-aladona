import { CourseSection } from "@/components/course-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { IdentitySection } from "@/components/identity-section";
import { InnovationSection } from "@/components/innovation-section";
import { LearningReflection } from "@/components/learning-reflection";
import { Navbar } from "@/components/navbar";
import { PortfolioProvider } from "@/components/providers/portfolio-provider";
import { RoadmapSection } from "@/components/roadmap-section";
import { AthleticBlueprint } from "@/components/ui/athletic-blueprint";
import { JourneyIntro } from "@/components/ui/journey-intro";
import { SkipLink } from "@/components/ui/skip-link";

export function PortfolioPage() {
  return (
    <PortfolioProvider>
      <JourneyIntro />
      <SkipLink />
      <div id="site-shell" className="site-shell">
        <AthleticBlueprint />
        <Navbar />
        <main id="main-content" className="relative z-10" tabIndex={-1}>
          <Hero />
          <IdentitySection />
          <LearningReflection />
          <CourseSection />
          <ExperienceTimeline />
          <InnovationSection />
          <RoadmapSection />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
