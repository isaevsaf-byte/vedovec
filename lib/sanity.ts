import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "@/sanity/config";

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Helper: pick localized field with ru fallback
const loc = (field: string, locale = "ru") =>
  `coalesce(${field}[$locale], ${field}.ru)`;

// ─── Services ────────────────────────────────────────────────────────────────
export async function getServices(locale = "ru") {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id,
      "title": coalesce(title[$locale], title.ru),
      "slug": slug.current,
      "description": coalesce(description[$locale], description.ru),
      "duration": coalesce(duration[$locale], duration.ru),
      icon
    }`,
    { locale }
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────
export async function getCaseStudies(locale = "ru") {
  return client.fetch(
    `*[_type == "case_study"] | order(coalesce(order, 999) asc, publishedAt desc) {
      _id,
      "title": coalesce(title[$locale], title.ru),
      "slug": slug.current,
      "client_industry": coalesce(client_industry[$locale], client_industry.ru),
      "challenge": coalesce(challenge[$locale], challenge.ru),
      "result": coalesce(result[$locale], result.ru),
      tags,
      publishedAt
    }`,
    { locale }
  );
}

// ─── Team Members ─────────────────────────────────────────────────────────────
export async function getTeamMembers(locale = "ru") {
  return client.fetch(
    `*[_type == "team_member"] | order(order asc) {
      _id,
      name,
      "role": coalesce(role[$locale], role.ru),
      "bio": coalesce(bio[$locale], bio.ru),
      photo
    }`,
    { locale }
  );
}

// ─── Client Logos ─────────────────────────────────────────────────────────────
export async function getClientLogos() {
  return client.fetch(
    `*[_type == "client_logo"] | order(order asc) {
      _id, company_name, logo
    }`
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(locale = "ru") {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) {
      _id,
      author_name,
      "author_role": coalesce(author_role[$locale], author_role.ru),
      "company": coalesce(company[$locale], company.ru),
      "text": coalesce(text[$locale], text.ru)
    }`,
    { locale }
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export async function getContact(locale = "ru") {
  return client.fetch(
    `*[_type == "contact"][0] {
      phone, telegram, whatsapp, email,
      "address": coalesce(address[$locale], address.ru),
      map_link
    }`,
    { locale }
  );
}

// ─── Page Hero ───────────────────────────────────────────────────────────────
export async function getPageHero(page: string, locale = "ru") {
  return client.fetch(
    `*[_type == "page_hero" && page == $page][0] {
      "headline": coalesce(headline[$locale], headline.ru),
      "headlineAccent": coalesce(headlineAccent[$locale], headlineAccent.ru),
      "description": coalesce(description[$locale], description.ru),
      "cta_text": coalesce(cta_text[$locale], cta_text.ru),
      cta_link
    }`,
    { page, locale }
  );
}

// ─── About Page ──────────────────────────────────────────────────────────────
export async function getAboutPage(locale = "ru") {
  return client.fetch(
    `*[_type == "about_page"][0] {
      "pageTitle": coalesce(pageTitle[$locale], pageTitle.ru),
      "pageSubtitle": coalesce(pageSubtitle[$locale], pageSubtitle.ru),
      "historyTitle": coalesce(historyTitle[$locale], historyTitle.ru),
      "p1": coalesce(p1[$locale], p1.ru),
      "p2": coalesce(p2[$locale], p2.ru),
      "p3": coalesce(p3[$locale], p3.ru),
      "stats": stats[] {
        number,
        "label": coalesce(label[$locale], label.ru)
      },
      "values": values[] {
        icon,
        "title": coalesce(title[$locale], title.ru),
        "desc": coalesce(desc[$locale], desc.ru)
      },
      "ctaTitle": coalesce(ctaTitle[$locale], ctaTitle.ru),
      "ctaSubtitle": coalesce(ctaSubtitle[$locale], ctaSubtitle.ru)
    }`,
    { locale }
  );
}

// ─── Company ─────────────────────────────────────────────────────────────────
export async function getCompany(locale = "ru") {
  return client.fetch(
    `*[_type == "company"][0] {
      name,
      "tagline": coalesce(tagline[$locale], tagline.ru),
      "description": coalesce(description[$locale], description.ru),
      "stats": stats[] {
        number,
        "label": coalesce(
          select($locale == "uz" => label_uz, $locale == "en" => label_en, label),
          label
        )
      },
      foundedYear
    }`,
    { locale }
  );
}
