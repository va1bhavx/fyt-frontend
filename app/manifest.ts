import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "FYT — Find Your Tasks",
    short_name: "FYT",
    description:
      "Discover tasks, share your skills, and get work done with FYT.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#111315",
    theme_color: "#059669",
    categories: ["business", "productivity"],

    icons: [
      {
        src: "/fyt-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/fyt-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/fyt-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
