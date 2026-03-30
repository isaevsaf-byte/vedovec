"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/lib/navigation";

const LOCALES = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/services" as const, label: t("services") },
    { href: "/cases" as const, label: t("cases") },
    { href: "/about" as const, label: t("about") },
    { href: "/contacts" as const, label: t("contacts") },
  ];

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Vedovec" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                    locale === code
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <a
              href="tel:+998909733090"
              className="text-primary font-semibold hover:text-accent transition-colors text-sm"
            >
              {t("phone")}
            </a>
            <Link
              href="/contacts"
              className="bg-accent text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-accent-dark transition-colors duration-200"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen border-t border-slate-100" : "max-h-0"}`}>
        <nav className="bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-700 hover:text-primary font-medium py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { switchLocale(code); setIsMenuOpen(false); }}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  locale === code ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a href="tel:+998909733090" className="text-primary font-semibold">
            {t("phone")}
          </a>
          <Link
            href="/contacts"
            onClick={() => setIsMenuOpen(false)}
            className="bg-accent text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-accent-dark transition-colors"
          >
            {t("cta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
