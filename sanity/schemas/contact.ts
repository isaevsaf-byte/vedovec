import { defineField, defineType } from "sanity";
import { localizedText } from "./localized";

export default defineType({
  name: "contact",
  title: "Контакты",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Телефон", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "telegram", title: "Telegram (username)", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (номер)", type: "string" }),
    localizedText("address", "Адрес"),
    defineField({ name: "map_link", title: "Ссылка на карту (Google/Yandex)", type: "url" }),
  ],
});
