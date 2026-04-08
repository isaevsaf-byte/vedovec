import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    localizedString("title", "Название", true),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: (doc: any) => doc.title?.ru ?? "" },
      validation: (Rule) => Rule.required(),
    }),
    localizedText("description", "Описание"),
    localizedString("duration", "Срок выполнения"),
    defineField({
      name: "icon",
      title: "Иконка (название)",
      type: "string",
      description: "import | export | consult | classify | cert | warehouse",
    }),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
  orderings: [
    { title: "По порядку", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
