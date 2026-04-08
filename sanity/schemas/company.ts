import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "company",
  title: "Компания",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Название (не меняется)", type: "string", validation: (Rule) => Rule.required() }),
    localizedString("tagline", "Слоган"),
    localizedText("description", "Описание"),
    defineField({
      name: "stats",
      title: "Статистика (цифры)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Число (7, 2000, 12…)", type: "string" },
            { name: "label", title: "Подпись RU", type: "string" },
            { name: "label_uz", title: "Подпись UZ", type: "string" },
            { name: "label_en", title: "Подпись EN", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "foundedYear", title: "Год основания", type: "number" }),
  ],
});
