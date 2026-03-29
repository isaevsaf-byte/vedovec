import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({
      name: "author_name",
      title: "Имя автора",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author_role",
      title: "Должность автора",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Компания",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Текст отзыва",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
    }),
  ],
});
