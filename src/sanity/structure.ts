import { LinkIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Works")
        .child(
          S.list()
            .title("Works")
            .items([S.documentTypeListItem("project").title("Projects")]),
        ),
      S.listItem()
        .title("Careers")
        .child(
          S.list()
            .title("Careers")
            .items([
              S.documentTypeListItem("position").title("Open Positions"),
              S.documentTypeListItem("benefit").title("Benefits"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem()
                .title("Social Links")
                .icon(LinkIcon)
                .child(
                  S.document()
                    .schemaType("socialLinks")
                    .documentId("socialLinks"),
                ),
            ]),
        ),
    ]);
