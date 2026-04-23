import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "about_page",
  title: "О компании",
  type: "document",
  fields: [
    // Header
    localizedString("pageTitle", "Заголовок страницы"),
    localizedText("pageSubtitle", "Подзаголовок страницы"),

    // History section
    localizedString("historyTitle", "Заголовок раздела «История»"),
    localizedText("p1", "Абзац 1"),
    localizedText("p2", "Абзац 2"),
    localizedText("p3", "Абзац 3"),

    // Stats block
    defineField({
      name: "stats",
      title: "Статистика (4 блока)",
      type: "array",
      of: [
        {
          type: "object",
          preview: { select: { title: "number", subtitle: "label.ru" } },
          fields: [
            defineField({ name: "number", title: "Число (2019, 2000+, 12…)", type: "string" }),
            localizedString("label", "Подпись"),
          ],
        },
      ],
    }),

    // Values section
    defineField({
      name: "values",
      title: "Ценности компании",
      type: "array",
      of: [
        {
          type: "object",
          preview: { select: { title: "title.ru", subtitle: "icon" } },
          fields: [
            defineField({ name: "icon", title: "Иконка (emoji)", type: "string" }),
            localizedString("title", "Заголовок"),
            localizedText("desc", "Описание"),
          ],
        },
      ],
    }),

    // CTA
    localizedString("ctaTitle", "CTA — Заголовок"),
    localizedText("ctaSubtitle", "CTA — Подзаголовок"),
  ],
});
