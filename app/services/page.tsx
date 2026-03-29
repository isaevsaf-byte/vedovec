import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Полный перечень таможенных услуг от Vedovec: импорт, экспорт, классификация товаров, сертификация, таможенный склад и консалтинг.",
};

const processSteps = [
  { step: "01", title: "Заявка", desc: "Вы описываете задачу — мы анализируем и консультируем бесплатно." },
  { step: "02", title: "Документы", desc: "Собираем необходимый пакет документов вместе с вами." },
  { step: "03", title: "Оформление", desc: "Подаём декларацию, взаимодействуем с таможней под ключ." },
  { step: "04", title: "Выпуск", desc: "Товар выпущен. Вы получаете все документы и отчёт." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Что мы делаем
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Наши услуги</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Полный спектр таможенного сопровождения для импортёров и экспортёров
            в Узбекистане. Работаем быстро, прозрачно и в рамках закона.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <SectionWrapper className="bg-slate-50">
        <ServicesGrid />
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Как это работает</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
            Процесс работы
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((item, i) => (
            <div key={i} className="relative">
              {i < processSteps.length - 1 && (
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

      {/* CTA */}
      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Нужна помощь с оформлением?
            </h2>
            <p className="text-slate-300 text-lg">
              Оставьте заявку — расскажем о стоимости и сроках для вашей задачи.
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
