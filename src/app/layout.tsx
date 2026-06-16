import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromoBar } from "@/components/layout/PromoBar";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Analytics } from "@/components/analytics/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Slab serif to match the Rally wordmark — used for headings & the logo.
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Exterior Lighting & Cleaning — Ohio Valley & Wheeling WV`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "permanent lighting",
    "Christmas lighting",
    "house washing",
    "roof washing",
    "soft washing",
    "concrete cleaning",
    "paver sealing",
    "commercial exterior cleaning",
    "Wheeling WV",
    "Ohio Valley",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Brighter Homes. Cleaner Properties.`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#173D59",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <PromoBar />
        <Header />
        {/* pb on mobile leaves room for the sticky CTA bar */}
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileCTABar />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
