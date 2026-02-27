import { defineField, defineType } from "sanity";

export const positionType = defineType({
  name: "position",
  title: "Position",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Oulu / Remote"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applyEmail",
      title: "Application Email",
      type: "string",
      description:
        "Email address for applications (defaults to hello@boggo.fi)",
      initialValue: "hello@boggo.fi",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Toggle to show/hide this position on the website",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      active: "isActive",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active === false ? "🚫 " : ""}${title}`,
        subtitle,
      };
    },
  },
});
