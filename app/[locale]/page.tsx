import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import StatsBar from "@/components/StatsBar";
import CasesGrid from "@/components/CasesGrid";
import ClientLogos from "@/components/ClientLogos";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import SectionWrapper from "@/components/SectionWrapper";
import { Link } from "@/lib/navigation";
import { getServices, getCaseStudies, getClientLogos, getCompany, getTestimonials, getPageHero, getHomeCta } from "@/lib/sanity";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [services, cases, logos, company, testimonials, hero, cta] = await Promise.all([
    getServices(locale).catch(() => []),
    getCaseStudies(locale).catch(() => []),
    getClientLogos().catch(() => []),
    getCompany(locale).catch(() => null),
    getTestimonials(locale).catch(() => []),
    getPageHero("home", locale).catch(() => null),
    getHomeCta(locale).catch(() => null),
  ]);

  const t = await getTranslations({ locale });
  const stats = company?.stats ?? undefined;

  return (
    <>
      <HeroSection hero={hero} />
      <StatsBar stats={stats} />

      {/* Services */}
      <SectionWrapper id="services" className="bg-slate-50">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("services.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>
        <ServicesGrid services={services} />
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
          >
            {t("services.allServicesBtn")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </SectionWrapper>

      {/* Cases */}
      <SectionWrapper id="cases">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("cases.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t("cases.title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t("cases.subtitle")}</p>
        </div>
        <CasesGrid cases={cases} preview />
      </SectionWrapper>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Clients */}
      <SectionWrapper className="bg-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-700">{t("clients.title")}</h2>
        </div>
        <ClientLogos logos={logos} />
      </SectionWrapper>

      {/* CTA */}
      {(() => {
        const ctaSectionLabel = cta?.sectionLabel ?? t("contact.sectionLabel");
        const ctaTitle = cta?.title ?? t("contact.title");
        const ctaSubtitle = cta?.subtitle ?? t("contact.subtitle");
        const fallbackBenefits = [
          t("contact.benefit1"),
          t("contact.benefit2"),
          t("contact.benefit3"),
          t("contact.benefit4"),
        ];
        const benefits: string[] =
          cta?.benefits?.length > 0
            ? cta.benefits.map((b: { text: string }) => b.text)
            : fallbackBenefits;
        return (
          <SectionWrapper className="bg-primary text-white" id="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                  {ctaSectionLabel}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{ctaTitle}</h2>
                <p className="text-slate-300 text-lg mb-6">{ctaSubtitle}</p>
                <ul className="space-y-3 text-slate-300">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">{t("form.title")}</h3>
                <ContactForm />
              </div>
            </div>
          </SectionWrapper>
        );
      })()}
    </>
  );
}
