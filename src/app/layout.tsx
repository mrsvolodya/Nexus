import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexus.dev"),
  title: {
    default: "Nexus — Engineering teams that scale",
    template: "%s · Nexus",
  },
  description:
    "Nexus connects top developers with ambitious products. We build and place world-class engineering teams for companies that move fast.",
  keywords: [
    "software outsourcing",
    "staff augmentation",
    "dedicated teams",
    "remote developers",
    "engineering partner",
  ],
  openGraph: {
    title: "Nexus — Engineering teams that scale",
    description:
      "Curated engineering talent, dedicated teams, and end-to-end product delivery.",
    type: "website",
    siteName: "Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — Engineering teams that scale",
    description:
      "Curated engineering talent, dedicated teams, and end-to-end product delivery.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
