import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GaloDev Downloader",
    short_name: "GaloDev",
    description:
      "Descarga Reels de Instagram y TikToks sin marca de agua, gratis y sin registrarte.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0714",
    theme_color: "#7c3aed",
    orientation: "portrait-primary",
    categories: ["utilities", "productivity"],
    lang: "es",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [],
  };
}
