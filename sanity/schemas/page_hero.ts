import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "page_hero",
  title: "Герой страницы",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Страница",
      type: "string",
      options: { list: ["home", "services", "cases", "about", "contacts"] },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("headline", "Заголовок", true),
    localizedText("subheadline", "Подзаголовок"),
    localizedString("cta_text", "Текст кнопки"),
    defineField({ name: "cta_link", title: "Ссылка кнопки", type: "string" }),
    defineField({ name: "background_image", title: "Фоновое изображение", type: "image", options: { hotspot: true } }),
  ],
});
