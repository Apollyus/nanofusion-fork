import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const baseUrl = "https://nanofusion.cz";

export const metadata: Metadata = {
  title: {
    default: "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
    template: "%s | NANOfusion",
  },
  description:
    "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky. Více než 950 realizovaných projektů s garancí až 10 let.",
  keywords: [
    "čištění fasád",
    "čištění střech",
    "čištění dlažeb",
    "nano-ochrana",
    "impregnace",
    "čištění fotovoltaiky",
    "odstranění graffiti",
    "průmyslové čištění",
    "nátěry fasád",
    "protiskluzová úprava",
  ],
  authors: [{ name: "NANOfusion s.r.o." }],
  creator: "NANOfusion s.r.o.",
  publisher: "NANOfusion s.r.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: baseUrl,
    title: "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
    description:
      "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky. Více než 950 realizovaných projektů s garancí až 10 let.",
    siteName: "NANOfusion",
    images: [
      {
        url: `${baseUrl}/static/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "NANOfusion - Čištění a nano-ochrana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
    description:
      "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky.",
    images: [`${baseUrl}/static/logo.jpg`],
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "NANOfusion s.r.o.",
        "legalName": "NANOfusion s.r.o.",
        "image": `${baseUrl}/static/logo.jpg`,
        "@id": `${baseUrl}/#organization`,
        "url": baseUrl,
        "telephone": "+420774509409",
        "email": "info@nanofusion.cz",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Cezavy 627",
          "addressLocality": "Blučina",
          "postalCode": "664 56",
          "addressCountry": "CZ",
        },
        "geo": {
          "@type": "GeoCoordinates",
          latitude: 49.0553,
          longitude: 16.6432,
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "07:00",
          closes: "18:00",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          ratingValue: "4.95",
          reviewCount: "180",
          bestRating: "5",
        },
        "areaServed": [
          { "@type": "Country", name: "Česká republika" },
          { "@type": "City", name: "Brno" },
          { "@type": "City", name: "Praha" },
          { "@type": "City", name: "Olomouc" },
          { "@type": "City", name: "Zlín" },
          { "@type": "City", name: "Ostrava" },
        ],
        "sameAs": [
          "https://www.facebook.com/nanofusioncz",
          "https://www.instagram.com/nano_fusion_cz/",
          "https://www.linkedin.com/company/nanofusion/",
          "https://www.tiktok.com/@nano_fusion_cz",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "NANOfusion",
        "description":
          "Specialisté na čištění a nano-ochranu střech, fasád, dlažeb a fotovoltaiky v ČR",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "cs-CZ",
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Čištění a nano-ochrana povrchů",
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: {
          "@type": "Country",
          name: "Czech Republic",
        },
        description:
          "Profesionální hloubkové čištění a dlouhodobá nano-ochrana střech, fasád, zámkových dlažeb a fotovoltaických panelů.",
      },
    ],
  };

  return (
    <html
      lang="cs"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
