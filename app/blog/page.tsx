import { createClient } from "../../utils/supabase/server";
import type { Metadata } from "next";
import BlogListeIstemci from "./BlogListeIstemci";

export const metadata: Metadata = {
  title: "Blog | Medoqa - Health Tourism Guides",
  description: "Expert guides on hair transplant, dental treatment, eye surgery and plastic surgery. Scientific, evidence-based articles for health tourists.",
  openGraph: {
    title: "Medoqa Blog - Health Tourism Guides",
    description: "Expert guides on hair transplant, dental treatment, eye surgery and plastic surgery.",
    url: "https://www.medoqa.com/blog",
    siteName: "Medoqa",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.medoqa.com/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.medoqa.com/blog" },
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: yazilar } = await supabase
    .from("blog_yazilari")
    .select("slug, emoji, tarih, baslik_tr, baslik_en, baslik_de, baslik_ar, baslik_ru, baslik_fr, ozet_tr, ozet_en, ozet_de, ozet_ar, ozet_ru, ozet_fr, kapak_gorsel")
    .eq("yayin", true)
    .order("tarih", { ascending: false });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Medoqa Blog",
    "description": "Health tourism guides and expert advice",
    "url": "https://www.medoqa.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Medoqa",
      "url": "https://www.medoqa.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medoqa.com/icon.png" }
    },
    "blogPost": (yazilar || []).map((y: any) => ({
      "@type": "BlogPosting",
      "headline": y.baslik_en || y.baslik_tr,
      "description": y.ozet_en || y.ozet_tr,
      "url": `https://www.medoqa.com/blog/${y.slug}`,
      "datePublished": y.tarih,
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Google bu kısmı okur — SSR ile render edilmiş */}
      <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <h1>Medoqa Blog - Health Tourism Guides</h1>
        {(yazilar || []).map((y: any) => (
          <article key={y.slug}>
            <a href={`/blog/${y.slug}`}>{y.baslik_en || y.baslik_tr}</a>
            <p>{y.ozet_en || y.ozet_tr}</p>
          </article>
        ))}
      </div>
      {/* Dil desteği için client component */}
      <BlogListeIstemci yazilar={yazilar || []} />
    </>
  );
}
