import { defineField, defineType } from "sanity";

export default defineType({
  name: "page_hero",
  title: "Герой страницы",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Подзаголовок",
      type: "text",
    }),
    defineField({
      name: "cta_text",
      title: "Текст кнопки",
      type: "string",
    }),
    defineField({
      name: "cta_link",
      title: "Ссылка кнопки",
      type: "string",
    }),
    defineField({
      name: "background_image",
      title: "Фоновое изображение",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
