import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Контакты",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
    }),
    defineField({
      name: "telegram",
      title: "Telegram",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Адрес",
      type: "text",
    }),
    defineField({
      name: "map_link",
      title: "Ссылка на карту",
      type: "url",
    }),
  ],
});
