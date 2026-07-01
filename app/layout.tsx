import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./styles/styles.css";
import "./styles/site.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Fonts self-hosted by Next — replaces the Google Fonts @import that used to
// live in tokens/fonts.css. These CSS variables feed --font-sans / --font-mono
// (see tokens/typography.css).
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chailuvgidwani.com"),
  title: {
    default: "Chailuv Gidwani — Campaigns & Photography",
    template: "%s — Chailuv Gidwani",
  },
  description:
    "Chailuv Gidwani runs political campaigns and takes photographs in Chicago, Illinois. Field programs, budgets, and the margins that decide races.",
  openGraph: {
    title: "Chailuv Gidwani — Campaigns & Photography",
    description: "Political campaigns and photography. Chicago, Illinois.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${plexMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
