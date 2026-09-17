"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpenCheck, Clock3 } from "lucide-react";
import { useRef, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { ReflectionModal } from "@/components/reflection-modal";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeader } from "@/components/ui/section-header";
import { courses } from "@/data/portfolio";
import type { Course } from "@/lib/portfolio-types";

export function CourseSection() {
  const { content, locale } = usePortfolio();
  const [semester, setSemester] = useState<1 | 2>(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const visibleCourses = courses.filter((course) => course.semester === semester);

  const openCourse = (course: Course, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setSelectedCourse(course);
  };

  return (
    <>
      <section id="mata-kuliah" data-journey="03" className="field-section section-pad course-library journey-section journey-courses relative scroll-mt-28 overflow-hidden">
        <span className="journey-index" aria-hidden="true">03</span>
        <div className="section-shell relative">
          <MotionSection>
            <div className="course-header-grid">
              <SectionHeader
                eyebrow={content.courses.eyebrow}
                heading={content.courses.heading}
                description={content.courses.description}
                index="03"
              />

              <div className="course-switcher" role="tablist" aria-label={content.courses.eyebrow}>
                {([1, 2] as const).map((number) => {
                  const selected = semester === number;
                  return (
                    <button
                      key={number}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`semester-panel-${number}`}
                      onClick={() => setSemester(number)}
                      className={`focus-ring px-4 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] transition-colors sm:px-5 ${selected ? "bg-accent text-on-accent" : "text-muted hover:bg-surface-subtle hover:text-foreground"}`}
                    >
                      {number === 1 ? content.courses.semesterOne : content.courses.semesterTwo}
                    </button>
                  );
                })}
              </div>
            </div>
          </MotionSection>

          <div className="mt-9">
            <AnimatePresence mode="wait">
              {visibleCourses.length > 0 ? (
                <motion.div
                  key={`semester-${semester}`}
                  id={`semester-panel-${semester}`}
                  role="tabpanel"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.34 }}
                  className="course-catalog"
                >
                  {visibleCourses.map((course, index) => (
                    <MotionSection
                      key={course.code}
                      variant="card"
                      order={index}
                      delay={index * 0.08}
                      className="h-full"
                    >
                      <CourseCard
                        course={course}
                        locale={locale}
                        actionLabel={content.courses.viewDetail}
                        kickerLabel={content.courses.cardKicker}
                        artifactLabel={content.modal.artifactPreview}
                        onOpen={openCourse}
                      />
                    </MotionSection>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`semester-${semester}-empty`}
                  id={`semester-panel-${semester}`}
                  role="tabpanel"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.34 }}
                  className="playbook-panel grid min-h-80 place-items-center p-8 text-center"
                >
                  <div className="max-w-xl">
                    <span className="mx-auto grid size-14 place-items-center border border-border bg-surface-subtle text-accent">
                      <Clock3 size={23} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-sans text-3xl font-extrabold uppercase tracking-[-0.045em] text-foreground">{content.courses.unavailableTitle}</h3>
                    <p className="mt-4 text-base leading-8 text-muted">{content.courses.unavailableDescription}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                      <BookOpenCheck size={15} aria-hidden="true" />
                      {content.courses.dataReadyLabel}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <ReflectionModal
        course={selectedCourse}
        returnFocusRef={returnFocusRef}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}
