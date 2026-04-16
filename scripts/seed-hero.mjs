import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ctv01nlp",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skfmMwMxGJVVAbQW1p1d6U75sdBOMT4ITvTdTZVlxCYQ9JUrtS2mztoHMlE9PAnd5iEWztSeYVxENBPcRiqD87dTrS6KzQhbsIHgRg31xheNACDzt2vf5MlyhB1gwftfomrzzdGqG75PRnVVEuN9xqTDVdzq9qGDj6g19ZHmwupwV6dPd54g",
  useCdn: false,
});

// Delete existing home hero if any
const existing = await client.fetch('*[_type == "page_hero" && page == "home"][0]{_id}');
if (existing?._id) {
  await client.delete(existing._id);
  console.log("Deleted old hero doc");
}

await client.create({
  _type: "page_hero",
  page: "home",
  headline: {
    ru: "Надёжный партнёр",
    uz: "TFD va bojxona rasmiylashtirishida",
    en: "Your Reliable Partner",
  },
  headlineAccent: {
    ru: "в ВЭД и таможенном оформлении",
    uz: "Ishonchli hamkor",
    en: "in Foreign Trade & Customs",
  },
  description: {
    ru: "Оформляем таможенные грузовые декларации любой сложности, консультируем по ВЭД и логистике, готовим полный пакет документов — чтобы ваш товар прошёл границу быстро, законно и без лишних затрат.",
    uz: "Mahsulotlaringiz chegarani tez, qonuniy va ortiqcha to\u2019lovsiz o\u2019tishi uchun har qanday murakkablikdagi bojxona yuk deklaratsiyalarini rasmiylashtiramiz, TFD va logistika bo\u2019yicha maslahatlar beramiz, to\u2019liq hujjatlar to\u2019plamini tayyorlaymiz.",
    en: "We handle customs declarations of any complexity, provide foreign trade and logistics consulting, and prepare complete document packages — so your cargo crosses the border quickly, legally, and without extra costs.",
  },
  cta_text: {
    ru: "Оставить заявку",
    uz: "Ariza yuborish",
    en: "Submit Request",
  },
  cta_link: "/contacts",
});

console.log("Hero document created!");
