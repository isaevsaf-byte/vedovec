import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";
import ContactForm from "@/components/ContactForm";
import { getTeamMembers, getAboutPage } from "@/lib/sanity";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
}

const fallbackTeam = [
  { name: "Алексей Ведов", role: "Генеральный директор", bio: "Более 10 лет в таможенном деле. Специализируется на сложных импортных операциях и работе с госорганами.", initials: "АВ" },
  { name: "Нилуфар Рашидова", role: "Ведущий таможенный декларант", bio: "Сертифицированный специалист по таможенному декларированию. Эксперт по ТН ВЭД и классификации товаров.", initials: "НР" },
  { name: "Бахром Юсупов", role: "Руководитель отдела логистики", bio: "Специалист по международным перевозкам и координации цепочек поставок через Узбекистан.", initials: "БЮ" },
  { name: "Диля Хасанова", role: "Юрист по ВЭД", bio: "Специализируется на правовом сопровождении внешнеэкономической деятельности, разрешении таможенных споров.", initials: "ДХ" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [teamFromSanity, aboutFromSanity, t] = await Promise.all([
    getTeamMembers(locale).catch(() => []),
    getAboutPage(locale).catch(() => null),
    getTranslations({ locale }),
  ]);

  const about = aboutFromSanity ?? {};

  const teamMembers: { name: string; role: string; bio: string; initials: string }[] =
    teamFromSanity.length > 0
      ? teamFromSanity.map((m: { name: string; role: string; bio: string }) => ({
          ...m,
          initials: m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        }))
      : fallbackTeam;

  const fallbackValues = t.raw("about.values") as { icon: string; title: string; desc: string }[];
  const values: { icon: string; title: string; desc: string }[] =
    about.values?.length > 0 ? about.values : fallbackValues;

  const fallbackStats = [
    { number: "2019", label: t("about.stat1") },
    { number: "2000+", label: t("about.stat2") },
    { number: "12", label: t("about.stat3") },
    { number: "2", label: t("about.stat4") },
  ];
  const stats: { number: string; label: string }[] =
    about.stats?.length > 0 ? about.stats : fallbackStats;

  return (
    <>
      <div className="bg-gradient-to-br from-primary via-primary-navy to-black text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.pageTitle ?? t("about.pageTitle")}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{about.pageSubtitle ?? t("about.pageSubtitle")}</p>
        </div>
      </div>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {t("about.historyLabel")}
            </span>
            <h2 className="text-3xl font-bold text-primary mt-2 mb-6">{about.historyTitle ?? t("about.historyTitle")}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>{about.p1 ?? t("about.p1")}</p>
              <p>{about.p2 ?? t("about.p2")}</p>
              <p>{about.p3 ?? t("about.p3")}</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                  <div key={stat.number} className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{stat.number}</div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("about.valuesLabel")}
          </span>
          <h2 className="text-3xl font-bold text-primary mt-2">{t("about.valuesTitle")}</h2>
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

      <SectionWrapper>
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("about.teamLabel")}
          </span>
          <h2 className="text-3xl font-bold text-primary mt-2">{t("about.teamTitle")}</h2>
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

      <SectionWrapper className="bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.ctaTitle ?? t("about.ctaTitle")}</h2>
            <p className="text-slate-300 text-lg">{about.ctaSubtitle ?? t("about.ctaSubtitle")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
