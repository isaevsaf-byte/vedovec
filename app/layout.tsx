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
    "Профессиональные таможенные услуги для бизнеса в Ташкенте. Импорт, экспорт, таможенное оформление, консалтинг. 5 лет опыта, 500+ клиентов.",
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
      "Профессиональные таможенные услуги для бизнеса в Ташкенте. Импорт, экспорт, таможенное оформление, консалтинг.",
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
