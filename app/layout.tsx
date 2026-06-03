import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DilProvider } from "./locales/context";
import AIChat from "./components/AIChat";
import WhatsAppButon from "./components/WhatsAppButon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medoqa - Health Tourism Platform | Dental, Hair Transplant, Eye Surgery Turkey",
  description: "Find the best clinics in Turkey for dental treatment, hair transplant, eye surgery and plastic surgery. Get free quotes, compare verified clinics and choose the best.",
  keywords: "health tourism turkey, dental implant turkey, hair transplant istanbul, eye surgery turkey, medical tourism, zirconia crown, plastic surgery turkey",
  openGraph: {
    title: "Medoqa - Health Tourism Platform Turkey",
    description: "Verified clinics in Turkey for dental, hair transplant, eye surgery and more. Free quotes, transparent pricing, multilingual support.",
    url: "https://www.medoqa.com",
    siteName: "Medoqa",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.medoqa.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medoqa - Health Tourism Platform Turkey",
    description: "Verified clinics for dental, hair transplant, eye surgery in Turkey. Free quotes, transparent pricing, verified clinic network.",
    images: ["https://www.medoqa.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.medoqa.com",
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <DilProvider>
          {children}
          {/* <AIChat /> */}
          <WhatsAppButon />
        </DilProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JEPYH2JVLX" strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JEPYH2JVLX');
        `}</Script>
      </body>
    </html>
  );
}
