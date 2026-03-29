import { defineField, defineType } from "sanity";

export default defineType({
  name: "team_member",
  title: "Сотрудник",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Имя",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Должность",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Биография",
      type: "text",
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
