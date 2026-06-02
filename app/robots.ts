import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/klinik-panel",
          "/hasta-panel",
          "/otel-panel",
          "/transfer-panel",
          "/giris",
          "/api/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/klinik-panel",
          "/hasta-panel",
        ],
      },
    ],
    sitemap: "https://www.medoqa.com/sitemap.xml",
    host: "https://www.medoqa.com",
  };
}
