import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { assetPath } from "@/lib/asset-path";
import "./globals.css";

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aladona Khairulloh Ibrahim | Portofolio PPG PJOK",
  description: "Portofolio reflektif Aladona Khairulloh Ibrahim selama PPG Prajabatan PJOK.",
  applicationName: "Portofolio PPG PJOK Aladona Khairulloh Ibrahim",

  authors: [
    {
      name: "Aladona Khairulloh Ibrahim",
    },
  ],

  keywords: [
    "PPG Prajabatan",
    "PJOK",
    "portofolio calon guru",
    "refleksi pembelajaran",
  ],

  icons: {
    icon: [
      {
        url: assetPath("/assets/favicon/favicon.jpeg"),
        type: "image/jpeg",
      },
    ],

    shortcut: assetPath("/assets/favicon/favicon.jpeg"),
    apple: assetPath("/assets/favicon/favicon.jpeg"),
  },

  openGraph: {
    title: "Aladona Khairulloh Ibrahim | Portofolio PPG PJOK",
    description: "Perjalanan belajar, praktik, dan refleksi calon guru PJOK.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#12243a",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f5f9ff",
    },
  ],
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');

      const theme =
        saved === 'light' || saved === 'dark'
          ? saved
          : (
              matchMedia('(prefers-color-scheme: light)').matches
                ? 'light'
                : 'dark'
            );

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
