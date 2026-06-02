import { MetadataRoute } from "next";
import { createClient } from "../utils/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Blog yazılarını çek
  const { data: yazilar } = await supabase
    .from("blog_yazilari")
    .select("slug, tarih")
    .eq("yayin", true)
    .order("tarih", { ascending: false });

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://www.medoqa.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.medoqa.com/klinikler",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.medoqa.com/tedaviler",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.medoqa.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.medoqa.com/teklif",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.medoqa.com/oteller",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.medoqa.com/transfer",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.medoqa.com/harita",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://www.medoqa.com/hakkimizda",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.medoqa.com/nasil-calisir",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.medoqa.com/sss",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.medoqa.com/iletisim",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.medoqa.com/gizlilik",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog yazıları — dinamik, her yeni yazı otomatik eklenir
  const blogPages: MetadataRoute.Sitemap = (yazilar || []).map((yazi) => ({
    url: `https://www.medoqa.com/blog/${yazi.slug}`,
    lastModified: new Date(yazi.tarih),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
