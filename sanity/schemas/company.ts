import { defineField, defineType } from "sanity";

export default defineType({
  name: "company",
  title: "Компания",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Слоган",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
    }),
    defineField({
      name: "stats",
      title: "Статистика",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Число", type: "string" },
            { name: "label", title: "Подпись", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "foundedYear",
      title: "Год основания",
      type: "number",
    }),
  ],
});
