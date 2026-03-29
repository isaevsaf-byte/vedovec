import { defineField, defineType } from "sanity";

export default defineType({
  name: "client_logo",
  title: "Логотип клиента",
  type: "document",
  fields: [
    defineField({
      name: "company_name",
      title: "Название компании",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Логотип",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "По порядку",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
