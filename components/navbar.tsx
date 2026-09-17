"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/components/providers/portfolio-provider";
import { assetPath } from "@/lib/asset-path";
import type { Locale } from "@/lib/portfolio-types";

export function Navbar() {
  const { content, introComplete, locale, setLocale, theme, toggleTheme } = usePortfolio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const ready = Boolean(reduceMotion) || introComplete;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...content.navigation.map((item) => item.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-24% 0px -62% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [content.navigation]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const chooseLocale = (nextLocale: Locale) => { setLocale(nextLocale); setMenuOpen(false); };

  return (
    <header className={`site-nav pointer-events-none fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${scrolled || menuOpen ? "is-raised" : ""}`}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
        transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}
        className={`site-nav-inner pointer-events-auto mx-auto flex min-h-[4.4rem] w-[min(100%-1.5rem,80rem)] items-center justify-between gap-4 ${scrolled || menuOpen ? "is-raised" : ""}`}
      >
        <a href="#hero" className="site-nav-brand focus-ring flex min-w-0 items-center gap-3" aria-label={`${content.brand.title}, ${content.brand.subtitle}`}>
          <span className="site-nav-logo"><Image src={assetPath("/assets/logo-kampus/LOGO-UNP-Kediri.png")} alt="" width={38} height={38} priority /></span>
          <span className="min-w-0 leading-tight">
            <span className="site-nav-title block max-w-[12rem] whitespace-normal sm:max-w-none">{content.brand.title}</span>
            <span className="site-nav-subtitle mt-1 hidden truncate min-[410px]:block">{content.brand.subtitle}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {content.navigation.map((item, index) => {
            const id = item.href.slice(1);
            return <motion.a key={item.href} href={item.href} aria-current={activeSection === id ? "location" : undefined} initial={reduceMotion ? false : { opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: .15 + index * .04 }} className="site-nav-link nav-link focus-ring relative py-2"><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</motion.a>;
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="site-nav-locale flex p-0.5" role="group" aria-label={content.controls.languageLabel}>
            {(["id", "en"] as const).map((language) => <button key={language} type="button" onClick={() => chooseLocale(language)} aria-pressed={locale === language} className="focus-ring px-2.5 py-1.5">{language}</button>)}
          </div>
          <button type="button" onClick={toggleTheme} className="site-nav-control focus-ring grid size-9 place-items-center" aria-label={theme === "dark" ? content.controls.themeLight : content.controls.themeDark}>{theme === "dark" ? <Moon size={15} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}</button>
          <button type="button" onClick={() => setMenuOpen((current) => !current)} className="site-nav-control focus-ring grid size-9 place-items-center lg:hidden" aria-label={menuOpen ? content.controls.menuClose : content.controls.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {menuOpen ? <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} className="site-nav-mobile pointer-events-auto mx-auto w-[min(100%-1.5rem,80rem)] overflow-hidden lg:hidden">
          <div className="grid gap-0 pb-3 sm:grid-cols-2">
            {content.navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="site-nav-mobile-link focus-ring flex items-center justify-between px-2 py-4"><span>{item.label}</span><span>{String(index + 1).padStart(2, "0")}</span></a>)}
          </div>
        </motion.nav> : null}
      </AnimatePresence>
    </header>
  );
}
