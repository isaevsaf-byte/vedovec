import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "@/sanity/config";

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Fetch helpers
export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, description, duration, icon
    }`
  );
}

export async function getCaseStudies() {
  return client.fetch(
    `*[_type == "case_study"] | order(publishedAt desc) {
      _id, title, slug, client_industry, challenge, result, tags, publishedAt
    }`
  );
}

export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "team_member"] | order(order asc) {
      _id, name, role, bio, photo
    }`
  );
}

export async function getClientLogos() {
  return client.fetch(
    `*[_type == "client_logo"] | order(order asc) {
      _id, company_name, logo
    }`
  );
}

export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) {
      _id, author_name, author_role, company, text
    }`
  );
}

export async function getContact() {
  return client.fetch(
    `*[_type == "contact"][0] {
      phone, telegram, whatsapp, email, address, map_link
    }`
  );
}

export async function getCompany() {
  return client.fetch(
    `*[_type == "company"][0] {
      name, tagline, description, stats, foundedYear
    }`
  );
}
