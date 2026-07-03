import React from 'react';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { LeadProvider } from '../context/LeadContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import LeadPopup from '../components/LeadPopup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'RC Services | Tax Compliance & Accounting Services India',
  description: 'Affordable GST Registration, GST Return Filing, FSSAI Registration, Income Tax (ITR) Filing, MSME, Tally & Zoho accounting services across India.',
  keywords: 'GST return filing, FSSAI registration, Income tax returns, ITR India, bookkeeping services, Zoho books set up, Tally ERP, MSME registration, RC Services',
  authors: [{ name: 'RC Services' }],
  openGraph: {
    title: 'RC Services | Tax & Accounting Consultants',
    description: 'Expert, affordable compliance and bookkeeping services for small business owners in India.',
    url: 'https://rcservices.vercel.app',
    siteName: 'RC Services',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  // Injecting JSON-LD LocalBusiness Schema Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "RC Services",
    "image": "https://rcservices.vercel.app/logo.png",
    "@id": "https://rcservices.vercel.app/#organization",
    "url": "https://rcservices.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Digital Office",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": []
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <head>
        {/* Google Analytics Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-XXXXXXXXX-X', 'auto');
              ga('send', 'pageview');
            `,
          }}
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col h-full bg-gray-50/20 text-gray-800 antialiased font-sans">
        <LeadProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <LeadPopup />
        </LeadProvider>
      </body>
    </html>
  );
}
