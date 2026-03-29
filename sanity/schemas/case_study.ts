import { defineField, defineType } from "sanity";

export default defineType({
  name: "case_study",
  title: "Кейс",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
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
      name: "client_industry",
      title: "Отрасль клиента",
      type: "string",
    }),
    defineField({
      name: "challenge",
      title: "Задача",
      type: "text",
    }),
    defineField({
      name: "result",
      title: "Результат",
      type: "text",
    }),
    defineField({
      name: "tags",
      title: "Теги",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "date",
    }),
  ],
});
