"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Testimonial {
  _id: string;
  author_name: string;
  author_role: string;
  company: string;
  text: string;
}

interface Props {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  const t = useTranslations();

  const items: Testimonial[] =
    testimonials && testimonials.length > 0
      ? testimonials
      : (t.raw("fallbackTestimonials") as Testimonial[]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t("testimonials.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item._id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col"
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <p className="text-slate-600 leading-relaxed flex-1 mb-6 text-sm md:text-base">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-800">{item.author_name}</p>
                <p className="text-sm text-slate-500">
                  {item.author_role} · {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
