import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boggo",
    short_name: "Boggo",
    description:
      "Boggo is a full-service development partner. We help small and medium-sized businesses navigate the digital world by building modern, human-centered software solutions. With our design before tech mindset, usability and people always come first.",
    start_url: "/",
    display: "standalone",
    // background_color: "#f8f8f8",
    // theme_color: "#1a1a1a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
