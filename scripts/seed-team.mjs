import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ctv01nlp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skfmMwMxGJVVAbQW1p1d6U75sdBOMT4ITvTdTZVlxCYQ9JUrtS2mztoHMlE9PAnd5iEWztSeYVxENBPcRiqD87dTrS6KzQhbsIHgRg31xheNACDzt2vf5MlyhB1gwftfomrzzdGqG75PRnVVEuN9xqTDVdzq9qGDj6g19ZHmwupwV6dPd54g',
  useCdn: false
});

const team = [
  {
    _type: 'team_member',
    name: 'Алексей Ведов',
    role: {
      ru: 'Генеральный директор',
      uz: "Bosh direktor",
      en: 'General Director'
    },
    bio: {
      ru: 'Более 10 лет в таможенной сфере. Специализируется на сложных импортных операциях и работе с государственными органами.',
      uz: "Bojxona sohasida 10 yildan ortiq tajribaga ega. Murakkab import operatsiyalari va davlat organlari bilan ishlashga ixtisoslashgan.",
      en: 'Over 10 years in customs. Specializes in complex import operations and working with government authorities.'
    },
    order: 1
  },
  {
    _type: 'team_member',
    name: 'Нилуфар Рашидова',
    role: {
      ru: 'Ведущий таможенный декларант',
      uz: "Yetakchi bojxona deklaranti",
      en: 'Senior Customs Declarant'
    },
    bio: {
      ru: 'Сертифицированный специалист по таможенному декларированию. Эксперт по ТН ВЭД и классификации товаров.',
      uz: "Bojxona deklaratsiyasi bo\u2019yicha sertifikatlangan mutaxassis. TIF TN va tovarlarni klassifikatsiya qilish bo\u2019yicha ekspert.",
      en: 'Certified customs declaration specialist. Expert in HS codes and goods classification.'
    },
    order: 2
  },
  {
    _type: 'team_member',
    name: 'Бахром Юсупов',
    role: {
      ru: 'Руководитель отдела логистики',
      uz: "Logistika bo\u2019limi rahbari",
      en: 'Head of Logistics'
    },
    bio: {
      ru: 'Специалист по международным грузоперевозкам и координации цепочек поставок через Узбекистан.',
      uz: "Xalqaro yuk tashish va O\u2018zbekiston orqali yetkazib berish tarmoqlarini muvofiqlashtirish bo\u2019yicha mutaxassis.",
      en: 'Specialist in international freight and supply chain coordination through Uzbekistan.'
    },
    order: 3
  },
  {
    _type: 'team_member',
    name: 'Диля Хасанова',
    role: {
      ru: 'Юрист по ВЭД',
      uz: "Tashqi iqtisodiy faoliyat bo\u2019yicha yurist",
      en: 'Foreign Trade Lawyer'
    },
    bio: {
      ru: 'Специализируется на правовом сопровождении ВЭД и разрешении таможенных споров.',
      uz: "Tashqi iqtisodiy faoliyatni huquqiy qo\u2018llab-quvvatlash hamda bojxona nizolarini hal etishga ixtisoslashgan.",
      en: 'Specializes in legal support for foreign trade and resolution of customs disputes.'
    },
    order: 4
  }
];

for (const member of team) {
  const doc = await client.create(member);
  console.log('Created:', doc.name);
}
console.log('Team members done!');
