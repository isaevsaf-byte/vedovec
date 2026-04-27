import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "home_cta",
  title: "Главная — CTA блок",
  type: "document",
  fields: [
    localizedString("sectionLabel", "Надпись над заголовком (маленькая)"),
    localizedString("title", "Заголовок"),
    localizedText("subtitle", "Подзаголовок"),

    defineField({
      name: "benefits",
      title: "Преимущества (список с галочками)",
      type: "array",
      of: [
        {
          type: "object",
          preview: { select: { title: "text.ru" } },
          fields: [
            localizedString("text", "Текст пункта"),
          ],
        },
      ],
    }),
  ],
});
