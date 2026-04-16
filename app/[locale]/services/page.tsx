import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";
import { getServices } from "@/lib/sanity";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("pageTitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [services, t] = await Promise.all([
    getServices(locale).catch(() => []),
    getTranslations({ locale }),
  ]);

  const process = t.raw("services.process") as { step: string; title: string; desc: string }[];

  return (
    <>
      <div className="bg-gradient-to-br from-primary via-primary-navy to-black text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("services.sectionLabel")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{t("services.pageTitle")}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{t("services.pageSubtitle")}</p>
        </div>
      </div>

      <SectionWrapper className="bg-slate-50">
        <ServicesGrid services={services} />
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("services.processLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
            {t("services.processTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, i) => (
            <div key={i} className="relative">
              {i < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -translate-x-4 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-accent">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.ctaTitle")}</h2>
            <p className="text-slate-300 text-lg">{t("services.ctaSubtitle")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
