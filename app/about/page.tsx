import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import ContactForm from "@/components/ContactForm";
import { getTeamMembers } from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Vedovec — таможенный брокер в Ташкенте. 5 лет на рынке, более 500 клиентов. Команда профессиональных таможенных специалистов Узбекистана.",
};

const fallbackTeam = [
  { name: "Алексей Ведов", role: "Генеральный директор", bio: "Более 10 лет в таможенном деле. Специализируется на сложных импортных операциях и работе с госорганами.", initials: "АВ" },
  { name: "Нилуфар Рашидова", role: "Ведущий таможенный декларант", bio: "Сертифицированный специалист по таможенному декларированию. Эксперт по ТН ВЭД и классификации товаров.", initials: "НР" },
  { name: "Бахром Юсупов", role: "Руководитель отдела логистики", bio: "Специалист по международным перевозкам и координации цепочек поставок через Узбекистан.", initials: "БЮ" },
  { name: "Диля Хасанова", role: "Юрист по ВЭД", bio: "Специализируется на правовом сопровождении внешнеэкономической деятельности, разрешении таможенных споров.", initials: "ДХ" },
];

const values = [
  {
    title: "Прозрачность",
    desc: "Никаких скрытых платежей. Полный отчёт по каждой операции.",
    icon: "👁",
  },
  {
    title: "Скорость",
    desc: "Оформляем в установленные сроки. Гарантируем договором.",
    icon: "⚡",
  },
  {
    title: "Экспертиза",
    desc: "Сертифицированные декларанты с многолетним опытом.",
    icon: "🎓",
  },
  {
    title: "Поддержка 24/7",
    desc: "Вопросы возникают не только в рабочее время — мы всегда на связи.",
    icon: "📞",
  },
];

export default async function AboutPage() {
  const teamFromSanity = await getTeamMembers().catch(() => []);
  const teamMembers: { name: string; role: string; bio: string; initials: string }[] =
    teamFromSanity.length > 0
      ? teamFromSanity.map((m: { name: string; role: string; bio: string }) => ({
          ...m,
          initials: m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        }))
      : fallbackTeam;

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Наша компания
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">О компании Vedovec</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Мы помогаем бизнесу работать с международными рынками без таможенных
            сложностей с 2019 года.
          </p>
        </div>
      </div>

      {/* About text */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Наша история
            </span>
            <h2 className="text-3xl font-bold text-primary mt-2 mb-6">
              Основаны в 2019 году в Ташкенте
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Vedovec был основан командой профессионалов с опытом работы в государственных таможенных органах и частном секторе ВЭД. Мы видели, с какими сложностями сталкивается бизнес при импорте и экспорте, и решили создать компанию, которая берёт эти сложности на себя.
              </p>
              <p>
                Сегодня мы — один из ведущих таможенных брокеров Узбекистана. Наши клиенты — средний и крупный бизнес, работающий с Китаем, Турцией, Европой, Россией и странами ближнего зарубежья.
              </p>
              <p>
                Мы не просто оформляем документы — мы выстраиваем для клиентов оптимальные таможенные процессы, снижаем риски и экономим их деньги.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "2019", label: "год основания" },
                { number: "500+", label: "клиентов" },
                { number: "98%", label: "оформлений с первого раза" },
                { number: "12+", label: "специалистов в команде" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{stat.number}</div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-slate-50">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Наши принципы</span>
          <h2 className="text-3xl font-bold text-primary mt-2">Ценности компании</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Люди</span>
          <h2 className="text-3xl font-bold text-primary mt-2">Наша команда</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">{member.initials}</span>
              </div>
              <h3 className="font-bold text-slate-800">{member.name}</h3>
              <p className="text-accent text-sm font-medium mt-0.5 mb-2">{member.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Познакомимся ближе?
            </h2>
            <p className="text-slate-300 text-lg">
              Приходите на консультацию в наш офис в Ташкенте или оставьте
              заявку — перезвоним в удобное время.
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
