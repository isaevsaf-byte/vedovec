import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Vedovec — Таможенный брокер в Узбекистане",
    uz: "Vedovec — O'zbekistonda bojxona brokeri",
    en: "Vedovec — Customs Broker in Uzbekistan",
  };
  const descriptions: Record<string, string> = {
    ru: "Надежный партнер в сфере ВЭД и таможенного оформления грузов. 7 лет в Ташкенте, 2000+ деклараций, 12 специалистов.",
    uz: "TFD va bojxona rasmiylashtirishda ishonchli hamkor. Toshkentda 7 yil, 2000+ deklaratsiya, 12 mutaxassis.",
    en: "Reliable partner in foreign trade and customs clearance. 7 years in Tashkent, 2000+ declarations, 12 specialists.",
  };

  return {
    title: {
      default: titles[locale] ?? titles.ru,
      template: "%s | Vedovec",
    },
    description: descriptions[locale] ?? descriptions.ru,
    keywords: [
      "таможенный брокер Узбекистан",
      "таможенное оформление Ташкент",
      "customs broker Uzbekistan",
      "bojxona brokeri O'zbekiston",
      "ВЭД Узбекистан",
    ],
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "uz" ? "uz_UZ" : "en_US",
      siteName: "Vedovec",
      title: titles[locale] ?? titles.ru,
      description: descriptions[locale] ?? descriptions.ru,
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ru" | "uz" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={manrope.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
