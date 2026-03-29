"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Service {
  _id: string;
  title: string;
  description: string;
  duration?: string;
  icon?: string;
  slug?: { current: string };
}

const fallbackServices: Service[] = [
  {
    _id: "1",
    title: "Таможенное оформление импорта",
    description:
      "Полное сопровождение ввоза товаров в Узбекистан: декларирование, расчёт пошлин, взаимодействие с таможней.",
    duration: "1–3 рабочих дня",
    icon: "import",
  },
  {
    _id: "2",
    title: "Таможенное оформление экспорта",
    description:
      "Подготовка и подача экспортных деклараций, оформление разрешительных документов для вывоза товаров.",
    duration: "1–2 рабочих дня",
    icon: "export",
  },
  {
    _id: "3",
    title: "Таможенный консалтинг",
    description:
      "Анализ ВЭД-рисков, подбор оптимального таможенного режима, снижение таможенной нагрузки для вашего бизнеса.",
    duration: "По запросу",
    icon: "consult",
  },
  {
    _id: "4",
    title: "Классификация товаров (ТН ВЭД)",
    description:
      "Правильное определение кода ТН ВЭД, предварительные классификационные решения, работа с спорными кодами.",
    duration: "1 рабочий день",
    icon: "classify",
  },
  {
    _id: "5",
    title: "Сертификация и разрешения",
    description:
      "Получение сертификатов соответствия, санитарных и фитосанитарных разрешений для ввоза товаров.",
    duration: "3–10 рабочих дней",
    icon: "cert",
  },
  {
    _id: "6",
    title: "Таможенный склад (СВХ)",
    description:
      "Временное хранение грузов под таможенным контролем, перегрузка и сортировка, ответственное хранение.",
    duration: "До 4 месяцев",
    icon: "warehouse",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  import: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  export: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  consult: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  classify: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
    </svg>
  ),
  cert: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  warehouse: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  ),
};

interface ServicesGridProps {
  services?: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const data = services && services.length > 0 ? services : fallbackServices;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((service, index) => (
        <motion.div
          key={service._id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
            {iconMap[service.icon || "import"] || iconMap["import"]}
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{service.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
          {service.duration && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Срок: {service.duration}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
