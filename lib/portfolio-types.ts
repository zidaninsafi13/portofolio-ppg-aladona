export type Locale = "id" | "en";
export type Theme = "dark" | "light";
export type LocalizedText = Record<Locale, string>;

export interface HeadingParts { leading: string; accent: string; trailing: string }
export interface NavigationItem { href: string; label: string }
export interface IdentityCard { index: string; title: string; description: string; icon: "globe" | "teacher"; tone: "accent" | "gold" }
export interface LearningParagraph { label: string; text: string }
export interface TimelineItem { index: string; title: string; description: string; evidence: string }
export interface InnovationPoint { title: string; description: string }
export interface RoadmapItem { index: string; title: string; description: string; icon: "target" | "heart" | "growth" }

export interface SiteContent {
  skipLink: string;
  brand: { title: string; subtitle: string };
  intro: { label: string; title: string[]; steps: string[]; scanLabel: string; scanRows: { label: string; value: string }[]; status: string; enterLabel: string };
  navigation: NavigationItem[];
  controls: { menuOpen: string; menuClose: string; themeDark: string; themeLight: string; languageLabel: string };
  hero: { badge: string; heading: HeadingParts; description: string; primaryCta: string; secondaryCta: string; role: string; profileLabel: string; profileName: string; profileAlt: string; focusOne: string; focusOneLabel: string; focusTwo: string; focusTwoLabel: string; location: string; year: string; scrollHint: string };
  identity: { eyebrow: string; heading: HeadingParts; cards: IdentityCard[] };
  learning: { eyebrow: string; heading: HeadingParts; intro: string; paragraphs: LearningParagraph[] };
  courses: { eyebrow: string; heading: HeadingParts; description: string; semesterOne: string; semesterTwo: string; viewDetail: string; cardKicker: string; unavailableTitle: string; unavailableDescription: string; dataReadyLabel: string };
  modal: { close: string; artifactPreview: string; openPdf: string; artifactUnavailable: string; artifactUnavailableHint: string; connection: string; challenge: string; concept: string; change: string };
  experience: { eyebrow: string; heading: HeadingParts; description: string; evidenceLabel: string; items: TimelineItem[] };
  innovation: { eyebrow: string; heading: HeadingParts; title: string; status: string; description: string; frameworkLabel: string; framework: string[]; points: InnovationPoint[] };
  roadmap: { eyebrow: string; heading: HeadingParts; stepLabel: string; items: RoadmapItem[] };
  footer: { quote: string; author: string; closing: string; copyright: string; backToTop: string };
}

export interface Course {
  code: string;
  semester: 1 | 2;
  image?: string;
  pdf?: string;
  tag: LocalizedText;
  name: LocalizedText;
  summary: LocalizedText;
  reflection: { connection: LocalizedText; challenge: LocalizedText; concept: LocalizedText; change: LocalizedText };
}
