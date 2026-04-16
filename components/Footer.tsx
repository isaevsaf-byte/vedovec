"use client";

import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/cases", label: t("nav.cases") },
    { href: "/about", label: t("nav.about") },
    { href: "/contacts", label: t("nav.contacts") },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo-white.svg" alt="Vedovec" className="h-8 w-auto" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.nav")}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.contacts")}</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="tel:+998909733090" className="hover:text-accent transition-colors">
                  +998 90 973-30-90
                </a>
              </li>
              <li>
                <a href="mailto:info@vedovec.uz" className="hover:text-accent transition-colors">
                  info@vedovec.uz
                </a>
              </li>
              <li>{t("contacts.addressValue")}</li>
              <li className="flex gap-3 pt-2">
                <a href="https://t.me/vedovec" className="text-slate-300 hover:text-accent transition-colors font-medium">
                  Telegram
                </a>
                <a href="https://wa.me/998909733090" className="text-slate-300 hover:text-accent transition-colors font-medium">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-sm">
            © {year} Vedovec. {t("footer.rights")}
          </p>
          <p className="text-slate-500 text-xs">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
