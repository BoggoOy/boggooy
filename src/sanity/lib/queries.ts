import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/src/sanity/lib/live";

// ─── Works / Projects ─────────────────────────────────────────────

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    slug,
    client,
    category,
    year,
    description,
    tags,
    image,
    link,
    order
  }`,
);

export async function getProjects() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  return data;
}

// ─── Careers / Positions ──────────────────────────────────────────

export const POSITIONS_QUERY = defineQuery(
  `*[_type == "position" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    type,
    location,
    description,
    requirements,
    applyEmail,
    order
  }`,
);

export async function getPositions() {
  const { data } = await sanityFetch({ query: POSITIONS_QUERY });
  return data;
}

// ─── Careers / Benefits ───────────────────────────────────────────

export const BENEFITS_QUERY = defineQuery(
  `*[_type == "benefit"] | order(order asc) {
    _id,
    title,
    description,
    order
  }`,
);

export async function getBenefits() {
  const { data } = await sanityFetch({ query: BENEFITS_QUERY });
  return data;
}
