import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vedovec.uz";
  const locales = ["", "/uz", "/en"];
  const pages = ["/", "/services", "/cases", "/about", "/contacts"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const path = locale + (page === "/" ? "" : page);
      entries.push({
        url: `${base}${path || "/"}`,
        lastModified: new Date(),
        changeFrequency: page === "/" || page === "/contacts" ? "weekly" : "monthly",
        priority: page === "/" ? 1 : page === "/contacts" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
