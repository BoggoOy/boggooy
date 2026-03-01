import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { projectType } from "./projectType";
import { positionType } from "./positionType";
import { benefitType } from "./benefitType";
import { socialLinksType } from "./socialLinksType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    projectType,
    positionType,
    benefitType,
    socialLinksType,
  ],
};
