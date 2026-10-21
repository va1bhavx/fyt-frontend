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

    shortcuts: [
      {
        name: "Dashboard",
        short_name: "Dashboard",
        description: "View your FYT dashboard",
        url: "/dashboard",
        icons: [
          {
            src: "/fyt-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Browse tasks",
        short_name: "Browse tasks",
        description: "Discover tasks and find work",
        url: "/tasks",
        icons: [
          {
            src: "/fyt-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "My offers",
        short_name: "My offers",
        description: "View and manage your submitted offers",
        url: "/my-tasks",
        icons: [
          {
            src: "/fyt-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "My profile",
        short_name: "Profile",
        description: "View and update your profile",
        url: "/profile",
        icons: [
          {
            src: "/fyt-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Settings",
        short_name: "Settings",
        description: "Manage your account preferences",
        url: "/settings",
        icons: [
          {
            src: "/fyt-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  }
}
