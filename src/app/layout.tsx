import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
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
    default: "Nexus — Scale teams. Grow talent. Deliver products.",
    template: "%s · Nexus",
  },
  description:
    "Nexus connects strong engineers with ambitious products. Staff augmentation, dedicated teams, and custom product delivery — with a growth ecosystem built for engineers.",
  keywords: [
    "software outsourcing",
    "staff augmentation",
    "dedicated teams",
    "remote developers",
    "engineering partner",
    "talent network",
  ],
  openGraph: {
    title: "Nexus — Scale teams. Grow talent. Deliver products.",
    description:
      "Curated engineering talent, dedicated teams, and end-to-end product delivery.",
    type: "website",
    siteName: "Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus — Scale teams. Grow talent. Deliver products.",
    description:
      "Curated engineering talent, dedicated teams, and end-to-end product delivery.",
  },
};

export const viewport: Viewport = {
  themeColor: "#eafbff",
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
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
