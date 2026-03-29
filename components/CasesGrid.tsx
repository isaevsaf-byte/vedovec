"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface CaseStudy {
  _id: string;
  title: string;
  slug?: { current: string };
  client_industry?: string;
  challenge?: string;
  result?: string;
  tags?: string[];
}

const fallbackCases: CaseStudy[] = [
  {
    _id: "1",
    title: "Оформление оборудования для текстильной фабрики",
    client_industry: "Текстильная промышленность",
    challenge: "Импорт специализированного ткацкого оборудования из Турции с нестандартной классификацией ТН ВЭД.",
    result: "Сэкономлено 15% на таможенных пошлинах, оформление за 2 дня вместо планируемых 5.",
    tags: ["Импорт", "Оборудование", "Турция"],
  },
  {
    _id: "2",
    title: "Экспорт сухофруктов в ОАЭ",
    client_industry: "Агропромышленный комплекс",
    challenge: "Сложная фитосанитарная сертификация, требования ОАЭ к маркировке и документации на арабском языке.",
    result: "Получены все разрешительные документы, груз отправлен в срок, клиент заключил долгосрочный контракт.",
    tags: ["Экспорт", "Агро", "ОАЭ"],
  },
  {
    _id: "3",
    title: "Регулярный импорт электроники из Китая",
    client_industry: "Розничная торговля",
    challenge: "Организация регулярных поставок потребительской электроники, минимизация простоев товара на таможне.",
    result: "Выстроен процесс с гарантией оформления за 24 часа, снижены операционные расходы на 20%.",
    tags: ["Импорт", "Электроника", "Китай"],
  },
];

interface CasesGridProps {
  cases?: CaseStudy[];
  preview?: boolean;
}

export default function CasesGrid({ cases, preview = false }: CasesGridProps) {
  const data = cases && cases.length > 0 ? cases : fallbackCases;
  const displayData = preview ? data.slice(0, 3) : data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="p-6 flex-1">
              {item.client_industry && (
                <span className="inline-block text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1 mb-3">
                  {item.client_industry}
                </span>
              )}
              <h3 className="text-base font-semibold text-slate-800 mb-3 leading-snug">
                {item.title}
              </h3>
              {item.challenge && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Задача</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{item.challenge}</p>
                </div>
              )}
              {item.result && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Результат</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{item.result}</p>
                </div>
              )}
            </div>
            {item.tags && item.tags.length > 0 && (
              <div className="px-6 pb-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {preview && data.length > 3 && (
        <div className="mt-10 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Все кейсы
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
