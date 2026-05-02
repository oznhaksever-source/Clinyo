import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DilProvider } from "./locales/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medoqa - Sağlık Turizmi Platformu | Dental, Saç Ekimi, Göz Ameliyatı",
  description: "Türkiye'de diş tedavisi, saç ekimi, göz ameliyatı ve plastik cerrahi için en iyi klinikleri keşfedin. Ücretsiz teklif alın, karşılaştırın, en iyisini seçin.",
  keywords: "sağlık turizmi, diş implant türkiye, saç ekimi istanbul, göz ameliyatı, zirkonyum kaplama, medikal turizm",
  openGraph: {
    title: "Medoqa - Sağlık Turizmi Platformu",
    description: "Diş tedavisinden saç ekimine, göz ameliyatından plastik cerrahiye kadar en iyi klinikler tek platformda.",
    url: "https://www.medoqa.com",
    siteName: "Medoqa",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medoqa - Sağlık Turizmi Platformu",
    description: "Diş tedavisinden saç ekimine, göz ameliyatından plastik cerrahiye kadar en iyi klinikler.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.medoqa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <DilProvider>
          {children}
        </DilProvider>
      </body>
    </html>
  );
}