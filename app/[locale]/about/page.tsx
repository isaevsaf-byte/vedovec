import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/SectionWrapper";
import ContactForm from "@/components/ContactForm";
import { getTeamMembers } from "@/lib/sanity";

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
  const [teamFromSanity, t] = await Promise.all([
    getTeamMembers(locale).catch(() => []),
    getTranslations({ locale }),
  ]);

  const teamMembers: { name: string; role: string; bio: string; initials: string }[] =
    teamFromSanity.length > 0
      ? teamFromSanity.map((m: { name: string; role: string; bio: string }) => ({
          ...m,
          initials: m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        }))
      : fallbackTeam;

  const values = t.raw("about.values") as { icon: string; title: string; desc: string }[];

  return (
    <>
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t("about.sectionLabel")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{t("about.pageTitle")}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{t("about.pageSubtitle")}</p>
        </div>
      </div>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {t("about.historyLabel")}
            </span>
            <h2 className="text-3xl font-bold text-primary mt-2 mb-6">{t("about.historyTitle")}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {(["2019", "2000+", "12", "2"] as const).map((num, i) => {
                const keys = ["stat1", "stat2", "stat3", "stat4"] as const;
                return (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{num}</div>
                    <p className="text-sm text-slate-500">{t(`about.${keys[i]}`)}</p>
                  </div>
                );
              })}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.ctaTitle")}</h2>
            <p className="text-slate-300 text-lg">{t("about.ctaSubtitle")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
