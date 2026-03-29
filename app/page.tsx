import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import StatsBar from "@/components/StatsBar";
import CasesGrid from "@/components/CasesGrid";
import ClientLogos from "@/components/ClientLogos";
import ContactForm from "@/components/ContactForm";
import SectionWrapper from "@/components/SectionWrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsBar />

      {/* Services */}
      <SectionWrapper id="services" className="bg-slate-50">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Что мы делаем</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Наши услуги
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Полный спектр таможенных услуг — от консультации до финального
            оформления. Берём на себя весь бюрократический процесс.
          </p>
        </div>
        <ServicesGrid />
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Все услуги
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </SectionWrapper>

      {/* Cases */}
      <SectionWrapper id="cases">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Наш опыт</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Кейсы клиентов
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Реальные задачи, которые мы решали для наших клиентов. Конкретные
            результаты в цифрах.
          </p>
        </div>
        <CasesGrid preview />
      </SectionWrapper>

      {/* Client Logos */}
      <SectionWrapper className="bg-slate-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-700">
            Нам доверяют ведущие компании Узбекистана
          </h2>
        </div>
        <ClientLogos />
      </SectionWrapper>

      {/* Contact CTA */}
      <SectionWrapper className="bg-primary text-white" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Готовы начать?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Получите бесплатную консультацию
            </h2>
            <p className="text-slate-300 text-lg mb-6">
              Расскажите о вашей задаче — мы свяжемся в течение 30 минут и
              предложим оптимальное решение.
            </p>
            <ul className="space-y-3 text-slate-300">
              {[
                "Бесплатная первичная консультация",
                "Расчёт стоимости за 1 час",
                "Гарантия сроков оформления",
                "Персональный менеджер",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Оставить заявку
            </h3>
            <ContactForm compact />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
