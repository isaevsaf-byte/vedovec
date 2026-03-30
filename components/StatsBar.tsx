"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface Stat {
  number: string;
  label: string;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

interface StatsBarProps {
  stats?: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  const t = useTranslations();
  const fallback = t.raw("fallbackStats") as Stat[];
  const data = stats && stats.length > 0 ? stats : fallback;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="bg-primary text-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {data.map((stat, index) => {
            const isSpecial = stat.number === "24/7" || stat.number.includes("+") || stat.number.includes("%");
            const numericValue = parseInt(stat.number.replace(/\D/g, ""), 10);
            const suffix = stat.number.includes("+") ? "+" : stat.number.includes("%") ? "%" : "";

            return (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {isInView ? (
                    isSpecial && isNaN(numericValue) ? (
                      stat.number
                    ) : (
                      <AnimatedCounter target={numericValue} suffix={suffix} />
                    )
                  ) : (
                    "0"
                  )}
                </div>
                <p className="text-slate-300 text-sm md:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
