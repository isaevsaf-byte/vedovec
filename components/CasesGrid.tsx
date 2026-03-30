"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

interface CaseStudy {
  _id: string;
  title: string;
  slug?: { current: string };
  client_industry?: string;
  challenge?: string;
  result?: string;
  tags?: string[];
}

interface CasesGridProps {
  cases?: CaseStudy[];
  preview?: boolean;
}

export default function CasesGrid({ cases, preview = false }: CasesGridProps) {
  const t = useTranslations();
  const fallback = t.raw("fallbackCases") as CaseStudy[];
  const data = cases && cases.length > 0 ? cases : fallback.map((c, i) => ({ ...c, _id: String(i + 1) }));
  const displayData = preview ? data.slice(0, 3) : data;
  const taskLabel = t("cases.taskLabel");
  const resultLabel = t("cases.resultLabel");
  const allBtn = t("cases.allBtn");

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
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{taskLabel}</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{item.challenge}</p>
                </div>
              )}
              {item.result && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{resultLabel}</p>
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
            {allBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
