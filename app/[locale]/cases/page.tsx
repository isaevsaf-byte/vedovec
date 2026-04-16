import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";
import CasesGrid from "@/components/CasesGrid";
import ContactForm from "@/components/ContactForm";
import { getCaseStudies } from "@/lib/sanity";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return { title: t("pageTitle") };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cases, t] = await Promise.all([
    getCaseStudies(locale).catch(() => []),
    getTranslations({ locale }),
  ]);

  return (
    <>
      <div className="bg-gradient-to-br from-primary via-primary-navy to-black text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("cases.sectionLabel")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{t("cases.pageTitle")}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{t("cases.pageSubtitle")}</p>
        </div>
      </div>

      <SectionWrapper className="bg-slate-50">
        <CasesGrid cases={cases} />
      </SectionWrapper>

      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cases.ctaTitle")}</h2>
            <p className="text-slate-300 text-lg">{t("cases.ctaSubtitle")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
