import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "Vedovec — Таможенный брокер в Узбекистане",
    template: "%s | Vedovec",
  },
  description:
    "Надежный партнер в сфере ВЭД и таможенного оформления грузов. 7 лет в Ташкенте, 2000+ деклараций, 12 специалистов. Импорт, экспорт, консалтинг по ВЭД.",
  keywords: [
    "таможенный брокер Узбекистан",
    "таможенное оформление Ташкент",
    "импорт экспорт Узбекистан",
    "ВЭД Узбекистан",
    "таможня Ташкент",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Vedovec",
    title: "Vedovec — Таможенный брокер в Узбекистане",
    description:
      "Надежный партнер в сфере ВЭД и таможенного оформления грузов в Ташкенте.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedovec — Таможенный брокер в Узбекистане",
    description:
      "Профессиональные таможенные услуги для бизнеса в Ташкенте.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
