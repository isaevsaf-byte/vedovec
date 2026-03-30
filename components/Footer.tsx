import Link from "next/link";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">В</span>
              </div>
              <span className="text-xl font-bold">Vedovec</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Профессиональные таможенные услуги для бизнеса в Узбекистане.
              Надёжный партнёр для вашей внешнеэкономической деятельности.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-semibold text-white mb-4">Навигация</h3>
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
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
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
              <li>г. Ташкент, ул. Амира Темура, 1</li>
              <li className="flex gap-3 pt-2">
                <a
                  href="https://t.me/vedovec"
                  className="text-slate-300 hover:text-accent transition-colors font-medium"
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/998909733090"
                  className="text-slate-300 hover:text-accent transition-colors font-medium"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-sm">
            © {year} Vedovec. Все права защищены.
          </p>
          <p className="text-slate-500 text-xs">
            Таможенный брокер в Узбекистане
          </p>
        </div>
      </div>
    </footer>
  );
}
