import { defineField } from "sanity";

/** Переиспользуемый объект: { ru, uz, en } для строк */
export function localizedString(name: string, title: string, required = false) {
  return defineField({
    name,
    title,
    type: "object",
    validation: required ? (Rule) => Rule.required() : undefined,
    fields: [
      defineField({ name: "ru", title: "Русский 🇷🇺", type: "string" }),
      defineField({ name: "uz", title: "O'zbek 🇺🇿", type: "string" }),
      defineField({ name: "en", title: "English 🇬🇧", type: "string" }),
    ],
  });
}

/** Переиспользуемый объект: { ru, uz, en } для многострочного текста */
export function localizedText(name: string, title: string, required = false) {
  return defineField({
    name,
    title,
    type: "object",
    validation: required ? (Rule) => Rule.required() : undefined,
    fields: [
      defineField({ name: "ru", title: "Русский 🇷🇺", type: "text" }),
      defineField({ name: "uz", title: "O'zbek 🇺🇿", type: "text" }),
      defineField({ name: "en", title: "English 🇬🇧", type: "text" }),
    ],
  });
}
