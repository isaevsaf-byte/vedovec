import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "case_study",
  title: "Кейс",
  type: "document",
  fields: [
    localizedString("title", "Заголовок", true),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: (doc: any) => doc.title?.ru ?? "" },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("client_industry", "Отрасль клиента"),
    localizedText("challenge", "Задача / вызов"),
    localizedText("result", "Результат"),
    defineField({
      name: "tags",
      title: "Теги",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "publishedAt", title: "Дата публикации", type: "date" }),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
  orderings: [
    { title: "По порядку", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "По дате (новые)", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
