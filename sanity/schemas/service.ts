import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Срок выполнения",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Иконка (название)",
      type: "string",
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
