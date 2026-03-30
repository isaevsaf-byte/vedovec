"use client";

import { motion } from "framer-motion";

interface ClientLogo {
  _id: string;
  company_name: string;
  logo?: { asset?: { url?: string } };
}

const fallbackLogos = [
  "DANONE",
  "FERRERO",
  "РУСАГРО",
  "DOSHIRAK",
  "DILMAH",
  "SPLAT",
  "MARS",
  "INFAPRIM",
  "HAVAS",
];

interface ClientLogosProps {
  logos?: ClientLogo[];
}

export default function ClientLogos({ logos }: ClientLogosProps) {
  if (!logos || logos.length === 0) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {fallbackLogos.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="px-5 py-3 bg-slate-100 rounded-lg text-slate-500 font-semibold text-sm hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-default"
          >
            {name}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {logos.map((logo, i) => (
        <motion.div
          key={logo._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="grayscale hover:grayscale-0 transition-all duration-300"
        >
          {logo.logo?.asset?.url ? (
            <img
              src={logo.logo.asset.url}
              alt={logo.company_name}
              className="h-10 object-contain"
            />
          ) : (
            <div className="px-5 py-3 bg-slate-100 rounded-lg text-slate-500 font-semibold text-sm">
              {logo.company_name}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
