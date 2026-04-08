import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "testimonial",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({ name: "author_name", title: "Имя автора", type: "string", validation: (Rule) => Rule.required() }),
    localizedString("author_role", "Должность"),
    localizedString("company", "Компания"),
    localizedText("text", "Текст отзыва", true),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
  orderings: [
    { title: "По порядку", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
