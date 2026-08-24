import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Display and body. One variable family carries the whole voice. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

/** The editorial aside — used only for notes and pull quotes. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

/** Every number, label, path and timestamp. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coderaft — Software Engineering Studio",
  description:
    "We design, engineer, deploy, and operate software systems. Product engineering, distributed systems, cloud infrastructure and security — built to survive real load.",
  keywords: [
    "software engineering studio",
    "product engineering",
    "distributed systems",
    "cloud infrastructure",
    "API engineering",
    "security engineering",
    "machine learning systems",
    "MVP development",
    "enterprise software",
  ],
  openGraph: {
    title: "Coderaft — Software Engineering Studio",
    description: "We design, engineer, deploy, and operate software systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
