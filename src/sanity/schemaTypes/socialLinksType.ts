import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const socialLinksType = defineType({
  name: "socialLinks",
  title: "Social Links",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      description: "LinkedIn-profiilin tai yrityssivun URL",
      validation: (rule) =>
        rule.uri({
          scheme: ["https"],
          allowRelative: false,
        }),
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      description: "GitHub-profiilin tai organisaation URL",
      validation: (rule) =>
        rule.uri({
          scheme: ["https"],
          allowRelative: false,
        }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Social Links",
      };
    },
  },
});
