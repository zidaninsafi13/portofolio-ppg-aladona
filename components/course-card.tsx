"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import type { Course, Locale } from "@/lib/portfolio-types";
import { assetPath } from "@/lib/asset-path";

interface CourseCardProps {
  course: Course;
  locale: Locale;
  actionLabel: string;
  kickerLabel: string;
  artifactLabel: string;
  onOpen: (course: Course, trigger: HTMLButtonElement) => void;
}

export function CourseCard({ course, locale, actionLabel, kickerLabel, artifactLabel, onOpen }: CourseCardProps) {
  return (
    <article className="catalog-card">
      <div className="catalog-visual" aria-hidden="true">
        {course.image ? <Image src={assetPath(course.image)} alt="" fill sizes="(max-width: 767px) 30vw, 7rem" className="object-cover" /> : <FileText size={22} />}
        <span className="catalog-code">{course.code}</span>
        <span className="catalog-file"><FileText size={12} />{artifactLabel}</span>
      </div>
      <div className="catalog-body min-w-0">
        <span className="catalog-kicker"><FileText size={14} aria-hidden="true" />{kickerLabel} / {course.tag[locale]}</span>
        <span className="catalog-title">{course.name[locale]}</span>
        <span className="catalog-summary">{course.summary[locale]}</span>
      </div>
      <button type="button" onClick={(event) => onOpen(course, event.currentTarget)} className="catalog-action focus-ring" aria-label={`${actionLabel}: ${course.name[locale]}`}>
        <span>{actionLabel}</span><ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </article>
  );
}
