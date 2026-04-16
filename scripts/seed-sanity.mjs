/**
 * Скрипт: переносит все данные из fallback JSON в Sanity
 * Запуск: node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ctv01nlp",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Услуги ────────────────────────────────────────────────────────────────────
const services = [
  {
    ru: { title: "Таможенное оформление импорта и экспорта", description: "Оформление грузовых таможенных деклараций любой сложности — от FMCG до промышленного оборудования. Более 2000 деклараций в 2025 году.", duration: "1–3 рабочих дня" },
    uz: { title: "Import va eksport bojxona rasmiylashtiruvi", description: "Har qanday murakkablikdagi bojxona yuk deklaratsiyalari — FMCGdan sanoat uskunalarigacha. 2025 yilda 2000 dan ortiq deklaratsiya.", duration: "1–3 ish kuni" },
    en: { title: "Import & Export Customs Clearance", description: "Customs declarations of any complexity — from FMCG to industrial equipment. Over 2000 declarations in 2025.", duration: "1–3 business days" },
    icon: "import", order: 1,
  },
  {
    ru: { title: "Консультации по ВЭД и логистике", description: "Разбираем ваш вопрос по таможенному законодательству, оптимизируем маршрут доставки и таможенную нагрузку. Первая консультация — бесплатно.", duration: "В день обращения" },
    uz: { title: "TFD va logistika bo'yicha maslahatlar", description: "Bojxona qonunchiligi bo'yicha savollaringizni hal qilamiz, yetkazib berish marshrutini va bojxona yukini optimallashtiramiz. Birinchi maslahat bepul.", duration: "Murojaat kunida" },
    en: { title: "FEA & Logistics Consulting", description: "We resolve your customs law questions, optimize your delivery route and customs burden. First consultation is free.", duration: "Same day" },
    icon: "consult", order: 2,
  },
  {
    ru: { title: "Подготовка полного пакета документов", description: "Готовим весь пакет для таможенного оформления: контракты, инвойсы, упаковочные листы, сертификаты происхождения и разрешительные документы.", duration: "1–2 рабочих дня" },
    uz: { title: "To'liq hujjatlar to'plamini tayyorlash", description: "Bojxona rasmiylashtiruvi uchun barcha hujjatlarni tayyorlaymiz: shartnomalar, invoyslar, qadoqlash ro'yxatlari, kelib chiqish sertifikatlari va ruxsatnomalar.", duration: "1–2 ish kuni" },
    en: { title: "Full Document Package Preparation", description: "We prepare all documents for customs clearance: contracts, invoices, packing lists, certificates of origin and permits.", duration: "1–2 business days" },
    icon: "classify", order: 3,
  },
  {
    ru: { title: "Сертификация и разрешительные процедуры", description: "Получение сертификатов соответствия, санитарных и фитосанитарных разрешений. Работаем с аккредитованными органами.", duration: "3–10 рабочих дней" },
    uz: { title: "Sertifikatsiya va ruxsat berish tartiblari", description: "Muvofiqlik sertifikatlari, sanitariya va fitosanitariya ruxsatnomalarini olish. Akkreditatsiyalangan organlar bilan ishlaymiz.", duration: "3–10 ish kuni" },
    en: { title: "Certification & Permits", description: "Obtaining conformity certificates, sanitary and phytosanitary permits. We work with accredited bodies.", duration: "3–10 business days" },
    icon: "cert", order: 4,
  },
  {
    ru: { title: "Получение статуса УЭО", description: "Помогаем компаниям получить статус уполномоченного экономического оператора. Сопроводили уже 2 компании через полный процесс.", duration: "По согласованию" },
    uz: { title: "VIQ maqomini olish", description: "Kompaniyalarga vakolatli iqtisodiy operator maqomini olishda yordam beramiz. Allaqachon 2 kompaniyani to'liq jarayon orqali kuzatdik.", duration: "Kelishuv bo'yicha" },
    en: { title: "AEO Status Registration", description: "We help companies obtain Authorized Economic Operator status. We have already guided 2 companies through the full process.", duration: "By agreement" },
    icon: "export", order: 5,
  },
  {
    ru: { title: "Решения «под ключ» для крупных клиентов", description: "Комплексный подход от первичной консультации до полного сопровождения сделки. Персональный менеджер и приоритетная обработка.", duration: "Индивидуально" },
    uz: { title: "Yirik mijozlar uchun «kalit tayyor» yechimlar", description: "Dastlabki maslahatdan bitimni to'liq kuzatishgacha kompleks yondashuv. Shaxsiy menejer va ustuvor ishlov berish.", duration: "Individual" },
    en: { title: "Turnkey Solutions for Large Clients", description: "Comprehensive approach from initial consultation to full transaction support. Personal manager and priority processing.", duration: "Individual" },
    icon: "warehouse", order: 6,
  },
];

// ─── Кейсы ─────────────────────────────────────────────────────────────────────
const cases = [
  {
    ru: { title: "Оформление оборудования для текстильной фабрики", client_industry: "Текстильная промышленность", challenge: "Импорт специализированного ткацкого оборудования из Турции с нестандартной классификацией ТН ВЭД.", result: "Сэкономлено 15% на таможенных пошлинах, оформление за 2 дня вместо планируемых 5." },
    uz: { title: "To'qimachilik fabrikasi uchun uskunalarni rasmiylashtirish", client_industry: "To'qimachilik sanoati", challenge: "Turkiyadan noto'g'ri TN VED tasnifi bilan ixtisoslashtirilgan to'quv uskunalarini import qilish.", result: "Bojxona to'lovlarida 15% tejamkorlik, 5 kun o'rniga 2 kunda rasmiylashtirish." },
    en: { title: "Customs clearance of equipment for a textile factory", client_industry: "Textile Industry", challenge: "Import of specialised weaving equipment from Turkey with non-standard HS code classification.", result: "Saved 15% on customs duties, clearance in 2 days instead of the planned 5." },
    tags: ["Импорт", "Оборудование", "Турция"], publishedAt: "2025-01-15", order: 1,
  },
  {
    ru: { title: "Экспорт сухофруктов в ОАЭ", client_industry: "Агропромышленный комплекс", challenge: "Сложная фитосанитарная сертификация, требования ОАЭ к маркировке и документации на арабском языке.", result: "Получены все разрешительные документы, груз отправлен в срок, клиент заключил долгосрочный контракт." },
    uz: { title: "BAA ga quritilgan mevalar eksporti", client_industry: "Agrosanoat majmuasi", challenge: "Murakkab fitosanitariya sertifikatsiyasi, BAA ning arab tilidagi hujjatlar va belgilash talablari.", result: "Barcha ruxsatnomalar olindi, yuk o'z vaqtida jo'natildi, mijoz uzoq muddatli shartnoma tuzdi." },
    en: { title: "Export of dried fruits to UAE", client_industry: "Agro-industrial sector", challenge: "Complex phytosanitary certification, UAE requirements for labelling and Arabic-language documentation.", result: "All permits obtained, cargo shipped on time, client signed a long-term contract." },
    tags: ["Экспорт", "Агро", "ОАЭ"], publishedAt: "2025-02-20", order: 2,
  },
  {
    ru: { title: "Регулярный импорт электроники из Китая", client_industry: "Розничная торговля", challenge: "Организация регулярных поставок потребительской электроники, минимизация простоев товара на таможне.", result: "Выстроен процесс с гарантией оформления за 24 часа, снижены операционные расходы на 20%." },
    uz: { title: "Xitoydan muntazam elektronika importi", client_industry: "Chakana savdo", challenge: "Iste'mol elektronikasini muntazam yetkazib berishni tashkil etish, bojxonadagi to'xtab qolishni minimallashtirish.", result: "24 soatlik rasmiylashtirish kafolati bilan jarayon yo'lga qo'yildi, operatsion xarajatlar 20% ga kamaydi." },
    en: { title: "Regular electronics imports from China", client_industry: "Retail", challenge: "Organising regular consumer electronics shipments, minimising customs downtime.", result: "Process built with a 24-hour clearance guarantee, operating costs reduced by 20%." },
    tags: ["Импорт", "Электроника", "Китай"], publishedAt: "2025-03-10", order: 3,
  },
];

// ─── Отзывы ────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    author_name: "Руслан Каримов",
    ru: { author_role: "Директор по логистике", company: "Крупный дистрибьютор FMCG", text: "Работаем с Vedovec более двух лет. За это время ни одной задержки на таможне. Команда всегда на связи и решает вопросы быстро — это именно то, что нужно бизнесу." },
    uz: { author_role: "Logistika direktori", company: "Yirik FMCG distribyutori", text: "Vedovec bilan ikki yildan ortiq ishlayapmiz. Bu vaqt ichida bojxonada biror kechikish bo'lmadi. Jamoasi doimo aloqada va muammolarni tezda hal qiladi." },
    en: { author_role: "Logistics Director", company: "Major FMCG Distributor", text: "We have been working with Vedovec for over two years. Not a single customs delay during this time. The team is always reachable and resolves issues quickly." },
    order: 1,
  },
  {
    author_name: "Нилуфар Юсупова",
    ru: { author_role: "Генеральный директор", company: "Импортёр оборудования", text: "Обратились с нестандартной задачей — оборудование со сложной классификацией. Vedovec справились за 2 дня и сэкономили нам на пошлинах. Рекомендую." },
    uz: { author_role: "Bosh direktor", company: "Jihozlar importchisi", text: "Murakkab tasniflangan jihozlar bilan murojaat qildik. Vedovec 2 kunda hal qildi va bojxona to'lovlarida tejashga yordam berdi." },
    en: { author_role: "General Director", company: "Equipment Importer", text: "We approached with non-standard equipment classification. Vedovec resolved it in 2 days and helped save on customs duties. Highly recommend." },
    order: 2,
  },
  {
    author_name: "Санжар Мирзаев",
    ru: { author_role: "Владелец", company: "Экспорт агропродукции", text: "Помогли с фитосанитарной сертификацией для экспорта в ОАЭ. Все документы подготовили чётко, груз ушёл в срок. Профессиональный подход." },
    uz: { author_role: "Egasi", company: "Qishloq xo'jaligi eksporti", text: "BAA ga eksport uchun fitosanitariya sertifikatlashda yordam berishdi. Hamma hujjatlar aniq tayyorlandi, yuk o'z vaqtida jo'natildi." },
    en: { author_role: "Owner", company: "Agricultural Export", text: "They helped with phytosanitary certification for export to UAE. All documents were prepared precisely, the cargo was shipped on time." },
    order: 3,
  },
];

// ─── Компания ──────────────────────────────────────────────────────────────────
const company = {
  name: "ООО «VEDOVEC»",
  tagline: { ru: "Надёжный партнёр в сфере ВЭД и таможенного оформления грузов", uz: "TFD va bojxona rasmiylashtirishda ishonchli hamkor", en: "Reliable partner in foreign trade and customs clearance" },
  description: {
    ru: "ООО «VEDOVEC» основан в 2019 году командой профессионалов с опытом работы в сфере ВЭД и таможенного законодательства. За это время мы оформили более 2000 грузовых таможенных деклараций в 2025 году, сопроводили две компании в получении статуса УЭО и провели клиентов через таможенный аудит.",
    uz: "«VEDOVEC» MChJ 2019 yilda TFD va bojxona qonunchiligida tajribaga ega mutaxassislar jamoasi tomonidan tashkil etilgan. 2025 yilda 2000 dan ortiq bojxona yuk deklaratsiyasini rasmiylashtiirdik.",
    en: "VEDOVEC LLC was founded in 2019 by a team of professionals experienced in foreign trade and customs legislation. We have processed over 2000 cargo customs declarations in 2025.",
  },
  stats: [
    { number: "7", label: "лет на рынке", label_uz: "yil bozorda", label_en: "years on the market" },
    { number: "2000+", label: "деклараций оформлено", label_uz: "deklaratsiya rasmiylashtirildi", label_en: "declarations processed" },
    { number: "12", label: "специалистов в команде", label_uz: "mutaxassis jamoada", label_en: "specialists in the team" },
    { number: "24/7", label: "поддержка клиентов", label_uz: "mijozlarga qo'llab-quvvatlash", label_en: "customer support" },
  ],
  foundedYear: 2019,
};

// ─── Контакты ──────────────────────────────────────────────────────────────────
const contact = {
  phone: "+998 90 973-30-90",
  email: "info@vedovec.uz",
  telegram: "vedovec",
  whatsapp: "998909733090",
  address: {
    ru: "г. Ташкент, ул. Амира Темура, 1, офис 405",
    uz: "Toshkent sh., Amir Temur ko'chasi, 1, 405-ofis",
    en: "Tashkent, Amir Temur str., 1, office 405",
  },
};

// ─── Функции создания документов ──────────────────────────────────────────────

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function createDoc(type, data) {
  const doc = await client.create({ _type: type, ...data });
  console.log(`✅ ${type}: ${doc._id}`);
  return doc;
}

// ─── Основная функция ──────────────────────────────────────────────────────────

async function seed() {
  console.log("\n🚀 Начинаем перенос данных в Sanity...\n");

  // Удаляем старые данные
  const types = ["service", "case_study", "testimonial", "company", "contact"];
  for (const type of types) {
    const existing = await client.fetch(`*[_type == "${type}"]._id`);
    for (const id of existing) {
      await client.delete(id);
    }
    if (existing.length) console.log(`🗑  Удалено ${existing.length} записей типа ${type}`);
  }

  console.log("\n📦 Создаём услуги...");
  for (const s of services) {
    await createDoc("service", {
      title: { ru: s.ru.title, uz: s.uz.title, en: s.en.title },
      slug: { _type: "slug", current: slug(s.ru.title) },
      description: { ru: s.ru.description, uz: s.uz.description, en: s.en.description },
      duration: { ru: s.ru.duration, uz: s.uz.duration, en: s.en.duration },
      icon: s.icon,
      order: s.order,
    });
  }

  console.log("\n📋 Создаём кейсы...");
  for (const c of cases) {
    await createDoc("case_study", {
      title: { ru: c.ru.title, uz: c.uz.title, en: c.en.title },
      slug: { _type: "slug", current: slug(c.ru.title) },
      client_industry: { ru: c.ru.client_industry, uz: c.uz.client_industry, en: c.en.client_industry },
      challenge: { ru: c.ru.challenge, uz: c.uz.challenge, en: c.en.challenge },
      result: { ru: c.ru.result, uz: c.uz.result, en: c.en.result },
      tags: c.tags,
      publishedAt: c.publishedAt,
      order: c.order,
    });
  }

  console.log("\n💬 Создаём отзывы...");
  for (const t of testimonials) {
    await createDoc("testimonial", {
      author_name: t.author_name,
      author_role: { ru: t.ru.author_role, uz: t.uz.author_role, en: t.en.author_role },
      company: { ru: t.ru.company, uz: t.uz.company, en: t.en.company },
      text: { ru: t.ru.text, uz: t.uz.text, en: t.en.text },
      order: t.order,
    });
  }

  console.log("\n🏢 Создаём компанию...");
  await createDoc("company", {
    name: company.name,
    tagline: company.tagline,
    description: company.description,
    stats: company.stats,
    foundedYear: company.foundedYear,
  });

  console.log("\n📞 Создаём контакты...");
  await createDoc("contact", {
    phone: contact.phone,
    email: contact.email,
    telegram: contact.telegram,
    whatsapp: contact.whatsapp,
    address: contact.address,
  });

  console.log("\n✅ Готово! Все данные перенесены в Sanity.");
  console.log("🌐 Открой vedovec.sanity.studio чтобы проверить.");
}

seed().catch((err) => {
  console.error("❌ Ошибка:", err.message);
  process.exit(1);
});
