"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultLocale, siteContent } from "@/data/portfolio";
import type { Locale, Theme } from "@/lib/portfolio-types";

interface PortfolioContextValue {
  locale: Locale;
  theme: Theme;
  introComplete: boolean;
  content: (typeof siteContent)[Locale];
  completeIntro: () => void;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const initialTheme = document.documentElement.dataset.theme;
      if (initialTheme === "dark" || initialTheme === "light") return initialTheme;
    }
    return "light";
  });
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const syncStoredPreferences = window.setTimeout(() => {
      const savedLocale = window.localStorage.getItem("portfolio-locale");
      if (savedLocale === "id" || savedLocale === "en") {
        setLocaleState(savedLocale);
      }

      const initialTheme = document.documentElement.dataset.theme;
      if (initialTheme === "dark" || initialTheme === "light") {
        setTheme(initialTheme);
      }
    }, 0);

    return () => window.clearTimeout(syncStoredPreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const completeIntro = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      theme,
      introComplete,
      content: siteContent[locale],
      completeIntro,
      setLocale,
      toggleTheme,
    }),
    [completeIntro, introComplete, locale, setLocale, theme, toggleTheme],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}
