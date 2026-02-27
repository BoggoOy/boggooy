import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;

if (!projectId)
  throw new Error("SANITY_PROJECT_ID is not defined in environment variables");

export const client = createClient({
  projectId,
  dataset:
    process.env.ENVIRONMENT === "production" ? "production" : "development",
  apiVersion: "2025-12-02",
  useCdn: false,
});
