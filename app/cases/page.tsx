import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CasesGrid from "@/components/CasesGrid";
import ContactForm from "@/components/ContactForm";
import { getCaseStudies } from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Примеры успешных таможенных оформлений: импорт оборудования, экспорт сельхозпродукции, регулярные поставки из Китая, Турции, ОАЭ.",
};

export default async function CasesPage() {
  const cases = await getCaseStudies().catch(() => []);
  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Наш опыт
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Кейсы клиентов</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Реальные задачи и результаты. Смотрите, как мы решали сложные
            таможенные вопросы для компаний из разных отраслей.
          </p>
        </div>
      </div>

      {/* Cases */}
      <SectionWrapper className="bg-slate-50">
        <CasesGrid cases={cases} />
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ваша задача станет нашим следующим кейсом
            </h2>
            <p className="text-slate-300 text-lg">
              Расскажите о вашем грузе — предложим решение.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <ContactForm compact />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
