import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./localized";

export default defineType({
  name: "team_member",
  title: "Сотрудник",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Имя (не переводится)", type: "string", validation: (Rule) => Rule.required() }),
    localizedString("role", "Должность"),
    defineField({ name: "photo", title: "Фото", type: "image", options: { hotspot: true } }),
    localizedText("bio", "Биография"),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
  orderings: [
    { title: "По порядку", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
