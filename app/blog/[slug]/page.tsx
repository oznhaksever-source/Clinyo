import { createClient } from "../../../utils/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogIcerikIstemci from "./BlogIcerikIstemci";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: yazi } = await supabase
    .from("blog_yazilari")
    .select("baslik_en, baslik_tr, ozet_en, ozet_tr")
    .eq("slug", slug)
    .eq("yayin", true)
    .single();

  if (!yazi) return { title: "Medoqa Blog" };
  const baslik = yazi.baslik_en || yazi.baslik_tr || "Medoqa Blog";
  const ozet = yazi.ozet_en || yazi.ozet_tr || "";

  return {
    title: `${baslik} | Medoqa`,
    description: ozet,
    openGraph: {
      title: `${baslik} | Medoqa`,
      description: ozet,
      url: `https://www.medoqa.com/blog/${slug}`,
      siteName: "Medoqa",
      locale: "en_US",
      type: "article",
      images: [{ url: "https://www.medoqa.com/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: baslik,
      description: ozet,
      images: ["https://www.medoqa.com/og-image.jpg"],
    },
    alternates: { canonical: `https://www.medoqa.com/blog/${slug}` },
  };
}

export default async function BlogYaziSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: yazi } = await supabase
    .from("blog_yazilari")
    .select("*")
    .eq("slug", slug)
    .eq("yayin", true)
    .single();

  if (!yazi) notFound();

  const { data: digerYazilar } = await supabase
    .from("blog_yazilari")
    .select("slug, emoji, baslik_tr, baslik_en, baslik_de, baslik_ar, baslik_ru, baslik_fr, tarih")
    .eq("yayin", true)
    .neq("slug", slug)
    .limit(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": yazi.baslik_en || yazi.baslik_tr,
    "description": yazi.ozet_en || yazi.ozet_tr,
    "datePublished": yazi.tarih,
    "dateModified": yazi.tarih,
    "author": { "@type": "Organization", "name": "Medoqa", "url": "https://www.medoqa.com" },
    "publisher": {
      "@type": "Organization",
      "name": "Medoqa",
      "logo": { "@type": "ImageObject", "url": "https://www.medoqa.com/icon.png" }
    },
    "url": `https://www.medoqa.com/blog/${slug}`,
    "image": "https://www.medoqa.com/og-image.jpg",
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.medoqa.com/blog/${slug}` }
  };

  const icerikMetni = (yazi.icerik_en || yazi.icerik_tr || "").replace(/\\n/g, " ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <h1>{yazi.baslik_en || yazi.baslik_tr}</h1>
        <p>{yazi.ozet_en || yazi.ozet_tr}</p>
        <article>{icerikMetni}</article>
        <nav>
          {(digerYazilar || []).map((d: any) => (
            <a key={d.slug} href={`/blog/${d.slug}`}>{d.baslik_en || d.baslik_tr}</a>
          ))}
        </nav>
      </div>
      <BlogIcerikIstemci yazi={yazi} digerYazilar={digerYazilar || []} />
    </>
  );
}
